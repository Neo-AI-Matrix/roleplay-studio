import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  Heart, 
  Lightbulb, 
  Users,
  ArrowRight,
  Linkedin,
  Twitter
} from 'lucide-react';
import Link from 'next/link';

const values = [
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'We measure success by the measurable improvements in your team\'s performance, not vanity metrics.',
  },
  {
    icon: Heart,
    title: 'Human-Centered',
    description: 'AI is a tool to enhance human potential, not replace it. We build technology that empowers people.',
  },
  {
    icon: Lightbulb,
    title: 'Continuous Learning',
    description: 'Just like we help your team improve, we\'re constantly learning and improving our platform.',
  },
  {
    icon: Users,
    title: 'Customer Obsessed',
    description: 'Every feature we build starts with a real customer problem. Your success is our success.',
  },
];

const team = [
  {
    name: 'Jessica Martin',
    role: 'CEO & Founder',
    bio: 'Former VP of Digital Experience at AT&T. 30+ years building enterprise digital teams.',
    image: '/avatars/jessica-martin.png',
  },
  {
    name: 'Sarah Kim',
    role: 'CTO & Co-Founder',
    bio: 'Ex-Google AI researcher. PhD in Natural Language Processing from Stanford.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Marcus Johnson',
    role: 'Head of Product',
    bio: 'Previously led product at Gong.io. Passionate about the intersection of AI and sales.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Customer Success',
    bio: '10 years in L&D and corporate training. Expert in adult learning methodologies.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face',
  },
];

const milestones = [
  { year: '2024', event: 'Company founded with a vision to transform sales training' },
  { year: '2024', event: 'Launched beta with 50 early adopter companies' },
  { year: '2025', event: 'Reached 5,000 active users across 200+ companies' },
  { year: '2025', event: 'Raised Series A funding to accelerate product development' },
  { year: '2026', event: '10,000+ users and counting. Expanding into customer support training' },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet/20 via-transparent to-transparent" />

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-violet/20 text-violet border-violet/30">
            About Us
          </Badge>
          
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Building the Future of{' '}
            <span className="gradient-text">Team Training</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We believe every professional deserves access to world-class training. 
            AI makes that possible at scale.
          </p>
        </div>

        {/* Hero Image */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="glass-card p-2 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=500&fit=crop" 
              alt="Our team collaborating"
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge className="mb-4 bg-cyan/20 text-cyan border-cyan/30">Our Mission</Badge>
            <h2 className="font-heading text-4xl font-bold mb-6">
              Democratize{' '}
              <span className="gradient-text">Elite Training</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              The best sales and support teams in the world have one thing in common: 
              they practice relentlessly. But traditional role-play training is expensive, 
              inconsistent, and often embarrassing.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              We built Roleplay Studio to give every team member access to unlimited, 
              judgment-free practice with AI that adapts to their skill level and provides 
              instant, actionable feedback.
            </p>
            <p className="text-lg text-muted-foreground">
              Our vision is a world where every customer-facing professional has the 
              confidence and skills to succeed, powered by AI that makes them better—not 
              replaces them.
            </p>
          </div>

          <div className="glass-card p-8 glow-cyan">
            <div className="text-center">
              <div className="text-6xl font-heading font-bold gradient-text mb-4">10,000+</div>
              <p className="text-xl text-white mb-8">Professionals trained and counting</p>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-heading font-bold text-cyan mb-1">95%</div>
                  <p className="text-muted-foreground text-sm">Report improved confidence</p>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold text-cyan mb-1">2.5x</div>
                  <p className="text-muted-foreground text-sm">Faster time to proficiency</p>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold text-cyan mb-1">40%</div>
                  <p className="text-muted-foreground text-sm">Improvement in win rates</p>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold text-cyan mb-1">200+</div>
                  <p className="text-muted-foreground text-sm">Companies trust us</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative bg-navy-light/50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-violet/20 text-violet border-violet/30">Our Values</Badge>
            <h2 className="font-heading text-4xl font-bold">
              What{' '}
              <span className="gradient-text">Drives Us</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <Card key={i} className="glass-card border-violet/20 text-center">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-violet to-cyan flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative container mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-cyan/20 text-cyan border-cyan/30">Our Team</Badge>
          <h2 className="font-heading text-4xl font-bold mb-4">
            Meet the{' '}
            <span className="gradient-text">People Behind the Product</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A team of sales leaders, AI researchers, and learning experts united by a common mission.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <Card key={i} className="glass-card border-violet/20 hover:border-violet/40 transition-all group">
              <CardContent className="p-6 text-center">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-violet/30 group-hover:border-cyan/50 transition-all group-hover:scale-105"
                />
                <h3 className="font-heading text-xl font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-cyan text-sm mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center gap-3">
                  <a href="#" className="text-muted-foreground hover:text-cyan transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-cyan transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative bg-navy-light/50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-violet/20 text-violet border-violet/30">Our Journey</Badge>
            <h2 className="font-heading text-4xl font-bold">
              From Idea to{' '}
              <span className="gradient-text">10,000+ Users</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, i) => (
              <div key={i} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet to-cyan flex items-center justify-center text-white font-bold">
                    {milestone.year.slice(2)}
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-violet to-cyan/20 mt-2" />
                  )}
                </div>
                <div className="flex-1 glass-card p-4 mb-2">
                  <span className="text-cyan font-semibold">{milestone.year}</span>
                  <p className="text-white mt-1">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative container mx-auto px-4 py-24">
        <div className="glass-card p-12 text-center max-w-4xl mx-auto glow-violet">
          <h2 className="font-heading text-4xl font-bold mb-4">
            Want to Join{' '}
            <span className="gradient-text">Our Mission?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for passionate people to join our team. Check out our open positions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-gradient text-lg h-14 px-8 border-0 text-white font-semibold">
              View Open Positions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-lg h-14 px-8 border-violet/30 text-white hover:bg-violet/10">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
