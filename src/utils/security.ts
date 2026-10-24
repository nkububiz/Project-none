import crypto from 'node:crypto';

export interface KmsKeyRef {
  provider: string;
  keyId: string;
  keyVersion: string;
  region?: string;
}

export interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
  maxAge?: number;
}

export const defaultSecurityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
  'X-XSS-Protection': '0',
} as const;

export function buildHstsHeader(maxAge = 31536000, includeSubDomains = true, preload = true): string {
  const parts = [`max-age=${maxAge}`];
  if (includeSubDomains) parts.push('includeSubDomains');
  if (preload) parts.push('preload');
  return parts.join('; ');
}

export function buildSecurityHeaders(overrides: Record<string, string> = {}): Record<string, string> {
  return {
    ...defaultSecurityHeaders,
    ...overrides,
    'Strict-Transport-Security': overrides['Strict-Transport-Security'] || defaultSecurityHeaders['Strict-Transport-Security'],
  };
}

export function isSecureRequest(urlOrOrigin: string): boolean {
  if (!urlOrOrigin) return false;
  try {
    const target = new URL(urlOrOrigin);
    return target.protocol === 'https:';
  } catch {
    return /^https:/i.test(urlOrOrigin);
  }
}

export function buildCookieOptions(options: CookieOptions = {}): CookieOptions {
  return {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 60 * 60 * 24,
    ...options,
  };
}

export function getKmsKeyRef(env: NodeJS.ProcessEnv = process.env): KmsKeyRef {
  const provider = env.KMS_PROVIDER || 'aws-kms';
  const keyId = env.KMS_KEY_ID || 'replace-with-key-id';
  const keyVersion = env.KMS_KEY_VERSION || 'latest';
  return {
    provider,
    keyId,
    keyVersion,
    region: env.KMS_REGION || undefined,
  };
}

export function signHmac(payload: string | Uint8Array | Record<string, unknown>, secret: string): string {
  const normalized = typeof payload === 'string' ? payload : Buffer.isBuffer(payload)
    ? payload
    : JSON.stringify(payload);

  return crypto.createHmac('sha256', secret).update(normalized).digest('hex');
}

export function verifyHmac(payload: string | Uint8Array | Record<string, unknown>, signature: string, secret: string): boolean {
  const expected = signHmac(payload, secret);
  if (!signature || signature.length !== expected.length) return false;

  try {
    return crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(signature, 'hex'));
  } catch {
    return false;
  }
}

export function ensureDataKeyHex(rawKey?: string): string {
  const keyValue = rawKey || process.env.DATA_KEY_HEX || '0123456789abcdef0123456789abcdef';
  const key = Buffer.from(keyValue, 'hex');
  if (key.length !== 32) {
    throw new Error('DATA_KEY_HEX must be 32 bytes (64 hex chars) for AES-256');
  }
  return key.toString('hex');
}

export function encryptSensitiveField(plaintext: string, keyHex?: string): string {
  const key = Buffer.from(ensureDataKeyHex(keyHex), 'hex');
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decryptSensitiveField(payload: string, keyHex?: string): string {
  const [ivHex, tagHex, cipherHex] = payload.split(':');
  if (!ivHex || !tagHex || !cipherHex) {
    throw new Error('Malformed encrypted field payload');
  }

  const key = Buffer.from(ensureDataKeyHex(keyHex), 'hex');
  const iv = Buffer.from(ivHex, 'hex');
  const tag = Buffer.from(tagHex, 'hex');
  const cipherText = Buffer.from(cipherHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(cipherText), decipher.final()]).toString('utf8');
}

export async function hashPassword(password: string): Promise<string> {
  const argon2 = await import('argon2');
  return argon2.default.hash(password);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const argon2 = await import('argon2');
  return argon2.default.verify(hash, password);
}

export function createPasswordPolicy() {
  return {
    minimumLength: 12,
    requireNumber: true,
    requireUppercase: true,
    requireLowercase: true,
    requireSymbol: true,
    maxAgeDays: 90,
  };
}

export function validatePasswordStrength(password: string): boolean {
  const policy = createPasswordPolicy();
  if (password.length < policy.minimumLength) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  if (!/[^A-Za-z0-9]/.test(password)) return false;
  return true;
}

export function requireTlsIfNeeded(isSecure: boolean, strictMode = true): boolean {
  if (!strictMode) return true;
  return isSecure;
}

export function createAdminMfaPolicy() {
  return {
    required: true,
    allowedMethods: ['totp', 'webauthn'],
    fallbackLockoutMinutes: 15,
    gracePeriodMinutes: 0,
  };
}

export function sanitizeConfigValue(value?: string): string {
  return (value || '').trim();
}
