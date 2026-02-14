'use client';

import { useState, useEffect } from 'react';
import { Brain, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const demoResponses = [
  {
    text: "I completely understand your frustration, and I appreciate you being direct with me. Can you help me understand which specific metrics you were expecting to see improvement in?",
    label: "Empathy + Discovery"
  },
  {
    text: "You're right to hold us accountable. Before we discuss next steps, I'd like to understand what success looks like for you — what would make this investment worthwhile?",
    label: "Ownership + Reframe"
  },
  {
    text: "I hear you. Three months without clear ROI isn't acceptable. Let me pull up your usage data right now so we can pinpoint exactly where the gap is.",
    label: "Action-Oriented"
  },
  {
    text: "That's fair feedback. Many of our most successful customers felt the same way at this stage. Would you be open to a 15-minute call with one of them?",
    label: "Social Proof"
  },
];

export function HeroDemoChat() {
  const [currentResponseIndex, setCurrentResponseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing animation
  useEffect(() => {
    const currentResponse = demoResponses[currentResponseIndex].text;
    
    if (isTyping) {
      if (displayedText.length < currentResponse.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentResponse.slice(0, displayedText.length + 1));
        }, 30); // Typing speed
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, wait then move to next
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2500); // Pause after typing complete
        return () => clearTimeout(timeout);
      }
    } else {
      // Start erasing / move to next response
      const timeout = setTimeout(() => {
        setDisplayedText('');
        setCurrentResponseIndex((prev) => (prev + 1) % demoResponses.length);
        setIsTyping(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, isTyping, currentResponseIndex]);

  const currentResponse = demoResponses[currentResponseIndex];

  return (
    <div className="relative mt-16 max-w-5xl mx-auto">
      {/* Demo Label */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
        <Badge className="bg-gradient-to-r from-violet to-cyan text-white border-0 px-4 py-1 text-sm font-medium shadow-lg">
          <Play className="w-3 h-3 mr-2 fill-current" />
          Live Demo — Watch AI Roleplay in Action
        </Badge>
      </div>

      <div className="glass-card p-8 glow-violet">
        <div className="bg-navy-light rounded-lg p-6 border border-violet/20">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet to-cyan flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-white">AI Customer: Frustrated Enterprise Buyer</p>
              <p className="text-sm text-muted-foreground">Objection Handling Scenario</p>
            </div>
            <Badge className="ml-auto bg-cyan/30 text-white border-cyan/50">Live Session</Badge>
          </div>
          
          {/* Chat Messages */}
          <div className="space-y-4">
            {/* AI Message */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-sm font-semibold text-red-400 flex-shrink-0">AI</div>
              <div className="flex-1 bg-navy/50 rounded-lg p-3 border border-red-500/20">
                <p className="text-muted-foreground">"We've been evaluating your solution for 3 months and I'm honestly not seeing the ROI your team promised. I'm ready to cancel."</p>
              </div>
            </div>

            {/* User Response (Animated) */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-violet/20 flex items-center justify-center text-sm font-semibold text-violet flex-shrink-0">You</div>
              <div className="flex-1">
                <div className="bg-violet/10 rounded-lg p-3 border border-violet/20 min-h-[80px]">
                  <p className="text-white">
                    {displayedText}
                    <span className={`inline-block w-0.5 h-4 bg-cyan ml-0.5 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
                  </p>
                </div>
                {/* Technique Label */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-cyan font-medium">✨ Technique:</span>
                  <Badge variant="outline" className="text-xs border-cyan/30 text-cyan bg-cyan/10">
                    {currentResponse.label}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {demoResponses.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentResponseIndex 
                    ? 'bg-cyan w-6' 
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
