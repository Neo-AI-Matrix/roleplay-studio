import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getStripe, getPlanByPriceId } from '@/lib/stripe';
import Stripe from 'stripe';

// Disable body parsing - Stripe needs raw body
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const clerkUserId = session.metadata?.clerkUserId;
        const customerId = session.customer as string;
        
        if (clerkUserId && customerId) {
          // Update user's Clerk metadata with Stripe customer ID
          // You'll need to use Clerk's Backend API for this
          console.log(`Checkout completed for user ${clerkUserId}, customer ${customerId}`);
          
          // TODO: Call Clerk API to update user metadata
          // await clerkClient.users.updateUserMetadata(clerkUserId, {
          //   privateMetadata: { stripeCustomerId: customerId }
          // });
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const priceId = subscription.items.data[0]?.price.id;
        const planType = priceId ? getPlanByPriceId(priceId) : null;
        const status = subscription.status;

        console.log(`Subscription ${event.type}: customer=${customerId}, plan=${planType}, status=${status}`);
        
        // TODO: Update your database with subscription status
        // This is where you'd update the user's plan/access level
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        console.log(`Subscription canceled: customer=${customerId}`);
        
        // TODO: Downgrade user to free plan
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;
        
        console.log(`Invoice paid: customer=${customerId}, amount=${invoice.amount_paid}`);
        
        // TODO: Record payment, reset usage limits, send receipt
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;
        
        console.log(`Payment failed: customer=${customerId}`);
        
        // TODO: Send notification to user about failed payment
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
