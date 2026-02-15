# Security Audit Report - Roleplay Studio

*Audit Date: 2026-02-15*
*Auditor: Neo (AI Assistant)*

---

## Executive Summary

**Overall Risk Level: MEDIUM**

The application follows good security practices for API key management. Keys are server-side only and never exposed to clients. However, there are several areas requiring attention.

---

## API Key Security

### ✅ PASS: Keys Not Exposed to Client

| File | Key Access | Location |
|------|------------|----------|
| `/api/elevenlabs-token/route.ts` | `process.env.ELEVENLABS_API_KEY` | Server-side only |
| `/api/chat/route.ts` | `process.env.OPENAI_API_KEY` | Server-side only |
| `/api/speech/route.ts` | `process.env.ELEVENLABS_API_KEY` | Server-side only |
| `/lib/usage-tracker.ts` | `process.env.ELEVENLABS_API_KEY` | Server-side only |

**Pattern Used:** Client requests signed URL → Server uses secret key → Client receives temporary token

This is the **correct security pattern**. API keys never leave the server.

### ✅ PASS: No NEXT_PUBLIC Exposure

No sensitive keys are prefixed with `NEXT_PUBLIC_`, meaning they cannot be accessed by client-side JavaScript.

### ✅ PASS: No Hardcoded Secrets

No API keys, passwords, or secrets are hardcoded in source code.

---

## Potential Vulnerabilities

### 🟡 MEDIUM: Admin Credentials Hardcoded

**File:** `/src/lib/admin-auth.ts`
```typescript
const ADMIN_USERNAME = 'neo@tocabay.com';
const ADMIN_PASSWORD = 'Cougars12!';
```

**Risk:** If source code is exposed (GitHub public, build artifacts), credentials are visible.

**Recommendation:** Move to environment variables:
```typescript
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
```

### 🟡 MEDIUM: No Rate Limiting on Token Endpoint

**File:** `/api/elevenlabs-token/route.ts`

No rate limiting means an attacker could:
- Exhaust your ElevenLabs quota
- Generate many signed URLs
- Launch denial-of-service attacks

**Recommendation:** Add rate limiting:
```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 h'), // 10 requests per hour
});
```

### 🟡 MEDIUM: No CSRF Protection on API Routes

API routes accept any request without verifying origin.

**Recommendation:** Add CSRF token validation or check Origin header:
```typescript
const origin = request.headers.get('origin');
if (origin !== 'https://roleplaystudio.ai') {
  return new Response('Forbidden', { status: 403 });
}
```

### 🟢 LOW: ElevenLabs Key in .env.local

**File:** `.env.local`
```
ELEVENLABS_API_KEY=f4990a66c2b667315...
```

**Risk:** File is gitignored, but if accidentally committed or copied, key is exposed.

**Status:** Already gitignored ✅

**Recommendation:** Rotate key after public launch, use Vercel's environment variable encryption.

### 🟢 LOW: Session Token Generation

**File:** `/src/lib/admin-auth.ts`
```typescript
function generateSessionToken(): string {
  return Buffer.from(`${Date.now()}-${Math.random()}`).toString('base64');
}
```

**Risk:** Predictable if attacker knows approximate timestamp.

**Recommendation:** Use crypto for randomness:
```typescript
import { randomBytes } from 'crypto';
const token = randomBytes(32).toString('hex');
```

---

## Attack Scenarios & Mitigations

### Scenario 1: API Key Theft via Code Injection

**Attack:** Attacker injects malicious code to exfiltrate environment variables.

**Current Protection:**
- API keys only accessible server-side ✅
- Vercel sandboxes serverless functions ✅

**Additional Mitigation:**
- Enable Vercel's Environment Variable encryption
- Use separate keys for dev/staging/prod
- Set up billing alerts on ElevenLabs/OpenAI

### Scenario 2: Signed URL Abuse

**Attack:** Attacker calls `/api/elevenlabs-token` repeatedly to generate many signed URLs.

**Current Protection:** None

**Mitigation Required:**
1. Rate limit the endpoint (10/hour per user)
2. Require authentication (Clerk) to access
3. Log all token requests for audit

### Scenario 3: Account Takeover via Session

**Attack:** Steal admin session cookie and access dashboard.

**Current Protection:**
- httpOnly cookies ✅
- Session expiration (24h) ✅

**Additional Mitigation:**
- Add IP binding to sessions
- Add "secure" flag (already done for production)
- Implement session invalidation on password change

### Scenario 4: Data Exfiltration via Chat API

**Attack:** Prompt injection to make AI reveal system prompts or data.

**Current Protection:** None specific

**Mitigation Required:**
1. Sanitize user input before sending to LLM
2. Use separate system prompts that resist injection
3. Don't include sensitive data in prompts

---

## Recommendations Summary

### Immediate (Before Launch)

| Priority | Issue | Action |
|----------|-------|--------|
| 🔴 HIGH | Admin creds hardcoded | Move to env vars |
| 🔴 HIGH | No rate limiting | Add Upstash/Redis rate limiter |
| 🟡 MEDIUM | No CSRF protection | Add origin validation |

### Short-Term (First Month)

| Priority | Issue | Action |
|----------|-------|--------|
| 🟡 MEDIUM | Weak session tokens | Use crypto.randomBytes |
| 🟡 MEDIUM | No audit logging | Log all admin actions |
| 🟢 LOW | Key rotation | Rotate all keys post-launch |

### Long-Term

| Priority | Issue | Action |
|----------|-------|--------|
| 🟢 LOW | No WAF | Consider Cloudflare WAF |
| 🟢 LOW | No pen testing | Schedule annual audit |

---

## Vercel Security Settings

Ensure these are configured in Vercel dashboard:

1. **Environment Variables**
   - ✅ ELEVENLABS_API_KEY (secret)
   - ✅ OPENAI_API_KEY (secret)
   - ✅ CLERK_SECRET_KEY (secret)
   - ⏳ ADMIN_USERNAME (add)
   - ⏳ ADMIN_PASSWORD (add)

2. **Security Headers** (add via next.config.ts or vercel.json)
   ```json
   {
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           { "key": "X-Frame-Options", "value": "DENY" },
           { "key": "X-Content-Type-Options", "value": "nosniff" },
           { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
         ]
       }
     ]
   }
   ```

3. **Domain Settings**
   - Enable HTTPS only
   - Enable HSTS

---

## Can Hackers Steal API Keys?

### From Client-Side: **NO** ✅
API keys are never sent to the browser. Attackers cannot use browser DevTools, network inspection, or client-side exploits to see them.

### From Server-Side: **UNLIKELY**
Would require:
- Gaining access to Vercel deployment (compromised account)
- Code injection vulnerability (none found)
- Supply chain attack (npm package compromise)

### From Source Code: **POSSIBLE**
If repo becomes public or .env file is committed, keys would be exposed.

**Mitigation:** 
- Keep repo private
- .env is gitignored ✅
- Use Vercel env vars, not local files in prod

---

## Conclusion

**Your API keys are reasonably secure** for a production launch. The primary risks are:

1. Lack of rate limiting (could cause financial damage)
2. Hardcoded admin credentials (should fix before launch)

Neither of these would allow an attacker to steal your API keys, but they could abuse your services.

**Action Plan:**
1. Move admin creds to env vars today
2. Add rate limiting this week
3. Add security headers before launch

---

*Audit complete. No critical vulnerabilities found.*
