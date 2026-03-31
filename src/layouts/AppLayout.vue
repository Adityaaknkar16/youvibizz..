<template>
  <div class="app-container">
    <div class="app">
      <slot />
    </div>
    <BottomNav v-if="showBottomNav" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BottomNav from '@/components/BottomNav.vue'

const route = useRoute()

const showBottomNav = computed(() => {
  // Hide bottom nav on login and register pages if they are not dashboard-like
  const hideOn = ['/', '/register', '/login']
  return !hideOn.includes(route.path)
})
</script>

<style scoped>
/* The app div is the scrollable content area. Bottom nav is fixed via global CSS. */
.app {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
