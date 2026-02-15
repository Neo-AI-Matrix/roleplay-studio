import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Sparkles,
  Heart,
  Coffee,
  Palmtree,
  DollarSign,
  GraduationCap,
  Users,
  Zap,
  MapPin,
  Clock,
  ArrowRight,
  Dog,
  Dumbbell,
  Plane,
  Baby,
  Laptop,
  Pizza,
  Trophy,
  Music,
  Gamepad2
} from 'lucide-react';
import Link from 'next/link';
import { FAQ } from '@/components/FAQ';

const careersFAQs = [
  {
    question: "What is the interview process like?",
    answer: "Our typical process includes: 1) Initial recruiter screen (30 min), 2) Hiring manager conversation (45 min), 3) Technical or skills assessment relevant to the role, 4) Team interviews (2-3 conversations with potential teammates), 5) Final conversation with a founder. Total timeline is usually 2-3 weeks."
  },
  {
    question: "Do you sponsor work visas?",
    answer: "Yes, we sponsor H-1B visas for exceptional candidates. We also support transfers for candidates on existing visas. Please mention your visa status during the application process so we can discuss options early."
  },
  {
    question: "Is remote work really supported?",
    answer: "Absolutely! About 60% of our team is fully remote across the US. We use async-first communication, have core collaboration hours (10am-2pm PT), and fly everyone to our SF HQ quarterly for team building. Remote employees get a $1,500 home office stipend."
  },
  {
    question: "What's the equity compensation like?",
    answer: "All full-time employees receive equity grants as part of their compensation. We offer ISOs with a 4-year vesting schedule and 1-year cliff. We're transparent about our cap table during the offer process and provide equity education sessions."
  },
  {
    question: "How do you support professional development?",
    answer: "Every employee gets $3,000/year for learning—courses, conferences, books, whatever helps you grow. No approval needed, just expense it. We also have internal mentorship programs, regular lunch-and-learns, and encourage 10% time for learning projects."
  },
  {
    question: "What's the culture really like?",
    answer: "We're a high-performance team that values work-life balance. We ship fast, celebrate wins loudly, and support each other through challenges. Friday afternoons are for rooftop pickleball and demos. We don't do late nights or weekend work unless something is truly on fire (and it rarely is)."
  }
];

const perks = [
  {
    icon: Trophy,
    title: 'Rooftop Pickleball Court',
    description: 'Yes, really. We have a pickleball court on the roof. Weekly tournaments, beginner lessons, and Friday afternoon matches are a company tradition.',
  },
  {
    icon: DollarSign,
    title: 'Top-Tier Compensation',
    description: 'Competitive salary, meaningful equity, and annual bonuses. We pay at the 90th percentile because we hire the best.',
  },
  {
    icon: Palmtree,
    title: 'Unlimited PTO',
    description: 'Take the time you need. We track outcomes, not hours. Average employee takes 4-5 weeks per year (and we encourage it).',
  },
  {
    icon: Laptop,
    title: 'Remote-First + SF HQ',
    description: 'Work from anywhere in the US. Our SF office is available for those who want it, with monthly in-person gatherings.',
  },
  {
    icon: Heart,
    title: 'Premium Healthcare',
    description: '100% covered medical, dental, and vision for you and your dependents. Plus $500/year wellness stipend.',
  },
  {
    icon: Baby,
    title: 'Parental Leave',
    description: '16 weeks fully paid parental leave for all parents, regardless of gender. Plus $2,000 baby bonus.',
  },
  {
    icon: GraduationCap,
    title: 'Learning Budget',
    description: '$3,000/year for courses, conferences, books, or anything that helps you grow. No approvals needed.',
  },
  {
    icon: Dog,
    title: 'Dog-Friendly Office',
    description: 'Bring your pup to the office. We have treats, beds, and a dedicated "bark park" area on the terrace.',
  },
  {
    icon: Plane,
    title: 'Team Retreats',
    description: 'Twice a year we bring everyone together somewhere amazing. Past trips: Costa Rica, Japan, Iceland.',
  },
  {
    icon: Pizza,
    title: 'Free Meals & Snacks',
    description: 'Catered lunch 3x/week at HQ, DoorDash credits for remote folks, and a snack wall that would make a bodega jealous.',
  },
  {
    icon: Dumbbell,
    title: 'Fitness Perks',
    description: 'On-site gym, ClassPass membership, and a running club that meets Wednesday mornings (optional caffeine stops).',
  },
  {
    icon: Gamepad2,
    title: 'Game Room',
    description: 'PS5, Nintendo Switch, foosball, and a vintage arcade cabinet. Perfect for afternoon brain breaks.',
  },
];

