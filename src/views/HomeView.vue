<template>
  <div>
    <!-- Hero Section -->
    <section
      class="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20"
    >
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Discover, Learn, and Share Knowledge
          </h1>
          <p class="text-lg md:text-xl mb-8 text-primary-100 text-white">
            SenseLib is a digital library platform that helps you find, manage,
            and share valuable content.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <router-link
              to="/browse"
              class="btn bg-white text-primary-800 hover:bg-primary-600 hover:text-white"
            >
              Browse Library
            </router-link>
            <router-link
              to="/auth/register"
              class="btn bg-primary-600 text-white hover:bg-primary-500 border border-primary-500"
            >
              Join SenseLib
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">
          Why Choose SenseLib
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card">
            <div class="mb-4 text-primary-600">
              <BookOpen class="w-10 h-10" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Extensive Collection</h3>
            <p class="text-gray-600">
              Access a vast collection of high-quality content across various
              topics and categories.
            </p>
          </div>

          <div class="card">
            <div class="mb-4 text-secondary-600">
              <Users class="w-10 h-10" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Community Engagement</h3>
            <p class="text-gray-600">
              Join discussions, leave comments, and connect with like-minded
              individuals.
            </p>
          </div>

          <div class="card">
            <div class="mb-4 text-accent-500">
              <PenTool class="w-10 h-10" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Contribute Content</h3>
            <p class="text-gray-600">
              Share your knowledge by publishing your own content and receiving
              feedback.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Posts Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between mb-10">
          <h2 class="text-3xl font-bold">Recent Publications</h2>
          <router-link
            to="/browse"
            class="text-primary-600 font-medium hover:text-primary-700"
          >
            View All <ArrowRight class="w-4 h-4 inline-block ml-1" />
          </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card :posts="recentPosts" />
        </div>
      </div>
    </section>

    <!-- Subscribe Section -->
    <section
      class="py-16 bg-gradient-to-br from-secondary-800 to-secondary-600 text-white"
    >
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-4">Stay Updated</h2>
          <p class="text-secondary-100 mb-8">
            Subscribe to our newsletter to get the latest updates and new
            content notifications.
          </p>
          <form
            @submit.prevent="subscribeToNewsletter"
            class="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto"
          >
            <input
              v-model="email"
              type="email"
              placeholder="Your email address"
              class="input text-gray-800 flex-1"
              required
            />
            <button
              type="submit"
              class="btn bg-white text-secondary-700 hover:bg-gray-100 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { usePostsStore } from "../stores/posts";
import { BookOpen, Users, PenTool, ArrowRight } from "lucide-vue-next";
import Card from "../components/posts/Card.vue";

const email = ref("");
const postsStore = usePostsStore();

const recentPosts = ref(postsStore.posts.slice(0, 3));

function subscribeToNewsletter() {
  alert(`Thank you for subscribing with ${email.value}!`);
  email.value = "";
}

// Lifecycle
onMounted(async () => {
  await postsStore.fetchPosts();
  recentPosts.value = postsStore.posts.slice(0, 3);
});
</script>
