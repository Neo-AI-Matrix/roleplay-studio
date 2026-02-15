# Token Economics & Pricing Model Research

*Research Date: 2026-02-15*

---

## Current Pricing Structure

**Roleplay Studio Subscription:** $29/month (flat rate)

---

## Cost Breakdown Per Service

### ElevenLabs Conversational AI
| Plan | Cost/Minute | Notes |
|------|-------------|-------|
| Starter | $0.10 | 10 cents/min |
| Creator | $0.10 | 10 cents/min |
| Pro | $0.10 | 10 cents/min |
| Business (annual) | $0.08 | 8 cents/min |
| Enterprise | Custom | Can go lower |

**Important:** LLM costs are currently absorbed by ElevenLabs but will be passed on eventually.

### OpenAI GPT-4o-mini (Text-based practice)
| Type | Cost per 1M tokens |
|------|-------------------|
| Input | $0.15 |
| Output | $0.60 |

Average chat session: ~500 input + ~300 output = ~0.0003 ($0.0003/response)

### Claude 3.5 Sonnet (Advanced scenarios)
| Type | Cost per 1M tokens |
|------|-------------------|
| Input | $3.00 |
| Output | $15.00 |

---

## Usage Scenarios Analysis

### Scenario A: "Normal User"
A legitimate user practicing 2-3 scenarios per week.

| Activity | Amount | Cost |
|----------|--------|------|
| Voice sessions | 4 × 10min = 40 min/month | $4.00 |
| Text chat (fallback) | 20 exchanges | $0.01 |
| **Monthly Total** | | **$4.01** |

**Profit Margin:** $29 - $4.01 = **$24.99 (86%)**

### Scenario B: "Heavy User"
Power user training daily.

| Activity | Amount | Cost |
|----------|--------|------|
| Voice sessions | 30 × 15min = 450 min/month | $45.00 |
| Text chat | 100 exchanges | $0.03 |
| **Monthly Total** | | **$45.03** |

**Loss:** $29 - $45.03 = **-$16.03**

### Scenario C: "Malicious Abuser"
Bot/shared account running 24/7.

| Activity | Amount | Cost |
|----------|--------|------|
| Voice sessions | 720 hours (24/7) = 43,200 min | $4,320.00 |
| **Monthly Total** | | **$4,320.00** |

**Loss:** $29 - $4,320 = **-$4,291** 😱

---

## Risk Assessment

### 1. Account Sharing Risk: **HIGH**
If someone shares their $29 account with 30 people:
- 30 users × 40 min each = 1,200 minutes
- Cost: $120
- Loss: $91/month per shared account

### 2. Bot Abuse Risk: **CRITICAL**
Automated scripts could:
- Run voice sessions 24/7
- Burn thousands of dollars in hours
- One abuser could bankrupt the business

### 3. Single Heavy User Risk: **MODERATE**
15-30 min/day = breakeven to small loss
Manageable if rare, problematic if common

---

## Break-Even Analysis

At $0.10/minute and $29/month:
- **Break-even:** 290 minutes/month (4.8 hours)
- **Daily safe limit:** ~10 minutes/day

If average user exceeds 10 min/day consistently, you're losing money.

---

## Recommended Pricing Models

### Option 1: Usage Caps (Recommended for Launch)
Keep $29/month but add caps:

| Tier | Price | Voice Minutes | Overage |
|------|-------|---------------|---------|
| Starter | $29/month | 100 min | Not allowed |
| Pro | $49/month | 300 min | $0.15/min |
| Team | $99/month | 1000 min | $0.12/min |

**Pros:** Simple, protects against abuse, encourages upgrades
**Cons:** May frustrate power users

### Option 2: Tiered Usage-Based
Charge based on actual usage:

| Tier | Base | Included | Overage |
|------|------|----------|---------|
| Free | $0 | 10 min trial | N/A |
| Basic | $19/month | 60 min | $0.20/min |
| Pro | $39/month | 200 min | $0.15/min |
| Unlimited | $99/month | "Unlimited"* | N/A |

*Unlimited = 1000 min soft cap, then throttled

**Pros:** Fairer, scales with usage
**Cons:** Complex, billing friction

### Option 3: Per-Session Pricing
Charge per training session instead of subscription:

| Session Type | Price |
|--------------|-------|
| 10-min voice session | $2.99 |
| Session bundle (5) | $9.99 |
| Session bundle (20) | $29.99 |

**Pros:** No abuse risk, clear value
**Cons:** Higher friction, may reduce engagement

### Option 4: Hybrid (My Recommendation)
$29/month includes 100 voice minutes
- Soft cap with warning at 80%
- Hard cap at 150% (150 min)
- Option to buy more: $10/50 min add-on
- Anti-abuse: max 60 min/day per account

---

## Anti-Abuse Technical Measures

### 1. Rate Limiting
```
- Max 60 minutes voice/day per account
- Max 20 sessions/day per account
- Max 2 concurrent sessions per account
```

### 2. Session Validation
```
- Require microphone input (detects bot silence)
- CAPTCHA before starting session (blocks bots)
- Minimum 30-second gaps between sessions
```

### 3. Account Monitoring
```
- Flag accounts using >200 min/month
- Require phone verification at signup
- IP-based session limits (max 3 IPs per account)
```

### 4. Admin Alerts
```
- Alert when any user exceeds 50 min/day
- Alert when total system usage exceeds budget
- Weekly usage reports
```

---

## Financial Projections

### Scenario: 100 Users at $29/month

**Revenue:** $2,900/month

**Cost Assumptions:**
- 80 normal users (40 min each): $320
- 15 heavy users (200 min each): $300
- 5 abusers (500 min each): $250 (with caps)

**Total Cost:** $870/month
**Gross Profit:** $2,030/month (70% margin)

Without caps: 5 abusers at 2000 min each = $1,000 extra
**Reduced Profit:** $1,030/month (35% margin)

---

## Recommendations

### Immediate Actions (Before Launch)
1. **Implement usage caps** - 100 min/month for $29 tier
2. **Add rate limiting** - 60 min/day max
3. **Require phone verification** - Reduces fake accounts
4. **Build usage dashboard** ✅ (Already done)

### Short-Term (First Month)
1. Monitor actual usage patterns
2. Adjust caps based on real data
3. Consider tiered pricing if demand supports it

### Long-Term Considerations
1. ElevenLabs will start charging for LLM costs - factor 20-30% increase
2. Consider annual plans (20% discount) for committed users
3. Enterprise/team pricing for B2B sales

---

## Competitive Analysis

| Competitor | Pricing | Notes |
|------------|---------|-------|
| Quantified.ai | Custom (enterprise) | $500+/mo minimum |
| Zenarate | Custom (enterprise) | Contact centers only |
| Second Nature | $30-50/user/mo | Caps included |
| Rehearsal VRP | Per-seat, usage-based | Complex pricing |

**Conclusion:** $29/mo with 100 min cap is competitive for prosumer market.

---

## TL;DR

**YES, someone can absolutely abuse your flat-rate pricing.** A single bot could cost you $4,000+ in a month.

**Solution:** Implement usage caps (100 min/month at $29) with rate limiting (60 min/day). This protects you while still offering excellent value to legitimate users.

**Break-even:** 290 minutes. Safe target: 100 minutes/user/month.

---

*Research complete. Recommend implementing caps before launch.*
