<template>
  <AuthCardWrapper
    title="Forgot your Password"
    label="Enter your Email ID to receive the password reset link."
  >
    <form @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormControl>
            <Input
              type="email"
              placeholder="Please enter your Email ID"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="mt-4 flex justify-center">
        <Button
          type="submit"
          :disabled="!(meta.valid && meta.touched) || isLoading"
        >
          <span v-if="!isLoading">Email Password Reset Link</span>
          <span v-else>Sending...</span>
        </Button>
      </div>
    </form>
  </AuthCardWrapper>
</template>

<script setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/toast/use-toast";
const sanctumFetch = useSanctumClient();
const { toast } = useToast();

const isLoading = ref(false);

const forgotPasswordFormSchema = toTypedSchema(
  z.object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
  }),
);

const forgotPasswordForm = useForm({
  validationSchema: forgotPasswordFormSchema,
});

const { handleSubmit, meta, setErrors } = forgotPasswordForm;

const onSubmit = handleSubmit(async (credentials) => {
  isLoading.value = true;
  const email = credentials.email;
  try {
    await sanctumFetch("/forgot-password", {
      method: "POST",
      body: { email },
    });
    toast({
      title: "Password Reset Link Sent",
      description: "We have emailed your password reset link!",
    });
  } catch (error) {
    const err = useSanctumError(error);
    if (err.isValidationError) {
      setErrors(err.bag);
    } else {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please try again later.",
      });
    }
  } finally {
    isLoading.value = false;
  }
});
</script>
