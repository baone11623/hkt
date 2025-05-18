<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">My Posts</h1>
      <router-link to="/dashboard/posts/create" class="btn btn-primary">
        <PenTool class="w-5 h-5 mr-2" />
        Create New Post
      </router-link>
    </div>

    <div v-if="isLoading" class="text-center py-12">
      <Loader2 class="w-12 h-12 mx-auto animate-spin text-primary-500" />
      <p class="mt-4 text-gray-600">Loading your posts...</p>
    </div>

    <div
      v-else-if="userPosts.length === 0"
      class="text-center py-12 bg-gray-50 rounded-lg"
    >
      <FileText class="w-16 h-16 mx-auto text-gray-300 mb-4" />
      <h2 class="text-xl font-semibold text-gray-700 mb-2">No Posts Yet</h2>
      <p class="text-gray-600 mb-6">
        Start sharing your knowledge with the community
      </p>
      <router-link to="/dashboard/posts/create" class="btn btn-primary">
        Create Your First Post
      </router-link>
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="post in userPosts"
        :key="post.id"
        class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
      >
        <div class="flex items-center">
          <div class="w-48 h-full bg-gray-100 flex-shrink-0">
            <img
              v-if="post.cover_image"
              :src="post.cover_image"
              :alt="post.title"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center text-gray-400"
            >
              <Image class="w-8 h-8" />
            </div>
          </div>

          <div class="flex-1 p-6">
            <div class="flex items-center justify-between mb-2">
              <h2 class="text-xl font-semibold">
                <router-link
                  :to="`/post/${post.id}`"
                  class="hover:text-primary-600 transition-colors"
                >
                  {{ post.title }}
                </router-link>
              </h2>
              <div class="flex space-x-2">
                <router-link
                  :to="`/dashboard/posts/edit/${post.id}`"
                  class="btn btn-ghost p-2"
                >
                  <Edit2 class="w-5 h-5" />
                </router-link>
                <button
                  @click="confirmDelete(post)"
                  class="btn btn-ghost p-2 text-red-500 hover:text-red-600"
                >
                  <Trash2 class="w-5 h-5" />
                </button>
              </div>
            </div>

            <p class="text-gray-600 mb-4 line-clamp-2">{{ post.excerpt }}</p>

            <div class="flex items-center text-sm text-gray-500">
              <Calendar class="w-4 h-4 mr-1" />
              <span>{{ formatDate(post.updated_at) }}</span>
              <span class="mx-2">•</span>
              <MessageSquare class="w-4 h-4 mr-1" />
              <span>{{ post.comments_count }} comments</span>
              <span class="mx-2">•</span>
              <Heart class="w-4 h-4 mr-1" />
              <span>{{ post.likes }} likes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { usePostsStore } from "../../stores/posts";
import { useUserStore } from "../../stores/user";
import {
  PenTool,
  FileText,
  Edit2,
  Trash2,
  Calendar,
  MessageSquare,
  Heart,
  Image,
  Loader2,
} from "lucide-vue-next";
import { formatDate } from "../../helper/formatDate";
import { api } from "../../helper/api";
const postsStore = usePostsStore();
const userStore = useUserStore();
const userPosts = ref<any[]>([]);
const isLoading = ref(true);

async function confirmDelete(post: any) {
  if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
    // await postsStore.deletePost(post.id);
    console.log("post.id :", post.id);
    await api.fetch(`post/delete/${post.id}`, "", "DELETE");
    userPosts.value = userPosts.value.filter((p) => p.id !== post.id);
  }
}

onMounted(async () => {
  if (userStore.currentUser) {
    await postsStore.fetchPosts();
    userPosts.value = postsStore.getPostsByAuthor(userStore.currentUser.id);
    console.log("userStore.currentUser.id :", userStore.currentUser.id);

    console.log("userPosts.value :", userPosts.value);
  }
  isLoading.value = false;
});
</script>
