import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Building2,
  Brain,
  Users,
  Shield,
  BarChart3,
  Headphones,
  Target,
  Zap,
  CheckCircle,
  ArrowRight,
  Lock,
  Settings,
  Globe,
  FileText,
  Briefcase,
  TrendingUp,
  Award,
  Clock,
  MessageSquare,
  Layers,
  Database,
  UserCheck,
  Phone
} from 'lucide-react';
import Link from 'next/link';

const enterpriseFeatures = [
  {
    icon: Brain,
    title: 'Custom AI Agents',
    description: 'AI personas built specifically for your products, services, and customer personas. Not generic templates — agents that know your business inside and out.',
  },
  {
    icon: Target,
    title: 'Your Scenarios, Your Way',
    description: 'Training scenarios based on your actual sales calls, support tickets, and customer interactions. We analyze your best performers and encode their techniques.',
  },
  {
    icon: Users,
    title: 'Unlimited Scale',
    description: 'Train 50 people or 50,000. Our infrastructure scales with you, with dedicated resources ensuring consistent performance across your entire organization.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 Type II certified. SSO/SAML, SCIM provisioning, role-based access control, audit logs, and data residency options to meet your compliance requirements.',
  },
  {
    icon: Database,
    title: 'Seamless Integrations',
    description: 'Connect with Salesforce, HubSpot, your LMS, HRIS, and communication tools. Automatic user provisioning and training assignment workflows.',
  },
  {
    icon: UserCheck,
    title: 'Dedicated Success Team',
    description: 'A named Customer Success Manager, Implementation Specialist, and Technical Account Manager focused solely on your organization\'s success.',
  },
];

const customizationOptions = [
  {
    title: 'Industry-Specific Agents',
    description: 'AI personas that understand the nuances of your industry — healthcare compliance, financial regulations, technical specifications, or retail dynamics.',
    examples: ['Healthcare patient objections', 'Financial services compliance', 'SaaS technical buyers', 'Retail seasonal campaigns'],
  },
  {
    title: 'Product Knowledge Integration',
    description: 'Upload your product documentation, pricing sheets, and competitive intel. Your AI agents will know your offerings better than your competitors know theirs.',
    examples: ['Product feature deep-dives', 'Competitive differentiation', 'Pricing negotiation', 'Technical specifications'],
  },
  {
    title: 'Real Call Analysis',
    description: 'We analyze recordings of your top performers to understand what makes them successful, then encode those patterns into your custom AI agents.',
    examples: ['Discovery question sequences', 'Objection handling patterns', 'Closing techniques', 'De-escalation approaches'],
  },
  {
    title: 'Regional & Role Variations',
    description: 'Different markets have different needs. Create agent variations by region, product line, customer segment, or team function.',
    examples: ['APAC vs EMEA buyers', 'SMB vs Enterprise', 'New vs Renewal', 'Inside vs Field sales'],
  },
];

const securityFeatures = [
  { icon: Lock, title: 'SSO/SAML', description: 'Single sign-on with your identity provider' },
  { icon: Users, title: 'SCIM Provisioning', description: 'Automatic user lifecycle management' },
  { icon: Shield, title: 'SOC 2 Type II', description: 'Audited security controls and processes' },
  { icon: Globe, title: 'Data Residency', description: 'Choose where your data is stored' },
  { icon: FileText, title: 'Audit Logs', description: 'Complete activity tracking and exports' },
  { icon: Settings, title: 'RBAC', description: 'Granular role-based access control' },
];

const implementationPhases = [
  {
    phase: '01',
    title: 'Discovery & Design',
    duration: '2-3 weeks',
    description: 'We audit your current training, analyze top performer calls, and design your custom AI agent strategy.',
    deliverables: ['Training needs assessment', 'Scenario roadmap', 'Success metrics definition'],
  },
  {
    phase: '02',
    title: 'Agent Development',
    duration: '3-4 weeks',
    description: 'Our team builds your custom AI agents, incorporating your products, objections, and winning techniques.',
    deliverables: ['Custom AI personas', 'Scenario library', 'Scoring rubrics'],
  },
  {
    phase: '03',
    title: 'Pilot & Refinement',
    duration: '2-3 weeks',
    description: 'Launch with a pilot group, gather feedback, and refine agents based on real user interactions.',
    deliverables: ['Pilot program', 'Feedback integration', 'Agent optimization'],
  },
  {
    phase: '04',
    title: 'Full Deployment',
    duration: 'Ongoing',
    description: 'Roll out to your entire organization with training, change management support, and continuous optimization.',
    deliverables: ['Organization-wide launch', 'Admin training', 'Quarterly business reviews'],
  },
];

const stats = [
  { value: '47%', label: 'Faster ramp time', subtext: 'for new hires' },
  { value: '31%', label: 'Increase in deal size', subtext: 'average improvement' },
  { value: '2.5x', label: 'More practice', subtext: 'vs. traditional roleplay' },
  { value: '89%', label: 'User satisfaction', subtext: 'NPS score' },
];

