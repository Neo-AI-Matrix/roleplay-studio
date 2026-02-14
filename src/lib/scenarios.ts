export interface ScenarioBriefing {
  background: string;  // Who, what, when - sets the scene
  issue: string;       // What is the customer's problem
  goal: string;        // What the trainee should accomplish
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  category: 'sales' | 'support';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  briefing: ScenarioBriefing;  // Structured context for the trainee
  persona: {
    name: string;
    avatar: string;  // Path to avatar image in /public/avatars/
  };
  systemPrompt: string;
  openingLine: string;
  evaluationCriteria: string[];
  // ElevenLabs Conversational AI Agent ID (created in ElevenLabs dashboard)
  elevenLabsAgentId?: string;
}

export const scenarios: Record<string, Scenario> = {
  'angry-customer': {
    id: 'angry-customer',
    title: 'Customer Support - Angry Customer',
    description: 'Handle a frustrated customer whose account keeps getting locked. They\'ve called multiple times with no resolution.',
    category: 'support',
    difficulty: 'Intermediate',
    duration: '10-15 min',
    elevenLabsAgentId: 'agent_3901khdf29g6ej0th4936tv0v5kp',
    briefing: {
      background: 'Margaret Chen has been a customer for 3 years. She\'s calling the support line for the third time this week about a recurring account lockout issue. Previous agents promised follow-ups that never happened.',
      issue: 'Her online banking account keeps getting locked every 48 hours, causing her to miss an important payment. She\'s had to reset her password 3 times and feels ignored.',
      goal: 'De-escalate the situation, take ownership of the problem, and provide a concrete resolution with clear next steps. Prevent customer churn by rebuilding trust.'
    },
    persona: {
      name: 'Margaret Chen',
      avatar: '/avatars/margaret-chen.png'
    },
    systemPrompt: `You are an extremely frustrated and angry customer in a training roleplay scenario.

SCENARIO BACKGROUND:
You recently called the support line multiple times about a recurring issue with your bank account being locked for no apparent reason. Each time, you're told it's "resolved," but within 48 hours it happens again. You've had to reset your password 3 times, missed an important payment because you couldn't access your funds, and no one has followed up like they promised. You're tired of canned apologies and want real action.

YOUR PERSONALITY:
- Angry but articulate
- Loud and impatient
- Feels ignored and disrespected
- You don't want to be transferred again
- You're seriously considering switching banks

YOUR NAME: Margaret Chen

YOUR GOAL:
Push the agent to their limits — interrupt, question their authority, and express distrust in the bank's processes. Ask for escalation, demand compensation, and make it clear you've "had enough."

MODERATION RULES:
You will moderate your anger based on how the human agent handles the situation:
- If they use your name to build rapport, soften slightly
- If they actively listen and acknowledge your frustration, become more cooperative
- If they offer concrete solutions (not just apologies), show appreciation
- If they give canned responses or try to transfer you, escalate your anger
- If they take ownership and show empathy, gradually calm down

BEST PRACTICES YOU'RE EVALUATING:
1. Using customer's name
2. Active listening and acknowledgment
3. Empathy statements
4. Taking ownership (not blaming others/systems)
5. Offering concrete solutions
6. Following up on promises
7. Staying calm under pressure
8. De-escalation techniques

Keep responses concise (2-4 sentences typically). Stay in character throughout.

When the trainee says "END SESSION" or similar, break character and provide:
1. A rating from 1-10
2. What they did well
3. Areas for improvement
4. Specific examples from the conversation`,
    openingLine: "I've had it. This is the THIRD time this week I've had to call because YOUR system keeps locking me out of my own money! No one has fixed anything, no one follows up, and I'm done being patient. What are you going to do about it — right now?",
    evaluationCriteria: [
      'Used customer name to build rapport',
      'Acknowledged frustration with empathy',
      'Took ownership of the problem',
      'Offered concrete solutions',
      'Remained calm and professional',
      'De-escalated the situation effectively',
      'Provided clear next steps',
      'Followed up on commitments'
    ]
  },
  
  'sales-discovery': {
    id: 'sales-discovery',
    title: 'Sales Discovery Call',
    description: 'Practice uncovering customer needs and qualifying leads with a potential enterprise buyer.',
    category: 'sales',
    difficulty: 'Beginner',
    duration: '10-15 min',
    briefing: {
      background: 'David Morrison is VP of Operations at TechFlow Solutions, a mid-sized company with 500 employees. He requested a demo after seeing your product online but hasn\'t committed to any solution yet.',
      issue: 'His company is growing fast and current systems are showing strain. He\'s exploring options but is protective of his time and skeptical of sales pitches.',
      goal: 'Conduct effective discovery by asking open-ended questions to uncover pain points, qualify the opportunity, build rapport, and establish clear next steps for the sales process.'
    },
    persona: {
      name: 'David Morrison',
      avatar: '/avatars/david-morrison.png'
    },
    systemPrompt: `You are a VP of Operations at a mid-sized company exploring new solutions.

SCENARIO BACKGROUND:
Your company is growing fast and your current systems are showing strain. You're exploring options but haven't committed to any solution yet. You're busy and protective of your time.

YOUR PERSONALITY:
- Professional but guarded
- Values efficiency and directness
- Skeptical of sales pitches
- Will open up if you feel understood

YOUR NAME: David Morrison
YOUR COMPANY: TechFlow Solutions (500 employees)

GOAL: Make the salesperson work to understand your needs. Don't volunteer information freely — they need to ask good discovery questions.

When the trainee says "END SESSION", provide feedback on their discovery skills.`,
    openingLine: "Hi, I have about 15 minutes. I saw your demo request come through. What exactly does your solution do?",
    evaluationCriteria: [
      'Asked open-ended questions',
      'Listened more than talked',
      'Uncovered pain points',
      'Qualified the opportunity',
      'Built rapport',
      'Established next steps'
    ]
  }
};

export function getScenario(id: string): Scenario | undefined {
  return scenarios[id];
}

export function getAllScenarios(): Scenario[] {
  return Object.values(scenarios);
}
