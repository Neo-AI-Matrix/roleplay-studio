"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, Clock, MessageSquare, Mic, X, ChevronDown } from "lucide-react";
import type { Scenario } from "@/lib/scenarios";
import { categoryLabels, categoryColors, type ScenarioCategory } from "@/lib/scenarios";

interface ScenarioGridProps {
  scenarios: Scenario[];
}

export function ScenarioGrid({ scenarios }: ScenarioGridProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories and difficulties
  const categories = useMemo(() => {
    const cats = new Set(scenarios.map(s => s.category));
    return Array.from(cats);
  }, [scenarios]);

  const difficulties = useMemo(() => {
    const diffs = new Set(scenarios.map(s => s.difficulty));
    return Array.from(diffs);
  }, [scenarios]);

  // Filter scenarios
  const filteredScenarios = useMemo(() => {
    return scenarios.filter(scenario => {
      const matchesSearch = search === "" || 
        scenario.title.toLowerCase().includes(search.toLowerCase()) ||
        scenario.description.toLowerCase().includes(search.toLowerCase()) ||
        scenario.persona.name.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory = categoryFilter === "all" || scenario.category === categoryFilter;
      const matchesDifficulty = difficultyFilter === "all" || scenario.difficulty === difficultyFilter;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [scenarios, search, categoryFilter, difficultyFilter]);

  const activeFilters = (categoryFilter !== "all" ? 1 : 0) + (difficultyFilter !== "all" ? 1 : 0);

  const clearFilters = () => {
    setCategoryFilter("all");
    setDifficultyFilter("all");
    setSearch("");
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search scenarios, personas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-navy-light border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-electric-blue/50 focus:ring-1 focus:ring-electric-blue/50"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Toggle (Mobile) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="sm:hidden flex items-center justify-center gap-2 px-4 py-3 bg-navy-light border border-white/10 rounded-xl text-white"
        >
          <Filter className="w-5 h-5" />
          Filters
          {activeFilters > 0 && (
            <span className="px-2 py-0.5 bg-electric-blue text-xs rounded-full">
              {activeFilters}
            </span>
          )}
        </button>

        {/* Desktop Filters */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Category Filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none px-4 py-3 pr-10 bg-navy-light border border-white/10 rounded-xl text-white focus:outline-none focus:border-electric-blue/50 cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{categoryLabels[cat as ScenarioCategory]}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Difficulty Filter */}
          <div className="relative">
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="appearance-none px-4 py-3 pr-10 bg-navy-light border border-white/10 rounded-xl text-white focus:outline-none focus:border-electric-blue/50 cursor-pointer"
            >
              <option value="all">All Levels</option>
              {difficulties.map(diff => (
                <option key={diff} value={diff}>{diff}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Clear Filters */}
          {activeFilters > 0 && (
            <button
              onClick={clearFilters}
              className="px-3 py-3 text-gray-400 hover:text-white transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Mobile Filters Dropdown */}
      {showFilters && (
        <div className="sm:hidden flex flex-col gap-3 p-4 bg-navy-light border border-white/10 rounded-xl">
          <div className="relative">
            <label className="text-xs text-gray-400 mb-1 block">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full appearance-none px-4 py-3 pr-10 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-electric-blue/50"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{categoryLabels[cat as ScenarioCategory]}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 bottom-3 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <label className="text-xs text-gray-400 mb-1 block">Difficulty</label>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full appearance-none px-4 py-3 pr-10 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-electric-blue/50"
            >
              <option value="all">All Levels</option>
              {difficulties.map(diff => (
                <option key={diff} value={diff}>{diff}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 bottom-3 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          {activeFilters > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-electric-blue hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm">
          Showing <span className="text-white font-medium">{filteredScenarios.length}</span> of {scenarios.length} scenarios
        </p>
        {activeFilters > 0 && (
          <div className="hidden sm:flex items-center gap-2">
            {categoryFilter !== "all" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/10 text-sm text-white rounded-lg">
                {categoryLabels[categoryFilter as ScenarioCategory]}
                <button onClick={() => setCategoryFilter("all")} className="hover:text-electric-blue">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {difficultyFilter !== "all" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/10 text-sm text-white rounded-lg">
                {difficultyFilter}
                <button onClick={() => setDifficultyFilter("all")} className="hover:text-electric-blue">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Scenario Grid */}
      {filteredScenarios.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No scenarios found</h3>
          <p className="text-gray-400 mb-4">Try adjusting your search or filters</p>
          <button
            onClick={clearFilters}
            className="text-electric-blue hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScenarios.map((scenario) => (
            <ScenarioTile key={scenario.id} scenario={scenario} />
          ))}
        </div>
      )}
    </div>
  );
}

function ScenarioTile({ scenario }: { scenario: Scenario }) {
  const difficultyColorMap = {
    Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
    Intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Advanced: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  const getCategoryColorClass = (cat: ScenarioCategory) => {
    const colors = categoryColors[cat];
    return `${colors.bg} ${colors.text} ${colors.border}`;
  };

  return (
    <div className="group bg-navy-light border border-white/10 rounded-2xl overflow-hidden hover:border-electric-blue/50 hover:shadow-lg hover:shadow-electric-blue/10 transition-all duration-300">
      {/* Avatar Header */}
      <div className="relative h-48 bg-gradient-to-br from-navy via-navy-light to-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-navy-light via-transparent to-transparent z-10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-white/10 group-hover:ring-electric-blue/30 transition-all duration-300 shadow-2xl">
              <Image
                src={scenario.persona.avatar}
                alt={scenario.persona.name}
                width={112}
                height={112}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            {scenario.elevenLabsAgentId && (
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r from-violet to-cyan rounded-full flex items-center justify-center shadow-lg">
                <Mic className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        </div>
        
        {/* Category Badge - Top Right */}
        <div className="absolute top-3 right-3 z-20">
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColorClass(scenario.category)}`}>
            {categoryLabels[scenario.category]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Persona Name */}
        <p className="text-sm text-electric-blue font-medium mb-1">{scenario.persona.name}</p>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-electric-blue transition-colors line-clamp-1">
          {scenario.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {scenario.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${difficultyColorMap[scenario.difficulty]}`}>
            {scenario.difficulty}
          </span>
          <span className="text-gray-500 text-sm flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {scenario.duration}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/studio/session/${scenario.id}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-xl transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Text
          </Link>
          {scenario.elevenLabsAgentId ? (
            <Link
              href={`/studio/voice/${scenario.id}`}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet to-cyan hover:opacity-90 text-white text-sm font-medium rounded-xl transition-opacity"
            >
              <Mic className="w-4 h-4" />
              Voice
            </Link>
          ) : (
            <button
              disabled
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 text-gray-500 text-sm font-medium rounded-xl cursor-not-allowed"
            >
              <Mic className="w-4 h-4" />
              Voice
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