const useCases = [
  {
    icon: Briefcase,
    title: 'Sales Enablement',
    scenarios: ['New product launches', 'Competitive positioning', 'Price negotiation', 'Executive conversations'],
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    scenarios: ['Escalation handling', 'Technical troubleshooting', 'Billing disputes', 'Retention conversations'],
  },
  {
    icon: TrendingUp,
    title: 'Customer Success',
    scenarios: ['QBR preparation', 'Expansion conversations', 'Churn prevention', 'Executive alignment'],
  },
  {
    icon: Award,
    title: 'Leadership Development',
    scenarios: ['Difficult conversations', 'Performance feedback', 'Coaching skills', 'Change management'],
  },
];

export default function EnterprisePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet/20 via-transparent to-transparent" />
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-violet/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-1/4 w-1/2 h-1/2 bg-cyan/10 rounded-full blur-3xl" />

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-gradient-to-r from-violet to-cyan text-white border-0">
            <Building2 className="w-3 h-3 mr-1" />
            Enterprise Solutions
          </Badge>
          
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 leading-tight">
            AI Training Built for{' '}
            <span className="gradient-text">Your Business</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Generic training doesn't work. Your customers are unique. Your products are unique. 
            Your winning formula is unique. We build AI agents that know your business as well as your best performers do.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/contact">
              <Button size="lg" className="btn-gradient text-lg h-14 px-8 border-0 text-white font-semibold">
                Schedule a Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg h-14 px-8 border-violet/30 text-white hover:bg-violet/10">
              <Phone className="mr-2 w-5 h-5" />
              Talk to Sales
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Trusted by Fortune 500 companies • SOC 2 Type II Certified • 99.9% Uptime SLA
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative border-y border-violet/20 bg-navy-light/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-heading text-4xl md:text-5xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-white font-medium">{stat.label}</div>
                <div className="text-muted-foreground text-sm">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="relative container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-red-500/20 text-red-400 border-red-500/30">The Problem</Badge>
          <h2 className="font-heading text-4xl font-bold mb-6">
            Generic Training{' '}
            <span className="text-red-400">Doesn't Scale</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="glass-card border-red-500/20">
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-semibold text-white mb-4">Traditional Roleplay Problems</h3>
                <ul className="space-y-3">
                  {[
                    'Relies on manager availability and consistency',
                    'Feedback varies wildly between coaches',
                    'Can\'t practice at scale — bottlenecked by people',
                    'No way to ensure everyone gets equal practice time',
                    'Difficult to measure improvement objectively',
                  ].map((problem, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-red-400 mt-1">✗</span>
                      {problem}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card border-red-500/20">
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-semibold text-white mb-4">Off-the-Shelf AI Problems</h3>
                <ul className="space-y-3">
                  {[
                    'Generic personas that don\'t match your buyers',
                    'Doesn\'t know your products or pricing',
                    'Can\'t handle industry-specific objections',
                    'One-size-fits-all scenarios miss the mark',
                    'No alignment with your sales methodology',
                  ].map((problem, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-red-400 mt-1">✗</span>
                      {problem}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="glass-card p-8 border-cyan/30 glow-cyan text-center">
            <h3 className="font-heading text-2xl font-bold text-white mb-4">
              The Roleplay Studio Enterprise Difference
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We don't give you generic AI. We build <span className="text-cyan font-semibold">custom AI agents</span> that 
              understand your products, your customers, your objections, and your winning playbook — 
              then let your entire team practice against them, anytime, at scale.
            </p>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="relative bg-navy-light/50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-violet/20 text-violet border-violet/30">Enterprise Features</Badge>
            <h2 className="font-heading text-4xl font-bold mb-4">
              Everything You Need to{' '}
              <span className="gradient-text">Transform Training</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Purpose-built for organizations that demand more than off-the-shelf solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {enterpriseFeatures.map((feature, i) => (
              <Card key={i} className="glass-card border-violet/20 hover:border-violet/40 transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet to-cyan flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Custom AI Agents Deep Dive */}
      <section className="relative container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-cyan/20 text-cyan border-cyan/30">Custom AI Agents</Badge>
          <h2 className="font-heading text-4xl font-bold mb-4">
            AI That Knows{' '}
            <span className="gradient-text">Your Business</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We don't just customize prompts. We build AI agents from the ground up based on your 
            specific needs, products, and customer base.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {customizationOptions.map((option, i) => (
            <Card key={i} className="glass-card border-violet/20">
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-semibold text-white mb-3">{option.title}</h3>
                <p className="text-muted-foreground mb-4">{option.description}</p>
                <div className="flex flex-wrap gap-2">
                  {option.examples.map((example, j) => (
                    <Badge key={j} variant="outline" className="border-cyan/30 text-cyan text-xs">
                      {example}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Visual Example */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="glass-card p-8 glow-violet">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet to-cyan flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-lg">Example: Custom Healthcare AI Agent</p>
                <p className="text-muted-foreground">Built for a medical device sales team</p>
              </div>
            </div>
            
            <div className="bg-navy/50 rounded-lg p-6 border border-violet/20">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-sm font-semibold text-red-400 flex-shrink-0">AI</div>
                  <div className="flex-1 bg-navy rounded-lg p-3 border border-red-500/20">
                    <p className="text-sm text-white font-medium mb-1">Dr. Sarah Chen — Chief of Surgery, Metro General</p>
                    <p className="text-muted-foreground text-sm">"I've seen three vendors this month with similar claims. Your device costs 40% more than the competition, and my CFO is already pushing back on capital expenditures. Why should I fight for your budget when I have a cheaper alternative that's FDA-approved?"</p>
                  </div>
                </div>
                <div className="pl-11 text-xs text-muted-foreground">
                  <span className="text-cyan">Agent knows:</span> Competitor pricing, FDA approval status, typical hospital budget cycles, 
                  surgeon decision-making patterns, clinical outcome data, ROI calculations for OR time savings
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="relative bg-navy-light/50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-violet/20 text-violet border-violet/30">Use Cases</Badge>
            <h2 className="font-heading text-4xl font-bold mb-4">
              Training for{' '}
              <span className="gradient-text">Every Team</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {useCases.map((useCase, i) => (
              <Card key={i} className="glass-card border-violet/20">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-violet/20 flex items-center justify-center mb-4">
                    <useCase.icon className="w-6 h-6 text-violet" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-white mb-3">{useCase.title}</h3>
                  <ul className="space-y-2">
                    {useCase.scenarios.map((scenario, j) => (
                      <li key={j} className="flex items-center gap-2 text-muted-foreground text-sm">
                        <CheckCircle className="w-4 h-4 text-cyan flex-shrink-0" />
                        {scenario}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="relative container mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge className="mb-4 bg-cyan/20 text-cyan border-cyan/30">Enterprise Security</Badge>
            <h2 className="font-heading text-4xl font-bold mb-6">
              Security That{' '}
              <span className="gradient-text">Your Team Demands</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              We built Roleplay Studio with enterprise security requirements in mind from day one. 
              Your data is protected by the same standards used by Fortune 500 companies.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {securityFeatures.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-navy-light/50 border border-violet/10">
                  <feature.icon className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium text-sm">{feature.title}</p>
                    <p className="text-muted-foreground text-xs">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 glow-cyan">
            <h3 className="font-heading text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-cyan" />
              Compliance & Certifications
            </h3>
            <div className="space-y-4">
              {[
                { cert: 'SOC 2 Type II', status: 'Certified', desc: 'Annual third-party security audits' },
                { cert: 'GDPR', status: 'Compliant', desc: 'EU data protection compliance' },
                { cert: 'CCPA', status: 'Compliant', desc: 'California privacy compliance' },
                { cert: 'HIPAA', status: 'Available', desc: 'BAA available for healthcare' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-navy/50 border border-cyan/20">
                  <div>
                    <p className="text-white font-semibold">{item.cert}</p>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                  <Badge className="bg-cyan/20 text-cyan border-0">{item.status}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section className="relative bg-navy-light/50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-violet/20 text-violet border-violet/30">Implementation</Badge>
            <h2 className="font-heading text-4xl font-bold mb-4">
              From Kickoff to{' '}
              <span className="gradient-text">Full Deployment</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our proven implementation methodology gets you from contract to company-wide rollout in 8-12 weeks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {implementationPhases.map((phase, i) => (
              <Card key={i} className="glass-card border-violet/20 relative">
                <CardContent className="p-6">
                  <div className="text-4xl font-heading font-bold gradient-text mb-2">{phase.phase}</div>
                  <h3 className="font-heading text-lg font-semibold text-white mb-1">{phase.title}</h3>
                  <p className="text-cyan text-sm mb-3 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {phase.duration}
                  </p>
                  <p className="text-muted-foreground text-sm mb-4">{phase.description}</p>
                  <ul className="space-y-1">
                    {phase.deliverables.map((deliverable, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle className="w-3 h-3 text-cyan flex-shrink-0" />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                {i < implementationPhases.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-violet/50" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative container mx-auto px-4 py-24">
        <div className="glass-card p-12 text-center max-w-4xl mx-auto glow-violet">
          <Badge className="mb-4 bg-gradient-to-r from-violet to-cyan text-white border-0">Let's Talk</Badge>
          <h2 className="font-heading text-4xl font-bold mb-4">
            Ready to Build Your{' '}
            <span className="gradient-text">Custom Training Solution?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Schedule a consultation with our enterprise team. We'll discuss your specific needs, 
            show you relevant case studies, and outline a custom implementation plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="btn-gradient text-lg h-14 px-8 border-0 text-white font-semibold">
                Schedule Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg h-14 px-8 border-violet/30 text-white hover:bg-violet/10">
              <MessageSquare className="mr-2 w-5 h-5" />
              Contact Sales
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Or email us directly at <a href="mailto:enterprise@roleplaystudio.com" className="text-cyan hover:underline">enterprise@roleplaystudio.com</a>
          </p>
        </div>
      </section>
    </div>
  );
}
