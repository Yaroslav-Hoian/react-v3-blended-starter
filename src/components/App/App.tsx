import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import css from "./App.module.css";
import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../services/postService";
import { useDebouncedCallback } from "use-debounce";
import toast, { Toaster } from "react-hot-toast";
import PostForm from "../CreatePostForm/CreatePostForm";
import EditPostForm from "../EditPostForm/EditPostForm";
import { Post } from "../../types/post";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditPost, setIsEditPost] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectPost, setSelectPost] = useState<Post | null>(null);

  const { data, isSuccess } = useQuery({
    queryKey: ["myPostKey", searchQuery, currentPage],
    queryFn: () => fetchPosts(searchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data?.posts.length === 0) {
      toast.error("No posts found for your request.");
    }
  }, [data]);

  const handleSearch = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  }, 300);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModalEdit = (post: Post) => {
    setIsEditPost(true);
    setSelectPost(post);
  };

  const handleCloseModalEdit = () => {
    setIsEditPost(false);
    setSelectPost(null);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <Toaster />
        <SearchBox value={searchQuery} onChange={handleSearch} />
        {isSuccess && data?.totalPosts > 1 && (
          <Pagination
            totalPages={data?.totalPosts ?? 0}
            currentPage={currentPage}
            onPageChange={(newPage) => setCurrentPage(newPage)}
          />
        )}
        <button className={css.button} onClick={handleOpenModal}>
          Create post
        </button>
      </header>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <PostForm onClose={handleCloseModal} />
        </Modal>
      )}
      {isEditPost && selectPost && (
        <Modal onClose={handleCloseModalEdit}>
          <EditPostForm post={selectPost} onClose={handleCloseModalEdit} />
        </Modal>
      )}
      {isSuccess && data?.posts.length > 0 && (
        <PostList posts={data?.posts} onEdit={handleOpenModalEdit} />
      )}
    </div>
  );
}
