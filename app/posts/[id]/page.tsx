import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostDetailsClient from './PostDetails.client';
import { fetchPostById } from '@/lib/api';
import { Metadata } from 'next';

type PostDetailsProps = {
  params: Promise<{ id: number }>;
};

export async function generateMetadata({ params }: PostDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchPostById(id);
  return {
    title: `${post.title}`,
    description: `${post.body}`,
  };
}

export default async function PostDetails({ params }: PostDetailsProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['postById', id],
    queryFn: () => fetchPostById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetailsClient />
    </HydrationBoundary>
  );
}