const values = [
  {
    title: 'Ship Fast, Learn Faster',
    description: 'We bias toward action. Launch, measure, iterate. Perfect is the enemy of shipped.',
  },
  {
    title: 'Customers Are Our North Star',
    description: 'Every decision starts with "How does this help our customers succeed?"',
  },
  {
    title: 'Radical Candor',
    description: 'We give honest feedback because we care. No passive-aggressive Slack messages here.',
  },
  {
    title: 'Own Your Domain',
    description: 'You\'re hired because you\'re an expert. We trust you to make decisions and run with them.',
  },
  {
    title: 'Win as a Team',
    description: 'No hero culture. We celebrate collaborative wins and support each other through challenges.',
  },
  {
    title: 'Have Fun',
    description: 'Life\'s too short for boring work. We work hard and play hard (see: rooftop pickleball).',
  },
];

const jobOpenings = [
  {
    id: 'founding-ai-engineer',
    title: 'Founding AI/ML Engineer',
    department: 'Engineering',
    location: 'San Francisco / Remote',
    type: 'Full-time',
    salary: '$180K - $250K + Equity',
    description: 'Build the AI systems that power realistic, adaptive roleplay conversations. You\'ll work on prompt engineering, fine-tuning, voice synthesis integration, and developing our proprietary conversation scoring algorithms.',
    requirements: [
      '5+ years of software engineering experience',
      'Deep experience with LLMs (GPT-4, Claude, etc.)',
      'Experience with voice/speech ML (TTS, STT)',
      'Strong Python and TypeScript skills',
      'Passion for pushing the boundaries of AI',
    ],
  },
  {
    id: 'senior-frontend-engineer',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'San Francisco / Remote',
    type: 'Full-time',
    salary: '$160K - $220K + Equity',
    description: 'Craft beautiful, performant interfaces for our training platform. You\'ll own the entire frontend experience from the marketing site to the real-time voice conversation UI.',
    requirements: [
      '4+ years of frontend development experience',
      'Expert-level React and TypeScript',
      'Experience with Next.js and modern CSS',
      'Eye for design and UX excellence',
      'Experience with real-time/WebSocket applications a plus',
    ],
  },
  {
    id: 'backend-engineer',
    title: 'Backend Engineer',
    department: 'Engineering',
    location: 'San Francisco / Remote',
    type: 'Full-time',
    salary: '$150K - $200K + Equity',
    description: 'Build the infrastructure that powers thousands of concurrent AI conversations. You\'ll work on our API layer, real-time systems, and integrations with enterprise customers.',
    requirements: [
      '3+ years of backend development experience',
      'Strong Node.js or Python experience',
      'Experience with PostgreSQL and Redis',
      'Understanding of WebSockets and real-time systems',
      'API design and documentation skills',
    ],
  },
  {
    id: 'product-manager',
    title: 'Senior Product Manager',
    department: 'Product',
    location: 'San Francisco / Remote',
    type: 'Full-time',
    salary: '$150K - $190K + Equity',
    description: 'Define the future of AI-powered training. You\'ll work closely with customers, analyze usage data, and drive the roadmap for our core platform and enterprise features.',
    requirements: [
      '4+ years of product management experience',
      'Experience with B2B SaaS products',
      'Strong analytical and data skills',
      'Excellent communication and stakeholder management',
      'Background in L&D, sales enablement, or EdTech a plus',
    ],
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    department: 'Design',
    location: 'San Francisco / Remote',
    type: 'Full-time',
    salary: '$140K - $180K + Equity',
    description: 'Design intuitive, delightful experiences for AI-powered roleplay training. You\'ll own the end-to-end design process from research to high-fidelity prototypes.',
    requirements: [
      '3+ years of product design experience',
      'Strong portfolio showing B2B or consumer app work',
      'Proficiency in Figma and prototyping tools',
      'Experience with design systems',
      'Ability to conduct and synthesize user research',
    ],
  },
  {
    id: 'enterprise-ae',
    title: 'Enterprise Account Executive',
    department: 'Sales',
    location: 'San Francisco / Remote',
    type: 'Full-time',
    salary: '$120K - $150K Base + Commission (OTE $280K+)',
    description: 'Close six and seven-figure deals with Fortune 500 companies. You\'ll run complex enterprise sales cycles, working with L&D leaders and sales executives.',
    requirements: [
      '5+ years of enterprise SaaS sales experience',
      'Track record of exceeding quota',
      'Experience selling to HR, L&D, or Sales Leadership',
      'Comfortable with complex, multi-stakeholder deals',
      'Experience with MEDDIC or similar frameworks',
    ],
  },
  {
    id: 'customer-success-manager',
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'San Francisco / Remote',
    type: 'Full-time',
    salary: '$100K - $140K + Bonus',
    description: 'Be the trusted advisor for our enterprise customers. You\'ll drive adoption, identify expansion opportunities, and ensure customers achieve their training goals.',
    requirements: [
      '3+ years in customer success or account management',
      'Experience with enterprise B2B SaaS',
      'Strong presentation and communication skills',
      'Data-driven approach to customer health',
      'Background in L&D or sales enablement a plus',
    ],
  },
  {
    id: 'solutions-engineer',
    title: 'Solutions Engineer',
    department: 'Sales',
    location: 'San Francisco / Remote',
    type: 'Full-time',
    salary: '$140K - $180K + Bonus',
    description: 'Be the technical expert in enterprise sales cycles. You\'ll run demos, architect custom solutions, and work with customers to integrate Roleplay Studio into their tech stack.',
    requirements: [
      '3+ years in solutions engineering or sales engineering',
      'Technical background (engineering or CS degree preferred)',
      'Excellent presentation and demo skills',
      'Experience with enterprise integrations (SSO, SCIM, APIs)',
      'Ability to translate technical concepts for business audiences',
    ],
  },
  {
    id: 'content-marketing-manager',
    title: 'Content Marketing Manager',
    department: 'Marketing',
    location: 'San Francisco / Remote',
    type: 'Full-time',
    salary: '$100K - $140K + Equity',
    description: 'Build our content engine from the ground up. You\'ll create thought leadership content, case studies, and resources that establish Roleplay Studio as the leader in AI training.',
    requirements: [
      '3+ years in B2B content marketing',
      'Excellent writing and storytelling skills',
      'Experience with SEO and content strategy',
      'Ability to interview customers and create case studies',
      'Background in HR tech, sales enablement, or EdTech a plus',
    ],
  },
  {
    id: 'head-of-people',
    title: 'Head of People',
    department: 'People',
    location: 'San Francisco',
    type: 'Full-time',
    salary: '$160K - $200K + Equity',
    description: 'Build and scale our people function as we grow from 20 to 100+. You\'ll own recruiting, culture, compensation, and all things people.',
    requirements: [
      '7+ years in HR/People roles, with startup experience',
      'Experience scaling teams rapidly',
      'Strong recruiting and employer branding skills',
      'Data-driven approach to people decisions',
      'Passion for building exceptional culture',
    ],
  },
  {
    id: 'ai-training-specialist',
    title: 'AI Training Specialist',
    department: 'Operations',
    location: 'Remote',
    type: 'Full-time',
    salary: '$80K - $110K + Equity',
    description: 'Shape our AI agents to be amazing training partners. You\'ll write prompts, evaluate AI conversations, build scenario libraries, and work with customers to create custom agents.',
    requirements: [
      '2+ years in instructional design, L&D, or sales training',
      'Strong writing and communication skills',
      'Curiosity about AI and prompt engineering',
      'Experience with roleplay-based training',
      'Background in sales or customer service a plus',
    ],
  },
];

