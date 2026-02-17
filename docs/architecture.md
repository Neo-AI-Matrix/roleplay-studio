# Roleplay Studio - System Architecture

*Last updated: 2026-02-16*

---

## Overview

Roleplay Studio is a voice-based AI training platform that enables sales and support professionals to practice conversations with AI-powered personas. The system integrates multiple cloud services for authentication, payments, voice AI, and deployment.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                    USERS                                             │
│                          (Web Browser / Mobile)                                      │
└─────────────────────────────────────┬───────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                               DOMAIN LAYER                                           │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐                  │
│  │    GoDaddy      │───▶│     Vercel      │    │      Zoho       │                  │
│  │   (Registrar)   │    │  (DNS + CDN)    │    │ (Email Hosting) │                  │
│  │                 │    │                 │    │                 │                  │
│  │ roleplaystudio  │    │  A/CNAME/MX     │    │ MX Records      │                  │
│  │     .ai         │    │   Records       │    │ hello@...       │                  │
│  └─────────────────┘    └────────┬────────┘    └─────────────────┘                  │
└──────────────────────────────────┼──────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                            APPLICATION LAYER                                         │
│                                                                                      │
│  ┌───────────────────────────────────────────────────────────────────────────────┐  │
│  │                         VERCEL (Hosting)                                       │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────┐  │  │
│  │  │                    Next.js Application                                   │  │  │
│  │  │                                                                          │  │  │
│  │  │   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                  │  │  │
│  │  │   │   Pages &    │  │     API      │  │   Static     │                  │  │  │
│  │  │   │  Components  │  │    Routes    │  │   Assets     │                  │  │  │
│  │  │   │              │  │              │  │              │                  │  │  │
│  │  │   │ - Landing    │  │ - /api/usage │  │ - Images     │                  │  │  │
│  │  │   │ - Studio     │  │ - /api/rating│  │ - Fonts      │                  │  │  │
│  │  │   │ - Admin      │  │ - /api/admin │  │ - Icons      │                  │  │  │
│  │  │   │ - Categories │  │              │  │              │                  │  │  │
│  │  │   └──────────────┘  └──────────────┘  └──────────────┘                  │  │  │
│  │  │                                                                          │  │  │
│  │  │   Tech Stack: React, TypeScript, Tailwind CSS, shadcn/ui                │  │  │
│  │  └─────────────────────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────┬───────────────────────────────────────────────┘
                                      │
          ┌───────────────────────────┼───────────────────────────┐
          │                           │                           │
          ▼                           ▼                           ▼
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│   AUTHENTICATION    │    │    VOICE/AI LAYER   │    │    DATA LAYER       │
│                     │    │                     │    │                     │
│  ┌───────────────┐  │    │  ┌───────────────┐  │    │  ┌───────────────┐  │
│  │    Clerk      │  │    │  │  ElevenLabs   │  │    │  │   MongoDB     │  │
│  │               │  │    │  │               │  │    │  │   Atlas       │  │
│  │ - Sign up     │  │    │  │ - 27 AI       │  │    │  │               │  │
│  │ - Sign in     │  │    │  │   Agents      │  │    │  │ - Ratings     │  │
│  │ - Sessions    │  │    │  │ - Voice       │  │    │  │ - Sessions    │  │
│  │ - Trial track │  │    │  │   Synthesis   │  │    │  │ - Usage logs  │  │
│  │   (metadata)  │  │    │  │ - WebSocket   │  │    │  │               │  │
│  │               │  │    │  │   Streaming   │  │    │  │               │  │
│  └───────────────┘  │    │  └───────────────┘  │    │  └───────────────┘  │
│                     │    │                     │    │                     │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
                                      │
                                      ▼
                           ┌─────────────────────┐
                           │   PAYMENTS LAYER    │
                           │                     │
                           │  ┌───────────────┐  │
                           │  │    Stripe     │  │
                           │  │               │  │
                           │  │ - Checkout    │  │
                           │  │ - Subscripts  │  │
                           │  │ - Webhooks    │  │
                           │  │               │  │
                           │  └───────────────┘  │
                           │                     │
                           │  (Planned/Partial)  │
                           └─────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────────┐
