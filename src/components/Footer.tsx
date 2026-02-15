import Link from 'next/link';
import { Sparkles, Twitter, Linkedin, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-navy-light mt-16">
      {/* Gradient separator line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent blur-sm" />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet to-cyan flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-white">
                Roleplay <span className="gradient-text">Studio</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              AI-powered training platform for sales and customer support teams. 
              Practice real-world scenarios and receive instant feedback.
            </p>
            <div className="flex gap-4 mt-6">
              <span className="text-muted-foreground/40 cursor-default" title="Coming soon">
                <Twitter className="w-5 h-5" />
              </span>
              <span className="text-muted-foreground/40 cursor-default" title="Coming soon">
                <Linkedin className="w-5 h-5" />
              </span>
              <span className="text-muted-foreground/40 cursor-default" title="Coming soon">
                <Github className="w-5 h-5" />
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/product" className="text-muted-foreground hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/product#pricing" className="text-muted-foreground hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/enterprise" className="text-muted-foreground hover:text-white transition-colors">
                  Enterprise
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-violet/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 Roleplay Studio. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
