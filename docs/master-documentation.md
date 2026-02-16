# Roleplay Studio - Master Documentation

*Last Updated: 2026-02-16*

---

## Project Overview

**Roleplay Studio** (roleplaystudio.ai) is a voice-based AI training platform for sales, support, HR, communication, and leadership skills using ElevenLabs Conversational AI.

### Quick Links
- **Live Site:** https://roleplaystudio.ai
- **Repository:** https://github.com/Neo-AI-Matrix/roleplay-studio
- **ElevenLabs Dashboard:** https://elevenlabs.io/conversational-ai
- **Clerk Dashboard:** https://dashboard.clerk.com
- **Vercel Dashboard:** https://vercel.com

---

## Architecture

| Component | Service | Status |
|-----------|---------|--------|
| Domain | GoDaddy | ✅ Active |
| Hosting | Vercel | ✅ Active |
| Email | Cloudflare (pending) | ⏳ Setup |
| Voice AI | ElevenLabs Conversational AI | ✅ Active |
| Authentication | Clerk | ✅ Active |
| Repository | GitHub | ✅ Active |

### Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Auth:** Clerk (trial tracking via publicMetadata)
- **Voice:** ElevenLabs Conversational AI SDK
- **LLM:** OpenAI (GPT-4o, GPT-4o mini) + Claude 3.5 Sonnet
- **Icons:** Lucide React

---

## Training Categories

| Category | Icon | Color | Scenarios | Description |
|----------|------|-------|-----------|-------------|
| **Sales** | Briefcase | Violet | 9 | Discovery calls, objection handling, upselling |
| **Support** | Headphones | Cyan | 4 | De-escalation, troubleshooting, enterprise clients |
| **HR** | Users | Amber | 4 | Raises, performance reviews, terminations, conflicts |
| **Communication** | MessageSquare | Emerald | 4 | Pitching, presentations, stakeholder updates, Q&A |
| **Leadership** | Crown | Rose | 4 | Feedback, coaching, executive presence, change management |

**Total: 25 scenarios with 27 voice agents**

---

## All Scenarios & Voice Agents

### Sales (9 Scenarios)

| # | ID | Title | Persona | Difficulty | Agent ID |
|---|-----|-------|---------|------------|----------|
| 1 | `sales-discovery` | Sales Discovery Call | David Morrison | Beginner | `agent_9901khek0x51e4fr70qqqm454nt2` |
| 2 | `skeptical-cfo` | Skeptical CFO | Richard Thompson | Advanced | `agent_7601khem9sftee9rzw5y3a02v5jt` |
| 3 | `upsell-opportunity` | Upsell to Happy Customer | Sarah Mitchell | Intermediate | `agent_1601kher202jfrh8n9wvpech30zh` |
| 4 | `busy-decision-maker` | Busy Decision Maker | Jennifer Walsh | Intermediate | `agent_5301khey0276fre8bp3r6m60a6yb` |
| 5 | `price-shopper` | Price Shopper | Marcus Price | Intermediate | `agent_2101khey048tev8ar79jtfsbxmzt` |
| 6 | `cautious-prospect` | Cautious Prospect | Robert Chen | Intermediate | `agent_0201khey0619fagay55ce9h7b1vs` |
| 7 | `chatty-executive` | Chatty Executive | Patricia Donovan | Beginner | `agent_6801khey07z3fehsp3fefz9s9zjm` |
| 8 | `technical-buyer` | Technical Buyer | Dr. Michael Torres | Advanced | `agent_6001khey09pwerrrkbq6rwpc1sz1` |
| 9 | `happy-customer-upsell` | Happy Customer Upsell | Amanda Foster | Beginner | `agent_4701khey0dsefn9abr1t392fh615` |
| 10 | `budget-conscious-upsell` | Budget Conscious Upsell | Frank Deluca | Intermediate | `agent_4301khey0fgtejct5et5svdme9vm` |
| 11 | `growth-focused-upsell` | Growth-Focused Upsell | Rachel Okonkwo | Intermediate | `agent_4901khey0hbrf41sekwa82pnamv6` |

### Support (4 Scenarios)

| # | ID | Title | Persona | Difficulty | Agent ID |
|---|-----|-------|---------|------------|----------|
| 1 | `angry-customer` | Angry Customer | Margaret Chen | Intermediate | `agent_3901khdf29g6ej0th4936tv0v5kp` |
| 2 | `confused-user` | Confused User | Tom Bradley | Beginner | `agent_8401khemk42ee1t9mas1mwyx6p8e` |
| 3 | `demanding-client` | Demanding Enterprise Client | Victoria Hayes | Advanced | `agent_1601kheqtkkzetxsx4184v2sfp7a` |
| 4 | `angry-customer-billing` | Billing Dispute | Derek Morrison | Intermediate | `agent_6701khey0bzmfpabg1dkse7degxg` |

