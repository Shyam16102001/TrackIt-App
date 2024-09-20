<template>
  <div>
    <div class="flex items-center justify-between space-y-2">
      <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div class="flex items-center space-x-2">
         <TransactionAddButton />
      </div>
    </div>

    <div class="grid gap-4 py-4 md:grid-cols-2 lg:grid-cols-4">
      <DashboardCard
        title="Income"
        value="45,231.89"
        description="+20.1% from last month"
        icon="lucide:plus"
        color="text-green-700"
      />
      <DashboardCard
        title="Expense"
        value="45,231.89"
        description="+20.1% from last month"
        icon="lucide:minus"
        color="text-red-700"
      />
      <DashboardCard
        title="Investment"
        value="45,231.89"
        description="+20.1% from last month"
        icon="lucide:bar-chart-2"
        color="text-violet-700"
      />
      <DashboardCard
        title="Savings"
        value="45,231.89"
        description="+20.1% from last month"
        icon="lucide:wallet"
        color="text-yellow-600"
      />
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <DashboardOverview class="col-span-4" />
      <DashboardRecentTransaction class="col-span-4 lg:col-span-3" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["sanctum-verified"],
});

useSeoMeta({
  title: "Dashboard | TrackIt",
});
</script>
