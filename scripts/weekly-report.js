#!/usr/bin/env node
/**
 * Weekly Analytics Report for Roleplay Studio
 * Pulls data from MongoDB and GA4, delivers summary
 */

const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;

async function getWeeklyStats() {
  const client = new MongoClient(MONGODB_URI);
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  try {
    await client.connect();
    const db = client.db('roleplay_studio');
    
    // 1. New accounts this week (from signups collection)
    const signupsCollection = db.collection('signups');
    const newAccounts = await signupsCollection.countDocuments({
      createdAt: { $gte: weekAgo }
    });
    
    const newAccountsList = await signupsCollection
      .find({ createdAt: { $gte: weekAgo } })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();
    
    // 2. Usage stats (from usage collection if it exists)
    const usageCollection = db.collection('usage');
    
    // Get total sessions this week
    const sessionsThisWeek = await usageCollection.countDocuments({
      timestamp: { $gte: weekAgo }
    });
    
    // Get top agents by usage
    const topAgents = await usageCollection.aggregate([
      { $match: { timestamp: { $gte: weekAgo } } },
      { $group: { 
        _id: '$agentId', 
        agentName: { $first: '$agentName' },
        sessions: { $sum: 1 },
        totalMinutes: { $sum: '$durationMinutes' }
      }},
      { $sort: { sessions: -1 } },
      { $limit: 5 }
    ]).toArray();
    
    // 3. Unique users this week
    const uniqueUsers = await usageCollection.distinct('userId', {
      timestamp: { $gte: weekAgo }
    });
    
    // 4. Ratings submitted this week
    const ratingsCollection = db.collection('ratings');
    const ratingsThisWeek = await ratingsCollection.countDocuments({
      createdAt: { $gte: weekAgo }
    });
    
    const avgRating = await ratingsCollection.aggregate([
      { $match: { createdAt: { $gte: weekAgo } } },
      { $group: { _id: null, avg: { $avg: '$rating' } } }
    ]).toArray();
    
    return {
      period: {
        start: weekAgo.toISOString().split('T')[0],
        end: now.toISOString().split('T')[0]
      },
      newAccounts: {
        count: newAccounts,
        list: newAccountsList.map(a => ({
          email: a.email,
          name: a.name || 'N/A',
          type: a.accountType,
          date: new Date(a.createdAt).toLocaleDateString()
        }))
      },
      usage: {
        totalSessions: sessionsThisWeek,
        uniqueUsers: uniqueUsers.length,
        topAgents: topAgents.map(a => ({
          name: a.agentName || a._id || 'Unknown',
          sessions: a.sessions,
          minutes: (a.totalMinutes || 0).toFixed(1)
        }))
      },
      ratings: {
        count: ratingsThisWeek,
        average: avgRating[0]?.avg?.toFixed(1) || 'N/A'
      }
    };
  } finally {
    await client.close();
  }
}

function formatReport(stats) {
  const topAgent = stats.usage.topAgents[0];
  const topAgentStr = topAgent 
    ? `${topAgent.name} (${topAgent.sessions} sessions)`
    : 'No usage data yet';
  
  let report = `📊 **Roleplay Studio Weekly Report**
*${stats.period.start} → ${stats.period.end}*

**Key Metrics:**
• New Accounts: ${stats.newAccounts.count}
• Studio Sessions: ${stats.usage.totalSessions}
• Unique Users: ${stats.usage.uniqueUsers}
• Top AI Agent: ${topAgentStr}
• Ratings Submitted: ${stats.ratings.count} (avg: ${stats.ratings.average}⭐)

`;

  if (stats.newAccounts.list.length > 0) {
    report += `**New Signups:**\n`;
    stats.newAccounts.list.forEach(a => {
      report += `• ${a.email} (${a.type}) - ${a.date}\n`;
    });
    report += '\n';
  }

  if (stats.usage.topAgents.length > 0) {
    report += `**Top 5 Agents:**\n`;
    stats.usage.topAgents.forEach((a, i) => {
      report += `${i + 1}. ${a.name}: ${a.sessions} sessions, ${a.minutes} min\n`;
    });
    report += '\n';
  }

  report += `*Note: GA4 visitor data available at analytics.google.com (neo@tocabay.com)*`;
  
  return report;
}

async function main() {
  try {
    if (!MONGODB_URI) {
      console.error('MONGODB_URI not set');
      process.exit(1);
    }
    
    const stats = await getWeeklyStats();
    const report = formatReport(stats);
    
    console.log(report);
    
    // Output as JSON for cron job to parse
    console.log('\n---JSON---');
    console.log(JSON.stringify(stats, null, 2));
    
  } catch (error) {
    console.error('Error generating report:', error.message);
    process.exit(1);
  }
}

main();
