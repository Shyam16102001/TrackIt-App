<template>
  <NuxtLink
    :to="link"
    class="w-full max-w-xs transform transition-transform hover:scale-105"
  >
    <Card class="h-full">
      <CardHeader>
        <CardTitle>{{ title }}</CardTitle>
        <CardDescription>{{ description }}</CardDescription>
      </CardHeader>
      <CardContent>
        <img :src="image" alt="Image" class="mx-auto mt-2 h-24 w-24" />
      </CardContent>
    </Card>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  title: String,
  description: String,
  image: String,
  link: String, // new prop added for the link
});
</script>
