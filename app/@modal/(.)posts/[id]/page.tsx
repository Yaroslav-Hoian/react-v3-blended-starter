import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostPreviewClient from './PostPreview.client';
import { fetchPostById } from '@/lib/api';

type PostPreviewProps = {
  params: Promise<{ id: number }>;
};

export default async function PostPreview({ params }: PostPreviewProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['postById', id],
    queryFn: () => fetchPostById(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostPreviewClient />
    </HydrationBoundary>
  );
}
