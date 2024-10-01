<template>
  <div class="flex items-center justify-between py-2">
    <div class="flex w-1/3 flex-shrink-0 items-center gap-2">
      <Icon :name="icon.name" mode="svg" :class="icon.class" />
      <span>{{ transaction.name }}</span>
    </div>

    <div class="flex-grow space-y-1 text-center">
      <p class="leading-none text-muted-foreground">
        {{ transaction.category ?? "Uncategorized" }}
      </p>
    </div>

    <div class="w-1/4 text-right font-medium">
      {{ formatCurrency(transaction.amount) }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  transaction: {
    type: Object,
    required: true,
  },
});

const icon = computed(() => {
  switch (props.transaction.type) {
    case "income":
      return {
        name: "lucide:arrow-down-left",
        class: "text-green-700",
      };
    case "expense":
      return {
        name: "lucide:arrow-up-right",
        class: "text-red-700",
      };
    case "savings":
      return {
        name: "lucide:wallet",
        class: "text-yellow-600",
      };
    case "investment":
      return {
        name: "lucide:bar-chart-2",
        class: "text-violet-700",
      };
    default:
      return {
        name: "lucide:circle",
        class: "text-muted-foreground",
      };
  }
});
</script>
