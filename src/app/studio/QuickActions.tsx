'use client';

import { useState } from 'react';
import { BarChart3, Play, BookOpen, Settings } from 'lucide-react';
import { AnalyticsModal } from './AnalyticsModal';
import Link from 'next/link';

export function QuickActions() {
  const [showAnalytics, setShowAnalytics] = useState(false);

  return (
    <>
      <div className="bg-navy-light border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <button 
            onClick={() => setShowAnalytics(true)}
            className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            <BarChart3 className="w-5 h-5 text-electric-blue" />
            View Full Analytics
          </button>
          
          <Link 
            href="/studio/voice/angry-customer"
            className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            <Play className="w-5 h-5 text-green-400" />
            Quick Practice
          </Link>
          
          <Link 
            href="/product"
            className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            <BookOpen className="w-5 h-5 text-violet" />
            Training Guide
          </Link>
        </div>
      </div>

      <AnalyticsModal 
        isOpen={showAnalytics} 
        onClose={() => setShowAnalytics(false)} 
      />
    </>
  );
}