### HR (4 Scenarios)

| # | ID | Title | Persona | Difficulty | Agent ID |
|---|-----|-------|---------|------------|----------|
| 1 | `asking-for-raise` | Asking for a Raise | Karen Mitchell | Intermediate | `agent_4601khf0r5jhfhyrq4k73fapnw8v` |
| 2 | `underperforming-employee` | Managing Underperformance | Jason Peters | Intermediate | `agent_0801khf0r79hed782pbpvxtw72d6` |
| 3 | `difficult-coworker` | Difficult Coworker Conflict | Steve Collins | Advanced | `agent_9701khf0r91cebwacg766ev30zh8` |
| 4 | `termination-conversation` | Letting Someone Go | Lisa Chen | Advanced | `agent_7901khf0ratsfa6t0ey04gzt0dhp` |

### Communication (4 Scenarios)

| # | ID | Title | Persona | Difficulty | Agent ID |
|---|-----|-------|---------|------------|----------|
| 1 | `team-pitch` | Pitching Ideas to Team | Mark Davidson | Beginner | *Pending* |
| 2 | `stakeholder-update` | Stakeholder Status Update | Diana Reeves | Intermediate | *Pending* |
| 3 | `all-hands-presentation` | All-Hands Presentation | Alex Torres | Intermediate | *Pending* |
| 4 | `public-speaking-qa` | Handling Q&A | Jordan Blake | Advanced | *Pending* |

### Leadership (4 Scenarios)

| # | ID | Title | Persona | Difficulty | Agent ID |
|---|-----|-------|---------|------------|----------|
| 1 | `giving-feedback` | Giving Constructive Feedback | Sam Parker | Intermediate | *Pending* |
| 2 | `coaching-conversation` | Coaching a Direct Report | Taylor Morgan | Intermediate | *Pending* |
| 3 | `executive-presence` | Building Executive Presence | Catherine Walsh | Advanced | *Pending* |
| 4 | `leading-change` | Leading Through Change | Jamie Chen | Advanced | *Pending* |

---

## Voice Agent Configuration Standards

### Speed Requirement
**All agents: 1.2x speed (ElevenLabs maximum)**
- Slower speeds feel sluggish and frustrating

### Expressive Mode
| Persona Type | Expressive Mode | Why |
|--------------|-----------------|-----|
| Emotional (angry, frustrated, enthusiastic) | ✅ ON | Conveys emotion realistically |
| Controlled (CFO, executive) | ❌ OFF | Maintains authority/composure |

### LLM by Difficulty Level
| Difficulty | LLM Model | Temperature |
|------------|-----------|-------------|
| Beginner | GPT-4o mini | 0.7-0.8 |
| Intermediate | GPT-4o | 0.6-0.7 |
| Advanced | Claude 3.5 Sonnet | 0.5-0.6 |

### Max Tokens
| Difficulty | Max Tokens | Reason |
|------------|------------|--------|
| Beginner | 250 | More words for confusion/warmth |
| Intermediate | 200 | Balanced |
| Advanced | 150 | Short, authoritative |

---

## File Structure

```
roleplay-studio/
├── src/
│   ├── app/
│   │   ├── (marketing)/          # Public pages
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── enterprise/
│   │   │   ├── privacy/
│   │   │   ├── terms/
│   │   │   └── product/
│   │   ├── admin/                # Admin dashboard
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   ├── login/
│   │   │   │   ├── logout/
│   │   │   │   ├── session-end/
│   │   │   │   └── usage/
│   │   │   ├── chat/             # Text chat API
│   │   │   ├── elevenlabs-token/ # Voice session token
│   │   │   ├── speech/           # TTS API
│   │   │   └── trial/            # Trial status
│   │   ├── sign-in/              # Custom Clerk sign-in
│   │   ├── sign-up/              # Clerk sign-up
│   │   ├── sso-callback/         # OAuth callback
│   │   └── studio/
│   │       ├── page.tsx          # Scenario browser
│   │       ├── category/[category]/
│   │       ├── session/[scenarioId]/   # Text chat session
│   │       └── voice/[scenarioId]/     # Voice session
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── ui/                   # shadcn components
│   └── lib/
│       ├── scenarios.ts          # All 25 scenarios
│       └── utils.ts
├── public/
│   └── avatars/                  # Persona images
├── docs/                         # Documentation
│   ├── master-documentation.md   # This file
│   ├── elevenlabs-agent-prompts.md
│   ├── cloudflare-email-setup.md
│   ├── gtm-first-30-customers.md
│   ├── gtm-marketing-campaign.md
│   ├── security-audit.md
│   ├── token-economics-research.md
│   ├── user-generated-agents-research.md
│   ├── video-avatar-research.md
│   ├── video-demo-strategy.md
│   └── financial-business-plan.md
└── scripts/
    └── create-agents.js          # ElevenLabs agent creation
```

