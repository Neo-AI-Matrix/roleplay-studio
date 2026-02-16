import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectToDatabase, Rating } from '@/lib/mongodb';

// GET - Get current user's ratings
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const scenarioId = searchParams.get('scenarioId');
    
    const { db } = await connectToDatabase();
    const ratingsCollection = db.collection<Rating>('ratings');
    
    if (scenarioId) {
      // Get user's rating for a specific scenario
      const rating = await ratingsCollection.findOne({
        scenarioId,
        clerkUserId: userId
      });
      
      return NextResponse.json({
        scenarioId,
        userRating: rating?.rating || null
      });
    }
    
    // Get all user's ratings
    const ratings = await ratingsCollection.find({ clerkUserId: userId }).toArray();
    
    const ratingsMap: Record<string, number> = {};
    ratings.forEach(r => {
      ratingsMap[r.scenarioId] = r.rating;
    });
    
    return NextResponse.json(ratingsMap);
    
  } catch (error) {
    console.error('Error fetching user ratings:', error);
    return NextResponse.json({ error: 'Failed to fetch user ratings' }, { status: 500 });
  }
}
