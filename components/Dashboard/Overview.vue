<script setup>
const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 2000) + 500,
    income: Math.floor(Math.random() * 2000) + 500,
    expense: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 2000) + 500,
    income: Math.floor(Math.random() * 2000) + 500,
    expense: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 2000) + 500,
    income: Math.floor(Math.random() * 2000) + 500,
    expense: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 2000) + 500,
    income: Math.floor(Math.random() * 2000) + 500,
    expense: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 2000) + 500,
    income: Math.floor(Math.random() * 2000) + 500,
    expense: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 2000) + 500,
    income: Math.floor(Math.random() * 2000) + 500,
    expense: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 2000) + 500,
    income: Math.floor(Math.random() * 2000) + 500,
    expense: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 2000) + 500,
    income: Math.floor(Math.random() * 2000) + 500,
    expense: Math.floor(Math.random() * 2000) + 500,
  },
];
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Overview</CardTitle>
    </CardHeader>
    <CardContent class="pl-2">
      <AreaChart
        :data="data"
        :categories="['total', 'income', 'expense']"
        :index="'name'"
        show-gradiant
      />
    </CardContent>
  </Card>
</template>
