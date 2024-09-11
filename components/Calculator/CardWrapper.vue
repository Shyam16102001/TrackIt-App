<template>
  <Card class="md:w-1/2 lg:w-1/3 xl:w-1/3">
    <CardHeader>
      <CardTitle class="text-center text-2xl">{{ title }}</CardTitle>
      <CardDescription class="text-center">{{ label }}</CardDescription>
    </CardHeader>
    <CardContent>
      <slot />
    </CardContent>
    <CardFooter class="justify-center" v-if="backButtonLabel || backButtonLink">
      <Button variant="link" size="sm">
        <NuxtLink :to="backButtonLink">{{ backButtonLabel }}</NuxtLink>
      </Button>
    </CardFooter>
  </Card>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  backButtonLink: {
    type: String,
  },
  backButtonLabel: {
    type: String,
  },
});
</script>

<style></style>
