<template>
  <Card>
    <CardHeader>
      <CardTitle>Recent Transactions</CardTitle>
      <CardDescription> You made {{ transactionsCount }} transactions this month. </CardDescription>
    </CardHeader>
    <CardContent>
      <DashboardRecentTransactionCard
        v-for="transaction in transactions"
        :key="transaction.name"
        :transaction="transaction"
      />
    </CardContent>
  </Card>
</template>

<script setup>
const props = defineProps({
  transactionsCount: {
    type: Number,
    required: true,
  },
  transactions: {
    type: Array,
    required: true,
  },
});
</script>
