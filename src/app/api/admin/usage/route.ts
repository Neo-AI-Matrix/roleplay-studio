import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/admin-auth';
import { getUsageSummary, getElevenLabsUsage, logUsage } from '@/lib/usage-tracker';

export async function GET(request: NextRequest) {
  // Verify admin session
  const isAdmin = await verifyAdminSession(request);
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    // Get date range from query params
    const { searchParams } = new URL(request.url);
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');
    
    const startDate = startDateParam ? new Date(startDateParam) : undefined;
    const endDate = endDateParam ? new Date(endDateParam) : undefined;
    
    // Get usage summary from our logs
    const summary = await getUsageSummary(startDate, endDate);
    
    // Get ElevenLabs account-level usage
    const elevenLabsUsage = await getElevenLabsUsage();
    
    return NextResponse.json({
      summary,
      elevenLabsAccount: elevenLabsUsage,
      generatedAt: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Admin usage API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch usage data' },
      { status: 500 }
    );
  }
}

// Allow logging usage from internal routes
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.userId || !data.type) {
      return NextResponse.json(
        { error: 'userId and type are required' },
        { status: 400 }
      );
    }
    
    await logUsage(data);
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Usage log error:', error);
    return NextResponse.json(
      { error: 'Failed to log usage' },
      { status: 500 }
    );
  }
}