export default function CareersPage() {
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
            <Sparkles className="w-3 h-3 mr-1" />
            We&apos;re Hiring!
          </Badge>
          
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Build the Future of{' '}
            <span className="gradient-text">AI Training</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            We&apos;re a fast-growing team on a mission to transform how companies train their people. 
            Great benefits, meaningful work, and yes — a rooftop pickleball court.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="btn-gradient text-lg h-14 px-8 border-0 text-white font-semibold" asChild>
              <a href="#openings">
                View Open Roles
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Culture Hero Image */}
      <section className="relative container mx-auto px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-2 overflow-hidden glow-violet">
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden bg-gradient-to-br from-violet/30 to-cyan/30 flex items-center justify-center">
              <div className="text-center px-8">
                <div className="flex justify-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-violet/30 flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-violet" />
                  </div>
                  <div className="w-16 h-16 rounded-full bg-cyan/30 flex items-center justify-center">
                    <Music className="w-8 h-8 text-cyan" />
                  </div>
                  <div className="w-16 h-16 rounded-full bg-violet/30 flex items-center justify-center">
                    <Coffee className="w-8 h-8 text-violet" />
                  </div>
                </div>
                <p className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                  &quot;Best team I&apos;ve ever worked with&quot;
                </p>
                <p className="text-muted-foreground">— What we hear from new hires after their first month</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="relative container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-violet/30 text-white border-violet/50">Our Values</Badge>
          <h2 className="font-heading text-4xl font-bold mb-4">
            What We{' '}
            <span className="gradient-text">Believe In</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {values.map((value, i) => (
            <Card key={i} className="glass-card border-violet/20">
              <CardContent className="p-6">
                <h3 className="font-heading text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Perks & Benefits */}
      <section className="relative bg-navy-light/50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-cyan/30 text-white border-cyan/50">Perks & Benefits</Badge>
            <h2 className="font-heading text-4xl font-bold mb-4">
              More Than Just a{' '}
              <span className="gradient-text">Paycheck</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We believe happy people do their best work. Here&apos;s how we take care of our team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {perks.map((perk, i) => (
              <Card key={i} className="glass-card border-violet/20 hover:border-violet/40 transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet to-cyan flex items-center justify-center mb-4">
                    <perk.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2">{perk.title}</h3>
                  <p className="text-muted-foreground text-sm">{perk.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="relative container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-violet/30 text-white border-violet/50">Open Positions</Badge>
          <h2 className="font-heading text-4xl font-bold mb-4">
            Join Our{' '}
            <span className="gradient-text">Growing Team</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We&apos;re looking for exceptional people to help us build the future of AI-powered training.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {jobOpenings.map((job, i) => (
            <Card key={i} className="glass-card border-violet/20 hover:border-cyan/40 transition-all group">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-heading text-xl font-semibold text-white group-hover:text-cyan transition-colors">
                        {job.title}
                      </h3>
                      <Badge className="bg-violet/20 text-violet border-0 text-xs">
                        {job.department}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </span>
                    </div>
                  </div>
                  <a href={`mailto:careers@roleplaystudio.ai?subject=Application: ${job.title}`}>
                    <Button variant="outline" className="border-violet/30 hover:bg-violet/20 shrink-0">
                      Apply Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                </div>
                
                {/* Expandable details */}
                <div className="mt-4 pt-4 border-t border-violet/10">
                  <p className="text-muted-foreground mb-4">{job.description}</p>
                  <div>
                    <p className="text-sm text-white font-medium mb-2">Requirements:</p>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {job.requirements.map((req, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Zap className="w-4 h-4 text-cyan flex-shrink-0 mt-0.5" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ 
        faqs={careersFAQs}
        subtitle="Common questions about working at Roleplay Studio"
      />

      {/* CTA Section */}
      <section className="relative container mx-auto px-4 py-24">
        <div className="glass-card p-12 text-center max-w-4xl mx-auto glow-violet">
          <h2 className="font-heading text-4xl font-bold mb-4">
            Don&apos;t See Your{' '}
            <span className="gradient-text">Perfect Role?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We&apos;re always looking for exceptional people. Send us your resume and tell us why you&apos;d be a great fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-gradient text-lg h-14 px-8 border-0 text-white font-semibold" asChild>
              <a href="mailto:careers@roleplaystudio.ai">
                Send Your Resume
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg h-14 px-8 border-violet/30 text-white hover:bg-violet/10" asChild>
              <Link href="/about">
                <Users className="mr-2 w-5 h-5" />
                Learn About Us
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Email us at <a href="mailto:careers@roleplaystudio.ai" className="text-cyan hover:underline">careers@roleplaystudio.ai</a>
          </p>
        </div>
      </section>
    </div>
  );
}
