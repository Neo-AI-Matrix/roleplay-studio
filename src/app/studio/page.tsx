import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { 
  BarChart3, 
  Trophy,
  Sparkles
} from "lucide-react";
import { getAllScenarios } from "@/lib/scenarios";
import { StudioStats } from "./StudioStats";
import { ScenarioGrid } from "./ScenarioGrid";
import { CategoryOverview } from "./CategoryOverview";
import { TrialCountdown } from "./TrialCountdown";

export default async function StudioPage() {
  const user = await currentUser();
  const scenarios = getAllScenarios();
  
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-navy to-navy-light">
      {/* Studio Header */}
      <div className="border-b border-white/10 bg-navy-light/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="px-3 py-1 bg-gradient-to-r from-violet to-cyan text-white text-sm font-semibold rounded-lg">
                Studio
              </span>
              <h1 className="text-2xl font-bold text-white">Welcome back, {user?.firstName || 'Agent'}!</h1>
            </div>
            <p className="text-gray-400">Ready to sharpen your skills?</p>
          </div>
          <div className="flex items-center gap-4">
            <TrialCountdown />
            <div className="text-right mr-4 hidden sm:block">
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
        {/* Stats Grid - Client Component */}
        <StudioStats />

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Scenario Grid - Takes 3/4 width on XL screens */}
          <div className="xl:col-span-3">
            {/* Category Overview */}
            <CategoryOverview />
            
            {/* All Scenarios */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-electric-blue" />
                All Training Scenarios
              </h2>
              <p className="text-sm text-gray-400">
                {scenarios.length} scenarios available
              </p>
            </div>
            
            <ScenarioGrid scenarios={scenarios} />
          </div>

          {/* Sidebar - 1/4 width on XL screens */}
          <div className="space-y-6">
            {/* Quick Stats Summary */}
            <div className="bg-navy-light border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Sessions Completed</span>
                  <span className="text-white font-semibold">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Average Score</span>
                  <span className="text-white font-semibold">--</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Time Trained</span>
                  <span className="text-white font-semibold">0 min</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-gradient-to-r from-violet to-cyan rounded-full" />
                </div>
                <p className="text-xs text-gray-500">Complete your first session to start tracking progress</p>
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
                  description="Score 8+ on angry customer"
                  locked={true}
                />
                <Achievement 
                  title="Sales Master"
                  description="Score 9+ on all sales scenarios"
                  locked={true}
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-navy-light border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                  <BarChart3 className="w-5 h-5" />
                  View Full Analytics
                </button>
              </div>
            </div>
          </div>
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
