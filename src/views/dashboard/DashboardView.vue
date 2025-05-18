<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p class="text-gray-600 mt-2">Welcome back, {{ username }}!</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="card border-l-4 border-primary-500">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
              <BookOpen class="w-6 h-6" />
            </div>
            <div>
              <p class="text-sm text-gray-500 uppercase font-medium">
                Total Posts
              </p>
              <p class="text-2xl font-semibold">{{ userPosts.length }}</p>
            </div>
          </div>
        </div>

        <div class="card border-l-4 border-secondary-500">
          <div class="flex items-center">
            <div
              class="p-3 rounded-full bg-secondary-100 text-secondary-600 mr-4"
            >
              <MessageSquare class="w-6 h-6" />
            </div>
            <div>
              <p class="text-sm text-gray-500 uppercase font-medium">
                Comments
              </p>
              <p class="text-2xl font-semibold">{{ totalComments }}</p>
            </div>
          </div>
        </div>

        <div class="card border-l-4 border-accent-500">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-accent-100 text-accent-600 mr-4">
              <Heart class="w-6 h-6" />
            </div>
            <div>
              <p class="text-sm text-gray-500 uppercase font-medium">
                Total Likes
              </p>
              <p class="text-2xl font-semibold">{{ totalLikes }}</p>
            </div>
          </div>
        </div>

        <div class="card border-l-4 border-purple-500">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <Activity class="w-6 h-6" />
            </div>
            <div>
              <p class="text-sm text-gray-500 uppercase font-medium">
                Score Balance
              </p>
              <p class="text-2xl font-semibold">{{ userScore }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity and Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div class="lg:col-span-2">
          <div class="card">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold">Recent Posts</h2>
              <router-link
                to="/dashboard/posts"
                class="text-sm text-primary-600 hover:text-primary-700"
              >
                View All
              </router-link>
            </div>

            <div
              v-if="userPosts.length === 0"
              class="text-gray-500 text-center py-8"
            >
              <BookOpen class="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p>You haven't created any posts yet.</p>
              <router-link
                to="/dashboard/posts/create"
                class="btn btn-primary mt-4"
              >
                Create Your First Post
              </router-link>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="post in recentPosts"
                :key="post.id"
                class="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0"
              >
                <div
                  class="h-16 w-16 mr-4 bg-gray-200 rounded overflow-hidden flex-shrink-0"
                >
                  <img
                    v-if="post.coverImage"
                    :src="post.coverImage"
                    :alt="post.title"
                    class="h-full w-full object-cover"
                  />
                  <div
                    v-else
                    class="h-full w-full flex items-center justify-center bg-primary-100 text-primary-600"
                  >
                    <FileText class="w-8 h-8" />
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-medium text-gray-900 truncate">
                    <router-link
                      :to="`/post/${post.id}`"
                      class="hover:text-primary-700"
                    >
                      {{ post.title }}
                    </router-link>
                  </h3>
                  <p class="text-gray-500 text-sm mt-1 line-clamp-1">
                    {{ post.excerpt }}
                  </p>
                  <div class="flex items-center text-xs text-gray-500 mt-2">
                    <span>{{ formatDate(post.updatedAt) }}</span>
                    <span class="mx-2">•</span>
                    <span>{{ post.commentsCount }} comments</span>
                  </div>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <router-link
                    :to="`/dashboard/posts/edit/${post.id}`"
                    class="text-gray-400 hover:text-primary-600"
                  >
                    <Edit class="w-5 h-5" />
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="card mb-6">
            <h2 class="text-xl font-semibold mb-4">Quick Actions</h2>
            <div class="space-y-3">
              <router-link
                to="/dashboard/posts/create"
                class="btn btn-primary w-full justify-start"
              >
                <PenTool class="w-5 h-5 mr-2" />
                Create New Post
              </router-link>
              <router-link
                to="/dashboard/scores"
                class="btn btn-secondary w-full justify-start"
              >
                <CreditCard class="w-5 h-5 mr-2" />
                Recharge Score
              </router-link>
              <router-link
                to="/dashboard/profile"
                class="btn btn-ghost w-full justify-start"
              >
                <UserCircle class="w-5 h-5 mr-2" />
                Update Profile
              </router-link>
            </div>
          </div>

          <div class="card">
            <h2 class="text-xl font-semibold mb-4">Score Balance</h2>
            <div class="text-center py-4">
              <div class="text-4xl font-bold text-primary-700">
                {{ userScore }}
              </div>
              <p class="text-gray-500 mt-1">Available Points</p>
            </div>
            <div class="border-t border-gray-100 pt-4">
              <router-link
                to="/dashboard/scores"
                class="text-center block text-primary-600 hover:text-primary-700"
              >
                Add More Points
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "../../stores/user";
import { usePostsStore } from "../../stores/posts";
import {
  BookOpen,
  MessageSquare,
  Heart,
  Activity,
  FileText,
  Edit,
  PenTool,
  CreditCard,
  UserCircle,
} from "lucide-vue-next";
import { formatDate } from "../../helper/formatDate";
import { useRouter } from "vue-router";

const router = useRouter();

// Stores
const userStore = useUserStore();
const postsStore = usePostsStore();

// Computed
const username = computed(() => userStore.currentUser?.username || "User");
const userScore = computed(() => userStore.userScore);
const userPosts = ref<any[]>([]);
const recentPosts = computed(() => userPosts.value.slice(0, 3));

const totalComments = computed(() => {
  return userPosts.value.reduce((total, post) => total + post.commentsCount, 0);
});

const totalLikes = computed(() => {
  return userPosts.value.reduce((total, post) => total + post.likes, 0);
});

// Lifecycle
onMounted(async () => {
  if (!userStore.isAuthenticated) {
    router.push("/auth/login");
    return;
  }
  await postsStore.fetchPosts();

  // Get posts by current user
  if (userStore.currentUser) {
    const authorId = userStore.currentUser.id;
    userPosts.value = postsStore.getPostsByAuthor.value(authorId);
  }
});
</script>

<style scoped>
.card {
  @apply p-6;
}
</style>
