import { cookies } from 'next/headers';
import { VISITOR_COOKIE } from '@/middleware';

/** Reads the anonymous visitor id set by middleware.ts, for server components
 *  that need to forward it to the backend as `x-visitor-id`. */
export async function getVisitorId(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(VISITOR_COOKIE)?.value;
}
