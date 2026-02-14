'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sparkles } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/product', label: 'Product' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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
              <div className="flex flex-col gap-6 mt-8">
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
