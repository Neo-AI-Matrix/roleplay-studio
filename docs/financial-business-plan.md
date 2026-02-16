# Roleplay Studio AI - Financial Business Plan

**Version:** 1.0  
**Date:** February 2026  
**Prepared by:** Neo (AI Assistant)

---

## Executive Summary

Roleplay Studio is a voice-based AI training platform using ElevenLabs Conversational AI for realistic roleplay simulations. The platform targets sales teams, support organizations, HR departments, and professionals seeking to improve their communication skills.

**Business Model:** B2C SaaS subscription at $29/month  
**Target Market:** Individual professionals, small teams, enterprise (future)  
**Key Differentiator:** Voice-first AI training with realistic personas and instant feedback

---

## Revenue Model

### Pricing Structure

| Plan | Price | Target Audience |
|------|-------|-----------------|
| Individual | $29/month | Professionals, freelancers |
| Team (future) | $25/user/month | Small teams (5-20) |
| Enterprise (future) | Custom | Large organizations |

### Usage Caps (Cost Protection)

| Plan | Voice Minutes | Text Sessions |
|------|---------------|---------------|
| Individual | 100 min/month | Unlimited |
| Team | 100 min/user/month | Unlimited |

---

## 5-Year Revenue Projections

### Customer Growth Assumptions

| Year | Customers | MoM Growth | Notes |
|------|-----------|------------|-------|
| Year 1 | 50 → 200 | 15% | Launch, product-market fit |
| Year 2 | 200 → 800 | 12% | Scaling, marketing investment |
| Year 3 | 800 → 2,500 | 10% | Market expansion, team plans |
| Year 4 | 2,500 → 6,000 | 8% | Enterprise sales |
| Year 5 | 6,000 → 12,000 | 6% | Market maturity |

### Annual Revenue Projections

| Year | Avg Customers | Monthly Revenue | Annual Revenue |
|------|---------------|-----------------|----------------|
| Year 1 | 100 | $2,900 | $34,800 |
| Year 2 | 500 | $14,500 | $174,000 |
| Year 3 | 1,650 | $47,850 | $574,200 |
| Year 4 | 4,250 | $123,250 | $1,479,000 |
| Year 5 | 9,000 | $261,000 | $3,132,000 |

---

## Cost Structure

### 1. ElevenLabs (Primary Cost Driver)

#### Conversational AI Pricing (Feb 2025)

| Plan | Cost per Minute | Best For |
|------|-----------------|----------|
| Creator/Pro | $0.10/min | < 100 customers |
| Business (annual) | $0.08/min | 100-1,000 customers |
| Enterprise | Negotiable | 1,000+ customers |

#### Text-to-Speech Pricing

| Plan | Cost per 1K chars | Notes |
|------|-------------------|-------|
| Pro | $0.24 | ~100 chars per message |
| Business | $0.12 | Better for scale |

#### Monthly ElevenLabs Cost Projections

**Assumptions:**
- Average usage: 50% of cap (50 min/user/month)
- Mix: 70% voice, 30% text
- Text: ~1,000 chars/session, 5 sessions/month

| Customers | Voice Minutes | Voice Cost | Text Cost | Total ElevenLabs |
|-----------|---------------|------------|-----------|------------------|
| 50 | 1,750 | $175 | $30 | **$205** |
| 200 | 7,000 | $700 | $120 | **$820** |
| 500 | 17,500 | $1,400 | $300 | **$1,700** |
| 1,000 | 35,000 | $2,800 | $600 | **$3,400** |
| 2,500 | 87,500 | $7,000 | $1,500 | **$8,500** |
| 5,000 | 175,000 | $14,000 | $3,000 | **$17,000** |

*Note: Enterprise pricing could reduce these costs by 20-40%*

---

### 2. Infrastructure Costs

#### Vercel (Hosting & Deployment)

| Tier | Monthly Cost | When to Use |
|------|--------------|-------------|
| Hobby | $0 | Development only |
| Pro | $20/seat + usage | Launch - 500 customers |
| Enterprise | Custom | 500+ customers |

**Estimated Usage Costs (Pro Plan):**

| Customers | Edge Requests | Functions | Bandwidth | Est. Total |
|-----------|---------------|-----------|-----------|------------|
| 200 | $0 (included) | ~$20 | ~$10 | **$50** |
| 1,000 | ~$20 | ~$100 | ~$50 | **$200** |
| 5,000 | ~$100 | ~$500 | ~$200 | **$850** |

---

#### Clerk (Authentication)

| MAUs | Monthly Cost | Notes |
|------|--------------|-------|
| 0 - 50,000 | **$0** | Free tier |
| 50,001 - 100,000 | $0.02/MAU | $1,000 max |
| 100,001+ | $0.018/MAU | Volume discount |

