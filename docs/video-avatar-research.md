# Video Avatar Research for Roleplay Studio

*Research Date: 2026-02-15*

---

## Executive Summary

Adding video avatars to Roleplay Studio personas is **technically feasible** but adds significant complexity and cost. The two main approaches are:

1. **Pre-recorded videos** - Create video introductions for each persona (simpler)
2. **Real-time video avatars** - Live interactive video during training (complex)

---

## Platform Comparison

### Top Video Avatar Platforms (2026)

| Platform | Pricing | Best For | Real-Time? |
|----------|---------|----------|------------|
| **HeyGen** | $29/mo (creator) | Enterprise video, quality | Yes (LiveAvatar) |
| **D-ID** | $5.99/mo (lite) | AI Agents, affordable | Yes (AI Agents 2.0) |
| **Synthesia** | $29/mo (starter) | Enterprise L&D | Limited |
| **Tavus** | Custom | Personalized video | Yes |

### Detailed Comparison

#### HeyGen
- **Avatar IV** - Most realistic avatars with micro-expressions
- **175+ languages** supported
- **LiveAvatar** - Real-time interactive conversations
- **Unlimited videos** on paid plans
- **SOC 2 Type II** certified
- **Custom avatars:** $199/year (photo) to $1000/year (video)
- **G2's fastest-growing product** - $95M ARR

#### D-ID
- **AI Agents 2.0** - Autonomous conversational AI
- **$5.99/mo entry price** - Most affordable
- **CES 2026 Innovation Award**
- **Microsoft Teams integration**
- **Photo-to-video** - Animate any photo
- **Simpleshow acquisition** - Explainer video platform

#### Synthesia
- **Enterprise focused** - Strong in L&D
- **100+ stock avatars**
- **Web avatars** for interactive experiences
- **No photo avatars**
- **10-min monthly cap** at starter tier

---

## Integration Options for Roleplay Studio

### Option A: Pre-Recorded Video Intros (Recommended for Launch)

**Concept:** Each persona has a 30-60 second video introduction that plays before the voice session.

**Implementation:**
1. Create 15 persona videos using HeyGen or D-ID
2. Host on Vercel/Cloudflare (or embed from platform)
3. Play video when user selects a scenario
4. After intro, transition to voice-only session

**Cost Estimate:**
- HeyGen Creator: $29/month
- 15 videos × 1 minute = 15 minutes (well under limits)
- One-time creation, then just hosting

**Pros:**
- Simple integration (just video embeds)
- No real-time complexity
- Professional production quality
- ~$30/month total cost

**Cons:**
- Not interactive during video
- Persona doesn't visually respond in real-time

### Option B: Real-Time Video Avatar (Advanced)

**Concept:** Users see a video avatar that moves and speaks during the entire training session.

**Implementation:**
1. Use D-ID AI Agents 2.0 or HeyGen LiveAvatar
2. Replace/augment ElevenLabs voice with video stream
3. Sync video avatar lip movements with voice output
4. Handle two-way real-time communication

**Technical Requirements:**
- WebRTC or similar for video streaming
- Video avatar API integration
- Latency management (<2 seconds for natural conversation)
- Mobile optimization (bandwidth concerns)

**Cost Estimate:**
- D-ID Agents: $0.05-0.15/minute (estimated)
- HeyGen LiveAvatar: Enterprise pricing (likely $0.20+/minute)
- **$29/month subscription could burn $100+ in video costs**

**Pros:**
- Immersive experience
- Visual feedback during roleplay
- Strong differentiation

**Cons:**
- Significant cost increase (2-3x voice-only)
- Technical complexity
- Latency challenges
- May not work well on mobile

### Option C: Hybrid Approach (Future Consideration)

**Concept:** Video intro + occasional video reactions during session.

**Implementation:**
1. Pre-recorded intro plays at start
2. Voice-only during main conversation
3. Video clips trigger at key moments (frustration, satisfaction)
4. End-of-session video feedback

**Cost:** Moderate (~$50-100/month estimated)

---

## Technical Integration Details

### D-ID AI Agents 2.0 Integration

```javascript
// Example D-ID Agent embedding
const agent = new DIDAgent({
  agentId: 'your-agent-id',
  apiKey: process.env.DID_API_KEY,
  container: document.getElementById('video-container'),
  onMessage: (text) => handleAgentResponse(text),
  onUserInput: (text) => processUserInput(text)
});

agent.start();
```

### HeyGen LiveAvatar Integration

```javascript
// HeyGen requires enterprise plan for API access
// Integration via their SDK (documentation limited)
const avatar = await HeyGen.createLiveSession({
  avatarId: 'custom-avatar-id',
  voiceId: 'voice-settings',
  streamUrl: rtmpEndpoint
});
```

---

## Cost Analysis for Roleplay Studio

### Current: Voice-Only
- ElevenLabs: ~$0.10/minute
- 100 min/user/month = $10/user

### With Video (D-ID)
- D-ID Agents: ~$0.10-0.15/minute
- ElevenLabs: $0 (D-ID provides voice)
- 100 min/user/month = $10-15/user

### With Video (HeyGen LiveAvatar)
- HeyGen: ~$0.20+/minute (enterprise)
- 100 min/user/month = $20+/user

**Conclusion:** Video adds 50-100%+ to per-minute costs.

---

## Recommendations

### For MVP/Launch
**Do not add real-time video.** Too complex, too expensive, not necessary for core value.

### For Version 1.5 (Post-Launch)
Add **pre-recorded video intros** for each persona:
1. Sign up for HeyGen Creator ($29/month)
2. Create 15 × 60-second persona intro videos
3. Embed before voice session starts
4. One-time effort, minimal ongoing cost

### For Version 2.0 (When Profitable)
Evaluate real-time video based on:
1. User feedback (do they want it?)
2. Margin (can you afford 2x costs?)
3. Technical capacity (WebRTC expertise?)

---

## Tools Needed to Build Video Avatars

| Task | Tool | Cost |
|------|------|------|
| Create avatar videos | HeyGen or D-ID | $30/mo |
| Custom persona photos | Midjourney or DALL-E | $20/mo |
| Video editing | CapCut (free) or Premiere | Free-$20/mo |
| Hosting videos | Vercel/Cloudflare | Free (bundled) |

### Creation Process

1. **Generate persona photos** using AI (if you don't have them)
2. **Write intro scripts** for each persona (30-60 seconds)
3. **Create videos** in HeyGen/D-ID using photos + scripts
4. **Export at 1080p**
5. **Upload to /public/videos/** or CDN
6. **Embed in scenario pages**

---

## Example Persona Video Script

**Margaret Chen (Angry Customer)**

> "Hi there. Look, I've been a customer for three years, and I've never had to call this many times about the same issue. My account keeps getting locked, I've missed payments, and honestly? I'm about ready to take my business elsewhere. So whoever I'm talking to today better have some real answers for me."

*[Crosses arms, frustrated expression]*

---

## TL;DR

**Video avatars are cool but expensive.**

- **For launch:** Skip real-time video, focus on voice quality
- **Quick win:** Pre-recorded 60-second intro videos ($30/month)
- **Future:** Real-time video when you have profit margin to support it

**Recommended platform:** HeyGen for quality, D-ID for budget.

---

*Research complete. Recommend pre-recorded intros as Phase 2 feature.*
