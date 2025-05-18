<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <router-link to="/" class="inline-flex items-center justify-center">
          <BookOpen class="h-10 w-10 text-primary-600" />
        </router-link>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Or
          <router-link
            to="/auth/register"
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            create a new account
          </router-link>
        </p>
      </div>

      <div class="mt-8">
        <div
          v-if="error"
          class="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm"
        >
          {{ error }}
        </div>

        <form class="space-y-6" @submit.prevent="login">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                v-model="email"
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="input w-full"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div class="mt-1">
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="input w-full"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-primary-600 hover:text-primary-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="w-full btn btn-primary py-3"
              :disabled="isLoading"
            >
              <Loader2 v-if="isLoading" class="h-5 w-5 animate-spin" />
              <span v-else>Sign in</span>
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-gray-50 text-gray-500">
                Demo credentials
              </span>
            </div>
          </div>
          <div class="mt-4 text-sm text-center text-gray-600">
            Email: user@example.com | Password: password
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { BookOpen, Loader2 } from "lucide-vue-next";
import { useUserStore } from "../../stores/user";

// State
const email = ref("");
const password = ref("");

// Store and router
const userStore = useUserStore();
const router = useRouter();

// Computed
const isLoading = computed(() => userStore.isLoading);
const error = computed(() => userStore.error);

// Methods
async function login() {
  const res = await userStore.login(email.value, password.value);
  if (res) {
    router.push("/dashboard");
  }
}
</script>
