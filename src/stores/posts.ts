import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

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
  authorId: string;
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

export const usePostsStore = defineStore('posts', () => {
  // State
  const posts = ref<Post[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  
  // Mock data for demo purposes
  const mockPosts: Post[] = [
    {
      id: '1',
      title: 'Getting Started with Vue 3 Composition API',
      content: '<p>Vue 3 Composition API provides a set of additive, function-based APIs that allow flexible composition of component logic. In this article, we explore how to use it effectively.</p><h2>Why Composition API?</h2><p>The Composition API addresses some limitations of the Options API when it comes to reusing logic across components and organizing code in larger applications.</p><h2>Basic Usage</h2><p>Here\'s a simple example:</p><pre><code>import { ref, computed } from \'vue\';\n\nexport default {\n  setup() {\n    const count = ref(0);\n    const doubleCount = computed(() => count.value * 2);\n    \n    function increment() {\n      count.value++;\n    }\n    \n    return {\n      count,\n      doubleCount,\n      increment\n    };\n  }\n};</code></pre><p>This approach allows for better organization of related code.</p>',
      excerpt: 'Vue 3 Composition API provides a set of additive, function-based APIs that allow flexible composition of component logic. In this article, we explore how to use it effectively.',
      coverImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      authorId: '1',
      authorName: 'John Doe',
      createdAt: '2023-08-15T10:30:00Z',
      updatedAt: '2023-08-15T10:30:00Z',
      categories: ['Programming', 'Vue.js', 'Frontend'],
      tags: ['vue3', 'composition-api', 'javascript'],
      readTime: 8,
      likes: 24,
      commentsCount: 5,
      comments: [
        {
          id: '1',
          postId: '1',
          userId: '2',
          username: 'Jane Smith',
          content: 'Great article! This helped me understand the Composition API much better.',
          createdAt: '2023-08-15T14:25:00Z'
        },
        {
          id: '2',
          postId: '1',
          userId: '3',
          username: 'Mike Johnson',
          content: 'I\'m still not convinced that Composition API is better than Options API for smaller projects. Any thoughts on this?',
          createdAt: '2023-08-16T09:12:00Z'
        }
      ]
    },
    {
      id: '2',
      title: 'Building Responsive Layouts with Tailwind CSS',
      content: '<p>Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML. This article explores how to create responsive layouts using Tailwind.</p><h2>The Power of Utility Classes</h2><p>Tailwind provides low-level utility classes that let you build completely custom designs without ever leaving your HTML.</p>',
      excerpt: 'Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML.',
      coverImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      authorId: '2',
      authorName: 'Jane Smith',
      createdAt: '2023-08-10T15:45:00Z',
      updatedAt: '2023-08-11T09:20:00Z',
      categories: ['CSS', 'Web Design', 'Frontend'],
      tags: ['tailwindcss', 'responsive-design', 'css-framework'],
      readTime: 6,
      likes: 18,
      commentsCount: 3,
      comments: []
    },
    {
      id: '3',
      title: 'State Management Patterns in Modern JavaScript Applications',
      content: '<p>State management is a critical aspect of building complex JavaScript applications. This article explores different patterns and libraries for managing state effectively.</p>',
      excerpt: 'State management is a critical aspect of building complex JavaScript applications. This article explores different patterns and libraries for managing state effectively.',
      coverImage: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      authorId: '3',
      authorName: 'Mike Johnson',
      createdAt: '2023-08-05T08:15:00Z',
      updatedAt: '2023-08-05T08:15:00Z',
      categories: ['JavaScript', 'Architecture', 'Frontend'],
      tags: ['state-management', 'vuex', 'pinia', 'redux'],
      readTime: 12,
      likes: 32,
      commentsCount: 7,
      comments: []
    }
  ];
  
  // Initialize with mock data
  posts.value = mockPosts;
  
  // Getters
  const getPostById = computed(() => {
    return (id: string) => posts.value.find(post => post.id === id);
  });
  
  const getPostsByAuthor = computed(() => {
    return (authorId: string) => posts.value.filter(post => post.authorId === authorId);
  });
  
  const getPostsByCategory = computed(() => {
    return (category: string) => posts.value.filter(post => 
      post.categories.map(c => c.toLowerCase()).includes(category.toLowerCase())
    );
  });
  
  // Actions
  async function fetchPosts() {
    isLoading.value = true;
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      // We're using mock data, so no need to do anything here
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch posts';
    } finally {
      isLoading.value = false;
    }
  }
  
  async function fetchPostById(id: string) {
    isLoading.value = true;
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 300));
      return getPostById.value(id);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch post';
      return null;
    } finally {
      isLoading.value = false;
    }
  }
  
  async function createPost(postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'commentsCount' | 'comments'>) {
    isLoading.value = true;
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newPost: Post = {
        ...postData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likes: 0,
        commentsCount: 0,
        comments: []
      };
      
      posts.value.unshift(newPost);
      return newPost;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create post';
      return null;
    } finally {
      isLoading.value = false;
    }
  }
  
  async function updatePost(id: string, postData: Partial<Post>) {
    isLoading.value = true;
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = posts.value.findIndex(post => post.id === id);
      if (index !== -1) {
        posts.value[index] = {
          ...posts.value[index],
          ...postData,
          updatedAt: new Date().toISOString()
        };
        return posts.value[index];
      }
      return null;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update post';
      return null;
    } finally {
      isLoading.value = false;
    }
  }
  
  async function deletePost(id: string) {
    isLoading.value = true;
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = posts.value.findIndex(post => post.id === id);
      if (index !== -1) {
        posts.value.splice(index, 1);
        return true;
      }
      return false;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete post';
      return false;
    } finally {
      isLoading.value = false;
    }
  }
  
  async function addComment(postId: string, comment: Omit<Comment, 'id' | 'createdAt'>) {
    isLoading.value = true;
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const post = posts.value.find(p => p.id === postId);
      if (post) {
        const newComment: Comment = {
          ...comment,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
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
      error.value = err instanceof Error ? err.message : 'Failed to add comment';
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
    addComment
  };
});