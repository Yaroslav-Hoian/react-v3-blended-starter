'use client';

import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import { fetchPostById, fetchUserById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import css from './PostPreview.module.css';

export default function PostPreviewClient() {
  const router = useRouter();
  const { id } = useParams();
  const parseId = Number(id);

  const { data: post, error } = useQuery({
    queryKey: ['postById', id],
    queryFn: () => fetchPostById(parseId),
    refetchOnMount: false,
  });

  const { data: userId } = useQuery({
    queryKey: ['userById', id],
    queryFn: () => fetchUserById(post!.userId),
    refetchOnMount: false,
  });

  if (error || !post) {
    throw error;
  }

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <button className={css.backBtn} onClick={handleClose}>
        ← Back
      </button>
      <div className={css.post}>
        <div className={css.wrapper}>
          <div className={css.header}>
            <h2>{post.title}</h2>
          </div>

          <p className={css.content}>{post.body}</p>
        </div>
        <p className={css.user}>{userId?.name}</p>
      </div>
    </Modal>
  );
}
