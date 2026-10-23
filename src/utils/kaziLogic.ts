/**
 * Core business logic and validation functions for KaziRemote
 */

export interface PayInfo {
  currency: string;
  min: number;
  max?: number;
  unit: 'MONTH' | 'HOUR' | 'WORD' | 'YEAR';
  note?: string;
}

export interface RegionalPaymentMethod {
  countryCode: string;
  countryName: string;
  flag: string;
  currency: string;
  amount: number;
  feeDisplay: string;
  gateway: string;
  provider: string;
  instructions: string;
  stkPushSupported: boolean;
}

export const REGIONAL_PAYMENTS: Record<string, RegionalPaymentMethod> = {
  KE: {
    countryCode: 'KE',
    countryName: 'Kenya',
    flag: '🇰🇪',
    currency: 'KES',
    amount: 500,
    feeDisplay: 'KES 500',
    gateway: 'M-Pesa Buy Goods',
    provider: 'Safaricom M-Pesa',
    instructions: 'Pay to Till 4374253 (KAZIREMOTE SERVICES (KENYA))',
    stkPushSupported: true,
  },
  NG: {
    countryCode: 'NG',
    countryName: 'Nigeria',
    flag: '🇳🇬',
    currency: 'NGN',
    amount: 4500,
    feeDisplay: 'NGN 4,500',
    gateway: 'Paystack / Bank Transfer',
    provider: 'Access Bank / USSD',
    instructions: 'Transfer to KaziRemote Paystack account or dial *737#',
    stkPushSupported: false,
  },
  GH: {
    countryCode: 'GH',
    countryName: 'Ghana',
    flag: '🇬🇭',
    currency: 'GHS',
    amount: 45,
    feeDisplay: 'GHS 45',
    gateway: 'MTN Mobile Money',
    provider: 'MTN MoMo / Telecel',
    instructions: 'Send to Merchant Code 437425 or prompt push',
    stkPushSupported: true,
  },
  RW: {
    countryCode: 'RW',
    countryName: 'Rwanda',
    flag: '🇷🇼',
    currency: 'RWF',
    amount: 4200,
    feeDisplay: 'RWF 4,200',
    gateway: 'MTN MoMo Rwanda',
    provider: 'MTN MoMo',
    instructions: 'Dial *182*8*1*4374253# or pay online',
    stkPushSupported: true,
  },
  ZA: {
    countryCode: 'ZA',
    countryName: 'South Africa',
    flag: '🇿🇦',
    currency: 'ZAR',
    amount: 75,
    feeDisplay: 'R 75',
    gateway: 'Ozow Instant EFT',
    provider: 'Ozow / Capitec',
    instructions: 'Instant EFT via Ozow secure checkout',
    stkPushSupported: false,
  },
  GLOBAL: {
    countryCode: 'GLOBAL',
    countryName: 'International / Other',
    flag: '🌍',
    currency: 'USD',
    amount: 4,
    feeDisplay: '$4.00',
    gateway: 'Stripe / Card',
    provider: 'Visa / Mastercard / Apple Pay',
    instructions: 'Secure international card checkout',
    stkPushSupported: false,
  },
};

export function getPaymentMethodByCountry(countryCode: string): RegionalPaymentMethod {
  const code = (countryCode || 'KE').toUpperCase();
  return REGIONAL_PAYMENTS[code] || REGIONAL_PAYMENTS.GLOBAL;
}

export function isValidMpesaCode(code: string): boolean {
  if (!code) return false;
  return /^[A-Z0-9]{10}$/i.test(code.trim());
}

export function isDuplicatePaymentCode(code: string, existingCodes: string[]): boolean {
  if (!code) return false;
  const normalized = code.trim().toUpperCase();
  return existingCodes.some((c) => c.trim().toUpperCase() === normalized);
}

export function isValidKenyanPhone(phone: string): boolean {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s-]/g, '');
  return /^(?:\+?254|0)[17]\d{8}$/.test(cleaned);
}

export function calculateAtsMatchScore(
  jobTags: string[],
  candidateSkills: string[],
  categoryMatch: boolean = true
): number {
  if (!jobTags || !jobTags.length) return 85;
  const candidateLower = (candidateSkills || []).map((s) => s.toLowerCase());
  const matched = jobTags.filter((t) => candidateLower.includes(t.toLowerCase())).length;
  const ratio = matched / jobTags.length;
  let baseScore = Math.round(60 + ratio * 35);
  if (categoryMatch) baseScore += 5;
  return Math.min(99, Math.max(55, baseScore));
}

export function formatInitials(name: string): string {
  if (!name) return '??';
  return String(name)
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function formatSalary(pay?: PayInfo): string {
  if (!pay) return 'Salary not specified';
  const UNITS: Record<string, string> = {
    MONTH: '/ mo',
    HOUR: '/ hr',
    WORD: '/ word',
    YEAR: '/ yr',
  };
  const sym = pay.currency === 'USD' ? '$' : `${pay.currency} `;
  const f = (n: number) => sym + Number(n).toLocaleString();
  const range = pay.max ? `${f(pay.min)} – ${pay.currency === 'USD' ? '$' : ''}${Number(pay.max).toLocaleString()}` : f(pay.min);
  return [range, pay.note || UNITS[pay.unit] || ''].join(' ').trim();
}

export function formatRelativeTime(daysAgo: number): string {
  if (daysAgo === 0) return 'Today';
  if (daysAgo === 1) return '1 day ago';
  if (daysAgo > 30) return '30+ days ago';
  return `${daysAgo} days ago`;
}

export function convertSalaryAmount(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  usdToKesRate: number = 129
): number {
  if (fromCurrency === toCurrency) return amount;
  if (fromCurrency === 'USD' && toCurrency === 'KES') {
    return Math.round(amount * usdToKesRate);
  }
  if (fromCurrency === 'KES' && toCurrency === 'USD') {
    return Math.round(amount / usdToKesRate);
  }
  return amount;
}

export function getApplicationPipelineProgress(status: string): number {
  switch (status) {
    case 'submitted':
      return 25;
    case 'forwarded':
      return 50;
    case 'under_review':
      return 75;
    case 'shortlisted':
      return 100;
    default:
      return 0;
  }
}

export function filterJob(
  job: { title: string; company: string; location: string; category: string; type: string; tags?: string[] },
  query: string,
  category: string,
  type: string
): boolean {
  const q = query.trim().toLowerCase();
  const matchCat = category === 'all' || job.category === category;
  const matchType = type === 'all' || job.type === type;
  if (!matchCat || !matchType) return false;
  if (!q) return true;
  const haystack = [job.title, job.company, job.location, ...(job.tags || [])].join(' ').toLowerCase();
  return haystack.includes(q);
}
