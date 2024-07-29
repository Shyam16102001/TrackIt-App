<template>
  <AuthPasswordResetForm :email="email" :token="resetToken" />
</template>

<script setup>
definePageMeta({
  layout: "auth-layout",
  sanctum: {
    guestOnly: true,
  },
});

useSeoMeta({
  title: "Password Reset | TrackIt",
});

const route = useRoute();

const email = route.query.email ?? "";
const resetToken = route.params.hash;
</script>
