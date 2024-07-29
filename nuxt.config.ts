// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/icon",
    "nuxt-auth-sanctum",
  ],
  colorMode: {
    classSuffix: "",
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },

  sanctum: {
    baseUrl: "http://localhost:8000",
    redirect: {
      onAuthOnly: "/auth/login",
      onGuestOnly: "/",
      onLogin: "/",
      onLogout: "/auth/login",
    },
    globalMiddleware: {
      enabled: true,
    },
  },
});
