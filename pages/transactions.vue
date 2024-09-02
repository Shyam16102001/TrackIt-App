<template>
  <div>
    <div class="flex items-center justify-between space-y-2">
      <h2 class="text-3xl font-bold tracking-tight">Transaction History</h2>
      <div>
        <Button :onclick="fetchTransaction">
          <Icon name="lucide:circle-plus" class="mr-2" /> Add Transaction
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { fetchTransaction } = useTransactions();
</script>
