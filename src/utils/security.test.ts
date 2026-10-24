import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildHstsHeader,
  buildSecurityHeaders,
  isSecureRequest,
  signHmac,
  verifyHmac,
  encryptSensitiveField,
  decryptSensitiveField,
  hashPassword,
  verifyPassword,
  validatePasswordStrength,
  getKmsKeyRef,
} from './security.ts';

test('HSTS header matches production defaults', () => {
  const value = buildHstsHeader(31536000, true, true);
  assert.equal(value, 'max-age=31536000; includeSubDomains; preload');
});

test('security headers contain TLS hardening defaults', () => {
  const headers = buildSecurityHeaders();
  assert.match(headers['Strict-Transport-Security'], /max-age=31536000/);
  assert.equal(headers['X-Frame-Options'], 'DENY');
  assert.equal(headers['X-Content-Type-Options'], 'nosniff');
});

test('secure requests only accept HTTPS', () => {
  assert.equal(isSecureRequest('https://example.com'), true);
  assert.equal(isSecureRequest('http://example.com'), false);
  assert.equal(isSecureRequest('example.com'), false);
});

test('HMAC signing and verification works', () => {
  const payload = { user: 'admin', action: 'login' };
  const secret = 'super-secret-key';
  const signature = signHmac(payload, secret);
  assert.equal(verifyHmac(payload, signature, secret), true);
  assert.equal(verifyHmac(payload, 'deadbeef', secret), false);
});

test('AES-256 field encryption round-trips correctly', () => {
  const keyHex = '0123456789abcdef0123456789abcdef';
  const cipherText = encryptSensitiveField('sensitive-payment-record', keyHex);
  const plainText = decryptSensitiveField(cipherText, keyHex);
  assert.equal(plainText, 'sensitive-payment-record');
});

test('Argon2 password hashing verifies correctly', async () => {
  const hash = await hashPassword('SecurePass!2026');
  assert.equal(await verifyPassword('SecurePass!2026', hash), true);
  assert.equal(await verifyPassword('WrongPass!2026', hash), false);
});

test('Password policy rejects weak passwords', () => {
  assert.equal(validatePasswordStrength('Weak1!'), false);
  assert.equal(validatePasswordStrength('Str0ngPass!2026'), true);
});

test('KMS key reference resolves from environment', () => {
  const keyRef = getKmsKeyRef({ KMS_PROVIDER: 'aws-kms', KMS_KEY_ID: 'abc-123', KMS_KEY_VERSION: 'v7', KMS_REGION: 'eu-west-1' });
  assert.deepEqual(keyRef, {
    provider: 'aws-kms',
    keyId: 'abc-123',
    keyVersion: 'v7',
    region: 'eu-west-1',
  });
});
