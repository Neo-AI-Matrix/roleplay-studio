'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  Bot,
  MapPin,
  Send,
  CheckCircle,
  Headphones,
  X,
  Sparkles
} from 'lucide-react';
import { FAQ } from '@/components/FAQ';
import { SchemaScript, getContactPageSchema } from '@/lib/schema';

// ElevenLabs Conversational AI Widget Agent ID (create in ElevenLabs dashboard)
const ELEVENLABS_AGENT_ID = 'YOUR_AGENT_ID_HERE'; // TODO: Replace with actual agent ID

const contactFAQs = [
  {
    question: 'How long is the free trial?',
    answer: '7 days with full access to all features, all scenarios, and unlimited practice sessions. Your trial automatically converts to a paid subscription unless you cancel before it ends.',
  },
  {
    question: 'Can I create custom scenarios?',
    answer: 'Yes! Business and Enterprise plans include a custom scenario builder where you can create AI personas tailored to your specific products, customers, and industry challenges.',
  },
  {
    question: 'Do you offer team discounts?',
    answer: 'Yes, we offer volume discounts for teams of 10+ users on our Business plan. Enterprise customers receive custom pricing based on their needs. Contact our sales team for a personalized quote.',
  },
  {
    question: 'What integrations do you support?',
    answer: 'We integrate with Salesforce, HubSpot, Slack, Microsoft Teams, and most major LMS platforms. Enterprise customers can also request custom API integrations with their existing tools.',
  },
  {
    question: 'How quickly does your team respond?',
    answer: 'We respond as quickly as possible during business hours (9am-6pm PT, Monday-Friday). Enterprise customers receive priority support with dedicated success managers.',
  },
  {
    question: 'Can I schedule a live demo?',
    answer: 'Absolutely! Fill out the contact form or email us at hello@roleplaystudio.com and mention you\'d like a demo. We\'ll schedule a 30-minute personalized walkthrough of the platform tailored to your team\'s needs.',
  },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send message');
      }
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <SchemaScript schema={getContactPageSchema()} />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet/20 via-transparent to-transparent" />

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-gradient-to-r from-violet to-cyan text-white border-0">
            Contact Us
          </Badge>
          
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Let's Start a{' '}
            <span className="gradient-text">Conversation</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Have questions? Want a demo? Our team is here to help you transform your training.
          </p>

          {/* Support Team Image */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="flex -space-x-3">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face" className="w-12 h-12 rounded-full border-2 border-navy" alt="Support team" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" className="w-12 h-12 rounded-full border-2 border-navy" alt="Support team" />
              <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face" className="w-12 h-12 rounded-full border-2 border-navy" alt="Support team" />
            </div>
            <p className="text-muted-foreground">
              Our team is here to help
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="relative container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Email */}
          <a href="mailto:hello@roleplaystudio.com" className="block">
            <Card className="glass-card border-violet/20 hover:border-violet/40 transition-all h-full">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet to-cyan flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-white mb-1">Email Us</h3>
                <p className="text-muted-foreground text-sm mb-2">Send us an email anytime</p>
                <p className="text-cyan font-medium">hello@roleplaystudio.com</p>
              </CardContent>
            </Card>
          </a>

          {/* AI Chat */}
          <button onClick={() => setIsChatOpen(true)} className="block w-full text-left">
            <Card className="glass-card border-cyan/30 hover:border-cyan/50 transition-all h-full glow-cyan">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan to-violet flex items-center justify-center mx-auto mb-4 relative">
                  <Bot className="w-6 h-6 text-white" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-navy animate-pulse" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-white mb-1">AI Assistant</h3>
                <p className="text-muted-foreground text-sm mb-2">Chat with our AI instantly</p>
                <p className="text-cyan font-medium flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Available 24/7
                </p>
              </CardContent>
            </Card>
          </button>
        </div>
      </section>

      {/* AI Chat Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-navy-light border border-violet/30 rounded-2xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-violet/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan to-violet flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Roleplay Studio AI</h3>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Online 24/7
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Content - ElevenLabs Widget Container */}
            <div className="h-[500px] bg-navy/50">
              {/* Placeholder until ElevenLabs agent is configured */}
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan to-violet flex items-center justify-center mb-6 animate-pulse">
                  <Bot className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">AI Assistant Coming Soon!</h4>
                <p className="text-muted-foreground mb-6 max-w-sm">
                  Our 24/7 AI assistant powered by ElevenLabs Conversational AI will be available here shortly.
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  In the meantime, please email us at:
                </p>
                <a 
                  href="mailto:hello@roleplaystudio.com" 
                  className="text-cyan hover:underline font-medium"
                >
                  hello@roleplaystudio.com
                </a>
              </div>
              
              {/* 
                To enable the ElevenLabs widget, replace the placeholder above with:
                
                <elevenlabs-convai agent-id={ELEVENLABS_AGENT_ID}></elevenlabs-convai>
                
                And add this script to your layout or page:
                <Script src="https://elevenlabs.io/convai-widget/index.js" async />
              */}
            </div>
          </div>
        </div>
      )}

      {/* Contact Form & Info */}
      <section className="relative container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div>
            <Badge className="mb-4 bg-gradient-to-r from-violet to-cyan text-white border-0">Send a Message</Badge>
            <h2 className="font-heading text-3xl font-bold mb-6">
              Get in{' '}
              <span className="gradient-text">Touch</span>
            </h2>

            {isSubmitted ? (
              <Card className="glass-card border-cyan/30 glow-cyan">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-cyan/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-cyan" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thanks for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-violet/30 text-white"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="glass-card border-violet/20">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Your Name
                        </label>
                        <Input
                          placeholder="John Smith"
                          className="bg-navy/50 border-violet/20 text-white placeholder:text-muted-foreground focus:border-violet"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Work Email
                        </label>
                        <Input
                          type="email"
                          placeholder="john@company.com"
                          className="bg-navy/50 border-violet/20 text-white placeholder:text-muted-foreground focus:border-violet"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Company Name
                      </label>
                      <Input
                        placeholder="Acme Inc"
                        className="bg-navy/50 border-violet/20 text-white placeholder:text-muted-foreground focus:border-violet"
                        value={formState.company}
                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        How can we help?
                      </label>
                      <Textarea
                        placeholder="Tell us about your team and training goals..."
                        className="bg-navy/50 border-violet/20 text-white placeholder:text-muted-foreground focus:border-violet min-h-[120px]"
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        required
                      />
                    </div>

                    {submitError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                        {submitError}
                      </div>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="w-full btn-gradient text-white border-0 h-12"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Support Info */}
          <div>

            {/* Support Hours */}
            <Card className="glass-card border-cyan/20 glow-cyan">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan/20 flex items-center justify-center flex-shrink-0">
                    <Headphones className="w-6 h-6 text-cyan" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-white mb-2">
                      Enterprise Support
                    </h3>
                    <p className="text-muted-foreground">
                      Enterprise customers get priority support with dedicated success managers 
                      and faster response times.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Office Location */}
            <Card className="glass-card border-violet/20 mt-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-violet/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-violet" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-white mb-2">
                      Our Office
                    </h3>
                    <p className="text-muted-foreground">
                      100 Innovation Way<br />
                      San Francisco, CA 94107<br />
                      United States
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ 
        faqs={contactFAQs}
        subtitle="Quick answers to common questions"
      />

      {/* CTA Section */}
      <section className="relative container mx-auto px-4 py-24">
        <div className="glass-card p-12 text-center max-w-4xl mx-auto glow-violet">
          <h2 className="font-heading text-4xl font-bold mb-4">
            Ready to Transform{' '}
            <span className="gradient-text">Your Training?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your free 7-day trial today. Cancel anytime.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="btn-gradient text-lg h-14 px-8 border-0 text-white font-semibold">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
