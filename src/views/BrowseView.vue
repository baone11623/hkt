<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Browse Posts</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Posts will be loaded here -->
      <p v-if="!posts.length" class="text-gray-500">No posts available.</p>
      <Card :posts="posts" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { usePostsStore } from "../stores/posts";
import Card from "../components/posts/Card.vue";

const postsStore = usePostsStore();
const posts = ref([]);

onMounted(async () => {
  try {
    await postsStore.fetchPosts();
    posts.value = postsStore.posts;
    console.log("posts.value  :", posts.value);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
});
</script>
