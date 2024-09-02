<template>
  <div class="flex items-center justify-between py-2">
    <div class="flex items-center gap-2">
      <Icon name="lucide:arrow-down-left" mode="svg" :class="iconClass" />
      {{ transaction.name }}
    </div>
    <div class="space-y-1">
      <p class="leading-none text-muted-foreground">
        {{ transaction.category }}
      </p>
    </div>
    <div class="font-medium">₹ {{ transaction.amount }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  transaction: {
    type: Object,
    required: true,
  },
});

const iconClass = computed(() => {
  if (props.transaction.type === "Income") {
    return "text-green-600";
  }
  return "rotate-180 text-red-600";
});
</script>