│                            DEVELOPMENT LAYER                                         │
│                                                                                      │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────────────────────┐  │
│  │     GitHub      │◀───│    OpenClaw     │───▶│         LLM Providers           │  │
│  │                 │    │                 │    │                                 │  │
│  │ Neo-AI-Matrix/  │    │ AI Development  │    │ - Anthropic (Claude Opus 4)     │  │
│  │ roleplay-studio │    │    Agent        │    │ - OpenAI (GPT-4, Whisper)       │  │
│  │                 │    │                 │    │ - Moonshot (Kimi)               │  │
│  │ - Source code   │    │ - Code changes  │    │                                 │  │
│  │ - Auto-deploy   │    │ - Debugging     │    │                                 │  │
│  │   to Vercel     │    │ - Architecture  │    │                                 │  │
│  └─────────────────┘    └────────┬────────┘    └─────────────────────────────────┘  │
│                                  │                                                   │
│                                  ▼                                                   │
│                         ┌─────────────────┐                                          │
│                         │    Tailscale    │                                          │
│                         │                 │                                          │
│                         │ - VPN Mesh      │                                          │
│                         │ - Secure access │                                          │
│                         │ - Multi-device  │                                          │
│                         └─────────────────┘                                          │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Component Breakdown

### Domain & DNS

| Component | Service | Purpose | Cost |
|-----------|---------|---------|------|
| Domain Registrar | **GoDaddy** | Owns roleplaystudio.ai domain | ~$20/yr |
| DNS Management | **Vercel** | Routes traffic, SSL certificates | Included |
| Email Hosting | **Zoho Mail** | Business email (hello@roleplaystudio.ai) | Free tier |

### Application Hosting

| Component | Service | Purpose | Cost |
|-----------|---------|---------|------|
| Web Hosting | **Vercel** | Next.js deployment, CDN, serverless functions | Free tier |
| Code Repository | **GitHub** | Source control, CI/CD triggers | Free |
| Framework | **Next.js 14** | React framework with App Router | Open source |
| UI Components | **shadcn/ui** | Accessible component library | Open source |
| Styling | **Tailwind CSS** | Utility-first CSS | Open source |

### Authentication & Users

| Component | Service | Purpose | Cost |
|-----------|---------|---------|------|
| Auth Provider | **Clerk** | Sign up, sign in, session management | Free tier (10k MAU) |
| Trial Tracking | **Clerk Metadata** | Track trial usage via publicMetadata | Included |

### Voice AI

| Component | Service | Purpose | Cost |
|-----------|---------|---------|------|
| Conversational AI | **ElevenLabs** | 27 AI agent personas | ~$0.08-0.12/min |
| Voice Synthesis | **ElevenLabs** | Real-time voice responses | Included |
| WebSocket Streaming | **ElevenLabs** | Low-latency voice conversations | Included |

### Data Storage

| Component | Service | Purpose | Cost |
|-----------|---------|---------|------|
| Database | **MongoDB Atlas** | Ratings, session data, usage logs | Free tier (512MB) |
| Local Storage | **Browser** | Session history, user preferences | Free |

### Payments (Planned)

| Component | Service | Purpose | Cost |
|-----------|---------|---------|------|
| Payment Processing | **Stripe** | Subscriptions, checkout | 2.9% + $0.30/txn |
| Webhooks | **Stripe** | Subscription events, payment confirmations | Included |

### Development Infrastructure

