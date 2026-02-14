import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { 
  Play, 
  BarChart3, 
  MessageSquare, 
  Trophy,
  Clock,
  Target,
  TrendingUp,
  Users
} from "lucide-react";
import Link from "next/link";
import { getAllScenarios } from "@/lib/scenarios";

export default async function StudioPage() {
  const user = await currentUser();
  const scenarios = getAllScenarios();
  
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-navy to-navy-light">
      {/* Studio Header */}
      <div className="border-b border-white/10 bg-navy-light/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back, {user?.firstName || 'Agent'}!</h1>
            <p className="text-gray-400">Ready to sharpen your skills?</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right mr-4">
              <p className="text-sm text-gray-400">Signed in as</p>
              <p className="text-white font-medium">{user?.emailAddresses[0]?.emailAddress}</p>
            </div>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 ring-2 ring-electric-blue"
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={<MessageSquare className="w-6 h-6" />}
            label="Sessions Completed"
            value="0"
            trend="+0 this week"
          />
          <StatCard 
            icon={<Clock className="w-6 h-6" />}
            label="Practice Time"
            value="0 hrs"
            trend="Start practicing!"
          />
          <StatCard 
            icon={<Target className="w-6 h-6" />}
            label="Avg. Score"
            value="--"
            trend="Complete a session"
          />
          <StatCard 
            icon={<TrendingUp className="w-6 h-6" />}
            label="Improvement"
            value="--"
            trend="Track your progress"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Training Scenarios */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Play className="w-5 h-5 text-electric-blue" />
              Training Scenarios
            </h2>
            
            <div className="grid gap-4">
              {scenarios.map((scenario) => (
                <ScenarioCard 
                  key={scenario.id}
                  id={scenario.id}
                  title={scenario.title}
                  description={scenario.description}
                  difficulty={scenario.difficulty}
                  duration={scenario.duration}
                  category={scenario.category === 'sales' ? 'Sales' : 'Support'}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-navy-light border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  href="/studio/session/angry-customer"
                  className="w-full flex items-center gap-3 px-4 py-3 bg-electric-blue hover:bg-electric-blue/90 text-white rounded-lg transition-colors"
                >
                  <Play className="w-5 h-5" />
                  Start Angry Customer
                </Link>
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                  <BarChart3 className="w-5 h-5" />
                  View Analytics
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                  <Users className="w-5 h-5" />
                  Team Leaderboard
                </button>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-navy-light border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Achievements
              </h3>
              <div className="space-y-3">
                <Achievement 
                  title="Getting Started"
                  description="Complete your first session"
                  locked={true}
                />
                <Achievement 
                  title="Quick Learner"
                  description="Complete 5 sessions"
                  locked={true}
                />
                <Achievement 
                  title="De-escalation Pro"
                  description="Score 8+ on angry customer scenario"
                  locked={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend }: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  trend: string; 
}) {
  return (
    <div className="bg-navy-light border border-white/10 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-electric-blue/20 rounded-lg text-electric-blue">
          {icon}
        </div>
        <span className="text-gray-400 text-sm">{label}</span>
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-gray-500">{trend}</p>
    </div>
  );
}

function ScenarioCard({ id, title, description, difficulty, duration, category, hasVoice }: {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  category: string;
  hasVoice?: boolean;
}) {
  const difficultyColors = {
    Beginner: "bg-green-500/20 text-green-400",
    Intermediate: "bg-yellow-500/20 text-yellow-400",
    Advanced: "bg-red-500/20 text-red-400",
  };
  
  return (
    <div className="bg-navy-light border border-white/10 rounded-xl p-6 hover:border-electric-blue/50 transition-colors group">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-electric-blue transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 text-sm mt-1">{description}</p>
        </div>
        <span className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-full">
          {category}
        </span>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <span className={`px-2 py-1 text-xs rounded-full ${difficultyColors[difficulty as keyof typeof difficultyColors]}`}>
          {difficulty}
        </span>
        <span className="text-gray-500 text-sm flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {duration}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <Link 
            href={`/studio/session/${id}`}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors"
          >
            💬 Text
          </Link>
          <Link 
            href={`/studio/voice/${id}`}
            className="px-4 py-2 bg-gradient-to-r from-violet to-cyan hover:opacity-90 text-white text-sm font-medium rounded-lg transition-colors"
          >
            🎙️ Voice
          </Link>
        </div>
      </div>
    </div>
  );
}

function Achievement({ title, description, locked }: {
  title: string;
  description: string;
  locked: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg ${locked ? 'bg-white/5 opacity-50' : 'bg-yellow-500/10'}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${locked ? 'bg-white/10' : 'bg-yellow-500/20'}`}>
        <Trophy className={`w-5 h-5 ${locked ? 'text-gray-500' : 'text-yellow-500'}`} />
      </div>
      <div>
        <p className={`font-medium ${locked ? 'text-gray-400' : 'text-white'}`}>{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
}
