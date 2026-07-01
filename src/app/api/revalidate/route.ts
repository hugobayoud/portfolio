import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { SHORTS_CACHE_TAG } from '@/lib/services/shorts/shorts-service';

/**
 * On-demand revalidation for the Shorts feed, pinged by the `publish-short`
 * script after it upserts a Short. Secret-guarded since it's an unauthenticated
 * write-adjacent endpoint (see docs/adr/0002-no-wait-blog-delivery.md).
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret');

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ revalidated: false, message: 'Invalid secret' }, { status: 401 });
  }

  revalidateTag(SHORTS_CACHE_TAG);

  return NextResponse.json({ revalidated: true, tag: SHORTS_CACHE_TAG });
}
