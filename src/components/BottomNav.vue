<template>
  <nav class="bottom-nav">
    <router-link :to="navLinks.home" class="nav-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
      Home
    </router-link>
    
    <router-link to="/listing" class="nav-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      Explore
    </router-link>

    <router-link :to="navLinks.post" class="nav-item">
      <div class="nav-fab">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </div>
      Post
    </router-link>

    <router-link :to="navLinks.jobs" class="nav-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
      Jobs
    </router-link>

    <router-link :to="navLinks.account" class="nav-item" id="accountLink">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
      Account
    </router-link>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const navLinks = computed(() => {
  const role = localStorage.getItem('yb_role') || localStorage.getItem('role') || 'manufacturer'
  
  const base = {
    home: `/${role}/dashboard`,
    explore: '/listing',
    post: `/${role}/requirements`,
    jobs: `/${role}/jobs`,
    account: `/${role}/profile`
  }

  // Overrides to match routes in generated-routes.js
  if (role === 'distributor') {
    base.home = '/distributor/dashboard'
    base.post = '/pages/adityavuetask/distributor-requirements'
    base.jobs = '/distributor-jobs' // Matches router/index.js line 35
    base.account = '/distributor_detail' // Matches router/index.js line 29
  } else if (role === 'manufacturer') {
    base.home = '/manufacturer/dashboard'
    base.post = '/pages/vuetask/manufacturer-requirements'
    base.jobs = '/pages/task/manufacturer-jobs'
    base.account = '/pages/task/manufacturer-detail'
  } else if (role === 'retailer') {
    base.home = '/retailer/dashboard'
    base.post = '/pages/tanaya/retailer-requirements'
    base.jobs = '/pages/tanaya/retailer-jobs'
    base.account = '/pages/tanaya/retailer-detail'
  }

  return base
})
</script>

<style scoped>
/* Individual styles are mostly in mobile-shared.css */
</style>
