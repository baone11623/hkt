import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import router from "./router";
import "vue3-toastify/dist/index.css";

// PrimeVue styles
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primeicons/primeicons.css";

// Tailwind CSS
import "./assets/css/index.css";

import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";

// Create and configure the app
const app = createApp(App);

// Use plugins
app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  ripple: true,
  inputStyle: "filled",
});
app.use(Vue3Toastify, {
  autoClose: 3000,
} as ToastContainerOptions);

// Mount the app
app.mount("#app");
