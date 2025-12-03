/**
 * Nigerian Banks List with NIP (Nigerian Interbank Payment) Codes
 * Used for Squad transfer API which requires 6-digit bank codes
 */

export interface NigerianBank {
  name: string;
  code: string; // 6-digit NIP code
  slug: string;
}

export const NIGERIAN_BANKS: NigerianBank[] = [
  { name: 'Access Bank', code: '000014', slug: 'access-bank' },
  { name: 'Citibank Nigeria', code: '000009', slug: 'citibank' },
  { name: 'Diamond Bank', code: '000005', slug: 'diamond-bank' },
  { name: 'Ecobank Nigeria', code: '000010', slug: 'ecobank' },
  { name: 'Fidelity Bank', code: '000007', slug: 'fidelity-bank' },
  { name: 'First Bank of Nigeria', code: '000016', slug: 'first-bank' },
  { name: 'First City Monument Bank (FCMB)', code: '000003', slug: 'fcmb' },
  { name: 'Guaranty Trust Bank (GTB)', code: '000013', slug: 'gtb' },
  { name: 'Heritage Bank', code: '000020', slug: 'heritage-bank' },
  { name: 'Jaiz Bank', code: '000006', slug: 'jaiz-bank' },
  { name: 'Keystone Bank', code: '000002', slug: 'keystone-bank' },
  { name: 'Providus Bank', code: '000101', slug: 'providus-bank' },
  { name: 'Polaris Bank', code: '000008', slug: 'polaris-bank' },
  { name: 'Stanbic IBTC Bank', code: '000012', slug: 'stanbic-ibtc' },
  { name: 'Standard Chartered Bank', code: '000021', slug: 'standard-chartered' },
  { name: 'Sterling Bank', code: '000001', slug: 'sterling-bank' },
  { name: 'Suntrust Bank', code: '000100', slug: 'suntrust-bank' },
  { name: 'Union Bank of Nigeria', code: '000018', slug: 'union-bank' },
  { name: 'United Bank for Africa (UBA)', code: '000004', slug: 'uba' },
  { name: 'Unity Bank', code: '000011', slug: 'unity-bank' },
  { name: 'Wema Bank', code: '000017', slug: 'wema-bank' },
  { name: 'Zenith Bank', code: '000015', slug: 'zenith-bank' },
];

/**
 * Get bank by code
 */
export const getBankByCode = (code: string): NigerianBank | undefined => {
  return NIGERIAN_BANKS.find(bank => bank.code === code);
};

/**
 * Get bank by name (case-insensitive)
 */
export const getBankByName = (name: string): NigerianBank | undefined => {
  return NIGERIAN_BANKS.find(
    bank => bank.name.toLowerCase() === name.toLowerCase()
  );
};

/**
 * Search banks by name
 */
export const searchBanks = (query: string): NigerianBank[] => {
  const lowerQuery = query.toLowerCase();
  return NIGERIAN_BANKS.filter(
    bank => 
      bank.name.toLowerCase().includes(lowerQuery) ||
      bank.code.includes(query)
  );
};

