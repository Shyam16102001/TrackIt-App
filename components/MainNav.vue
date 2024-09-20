<template>
  <nav
    :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')"
  >
    <NuxtLink
      to="/dashboard"
      class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      activeClass="text-primary"
    >
      Dashboard
    </NuxtLink>
    <NuxtLink
      to="/transactions"
      class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      activeClass="text-primary"
    >
      Cash Flow
    </NuxtLink>
    <NuxtLink
      to="/portfolio"
      class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      activeClass="text-primary"
    >
      Portfolio
    </NuxtLink>
    <NuxtLink
     to="/calculator"
      class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      activeClass="text-primary"
    >
      Calculator
    </NuxtLink>
    <NuxtLink
      class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      activeClass="text-primary"
    >
      Settings
    </NuxtLink>
  </nav>
</template>

<script setup>
import { cn } from "@/lib/utils";
</script>
