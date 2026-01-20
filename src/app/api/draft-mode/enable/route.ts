import { draftMode } from 'next/headers';
import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { redirect } from 'next/navigation';
import { serverEnv } from '@/env/serverEnv';
import { getClient } from '@/lib/sanity/client/client';

export async function GET(request: Request) {
  const client = getClient().withConfig({ token: serverEnv.SANITY_API_READ_TOKEN });

  const { isValid, redirectTo = '/' } = await validatePreviewUrl(client, request.url);

  if (!isValid) {
    return new Response('Invalid secret', { status: 401 });
  }

  (await draftMode()).enable();

  redirect(redirectTo);
}