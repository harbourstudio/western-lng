import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { serverEnv } from '@/env/serverEnv';
import { getClient } from '@/lib/sanity/client/client';

export async function GET(request: Request) {
  const client = getClient();

  const { GET: handler } = defineEnableDraftMode({
    client: client.withConfig({ token: serverEnv.SANITY_API_READ_TOKEN }),
  });

  return handler(request);
}