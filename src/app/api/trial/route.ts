import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const TRIAL_DAYS = 7;

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const metadata = user.publicMetadata as {
      trialStartedAt?: string;
      subscriptionStatus?: string;
    };

    // If user has an active subscription, no trial needed
    if (metadata.subscriptionStatus === 'active') {
      return NextResponse.json({
        isTrialing: false,
        isSubscribed: true,
      });
    }

    // If no trial start date, this is their first visit - start the trial
    if (!metadata.trialStartedAt) {
      const trialStartedAt = new Date().toISOString();
      
      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          ...metadata,
          trialStartedAt,
          subscriptionStatus: 'trialing',
        },
      });

      const trialEndsAt = new Date();
      trialEndsAt.setDate(trialEndsAt.getDate() + TRIAL_DAYS);

      return NextResponse.json({
        isTrialing: true,
        isSubscribed: false,
        trialStartedAt,
        trialEndsAt: trialEndsAt.toISOString(),
        daysLeft: TRIAL_DAYS,
      });
    }

    // Calculate days left in trial
    const trialStart = new Date(metadata.trialStartedAt);
    const trialEnd = new Date(trialStart);
    trialEnd.setDate(trialEnd.getDate() + TRIAL_DAYS);
    
    const now = new Date();
    const diffTime = trialEnd.getTime() - now.getTime();
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return NextResponse.json({
      isTrialing: daysLeft > 0,
      isSubscribed: false,
      trialStartedAt: metadata.trialStartedAt,
      trialEndsAt: trialEnd.toISOString(),
      daysLeft: Math.max(0, daysLeft),
      trialEnded: daysLeft <= 0,
    });

  } catch (error) {
    console.error("Trial API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
