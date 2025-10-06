import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "../../types/post";
import css from "./PostList.module.css";
import toast from "react-hot-toast";
import { deletePost } from "../../services/postService";

interface PostListProps {
  posts: Post[];
  onEdit: (post: Post) => void;
}

export default function PostList({ posts, onEdit }: PostListProps) {
  const queryClient = useQueryClient();

  const mutationDelete = useMutation({
    mutationFn: async (id: number) => {
      const res = await deletePost(id);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPostKey"] });
      toast.success("Success! Your post has been deleted.");
    },
  });

  const handleDeleteNote = (id: number) => {
    mutationDelete.mutate(id);
  };
  return (
    <ul className={css.list}>
      {posts.map((post) => (
        <li key={post.id} className={css.listItem}>
          <h2 className={css.title}>{post.title}</h2>
          <p className={css.content}>{post.body}</p>
          <div className={css.footer}>
            <button
              onClick={() => {
                onEdit(post);
              }}
              className={css.edit}
            >
              Edit
            </button>
            <button onClick={() => handleDeleteNote(post.id)} className={css.delete}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
