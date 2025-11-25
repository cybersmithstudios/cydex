import { supabase } from '@/integrations/supabase/client';
import { squadVirtualAccountService } from '@/services/squadVirtualAccountService';

type WalletRole = 'customer' | 'vendor' | 'rider';

interface WalletSetupUser {
  id: string;
  role: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
}

interface WalletRecord {
  id: string;
  virtual_account_id: string | null;
}

const ROLE_CONFIG: Record<WalletRole, { walletTable: string; ownerColumn: string }> = {
  customer: { walletTable: 'customer_wallet', ownerColumn: 'customer_id' },
  vendor: { walletTable: 'vendor_wallet', ownerColumn: 'vendor_id' },
  rider: { walletTable: 'rider_wallet', ownerColumn: 'rider_id' },
};

const DEFAULT_BANK = {
  name: 'Guaranty Trust Bank',
  code: '058',
};

const VIRTUAL_ACCOUNT_PREFIX =
  import.meta.env.VITE_SQUAD_VIRTUAL_ACCOUNT_PREFIX || 'CYDEX';

class WalletSetupService {
  private pendingSetups: Map<string, Promise<void>> = new Map();

  /**
   * Ensure that a wallet exists for the user and is linked to a Squad virtual account.
   */
  ensureWalletSetup(user?: WalletSetupUser | null): Promise<void> | undefined {
    if (!user?.id || !user.role) return;

    const role = this.normalizeRole(user.role);
    if (!role) return;

    const key = `${user.id}:${role}`;
    if (this.pendingSetups.has(key)) {
      return this.pendingSetups.get(key);
    }

    const promise = this.runSetup(user, role)
      .catch((error) => {
        console.error('Wallet setup failed:', error);
      })
      .finally(() => {
        this.pendingSetups.delete(key);
      });

    this.pendingSetups.set(key, promise);
    return promise;
  }

  private normalizeRole(role: string): WalletRole | null {
    const normalized = role.toLowerCase();
    if (normalized === 'customer' || normalized === 'vendor' || normalized === 'rider') {
      return normalized;
    }
    return null;
  }

  private async runSetup(user: WalletSetupUser, role: WalletRole) {
    try {
      console.log(`[WalletSetup] Starting setup for ${role} ${user.id}`);
      const walletRecord = await this.ensureWalletRecord(user.id, role);
      console.log(`[WalletSetup] Wallet record ensured: ${walletRecord.id}`);
      await this.ensureVirtualAccount(user, role, walletRecord);
      console.log(`[WalletSetup] Virtual account setup completed for ${role} ${user.id}`);
    } catch (error) {
      console.error(`[WalletSetup] Setup failed for ${role} ${user.id}:`, error);
      throw error;
    }
  }

  private async ensureWalletRecord(userId: string, role: WalletRole): Promise<WalletRecord> {
    const config = ROLE_CONFIG[role];

    const { data, error } = await supabase
      .from(config.walletTable)
      .select('id, virtual_account_id')
      .eq(config.ownerColumn, userId)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to fetch ${role} wallet: ${error.message}`);
    }

    if (data) {
      return data as WalletRecord;
    }

    const insertResult = await supabase
      .from(config.walletTable)
      .insert({
        [config.ownerColumn]: userId,
      })
      .select('id, virtual_account_id')
      .single();

    if (insertResult.error || !insertResult.data) {
      throw new Error(
        insertResult.error?.message || `Failed to create ${role} wallet`
      );
    }

    return insertResult.data as WalletRecord;
  }

  private async ensureVirtualAccount(
    user: WalletSetupUser,
    role: WalletRole,
    wallet: WalletRecord
  ) {
    const existingVirtualAccount = await this.fetchExistingVirtualAccount(user.id, role);
    if (existingVirtualAccount) {
      await this.linkWalletToVirtualAccount(role, user.id, wallet.id, existingVirtualAccount.id);
      return;
    }

    const squadAccount = await this.createSquadVirtualAccount(user, role);
    if (!squadAccount?.data) {
      console.warn('Squad virtual account creation returned no data');
      return;
    }

    const saveResult = await supabase
      .from('virtual_accounts')
      .insert({
        profile_id: user.id,
        role,
        squad_customer_identifier: squadAccount.data.customer_identifier,
        account_number:
          squadAccount.data.account_number ||
          squadAccount.data.virtual_account_number,
        account_name: squadAccount.data.account_name || squadAccount.data.customer_name,
        bank_name: squadAccount.data.bank_name || DEFAULT_BANK.name,
        bank_code: squadAccount.data.bank_code || DEFAULT_BANK.code,
        metadata: squadAccount.data,
      })
      .select('id')
      .single();

    if (saveResult.error || !saveResult.data) {
      throw new Error(saveResult.error?.message || 'Failed to store virtual account');
    }

    await this.linkWalletToVirtualAccount(role, user.id, wallet.id, saveResult.data.id);
  }

  private async fetchExistingVirtualAccount(userId: string, role: WalletRole) {
    const { data, error } = await supabase
      .from('virtual_accounts')
      .select('id, account_number, bank_name, bank_code')
      .eq('profile_id', userId)
      .eq('role', role)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to fetch virtual account: ${error.message}`);
    }

    return data;
  }

  private async linkWalletToVirtualAccount(
    role: WalletRole,
    userId: string,
    walletId: string,
    virtualAccountId: string
  ) {
    const config = ROLE_CONFIG[role];

    await supabase
      .from(config.walletTable)
      .update({
        virtual_account_id: virtualAccountId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', walletId)
      .eq(config.ownerColumn, userId);
  }

  private async createSquadVirtualAccount(user: WalletSetupUser, role: WalletRole) {
    if (!user.name || !user.email) {
      throw new Error('User profile is missing name or email required for virtual account');
    }

    const [firstName, ...lastParts] = user.name.split(' ');
    const lastName = lastParts.join(' ') || firstName;

    const customerIdentifier = `${VIRTUAL_ACCOUNT_PREFIX}_${role}_${user.id.slice(0, 8)}`.toUpperCase();

    console.log(`[WalletSetup] Creating Squad virtual account for ${customerIdentifier}`);
    
    try {
      const result = await squadVirtualAccountService.createVirtualAccount({
        customerIdentifier,
        firstName,
        lastName,
        email: user.email,
        phone: user.phone || undefined,
        metadata: {
          role,
          user_id: user.id,
        },
      });
      
      console.log(`[WalletSetup] Squad virtual account created:`, result.data);
      return result;
    } catch (error) {
      console.error(`[WalletSetup] Squad API error:`, error);
      // If Squad API fails, we still want to continue - virtual account can be created later
      // But we should log this clearly
      throw new Error(`Failed to create virtual account via Squad API: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const walletSetupService = new WalletSetupService();

