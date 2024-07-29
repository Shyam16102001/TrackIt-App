<script setup>
definePageMeta({
  layout: "auth-layout",
});

useSeoMeta({
  title: "Verify Email | TrackIt",
});

const { logout } = useSanctumAuth();
</script>

<template>
  <AuthCardWrapper
    title="Verify your Email"
    label="We will need to verify your email address."
  >
    <p>
      Thanks for signing up! Before get started, could you verify your email
      address by clicking on the link we just emailed to you? If you did't
      receive the email, we will gladly send you another.
    </p>

    <div class="mt-4 flex items-center justify-between">
      <AuthResendNotificationButton />
      <Button size="sm" @click="logout" variant="link"> Logout </Button>
    </div>
  </AuthCardWrapper>
</template>
