import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { getStripe, PLANS, PlanType } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    
    if (!userId || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { planType } = await request.json() as { planType: PlanType };
    
    const plan = PLANS[planType];
    console.log('Checkout request:', { planType, plan, priceId: plan?.priceId });
    
    if (!plan || !plan.priceId) {
      console.error('Invalid plan or missing priceId:', { planType, plan, envVars: {
        STRIPE_PRICE_ID_BUSINESS: process.env.STRIPE_PRICE_ID_BUSINESS ? 'set' : 'missing',
        STRIPE_PRICE_ID_TEAM: process.env.STRIPE_PRICE_ID_TEAM ? 'set' : 'missing',
      }});
      return NextResponse.json({ error: `Invalid plan: ${planType}. Price ID may not be configured.` }, { status: 400 });
    }

    const stripe = getStripe();
    
    // Check if user already has a Stripe customer ID
    let customerId = user.privateMetadata?.stripeCustomerId as string | undefined;

    if (!customerId) {
      // Create a new Stripe customer
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0]?.emailAddress,
        name: `${user.firstName} ${user.lastName}`.trim() || undefined,
        metadata: {
          clerkUserId: userId,
        },
      });
      customerId = customer.id;
      
      // Note: You'll want to save this to Clerk's user metadata via their API
      // For now, we'll include it in the session metadata
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/studio?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/studio?checkout=canceled`,
      subscription_data: {
        metadata: {
          clerkUserId: userId,
          planType,
        },
      },
      metadata: {
        clerkUserId: userId,
        planType,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    // Log full error for debugging
    console.error('Stripe checkout error:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        error: `Checkout failed: ${errorMessage}`
      },
      { status: 500 }
    );
  }
}
