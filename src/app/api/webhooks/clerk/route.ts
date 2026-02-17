import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI!;

export async function POST(req: Request) {
  // Get the webhook secret from environment
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('Missing CLERK_WEBHOOK_SECRET');
    return new Response('Webhook secret not configured', { status: 500 });
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing svix headers', { status: 400 });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Verify the webhook
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return new Response('Webhook verification failed', { status: 400 });
  }

  // Handle the event
  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, public_metadata, created_at } = evt.data;
    
    const email = email_addresses?.[0]?.email_address || 'No email';
    const name = [first_name, last_name].filter(Boolean).join(' ') || 'No name provided';
    const metadata = public_metadata as Record<string, unknown>;
    const trialStarted = metadata?.trialStartedAt;
    const accountType = trialStarted ? 'Trial' : 'New signup';

    const signupData = {
      clerkUserId: id,
      email,
      name,
      accountType,
      publicMetadata: metadata,
      createdAt: new Date(created_at),
      eventType: 'user.created',
      notifiedAt: new Date(),
    };

    // Log to MongoDB
    await logSignupToMongo(signupData);

    // Send notification via configured channel
    await sendNotification({
      type: 'signup',
      email,
      name,
      accountType,
      userId: id,
    });

    console.log(`[Clerk Webhook] New user: ${email} (${accountType})`);
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, public_metadata, created_at } = evt.data;
    const email = email_addresses?.[0]?.email_address || 'No email';
    const metadata = public_metadata as Record<string, unknown>;
    
    // Check if this is a subscription upgrade
    if (metadata?.subscriptionPlan && metadata?.subscriptionPlan !== 'trial') {
      const upgradeData = {
        clerkUserId: id,
        email,
        plan: metadata.subscriptionPlan as string,
        publicMetadata: metadata,
        createdAt: new Date(created_at),
        eventType: 'subscription.upgraded',
        notifiedAt: new Date(),
      };

      await logSignupToMongo(upgradeData);

      await sendNotification({
        type: 'upgrade',
        email,
        plan: metadata.subscriptionPlan as string,
        userId: id,
      });
      
      console.log(`[Clerk Webhook] User upgraded: ${email} to ${metadata.subscriptionPlan}`);
    }
  }

  return new Response('Webhook processed', { status: 200 });
}

async function logSignupToMongo(data: Record<string, unknown>) {
  if (!MONGODB_URI) {
    console.error('MongoDB URI not configured');
    return;
  }

  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db('roleplay_studio');
    const collection = db.collection('signups');
    await collection.insertOne(data);
  } catch (error) {
    console.error('Failed to log signup to MongoDB:', error);
  } finally {
    await client.close();
  }
}

async function sendNotification(data: {
  type: 'signup' | 'upgrade';
  email: string;
  name?: string;
  accountType?: string;
  plan?: string;
  userId: string;
}) {
  const timestamp = new Date().toLocaleString('en-US', { 
    timeZone: 'America/Los_Angeles',
    dateStyle: 'short',
    timeStyle: 'short'
  });

  let message: string;
  let subject: string;

  if (data.type === 'signup') {
    subject = `🎉 New Signup: ${data.email}`;
    message = `New Roleplay Studio signup!\n\nEmail: ${data.email}\nName: ${data.name || 'Not provided'}\nType: ${data.accountType}\nUser ID: ${data.userId}\nTime: ${timestamp} PT`;
  } else {
    subject = `💰 Upgrade: ${data.email} → ${data.plan}`;
    message = `Roleplay Studio upgrade!\n\nEmail: ${data.email}\nPlan: ${data.plan}\nUser ID: ${data.userId}\nTime: ${timestamp} PT`;
  }

  // Try Telegram first
  const telegramSent = await sendTelegramNotification(message);
  
  // Always log to console for Vercel logs
  console.log(`[SIGNUP NOTIFICATION] ${subject}\n${message}`);
  
  // If no Telegram, try the webhook callback
  if (!telegramSent) {
    await sendWebhookCallback(subject, message);
  }
}

async function sendTelegramNotification(message: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ALERT_CHAT_ID;

  if (!botToken || !chatId) {
    return false;
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      }
    );
    return response.ok;
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
    return false;
  }
}

async function sendWebhookCallback(subject: string, message: string) {
  const callbackUrl = process.env.NOTIFICATION_WEBHOOK_URL;
  
  if (!callbackUrl) {
    return;
  }

  try {
    await fetch(callbackUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, message, source: 'roleplay-studio' }),
    });
  } catch (error) {
    console.error('Failed to send webhook callback:', error);
  }
}
