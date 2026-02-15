# Roleplay Studio - Master Documentation

*Last Updated: 2026-02-15*

---

## Project Overview

**Roleplay Studio** (roleplaystudio.ai) is a voice-based AI training platform for sales, support, HR, communication, and leadership skills using ElevenLabs Conversational AI.

### Architecture
| Component | Service | Status |
|-----------|---------|--------|
| Domain | GoDaddy | ✅ Active |
| Hosting | Vercel | ✅ Active |
| Email | Cloudflare (pending) | ⏳ Setup |
| Voice AI | ElevenLabs Conversational AI | ✅ Active |
| Authentication | Clerk | ✅ Active |
| Repository | github.com/Neo-AI-Matrix/roleplay-studio | ✅ Active |

### Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Auth:** Clerk (trial tracking via publicMetadata)
- **Voice:** ElevenLabs Conversational AI SDK
- **LLM:** OpenAI (GPT-4o, GPT-4o mini) + Claude 3.5 Sonnet

---

## Training Categories

| Category | Scenarios | Color |
|----------|-----------|-------|
| **Sales** | 9 | Violet |
| **Support** | 4 | Cyan |
| **HR** | 4 | Amber |
| **Communication** | 4 | Emerald |
| **Leadership** | 4 | Rose |

**Total: 25 scenarios**

---

## ElevenLabs Voice Agents (15 Created)

### Original Agents
| Persona | Agent ID | Difficulty |
|---------|----------|------------|
| Margaret Chen | `agent_3901khdf29g6ej0th4936tv0v5kp` | Intermediate |
| David Morrison | `agent_9901khek0x51e4fr70qqqm454nt2` | Advanced |
| Richard Thompson | `agent_7601khem9sftee9rzw5y3a02v5jt` | Advanced |
| Tom Bradley | `agent_8401khemk42ee1t9mas1mwyx6p8e` | Intermediate |
| Victoria Hayes | `agent_1601kheqtkkzetxsx4184v2sfp7a` | Advanced |
| Sarah Mitchell | `agent_1601kher202jfrh8n9wvpech30zh` | Beginner |

### New Agents (API-Created)
| Persona | Agent ID | Difficulty |
|---------|----------|------------|
| Jennifer Walsh | `agent_5301khey0276fre8bp3r6m60a6yb` | Intermediate |
| Marcus Price | `agent_2101khey048tev8ar79jtfsbxmzt` | Advanced |
| Robert Chen | `agent_0201khey0619fagay55ce9h7b1vs` | Intermediate |
| Patricia Donovan | `agent_6801khey07z3fehsp3fefz9s9zjm` | Advanced |
| Dr. Michael Torres | `agent_6001khey09pwerrrkbq6rwpc1sz1` | Advanced |
| Derek Morrison | `agent_6701khey0bzmfpabg1dkse7degxg` | Intermediate |
| Amanda Foster | `agent_4701khey0dsefn9abr1t392fh615` | Beginner |
| Frank Deluca | `agent_4301khey0fgtejct5et5svdme9vm` | Advanced |
| Rachel Okonkwo | `agent_4901khey0hbrf41sekwa82pnamv6` | Intermediate |

### Agents Still Needed (Communication & Leadership)
- Mark Davidson, Diana Reeves, Alex Torres, Jordan Blake
- Sam Parker, Taylor Morgan, Catherine Walsh, Jamie Chen

---

## Voice Configuration Standards

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
- Beginner: 250 tokens (more words for confusion)
- Intermediate: 200 tokens (balanced)
- Advanced: 150 tokens (short, authoritative)

---

## Subscription & Trial Model

### Trial
- **Duration:** 7 days
- **Credit card:** Required
- **Auto-convert:** Monthly subscription
- **Tracking:** Clerk `publicMetadata.trialStartedAt`
- **UI:** Green countdown theme

### Pricing (Current)
- **Monthly:** $29/month
- **Annual:** TBD

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `/src/lib/scenarios.ts` | All 25 scenarios with prompts, evaluation criteria |
| `/docs/elevenlabs-agent-prompts.md` | Voice agent configuration guide |
| `/docs/cloudflare-email-setup.md` | Email routing setup instructions |
| `/docs/gtm-first-30-customers.md` | Go-to-market strategy |
| `/src/app/studio/voice/[scenarioId]/page.tsx` | Voice session page |
| `/src/app/api/elevenlabs-token/route.ts` | Token generation API |
| `/scripts/create-agents.js` | ElevenLabs agent creation script |

---

## Environment Variables

| Variable | Purpose | Location |
|----------|---------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk auth (public) | Vercel |
| `CLERK_SECRET_KEY` | Clerk auth (secret) | Vercel |
| `OPENAI_API_KEY` | Chat completions | Vercel |
| `ELEVENLABS_API_KEY` | Voice agents | Vercel |

---

## UI/UX Decisions

- **Voice session layout:** Side-by-side (agent+controls left, transcript right)
- **Briefing panel:** Visible by default
- **Transcript:** Auto-scroll enabled
- **Social links:** Removed (no accounts yet)
- **Demo CTA:** "See How It Works" → /product, "Request Demo" → /contact
- **User metrics:** Removed fake "10,000+ users" — now shows "25+ AI Scenarios"

---

## Completed Work (as of 2026-02-14)

- [x] 15 ElevenLabs voice agents created
- [x] All agents at 1.2x speed
- [x] Trial CTAs fixed across site
- [x] Voice session redesigned (side-by-side)
- [x] Transcript auto-scroll fixed
- [x] Agent creation script built
- [x] 5 training categories implemented
- [x] 25 scenarios (8 new: Communication + Leadership)
- [x] FAQs added to all 9 pages
- [x] Button/link audit complete
- [x] Removed placeholder social links
- [x] Honest messaging (no fake stats)

---

## In Progress

- [ ] Create 8 voice agents for Communication & Leadership
- [ ] Generate avatar images for new personas
- [ ] Cloudflare email routing
- [ ] Admin token dashboard
- [ ] Usage monitoring and caps
- [ ] Video demo

---

## Known Issues

1. **8 scenarios missing voice agents** - Communication & Leadership personas need creation
2. **No usage tracking** - Can't monitor token consumption per user
3. **API keys in .env.local** - Need security review for production

---

*Documentation maintained by Neo (AI Assistant)*
