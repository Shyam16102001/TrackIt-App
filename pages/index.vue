<template>
  <div>
    <h1>Index</h1>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["sanctum-verified"],
});

useSeoMeta({
  title: "Home | TrackIt",
});
</script>
