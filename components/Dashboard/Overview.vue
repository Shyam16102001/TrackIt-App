<script setup>
const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Overview</CardTitle>
    </CardHeader>
    <CardContent class="pl-2">
      <AreaChart
        :data="transactions"
        :categories="['income', 'expense', 'investment', 'savings']"
        :index="'name'"
        show-gradiant
      />
    </CardContent>
  </Card>
</template>
