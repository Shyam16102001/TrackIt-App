<template>
  <div>
    <div class="flex items-center justify-between space-y-2">
      <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div class="flex items-center space-x-2">
        <TransactionAddButton />
      </div>
    </div>
    <div v-if="isLoading" class="flex items-center justify-center">
      <Icon name="lucide:loader" class="h-10 w-10 animate-spin" />
    </div>
    <div v-else>
      <div class="grid gap-4 py-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          v-for="(
            category, key
          ) in transactionStats.category_totals_current_month"
          :key="key"
          :title="capitalize(key)"
          :value="category.total"
          :description="`${category.change} from last month`"
          :icon="getIcon(key)"
          :color="getColor(key)"
        />
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <DashboardOverview
          :transactions="transactionStats.monthly_totals"
          class="col-span-4"
        />
        <DashboardRecentTransaction
          :transactionsCount="transactionStats.transactions_count"
          :transactions="transactionStats.last_10_transactions"
          class="col-span-4 lg:col-span-3"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();
definePageMeta({
  middleware: ["sanctum-verified"],
});

useSeoMeta({
  title: "Dashboard | TrackIt",
});

const { fetchTransactionStats } = useTransactions();

const transactionStats = ref({});
const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = true;
  try {
    const { data } = await fetchTransactionStats();
    transactionStats.value = data;
  } catch (error) {
    console.log(error);
    toast({
      title: "Uh oh! Something went wrong.",
      description: "Please try again later.",
    });
  } finally {
    isLoading.value = false;
  }
});

const capitalize = (key) => key.charAt(0).toUpperCase() + key.slice(1);

const getIcon = (key) => {
  const icons = {
    income: "lucide:arrow-down-left",
    expense: "lucide:arrow-up-right",
    investment: "lucide:bar-chart-2",
    savings: "lucide:wallet",
  };
  return icons[key] || "lucide:info";
};

const getColor = (key) => {
  const colors = {
    income: "text-green-700",
    expense: "text-red-700",
    investment: "text-violet-700",
    savings: "text-yellow-600",
  };
  return colors[key] || "text-gray-600";
};
</script>
