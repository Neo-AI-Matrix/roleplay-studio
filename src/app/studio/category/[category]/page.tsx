"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { ArrowLeft, Briefcase, HeadphonesIcon, Users, MessageSquare, Crown, Sparkles } from "lucide-react";
import { getAllScenarios, categoryLabels, categoryDescriptions, categoryColors, type ScenarioCategory } from "@/lib/scenarios";
import { ScenarioGrid } from "../../ScenarioGrid";

const categoryIcons: Record<ScenarioCategory, React.ReactNode> = {
  sales: <Briefcase className="w-8 h-8" />,
  support: <HeadphonesIcon className="w-8 h-8" />,
  hr: <Users className="w-8 h-8" />,
  communication: <MessageSquare className="w-8 h-8" />,
  leadership: <Crown className="w-8 h-8" />,
};

const validCategories: ScenarioCategory[] = ['sales', 'support', 'hr', 'communication', 'leadership'];

export default function CategoryPage() {
  const params = useParams();
  const { isSignedIn } = useAuth();
  const category = params.category as string;

  // Validate category
  if (!validCategories.includes(category as ScenarioCategory)) {
    notFound();
  }

  const typedCategory = category as ScenarioCategory;
  const allScenarios = getAllScenarios();
  const categoryScenarios = allScenarios.filter(s => s.category === typedCategory);
  const colors = categoryColors[typedCategory];

  return (
    <div className="min-h-screen bg-navy pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Back Link - go to studio if signed in, home if not */}
        <Link 
          href={isSignedIn ? "/studio" : "/"} 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {isSignedIn ? "Back to all scenarios" : "Back to home"}
        </Link>

        {/* Category Header */}
        <div className="mb-12">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${colors.bg} ${colors.text} mb-6`}>
            {categoryIcons[typedCategory]}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {categoryLabels[typedCategory]} Training
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            {categoryDescriptions[typedCategory]}
          </p>
          <div className="mt-4 text-gray-500">
            {categoryScenarios.length} scenario{categoryScenarios.length !== 1 ? 's' : ''} available
          </div>
        </div>

        {/* CTA for unauthenticated users */}
        {!isSignedIn && (
          <div className="mb-8 p-6 bg-gradient-to-r from-violet/20 to-cyan/20 border border-violet/30 rounded-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-cyan" />
                <div>
                  <h3 className="text-white font-semibold">Ready to start practicing?</h3>
                  <p className="text-gray-400 text-sm">Create a free account to access AI roleplay training</p>
                </div>
              </div>
              <div className="flex gap-3">
                <SignInButton mode="modal">
                  <button className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <Link
                  href="/sign-up"
                  className="px-5 py-2.5 bg-gradient-to-r from-violet to-cyan hover:opacity-90 text-white font-medium rounded-xl transition-opacity"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Scenarios Grid */}
        {categoryScenarios.length > 0 ? (
          <ScenarioGrid scenarios={categoryScenarios} />
        ) : (
          <div className="text-center py-16 bg-navy-light border border-white/10 rounded-2xl">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${colors.bg} ${colors.text} mb-6`}>
              {categoryIcons[typedCategory]}
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">Coming Soon</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              We're building {categoryLabels[typedCategory].toLowerCase()} training scenarios. 
              Check back soon or explore other categories.
            </p>
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet to-cyan text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Explore All Scenarios
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
