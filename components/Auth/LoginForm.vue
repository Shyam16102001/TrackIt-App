<template>
  <AuthCardWrapper
    title="Login"
    label="Please provide your username and password"
    back-button-link="/auth/register"
    back-button-label="Don't have an account? Register here."
  >
    <form @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
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

      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input
              type="password"
              placeholder="Please enter your password"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button variant="link" size="sm" class="mt-2 w-full justify-end">
        <NuxtLink to="/auth/forgot-password">Forgot your password?</NuxtLink>
      </Button>

      <div class="mt-3 flex justify-center">
        <Button
          type="submit"
          :disabled="!(meta.valid && meta.touched) || isLoading"
        >
          <span v-if="!isLoading">Login</span>
          <span v-else>Loading...</span>
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

const { login } = useSanctumAuth();
const { toast } = useToast();

const isLoading = ref(false);

const loginFormSchema = toTypedSchema(
  z.object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
  }),
);

const loginForm = useForm({
  validationSchema: loginFormSchema,
});

const { handleSubmit, meta, setErrors } = loginForm;

const onSubmit = handleSubmit(async (credentials) => {
  isLoading.value = true;
  try {
    await login(credentials);
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
