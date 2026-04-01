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
  const hideOn = ['/', '/register', '/login']
  return !hideOn.includes(route.path)
})
</script>

<style scoped>
.app {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