| Component | Service | Purpose | Cost |
|-----------|---------|---------|------|
| AI Development | **OpenClaw** | Autonomous coding agent | Self-hosted |
| LLM (Primary) | **Anthropic Claude** | Code generation, reasoning | Usage-based |
| LLM (Secondary) | **OpenAI GPT-4** | Fallback, specialized tasks | Usage-based |
| LLM (Research) | **Moonshot Kimi** | Long-context research | Usage-based |
| Secure Access | **Tailscale** | VPN mesh for remote development | Free tier |

---

## Data Flow

### User Voice Session Flow

```
User Browser                 Vercel                    Clerk                 ElevenLabs
     │                          │                        │                        │
     │──── Load /studio ───────▶│                        │                        │
     │                          │──── Verify session ───▶│                        │
     │                          │◀─── User data ─────────│                        │
     │◀─── Render scenarios ────│                        │                        │
     │                          │                        │                        │
     │──── Start session ──────▶│                        │                        │
     │                          │──── Get agent config ─────────────────────────▶│
     │◀─── WebSocket URL ───────│                        │                        │
     │                          │                        │                        │
     │◀═══════════════════ WebSocket Connection ═══════════════════════════════▶│
     │                          │                        │                        │
     │──── User speaks ────────────────────────────────────────────────────────▶│
     │◀─── AI responds ────────────────────────────────────────────────────────│
     │          ...             │                        │                        │
     │──── End session ────────▶│                        │                        │
     │                          │──── Log to MongoDB ───▶│                        │
     │◀─── Show results ────────│                        │                        │
```

### Deployment Flow

```
Developer          OpenClaw          GitHub            Vercel           Production
    │                 │                 │                 │                  │
    │── Request ─────▶│                 │                 │                  │
    │                 │── git push ────▶│                 │                  │
    │                 │                 │── webhook ─────▶│                  │
    │                 │                 │                 │── build ────────▶│
    │                 │                 │                 │◀─── deploy ──────│
    │◀── Confirmed ───│                 │                 │                  │
```

---

## Environment Variables

### Vercel (Production)

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...

# ElevenLabs
NEXT_PUBLIC_ELEVENLABS_API_KEY=...

# MongoDB
MONGODB_URI=mongodb+srv://...

# Stripe (when enabled)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

---

## Security Considerations

1. **Authentication**: All protected routes require Clerk session validation
2. **API Keys**: Server-side only; never exposed to client (except NEXT_PUBLIC_*)
3. **CORS**: Configured for roleplaystudio.ai only
4. **Rate Limiting**: ElevenLabs has built-in rate limits; consider adding API route limits
5. **VPN Access**: OpenClaw development happens over Tailscale mesh network
6. **Webhook Verification**: Stripe webhooks verified with signing secret

---

## Cost Summary (Current)

| Service | Tier | Monthly Cost |
|---------|------|--------------|
| GoDaddy | Domain | ~$2 |
| Vercel | Hobby | $0 |
| Clerk | Free | $0 |
| Zoho Mail | Free | $0 |
| MongoDB Atlas | Free | $0 |
| ElevenLabs | Creator | ~$22 + usage |
| Stripe | Pay-as-you-go | 2.9% + $0.30/txn |
| GitHub | Free | $0 |
| Tailscale | Personal | $0 |
| **Total (fixed)** | | **~$24/mo** |

*Variable costs: ElevenLabs usage (~$0.10/minute of voice conversation)*

---

## Future Considerations

- **CDN/WAF**: Cloudflare for DDoS protection and caching
- **Analytics**: Heap, Mixpanel, or PostHog for user behavior
- **Error Tracking**: Sentry for production error monitoring
- **Email Transactional**: Resend or SendGrid for automated emails (welcome, receipts)
- **Video Avatars**: HeyGen or D-ID for v1.5 visual personas

---

## Related Documentation

- [Master Documentation](./master-documentation.md)
- [Cloudflare Email Setup](./cloudflare-email-setup.md) *(deprecated - using Zoho)*
- [ElevenLabs Agent IDs](./elevenlabs-agents.md)
