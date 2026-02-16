'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getScenario } from '@/lib/scenarios';
import { 
  saveSession, 
  calculateScore, 
  formatDuration,
  analyzeFillerWords,
  TranscriptEntry,
  ScoreBreakdown,
  FillerWordAnalysis
} from '@/lib/session-storage';
import { Conversation } from '@elevenlabs/client';
import { 
  Mic, 
  MicOff, 
  Phone,
  PhoneOff,
  ArrowLeft,
  Volume2,
  User,
  Bot,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
  Star,
  Clock,
  Download,
  FileText,
  AlertTriangle,
  Target,
  Pause,
  Play
} from 'lucide-react';
import { StarRating } from '@/components/StarRating';

type ConversationStatus = 'disconnected' | 'connecting' | 'connected';
type AgentMode = 'listening' | 'speaking';

export default function VoiceSessionPage() {
  const params = useParams();
  const router = useRouter();
  const scenarioId = params.scenarioId as string;
  const scenario = getScenario(scenarioId);
  
  const [status, setStatus] = useState<ConversationStatus>('disconnected');
  const [agentMode, setAgentMode] = useState<AgentMode>('listening');
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseTimeRemaining, setPauseTimeRemaining] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [sessionScore, setSessionScore] = useState<number | null>(null);
  const [scoreBreakdown, setScoreBreakdown] = useState<ScoreBreakdown | null>(null);
  const [fillerWordAnalysis, setFillerWordAnalysis] = useState<FillerWordAnalysis | null>(null);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [showBriefing, setShowBriefing] = useState(true);
  const [userRating, setUserRating] = useState<number>(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  
  const conversationRef = useRef<any>(null);
  const transcriptContainerRef = useRef<HTMLDivElement>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<Date | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pauseStartRef = useRef<Date | null>(null);
  
  // Max pause time: 5 minutes (300 seconds)
  const MAX_PAUSE_SECONDS = 300;

  // Auto-scroll transcript within its container only (not the page)
  useEffect(() => {
    if (transcriptContainerRef.current && transcriptEndRef.current) {
      transcriptContainerRef.current.scrollTop = transcriptContainerRef.current.scrollHeight;
    }
  }, [transcript]);

  // Scroll to top when session starts
  useEffect(() => {
    if (sessionStarted) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [sessionStarted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (conversationRef.current) {
        conversationRef.current.endSession();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (pauseTimerRef.current) {
        clearInterval(pauseTimerRef.current);
      }
    };
  }, []);

  const startConversation = async () => {
    if (!scenario?.elevenLabsAgentId) {
      setError('No ElevenLabs Agent ID configured for this scenario');
      return;
    }

    setSessionStarted(true);
    setStatus('connecting');
    setError(null);
    startTimeRef.current = new Date();
    
    // Start duration timer
    timerRef.current = setInterval(() => {
      if (startTimeRef.current) {
        setSessionDuration(Math.floor((Date.now() - startTimeRef.current.getTime()) / 1000));
      }
    }, 1000);

    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Get signed URL from our API
      const tokenResponse = await fetch('/api/elevenlabs-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId: scenario.elevenLabsAgentId })
      });

      if (!tokenResponse.ok) {
        throw new Error('Failed to get conversation token');
      }

      const { signedUrl } = await tokenResponse.json();

      // Start the conversation
      const conversation = await Conversation.startSession({
        signedUrl,
        onConnect: () => {
          console.log('Connected to ElevenLabs');
          setStatus('connected');
        },
        onDisconnect: () => {
          console.log('Disconnected from ElevenLabs');
          setStatus('disconnected');
        },
        onError: (error: any) => {
          console.error('Conversation error:', error);
          setError(error.message || 'Connection error');
        },
        onModeChange: (mode: { mode: string }) => {
          setAgentMode(mode.mode === 'speaking' ? 'speaking' : 'listening');
        },
        onMessage: (message: any) => {
          // Handle transcript messages
          console.log('Message received:', message);
          
          let text = '';
          let role: 'user' | 'agent' = 'agent';
          
          // Handle different message formats
          if (message.message) {
            text = message.message;
            role = message.source === 'user' ? 'user' : 'agent';
          } else if (message.text) {
            text = message.text;
            role = message.role === 'user' ? 'user' : 'agent';
          }
          
          if (text && text.trim()) {
            const newEntry: TranscriptEntry = {
              role,
              text: text.trim(),
              timestamp: new Date().toISOString()
            };
            setTranscript(prev => [...prev, newEntry]);
          }
        }
      });

      conversationRef.current = conversation;
      
    } catch (err: any) {
      console.error('Failed to start conversation:', err);
      setError(err.message || 'Failed to start conversation');
      setStatus('disconnected');
      setSessionStarted(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const endConversation = async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    if (conversationRef.current) {
      await conversationRef.current.endSession();
      conversationRef.current = null;
    }
    
    setStatus('disconnected');
    setSessionEnded(true);
    
    // Calculate score
    const { score, breakdown } = calculateScore(transcript);
    setSessionScore(score);
    setScoreBreakdown(breakdown);
    
    // Analyze filler words
    const fillerAnalysis = analyzeFillerWords(transcript, sessionDuration);
    setFillerWordAnalysis(fillerAnalysis);
    
    // Save session
    if (scenario && startTimeRef.current) {
      saveSession({
        id: Date.now().toString(),
        scenarioId: scenario.id,
        scenarioTitle: scenario.title,
        startTime: startTimeRef.current.toISOString(),
        endTime: new Date().toISOString(),
        durationSeconds: sessionDuration,
        transcript,
        score,
        scoreBreakdown: breakdown,
        completed: true,
        isVoice: true
      });
    }
  };

  const toggleMute = () => {
    if (conversationRef.current) {
      conversationRef.current.setMicMuted(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const togglePause = () => {
    if (isPaused) {
      // Resume
      resumeSession();
    } else {
      // Pause
      pauseSession();
    }
  };

  const pauseSession = () => {
    setIsPaused(true);
    pauseStartRef.current = new Date();
    
    // Mute mic and agent audio while paused
    if (conversationRef.current) {
      if (!isMuted) {
        conversationRef.current.setMicMuted(true);
      }
      // Mute agent's voice output
      conversationRef.current.setVolume({ volume: 0 });
    }
    
    // Stop duration timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Start pause countdown timer
    setPauseTimeRemaining(MAX_PAUSE_SECONDS);
    pauseTimerRef.current = setInterval(() => {
      setPauseTimeRemaining(prev => {
        if (prev <= 1) {
          // Time's up - auto-end session
          if (pauseTimerRef.current) {
            clearInterval(pauseTimerRef.current);
          }
          endConversation();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resumeSession = () => {
    setIsPaused(false);
    
    // Clear pause timer
    if (pauseTimerRef.current) {
      clearInterval(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }
    setPauseTimeRemaining(0);
    
    // Restore mic state and agent volume
    if (conversationRef.current) {
      // Unmute mic if it wasn't muted before pause
      if (!isMuted) {
        conversationRef.current.setMicMuted(false);
      }
      // Restore agent's voice output
      conversationRef.current.setVolume({ volume: 1 });
    }
    
    // Resume duration timer
    timerRef.current = setInterval(() => {
      if (startTimeRef.current && !isPaused) {
        // Adjust for paused time
        const pausedDuration = pauseStartRef.current 
          ? Math.floor((Date.now() - pauseStartRef.current.getTime()) / 1000)
          : 0;
        startTimeRef.current = new Date(startTimeRef.current.getTime() + (pausedDuration * 1000));
        pauseStartRef.current = null;
        setSessionDuration(Math.floor((Date.now() - startTimeRef.current.getTime()) / 1000));
      }
    }, 1000);
  };

  const downloadTranscript = () => {
    const text = transcript.map(t => 
      `[${t.role.toUpperCase()}] ${t.text}`
    ).join('\n\n');
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `session-${scenarioId}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-violet/50 mx-auto mb-4">
                <Image 
                  src={scenario.persona.avatar} 
                  alt={scenario.persona.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-gray-400 text-sm mb-6">You&apos;ll be speaking with <span className="text-white font-medium">{scenario.persona.name}</span></p>
              
              <h1 className="text-3xl font-bold text-white mb-2">Voice Training Session</h1>
              <h2 className="text-xl text-electric-blue mb-4">{scenario.title}</h2>
              <p className="text-gray-400 mb-6">{scenario.description}</p>
              
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-6">
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">
                  {scenario.difficulty}
                </span>
                <span>{scenario.duration}</span>
              </div>

              {/* Quick Start Button */}
              {scenario.elevenLabsAgentId && (
                <button
                  onClick={startConversation}
                  className="w-full py-4 mb-8 bg-gradient-to-r from-violet to-cyan hover:opacity-90 text-white font-semibold rounded-xl transition-opacity text-lg flex items-center justify-center gap-3"
                >
                  <Phone className="w-6 h-6" />
                  Start Voice Session
                </button>
              )}

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
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-electric-blue" />
                  Real-Time Voice Conversation
                </h3>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Speak naturally — the AI listens and responds with voice
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Real-time conversation with natural interruptions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Full transcript recorded for review
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Performance score based on best practices (0-10)
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-8">
                <p className="text-yellow-400 text-sm">
                  🎤 You&apos;ll need to allow microphone access when prompted
                </p>
              </div>
              
              {!scenario.elevenLabsAgentId ? (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-8">
                  <p className="text-red-400 text-sm">
                    ⚠️ Voice agent not configured yet. Using text chat instead.
                  </p>
                  <button
                    onClick={() => router.push(`/studio/session/${scenarioId}`)}
                    className="mt-4 px-6 py-3 bg-electric-blue hover:bg-electric-blue/90 text-white font-semibold rounded-xl"
                  >
                    Use Text Chat
                  </button>
                </div>
              ) : (
                <button
                  onClick={startConversation}
                  className="w-full py-4 bg-gradient-to-r from-violet to-cyan hover:opacity-90 text-white font-semibold rounded-xl transition-opacity text-lg flex items-center justify-center gap-3"
                >
                  <Phone className="w-6 h-6" />
                  Start Voice Session
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Session ended - show results
  if (sessionEnded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-navy to-navy-light">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Session Complete!</h1>
              <p className="text-gray-400">{scenario.title}</p>
            </div>

            {/* Score Card */}
            <div className="bg-navy-light border border-white/10 rounded-2xl p-8 mb-8">
              <div className="flex items-center justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="text-6xl font-bold text-white mb-2">{sessionScore}</div>
                  <div className="text-gray-400">out of 10</div>
                  <div className="flex justify-center mt-2">
                    {[...Array(10)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < (sessionScore || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                      />
                    ))}
                  </div>
                </div>
                <div className="text-center border-l border-white/10 pl-8">
                  <div className="text-4xl font-bold text-white mb-2 flex items-center gap-2">
                    <Clock className="w-8 h-8 text-electric-blue" />
                    {formatDuration(sessionDuration)}
                  </div>
                  <div className="text-gray-400">Duration</div>
                </div>
              </div>

              {/* Score Breakdown */}
              <h3 className="text-xl font-semibold text-white mb-4">Best Practices Breakdown</h3>
              <div className="grid grid-cols-2 gap-3">
                {scoreBreakdown && Object.entries(scoreBreakdown).map(([key, value]) => (
                  <div 
                    key={key} 
                    className={`flex items-center gap-3 p-3 rounded-lg ${value ? 'bg-green-500/10' : 'bg-red-500/10'}`}
                  >
                    {value ? (
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${value ? 'text-green-400' : 'text-red-400'}`}>
                      {formatBreakdownKey(key)}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Filler Words Analysis */}
              {fillerWordAnalysis && (
                <div className="mt-8 pt-6 border-t border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">Speech Clarity</h3>
                  <div className="flex items-center gap-6 mb-4">
                    <div className="text-center">
                      <div className={`text-4xl font-bold ${
                        fillerWordAnalysis.rating === 'excellent' ? 'text-green-400' :
                        fillerWordAnalysis.rating === 'good' ? 'text-blue-400' :
                        fillerWordAnalysis.rating === 'needs-work' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {fillerWordAnalysis.totalFillerWords}
                      </div>
                      <div className="text-gray-400 text-sm">Filler Words</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-4xl font-bold ${
                        fillerWordAnalysis.rating === 'excellent' ? 'text-green-400' :
                        fillerWordAnalysis.rating === 'good' ? 'text-blue-400' :
                        fillerWordAnalysis.rating === 'needs-work' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {fillerWordAnalysis.fillerWordsPerMinute}
                      </div>
                      <div className="text-gray-400 text-sm">Per Minute</div>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                      fillerWordAnalysis.rating === 'excellent' ? 'bg-green-500/20 text-green-400' :
                      fillerWordAnalysis.rating === 'good' ? 'bg-blue-500/20 text-blue-400' :
                      fillerWordAnalysis.rating === 'needs-work' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {fillerWordAnalysis.rating === 'excellent' ? '✨ Excellent' :
                       fillerWordAnalysis.rating === 'good' ? '👍 Good' :
                       fillerWordAnalysis.rating === 'needs-work' ? '⚠️ Needs Work' :
                       '🎯 Focus Area'}
                    </div>
                  </div>
                  
                  {Object.keys(fillerWordAnalysis.fillerWordCounts).length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(fillerWordAnalysis.fillerWordCounts)
                        .sort(([,a], [,b]) => b - a)
                        .map(([word, count]) => (
                          <span 
                            key={word} 
                            className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300"
                          >
                            &ldquo;{word}&rdquo; × {count}
                          </span>
                        ))}
                    </div>
                  )}
                  
                  <p className="text-gray-500 text-sm mt-4">
                    💡 Tip: Filler words like &ldquo;um&rdquo; and &ldquo;uh&rdquo; can reduce perceived confidence. 
                    Try pausing instead of filling silence.
                  </p>
                </div>
              )}
            </div>

            {/* Transcript */}
            <div className="bg-navy-light border border-white/10 rounded-2xl p-8 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Session Transcript</h3>
                <button
                  onClick={downloadTranscript}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto space-y-3">
                {transcript.length === 0 ? (
                  <p className="text-gray-500 italic">No transcript recorded</p>
                ) : (
                  transcript.map((entry, i) => (
                    <div key={i} className={`flex gap-3 ${entry.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {entry.role === 'agent' && (
                        <Bot className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                      )}
                      <div className={`max-w-[80%] rounded-xl px-4 py-3 ${
                        entry.role === 'user' 
                          ? 'bg-electric-blue/20 text-white' 
                          : 'bg-white/10 text-gray-300'
                      }`}>
                        <p className="text-sm">{entry.text}</p>
                      </div>
                      {entry.role === 'user' && (
                        <User className="w-6 h-6 text-electric-blue flex-shrink-0 mt-1" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Rate the Agent */}
            <div className="bg-navy-light border border-white/10 rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/20 flex-shrink-0">
                  <Image 
                    src={scenario.persona.avatar} 
                    alt={scenario.persona.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Rate {scenario.persona.name}</h3>
                  {ratingSubmitted ? (
                    <div className="flex items-center gap-2">
                      <StarRating rating={userRating} showCount={false} />
                      <span className="text-green-400">Thanks for your feedback!</span>
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
                        <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                      )}
                      {!userRating && (
                        <span className="text-gray-400 text-sm">Click to rate</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-center pb-16">
              <button
                onClick={() => router.push('/studio')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors"
              >
                Back to Studio
              </button>
              <button
                onClick={() => {
                  // Reset state
                  setSessionEnded(false);
                  setTranscript([]);
                  setSessionScore(null);
                  setScoreBreakdown(null);
                  setFillerWordAnalysis(null);
                  setSessionDuration(0);
                  setError(null);
                  setUserRating(0);
                  setRatingSubmitted(false);
                  // Scroll to top
                  window.scrollTo({ top: 0, behavior: 'instant' });
                  // Start new session immediately
                  startConversation();
                }}
                className="px-8 py-4 bg-gradient-to-r from-violet to-cyan hover:opacity-90 text-white font-semibold rounded-xl transition-opacity"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active voice session
  return (
    <div className="h-screen bg-gradient-to-b from-navy to-navy-light flex flex-col">
      {/* Header */}
      <div className="border-b border-white/10 bg-navy-light/80 backdrop-blur-sm px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                endConversation();
                router.push('/studio');
              }}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-white font-semibold">{scenario.title}</h1>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-500">Voice Session</span>
                <span className="text-electric-blue flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatDuration(sessionDuration)}
                </span>
              </div>
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
            
            <span className={`px-3 py-1 rounded-full text-sm ${
              status === 'connected' 
                ? 'bg-green-500/20 text-green-400' 
                : status === 'connecting'
                ? 'bg-yellow-500/20 text-yellow-400'
                : 'bg-red-500/20 text-red-400'
            }`}>
              {status === 'connected' ? '● Connected' : status === 'connecting' ? '● Connecting...' : '○ Disconnected'}
            </span>
          </div>
        </div>
      </div>

      {/* Collapsible Briefing Panel */}
      {showBriefing && (
        <div className="border-b border-white/10 bg-navy-light/50 px-4 py-4 animate-in slide-in-from-top duration-200">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
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

      {/* Main Content - Side by Side Layout */}
      <div className="flex-1 container mx-auto px-4 py-6 overflow-hidden">
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Side - Agent & Controls */}
          <div className="flex flex-col items-center justify-center">
            {/* Status Visualization with Avatar */}
            <div className="relative mb-6">
              <div className={`w-28 h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden transition-all duration-300 ${
                agentMode === 'speaking' 
                  ? 'ring-4 ring-violet animate-pulse scale-110' 
                  : 'ring-2 ring-white/20'
              }`}>
                <Image 
                  src={scenario.persona.avatar} 
                  alt={scenario.persona.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Status overlay */}
              {status === 'connecting' && (
                <div className="absolute inset-0 rounded-full bg-navy/80 flex items-center justify-center">
                  <Loader2 className="w-10 h-10 text-white animate-spin" />
                </div>
              )}
              
              {/* Speaking indicator */}
              {status === 'connected' && agentMode === 'speaking' && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-violet rounded-full flex items-center justify-center">
                  <Volume2 className="w-4 h-4 text-white" />
                </div>
              )}
              
              {/* Listening indicator rings */}
              {status === 'connected' && agentMode === 'listening' && (
                <>
                  <div className="absolute inset-0 rounded-full border-2 border-electric-blue/30 animate-ping" />
                  <div className="absolute inset-[-8px] rounded-full border border-electric-blue/20 animate-pulse" />
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-electric-blue rounded-full flex items-center justify-center">
                    <Mic className="w-4 h-4 text-white" />
                  </div>
                </>
              )}
            </div>

            <p className="text-lg text-white mb-1 text-center">
              {status === 'connecting' && 'Connecting...'}
              {status === 'connected' && isPaused && '⏸️ Session Paused'}
              {status === 'connected' && !isPaused && agentMode === 'speaking' && `${scenario.persona.name} is speaking...`}
              {status === 'connected' && !isPaused && agentMode === 'listening' && 'Listening to you...'}
              {status === 'disconnected' && 'Session ended'}
            </p>
            
            <p className="text-gray-400 text-sm mb-6 text-center">
              {status === 'connected' && isPaused && 'Take your time — click Resume when ready'}
              {status === 'connected' && !isPaused && `Speak naturally — ${scenario.persona.name.split(' ')[0]} will respond`}
            </p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-6 max-w-sm">
                <p className="text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </p>
              </div>
            )}

            {/* Pause Indicator */}
            {isPaused && (
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-3 mb-4 max-w-sm">
                <p className="text-yellow-400 text-sm flex items-center gap-2">
                  <Pause className="w-4 h-4" />
                  Session paused — {Math.floor(pauseTimeRemaining / 60)}:{(pauseTimeRemaining % 60).toString().padStart(2, '0')} remaining
                </p>
                <p className="text-yellow-400/70 text-xs mt-1">
                  Session will auto-end if not resumed
                </p>
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleMute}
                disabled={status !== 'connected' || isPaused}
                className={`p-3 rounded-full transition-all ${
                  isMuted 
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              
              {/* Pause/Resume Button */}
              <button
                onClick={togglePause}
                disabled={status !== 'connected'}
                className={`p-3 rounded-full transition-all ${
                  isPaused 
                    ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                    : 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                title={isPaused ? 'Resume session' : 'Pause session'}
              >
                {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
              </button>
              
              <button
                onClick={status === 'connected' ? endConversation : startConversation}
                className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                  status === 'connected'
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-gradient-to-r from-violet to-cyan hover:opacity-90 text-white'
                }`}
              >
                {status === 'connected' ? (
                  <>
                    <PhoneOff className="w-5 h-5" />
                    End Session
                  </>
                ) : (
                  <>
                    <Phone className="w-5 h-5" />
                    {status === 'connecting' ? 'Connecting...' : 'Reconnect'}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Side - Transcript */}
          <div className="bg-navy-light/50 border border-white/10 rounded-xl flex flex-col min-h-0">
            <div className="px-4 py-3 border-b border-white/10 flex-shrink-0">
              <h3 className="text-white font-semibold text-sm flex items-center justify-between">
                <span>Live Transcript</span>
                <span className="text-gray-500 font-normal">{transcript.length} messages</span>
              </h3>
            </div>
            <div ref={transcriptContainerRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
              {transcript.length === 0 ? (
                <p className="text-gray-500 text-sm italic">Transcript will appear here...</p>
              ) : (
                transcript.map((msg, i) => (
                  <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'agent' && (
                      <Bot className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    )}
                    <p className={`text-sm rounded-lg px-3 py-2 max-w-[85%] ${
                      msg.role === 'user' 
                        ? 'bg-electric-blue/20 text-electric-blue' 
                        : 'bg-white/10 text-gray-300'
                    }`}>
                      {msg.text}
                    </p>
                    {msg.role === 'user' && (
                      <User className="w-5 h-5 text-electric-blue flex-shrink-0 mt-1" />
                    )}
                  </div>
                ))
              )}
              <div ref={transcriptEndRef} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Format breakdown key to readable text
function formatBreakdownKey(key: string): string {
  const labels: Record<string, string> = {
    usedCustomerName: 'Used customer\'s name',
    showedEmpathy: 'Showed empathy',
    tookOwnership: 'Took ownership',
    stayedCalm: 'Stayed calm throughout',
    askedClarifyingQuestions: 'Asked clarifying questions',
    offeredSolutions: 'Offered solutions',
    providedClearNextSteps: 'Provided clear next steps',
    closedProfessionally: 'Closed professionally',
    handledVerification: 'Handled verification',
    deescalatedSuccessfully: 'De-escalated successfully'
  };
  return labels[key] || key;
}
