import Stripe from 'stripe';

// Initialize Stripe only if secret key is available
// This allows the build to pass without the env var being set
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const stripe = stripeSecretKey 
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2026-01-28.clover',
      typescript: true,
    })
  : null;

export function getStripe(): Stripe {
  if (!stripe) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  return stripe;
}

// Plan definitions - update these with your actual Stripe price IDs
export const PLANS = {
  free: {
    name: 'Individual',
    priceId: null,
    price: 0,
    minutesPerMonth: 100,
    features: [
      '100 minutes/month',
      'Basic scenarios',
      'Text feedback',
      'Community support',
    ],
  },
  pro: {
    name: 'Business',
    priceId: process.env.STRIPE_PRICE_ID_PRO,
    price: 29,
    minutesPerMonth: 500,
    features: [
      '500 minutes/month',
      'All scenarios',
      'Voice + text feedback',
      'AI coaching insights',
      'Priority support',
    ],
  },
  team: {
    name: 'Team',
    priceId: process.env.STRIPE_PRICE_ID_TEAM,
    price: 99,
    minutesPerMonth: 2000,
    features: [
      '2,000 minutes/month',
      'Everything in Business',
      'Team analytics',
      'Custom scenarios',
      'Admin dashboard',
      'Dedicated support',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    priceId: process.env.STRIPE_PRICE_ID_ENTERPRISE,
    price: 0, // Custom pricing
    minutesPerMonth: 0, // Unlimited - use 0 to indicate custom
    features: [
      'Unlimited minutes',
      'Everything in Team',
      'SSO/SAML',
      'Custom integrations',
      'SLA guarantee',
      'Dedicated CSM',
    ],
  },
} as const;

export type PlanType = keyof typeof PLANS;

export function getPlanByPriceId(priceId: string): PlanType | null {
  for (const [key, plan] of Object.entries(PLANS)) {
    if (plan.priceId === priceId) {
      return key as PlanType;
    }
  }
  return null;
}
