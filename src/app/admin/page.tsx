'use client';

import { useState, useEffect } from 'react';
import { Activity, Users, DollarSign, Clock, TrendingUp, LogOut, RefreshCw, AlertTriangle, UserPlus } from 'lucide-react';

interface UsageSummary {
  totalElevenLabsCharacters: number;
  totalElevenLabsDurationMinutes: number;
  totalOpenAIInputTokens: number;
  totalOpenAIOutputTokens: number;
  totalSessions: number;
  byUser: Record<string, {
    elevenLabsCharacters: number;
    elevenLabsDurationMinutes: number;
    openAIInputTokens: number;
    openAIOutputTokens: number;
    sessions: number;
    lastActive: string;
  }>;
  byDay: Record<string, {
    elevenLabsCharacters: number;
    openAITokens: number;
    sessions: number;
  }>;
  estimatedCosts: {
    elevenLabs: number;
    openAI: number;
    total: number;
  };
}

interface ElevenLabsAccount {
  characterCount: number;
  characterLimit: number;
  usagePercentage: number;
}

interface UsageData {
  summary: UsageSummary;
  elevenLabsAccount: ElevenLabsAccount | null;
  generatedAt: string;
}

interface Signup {
  _id: string;
  clerkUserId: string;
  email: string;
  name?: string;
  accountType: string;
  createdAt: string;
  eventType: string;
}

