<template>
  <div class="bg-white min-h-screen pb-12">
    <div v-if="isLoading" class="container mx-auto px-4 py-16 text-center">
      <Loader2 class="w-12 h-12 mx-auto animate-spin text-primary-500" />
      <p class="mt-4 text-gray-600">Loading post...</p>
    </div>

    <template v-else-if="post">
      <!-- Hero section with cover image -->
      <div
        class="w-full h-60 sm:h-80 md:h-96 bg-cover bg-center relative"
        :style="{ backgroundImage: `url(${post.cover_image})` }"
      >
        <div class="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      <div class="container mx-auto px-4">
        <!-- Article header -->
        <div class="max-w-4xl mx-auto -mt-16 relative z-10">
          <div class="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
            <div class="flex items-center text-sm text-gray-500 mb-4">
              <!-- <span>{{ formatDate(post.created_at) }}</span> -->
              <span class="mx-2">•</span>
              <span>{{ post.read_time }} min read</span>
            </div>

            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {{ post.title }}
            </h1>

            <div class="flex items-center">
              <div
                class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 mr-3"
              >
                {{ post.author_name.charAt(0) }}
              </div>
              <div>
                <div class="font-medium">{{ post.author_name }}</div>
                <div class="text-sm text-gray-500">Author</div>
              </div>

              <div class="ml-auto flex space-x-3">
                <button
                  class="flex items-center text-gray-500 hover:text-primary-600 transition-colors"
                >
                  <Heart class="w-5 h-5 mr-1" />
                  <span>{{ post.likes }}</span>
                </button>
                <button
                  class="flex items-center text-gray-500 hover:text-primary-600 transition-colors"
                >
                  <Share2 class="w-5 h-5 mr-1" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Article content -->
        <div class="max-w-4xl mx-auto mt-8">
          <div class="prose prose-lg mx-auto">
            <div v-html="post.content"></div>
          </div>

          <div class="mt-10 pt-8 border-t border-gray-100">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="inline-flex px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                #{{ tag }}
              </span>
            </div>
          </div>

          <!-- Comments section -->
          <div class="mt-12">
            <h3 class="text-2xl font-bold mb-6">
              Comments ({{ post.comments_count }})
            </h3>

            <!-- Comment form -->
            <div v-if="isAuthenticated" class="bg-gray-50 p-4 rounded-lg mb-8">
              <h4 class="text-lg font-medium mb-3">Leave a comment</h4>
              <textarea
                v-model="newComment"
                rows="3"
                class="input w-full"
                placeholder="Write your comment here..."
              ></textarea>
              <div class="mt-3 flex justify-end">
                <button
                  @click="submitComment"
                  class="btn btn-primary"
                  :disabled="!newComment.trim() || isSubmittingComment"
                >
                  <Loader2
                    v-if="isSubmittingComment"
                    class="w-4 h-4 animate-spin mr-2"
                  />
                  <span>Post Comment</span>
                </button>
              </div>
            </div>

            <div v-else class="bg-gray-50 p-4 rounded-lg mb-8 text-center">
              <p class="text-gray-700 mb-3">
                You need to be logged in to comment.
              </p>
              <router-link to="/auth/login" class="btn btn-primary"
                >Log In to Comment</router-link
              >
            </div>

            <!-- Comments list -->
            <div
              v-if="post.comments && post.comments.length > 0"
              class="space-y-6"
            >
              <div
                v-for="comment in post.comments"
                :key="comment.id"
                class="bg-white p-4 rounded-lg border border-gray-100"
              >
                <div class="flex items-center mb-3">
                  <div
                    class="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 mr-2"
                  >
                    {{ comment.username.charAt(0) }}
                  </div>
                  <div>
                    <div class="font-medium">{{ comment.username }}</div>
                    <div class="text-xs text-gray-500">
                      <!-- {{ formatDate(comment.created_at) }} -->
                    </div>
                  </div>
                </div>
                <p class="text-gray-700">{{ comment.content }}</p>
              </div>
            </div>

            <div v-else class="text-gray-500 text-center py-6">
              <MessageSquare class="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div v-else class="container mx-auto px-4 py-16 text-center">
      <FileX class="w-16 h-16 mx-auto text-gray-300 mb-3" />
      <h2 class="text-2xl font-bold text-gray-700 mb-2">Post Not Found</h2>
      <p class="text-gray-600 mb-6">
        The post you're looking for doesn't exist or has been removed.
      </p>
      <router-link to="/" class="btn btn-primary">Back to Home</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePostsStore } from "../stores/posts";
import { useUserStore } from "../stores/user";
import { Heart, Share2, MessageSquare, Loader2, FileX } from "lucide-vue-next";
import { api } from "../helper/api";
import { formatDate } from "../helper/formatDate";

// Route and stores
const route = useRoute();
const router = useRouter();
const postsStore = usePostsStore();
const userStore = useUserStore();

// State
const post = ref<any>(null);
const isLoading = ref(true);
const newComment = ref("");
const isSubmittingComment = ref(false);

// Computed
const isAuthenticated = computed(() => userStore.isAuthenticated);

async function submitComment() {
  if (!userStore.currentUser || !newComment.value.trim()) return;

  isSubmittingComment.value = true;

  const comment = {
    postId: post.value.id,
    userId: userStore.currentUser.id,
    username: userStore.currentUser.username,
    content: newComment.value.trim(),
  };

  try {
    await postsStore.addComment(post.value.id, comment);
    newComment.value = "";
    // Refresh post to get updated comments
    post.value = await postsStore.fetchPostById(route.params.id as string);
  } catch (error) {
    console.error("Failed to submit comment", error);
  } finally {
    isSubmittingComment.value = false;
  }
}

onMounted(async () => {
  isLoading.value = true;
  try {
    const postId = route.params.id as string;
    const fetchedPost = await api.fetch(`post/${postId}`); // ✅ Sử dụng hàm api.fetch

    if (fetchedPost) {
      post.value = fetchedPost.data;
    } else {
      console.error("Post not found");
    }
  } catch (error) {
    console.error("Error fetching post", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.prose {
  @apply max-w-none;
}

.prose h2 {
  @apply text-2xl font-bold mt-8 mb-4;
}

.prose p {
  @apply mb-6;
}

.prose pre {
  @apply bg-gray-50 p-4 rounded-lg overflow-x-auto;
}

.prose code {
  @apply font-mono text-sm;
}
</style>
