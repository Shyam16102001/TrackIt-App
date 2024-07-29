<template>
  <AuthCardWrapper
    title=" Set new Password"
    label="Your new password must be different to previously used passwords."
    back-button-link="/auth/login"
    back-button-label="← Back to Login"
  >
    <form @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input
              type="password"
              placeholder="Please enter the new password"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="password_confirmation">
        <FormItem>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl>
            <Input
              type="password"
              placeholder="Please enter the new password again"
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
          <span v-if="!isLoading">Reset password</span>
          <span v-else>Resetting...</span>
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

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const resetPasswordFormSchema = toTypedSchema(
  z
    .object({
      password: z.string().min(6, {
        message: "Password must be at least 6 characters long",
      }),
      password_confirmation: z.string().min(6, {
        message: "Password must be at least 6 characters long",
      }),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: "Passwords must match.",
      path: ["password_confirmation"],
    }),
);

const resetPasswordForm = useForm({
  validationSchema: resetPasswordFormSchema,
});

const { handleSubmit, meta, setErrors } = resetPasswordForm;

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  const payload = {
    email: props.email,
    password: values.password,
    password_confirmation: values.password_confirmation,
    token: props.token,
  };
  try {
    await sanctumFetch("/reset-password", {
      method: "POST",
      body: payload,
    });
    toast({
      title: "Password Reset Sucessfully",
    });
    await navigateTo({ path: "/auth/login", query: { reset: "true" } });
  } catch (error) {
    const err = useSanctumError(error);
    toast({
      title: "Uh oh! Something went wrong.",
      description: "Please try again later.",
    });
  } finally {
    isLoading.value = false;
  }
});
</script>
