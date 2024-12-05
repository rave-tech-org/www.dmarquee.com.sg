import { type UseQueryOptions, type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type ClientPerspective, type QueryParams, createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from './env';

export const token =
  typeof process === 'undefined'
    ? ''
    : process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN! || process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN!;

const clientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'development',
  perspective: 'published' as ClientPerspective,
};

export const client = createClient(clientConfig);

export const previewClient = client.withConfig({
  ...clientConfig,
  useCdn: false,
  token,
  perspective: 'previewDrafts',
});

type SanityFetchProps = {
  query: string;
  qParams?: QueryParams;
  tags: string[];
  isDraft?: boolean;
};

export async function sanityFetch<QueryResponse>({
  query,
  qParams = {},
  tags,
  isDraft = false,
}: SanityFetchProps): Promise<QueryResponse> {
  if (isDraft && !token) {
    throw new Error('The `SANITY_API_READ_TOKEN` environment variable is required.');
  }
  const currentClient = isDraft ? previewClient : client;
  return currentClient.fetch<QueryResponse>(query, qParams, {
    cache: process.env.NODE_ENV === 'development' ? 'no-store' : isDraft ? 'no-store' : 'force-cache',
    next: { tags },
  });
}

export function useSanityQuery<QueryResponse>({
  query,
  tags,
  qParams = {},
  isDraft = false,
  options,
}: SanityFetchProps & { options?: UseQueryOptions<QueryResponse, Error> }): UseQueryResult<QueryResponse, Error> {
  return useQuery<QueryResponse, Error>({
    queryKey: tags,
    queryFn: () => sanityFetch<QueryResponse>({ query, qParams, tags, isDraft }),
    ...options,
  });
}
