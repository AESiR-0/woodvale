import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from './index';

export async function withAuth(
  handler: (request: NextRequest, user: any) => Promise<NextResponse>,
  roles: string[] = []
) {
  return async (request: NextRequest) => {
    const authResult = await requireAuth(roles)(request);
    
    if ('error' in authResult) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    return handler(request, authResult.user);
  };
}

export const withAdminAuth = (handler: (request: NextRequest, user: any) => Promise<NextResponse>) =>
  withAuth(handler, ['admin']);

export const withManagerAuth = (handler: (request: NextRequest, user: any) => Promise<NextResponse>) =>
  withAuth(handler, ['admin', 'manager']);

export const withAnyAuth = (handler: (request: NextRequest, user: any) => Promise<NextResponse>) =>
  withAuth(handler, []);
