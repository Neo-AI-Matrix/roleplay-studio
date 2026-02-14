import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Brain, 
  BarChart3, 
  Users, 
  Zap, 
  Shield, 
  MessageSquare,
  Target,
  Headphones,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Play,
  Settings,
  Award
} from 'lucide-react';
import Link from 'next/link';
import { FAQ } from '@/components/FAQ';

const productFAQs = [
  {
    question: "What AI models power Roleplay Studio?",
    answer: "We use a combination of leading AI models including GPT-4, Claude, and custom fine-tuned models optimized for realistic conversation simulation. Our voice interactions are powered by ElevenLabs' state-of-the-art voice synthesis technology for natural, expressive speech."
  },
  {
    question: "How realistic are the AI conversations?",
    answer: "Our AI personas are designed by professional trainers and sales coaches to behave like real people. They have consistent personalities, react emotionally to your responses, and will push back, ask clarifying questions, or express frustration just like real customers or colleagues would."
  },
  {
    question: "Can I practice with voice or just text?",
    answer: "Both! Every scenario supports text-based chat for quick practice sessions, and most scenarios also offer voice mode where you can have a real spoken conversation with the AI. Voice mode is especially effective for sales calls and customer support training."
  },
  {
    question: "How does the feedback and scoring work?",
    answer: "After each session, our AI analyzes your conversation across multiple dimensions: communication clarity, empathy, objection handling, questioning technique, and more. You receive a score out of 100, specific feedback on what you did well, and actionable suggestions for improvement."
  },
  {
    question: "Can I track my team's progress?",
    answer: "Yes! Business and Enterprise plans include team dashboards showing individual and aggregate performance metrics, skill progression over time, leaderboards, and completion tracking. Managers can identify skill gaps and assign specific scenarios for improvement."
  },
  {
    question: "Is my conversation data private and secure?",
    answer: "Absolutely. All conversations are encrypted in transit and at rest. We do not use your conversation data to train our AI models. Enterprise customers can request data residency in specific regions and additional security controls including SSO and audit logs."
  }
];

// Legacy scenarios for other sections
const scenarioTypes = [
  {
    icon: Target,
    title: 'Sales Objection Handling',
    description: 'Practice responding to common objections like price concerns, competitor comparisons, and timing issues.',
    personas: ['Skeptical CFO', 'Busy Decision Maker', 'Price Shopper'],
  },
  {
    icon: Headphones,
    title: 'Customer Support Escalations',
    description: 'Handle frustrated customers, billing disputes, and complex technical issues with confidence.',
    personas: ['Angry Customer', 'Confused User', 'Demanding Client'],
  },
  {
    icon: MessageSquare,
    title: 'Discovery Calls',
    description: 'Master the art of asking the right questions to uncover customer needs and pain points.',
    personas: ['Cautious Prospect', 'Chatty Executive', 'Technical Buyer'],
  },
  {
    icon: TrendingUp,
    title: 'Upsell & Cross-sell',
    description: 'Learn to identify opportunities and present additional value to existing customers.',
    personas: ['Happy Customer', 'Budget Conscious', 'Growth-Focused'],
  },
];

// 5 Training Categories
import { Briefcase, Crown } from 'lucide-react';

const trainingCategories = [
  {
    id: 'sales',
    icon: Briefcase,
    title: 'Sales',
    description: 'Master discovery calls, objection handling, and closing techniques with AI prospects.',
    color: 'from-violet to-purple-600',
    bgColor: 'bg-violet/20',
    borderColor: 'border-violet/50',
    scenarios: ['Discovery Calls', 'Objection Handling', 'Closing Deals', 'Upselling'],
  },
  {
    id: 'support',
    icon: Headphones,
    title: 'Support',
    description: 'Practice de-escalation, troubleshooting, and customer empathy with realistic scenarios.',
    color: 'from-cyan to-blue-500',
    bgColor: 'bg-cyan/20',
    borderColor: 'border-cyan/50',
    scenarios: ['Angry Customers', 'Billing Disputes', 'Technical Issues', 'Confused Users'],
  },
  {
    id: 'hr',
    icon: Users,
    title: 'HR',
    description: 'Navigate difficult conversations, interviews, and performance reviews with confidence.',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/20',
    borderColor: 'border-amber-500/50',
    scenarios: ['Performance Reviews', 'Salary Negotiations', 'Conflict Resolution', 'Terminations'],
  },
  {
    id: 'communication',
    icon: MessageSquare,
    title: 'Communication',
    description: 'Present ideas clearly to peers, stakeholders, and large audiences.',
    color: 'from-emerald-500 to-green-500',
    bgColor: 'bg-emerald-500/20',
    borderColor: 'border-emerald-500/50',
    scenarios: ['Pitch Presentations', 'Team Updates', 'Stakeholder Alignment', 'Public Speaking'],
  },
  {
    id: 'leadership',
    icon: Crown,
    title: 'Leadership',
    description: 'Develop executive presence, coaching skills, and strategic influence.',
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-500/20',
    borderColor: 'border-rose-500/50',
    scenarios: ['Giving Feedback', 'Coaching Sessions', 'Executive Presence', 'Board Presentations'],
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Choose Your Scenario',
    description: 'Select from our library of pre-built scenarios or create custom ones based on your real customer interactions.',
  },
  {
    step: '02',
    title: 'Practice with AI',
    description: 'Engage in realistic conversations with AI personas that adapt to your responses and challenge your skills.',
  },
  {
    step: '03',
    title: 'Get Instant Feedback',
    description: 'Receive detailed analysis of your performance including tone, timing, technique, and areas for improvement.',
  },
  {
    step: '04',
    title: 'Track Progress',
    description: 'Monitor your skill development over time with comprehensive analytics and certification milestones.',
  },
];

