import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectToDatabase, Rating, ScenarioRating } from '@/lib/mongodb';

// GET - Get ratings for scenarios
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const scenarioId = searchParams.get('scenarioId');
    const all = searchParams.get('all') === 'true';
    
    const { db } = await connectToDatabase();
    const ratingsCollection = db.collection<Rating>('ratings');
    
    if (scenarioId) {
      // Get rating for a specific scenario
      const pipeline = [
        { $match: { scenarioId } },
        {
          $group: {
            _id: '$scenarioId',
            averageRating: { $avg: '$rating' },
            totalRatings: { $sum: 1 }
          }
        }
      ];
      
      const results = await ratingsCollection.aggregate(pipeline).toArray();
      
      if (results.length === 0) {
        return NextResponse.json({
          scenarioId,
          averageRating: 0,
          totalRatings: 0
        });
      }
      
      return NextResponse.json({
        scenarioId: results[0]._id,
        averageRating: Math.round(results[0].averageRating * 10) / 10,
        totalRatings: results[0].totalRatings
      });
    }
    
    if (all) {
      // Get ratings for all scenarios
      const pipeline = [
        {
          $group: {
            _id: '$scenarioId',
            averageRating: { $avg: '$rating' },
            totalRatings: { $sum: 1 }
          }
        }
      ];
      
      const results = await ratingsCollection.aggregate(pipeline).toArray();
      
      const ratingsMap: Record<string, ScenarioRating> = {};
      results.forEach(r => {
        ratingsMap[r._id] = {
          scenarioId: r._id,
          averageRating: Math.round(r.averageRating * 10) / 10,
          totalRatings: r.totalRatings
        };
      });
      
      return NextResponse.json(ratingsMap);
    }
    
    return NextResponse.json({ error: 'Missing scenarioId or all parameter' }, { status: 400 });
    
  } catch (error) {
    console.error('Error fetching ratings:', error);
    return NextResponse.json({ error: 'Failed to fetch ratings' }, { status: 500 });
  }
}

// POST - Submit a rating
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const { scenarioId, rating } = body;
    
    if (!scenarioId || !rating) {
      return NextResponse.json({ error: 'Missing scenarioId or rating' }, { status: 400 });
    }
    
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }
    
    const { db } = await connectToDatabase();
    const ratingsCollection = db.collection<Rating>('ratings');
    
    // Upsert - update if exists, insert if not
    const result = await ratingsCollection.updateOne(
      { scenarioId, clerkUserId: userId },
      {
        $set: {
          rating,
          updatedAt: new Date()
        },
        $setOnInsert: {
          scenarioId,
          clerkUserId: userId,
          createdAt: new Date()
        }
      },
      { upsert: true }
    );
    
    // Get updated aggregate rating
    const pipeline = [
      { $match: { scenarioId } },
      {
        $group: {
          _id: '$scenarioId',
          averageRating: { $avg: '$rating' },
          totalRatings: { $sum: 1 }
        }
      }
    ];
    
    const aggregateResults = await ratingsCollection.aggregate(pipeline).toArray();
    
    return NextResponse.json({
      success: true,
      userRating: rating,
      scenarioRating: {
        scenarioId,
        averageRating: Math.round(aggregateResults[0].averageRating * 10) / 10,
        totalRatings: aggregateResults[0].totalRatings
      }
    });
    
  } catch (error) {
    console.error('Error submitting rating:', error);
    return NextResponse.json({ error: 'Failed to submit rating' }, { status: 500 });
  }
}
