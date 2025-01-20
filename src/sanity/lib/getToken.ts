export async function getTokens() {
  'use server';
  const sanityApiReadToken = process.env.SANITY_API_READ_TOKEN;

  if (!sanityApiReadToken) {
    throw new Error('Missing environment variables');
  }

  return { sanityApiReadToken };
}
