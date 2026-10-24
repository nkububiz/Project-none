# KaziRemote production security baseline

This project ships with a hardened security layer for the static site and future hosted backend integration.

## Included protections

- HTTPS/TLS 1.3 enforcement via secure headers and configuration
- HSTS headers with preload and subdomain coverage
- AES-256 field-level encryption helpers
- Argon2id-backed password hashing and verification
- HMAC signing and verification for API/webhook integrity
- KMS/HSM key reference handling
- MFA-ready admin security policy helpers
- Secure cookie defaults

## Required environment variables

Copy this file to `.env` and fill in the real values in production.

- TLS_ONLY=true
- TLS_MIN_VERSION=TLS1_3
- HSTS_MAX_AGE=31536000
- HSTS_PRELOAD=true
- HSTS_INCLUDE_SUBDOMAINS=true
- KMS_PROVIDER=aws-kms
- KMS_KEY_ID=your-kms-key-id
- KMS_KEY_VERSION=latest
- KMS_REGION=your-region
- HMAC_SECRET=replace-with-long-random-secret
- SESSION_SECRET=replace-with-long-random-secret
- ADMIN_MFA_ISSUER=KaziRemote
- DATA_KEY_HEX=32-byte-hex-key

## Production deployment recommendations

- Enforce HTTPS at the hosting layer and redirect all HTTP traffic.
- Enable HSTS on your CDN or edge service.
- Store all encryption keys in KMS/HSM, never in source control.
- Require MFA for every admin account.
- Use HMAC signatures for all webhook and server-to-server API traffic.
- Apply field-level encryption only to the highest-risk data such as payment metadata, IDs, or private documents.