**Projected Clerk Costs:**

| Customers | Est. MAUs | Monthly Cost |
|-----------|-----------|--------------|
| 200 | 200 | **$0** |
| 1,000 | 1,000 | **$0** |
| 5,000 | 5,000 | **$0** |
| 50,000 | 50,000 | **$0** |
| 60,000 | 60,000 | **$200** |

*Clerk is essentially free until you hit massive scale*

---

#### Stripe (Payment Processing)

**Standard Rate:** 2.9% + $0.30 per transaction

| Customers | Monthly Revenue | Stripe Fees |
|-----------|-----------------|-------------|
| 200 | $5,800 | **$228** |
| 500 | $14,500 | **$571** |
| 1,000 | $29,000 | **$1,140** |
| 5,000 | $145,000 | **$5,655** |

*Churn creates additional transaction volume for new signups*

---

#### GitHub

| Plan | Cost | Notes |
|------|------|-------|
| Free | $0 | Public repos, limited CI |
| Pro | $4/user/month | Private repos, more CI |
| Team | $4/user/month | Team features |

**Projected:** $4-20/month (1-5 contributors)

---

#### Domain & DNS

| Service | Annual Cost |
|---------|-------------|
| Domain (roleplaystudio.ai) | ~$30 |
| Cloudflare (optional) | $0-20/month |

---

### 3. AI Development & Support Costs

#### OpenClaw/Claude API (Building & Maintaining)

| Usage | Monthly Cost |
|-------|--------------|
| Development | ~$50-100 |
| Support automation | ~$20-50 |
| Testing | ~$20-30 |
| **Total** | **$90-180** |

---

### 4. Human Resources

#### Contract Developer (Part-Time)

| Role | Rate | Hours/Month | Monthly Cost |
|------|------|-------------|--------------|
| Senior Full-Stack | $100-150/hr | 10-20 hrs | $1,000-3,000 |
| Bug fixes only | $100/hr | 5 hrs | $500 |

**Projected Need:**
- Year 1: $500-1,000/month (bug fixes, small features)
- Year 2: $2,000-4,000/month (new features, scaling)
- Year 3+: Consider full-time hire ($8,000-15,000/month)

---

### 5. Compliance & Legal

#### SOC 2 Certification

| Component | Year 1 Cost | Annual Renewal |
|-----------|-------------|----------------|
| Readiness Assessment | $5,000-10,000 | - |
| Compliance Platform (Vanta, Drata) | $10,000-15,000/yr | $10,000-15,000 |
| Type 1 Audit | $10,000-20,000 | - |
| Type 2 Audit | $15,000-30,000 | $15,000-25,000 |
| **Total Year 1** | **$30,000-50,000** | |
| **Annual After** | | **$25,000-40,000** |

**Timeline:** Pursue SOC 2 when enterprise deals require it (Year 2-3)

#### Other Legal/Compliance

| Item | Cost | Frequency |
|------|------|-----------|
| Terms of Service / Privacy Policy | $1,000-3,000 | One-time |
| Business Insurance | $500-2,000/yr | Annual |
| Accounting/Bookkeeping | $200-500/month | Monthly |

---

### 6. Marketing & Growth

#### Digital Marketing Budget

| Channel | Monthly Budget | Notes |
|---------|----------------|-------|
| LinkedIn Ads | $500-2,000 | B2B targeting |
| Google Ads | $300-1,000 | Search intent |
| Content Marketing | $500-1,500 | Blog, SEO |
| Social Media | $200-500 | Organic + boosted |
| Email Marketing (ConvertKit) | $29-79 | Automation |
| **Total** | **$1,500-5,000** | |

#### Growth Investments

| Item | Cost | When |
|------|------|------|
| Product Hunt Launch | $0 (+ optional $500) | Month 3-6 |
| Affiliate Program | 20% revenue share | Month 6+ |
| Video Production | $500-2,000 | Quarterly |
| Conference Sponsorship | $2,000-10,000 | Year 2+ |
| PR/Media Outreach | $2,000-5,000/month | Year 2+ |

---

## Monthly Operating Cost Summary

### Year 1 (50-200 Customers)

| Category | Low Est. | High Est. |
|----------|----------|-----------|
| ElevenLabs | $200 | $850 |
| Vercel | $20 | $75 |
| Clerk | $0 | $0 |
| Stripe Fees | $50 | $230 |
| GitHub | $4 | $20 |
| AI/OpenClaw | $90 | $180 |
| Developer (contract) | $500 | $1,500 |
| Marketing | $500 | $2,000 |
| Accounting | $200 | $400 |
| Misc/Buffer | $100 | $300 |
| **Total Monthly** | **$1,664** | **$5,555** |

### Year 2 (200-800 Customers)

