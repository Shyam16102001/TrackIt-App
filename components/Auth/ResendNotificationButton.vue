<script setup>
import { useToast } from "@/components/ui/toast/use-toast";

const sanctumFetch = useSanctumClient();
const { toast } = useToast();

const isLoading = ref(false);

async function sendEmailNotification() {
  isLoading.value = true;
  try {
    const response = await sanctumFetch.raw(
      "/email/verification-notification",
      { method: "POST" },
    );

    if (response.type === "opaqueredirect") {
      await navigateTo(response.headers.get("Location"));
    }

    toast({
      title: "Email Sent Successfully",
      description: "Check your inbox for the verification email.",
    });
  } catch (error) {
    toast({
      title: "Uh oh! Something went wrong.",
      description:
        "Failed to send the verification email. Please try again later.",
    });
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <Button @click="sendEmailNotification">
    <span v-if="!isLoading"> Resend verification email</span>
    <span v-else>Sending...</span>
  </Button>
</template>

<style scoped></style>
