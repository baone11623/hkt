<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold">Create New Post</h1>
        <router-link to="/dashboard/posts" class="btn btn-ghost">
          <ArrowLeft class="w-5 h-5 mr-2" />
          Back to Posts
        </router-link>
      </div>

      <form @submit.prevent="createPost" class="space-y-6">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            v-model="postData.title"
            type="text"
            id="title"
            class="input w-full"
            placeholder="Enter post title"
            required
          />
        </div>

        <div>
          <label for="excerpt" class="block text-sm font-medium text-gray-700 mb-1">
            Excerpt
          </label>
          <textarea
            v-model="postData.excerpt"
            id="excerpt"
            rows="3"
            class="input w-full"
            placeholder="Brief description of your post"
            required
          ></textarea>
        </div>

        <div>
          <label for="content" class="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            v-model="postData.content"
            id="content"
            rows="10"
            class="input w-full font-mono"
            placeholder="Write your post content here..."
            required
          ></textarea>
        </div>

        <div>
          <label for="coverImage" class="block text-sm font-medium text-gray-700 mb-1">
            Cover Image URL
          </label>
          <input
            v-model="postData.coverImage"
            type="url"
            id="coverImage"
            class="input w-full"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Categories
            </label>
            <div class="space-y-2">
              <label v-for="category in categories" :key="category" class="flex items-center">
                <input
                  type="checkbox"
                  :value="category"
                  v-model="postData.categories"
                  class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span class="ml-2">{{ category }}</span>
              </label>
            </div>
          </div>

          <div>
            <label for="tags" class="block text-sm font-medium text-gray-700 mb-1">
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
                  <X class="w-3 h-3" />
                </button>
              </span>
            </div>
          </div>
        </div>

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
            <span>Create Post</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePostsStore } from '../../stores/posts';
import { useUserStore } from '../../stores/user';
import { ArrowLeft, X, Loader2 } from 'lucide-vue-next';

const router = useRouter();
const postsStore = usePostsStore();
const userStore = useUserStore();

const categories = [
  'Programming',
  'Web Design',
  'Frontend',
  'Backend',
  'JavaScript',
  'Vue.js',
  'React',
  'Node.js'
];

const postData = ref({
  title: '',
  content: '',
  excerpt: '',
  coverImage: '',
  authorId: userStore.currentUser?.id || '',
  authorName: userStore.currentUser?.username || '',
  categories: [],
  tags: []
});

const tagsInput = ref('');
const isSubmitting = ref(false);

function addTag() {
  const tags = tagsInput.value.split(',').map(tag => tag.trim()).filter(Boolean);
  postData.value.tags = [...new Set([...postData.value.tags, ...tags])];
  tagsInput.value = '';
}

function removeTag(tagToRemove: string) {
  postData.value.tags = postData.value.tags.filter(tag => tag !== tagToRemove);
}

async function createPost() {
  if (!userStore.currentUser) return;
  
  isSubmitting.value = true;
  try {
    const newPost = await postsStore.createPost(postData.value);
    if (newPost) {
      router.push('/dashboard/posts');
    }
  } catch (error) {
    console.error('Failed to create post:', error);
  } finally {
    isSubmitting.value = false;
  }
}
</script>