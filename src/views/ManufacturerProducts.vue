<template>
  
    <div class="phone-notch">
      <div class="notch-speaker">
      <div class="notch-camera">

        <div class="topbar">
          <a href="#" @click.prevent="$router.back()" class="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </a>
          <span class="topbar-title">My Products</span>
          <div style="width:36px;">

        <div class="hero" style="padding:20px 22px 50px;">
          <div class="hero-inner">
            <h1 class="hero-title" style="font-size:24px;">Product <span class="accent">Catalog</span></h1>
            <p class="hero-sub">Manage and update your product listings.</p>

        <div class="sheet">

          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <h3 style="font-size:17px;font-weight:800;color:var(--navy);">All Products</h3>
            <RouterLink to="/pages/task/add-product" class="btn btn-teal btn-xs" style="text-decoration:none;">+ Add Product</RouterLink>

          <!-- Search -->
          <div class="search-bar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search products..." v-model="searchQuery" />

          <!-- Filter Tabs -->
          <div class="filter-tabs">
            <button
              v-for="tab in filterTabs"
              :key="tab.key"
              class="ftab"
              :class="{ active: activeFilter === tab.key }"
              @click="activeFilter = tab.key"
            >
              {{ tab.label }}
            </button>

          <!-- Product Cards -->
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="product-card"
          >
            <div class="product-card-img">
              <img
                :src="product.image"
                :alt="product.name"
                @error="onImgError($event, product.fallbackImage)"
              />
              <div class="product-status">
                <span
                  class="pill"
                  :class="product.status === 'Active' ? 'pill-green' : product.status === 'Pending' ? 'pill-yellow' : 'pill-red'"
                >
                  {{ product.status }}
                </span>

            <div class="product-body">
              <div class="product-name">{{ product.name }}
              <div class="product-cat">{{ product.category }}
              <div class="product-footer">
                <div class="product-actions">
                  <button class="icon-btn" title="Edit" @click="editProduct(product)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button
                    class="icon-btn"
                    title="Delete"
                    style="color:var(--danger);border-color:var(--danger);"
                    @click="deleteProduct(product)"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>
                  </button>

          <!-- Empty state -->
          <p v-if="filteredProducts.length === 0" style="text-align:center;color:var(--muted);font-size:13px;padding:24px 0;">
            No products found.
          </p>

          <!-- Error -->
          <p v-if="deleteError" style="color:red;font-size:12px;margin-top:8px;">{{ deleteError }}</p>

      

      <!-- Toast -->
      <div class="toast" :class="{ show: toastVisible }">{{ toastMessage }}


  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'

// ─── Filter Tabs ───
const filterTabs = [
  { key: 'all', label: 'All (24)' },
  { key: 'active', label: 'Active (18)' },
  { key: 'pending', label: 'Pending (4)' },
  { key: 'inactive', label: 'Inactive (2)' }
]
const activeFilter = ref('all')
const searchQuery = ref('')

// ─── Products ───
const products = ref([
  {
    id: 1,
    name: 'Gurjan Face Commercial Ply',
    category: 'Commercial Plywood · 18mm',
    status: 'Active',
    image: '/Media/Gurjan Face Commercial Ply.png',
    fallbackImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400'
  },
  {
    id: 2,
    name: 'Marine Grade Ply',
    category: 'Marine Plywood · 12mm',
    status: 'Active',
    image: '/Media/Marine Grade Ply.png',
    fallbackImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400'
  },
  {
    id: 3,
    name: 'HDF Boards 6mm',
    category: 'HDF · 6mm Standard',
    status: 'Pending',
    image: '/Media/HDF Boards.png',
    fallbackImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400'
  },
  {
    id: 4,
    name: 'Decorative Laminates',
    category: 'Laminates · Premium Range',
    status: 'Active',
    image: '/Media/Decorative Laminates.png',
    fallbackImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400'
  }
])

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesFilter =
      activeFilter.value === 'all' ||
      p.status.toLowerCase() === activeFilter.value
    const matchesSearch =
      !searchQuery.value ||
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesFilter && matchesSearch
  })
})

function onImgError(event, fallback) {
  event.target.src = fallback
}

// ─── Toast ───
const toastVisible = ref(false)
const toastMessage = ref('')

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2500)
}

// ─── Edit Product ───
function editProduct(product) {
  window.location.href = `/pages/task/add-product?id=${product.id}`
}

// ─── Delete Product ───
const deleteError = ref('')

async function deleteProduct(product) {
  if (!confirm(`Delete "${product.name}"?`)) return
  deleteError.value = ''
  try {
    await axios.delete(`/api/products/${product.id}`)
    products.value = products.value.filter(p => p.id !== product.id)
    showToast('Product deleted successfully.')
  } catch (error) {
    deleteError.value = error.response?.data?.message || 'Failed to delete product.'
  }
}
</script>

<style scoped>
.filter-tabs { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 2px; scrollbar-width: none; margin-bottom: 16px; }
.filter-tabs::-webkit-scrollbar { display: none; }
.ftab { flex-shrink: 0; padding: 7px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; border: 1.5px solid var(--border); background: var(--card); color: var(--muted); cursor: pointer; transition: var(--transition); }
.ftab.active { background: var(--navy); color: #fff; border-color: var(--navy); }

.product-card { background: var(--card); border-radius: var(--radius); box-shadow: var(--shadow-sm); overflow: hidden; margin-bottom: 12px; }
.product-card-img { position: relative; }
.product-card-img img { width: 100%; height: 140px; object-fit: cover; }
.product-status { position: absolute; top: 10px; left: 10px; }
.product-body { padding: 14px; }
.product-name { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
.product-cat { font-size: 11px; color: var(--muted); margin-bottom: 10px; }
.product-footer { display: flex; align-items: center; justify-content: space-between; }
.product-price { font-size: 16px; font-weight: 800; color: var(--navy); font-family: 'Barlow', sans-serif; }
.product-actions { display: flex; gap: 8px; }
.icon-btn { width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 1.5px solid var(--border); background: transparent; color: var(--muted); transition: var(--transition); }
.icon-btn:hover { border-color: var(--teal); color: var(--teal); }
.icon-btn svg { width: 15px; height: 15px; }

.fab {
  position: absolute; bottom: 88px; right: 20px;
  width: 54px; height: 54px; border-radius: 16px;
  background: var(--teal); color: #fff;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 8px 24px rgba(34,162,138,.4);
  transition: var(--transition); z-index: 199;
  font-size: 24px; font-weight: 700;
}
.fab:hover { transform: scale(1.08); }
.fab svg { width: 22px; height: 22px; }
</style>
