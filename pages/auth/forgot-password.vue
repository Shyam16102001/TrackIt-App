<template>
  <AuthForgotPasswordForm />
</template>

<script setup>
definePageMeta({
  layout: "auth-layout",
  sanctum: {
    guestOnly: true,
  },
});

useSeoMeta({
  title: "Forgot password | TrackIt",
});
</script>
