<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toaster />
    <SpeedInsights />
  </div>
</template>

<script setup>
import { SpeedInsights } from "@vercel/speed-insights/vue";
useSeoMeta({
  ogImage: "/og-image.png",
});
</script>
