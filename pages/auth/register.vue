<template>
  <AuthRegisterForm />
</template>

<script setup>
definePageMeta({
  layout: "auth-layout",
  sanctum: {
    guestOnly: true,
  },
});

useSeoMeta({
  title: "Register | TrackIt",
});
</script>

<style></style>
