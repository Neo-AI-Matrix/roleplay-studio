import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import { getAllScenarios } from "@/lib/scenarios";
import { StudioStats } from "./StudioStats";
import { ScenarioGrid } from "./ScenarioGrid";
import { CategoryOverview } from "./CategoryOverview";
import { TrialCountdown } from "./TrialCountdown";
import { Achievements } from "./Achievements";
import { SidebarProgress } from "./SidebarProgress";
import { QuickActions } from "./QuickActions";
import { ProfileButton } from "./ProfileButton";
import { ThemeToggle } from "@/components/ThemeToggle";

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
            <ThemeToggle />
            <div className="text-right mr-2 hidden sm:block">
              <p className="text-sm text-gray-400">Signed in as</p>
              <p className="text-white font-medium">{user?.emailAddresses[0]?.emailAddress}</p>
            </div>
            <ProfileButton />
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
            {/* Your Progress - Now uses real data */}
            <SidebarProgress />

            {/* Achievements - Now checks real session data */}
            <Achievements />

            {/* Quick Actions - Analytics button now works */}
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
}