| Category | Low Est. | High Est. |
|----------|----------|-----------|
| ElevenLabs | $800 | $2,500 |
| Vercel | $75 | $200 |
| Clerk | $0 | $0 |
| Stripe Fees | $400 | $1,000 |
| GitHub | $20 | $50 |
| AI/OpenClaw | $150 | $300 |
| Developer (contract) | $2,000 | $4,000 |
| Marketing | $2,000 | $5,000 |
| Legal/Compliance | $500 | $1,500 |
| Accounting | $300 | $500 |
| **Total Monthly** | **$6,245** | **$15,050** |

### Year 3+ (800+ Customers, SOC 2)

| Category | Monthly Est. |
|----------|--------------|
| ElevenLabs | $5,000-15,000 |
| Infrastructure | $500-1,500 |
| Stripe Fees | $1,500-5,000 |
| Full-time Developer | $10,000-15,000 |
| Marketing | $5,000-15,000 |
| SOC 2 (amortized) | $2,500-4,000 |
| Legal/Accounting | $1,000-2,000 |
| **Total Monthly** | **$25,500-57,500** |

---

## Profitability Analysis

### Year 1 - Path to Profitability

| Customers | Monthly Revenue | Est. Costs | Profit/Loss |
|-----------|-----------------|------------|-------------|
| 50 | $1,450 | $1,700 | **-$250** |
| 100 | $2,900 | $2,500 | **+$400** |
| 150 | $4,350 | $3,500 | **+$850** |
| 200 | $5,800 | $4,500 | **+$1,300** |

**Break-even: ~75-100 customers**

### 5-Year P&L Summary

| Year | Revenue | Costs | Net Profit | Margin |
|------|---------|-------|------------|--------|
| 1 | $35,000 | $40,000 | -$5,000 | -14% |
| 2 | $174,000 | $120,000 | $54,000 | 31% |
| 3 | $574,000 | $350,000 | $224,000 | 39% |
| 4 | $1,479,000 | $700,000 | $779,000 | 53% |
| 5 | $3,132,000 | $1,200,000 | $1,932,000 | 62% |

---

## Key Metrics to Track

### Unit Economics

| Metric | Target |
|--------|--------|
| Customer Acquisition Cost (CAC) | < $100 |
| Lifetime Value (LTV) | > $350 (12+ months) |
| LTV:CAC Ratio | > 3:1 |
| Monthly Churn | < 5% |
| Gross Margin | > 70% |

### Operational Metrics

| Metric | Target |
|--------|--------|
| Average Session Length | 8-12 minutes |
| Sessions per User/Month | 4-8 |
| Voice vs Text Split | 70/30 |
| NPS Score | > 50 |

---

## Risk Factors & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| ElevenLabs price increase | High | Enterprise agreement, usage caps |
| LLM costs passed through | Medium | Built into pricing model |
| Low adoption | High | Marketing, product iteration |
| High churn | High | Onboarding, engagement features |
| Competition | Medium | Differentiation, voice quality |
| SOC 2 requirements | Medium | Plan early, budget allocated |

---

## Funding Requirements

### Bootstrap Path (Recommended)

| Phase | Duration | Investment Needed |
|-------|----------|-------------------|
| MVP Launch | Months 1-3 | $5,000 (already invested) |
| Growth Phase | Months 4-12 | $10,000-20,000 |
| Scaling | Year 2 | Profitable, reinvest |

### If Seeking Investment

| Stage | Raise | Use of Funds |
|-------|-------|--------------|
| Pre-seed | $50-100K | Marketing, dev contractor |
| Seed | $500K-1M | Full-time team, enterprise features |

---

## Action Items

### Immediate (Month 1)
- [ ] Apply for ElevenLabs Startup Grant (12 months free)
- [ ] Set up proper accounting (Wave, QuickBooks)
- [ ] Launch with 100-minute usage cap

### Short-term (Months 2-6)
- [ ] Implement usage tracking dashboard
- [ ] Launch affiliate program
- [ ] Product Hunt launch
- [ ] Hit 100 paying customers

### Medium-term (Months 6-12)
- [ ] Evaluate team plan pricing
- [ ] Begin SOC 2 readiness assessment
- [ ] Hire contract developer
- [ ] Hit 500 paying customers

---

## Appendix: Cost Assumptions

### ElevenLabs Volume Discounts

| Annual Spend | Expected Discount |
|--------------|-------------------|
| $10,000+ | 10-15% |
| $50,000+ | 15-25% |
| $100,000+ | 25-40% |

### Stripe Volume Pricing

| Monthly Volume | Rate |
|----------------|------|
| < $1M | 2.9% + $0.30 |
| $1M+ | 2.5% + $0.30 (negotiable) |

---

*This financial plan should be reviewed quarterly and updated based on actual performance data.*
