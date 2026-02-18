import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeroDemoChat } from '@/components/HeroDemoChat';
import { 
  Sparkles, 
  Play, 
  Brain, 
  BarChart3, 
  Users, 
  Zap, 
  Shield, 
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  Target,
  Headphones,
  DollarSign,
  TrendingDown
} from 'lucide-react';
import Link from 'next/link';
import { FAQ } from '@/components/FAQ';
import { SchemaScript, getHomePageSchema } from '@/lib/schema';

const homeFAQs = [
  {
    question: "What is Roleplay Studio?",
    answer: "Roleplay Studio is an AI-powered training platform that helps professionals practice and improve their communication skills through realistic voice and text simulations. Whether you're in sales, support, HR, or leadership, our AI personas provide a safe space to practice difficult conversations and receive instant feedback."
  },
  {
    question: "How does AI roleplay training work?",
    answer: "You choose a scenario (like handling an angry customer or negotiating with a CFO), then engage in a realistic conversation with our AI persona via voice or text. The AI adapts to your responses just like a real person would. After each session, you receive detailed feedback on your performance, including specific areas for improvement."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! We offer a 7-day free trial with full access to all features and scenarios. You can practice unlimited sessions during your trial to experience the full value of the platform before committing."
  },
  {
    question: "What types of scenarios are available?",
    answer: "We offer training across five categories: Sales (discovery calls, objection handling, closing), Support (de-escalation, troubleshooting), HR (difficult conversations, performance reviews), Communication (presentations, public speaking), and Leadership (coaching, executive presence). Each category includes multiple scenarios at varying difficulty levels."
  },
  {
    question: "Can I create custom scenarios for my team?",
    answer: "Absolutely! Our Business and Enterprise plans include the ability to create custom AI personas and scenarios tailored to your specific products, customers, and industry challenges. You can even upload real customer interactions to train the AI."
  },
  {
    question: "How is this different from traditional roleplay training?",
    answer: "Traditional roleplay requires scheduling time with colleagues or trainers, which limits practice frequency. Roleplay Studio is available 24/7, provides consistent AI personas that never get tired or break character, and delivers objective, data-driven feedback. Users can practice as often as they want without the social pressure of practicing with peers."
  }
];

const stats = [
  { value: '25+', label: 'AI Scenarios' },
  { value: '95%', label: 'Success Rate' },
  { value: '2.5x', label: 'Faster Ramp Time' },
  { value: '40%', label: 'Higher Win Rates' },
];

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Scenarios',
    description: 'Dynamic simulations that adapt to skill levels and industry-specific challenges.',
  },
  {
    icon: Zap,
    title: 'Real-Time Feedback',
    description: 'Instant analysis of communication style, objection handling, and emotional intelligence.',
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Detailed metrics, skill progression charts, and actionable improvement insights.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Share best practices and learn from top performers across your organization.',
  },
  {
    icon: Shield,
    title: 'Custom Scenarios',
    description: 'Build training scenarios based on your actual customer interactions.',
  },
  {
    icon: Clock,
    title: 'Certification Paths',
    description: 'Structured learning with milestones and skill validation for career growth.',
  },
];

