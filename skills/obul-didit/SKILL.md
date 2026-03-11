---
name: obul-didit
description: All-in-one identity platform for identity verification, AML screening,
  email and phone verification, and database validation.
endpoints:
- path: /v3/aml
  method: POST
  price: $0.36
  description: AML screening
- path: /v3/email/send
  method: POST
  price: $0.04
  description: Send email verification
- path: /v3/email/check
  method: POST
  price: Free
  description: Verify email code
- path: /v3/phone/send
  method: POST
  price: $0.30
  description: Send phone verification
- path: /v3/phone/check
  method: POST
  price: Free
  description: Verify phone code
- path: /v3/database-validation
  method: POST
  price: $0.31
  description: Validate identity data
metadata:
  obul-skill: 🛡️
  requires.env: OBUL_API_KEY
  requires.primaryEnv: OBUL_API_KEY
registries: {}
provider: orthogonal
---

# Didit

The all-in-one identity platform. Powering the fastest identity verification while fighting fraud and unifying all identity checks. Includes AML screening, email/phone verification, and database validation.

## Authentication

All requests route through the Obul proxy. Include your Obul API key in every request:

```json
{
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  }
}
```

Base URL: `https://proxy.obul.ai/proxy/https/x402.orth.sh/didit`

To get an Obul API key, sign up at **https://my.obul.ai**.

## Common Operations

### AML Screening

Screen individuals or companies against global watchlists and high-risk databases.

**Pricing:** $0.36

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/didit/v3/aml",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "full_name": "John Doe",
    "entity_type": "person",
    "date_of_birth": "1990-05-15",
    "nationality": "US"
  }
}
```

Returns match scores, adverse media, and risk assessment.

### Send Email Verification Code

Send a one-time verification code to an email address.

**Pricing:** $0.04

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/didit/v3/email/send",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "email": "user@example.com"
  }
}
```

### Verify Email Code

Verify a code sent to an email address.

**Pricing:** Free

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/didit/v3/email/check",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "email": "user@example.com",
    "code": "123456"
  }
}
```

### Send Phone Verification Code

Send a one-time verification code to a phone number.

**Pricing:** $0.30

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/didit/v3/phone/send",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "phone_number": "+14155552671",
    "options": {
      "preferred_channel": "sms"
    }
  }
}
```

### Verify Phone Code

Verify a one-time code sent to a phone number.

**Pricing:** Free

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/didit/v3/phone/check",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "phone_number": "+14155552671",
    "code": "123456"
  }
}
```

### Database Validation

Validate identity data against authoritative national and global sources.

**Pricing:** $0.31

```json
{
  "url": "https://proxy.obul.ai/proxy/https/x402.orth.sh/didit/v3/database-validation",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-obul-api-key": "{{OBUL_API_KEY}}"
  },
  "body": {
    "issuing_state": "USA",
    "validation_type": "two_by_two",
    "identification_number": "123456789",
    "first_name": "John",
    "last_name": "Doe",
    "date_of_birth": "1990-05-15"
  }
}
```

## When to Use

- **KYC Compliance**: Verify user identities during onboarding
- **Fraud Prevention**: Screen against AML watchlists
- **Account Security**: Add email/phone verification to accounts
- **Identity Verification**: Validate government IDs against databases
- **Risk Assessment**: Get confidence scores for identity claims

## Best Practices

1. **Configure Thresholds**: Set appropriate approve/review thresholds for AML
2. **Include Signals**: Pass device signals (IP, user agent) for fraud detection
3. **Handle Free Endpoints**: Check email endpoints are free but require prior send
4. **Review Required Fields**: AML requires full_name, other fields improve accuracy
5. **For errors** — See @skills/obul-api-errors/SKILL.md for complete error code reference and troubleshooting


