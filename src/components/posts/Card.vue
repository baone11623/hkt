<template>
  <div
    v-for="post in props.posts"
    :key="post.id"
    class="card overflow-hidden group"
  >
    <div class="h-48 w-full overflow-hidden mb-4">
      <img
        :src="post.cover_image"
        :alt="post.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div class="space-y-3 px-6 pb-6">
      <div class="flex items-center text-sm text-gray-500">
        <span>{{ formatDate(post.created_at) }}</span>
        <span class="mx-2">•</span>
        <span>{{ post.read_time }} min read</span>
      </div>
      <h3 class="text-xl font-semibold line-clamp-2">
        <router-link
          :to="`/post/${post.id}`"
          class="hover:text-primary-700 transition-colors"
        >
          {{ post.title }}
        </router-link>
      </h3>
      <p class="text-gray-600 line-clamp-3">
        {{ post.excerpt }}
      </p>
      <div class="pt-2 flex items-center justify-between">
        <div class="flex items-center">
          <div
            class="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700"
          >
            {{ post.author_name.charAt(0) }}
          </div>
          <span class="ml-2 text-sm font-medium">{{ post.author_name }}</span>
        </div>
        <div class="flex items-center text-sm text-gray-500">
          <MessageSquare class="w-4 h-4 mr-1" />
          {{ post.comments_count }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MessageSquare } from "lucide-vue-next";
import { formatDate } from "../../helper/formatDate";
const props = defineProps({
  posts: Array,
});
console.log("props.posts :", props.posts);
</script>

<style lang="scss" scoped></style>
