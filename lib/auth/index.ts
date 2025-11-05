import { createClient } from '@/lib/supabase/server';
import { NextRequest } from 'next/server';
import { db, users } from '@/lib/db';
import { eq } from 'drizzle-orm';

export async function getCurrentUser(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    // Get user from our database
    const [dbUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, user.email!))
      .limit(1);

    return dbUser;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export function requireAuth(roles: string[] = []) {
  return async function authMiddleware(request: NextRequest) {
    const user = await getCurrentUser(request);
    
    if (!user) {
      return { error: 'Authentication required', status: 401 };
    }

    if (!user.isActive) {
      return { error: 'Account is disabled', status: 403 };
    }

    if (roles.length > 0 && !roles.includes(user.role)) {
      return { error: 'Insufficient permissions', status: 403 };
    }

    return { user };
  };
}

export const requireAdmin = requireAuth(['admin']);
export const requireManager = requireAuth(['admin', 'manager']);
export const requireAuthAny = requireAuth([]);
