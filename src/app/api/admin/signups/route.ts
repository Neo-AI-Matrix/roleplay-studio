import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI!;
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

export async function GET(request: NextRequest) {
  // Simple API key auth for admin endpoints
  const authHeader = request.headers.get('authorization');
  const apiKey = authHeader?.replace('Bearer ', '');
  
  if (ADMIN_API_KEY && apiKey !== ADMIN_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '50');
  const days = parseInt(searchParams.get('days') || '30');

  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db('roleplay_studio');
    const collection = db.collection('signups');

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const signups = await collection
      .find({ createdAt: { $gte: cutoffDate } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    // Get summary stats
    const stats = await collection.aggregate([
      { $match: { createdAt: { $gte: cutoffDate } } },
      {
        $group: {
          _id: '$accountType',
          count: { $sum: 1 },
        },
      },
    ]).toArray();

    const totalSignups = signups.length;
    const trialSignups = stats.find(s => s._id === 'Trial')?.count || 0;
    const paidSignups = stats.find(s => s._id !== 'Trial')?.count || 0;

    return NextResponse.json({
      signups,
      stats: {
        total: totalSignups,
        trials: trialSignups,
        paid: paidSignups,
        periodDays: days,
      },
    });
  } catch (error) {
    console.error('Failed to fetch signups:', error);
    return NextResponse.json({ error: 'Failed to fetch signups' }, { status: 500 });
  } finally {
    await client.close();
  }
}
