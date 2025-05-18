import { createRouter, createWebHistory } from "vue-router";

// Define routes
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/browse",
    name: "Browse",
    component: () => import("../views/BrowseView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/post/:id",
    name: "PostDetail",
    component: () => import("../views/PostDetailView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/auth/login",
    name: "Login",
    component: () => import("../views/auth/LoginView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/auth/register",
    name: "Register",
    component: () => import("../views/auth/RegisterView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/dashboard/DashboardView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard/posts",
    name: "UserPosts",
    component: () => import("../views/dashboard/PostsView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard/posts/create",
    name: "CreatePost",
    component: () => import("../views/dashboard/CreatePostView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard/posts/edit/:id",
    name: "EditPost",
    component: () => import("../views/dashboard/EditPostView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard/scores",
    name: "Scores",
    component: () => import("../views/dashboard/ScoresView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard/profile",
    name: "Profile",
    component: () => import("../views/dashboard/ProfileView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFoundView.vue"),
    meta: { requiresAuth: false },
  },
];

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to: any, from: any, savedPosition: any) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// Navigation guards
router.beforeEach((to: any, from: any, next: any) => {
  const user = localStorage.getItem("user") || "null";
  const isAuthenticated = user !== "null";

  // Nếu đã đăng nhập rồi mà vào login/register thì đưa về trang chủ hoặc dashboard
  if (
    isAuthenticated &&
    (to.path.startsWith("/auth/login") || to.path.startsWith("/auth/register"))
  ) {
    next("/dashboard");
  }
  // Nếu vào trang cần đăng nhập mà chưa đăng nhập thì về login
  else if (to.meta.requiresAuth && !isAuthenticated) {
    next("/auth/login");
  } else {
    next();
  }
});

export default router;
