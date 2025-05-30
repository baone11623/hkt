<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Profile Settings</h1>

      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <!-- Profile Header -->
        <div class="bg-primary-600 px-6 py-16 relative">
          <div
            class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
          >
            <div class="w-24 h-24 rounded-full bg-white p-1">
              <div
                class="w-full h-full rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-3xl font-bold"
              >
                {{ userInitial }}
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Form -->
        <div class="px-6 pt-16 pb-6">
          <form @submit.prevent="updateProfile" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  for="username"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username
                </label>
                <input
                  v-model="profileData.username"
                  type="text"
                  id="username"
                  class="input w-full"
                  required
                />
              </div>

              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  v-model="profileData.email"
                  type="email"
                  id="email"
                  class="input w-full"
                  required
                />
              </div>
            </div>

            <div>
              <label
                for="bio"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Bio
              </label>
              <textarea
                v-model="profileData.bio"
                id="bio"
                rows="4"
                class="input w-full"
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  for="location"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location
                </label>
                <input
                  v-model="profileData.location"
                  type="text"
                  id="location"
                  class="input w-full"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label
                  for="website"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Website
                </label>
                <input
                  v-model="profileData.website"
                  type="url"
                  id="website"
                  class="input w-full"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div class="border-t border-gray-200 pt-6">
              <h3 class="text-lg font-semibold mb-4">Social Links</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    for="twitter"
                    class="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Twitter
                  </label>
                  <div class="flex">
                    <span
                      class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500"
                    >
                      @
                    </span>
                    <input
                      v-model="profileData.social.twitter"
                      type="text"
                      id="twitter"
                      class="input rounded-l-none w-full"
                      placeholder="username"
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="github"
                    class="block text-sm font-medium text-gray-700 mb-1"
                  >
                    GitHub
                  </label>
                  <div class="flex">
                    <span
                      class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500"
                    >
                      github.com/
                    </span>
                    <input
                      v-model="profileData.social.github"
                      type="text"
                      id="github"
                      class="input rounded-l-none w-full"
                      placeholder="username"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-end space-x-4">
              <button type="button" class="btn btn-ghost" @click="resetForm">
                Reset
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="isSubmitting"
              >
                <Loader2
                  v-if="isSubmitting"
                  class="w-5 h-5 animate-spin mr-2"
                />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useUserStore } from "../../stores/user";
import { Loader2 } from "lucide-vue-next";

const userStore = useUserStore();
const isSubmitting = ref(false);
console.log("isSubmitting :", isSubmitting);

const userInitial = computed(() => {
  const username = userStore.currentUser?.username || "";
  return username.charAt(0).toUpperCase();
});

const profileData = ref({
  username: userStore.currentUser?.username || "",
  email: userStore.currentUser?.email || "",
  bio: "",
  location: "",
  website: "",
  social: {
    twitter: "",
    github: "",
  },
  emailPreferences: {
    newsletter: true,
    notifications: true,
  },
});

async function updateProfile() {
  if (!profileData.value.username.trim() || !profileData.value.email.trim()) {
    console.log("Please fill in all fields");
    return;
  }

  isSubmitting.value = true;
  try {
    const success = await userStore.updateProfile({
      username: profileData.value.username,
      email: profileData.value.email,
    });

    if (success) {
      profileData.value.username = userStore.currentUser?.username || "";
      profileData.value.email = userStore.currentUser?.email || "";
    }
  } catch (err) {
    console.error("Failed to update profile:", err);
  } finally {
    isSubmitting.value = false;
  }
}
function resetForm() {
  profileData.value = {
    username: userStore.currentUser?.username || "",
    email: userStore.currentUser?.email || "",
    bio: "",
    location: "",
    website: "",
    social: {
      twitter: "",
      github: "",
    },
    emailPreferences: {
      newsletter: true,
      notifications: true,
    },
  };
}

function confirmDeleteAccount() {
  const confirmed = confirm(
    "Are you sure you want to delete your account? This action cannot be undone."
  );
  if (confirmed) {
    // In a real app, this would call an API to delete the account
    alert("Account deletion would be processed here.");
  }
}
</script>
