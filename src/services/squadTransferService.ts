// Squad Transfer Service for Cydex
// Handles outbound transfers (wallet withdrawals) via Squad Transfer API
import { SQUAD_CONFIG } from '@/config/squad';

interface TransferResponse<T = any> {
  status: number;
  success: boolean;
  message: string;
  data?: T;
}

interface InitiateTransferPayload {
  amount: number; // Amount in Naira
  bankCode: string;
  accountNumber: string;
  accountName: string;
  remark: string;
  reference?: string;
  currency?: 'NGN' | 'USD';
}

class SquadTransferService {
  private readonly secretKey = SQUAD_CONFIG.getSecretKey();
  private readonly apiUrl = SQUAD_CONFIG.getApiUrl();
  private readonly merchantId = import.meta.env.VITE_SQUAD_MERCHANT_ID || 'CYDEX';

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.secretKey}`,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Bank account lookup (required before transfers)
   */
  async lookupAccount(bankCode: string, accountNumber: string): Promise<TransferResponse<{ account_name: string; account_number: string }>> {
    const response = await fetch(`${this.apiUrl}/payout/account/lookup`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        bank_code: bankCode,
        account_number: accountNumber,
      }),
    });

    const data = await response.json();

    if (!response.ok || data.status !== 200) {
      throw new Error(data.message || 'Failed to lookup account');
    }

    return data;
  }

  /**
   * Initiate transfer from Squad wallet to bank account
   */
  async initiateTransfer(payload: InitiateTransferPayload): Promise<TransferResponse> {
    const amountInKobo = Math.round(payload.amount * 100).toString();
    const reference =
      payload.reference ||
      `${this.merchantId}_${Date.now()}`;

    const response = await fetch(`${this.apiUrl}/payout/transfer`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        transaction_reference: reference,
        amount: amountInKobo,
        bank_code: payload.bankCode,
        account_number: payload.accountNumber,
        account_name: payload.accountName,
        currency_id: payload.currency || 'NGN',
        remark: payload.remark,
      }),
    });

    const data = await response.json();

    if (!response.ok || data.status !== 200) {
      throw new Error(data.message || 'Failed to initiate transfer');
    }

    return data;
  }

  /**
   * Requery transfer status
   */
  async requeryTransfer(transactionReference: string): Promise<TransferResponse> {
    const response = await fetch(`${this.apiUrl}/payout/requery`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        transaction_reference: transactionReference,
      }),
    });

    const data = await response.json();

    if (!response.ok || data.status !== 200) {
      throw new Error(data.message || 'Failed to requery transfer');
    }

    return data;
  }

  /**
   * List transfers (for reporting/admin)
   */
  async listTransfers(params?: { page?: number; perPage?: number; dir?: 'ASC' | 'DESC' }): Promise<TransferResponse> {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.perPage) query.append('perPage', params.perPage.toString());
    if (params?.dir) query.append('dir', params.dir);

    const response = await fetch(`${this.apiUrl}/payout/list?${query.toString()}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    const data = await response.json();

    if (!response.ok || data.status !== 200) {
      throw new Error(data.message || 'Failed to fetch transfers');
    }

    return data;
  }
}

export const squadTransferService = new SquadTransferService();
export default SquadTransferService;

