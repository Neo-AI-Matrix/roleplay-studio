"use client";

import Link from "next/link";
import { Briefcase, HeadphonesIcon, Users, MessageSquare, Crown, ArrowRight } from "lucide-react";
import { categoryLabels, categoryDescriptions, categoryColors, type ScenarioCategory, getAllScenarios } from "@/lib/scenarios";

const categoryIcons: Record<ScenarioCategory, React.ReactNode> = {
  sales: <Briefcase className="w-6 h-6" />,
  support: <HeadphonesIcon className="w-6 h-6" />,
  hr: <Users className="w-6 h-6" />,
  communication: <MessageSquare className="w-6 h-6" />,
  leadership: <Crown className="w-6 h-6" />,
};

const categories: ScenarioCategory[] = ['sales', 'support', 'hr', 'communication', 'leadership'];

export function CategoryOverview() {
  const allScenarios = getAllScenarios();
  
  const getCategoryCount = (category: ScenarioCategory) => {
    return allScenarios.filter(s => s.category === category).length;
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">Browse by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {categories.map((category) => {
          const colors = categoryColors[category];
          const count = getCategoryCount(category);
          
          return (
            <Link
              key={category}
              href={`/studio/category/${category}`}
              className={`group relative overflow-hidden rounded-2xl border ${colors.border} bg-navy-light hover:bg-white/5 transition-all duration-300`}
            >
              <div className="p-5">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colors.bg} ${colors.text} mb-4 group-hover:scale-110 transition-transform`}>
                  {categoryIcons[category]}
                </div>
                
                {/* Label */}
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-electric-blue transition-colors">
                  {categoryLabels[category]}
                </h3>
                
                {/* Count */}
                <p className="text-sm text-gray-500">
                  {count > 0 ? `${count} scenario${count !== 1 ? 's' : ''}` : 'Coming soon'}
                </p>
                
                {/* Arrow */}
                <ArrowRight className="absolute bottom-5 right-5 w-5 h-5 text-gray-600 group-hover:text-electric-blue group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
