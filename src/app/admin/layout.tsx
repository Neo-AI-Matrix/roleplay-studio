import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Roleplay Studio',
  description: 'Token and usage management for Roleplay Studio',
  robots: 'noindex, nofollow', // Don't index admin pages
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
