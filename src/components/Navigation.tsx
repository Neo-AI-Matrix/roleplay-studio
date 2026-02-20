'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, UserButton, useClerk } from '@clerk/nextjs';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sparkles, LogOut, ChevronDown, Briefcase, HeadphonesIcon, Users, MessageSquare, Crown } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/product', label: 'Product' },
  { href: '/enterprise', label: 'Enterprise' },
  { href: '/about', label: 'About' },
];

const trainingCategories = [
  { id: 'sales', label: 'Sales', icon: Briefcase, color: 'text-violet' },
  { id: 'support', label: 'Support', icon: HeadphonesIcon, color: 'text-cyan' },
  { id: 'hr', label: 'HR', icon: Users, color: 'text-amber-400' },
  { id: 'communication', label: 'Communication', icon: MessageSquare, color: 'text-emerald-400' },
  { id: 'leadership', label: 'Leadership', icon: Crown, color: 'text-rose-400' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { signOut } = useClerk();
  
  const isInStudio = pathname?.startsWith('/studio');

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-violet/20 bg-navy/80 backdrop-blur-lg">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet to-cyan flex items-center justify-center group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-heading font-bold text-xl text-white">
            Roleplay <span className="gradient-text">Studio</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-white transition-colors font-medium"
            >
              {item.label}
            </Link>
          ))}
          
          {/* Categories Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-muted-foreground hover:text-white transition-colors font-medium">
              Categories
              <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-navy-light border border-white/10 rounded-xl shadow-xl p-2 min-w-[200px]">
                {trainingCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/studio/category/${cat.id}`}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <cat.icon className={`w-4 h-4 ${cat.color}`} />
                    <span className="text-white text-sm font-medium">{cat.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <SignedIn>
            <Link
              href="/studio"
              className="text-electric-blue hover:text-electric-blue/80 transition-colors font-medium"
            >
              Studio
            </Link>
          </SignedIn>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <SignedOut>
            <Link 
              href="/sign-in"
              className="px-4 py-2 text-muted-foreground hover:text-white transition-colors font-medium"
            >
              Sign In
            </Link>
            <Link 
              href="/sign-up"
              className="px-4 py-2 btn-gradient rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Start Free Trial
            </Link>
          </SignedOut>
          <SignedIn>
            {isInStudio ? (
              <button 
                onClick={() => signOut({ redirectUrl: '/' })}
                className="px-4 py-2 flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-semibold transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            ) : (
              <>
                <Link 
                  href="/studio"
                  className="px-4 py-2 btn-gradient rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  Go to Studio
                </Link>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 ring-2 ring-electric-blue/50"
                    }
                  }}
                />
              </>
            )}
          </SignedIn>
        </div>

        {/* Mobile Menu */}
        {mounted ? (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <button className="p-2 text-white">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-navy-light border-violet/20">
              <div className="flex flex-col gap-6 mt-8 pl-[15px]">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-muted-foreground hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Categories Section - Mobile */}
                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">Training Categories</p>
                  <div className="space-y-2">
                    {trainingCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/studio/category/${cat.id}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 py-2 text-muted-foreground hover:text-white transition-colors"
                      >
                        <cat.icon className={`w-5 h-5 ${cat.color}`} />
                        <span className="font-medium">{cat.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                <SignedIn>
                  <Link
                    href="/studio"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-electric-blue hover:text-electric-blue/80 transition-colors"
                  >
                    Studio
                  </Link>
                </SignedIn>
                <div className="flex flex-col gap-3 mt-4">
                  <SignedOut>
                    <Link 
                      href="/sign-in" 
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center px-4 py-3 border border-violet/30 rounded-lg text-white font-medium"
                    >
                      Sign In
                    </Link>
                    <Link 
                      href="/sign-up" 
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center px-4 py-3 btn-gradient rounded-lg text-white font-semibold"
                    >
                      Start Free Trial
                    </Link>
                  </SignedOut>
                  <SignedIn>
                    {isInStudio ? (
                      <button 
                        onClick={() => {
                          setIsOpen(false);
                          signOut({ redirectUrl: '/' });
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white font-semibold transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    ) : (
                      <>
                        <Link 
                          href="/studio" 
                          onClick={() => setIsOpen(false)}
                          className="w-full text-center px-4 py-3 btn-gradient rounded-lg text-white font-semibold"
                        >
                          Go to Studio
                        </Link>
                        <div className="flex justify-center mt-2">
                          <UserButton 
                            afterSignOutUrl="/"
                            appearance={{
                              elements: {
                                avatarBox: "w-10 h-10 ring-2 ring-electric-blue/50"
                              }
                            }}
                          />
                        </div>
                      </>
                    )}
                  </SignedIn>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <button className="md:hidden p-2 text-white">
            <Menu className="w-6 h-6" />
          </button>
        )}
      </nav>
    </header>
  );
}
