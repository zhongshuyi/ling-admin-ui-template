<template>
  <div
    ><SvgIcon name="dark" size="60" class="text-dark-100" @click="appStore.toggleTheme()" />
  </div>
</template>

<script setup lang="ts">
  import SvgIcon from './components/Icon/src/SvgIcon.vue'

  const appStore = useAppStoreWithOut()
</script>

<style scoped></style>
