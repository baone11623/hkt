<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-primary-600">404</h1>
      <h2 class="text-3xl font-semibold text-gray-900 mt-4">Page Not Found</h2>
      <p class="text-gray-600 mt-2 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div class="space-x-4">
        <router-link to="/" class="btn btn-primary">
          <Home class="w-5 h-5 mr-2" />
          Go Home
        </router-link>
        <button @click="goBack" class="btn btn-ghost">
          <ArrowLeft class="w-5 h-5 mr-2" />
          Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Home, ArrowLeft } from 'lucide-vue-next';

const router = useRouter();

function goBack() {
  router.back();
}
</script>