<template>
  <div>
    <h2 class="text-3xl font-bold tracking-tight">Transaction History</h2>
    <div v-if="isLoading" class="flex items-center justify-center">
      <Icon name="lucide:loader" class="h-10 w-10 animate-spin" />
    </div>
    <TransactionTable v-else :transactions="transactions" />
  </div>
</template>

<script setup>
const { fetchTransaction } = useTransactions();
const transactions = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = true;
  try {
    const { data } = await fetchTransaction();
    transactions.value = data;
  } catch (error) {
    toast({
      title: "Uh oh! Something went wrong.",
      description: "Please try again later.",
    });
  } finally {
    isLoading.value = false;
  }
});
</script>
