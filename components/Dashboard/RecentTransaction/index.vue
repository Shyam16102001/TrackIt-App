<template>
  <Card>
    <CardHeader>
      <CardTitle>Recent Transactions</CardTitle>
      <CardDescription>
        You made {{ transactionsCount }} transactions this month.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div v-if="transactionsCount > 0">
        <DashboardRecentTransactionCard
          v-for="transaction in transactions"
          :key="transaction.name"
          :transaction="transaction"
        />
      </div>
      <div v-else class="flex flex-col items-center justify-center">
        <LogoNotFound class="w-3/4 p-10" />
        <p class="text-center text-sm">No transactions found</p>
      </div>
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
