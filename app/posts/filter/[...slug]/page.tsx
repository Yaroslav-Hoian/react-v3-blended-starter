import { fetchPosts } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostsClient from './Posts.client';
import { Post } from '@/types/post';
import { Metadata } from 'next';

const debouncedSearch = '';
const page = 1;

interface PostPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const userId = !slug.length || slug[0] === 'All' ? undefined : slug[0];
  const res = await fetchPosts({ searchText: debouncedSearch, page, userId });
  return {
    title: userId ? `Post user ${userId}` : 'Post All users',
    description: `${res.posts.length} posts found  by filter: ${userId || 'All'}`,
  };
}

export default async function PostsPage({ params }: PostPageProps) {
  const queryClient = new QueryClient();

  const { slug = [] } = await params;
  const userId = !slug.length || slug[0] === 'All' ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['posts', debouncedSearch, page, userId],
    queryFn: () => fetchPosts({ searchText: debouncedSearch, page, userId }),
  });

  const initialData = queryClient.getQueryData<{ posts: Post[]; totalCount: number }>([
    'posts',
    debouncedSearch,
    page,
    userId,
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsClient initialData={initialData!} userId={userId!} />
    </HydrationBoundary>
  );
}
