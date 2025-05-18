import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { api } from "../helper/api";

interface Comment {
  id: string;
  postId: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  author_id: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  categories: string[];
  tags: string[];
  readTime: number;
  likes: number;
  commentsCount: number;
  comments?: Comment[];
}

export const usePostsStore = defineStore("posts", () => {
  // State
  const posts = ref<Post[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Mock data for demo purposes
  const mockPosts: Post[] = [];

  posts.value = mockPosts;

  // Getters
  const getPostById = computed(() => {
    return (id: string) => posts.value.find((post) => post.id === id);
  });

  function getPostsByAuthor(id: string) {
    console.log(posts.value.filter((post) => post.author_id == id));
    return posts.value.filter((post) => post.author_id == id);
  }
  const getPostsByCategory = computed(() => {
    return (category: string) =>
      posts.value.filter((post) =>
        post.categories
          .map((c) => c.toLowerCase())
          .includes(category.toLowerCase())
      );
  });

  // Actions
  async function fetchPosts() {
    isLoading.value = true;
    try {
      const res = await api.fetch("post/list");
      posts.value = res.data;
      console.log("res :", res);
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch posts";
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchPostById(id: string) {
    isLoading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return getPostById.value(id);
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to fetch post";
      return null;
    } finally {
      isLoading.value = false;
    }
  }

  async function createPost(
    postData: Omit<
      Post,
      "id" | "createdAt" | "updatedAt" | "likes" | "commentsCount" | "comments"
    >
  ) {
    isLoading.value = true;
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const newPost: Post = {
        ...postData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likes: 0,
        commentsCount: 0,
        comments: [],
      };

      posts.value.unshift(newPost);
      return newPost;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to create post";
      return null;
    } finally {
      isLoading.value = false;
    }
  }

  async function updatePost(id: string, postData: Partial<Post>) {
    isLoading.value = true;
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const index = posts.value.findIndex((post) => post.id === id);
      if (index !== -1) {
        posts.value[index] = {
          ...posts.value[index],
          ...postData,
          updatedAt: new Date().toISOString(),
        };
        return posts.value[index];
      }
      return null;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to update post";
      return null;
    } finally {
      isLoading.value = false;
    }
  }

  async function deletePost(id: string) {
    isLoading.value = true;
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const index = posts.value.findIndex((post) => post.id === id);
      if (index !== -1) {
        posts.value.splice(index, 1);
        return true;
      }
      return false;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to delete post";
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  async function addComment(
    postId: string,
    comment: Omit<Comment, "id" | "createdAt">
  ) {
    isLoading.value = true;
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      const post = posts.value.find((p) => p.id === postId);
      if (post) {
        const newComment: Comment = {
          ...comment,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };

        if (!post.comments) {
          post.comments = [];
        }

        post.comments.push(newComment);
        post.commentsCount = post.comments.length;

        return newComment;
      }
      return null;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to add comment";
      return null;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    posts,
    isLoading,
    error,
    getPostById,
    getPostsByAuthor,
    getPostsByCategory,
    fetchPosts,
    fetchPostById,
    createPost,
    updatePost,
    deletePost,
    addComment,
  };
});