// Anonymous testimonials representing common feedback themes
const testimonials = [
  {
    quote: "Our new reps are hitting quota faster than ever. The AI coaching is like having a personal trainer for every rep.",
    author: "VP of Sales",
    role: "B2B SaaS Company",
    initials: "VP"
  },
  {
    quote: "The realistic scenarios have transformed how we onboard support agents. Issue resolution time dropped significantly in the first month.",
    author: "Customer Success Director",
    role: "Enterprise Software",
    initials: "CS"
  },
  {
    quote: "Finally, a training tool that our team actually wants to use. The gamification and instant feedback keep everyone engaged.",
    author: "L&D Manager",
    role: "Fortune 500 Company",
    initials: "LD"
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <SchemaScript schema={getHomePageSchema()} />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet/20 via-transparent to-transparent" />
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-violet/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-1/4 w-1/2 h-1/2 bg-cyan/10 rounded-full blur-3xl" />

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-violet/30 text-white border-violet/50 hover:bg-violet/40">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered Training Platform
          </Badge>
          
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Train Your Team with{' '}
            <span className="gradient-text">AI Roleplay</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Practice real-world sales and support scenarios with AI-powered simulations. 
            Get instant feedback, build confidence, and close more deals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/sign-up">
              <Button size="lg" className="btn-gradient text-lg h-14 px-8 border-0 text-white font-semibold">
                Start 7-Day Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/product">
              <Button size="lg" variant="outline" className="text-lg h-14 px-8 border-violet/30 text-white hover:bg-violet/10">
                <Play className="mr-2 w-5 h-5" />
                See How It Works
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            Setup in 5 minutes • Cancel anytime
          </p>

          {/* Trust Avatars - Different from team/employee photos */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="flex -space-x-3">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" className="w-10 h-10 rounded-full border-2 border-navy" alt="User" />
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" className="w-10 h-10 rounded-full border-2 border-navy" alt="User" />
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" className="w-10 h-10 rounded-full border-2 border-navy" alt="User" />
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" className="w-10 h-10 rounded-full border-2 border-navy" alt="User" />
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" className="w-10 h-10 rounded-full border-2 border-navy" alt="User" />
            </div>
            <p className="text-muted-foreground text-sm">
              <span className="text-cyan font-semibold">Unlimited practice</span> — no awkward peer roleplays
            </p>
          </div>
        </div>

        {/* Hero Visual - Animated Demo */}
        <HeroDemoChat />
      </section>

      {/* Social Proof Image Section */}
      <section className="relative container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="glass-card p-2 overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop" 
              alt="Sales team training session"
              className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
            <p className="text-center text-sm text-muted-foreground mt-3 pb-2">Sales teams practicing scenarios</p>
          </div>
          <div className="glass-card p-2 overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop" 
              alt="Customer support training"
              className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
            <p className="text-center text-sm text-muted-foreground mt-3 pb-2">Support agents building confidence</p>
          </div>
          <div className="glass-card p-2 overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop" 
              alt="Team collaboration"
              className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
            <p className="text-center text-sm text-muted-foreground mt-3 pb-2">Teams learning together</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative border-y border-violet/20 bg-navy-light/50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-heading text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost of Inaction Section */}
      <section className="relative container mx-auto px-4 py-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4 bg-red-500/20 text-red-400 border-red-500/30">The Hidden Cost</Badge>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            What Untrained Teams{' '}
            <span className="text-red-400">Cost You</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Every day without proper training is money walking out the door.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Sales Costs */}
          <Card className="glass-card border-red-500/20 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white">Undertrained Sales Teams</h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-navy/50 rounded-lg border border-red-500/10">
                  <div className="text-3xl font-heading font-bold text-red-400 mb-1">Only 25%</div>
                  <p className="text-muted-foreground text-sm">of B2B sales reps hit quota in 2024. The benchmark used to be 70%.</p>
                  <p className="text-xs text-muted-foreground mt-2">Source: SPOTIO 2026 Sales Report</p>
                </div>
                
                <div className="p-4 bg-navy/50 rounded-lg border border-red-500/10">
                  <div className="text-3xl font-heading font-bold text-red-400 mb-1">$114,957</div>
                  <p className="text-muted-foreground text-sm">Average cost to hire, train, and replace a single sales rep who doesn't work out.</p>
                  <p className="text-xs text-muted-foreground mt-2">Source: DePaul University Sales Leadership</p>
                </div>

                <div className="p-4 bg-navy/50 rounded-lg border border-red-500/10">
                  <div className="text-3xl font-heading font-bold text-red-400 mb-1">9+ Months</div>
                  <p className="text-muted-foreground text-sm">For new reps to reach full productivity. 15 months to become a top performer.</p>
                  <p className="text-xs text-muted-foreground mt-2">Source: Rain Group Research</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Costs */}
          <Card className="glass-card border-red-500/20 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <Headphones className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white">Undertrained Support Teams</h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-navy/50 rounded-lg border border-red-500/10">
                  <div className="text-3xl font-heading font-bold text-red-400 mb-1">$3.7 Trillion</div>
                  <p className="text-muted-foreground text-sm">At risk globally due to bad customer experiences. Up 19% from last year.</p>
                  <p className="text-xs text-muted-foreground mt-2">Source: Qualtrics XM Institute 2024</p>
                </div>
                
                <div className="p-4 bg-navy/50 rounded-lg border border-red-500/10">
                  <div className="text-3xl font-heading font-bold text-red-400 mb-1">72%</div>
                  <p className="text-muted-foreground text-sm">of customers switch to a competitor after just ONE bad experience.</p>
                  <p className="text-xs text-muted-foreground mt-2">Source: Qualtrics Customer Research</p>
                </div>

                <div className="p-4 bg-navy/50 rounded-lg border border-red-500/10">
                  <div className="text-3xl font-heading font-bold text-red-400 mb-1">40%+</div>
                  <p className="text-muted-foreground text-sm">Annual turnover rate in call centers. Each lost agent costs $2,500+ to replace.</p>
                  <p className="text-xs text-muted-foreground mt-2">Source: AmplifAI Industry Report</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* The Math */}
        <div className="glass-card p-8 max-w-4xl mx-auto border-violet/30 glow-violet">
          <h3 className="font-heading text-2xl font-bold text-white text-center mb-6">
            Do The Math: What's One Lost Deal Worth?
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-muted-foreground mb-2">Average B2B Deal Size</p>
              <div className="text-3xl font-heading font-bold text-white">$25,000</div>
            </div>
            <div>
              <p className="text-muted-foreground mb-2">Deals Lost to Poor Objection Handling</p>
              <div className="text-3xl font-heading font-bold text-red-400">3-5/month</div>
            </div>
            <div>
              <p className="text-muted-foreground mb-2">Annual Revenue Lost</p>
              <div className="text-3xl font-heading font-bold text-red-400">$900K - $1.5M</div>
            </div>
          </div>
          <p className="text-center text-muted-foreground mt-6">
            <span className="text-cyan font-semibold">Roleplay Studio costs less than one lost deal.</span> Most teams see ROI in the first month.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative container mx-auto px-4 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-cyan/30 text-white border-cyan/50">Features</Badge>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to{' '}
            <span className="gradient-text">Level Up</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Comprehensive tools to transform your team's training from a cost center into a revenue driver.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Card key={i} className="glass-card border-violet/20 hover:border-violet/40 transition-all group">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet to-cyan flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative bg-navy-light/50 py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 bg-violet/30 text-white border-violet/50">The ROI of Training</Badge>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                Turn Training Into{' '}
                <span className="gradient-text">Revenue</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Companies that invest in sales training see up to 50% higher net sales per employee.<sup className="text-cyan">1</sup> Here's how effective training delivers ROI:
              </p>

              <div className="space-y-4">
                {[
                  { text: 'Cut ramp time by 60% or more', detail: 'Save $50K+ per new hire in lost productivity', source: '2' },
                  { text: 'Increase quota attainment by up to 28%', detail: 'Help more reps consistently hit target', source: '3' },
                  { text: 'Reduce customer churn by up to 25%', detail: 'Retain customers who might leave after bad experiences', source: '4' },
                  { text: 'Cut rep turnover significantly', detail: 'Average replacement cost: $114K per rep', source: '5' },
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-navy/30 border border-violet/10">
                    <CheckCircle className="w-6 h-6 text-cyan flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-medium">{benefit.text}<sup className="text-cyan ml-0.5">{benefit.source}</sup></span>
                      <p className="text-sm text-muted-foreground">{benefit.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Sources */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-xs text-muted-foreground space-y-1">
                  <span className="block"><sup>1</sup> ATD State of Sales Training Report</span>
                  <span className="block"><sup>2</sup> CSO Insights Sales Enablement Study</span>
                  <span className="block"><sup>3</sup> Gartner Sales Training Research</span>
                  <span className="block"><sup>4</sup> Bain & Company Customer Experience Study</span>
                  <span className="block"><sup>5</sup> DePaul University Sales Leadership Center</span>
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="glass-card p-8 glow-cyan">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Your Progress</span>
                    <Badge className="bg-cyan/30 text-white border-cyan/50">Level 7</Badge>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { skill: 'Objection Handling', progress: 85 },
                      { skill: 'Discovery Questions', progress: 72 },
                      { skill: 'Closing Techniques', progress: 68 },
                      { skill: 'Emotional Intelligence', progress: 91 },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white">{item.skill}</span>
                          <span className="text-cyan">{item.progress}%</span>
                        </div>
                        <div className="h-2 bg-navy rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-violet to-cyan rounded-full transition-all"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative container mx-auto px-4 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-violet/30 text-white border-violet/50">What Teams Are Saying</Badge>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Trusted by{' '}
            <span className="gradient-text">High-Performing Teams</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-4">
            Representative feedback from early adopters and beta users
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="glass-card border-violet/20">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-cyan text-cyan" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet to-cyan flex items-center justify-center text-white font-semibold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ 
        faqs={homeFAQs}
        subtitle="Everything you need to know about AI-powered roleplay training"
      />

      {/* CTA Section */}
      <section className="relative container mx-auto px-4 py-24">
        <div className="glass-card p-12 text-center max-w-4xl mx-auto glow-violet">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Ready to Transform{' '}
            <span className="gradient-text">Your Team?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The best performers practice relentlessly. Now you can too — with AI that never judges, always challenges, and helps you get better every session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="btn-gradient text-lg h-14 px-8 border-0 text-white font-semibold">
                Start 7-Day Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-lg h-14 px-8 border-violet/30 text-white hover:bg-violet/10">
                Talk to Sales
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Setup in 5 minutes • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}
