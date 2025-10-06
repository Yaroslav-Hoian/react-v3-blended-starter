import axios from "axios";
import { Post } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/posts";

interface FetchPostsProps {
  totalPosts: number;
  posts: Post[];
}

interface CreatePostProps {
  title: string;
  body: string;
}

export interface NewDataPostProps {
  id: number;
  title: string;
  body: string;
}

export const fetchPosts = async (searchText: string, page: number): Promise<FetchPostsProps> => {
  const request = await axios.get<Post[]>("", {
    params: {
      q: searchText,
      _page: page,
      _limit: 8,
    },
  });

  const totalPosts = request.headers["x-total-count"] / 8;

  return { totalPosts, posts: request.data };
};

export const createPost = async (newPost: CreatePostProps): Promise<Post> => {
  const postRequest = await axios.post<Post>("", newPost);

  return postRequest.data;
};

export const editPost = async ({ id, title, body }: NewDataPostProps): Promise<Post> => {
  const postRequest = await axios.patch<Post>("/" + id, { title, body });

  return postRequest.data;
};

export const deletePost = async (postId: number): Promise<Post> => {
  const deleteRequest = await axios.delete<Post>("/" + postId);
  return deleteRequest.data;
};
