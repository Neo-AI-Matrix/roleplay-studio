import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { getStripe, PLANS, getPlanByPriceId, PlanType } from '@/lib/stripe';

export interface SubscriptionData {
  hasSubscription: boolean;
  plan: PlanType;
  planName: string;
  status: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  minutesPerMonth: number | null;
  pricePerMonth: number | null;
  invoices: Array<{
    id: string;
    date: string;
    amount: number;
    status: string;
    pdfUrl: string | null;
  }>;
  paymentMethod: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  } | null;
}

export async function GET() {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    
    if (!userId || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const stripeCustomerId = user.privateMetadata?.stripeCustomerId as string | undefined;

    // Default response for users without Stripe
    const defaultResponse: SubscriptionData = {
      hasSubscription: false,
      plan: 'free',
      planName: PLANS.free.name,
      status: null,
      currentPeriodEnd: null,
      cancelAtPeriodEnd: false,
      minutesPerMonth: PLANS.free.minutesPerMonth,
      pricePerMonth: null,
      invoices: [],
      paymentMethod: null,
    };

    if (!stripeCustomerId) {
      return NextResponse.json(defaultResponse);
    }

    const stripe = getStripe();
    
    // Fetch subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      status: 'all',
      limit: 1,
      expand: ['data.default_payment_method'],
    });

    const subscription = subscriptions.data[0];
    
    if (!subscription) {
      return NextResponse.json(defaultResponse);
    }

    // Get plan info
    const priceId = subscription.items.data[0]?.price.id;
    const planType = priceId ? getPlanByPriceId(priceId) : 'free';
    const plan = PLANS[planType || 'free'];

    // Fetch invoices
    const invoices = await stripe.invoices.list({
      customer: stripeCustomerId,
      limit: 10,
    });

    // Get payment method
    let paymentMethod = null;
    if (subscription.default_payment_method) {
      const pm = subscription.default_payment_method as Stripe.PaymentMethod;
      if (pm.card) {
        paymentMethod = {
          brand: pm.card.brand,
          last4: pm.card.last4,
          expMonth: pm.card.exp_month,
          expYear: pm.card.exp_year,
        };
      }
    }

    // Access subscription properties with type assertion for compatibility
    const subData = subscription as unknown as {
      status: string;
      currentPeriodEnd: number;
      cancelAtPeriodEnd: boolean;
    };
    
    const response: SubscriptionData = {
      hasSubscription: ['active', 'trialing'].includes(subscription.status),
      plan: planType || 'free',
      planName: plan.name,
      status: subscription.status,
      currentPeriodEnd: new Date((subscription as any).current_period_end * 1000).toISOString(),
      cancelAtPeriodEnd: (subscription as any).cancel_at_period_end,
      minutesPerMonth: plan.minutesPerMonth,
      pricePerMonth: plan.price || null,
      invoices: invoices.data.map((inv) => ({
        id: inv.id,
        date: new Date(inv.created * 1000).toISOString(),
        amount: inv.amount_paid / 100,
        status: inv.status || 'unknown',
        pdfUrl: inv.invoice_pdf || null,
      })),
      paymentMethod,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Subscription fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    );
  }
}

// Need to import Stripe type
import Stripe from 'stripe';