interface SignupsData {
  signups: Signup[];
  stats: {
    total: number;
    trials: number;
    paid: number;
    periodDays: number;
  };
}

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [signupsData, setSignupsData] = useState<SignupsData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Check if already logged in
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const res = await fetch('/api/admin/usage');
      if (res.ok) {
        const data = await res.json();
        setUsageData(data);
        setIsLoggedIn(true);
        // Also fetch signups
        fetchSignups();
      }
    } catch {
      // Not logged in
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchSignups() {
    try {
      const res = await fetch('/api/admin/signups?days=30&limit=50');
      if (res.ok) {
        const data = await res.json();
        setSignupsData(data);
      }
    } catch {
      console.error('Failed to fetch signups');
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsAuthenticating(true);
    
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      
      if (res.ok) {
        setIsLoggedIn(true);
        fetchUsageData();
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Connection error');
    } finally {
      setIsAuthenticating(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsLoggedIn(false);
    setUsageData(null);
  }

  async function fetchUsageData() {
    setIsRefreshing(true);
    try {
      const [usageRes, signupsRes] = await Promise.all([
        fetch('/api/admin/usage'),
        fetch('/api/admin/signups?days=30&limit=50'),
      ]);
      if (usageRes.ok) {
        const data = await usageRes.json();
        setUsageData(data);
      }
      if (signupsRes.ok) {
        const data = await signupsRes.json();
        setSignupsData(data);
      }
    } catch {
      setError('Failed to fetch data');
    } finally {
      setIsRefreshing(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700">
            <h1 className="text-2xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400 mb-6">Roleplay Studio Token Management</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500"
                  placeholder="admin@example.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-4 rounded-lg transition disabled:opacity-50"
              >
                {isAuthenticating ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const summary = usageData?.summary;
  const elevenLabsAccount = usageData?.elevenLabsAccount;

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400">Roleplay Studio Token & Usage Management</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={fetchUsageData}
              disabled={isRefreshing}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* ElevenLabs Account Status */}
        {elevenLabsAccount && (
          <div className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-xl p-6 mb-8 border border-violet-500/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-violet-400" />
                ElevenLabs Account Status
              </h2>
              {elevenLabsAccount.usagePercentage > 80 && (
                <div className="flex items-center gap-2 bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  {elevenLabsAccount.usagePercentage > 95 ? 'Critical' : 'Warning'}
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-400">Characters Used</p>
                <p className="text-2xl font-bold text-white">{elevenLabsAccount.characterCount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Character Limit</p>
                <p className="text-2xl font-bold text-white">{elevenLabsAccount.characterLimit.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Usage</p>
                <p className="text-2xl font-bold text-white">{elevenLabsAccount.usagePercentage.toFixed(1)}%</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all ${
                    elevenLabsAccount.usagePercentage > 95 ? 'bg-red-500' :
                    elevenLabsAccount.usagePercentage > 80 ? 'bg-amber-500' :
                    'bg-violet-500'
                  }`}
                  style={{ width: `${Math.min(elevenLabsAccount.usagePercentage, 100)}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Activity className="w-6 h-6 text-cyan-400" />}
            title="Total Sessions"
            value={summary?.totalSessions || 0}
            subtitle="Training sessions"
            color="cyan"
          />
          <StatCard
            icon={<Users className="w-6 h-6 text-emerald-400" />}
            title="Active Users"
            value={Object.keys(summary?.byUser || {}).length}
            subtitle="Unique users"
            color="emerald"
          />
          <StatCard
            icon={<Clock className="w-6 h-6 text-amber-400" />}
            title="Voice Minutes"
            value={(summary?.totalElevenLabsDurationMinutes || 0).toFixed(1)}
            subtitle="ElevenLabs usage"
            color="amber"
          />
          <StatCard
            icon={<DollarSign className="w-6 h-6 text-rose-400" />}
            title="Est. Cost"
            value={`$${(summary?.estimatedCosts?.total || 0).toFixed(2)}`}
            subtitle="This period"
            color="rose"
          />
        </div>

        {/* Cost Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-violet-400" />
              Cost Breakdown
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">ElevenLabs Voice</p>
                  <p className="text-sm text-gray-400">{(summary?.totalElevenLabsCharacters || 0).toLocaleString()} characters</p>
                </div>
                <p className="text-xl font-bold text-violet-400">${(summary?.estimatedCosts?.elevenLabs || 0).toFixed(2)}</p>
              </div>
              <div className="border-t border-gray-700 pt-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">OpenAI (GPT-4o-mini)</p>
                  <p className="text-sm text-gray-400">
                    {((summary?.totalOpenAIInputTokens || 0) + (summary?.totalOpenAIOutputTokens || 0)).toLocaleString()} tokens
                  </p>
                </div>
                <p className="text-xl font-bold text-emerald-400">${(summary?.estimatedCosts?.openAI || 0).toFixed(2)}</p>
              </div>
              <div className="border-t border-gray-700 pt-4 flex items-center justify-between">
                <p className="text-white font-semibold">Total</p>
                <p className="text-2xl font-bold text-white">${(summary?.estimatedCosts?.total || 0).toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Token Details */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Token Details</h3>
            <div className="space-y-3">
              <TokenRow label="ElevenLabs Characters" value={summary?.totalElevenLabsCharacters || 0} />
              <TokenRow label="Voice Duration (min)" value={(summary?.totalElevenLabsDurationMinutes || 0).toFixed(1)} />
              <TokenRow label="OpenAI Input Tokens" value={summary?.totalOpenAIInputTokens || 0} />
              <TokenRow label="OpenAI Output Tokens" value={summary?.totalOpenAIOutputTokens || 0} />
            </div>
          </div>
        </div>

        {/* Recent Signups */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-emerald-400" />
              Recent Signups
            </h3>
            {signupsData?.stats && (
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-400">
                  Last {signupsData.stats.periodDays} days:
                </span>
                <span className="text-emerald-400 font-medium">
                  {signupsData.stats.trials} trials
                </span>
                <span className="text-violet-400 font-medium">
                  {signupsData.stats.paid} paid
                </span>
              </div>
            )}
          </div>
          {!signupsData?.signups?.length ? (
            <p className="text-gray-400 text-center py-8">No signups recorded yet. Configure the Clerk webhook to start tracking.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                    <th className="pb-3 font-medium">Email</th>
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Signed Up</th>
                  </tr>
                </thead>
                <tbody>
                  {signupsData.signups.map((signup) => (
                    <tr key={signup._id} className="border-b border-gray-700/50">
                      <td className="py-3 text-white font-medium">{signup.email}</td>
                      <td className="py-3 text-gray-300">{signup.name || '-'}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          signup.accountType === 'Trial' 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : 'bg-violet-500/20 text-violet-400'
                        }`}>
                          {signup.accountType}
                        </span>
                      </td>
                      <td className="py-3 text-gray-400 text-sm">
                        {new Date(signup.createdAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* User Breakdown */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">User Breakdown</h3>
          {Object.keys(summary?.byUser || {}).length === 0 ? (
            <p className="text-gray-400 text-center py-8">No usage data yet. Users will appear here after they start training sessions.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                    <th className="pb-3 font-medium">User</th>
                    <th className="pb-3 font-medium">Sessions</th>
                    <th className="pb-3 font-medium">Voice Chars</th>
                    <th className="pb-3 font-medium">Voice Min</th>
                    <th className="pb-3 font-medium">LLM Tokens</th>
                    <th className="pb-3 font-medium">Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(summary?.byUser || {}).map(([userId, data]) => (
                    <tr key={userId} className="border-b border-gray-700/50">
                      <td className="py-3 text-white font-medium">{userId}</td>
                      <td className="py-3 text-gray-300">{data.sessions}</td>
                      <td className="py-3 text-gray-300">{data.elevenLabsCharacters.toLocaleString()}</td>
                      <td className="py-3 text-gray-300">{data.elevenLabsDurationMinutes.toFixed(1)}</td>
                      <td className="py-3 text-gray-300">{(data.openAIInputTokens + data.openAIOutputTokens).toLocaleString()}</td>
                      <td className="py-3 text-gray-400 text-sm">{new Date(data.lastActive).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          Last updated: {usageData?.generatedAt ? new Date(usageData.generatedAt).toLocaleString() : 'Never'}
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  icon, 
  title, 
  value, 
  subtitle, 
  color 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string | number; 
  subtitle: string;
  color: 'cyan' | 'emerald' | 'amber' | 'rose';
}) {
  const colorClasses = {
    cyan: 'border-cyan-500/30 bg-cyan-500/10',
    emerald: 'border-emerald-500/30 bg-emerald-500/10',
    amber: 'border-amber-500/30 bg-amber-500/10',
    rose: 'border-rose-500/30 bg-rose-500/10',
  };
  
  return (
    <div className={`rounded-xl p-6 border ${colorClasses[color]}`}>
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <span className="text-gray-400 text-sm">{title}</span>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}

function TokenRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-0">
      <span className="text-gray-400">{label}</span>
      <span className="text-white font-medium">{typeof value === 'number' ? value.toLocaleString() : value}</span>
    </div>
  );
}
