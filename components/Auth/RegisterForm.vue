<template>
  <AuthCardWrapper
    title="Register"
    label="Create an account"
    back-button-link="/auth/login"
    back-button-label="Already have an account? Login here."
  >
    <form @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input
              type="name"
              placeholder="Please enter your name"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

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

      <FormField v-slot="{ componentField }" name="password_confirmation">
        <FormItem>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl>
            <Input
              type="password"
              placeholder="Please enter your password again"
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
          <span v-if="!isLoading">Register</span>
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

const sanctumConfig = useSanctumConfig();
const sanctumFetch = useSanctumClient();
const { refreshIdentity } = useSanctumAuth();

const isLoading = ref(false);
const { toast } = useToast();

const registerFormSchema = toTypedSchema(
  z
    .object({
      email: z.string().email({
        message: "Please enter a valid email address",
      }),
      name: z.string().min(2, {
        message: "Please enter your name",
      }),
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

const registerForm = useForm({
  validationSchema: registerFormSchema,
});

const { meta, handleSubmit, setErrors } = registerForm;

const onSubmit = handleSubmit(async (credentials) => {
  isLoading.value = true;
  try {
    await sanctumFetch("/register", {
      method: "POST",
      body: credentials,
    });
    await refreshIdentity();
    navigateTo("/auth/verify-email");
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
