<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div v-if="isLoading" class="text-center py-12">
        <Loader2 class="w-12 h-12 mx-auto animate-spin text-primary-500" />
        <p class="mt-4 text-gray-600">Loading post...</p>
      </div>

      <template v-else-if="post">
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-3xl font-bold">Edit Post</h1>
          <router-link to="/dashboard/posts" class="btn btn-ghost">
            <ArrowLeft class="w-5 h-5 mr-2" />
            Back to Posts
          </router-link>
        </div>

        <form @submit.prevent="updatePost" class="space-y-6">
          <div>
            <label
              for="title"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              v-model="post.title"
              type="text"
              id="title"
              class="input w-full"
              placeholder="Enter post title"
              required
            />
          </div>

          <div>
            <label
              for="excerpt"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Excerpt
            </label>
            <textarea
              v-model="post.excerpt"
              id="excerpt"
              rows="3"
              class="input w-full"
              placeholder="Brief description of your post"
              required
            ></textarea>
          </div>

          <div>
            <label
              for="content"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Content
            </label>
            <textarea
              v-model="post.content"
              id="content"
              rows="10"
              class="input w-full font-mono"
              placeholder="Write your post content here..."
              required
            ></textarea>
          </div>

          <div>
            <label
              for="coverImage"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Cover Image URL
            </label>
            <input
              v-model="post.coverImage"
              type="url"
              id="coverImage"
              class="input w-full"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Categories
              </label>
              <div class="space-y-2">
                <label
                  v-for="category in categories"
                  :key="category"
                  class="flex items-center"
                >
                  <input
                    type="checkbox"
                    :value="category"
                    v-model="post.categories"
                    class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span class="ml-2">{{ category }}</span>
                </label>
              </div>
            </div>

            <div>
              <label
                for="tags"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Tags
              </label>
              <input
                v-model="tagsInput"
                type="text"
                id="tags"
                class="input w-full"
                placeholder="Enter tags separated by commas"
                @keydown.enter.prevent="addTag"
              />
              <div class="mt-2 flex flex-wrap gap-2">
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="inline-flex items-center px-2 py-1 rounded-full text-sm bg-gray-100"
                >
                  {{ tag }}
                  <button
                    type="button"
                    class="ml-1 text-gray-500 hover:text-gray-700"
                    @click="removeTag(tag)"
                  >
                    <X class="w-3 h-3" />
                  </button>
                </span>
              </div>
            </div>
          </div> -->

          <div class="flex justify-end space-x-4">
            <router-link to="/dashboard/posts" class="btn btn-ghost">
              Cancel
            </router-link>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="isSubmitting"
            >
              <Loader2 v-if="isSubmitting" class="w-5 h-5 animate-spin mr-2" />
              <span>Update Post</span>
            </button>
          </div>
        </form>
      </template>

      <div v-else class="text-center py-12">
        <FileX class="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h2 class="text-xl font-semibold text-gray-700 mb-2">Post Not Found</h2>
        <p class="text-gray-600 mb-6">
          The post you're trying to edit doesn't exist or has been removed.
        </p>
        <router-link to="/dashboard/posts" class="btn btn-primary">
          Back to Posts
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePostsStore } from "../../stores/posts";
import { ArrowLeft, X, Loader2, FileX } from "lucide-vue-next";
import { api } from "../../helper/api";

const route = useRoute();
const router = useRouter();
const postsStore = usePostsStore();

const post = ref<any>({
  id: "",
  title: "",
  excerpt: "",
  content: "",
  coverImage: "",
  categories: [],
  tags: [],
});
const isLoading = ref(true);
const isSubmitting = ref(false);
const tagsInput = ref("");

const categories = [
  "Programming",
  "Web Design",
  "Frontend",
  "Backend",
  "JavaScript",
  "Vue.js",
  "React",
  "Node.js",
];

function addTag() {
  if (!post.value) return;
  const tags = tagsInput.value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  post.value.tags = [...new Set([...post.value.tags, ...tags])];
  tagsInput.value = "";
}

function removeTag(tagToRemove: string) {
  if (!post.value) return;
  post.value.tags = post.value.tags.filter(
    (tag: string) => tag !== tagToRemove
  );
}

async function updatePost() {
  if (!post.value) return;

  isSubmitting.value = true;
  console.log("Updating post:", post.value);
  try {
    await api.fetch("update/post", { ...post.value });
    router.push("/dashboard/posts");
  } catch (error) {
    console.error("Failed to update post:", error);
  } finally {
    isSubmitting.value = false;
  }
}

onMounted(async () => {
  const postId = route.params.id as string;
  try {
    const fetchedPost = await api.fetch(`post/${postId}`);
    const data = fetchedPost.data;
    console.log("fetchedPost :", fetchedPost);
    if (data) {
      Object.assign(post.value, {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.cover_image,
        categories: [data.category],
        tags: data.tags || [],
      });
      console.log("Fetched post:", post.value);
    }
  } catch (error) {
    console.error("Failed to fetch post:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>
