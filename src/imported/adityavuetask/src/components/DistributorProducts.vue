<template>
  <div style="display: contents">
    <div class="phone-notch" style="display: none !important"><div class="notch-speaker"></div><div class="notch-camera"></div></div>
    <div class="status-bar" style="display: none !important">
      <span class="status-time">{{ currentTime }}</span>
      <div class="status-icons">
        <svg viewBox="0 0 24 24" fill="white"><rect x="1" y="15" width="4" height="6" rx="1"/><rect x="7" y="11" width="4" height="10" rx="1"/><rect x="13" y="7" width="4" height="14" rx="1"/><rect x="19" y="3" width="4" height="18" rx="1" opacity=".3"/></svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill="white" stroke="none"/></svg>
        <div class="battery-icon"><div class="battery-body"><div class="battery-fill"></div></div></div>
      </div>
    </div>
    <div style="display: contents; height: 100%;">
      <div class="page-content">
        <div class="topbar">
          <button @click="router.back()" class="back-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>
          <span class="topbar-title">Product Catalog</span>
          <div style="width:36px;"></div>
        </div>

        <div class="hero" style="padding:20px 22px 50px;">
          <div class="hero-inner">
            <h1 class="hero-title" style="font-size:24px;">Product <span class="accent">Catalog</span></h1>
            <p class="hero-sub">Manage and update your product listings.</p>
          </div>
        </div>

        <div class="sheet">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <h3 style="font-size:17px;font-weight:800;color:var(--navy);">All Products</h3>
            <router-link to="/add-product" class="btn btn-teal btn-xs" style="text-decoration:none;">+ Add Product</router-link>
          </div>

          <div class="search-bar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" v-model="searchQuery" placeholder="Search products...">
          </div>

          <div class="filter-tabs">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              class="ftab" 
              :class="{ active: currentFilter === tab.id }"
              @click="currentFilter = tab.id"
            >
              {{ tab.label }} ({{ getCount(tab.id) }})
            </button>
          </div>

          <div v-if="loading && products.length === 0" style="padding: 20px; text-align: center;">Loading catalog...</div>
          <div v-if="error" style="padding: 10px; color: red; text-align: center;">{{ error }}</div>

          <div v-for="product in filteredProducts" :key="product.id" class="product-card">
            <div class="product-card-img">
              <img :src="product.image" :alt="product.name" @error="handleImgError">
              <div class="product-status">
                <span class="pill" :class="statusClasses[product.status]">{{ product.status }}</span>
              </div>
            </div>
            <div class="product-body">
              <div class="product-name">{{ product.name }}</div>
              <div class="product-cat">{{ product.category }} · {{ product.specs }}</div>
              <div class="product-footer">
                <div class="product-actions">
                  <button class="icon-btn" title="Edit" @click="handleEdit(product.id)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button class="icon-btn" title="Delete" style="color:var(--danger);border-color:var(--danger);" @click="handleDelete(product.id)" :disabled="loading">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="filteredProducts.length === 0 && !loading" style="padding: 40px 20px; text-align: center; color: var(--muted);">
            No products match your criteria.
          </div>
        </div>
      </div>

      <nav class="bottom-nav">
        <router-link to="/distributor-dashboard" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home</router-link>
        <router-link to="/distributor-products" class="nav-item active"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>Products</router-link>
        <router-link to="/distributor-messages" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Messages</router-link>
        <router-link to="/membership" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Membership</router-link>
        <router-link to="/distributor-profile" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile</router-link>
      </nav>

      <div class="toast" v-if="toast.show">{{ toast.message }}</div>
    </div>
  </div>
</template>

<script setup>
import '../utils/dashboard-shared.js';
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('9:41');
const loading = ref(false);
const error = ref(null);
const searchQuery = ref('');
const currentFilter = ref('All');

const statusClasses = {
  'Active': 'pill-green',
  'Pending': 'pill-yellow',
  'Inactive': 'pill-red'
};

const tabs = [
  { id: 'All', label: 'All' },
  { id: 'Active', label: 'Active' },
  { id: 'Pending', label: 'Pending' },
  { id: 'Inactive', label: 'Inactive' }
];

const products = ref([
  { id: 1, name: 'Gurjan Face Commercial Ply', category: 'Commercial Plywood', specs: '18mm', status: 'Active', image: '/Media/Gurjan Face Commercial Ply.png' },
  { id: 2, name: 'Marine Grade Ply', category: 'Marine Plywood', specs: '12mm', status: 'Active', image: '/Media/Marine Grade Ply.png' },
  { id: 3, name: 'HDF Boards 6mm', category: 'HDF', specs: '6mm Standard', status: 'Pending', image: '/Media/HDF Boards.png' },
  { id: 4, name: 'Decorative Laminates', category: 'Laminates', specs: 'Premium Range', status: 'Active', image: '/Media/Decorative Laminates.png' }
]);

const toast = reactive({ show: false, message: '' });

const getCount = (filter) => {
  if (filter === 'All') return products.value.length;
  return products.value.filter(p => p.status === filter).length;
};

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesFilter = currentFilter.value === 'All' || p.status === currentFilter.value;
    return matchesSearch && matchesFilter;
  });
});

const fetchProducts = async () => {
  try {
    loading.value = true;
    error.value = null;
    // const response = await axios.get('/api/distributor/products');
    // products.value = response.data;
  } catch (err) {
    error.value = 'Failed to load product catalog';
  } finally {
    loading.value = false;
  }
};

const handleEdit = (id) => {
  showToast('Edit product');
};

const handleDelete = async (id) => {
  if (!confirm('Are you sure you want to delete this product?')) return;
  try {
    loading.value = true;
    // await axios.delete(`/api/products/${id}`);
    products.value = products.value.filter(p => p.id !== id);
    showToast('Product deleted');
  } catch (err) {
    showToast('Failed to delete product');
  } finally {
    loading.value = false;
  }
};

const handleImgError = (e) => {
  e.target.src = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400';
};

const showToast = (msg) => {
  toast.message = msg;
  toast.show = true;
  setTimeout(() => toast.show = false, 2500);
};

onMounted(() => {
  fetchProducts();
  const now = new Date();
  currentTime.value = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
});
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
