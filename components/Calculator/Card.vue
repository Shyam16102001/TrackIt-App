<template>
  <router-link :to="link" class="w-full max-w-xs transition-transform transform hover:scale-105">
    <Card>
      <CardHeader>
        <CardTitle>{{ title }}</CardTitle>
        <CardDescription>{{ description }}</CardDescription>
      </CardHeader>
      <CardContent>
        <img :src="image" alt="Image" class="w-24 h-24 mx-auto mt-2" />
      </CardContent>
    </Card>
  </router-link>
</template>

<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

const props = defineProps({
  title: String,
  description: String,
  image: String,
  link: String, // new prop added for the link
})
</script>

<!-- <style scoped>
.img-container {
  display: flex;
  justify-content: center;
}
</style> -->
