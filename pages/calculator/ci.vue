<template>
    <div>
        <calculatorInterestCalculator></calculatorInterestCalculator>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ["sanctum-verified"],
  });
  
  useSeoMeta({
    title: "CI | TrackIt",
  });
</script>