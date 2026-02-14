import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Role Play Studio - AI-Powered Sales & Support Training",
  description: "Transform your team's performance with AI-powered role-play simulations. Practice real-world scenarios, receive instant feedback, and build confidence.",
  keywords: "sales training, customer support training, AI roleplay, conversation practice, sales coaching, objection handling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
        <body className="min-h-screen bg-navy antialiased font-sans">
          <Navigation />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