const pricingPlans = [
  {
    name: 'Individual',
    price: '$29',
    period: 'per month',
    description: 'Perfect for individual contributors looking to level up.',
    features: [
      '1 user',
      'All pre-built scenarios',
      'Basic analytics',
      'Email support',
      'Unlimited practice sessions',
    ],
    cta: 'Start 7-Day Free Trial',
    popular: false,
  },
  {
    name: 'Business',
    price: '$99',
    period: 'per month',
    description: 'For teams that need collaboration and advanced features.',
    features: [
      'Up to 10 users',
      'Unlimited scenarios',
      'Advanced analytics & reporting',
      'Custom persona builder',
      'Priority support',
      'Unlimited practice sessions',
      'Team leaderboards',
    ],
    cta: 'Start 7-Day Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'tailored to your needs',
    description: 'For organizations that need fully custom AI training solutions.',
    features: [
      'Unlimited team members',
      'Custom AI agents for your business',
      'Your products, customers & scenarios',
      'Dedicated success manager',
      'SSO, SCIM & enterprise security',
      'API access & LMS integrations',
      'On-premise deployment option',
    ],
    cta: 'Learn More',
    ctaLink: '/enterprise',
    popular: false,
  },
];

export default function ProductPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet/20 via-transparent to-transparent" />

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-violet/30 text-white border-violet/50">
            Product
          </Badge>
          
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 leading-tight">
            The Complete{' '}
            <span className="gradient-text">AI Training Platform</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Everything your team needs to practice, improve, and excel at customer-facing conversations.
          </p>

          {/* Hero Image */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="glass-card p-2 overflow-hidden glow-violet">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=500&fit=crop" 
                alt="Professional team training session"
                className="w-full h-64 md:h-80 object-cover object-center rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-cyan/30 text-white border-cyan/50">How It Works</Badge>
          <h2 className="font-heading text-4xl font-bold">
            Four Steps to{' '}
            <span className="gradient-text">Better Performance</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((item, i) => (
            <div key={i} className="relative">
              <div className="glass-card p-6 h-full">
                <div className="text-5xl font-heading font-bold gradient-text mb-4">{item.step}</div>
                <h3 className="font-heading text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
              {i < howItWorks.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <ArrowRight className="w-6 h-6 text-violet/50" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section - Moved Up for Better Conversion */}
      <section id="pricing" className="relative bg-navy-light/50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-cyan/30 text-white border-cyan/50">Pricing</Badge>
            <h2 className="font-heading text-4xl font-bold mb-4">
              Simple, Transparent{' '}
              <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Start free, upgrade when you're ready. No hidden fees.
            </p>
          </div>

          {/* ROI Context */}
          <div className="glass-card p-6 max-w-3xl mx-auto mb-12 border-cyan/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-muted-foreground text-sm mb-1">Average cost to replace one sales rep</p>
                <p className="text-2xl font-heading font-bold text-red-400">$114,957</p>
              </div>
              <div className="hidden md:block w-px h-12 bg-violet/30" />
              <div className="text-center md:text-left">
                <p className="text-muted-foreground text-sm mb-1">Business plan yearly (10 users)</p>
                <p className="text-2xl font-heading font-bold text-cyan">$1,188</p>
              </div>
              <div className="hidden md:block w-px h-12 bg-violet/30" />
              <div className="text-center md:text-left">
                <p className="text-muted-foreground text-sm mb-1">ROI if you retain just 1 rep</p>
                <p className="text-2xl font-heading font-bold text-green-400">9,578%</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <Card 
                key={i} 
                className={`glass-card border-violet/20 relative ${plan.popular ? 'border-cyan/50 glow-cyan' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-cyan text-white border-0">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="font-heading text-2xl text-white">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-heading font-bold gradient-text">{plan.price}</span>
                    <span className="text-muted-foreground text-sm ml-2">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-cyan flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.name === 'Enterprise' ? (
                    <Link href="/enterprise">
                      <Button 
                        className="w-full border-violet/30 hover:bg-violet/20"
                        variant="outline"
                      >
                        {plan.cta}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/sign-up">
                      <Button 
                        className={`w-full ${plan.popular ? 'btn-gradient text-white border-0' : 'border-violet/30'}`}
                        variant={plan.popular ? 'default' : 'outline'}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training Categories Section */}
      <section id="categories" className="relative bg-navy-light/50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-violet/30 text-white border-violet/50">Training Categories</Badge>
            <h2 className="font-heading text-4xl font-bold mb-4">
              Five Pillars of{' '}
              <span className="gradient-text">Professional Excellence</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive training across sales, support, HR, communication, and leadership.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {trainingCategories.slice(0, 3).map((category, i) => (
              <Card key={i} className={`glass-card ${category.borderColor} hover:border-opacity-80 transition-all group`}>
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl ${category.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <category.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-heading text-2xl font-semibold text-white mb-2">{category.title}</h3>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {category.scenarios.map((scenario, j) => (
                      <Badge key={j} variant="outline" className={`${category.borderColor} text-white/80`}>
                        {scenario}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {trainingCategories.slice(3).map((category, i) => (
              <Card key={i} className={`glass-card ${category.borderColor} hover:border-opacity-80 transition-all group`}>
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl ${category.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <category.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-heading text-2xl font-semibold text-white mb-2">{category.title}</h3>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {category.scenarios.map((scenario, j) => (
                      <Badge key={j} variant="outline" className={`${category.borderColor} text-white/80`}>
                        {scenario}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/sign-up">
              <Button size="lg" className="btn-gradient text-white border-0 font-semibold">
                Explore All Scenarios
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* The Studio Section */}
      <section className="relative container mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-violet to-cyan text-white border-0">✨ The Studio</Badge>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Build Your Own{' '}
            <span className="gradient-text">AI Training Agents</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The "Studio" in Roleplay Studio. Create custom AI personas from scratch or customize our battle-tested templates.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Start from Template */}
          <Card className="glass-card border-violet/20 hover:border-cyan/40 transition-all group overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6 pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan/20 flex items-center justify-center">
                    <Settings className="w-6 h-6 text-cyan" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-white">Start from Template</h3>
                    <p className="text-muted-foreground text-sm">Customize pre-built personas</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Choose from 50+ battle-tested AI personas and customize them to match your industry, 
                  products, and common customer scenarios.
                </p>
              </div>
              
              {/* Template Preview */}
              <div className="bg-navy/50 p-4 border-t border-violet/20">
                <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">Popular Templates</p>
                <div className="space-y-2">
                  {[
                    { name: 'Skeptical Enterprise Buyer', difficulty: 'Hard', uses: '2.4k' },
                    { name: 'Price-Focused Negotiator', difficulty: 'Medium', uses: '1.8k' },
                    { name: 'Frustrated Support Caller', difficulty: 'Hard', uses: '3.1k' },
                    { name: 'Curious First-Time Buyer', difficulty: 'Easy', uses: '1.2k' },
                  ].map((template, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-navy-light/50 hover:bg-violet/10 transition-colors cursor-pointer group/item">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet to-cyan flex items-center justify-center text-xs font-bold text-white">
                          AI
                        </div>
                        <span className="text-white text-sm">{template.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`text-xs ${template.difficulty === 'Hard' ? 'border-red-500/50 text-red-400' : template.difficulty === 'Medium' ? 'border-yellow-500/50 text-yellow-400' : 'border-green-500/50 text-green-400'}`}>
                          {template.difficulty}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{template.uses} uses</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-cyan/20 text-cyan hover:bg-cyan/30 border-0">
                  Browse All Templates →
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Build from Scratch */}
          <Card className="glass-card border-violet/20 hover:border-violet/40 transition-all group overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6 pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-violet/20 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-violet" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-white">Build from Scratch</h3>
                    <p className="text-muted-foreground text-sm">Create your own AI agent</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Design custom AI personas with specific personalities, objections, and behaviors 
                  that match your real customers exactly.
                </p>
              </div>

              {/* Builder Preview */}
              <div className="bg-navy/50 p-4 border-t border-violet/20">
                <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">Agent Builder</p>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Persona Name</label>
                    <div className="mt-1 p-2 rounded bg-navy-light border border-violet/20 text-white text-sm">
                      Enterprise IT Director
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Personality Traits</label>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {['Analytical', 'Risk-Averse', 'Budget-Conscious', 'Technical'].map((trait, i) => (
                        <Badge key={i} className="bg-violet/20 text-violet border-0 text-xs">{trait}</Badge>
                      ))}
                      <Badge className="bg-navy-light text-muted-foreground border border-dashed border-violet/30 text-xs cursor-pointer hover:border-violet">+ Add</Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Common Objections</label>
                    <div className="mt-1 p-2 rounded bg-navy-light border border-violet/20 text-muted-foreground text-sm">
                      "We already have a solution in place..."
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Difficulty Level</label>
                    <div className="mt-1 flex gap-2">
                      {['Easy', 'Medium', 'Hard', 'Expert'].map((level, i) => (
                        <button 
                          key={i} 
                          className={`px-3 py-1 rounded text-xs transition-all ${i === 2 ? 'bg-violet text-white' : 'bg-navy-light text-muted-foreground hover:bg-violet/20'}`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4 btn-gradient text-white border-0">
                  Create AI Agent →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Studio Features */}
        <div className="grid md:grid-cols-4 gap-4 mt-12 max-w-5xl mx-auto">
          {[
            { icon: MessageSquare, title: 'Custom Dialogues', desc: 'Script specific conversation paths' },
            { icon: Target, title: 'Goal Setting', desc: 'Define success criteria for each scenario' },
            { icon: BarChart3, title: 'Scoring Rubrics', desc: 'Create custom evaluation metrics' },
            { icon: Users, title: 'Team Sharing', desc: 'Share agents across your organization' },
          ].map((feature, i) => (
            <div key={i} className="text-center p-4">
              <div className="w-10 h-10 rounded-lg bg-violet/20 flex items-center justify-center mx-auto mb-3">
                <feature.icon className="w-5 h-5 text-violet" />
              </div>
              <h4 className="font-semibold text-white text-sm mb-1">{feature.title}</h4>
              <p className="text-muted-foreground text-xs">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Deep Dive */}
      <section className="relative container mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge className="mb-4 bg-violet/30 text-white border-violet/50">AI Coaching</Badge>
            <h2 className="font-heading text-4xl font-bold mb-6">
              Instant Feedback That{' '}
              <span className="gradient-text">Actually Helps</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our AI analyzes every aspect of your conversation and provides actionable feedback to help you improve.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: MessageSquare,
                  title: 'Communication Analysis',
                  description: 'Tone, clarity, and persuasiveness scoring with specific suggestions.',
                },
                {
                  icon: Brain,
                  title: 'Emotional Intelligence',
                  description: 'How well you recognized and responded to customer emotions.',
                },
                {
                  icon: Zap,
                  title: 'Technique Breakdown',
                  description: 'Did you ask open-ended questions? Handle objections effectively?',
                },
                {
                  icon: Award,
                  title: 'Best Practice Comparison',
                  description: 'See how top performers handle similar situations.',
                },
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-violet/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-violet" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 glow-violet">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-lg font-semibold text-white">Session Feedback</h3>
              <Badge className="bg-cyan/30 text-white border-cyan/50">Score: 87/100</Badge>
            </div>

            <div className="space-y-4 mb-6">
              {[
                { label: 'Objection Handling', score: 92, color: 'from-green-500 to-emerald-500' },
                { label: 'Active Listening', score: 85, color: 'from-violet to-cyan' },
                { label: 'Solution Presentation', score: 78, color: 'from-yellow-500 to-orange-500' },
                { label: 'Closing Technique', score: 88, color: 'from-violet to-cyan' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">{item.label}</span>
                    <span className="text-cyan">{item.score}%</span>
                  </div>
                  <div className="h-2 bg-navy rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-navy/50 rounded-lg p-4 border border-violet/20">
              <h4 className="font-semibold text-white mb-2">💡 Key Improvement</h4>
              <p className="text-muted-foreground text-sm">
                Try acknowledging the customer's concern before presenting your solution. 
                This builds rapport and shows you're listening.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ 
        faqs={productFAQs}
        subtitle="Learn more about how our AI training platform works"
      />

      {/* CTA Section */}
      <section className="relative container mx-auto px-4 py-24">
        <div className="glass-card p-12 text-center max-w-4xl mx-auto glow-violet">
          <h2 className="font-heading text-4xl font-bold mb-4">
            Ready to See It in{' '}
            <span className="gradient-text">Action?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your free 7-day trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="btn-gradient text-lg h-14 px-8 border-0 text-white font-semibold">
                Start 7-Day Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg h-14 px-8 border-violet/30 text-white hover:bg-violet/10">
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
