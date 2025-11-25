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
   * Create a (dynamic) virtual account for a user
   * Endpoint: POST /virtual-account/create-dynamic-virtual-account
   */
  async createVirtualAccount(payload: CreateVirtualAccountPayload): Promise<SquadVirtualAccountResponse> {
    const body = {
      first_name: payload.firstName,
      last_name: payload.lastName,
      customer_identifier: payload.customerIdentifier,
      customer_name: `${payload.firstName} ${payload.lastName}`.trim(),
      customer_email: payload.email,
      customer_mobile: payload.phone,
      beneficiary_account: payload.beneficiaryAccount,
      metadata: payload.metadata,
    };

    const response = await fetch(`${this.apiUrl}/virtual-account/create-dynamic-virtual-account`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok || data.status !== 200) {
      const errorMessage = data.message || 'Failed to create virtual account';
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


