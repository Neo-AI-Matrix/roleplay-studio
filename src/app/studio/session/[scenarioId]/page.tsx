'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getScenario } from '@/lib/scenarios';
import { 
  Send, 
  Volume2, 
  VolumeX,
  ArrowLeft,
  User,
  Loader2,
  Star,
  CheckCircle,
  FileText,
  AlertTriangle,
  Target
} from 'lucide-react';
import { StarRating } from '@/components/StarRating';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface SessionFeedback {
  rating: number;
  strengths: string[];
  improvements: string[];
  summary: string;
}

export default function SessionPage() {
  const params = useParams();
  const router = useRouter();
  const scenarioId = params.scenarioId as string;
  const scenario = getScenario(scenarioId);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [feedback, setFeedback] = useState<SessionFeedback | null>(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [showBriefing, setShowBriefing] = useState(true);
  const [userRating, setUserRating] = useState<number>(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Scroll to top when session starts
  useEffect(() => {
    if (sessionStarted) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [sessionStarted]);

  // Auto-scroll transcript to top when new messages arrive
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = 0;
    }
  }, [messages]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Start session with AI's opening line
  const startSession = () => {
    if (!scenario) return;
    
    setSessionStarted(true);
    const openingMessage: Message = {
      id: '1',
      role: 'assistant',
      content: scenario.openingLine,
      timestamp: new Date()
    };
    setMessages([openingMessage]);
    
    // Speak the opening line if voice is enabled
    if (voiceEnabled) {
      speakText(scenario.openingLine);
    }
  };

  // Text-to-speech function using ElevenLabs
  const speakText = async (text: string) => {
    // Stop any current audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    setIsSpeaking(true);
    
    try {
      const response = await fetch('/api/speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text, 
          scenarioId 
        })
      });
      
      if (!response.ok) {
        throw new Error('Speech generation failed');
      }
      
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      audio.onerror = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();
      
    } catch (error) {
      console.error('Error playing speech:', error);
      setIsSpeaking(false);
      
      // Fallback to browser TTS
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  // Send message to AI
  const sendMessage = async () => {
    if (!input.trim() || isLoading || !scenario) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          systemPrompt: scenario.systemPrompt
        })
      });
      
      if (!response.ok) throw new Error('Failed to get response');
      
      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Check if session has ended (AI provided feedback)
      if (data.message.toLowerCase().includes('rating:') || 
          data.message.toLowerCase().includes('/10') ||
          data.message.toLowerCase().includes('out of 10')) {
        setSessionEnded(true);
        // Parse feedback from the response
        parseFeedback(data.message);
      } else if (voiceEnabled) {
        speakText(data.message);
      }
      
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, there was an error processing your response. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  // Parse feedback from AI response
  const parseFeedback = (response: string) => {
    // Extract rating (look for patterns like "7/10", "Rating: 7", etc.)
    const ratingMatch = response.match(/(\d+)\s*(?:\/10|out of 10)/i) || 
                        response.match(/rating[:\s]+(\d+)/i);
    const rating = ratingMatch ? parseInt(ratingMatch[1]) : 5;
    
    setFeedback({
      rating,
      strengths: ['Detailed feedback provided in conversation above'],
      improvements: ['Review the AI feedback above for specific areas'],
      summary: response
    });
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // End session manually
  const endSession = () => {
    setInput('END SESSION - Please provide your feedback and rating.');
    setTimeout(() => sendMessage(), 100);
  };

  // Submit user rating
  const submitRating = async (rating: number) => {
    setUserRating(rating);
    setIsSubmittingRating(true);
    
    try {
      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId,
          rating
        })
      });
      
      if (response.ok) {
        setRatingSubmitted(true);
      }
    } catch (error) {
      console.error('Failed to submit rating:', error);
    } finally {
      setIsSubmittingRating(false);
    }
  };

  if (!scenario) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Scenario not found</h1>
          <button 
            onClick={() => router.push('/studio')}
            className="px-4 py-2 bg-electric-blue text-white rounded-lg"
          >
            Back to Studio
          </button>
        </div>
      </div>
    );
  }

  // Pre-session screen
  if (!sessionStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-navy to-navy-light">
        <div className="container mx-auto px-4 py-8">
          <button 
            onClick={() => router.push('/studio')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Studio
          </button>
          
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-navy-light border border-white/10 rounded-2xl p-8 mb-8">
              {/* Persona Avatar */}
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-electric-blue/50 mx-auto mb-4">
                <Image 
                  src={scenario.persona.avatar} 
                  alt={scenario.persona.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-gray-400 text-sm mb-6">You&apos;ll be chatting with <span className="text-white font-medium">{scenario.persona.name}</span></p>
              
              <h1 className="text-3xl font-bold text-white mb-4">{scenario.title}</h1>
              <p className="text-gray-400 mb-6">{scenario.description}</p>
              
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-6">
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">
                  {scenario.difficulty}
                </span>
                <span>{scenario.duration}</span>
              </div>

              {/* Quick Start Button */}
              <button
                onClick={startSession}
                className="w-full py-4 mb-8 bg-electric-blue hover:bg-electric-blue/90 text-white font-semibold rounded-xl transition-colors text-lg flex items-center justify-center gap-3"
              >
                <Send className="w-6 h-6" />
                Start Text Session
              </button>
              
              {/* Scenario Briefing */}
              <div className="bg-navy/50 rounded-xl p-6 text-left mb-8 border border-white/5">
                <h3 className="text-white font-semibold mb-4 text-lg">📋 Scenario Briefing</h3>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-electric-blue/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-electric-blue" />
                    </div>
                    <div>
                      <h4 className="text-electric-blue font-medium text-sm mb-1">Background</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{scenario.briefing.background}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-red-400 font-medium text-sm mb-1">The Issue</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{scenario.briefing.issue}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-green-400 font-medium text-sm mb-1">Your Goal</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{scenario.briefing.goal}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-navy/50 rounded-xl p-6 text-left mb-8">
                <h3 className="text-white font-semibold mb-3">You&apos;ll be evaluated on:</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {scenario.evaluationCriteria.map((criteria, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                      <CheckCircle className="w-4 h-4 text-electric-blue flex-shrink-0" />
                      {criteria}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center justify-center gap-4 mb-6">
                <button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    voiceEnabled 
                      ? 'bg-electric-blue/20 text-electric-blue' 
                      : 'bg-white/10 text-gray-400'
                  }`}
                >
                  {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  Voice {voiceEnabled ? 'On' : 'Off'}
                </button>
              </div>
              
              <button
                onClick={startSession}
                className="w-full py-4 bg-electric-blue hover:bg-electric-blue/90 text-white font-semibold rounded-xl transition-colors text-lg"
              >
                Start Session
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active session screen
  return (
    <div className="h-screen bg-gradient-to-b from-navy to-navy-light flex flex-col">
      {/* Header */}
      <div className="border-b border-white/10 bg-navy-light/80 backdrop-blur-sm px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/studio')}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            {/* Persona Avatar & Name */}
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-electric-blue/50 flex-shrink-0">
              <Image 
                src={scenario.persona.avatar} 
                alt={scenario.persona.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-white font-semibold">{scenario.persona.name}</h1>
              <p className="text-gray-500 text-sm">{scenario.title}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Briefing Toggle Button */}
            <button
              onClick={() => setShowBriefing(!showBriefing)}
              className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 transition-colors ${
                showBriefing 
                  ? 'bg-electric-blue/20 text-electric-blue' 
                  : 'bg-white/10 text-gray-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              Briefing
            </button>
            
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`p-2 rounded-lg transition-colors ${
                voiceEnabled ? 'bg-electric-blue/20 text-electric-blue' : 'bg-white/10 text-gray-400'
              }`}
              title={voiceEnabled ? 'Mute voice' : 'Enable voice'}
            >
              {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            
            {!sessionEnded && (
              <button
                onClick={endSession}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors text-sm font-medium"
              >
                End Session
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Collapsible Briefing Panel */}
      {showBriefing && (
        <div className="border-b border-white/10 bg-navy-light/50 px-4 py-3">
          <div className="container mx-auto max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="flex gap-2">
                <div className="flex-shrink-0 w-6 h-6 bg-electric-blue/20 rounded flex items-center justify-center">
                  <FileText className="w-3 h-3 text-electric-blue" />
                </div>
                <div>
                  <h4 className="text-electric-blue font-medium text-xs mb-1">Background</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{scenario.briefing.background}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-shrink-0 w-6 h-6 bg-red-500/20 rounded flex items-center justify-center">
                  <AlertTriangle className="w-3 h-3 text-red-400" />
                </div>
                <div>
                  <h4 className="text-red-400 font-medium text-xs mb-1">The Issue</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{scenario.briefing.issue}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded flex items-center justify-center">
                  <Target className="w-3 h-3 text-green-400" />
                </div>
                <div>
                  <h4 className="text-green-400 font-medium text-xs mb-1">Your Goal</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{scenario.briefing.goal}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Input Area - Now above transcript */}
      {!sessionEnded && (
        <div className="border-b border-white/10 bg-navy-light/80 backdrop-blur-sm px-4 py-3">
          <div className="container mx-auto max-w-3xl">
            <div className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your response here..."
                className="flex-1 bg-navy border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-electric-blue"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="px-6 py-3 bg-electric-blue hover:bg-electric-blue/90 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 text-xs mt-1 text-center">
              Press Enter to send • Type "END SESSION" to get your feedback
            </p>
          </div>
        </div>
      )}

      {/* Chat Messages - Scrollable transcript (newest at top) */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-4 py-3"
      >
        <div className="container mx-auto max-w-3xl space-y-3">
          {/* Loading indicator at top */}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/20 flex-shrink-0">
                <Image 
                  src={scenario.persona.avatar} 
                  alt={scenario.persona.name}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-navy-light border border-white/10 rounded-2xl px-4 py-2">
                <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
              </div>
            </div>
          )}
          
          {isSpeaking && (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Volume2 className="w-4 h-4 animate-pulse" />
              Speaking...
            </div>
          )}
          
          {/* Messages in reverse order (newest first) */}
          {[...messages].reverse().map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/20 flex-shrink-0">
                  <Image 
                    src={scenario.persona.avatar} 
                    alt={scenario.persona.name}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-electric-blue text-white'
                    : 'bg-navy-light border border-white/10 text-gray-200'
                }`}
              >
                <p className="whitespace-pre-wrap text-sm">{message.content}</p>
              </div>
              
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-electric-blue/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-electric-blue" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Session Ended Feedback */}
      {sessionEnded && feedback && (
        <div className="border-t border-white/10 bg-navy-light/80 backdrop-blur-sm px-4 py-4">
          <div className="container mx-auto max-w-3xl">
            <div className="bg-navy border border-white/10 rounded-xl p-4">
              {/* AI Performance Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl font-bold text-white">{feedback.rating}/10</div>
                <div className="flex">
                  {[...Array(10)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < feedback.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">Session complete! Review the feedback above.</p>
              
              {/* User Rating Section */}
              <div className="border-t border-white/10 pt-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/20 flex-shrink-0">
                    <Image 
                      src={scenario.persona.avatar} 
                      alt={scenario.persona.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium mb-1">Rate {scenario.persona.name}</p>
                    {ratingSubmitted ? (
                      <div className="flex items-center gap-2">
                        <StarRating rating={userRating} showCount={false} />
                        <span className="text-green-400 text-sm">Thanks for your feedback!</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <StarRating 
                          rating={userRating} 
                          interactive 
                          onRate={submitRating}
                          showCount={false}
                          size="lg"
                        />
                        {isSubmittingRating && (
                          <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => router.push('/studio')}
                className="px-4 py-2 bg-electric-blue hover:bg-electric-blue/90 text-white font-semibold rounded-lg transition-colors"
              >
                Back to Studio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
