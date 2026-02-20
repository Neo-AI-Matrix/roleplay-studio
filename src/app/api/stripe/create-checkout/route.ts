import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { getStripe, PLANS, PlanType } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  console.log('[Checkout] Starting checkout request');
  
  try {
    console.log('[Checkout] Getting auth...');
    const { userId } = await auth();
    console.log('[Checkout] userId:', userId);
    
    console.log('[Checkout] Getting currentUser...');
    const user = await currentUser();
    console.log('[Checkout] user email:', user?.emailAddresses?.[0]?.emailAddress);
    
    if (!userId || !user) {
      console.log('[Checkout] Unauthorized - no user');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    console.log('[Checkout] Request body:', body);
    const { planType } = body as { planType: PlanType };
    
    const plan = PLANS[planType];
    console.log('[Checkout] Plan lookup:', { planType, planName: plan?.name, priceId: plan?.priceId });
    
    if (!plan || !plan.priceId) {
      console.error('Invalid plan or missing priceId:', { planType, plan, envVars: {
        STRIPE_PRICE_ID_BUSINESS: process.env.STRIPE_PRICE_ID_BUSINESS ? 'set' : 'missing',
        STRIPE_PRICE_ID_TEAM: process.env.STRIPE_PRICE_ID_TEAM ? 'set' : 'missing',
      }});
      return NextResponse.json({ error: `Invalid plan: ${planType}. Price ID may not be configured.` }, { status: 400 });
    }

    console.log('[Checkout] Getting Stripe client...');
    const stripe = getStripe();
    console.log('[Checkout] Stripe client obtained');
    
    // Check if user already has a Stripe customer ID
    let customerId = user.privateMetadata?.stripeCustomerId as string | undefined;
    console.log('[Checkout] Existing customerId:', customerId);

    if (!customerId) {
      console.log('[Checkout] Creating new Stripe customer...');
      // Create a new Stripe customer
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0]?.emailAddress,
        name: `${user.firstName} ${user.lastName}`.trim() || undefined,
        metadata: {
          clerkUserId: userId,
        },
      });
      customerId = customer.id;
      console.log('[Checkout] Created customer:', customerId);
    }

    console.log('[Checkout] Creating checkout session...');
    console.log('[Checkout] Success URL:', `${process.env.NEXT_PUBLIC_APP_URL}/studio?checkout=success`);
    
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
