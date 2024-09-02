<template>
  <Card>
    <CardHeader>
      <CardTitle>Recent Transactions</CardTitle>
      <CardDescription> You made 26 transactions this month. </CardDescription>
    </CardHeader>
    <CardContent>
      <DashboardRecentTransactionCard
        v-for="transaction in data"
        :key="transaction.name"
        :transaction="transaction"
      />
    </CardContent>
  </Card>
</template>

<script setup>
const data = [
  {
    name: "Jul Salary",
    type: "Income",
    category: "Salary",
    amount: Math.floor(Math.random() * 2000) + 500,
    date: "23.05.2024",
  },
  {
    name: "Netflix",
    type: "Expense",
    category: "Streaming",
    amount: Math.floor(Math.random() * 2000) + 500,
    date: "23.05.2024",
  },
  {
    name: "Food",
    type: "Expense",
    category: "Groceries",
    amount: Math.floor(Math.random() * 2000) + 500,
    date: "23.05.2024",
  },
  {
    name: "Fuel",
    type: "Expense",
    category: "Car",
    amount: Math.floor(Math.random() * 2000) + 500,
    date: "23.05.2024",
  },
  {
    name: "Movie",
    category: "Entertainment",
    type: "Expense",
    amount: Math.floor(Math.random() * 2000) + 500,
    date: "23.05.2024",
  },
];
</script>
