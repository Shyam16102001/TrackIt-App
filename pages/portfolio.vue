<template>
  <div>
    <h1>Portfolio</h1>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["sanctum-verified"],
});

useSeoMeta({
  title: "Portfolio | TrackIt",
});
</script>
