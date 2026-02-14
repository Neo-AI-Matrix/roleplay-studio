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
  Clock,
  Headphones,
  X,
  Sparkles
} from 'lucide-react';

// ElevenLabs Conversational AI Widget Agent ID (create in ElevenLabs dashboard)
const ELEVENLABS_AGENT_ID = 'YOUR_AGENT_ID_HERE'; // TODO: Replace with actual agent ID

const faqs = [
  {
    question: 'How long is the free trial?',
    answer: '7 days with full access to all features.',
  },
  {
    question: 'Can I create custom scenarios?',
    answer: 'Yes! Professional and Enterprise plans include a custom scenario builder.',
  },
  {
    question: 'Do you offer team discounts?',
    answer: 'Yes, we offer volume discounts for teams of 10+ users. Contact sales for details.',
  },
  {
    question: 'What integrations do you support?',
    answer: 'We integrate with Salesforce, HubSpot, Slack, and most major CRM and communication tools.',
  },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet/20 via-transparent to-transparent" />

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-violet/30 text-white border-violet/50">
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
              Our team typically responds within <span className="text-cyan font-semibold">2 hours</span>
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
            <Badge className="mb-4 bg-cyan/30 text-white border-cyan/50">Send a Message</Badge>
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

                    <Button type="submit" className="w-full btn-gradient text-white border-0 h-12">
                      <Send className="mr-2 w-4 h-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* FAQ & Support Info */}
          <div>
            <Badge className="mb-4 bg-violet/30 text-white border-violet/50">FAQ</Badge>
            <h2 className="font-heading text-3xl font-bold mb-6">
              Common{' '}
              <span className="gradient-text">Questions</span>
            </h2>

            <div className="space-y-4 mb-12">
              {faqs.map((faq, i) => (
                <Card key={i} className="glass-card border-violet/20">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-white mb-2">{faq.question}</h4>
                    <p className="text-muted-foreground text-sm">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

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
                    <p className="text-muted-foreground mb-4">
                      Enterprise customers get priority support with dedicated success managers 
                      and 4-hour response time SLA.
                    </p>
                    <div className="flex items-center gap-2 text-cyan">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Average response time: 2 hours</span>
                    </div>
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
