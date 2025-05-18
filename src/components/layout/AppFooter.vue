<template>
  <footer class="bg-gray-900 text-white pt-12 pb-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Logo and description -->
        <div class="md:col-span-1">
          <div class="flex items-center mb-4">
            <BookOpen class="w-8 h-8 text-primary-400" />
            <span class="text-xl font-bold ml-2">SenseLib</span>
          </div>
          <p class="text-gray-400 mb-4">
            A modern digital library platform for sharing knowledge and exploring new ideas.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <Twitter class="w-5 h-5" />
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <Facebook class="w-5 h-5" />
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <Instagram class="w-5 h-5" />
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <Linkedin class="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li><router-link to="/" class="text-gray-400 hover:text-white transition-colors">Home</router-link></li>
            <li><router-link to="/browse" class="text-gray-400 hover:text-white transition-colors">Browse</router-link></li>
            <li><router-link to="/dashboard" class="text-gray-400 hover:text-white transition-colors">Dashboard</router-link></li>
          </ul>
        </div>
        
        <!-- Categories -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Categories</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Programming</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Web Design</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Frontend</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">JavaScript</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Vue.js</a></li>
          </ul>
        </div>
        
        <!-- Help & Support -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Help & Support</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
        <p>&copy; {{ currentYear }} SenseLib. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { BookOpen, Twitter, Facebook, Instagram, Linkedin } from 'lucide-vue-next';

// Current year for copyright
const currentYear = computed(() => new Date().getFullYear());
</script>