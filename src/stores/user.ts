import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { api } from "../helper/api";
import { toast } from "vue3-toastify";

interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
  score: number;
  token?: string;
}

export const useUserStore = defineStore("user", () => {
  // State
  const userRaw = localStorage.getItem("user");
  const currentUser = ref<User | null>(userRaw ? JSON.parse(userRaw) : null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const isAuthenticated = computed(() => !!currentUser.value);
  const userScore = computed(() => currentUser.value?.score || 0);
  const token = computed(() => currentUser.value?.token);

  // Actions
  function setUser(user: User | null) {
    currentUser.value = user;
  }

  async function login(email: string, password: string) {
    isLoading.value = true;
    error.value = null;

    try {
      const res = await api.fetch("login", {
        email,
        password,
      });
      if (!res.success) {
        toast.error(res.message);
      } else {
        console.log("res.data :", res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("token", res.token);
        setUser({
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
          createdAt: res.data.createdAt,
          score: res.data.score,
          token: res.token,
        });
      }
      return res.success;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "An error occurred";
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  async function register(username: string, email: string, password: string) {
    isLoading.value = true;
    error.value = null;

    try {
      const res = await api.fetch("register", {
        username,
        email,
        password,
        gender: "other",
      });
      if (!res.success) {
        toast.error(res.message);
      }
      return res.success;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "An error occurred";
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  async function addScore(amount: number) {
    if (currentUser.value) {
      // In a real app, this would be an API call
      currentUser.value.score += amount;
    }
  }

  async function updateProfile(userData: Partial<User>) {
    if (currentUser.value) {
      currentUser.value = { ...currentUser.value, ...userData };
    }
  }

  return {
    currentUser,
    isLoading,
    error,
    isAuthenticated,
    userScore,
    setUser,
    login,
    register,
    logout,
    addScore,
    updateProfile,
    token,
  };
});
