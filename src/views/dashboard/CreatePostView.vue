<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold">Create New Post</h1>
        <router-link
          to="/dashboard/posts"
          class="flex items-center text-gray-600 hover:text-gray-900"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Posts
        </router-link>
      </div>

      <div
        v-if="message.text"
        :class="[
          'p-4 mb-6 rounded',
          message.type === 'success'
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700',
        ]"
      >
        {{ message.text }}
      </div>

      <div class="space-y-6">
        <div>
          <label
            for="title"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            v-model="postData.title"
            type="text"
            id="title"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            v-model="postData.excerpt"
            id="excerpt"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            v-model="postData.content"
            id="content"
            rows="10"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
            placeholder="Write your post content here..."
            required
          ></textarea>
        </div>

        <div>
          <label
            for="cover_image"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Cover Image URL
          </label>
          <input
            v-model="postData.cover_image"
            type="url"
            id="cover_image"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Categories
            </label>
            <div class="space-y-2">
              <div
                v-for="category in categories"
                :key="category"
                class="flex items-center"
              >
                <input
                  type="checkbox"
                  :value="category"
                  v-model="postData.category"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span class="ml-2">{{ category }}</span>
              </div>
            </div>
          </div>

          <div>
            <label
              for="tags"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Tags
            </label>
            <div class="flex">
              <input
                v-model="tagsInput"
                type="text"
                id="tags"
                class="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter tags separated by commas"
                @keydown.enter.prevent="addTag"
              />
              <button
                type="button"
                @click="addTag"
                class="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-l-0 border-gray-300 rounded-r-md"
              >
                Add
              </button>
            </div>
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="tag in postData.tags"
                :key="tag"
                class="inline-flex items-center px-2 py-1 rounded-full text-sm bg-gray-100"
              >
                {{ tag }}
                <button
                  type="button"
                  class="ml-1 text-gray-500 hover:text-gray-700"
                  @click="removeTag(tag)"
                >
                  <svg
                    class="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-4">
          <router-link
            to="/dashboard/posts"
            class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            Cancel
          </router-link>
          <button
            type="button"
            @click="createPost"
            class="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting" class="flex items-center">
              <svg
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating...
            </span>
            <span v-else>Create Post</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/user";
import { api } from "../../helper/api";

const router = useRouter();
const userStore = useUserStore();

const categories = ref([
  "Technology",
  "Travel",
  "Food",
  "Lifestyle",
  "Business",
]);
const tagsInput = ref("");
const isSubmitting = ref(false);
const message = ref({ text: "", type: "" });

const postData = ref({
  title: "",
  content: "",
  excerpt: "",
  cover_image: "",
  author_id: userStore.currentUser?.id || "",
  author_name: userStore.currentUser?.username || "",
  category: [],
  tags: [],
});

function addTag() {
  if (!tagsInput.value.trim()) return;

  const tags = tagsInput.value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  postData.value.tags = [...new Set([...postData.value.tags, ...tags])];
  tagsInput.value = "";
}

function removeTag(tagToRemove) {
  postData.value.tags = postData.value.tags.filter(
    (tag) => tag !== tagToRemove
  );
}

async function createPost() {
  if (!validateForm()) return;

  isSubmitting.value = true;
  message.value = { text: "", type: "" };

  try {
    // Replace with your actual API call
    const response = await api.fetch("post/create", { ...postData.value });

    if (!response.success) {
      return;
    }

    message.value = { text: "Post created successfully!", type: "success" };

    // Navigate to posts list after successful creation
    setTimeout(() => {
      router.push("/dashboard/posts");
    }, 1000);
  } catch (error) {
    console.error("Error creating post:", error);
    message.value = {
      text: "Failed to create post. Please try again.",
      type: "error",
    };
  } finally {
    isSubmitting.value = false;
  }
}

function validateForm() {
  if (!postData.value.title) {
    message.value = { text: "Title is required", type: "error" };
    return false;
  }

  if (!postData.value.content) {
    message.value = { text: "Content is required", type: "error" };
    return false;
  }

  if (!postData.value.excerpt) {
    message.value = { text: "Excerpt is required", type: "error" };
    return false;
  }

  return true;
}

// Fetch categories from API on component mount
onMounted(async () => {
  try {
    // Uncomment and modify this to fetch your categories from API
    const response = await api.fetch("category/list");
    if (response.ok) {
      const data = await response.json();
      categories.value = data;
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
});
</script>
