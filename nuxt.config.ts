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
    baseUrl: "/backend",
    redirect: {
      onAuthOnly: "/auth/login",
      onGuestOnly: "/dashboard",
      onLogin: "/dashboard",
      onLogout: "/auth/login",
    },
    globalMiddleware: {
      enabled: true,
    },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || "http://localhost:8000",
    }
  },

  nitro: {
    routeRules:{
      "/backend/**":{
        proxy: (process.env.API_BASE_URL || "http://localhost:8000") + "/**"
      }
    }
  }
});
