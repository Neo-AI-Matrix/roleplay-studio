"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  MessageSquare, 
  Mic, 
  Clock, 
  RotateCcw,
  Edit3,
  Check,
  X,
  Info,
  Target,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import type { Scenario } from "@/lib/scenarios";
import { categoryLabels, categoryColors, type ScenarioCategory } from "@/lib/scenarios";
import { StarRatingDisplay } from "@/components/StarRating";

interface ScenarioDetailClientProps {
  scenario: Scenario;
}

interface CustomBriefing {
  background: string;
  issue: string;
  goal: string;
}

export function ScenarioDetailClient({ scenario }: ScenarioDetailClientProps) {
  // Load custom briefing from localStorage or use defaults
  const [briefing, setBriefing] = useState<CustomBriefing>({
    background: scenario.briefing.background,
    issue: scenario.briefing.issue,
    goal: scenario.briefing.goal,
  });
  
  const [editingField, setEditingField] = useState<keyof CustomBriefing | null>(null);
  const [editValue, setEditValue] = useState("");
  const [hasCustomizations, setHasCustomizations] = useState(false);
  const [rating, setRating] = useState<{ averageRating: number; totalRatings: number } | null>(null);

  // Load saved customizations on mount
  useEffect(() => {
    const saved = localStorage.getItem(`scenario-briefing-${scenario.id}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setBriefing(parsed);
        setHasCustomizations(true);
      } catch (e) {
        console.error("Failed to parse saved briefing:", e);
      }
    }
  }, [scenario.id]);

  // Fetch rating
  useEffect(() => {
    async function fetchRating() {
      try {
        const response = await fetch(`/api/ratings?scenarioId=${scenario.id}`);
        if (response.ok) {
          const data = await response.json();
          setRating(data);
        }
      } catch (error) {
        console.error("Failed to fetch rating:", error);
      }
    }
    fetchRating();
  }, [scenario.id]);

  const startEditing = (field: keyof CustomBriefing) => {
    setEditingField(field);
    setEditValue(briefing[field]);
  };

  const saveEdit = () => {
    if (editingField) {
      const newBriefing = { ...briefing, [editingField]: editValue };
      setBriefing(newBriefing);
      localStorage.setItem(`scenario-briefing-${scenario.id}`, JSON.stringify(newBriefing));
      setHasCustomizations(true);
      setEditingField(null);
      setEditValue("");
    }
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValue("");
  };

  const resetToDefaults = () => {
    const defaultBriefing = {
      background: scenario.briefing.background,
      issue: scenario.briefing.issue,
      goal: scenario.briefing.goal,
    };
    setBriefing(defaultBriefing);
    localStorage.removeItem(`scenario-briefing-${scenario.id}`);
    setHasCustomizations(false);
  };

  const difficultyColorMap = {
    Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
    Intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Advanced: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  const getCategoryColorClass = (cat: ScenarioCategory) => {
    const colors = categoryColors[cat];
    return `${colors.bg} ${colors.text} ${colors.border}`;
  };

  const briefingFields: { key: keyof CustomBriefing; label: string; icon: typeof Info }[] = [
    { key: "background", label: "Background", icon: Info },
    { key: "issue", label: "Issue", icon: AlertCircle },
    { key: "goal", label: "Goal", icon: Target },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-navy to-navy-light">
      {/* Header */}
      <div className="border-b border-white/10 bg-navy-light/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/studio" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Studio
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Scenario Header */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-white/10 shadow-2xl">
                  <Image
                    src={scenario.persona.avatar}
                    alt={scenario.persona.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                {scenario.elevenLabsAgentId && (
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-violet to-cyan rounded-xl flex items-center justify-center shadow-lg">
                    <Mic className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getCategoryColorClass(scenario.category)}`}>
                  {categoryLabels[scenario.category]}
                </span>
                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${difficultyColorMap[scenario.difficulty]}`}>
                  {scenario.difficulty}
                </span>
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {scenario.duration}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {scenario.title}
              </h1>
              
              <p className="text-electric-blue font-medium mb-2">
                {scenario.persona.name}
              </p>
              
              <p className="text-gray-400 mb-4">
                {scenario.description}
              </p>

              {rating && (
                <StarRatingDisplay 
                  rating={rating.averageRating} 
                  totalRatings={rating.totalRatings} 
                />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link
              href={`/studio/session/${scenario.id}`}
              className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors border border-white/10"
            >
              <MessageSquare className="w-5 h-5" />
              Start Text Session
            </Link>
            {scenario.elevenLabsAgentId ? (
              <Link
                href={`/studio/voice/${scenario.id}?autostart=true`}
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-violet to-cyan hover:opacity-90 text-white font-semibold rounded-xl transition-opacity"
              >
                <Mic className="w-5 h-5" />
                Start Voice Session
              </Link>
            ) : (
              <button
                disabled
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white/5 text-gray-500 font-semibold rounded-xl cursor-not-allowed border border-white/5"
              >
                <Mic className="w-5 h-5" />
                Voice Not Available
              </button>
            )}
          </div>

          {/* Scenario Briefing */}
          <div className="bg-navy-light border border-white/10 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-cyan" />
                Scenario Briefing
              </h2>
              {hasCustomizations && (
                <button
                  onClick={resetToDefaults}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset to Default
                </button>
              )}
            </div>

            <div className="p-4 space-y-4">
              <p className="text-sm text-gray-400 mb-4">
                Review the scenario details below. You can customize the Background, Issue, and Goal to practice different variations.
              </p>

              {briefingFields.map(({ key, label, icon: Icon }) => (
                <div key={key} className="bg-navy/50 rounded-xl p-4 border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-cyan" />
                      <span className="text-sm font-medium text-white">{label}</span>
                    </div>
                    {editingField !== key && (
                      <button
                        onClick={() => startEditing(key)}
                        className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <Edit3 className="w-3 h-3" />
                        Edit
                      </button>
                    )}
                  </div>
                  
                  {editingField === key ? (
                    <div className="space-y-2">
                      <textarea
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-full px-3 py-2 bg-navy border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-electric-blue/50 focus:ring-1 focus:ring-electric-blue/50 resize-none"
                        rows={4}
                        autoFocus
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={cancelEdit}
                          className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                        <button
                          onClick={saveEdit}
                          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-cyan/20 text-cyan hover:bg-cyan/30 rounded-lg transition-colors"
                        >
                          <Check className="w-4 h-4" />
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {briefing[key]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Evaluation Criteria */}
          {scenario.evaluationCriteria && scenario.evaluationCriteria.length > 0 && (
            <div className="mt-6 bg-navy-light border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-violet" />
                  What You'll Be Evaluated On
                </h2>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {scenario.evaluationCriteria.map((criteria, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-cyan flex-shrink-0 mt-0.5" />
                      {criteria}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="mt-6 p-4 bg-violet/10 border border-violet/30 rounded-xl">
            <h3 className="text-sm font-semibold text-violet mb-2">💡 Pro Tip</h3>
            <p className="text-sm text-gray-300">
              Customize the scenario to match your real-world situations. Edit the Background to reflect your company's context, 
              adjust the Issue to match common customer problems you face, and modify the Goal to focus on skills you want to develop.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
