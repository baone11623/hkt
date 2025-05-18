<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <BookOpen class="w-8 h-8 text-primary-600" />
            <span class="text-xl font-bold text-primary-800">SenseLib</span>
          </router-link>
        </div>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link 
            v-for="item in navItems" 
            :key="item.path" 
            :to="item.path"
            class="text-gray-600 hover:text-primary-700 font-medium transition-colors"
            active-class="text-primary-700 font-semibold"
          >
            {{ item.name }}
          </router-link>
        </nav>
        
        <!-- Auth/User Actions -->
        <div class="flex items-center space-x-4">
          <button 
            v-if="isAuthenticated"
            class="flex items-center text-gray-600 hover:text-primary-700"
            @click="toggleUserMenu"
          >
            <span class="hidden md:inline-block mr-2">{{ userStore.currentUser?.username }}</span>
            <div class="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
              {{ userInitial }}
            </div>
          </button>
          
          <template v-else>
            <router-link 
              to="/auth/login"
              class="hidden md:inline-flex btn btn-ghost"
            >
              Log In
            </router-link>
            <router-link 
              to="/auth/register"
              class="btn btn-primary"
            >
              Sign Up
            </router-link>
          </template>
          
          <!-- Mobile menu button -->
          <button 
            class="md:hidden text-gray-600"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <!-- User dropdown menu -->
      <div 
        v-if="isUserMenuOpen && isAuthenticated" 
        class="absolute right-4 top-16 w-48 bg-white rounded-md shadow-lg py-1 z-50"
      >
        <div class="px-4 py-2 text-sm text-gray-500">
          {{ userStore.currentUser?.score }} Points
        </div>
        <div class="border-t border-gray-100"></div>
        <router-link 
          v-for="item in userMenuItems"
          :key="item.path"
          :to="item.path"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          @click="isUserMenuOpen = false"
        >
          {{ item.name }}
        </router-link>
        <div class="border-t border-gray-100"></div>
        <button 
          class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          @click="logout"
        >
          Log Out
        </button>
      </div>
      
      <!-- Mobile menu -->
      <div 
        v-if="isMobileMenuOpen" 
        class="md:hidden mt-3 py-3 border-t border-gray-100"
      >
        <div class="space-y-2">
          <router-link 
            v-for="item in navItems" 
            :key="item.path" 
            :to="item.path"
            class="block py-2 text-gray-600 hover:text-primary-700"
            active-class="text-primary-700 font-semibold"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </router-link>
          
          <div v-if="isAuthenticated" class="pt-2 mt-2 border-t border-gray-100">
            <div class="text-xs text-gray-500 mb-2">ACCOUNT</div>
            <router-link 
              v-for="item in userMenuItems" 
              :key="item.path" 
              :to="item.path"
              class="block py-2 text-gray-600 hover:text-primary-700"
              @click="isMobileMenuOpen = false"
            >
              {{ item.name }}
            </router-link>
            <button 
              class="block w-full text-left py-2 text-red-600"
              @click="logout"
            >
              Log Out
            </button>
          </div>
          
          <div v-else class="pt-2 mt-2 border-t border-gray-100 flex space-x-4">
            <router-link 
              to="/auth/login"
              class="btn btn-ghost"
              @click="isMobileMenuOpen = false"
            >
              Log In
            </router-link>
            <router-link 
              to="/auth/register"
              class="btn btn-primary"
              @click="isMobileMenuOpen = false"
            >
              Sign Up
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { BookOpen, Menu, X } from 'lucide-vue-next';
import { useUserStore } from '../../stores/user';
import { onClickOutside } from '@vueuse/core';

const router = useRouter();
const userStore = useUserStore();

// State
const isMobileMenuOpen = ref(false);
const isUserMenuOpen = ref(false);

// Navigation items
const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Browse', path: '/browse' },
  { name: 'Dashboard', path: '/dashboard', requiresAuth: true }
];

// User menu items
const userMenuItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'My Posts', path: '/dashboard/posts' },
  { name: 'Score Management', path: '/dashboard/scores' },
  { name: 'Profile Settings', path: '/dashboard/profile' }
];

// Computed properties
const isAuthenticated = computed(() => userStore.isAuthenticated);
const userInitial = computed(() => {
  const username = userStore.currentUser?.username || '';
  return username.charAt(0).toUpperCase();
});

// Methods
function toggleUserMenu() {
  isUserMenuOpen.value = !isUserMenuOpen.value;
}

function logout() {
  userStore.logout();
  isUserMenuOpen.value = false;
  isMobileMenuOpen.value = false;
  router.push('/');
}

// Close mobile menu on route change
watch(
  () => router.currentRoute.value.path,
  () => {
    isMobileMenuOpen.value = false;
    isUserMenuOpen.value = false;
  }
);

// Close user menu when clicking outside
const menuRef = ref(null);
onClickOutside(menuRef, () => {
  isUserMenuOpen.value = false;
});
</script>