#!/usr/bin/env node
/**
 * Weekly Analytics Report for Roleplay Studio
 * Pulls data from MongoDB and GA4, delivers summary
 */

const { MongoClient } = require('mongodb');
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI;
const GA4_PROPERTY_ID = '524996854';
const GA4_CREDENTIALS_PATH = process.env.GA4_CREDENTIALS_PATH || 
  path.join(process.env.HOME, '.openclaw/secrets/ga4-service-account.json');

async function getGA4Stats() {
  try {
    if (!fs.existsSync(GA4_CREDENTIALS_PATH)) {
      console.warn('GA4 credentials not found, skipping GA4 data');
      return null;
    }

    const analyticsDataClient = new BetaAnalyticsDataClient({
      keyFilename: GA4_CREDENTIALS_PATH
    });

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${GA4_PROPERTY_ID}`,
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'country' }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'sessions' },
        { name: 'newUsers' },
        { name: 'screenPageViews' }
      ],
    });

    let totalActiveUsers = 0;
    let totalSessions = 0;
    let totalNewUsers = 0;
    let totalPageViews = 0;
    const countryData = [];

    response.rows?.forEach(row => {
      const country = row.dimensionValues[0].value;
      const activeUsers = parseInt(row.metricValues[0].value) || 0;
      const sessions = parseInt(row.metricValues[1].value) || 0;
      const newUsers = parseInt(row.metricValues[2].value) || 0;
      const pageViews = parseInt(row.metricValues[3].value) || 0;

      totalActiveUsers += activeUsers;
      totalSessions += sessions;
      totalNewUsers += newUsers;
      totalPageViews += pageViews;

      countryData.push({ country, activeUsers, sessions });
    });

    // Sort by sessions and take top 5
    countryData.sort((a, b) => b.sessions - a.sessions);

    return {
      activeUsers: totalActiveUsers,
      sessions: totalSessions,
      newUsers: totalNewUsers,
      pageViews: totalPageViews,
      topCountries: countryData.slice(0, 5)
    };
  } catch (error) {
    console.warn('Error fetching GA4 data:', error.message);
    return null;
  }
}

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
    
    // Fetch GA4 data
    const ga4Data = await getGA4Stats();
    
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
      },
      ga4: ga4Data
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

  // Add GA4 website analytics
  if (stats.ga4) {
    report += `**Website Analytics (GA4):**
• Unique Visitors: ${stats.ga4.activeUsers}
• Website Sessions: ${stats.ga4.sessions}
• New Visitors: ${stats.ga4.newUsers}
• Page Views: ${stats.ga4.pageViews}

`;
    if (stats.ga4.topCountries && stats.ga4.topCountries.length > 0) {
      report += `**Top Countries:**\n`;
      stats.ga4.topCountries.forEach((c, i) => {
        report += `${i + 1}. ${c.country}: ${c.sessions} sessions\n`;
      });
      report += '\n';
    }
  } else {
    report += `**Website Analytics:** *(GA4 data unavailable)*\n\n`;
  }

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

  report += `*Full analytics: analytics.google.com (neo@tocabay.com)*`;
  
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
