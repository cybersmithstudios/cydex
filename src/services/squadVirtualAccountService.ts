// Squad Virtual Account Service for Cydex
// Generates dedicated virtual accounts per user role and handles webhook processing
import { SQUAD_CONFIG } from '@/config/squad';

export interface SquadVirtualAccountData {
  account_number: string;
  account_name: string;
  bank_name: string;
  bank_code: string;
  customer_identifier: string;
  created_at?: string;
  updated_at?: string;
  beneficiary_account?: string;
  [key: string]: any;
}

export interface SquadVirtualAccountResponse {
  status: number;
  success: boolean;
  message: string;
  data?: SquadVirtualAccountData;
}

export interface CreateVirtualAccountPayload {
  customerIdentifier: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  beneficiaryAccount?: string;
  metadata?: Record<string, any>;
}

interface VirtualAccountWebhook {
  transaction_reference: string;
  virtual_account_number: string;
  principal_amount: string;
  settled_amount: string;
  fee_charged: string;
  transaction_date: string;
  customer_identifier: string;
  transaction_indicator: 'C' | 'D'; // Credit or Debit
  remarks: string;
  currency: string;
  channel: string;
  meta?: Record<string, any>;
}

class SquadVirtualAccountService {
  private readonly secretKey = SQUAD_CONFIG.getSecretKey();
  private readonly apiUrl = SQUAD_CONFIG.getApiUrl();

  private get headers() {
    return {
      'Authorization': `Bearer ${this.secretKey}`,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Create a virtual account for a user
   * Tries dynamic endpoint first, falls back to regular endpoint if dynamic is not available
   * Endpoint: POST /virtual-account/create-dynamic-virtual-account or /virtual-account
   */
  async createVirtualAccount(payload: CreateVirtualAccountPayload): Promise<SquadVirtualAccountResponse> {
    // Try dynamic virtual account first (simpler, but requires account allocation)
    try {
      return await this.createDynamicVirtualAccount(payload);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      // If dynamic accounts aren't allocated, try regular virtual account endpoint
      if (errorMessage.includes('No account allocation') || errorMessage.includes('allocation')) {
        console.log('[Squad] Dynamic accounts not available, trying regular virtual account endpoint');
        return await this.createRegularVirtualAccount(payload);
      }
      
      // Re-throw other errors
      throw error;
    }
  }

  /**
   * Create a dynamic virtual account (requires account allocation from Squad)
   */
  private async createDynamicVirtualAccount(payload: CreateVirtualAccountPayload): Promise<SquadVirtualAccountResponse> {
    const body: any = {
      first_name: payload.firstName,
      last_name: payload.lastName,
    };

    if (payload.beneficiaryAccount) {
      body.beneficiary_account = payload.beneficiaryAccount;
    }

    const response = await fetch(`${this.apiUrl}/virtual-account/create-dynamic-virtual-account`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok || data.status !== 200) {
      const errorMessage = data.message || data.error || 'Failed to create dynamic virtual account';
      console.error('Squad Dynamic VA Error:', data);
      throw new Error(errorMessage);
    }

    return data;
  }

  /**
   * Create a regular virtual account (B2C model - requires BVN and more details)
   * This is the fallback when dynamic accounts aren't available
   */
  private async createRegularVirtualAccount(payload: CreateVirtualAccountPayload): Promise<SquadVirtualAccountResponse> {
    // Regular virtual account requires: first_name, last_name, mobile_num, dob, bvn, gender, address, customer_identifier
    // Since we don't have all these fields, we'll create a minimal one
    // Note: This will likely fail without BVN, but it's better than nothing
    
    const body: any = {
      first_name: payload.firstName,
      last_name: payload.lastName,
      customer_identifier: payload.customerIdentifier,
      mobile_num: payload.phone || '08000000000', // Default if not provided
      dob: '01/01/1990', // Default DOB - user should update later
      bvn: '', // Empty - will need to be provided
      gender: '1', // Default to male
      address: 'Nigeria', // Default address
    };

    if (payload.email) {
      body.email = payload.email;
    }

    if (payload.beneficiaryAccount) {
      body.beneficiary_account = payload.beneficiaryAccount;
    }

    const response = await fetch(`${this.apiUrl}/virtual-account`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok || data.status !== 200) {
      const errorMessage = data.message || data.error || 'Failed to create virtual account';
      console.error('Squad Regular VA Error:', data);
      throw new Error(errorMessage);
    }

    return data;
  }

  /**
   * Get virtual account details by the customer identifier used during creation
   * Endpoint: GET /virtual-account/{customer_identifier}
   */
  async getVirtualAccount(customerIdentifier: string): Promise<SquadVirtualAccountResponse> {
    const response = await fetch(
      `${this.apiUrl}/virtual-account/${encodeURIComponent(customerIdentifier)}`,
      {
        method: 'GET',
        headers: this.headers,
      }
    );

    const data = await response.json();

    if (!response.ok || data.status !== 200) {
      throw new Error(data.message || 'Failed to fetch virtual account');
    }

    return data;
  }

  /**
   * Process virtual account credit webhook payloads
   */
  async processVirtualAccountWebhook(webhookData: VirtualAccountWebhook) {
    return {
      success: true,
      userIdentifier: webhookData.customer_identifier,
      amount: parseFloat(webhookData.principal_amount),
      settledAmount: parseFloat(webhookData.settled_amount),
      fee: parseFloat(webhookData.fee_charged),
      transactionRef: webhookData.transaction_reference,
      virtualAccountNumber: webhookData.virtual_account_number,
      transactionType: webhookData.transaction_indicator,
      remarks: webhookData.remarks,
      metadata: webhookData.meta,
    };
  }

  /**
   * Verify a virtual account transaction reference
   * Endpoint: GET /virtual-account/transaction/verify/{reference}
   */
  async verifyVirtualAccountTransaction(transactionReference: string) {
    const response = await fetch(
      `${this.apiUrl}/virtual-account/transaction/verify/${encodeURIComponent(transactionReference)}`,
      {
        method: 'GET',
        headers: this.headers,
      }
    );

    const data = await response.json();

    if (!response.ok || data.status !== 200) {
      throw new Error(data.message || 'Failed to verify transaction');
    }

    return data;
  }
}

export const squadVirtualAccountService = new SquadVirtualAccountService();
export default SquadVirtualAccountService;


