'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getScenario } from '@/lib/scenarios';
import { Conversation } from '@elevenlabs/client';
import { 
  Mic, 
  MicOff, 
  Phone,
  PhoneOff,
  ArrowLeft,
  Volume2,
  VolumeX,
  User,
  Bot,
  Loader2,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

type ConversationStatus = 'disconnected' | 'connecting' | 'connected';
type AgentMode = 'listening' | 'speaking';

interface TranscriptMessage {
  id: string;
  role: 'user' | 'agent';
  text: string;
  timestamp: Date;
}

export default function VoiceSessionPage() {
  const params = useParams();
  const router = useRouter();
  const scenarioId = params.scenarioId as string;
  const scenario = getScenario(scenarioId);
  
  const [status, setStatus] = useState<ConversationStatus>('disconnected');
  const [agentMode, setAgentMode] = useState<AgentMode>('listening');
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const [sessionStarted, setSessionStarted] = useState(false);
  
  const conversationRef = useRef<any>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (conversationRef.current) {
        conversationRef.current.endSession();
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
          if (message.type === 'transcript' || message.type === 'agent_response') {
            const newMessage: TranscriptMessage = {
              id: Date.now().toString(),
              role: message.role === 'user' ? 'user' : 'agent',
              text: message.text || message.message || '',
              timestamp: new Date()
            };
            
            if (newMessage.text) {
              setTranscript(prev => [...prev, newMessage]);
            }
          }
        }
      });

      conversationRef.current = conversation;
      
    } catch (err: any) {
      console.error('Failed to start conversation:', err);
      setError(err.message || 'Failed to start conversation');
      setStatus('disconnected');
      setSessionStarted(false);
    }
  };

  const endConversation = async () => {
    if (conversationRef.current) {
      await conversationRef.current.endSession();
      conversationRef.current = null;
    }
    setStatus('disconnected');
  };

  const toggleMute = () => {
    if (conversationRef.current) {
      conversationRef.current.setMicMuted(!isMuted);
      setIsMuted(!isMuted);
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
              <div className="w-20 h-20 bg-gradient-to-br from-violet to-cyan rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Mic className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-3xl font-bold text-white mb-2">Voice Training Session</h1>
              <h2 className="text-xl text-electric-blue mb-4">{scenario.title}</h2>
              <p className="text-gray-400 mb-6">{scenario.description}</p>
              
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-8">
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">
                  {scenario.difficulty}
                </span>
                <span>{scenario.duration}</span>
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
                    Emotionally expressive AI responses
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Full transcript saved for review
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-8">
                <p className="text-yellow-400 text-sm">
                  🎤 You'll need to allow microphone access when prompted
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
              <p className="text-gray-500 text-sm">Voice Session</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Status Visualization */}
        <div className="relative mb-8">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
            agentMode === 'speaking' 
              ? 'bg-gradient-to-br from-violet to-cyan animate-pulse scale-110' 
              : 'bg-navy-light border-2 border-white/20'
          }`}>
            {status === 'connecting' ? (
              <Loader2 className="w-12 h-12 text-white animate-spin" />
            ) : agentMode === 'speaking' ? (
              <Volume2 className="w-12 h-12 text-white" />
            ) : (
              <Mic className="w-12 h-12 text-white" />
            )}
          </div>
          
          {/* Listening indicator rings */}
          {status === 'connected' && agentMode === 'listening' && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-electric-blue/30 animate-ping" />
              <div className="absolute inset-[-8px] rounded-full border border-electric-blue/20 animate-pulse" />
            </>
          )}
        </div>

        <p className="text-xl text-white mb-2">
          {status === 'connecting' && 'Connecting...'}
          {status === 'connected' && agentMode === 'speaking' && 'Agent is speaking...'}
          {status === 'connected' && agentMode === 'listening' && 'Listening to you...'}
          {status === 'disconnected' && 'Session ended'}
        </p>
        
        <p className="text-gray-400 text-sm mb-8">
          {status === 'connected' && 'Speak naturally — the AI will respond'}
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-8 max-w-md">
            <p className="text-red-400 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
            </p>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMute}
            disabled={status !== 'connected'}
            className={`p-4 rounded-full transition-all ${
              isMuted 
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                : 'bg-white/10 text-white hover:bg-white/20'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
          
          <button
            onClick={status === 'connected' ? endConversation : startConversation}
            className={`px-8 py-4 rounded-full font-semibold transition-all flex items-center gap-2 ${
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

      {/* Transcript Panel */}
      <div className="border-t border-white/10 bg-navy-light/50 max-h-64 overflow-y-auto">
        <div className="container mx-auto px-4 py-4">
          <h3 className="text-white font-semibold mb-3 text-sm">Live Transcript</h3>
          <div className="space-y-2">
            {transcript.length === 0 ? (
              <p className="text-gray-500 text-sm italic">Transcript will appear here...</p>
            ) : (
              transcript.map((msg) => (
                <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'agent' && (
                    <Bot className="w-5 h-5 text-violet flex-shrink-0 mt-1" />
                  )}
                  <p className={`text-sm rounded-lg px-3 py-2 max-w-[80%] ${
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
  );
}
