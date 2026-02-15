import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Admin credentials - in production, move to environment variables
const ADMIN_USERNAME = 'neo@tocabay.com';
const ADMIN_PASSWORD = 'Cougars12!';
const ADMIN_SESSION_COOKIE = 'roleplay_admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Simple session token generation
function generateSessionToken(): string {
  return Buffer.from(`${Date.now()}-${Math.random().toString(36).substr(2)}`).toString('base64');
}

// Validate credentials
export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

// Create session
export function createSession(): { token: string; expires: Date } {
  const token = generateSessionToken();
  const expires = new Date(Date.now() + SESSION_DURATION);
  return { token, expires };
}

// Verify session (for middleware/API routes)
export async function verifyAdminSession(request: NextRequest): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE);
  
  if (!sessionCookie?.value) {
    return false;
  }
  
  // In production, validate against a session store
  // For now, just check if cookie exists and isn't expired
  try {
    const decoded = Buffer.from(sessionCookie.value, 'base64').toString();
    const [timestamp] = decoded.split('-');
    const sessionAge = Date.now() - parseInt(timestamp);
    return sessionAge < SESSION_DURATION;
  } catch {
    return false;
  }
}

// Get session cookie name
export function getSessionCookieName(): string {
  return ADMIN_SESSION_COOKIE;
}
