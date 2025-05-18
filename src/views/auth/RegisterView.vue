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
          Create your account
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Or
          <router-link
            to="/auth/login"
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            sign in to existing account
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

        <form class="space-y-6" @submit.prevent="register">
          <div>
            <label
              for="username"
              class="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div class="mt-1">
              <input
                v-model="username"
                id="username"
                name="username"
                type="text"
                required
                class="input w-full"
                placeholder="johndoe"
              />
            </div>
          </div>

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
                required
                class="input w-full"
                placeholder="••••••••"
              />
            </div>
            <p class="mt-1 text-xs text-gray-500">
              Must be at least 8 characters and include a number and a special
              character
            </p>
          </div>

          <div>
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div class="mt-1">
              <input
                v-model="confirmPassword"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                class="input w-full"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div class="flex items-center">
            <input
              v-model="agreeToTerms"
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              required
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label for="agree-terms" class="ml-2 block text-sm text-gray-900">
              I agree to the
              <a
                href="#"
                class="font-medium text-primary-600 hover:text-primary-500"
              >
                Terms of Service
              </a>
              and
              <a
                href="#"
                class="font-medium text-primary-600 hover:text-primary-500"
              >
                Privacy Policy
              </a>
            </label>
          </div>

          <div>
            <button
              type="submit"
              class="w-full btn btn-primary py-3"
              :disabled="isLoading"
            >
              <Loader2 v-if="isLoading" class="h-5 w-5 animate-spin" />
              <span v-else>Create Account</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { BookOpen, Loader2 } from "lucide-vue-next";
import { useUserStore } from "../../stores/user";
import { toast } from "vue3-toastify";

// State
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const agreeToTerms = ref(false);
const formErrors = ref<string[]>([]);

// Store and router
const userStore = useUserStore();
const router = useRouter();

// Computed
const isLoading = computed(() => userStore.isLoading);
const error = computed(() => userStore.error);
const isFormValid = computed(() => {
  if (
    !username.value ||
    !email.value ||
    !password.value ||
    !confirmPassword.value ||
    !agreeToTerms.value
  ) {
    return false;
  }

  if (password.value !== confirmPassword.value) {
    toast.error("Passwords do not match");
    return false;
  }

  return true;
});

// Methods
async function register() {
  if (!isFormValid.value) {
    console.log("form is not valid");
    return;
  }
  if (password.value.length < 8) {
    toast.error("Password must be at least 8 characters");
    return;
  }
  const success = await userStore.register(
    username.value,
    email.value,
    password.value
  );
  if (success) {
    router.push("/auth/login");
  }
}
</script>
