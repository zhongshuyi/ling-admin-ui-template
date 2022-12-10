<template>
  <div>
    <div class="w-10 h-10 bg-gray-500 m-auto" @click="appStore.toggleTheme()"> {{ isMobile }}</div>
  </div>
</template>

<script setup lang="ts">
  import { useAppStoreWithOut } from '@/store/modules/app'
  const appStore = useAppStoreWithOut()

  const isMobile = appStore.getIsMobile

  // const isDark = useDark()
  // useToggle(is)
</script>

<style scoped></style>
