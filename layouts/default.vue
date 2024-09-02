<template>
  <div class="min-h-screen">
    <div class="flex flex-col">
      <div class="border-b">
        <div class="flex h-16 items-center justify-between px-4">
          <div class="flex items-center space-x-4">
            <LogoMain class="h-10 w-10" />
            <MainNav />
          </div>
          <div class="flex items-center space-x-4">
            <UserNav />
            <ColorChanger />
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 space-y-4 p-8 pt-6">
      <slot />
    </div>
  </div>
</template>