---

## API Endpoints

| Endpoint | Method | Purpose | Auth |
|----------|--------|---------|------|
| `/api/elevenlabs-token` | GET | Get signed URL for voice session | Clerk |
| `/api/chat` | POST | Text chat with scenario AI | Clerk |
| `/api/speech` | POST | Text-to-speech | Clerk |
| `/api/trial` | GET | Check trial status | Clerk |
| `/api/admin/login` | POST | Admin authentication | Password |
| `/api/admin/logout` | POST | Admin logout | Session |
| `/api/admin/usage` | GET/POST | Token usage tracking | Admin |
| `/api/admin/session-end` | POST | Log session completion | Admin |

---

## Environment Variables

### Required (Production)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `OPENAI_API_KEY` | OpenAI API (chat + TTS) |
| `ELEVENLABS_API_KEY` | ElevenLabs voice agents |

### Clerk Routes

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/studio` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | `/studio` |

### Admin

| Variable | Purpose |
|----------|---------|
| `ADMIN_PASSWORD` | Admin dashboard password |

---

## Authentication & Sessions

### Clerk Configuration
- **Trial duration:** 7 days
- **Trial tracking:** `publicMetadata.trialStartedAt`
- **Session inactivity timeout:** 2 hours (configure in Clerk Dashboard)
- **Session lifetime:** 7 days
- **Multi-session:** Enabled

### Sign-In Features
- Email/password authentication
- Google OAuth
- GitHub OAuth
- "Remember me" checkbox
- Custom styled to match dark theme

---

## Subscription & Pricing

### Trial
- **Duration:** 7 days
- **Credit card:** Required
- **Auto-convert:** Monthly subscription

### Pricing (Current)
- **Monthly:** $29/month
- **Annual:** TBD

---

## Token Economics

### ElevenLabs Costs
- Conversational AI: ~$0.08-0.12/minute
- WebSocket open without audio: No charge
- Pause feature: No additional cost

### Abuse Prevention
- Recommended cap: 100 minutes/month free tier
- Session timeout: 2 hours inactivity
- Usage tracking via admin dashboard

---

## Admin Dashboard

**URL:** `/admin`
**Features:**
- Session usage tracking
- Per-user token consumption
- Cost monitoring
- Session history

---

## UI/UX Decisions

- **Voice session layout:** Side-by-side (agent+controls left, transcript right)
- **Briefing panel:** Visible by default
- **Transcript:** Auto-scroll enabled
- **Theme:** Dark (navy + gradients)
- **Mobile menu:** 15px left padding
- **Social links:** Removed (no accounts yet)
- **Honest messaging:** No fake user counts

---

## Completed Work

### Core Platform
- [x] 25 training scenarios
- [x] 5 training categories
- [x] 19 ElevenLabs voice agents
- [x] Voice session with transcript
- [x] Text chat fallback
- [x] Trial system with Clerk
- [x] Custom sign-in with "Remember me"
- [x] Mobile-responsive design

### Documentation
- [x] Master documentation
- [x] ElevenLabs agent prompts guide
- [x] Security audit
- [x] Token economics research
- [x] GTM strategy
- [x] Financial business plan

### Admin
- [x] Admin dashboard
- [x] Usage tracking
- [x] Session logging

---

## In Progress / Pending

### Voice Agents
- [ ] Create 8 agents for Communication & Leadership scenarios

### Features
- [ ] Pause button (mute + visual indicator + 5-min timeout)
- [ ] Session inactivity timeout (configure in Clerk Dashboard)
- [ ] Cloudflare email setup

### Marketing
- [ ] Video demo
- [ ] Avatar images for new personas

---

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

---

## Deployment

Vercel auto-deploys on push to `main` branch.

### Environment Setup
1. Add all environment variables in Vercel dashboard
2. Configure Clerk webhooks if needed
3. Set up Cloudflare email routing

---

*Documentation maintained by Neo (AI Assistant)*
*Last updated: 2026-02-16*
