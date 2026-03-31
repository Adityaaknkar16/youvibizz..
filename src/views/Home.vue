<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center p-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4">
      <p class="text-gray-500 font-medium">Redirecting you to your dashboard...</p>


  </div>
  </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // Check for both new and old role keys for compatibility
  const role = localStorage.getItem('yb_role') || localStorage.getItem('role')
  
  if (!role) {
    router.push('/login')
  } else {
    // Normalize and route
    const roleLower = role.toLowerCase()
    if (roleLower === 'manufacturer') {
      router.push('/manufacturer/dashboard')
    } else if (roleLower === 'retailer') {
      router.push('/retailer/dashboard')
    } else if (roleLower === 'distributor') {
      router.push('/distributor/dashboard')
    } else {
      router.push('/login')
    }
  }
})
</script>
