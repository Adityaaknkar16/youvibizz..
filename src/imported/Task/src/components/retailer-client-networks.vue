<template>
<div style="display: contents">
  <div class="phone-notch" style="display: none !important"><div class="notch-speaker"></div><div class="notch-camera"></div></div>

  <div class="status-bar" style="display: none !important">
    <span class="status-time">9:41</span>
    <div class="status-icons">
      <svg viewBox="0 0 24 24" fill="white"><rect x="1" y="15" width="4" height="6" rx="1"/><rect x="7" y="11" width="4" height="10" rx="1"/><rect x="13" y="7" width="4" height="14" rx="1"/><rect x="19" y="3" width="4" height="18" rx="1" opacity=".3"/></svg>
      <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill="white"/></svg>
      <div class="battery-icon"><div class="battery-body"><div class="battery-fill"></div></div></div>
    </div>
  </div>

  <div style="display: contents; height: 100%;">
  <div class="page-content">

    <!-- Topbar -->
    <div class="topbar">
      <a href="/retailer/dashboard" class="back-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </a>
      <span class="topbar-title">Client Networks</span>
      <button class="topbar-icon-btn" @click="showModal">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>
    </div>

    <!-- Hero -->
    <div class="hero" style="padding:20px 22px 50px;">
      <div class="hero-inner">
        <h1 class="hero-title" style="font-size:24px;">Client <span class="accent">Networks</span></h1>
        <p class="hero-sub">Your existing customer segments.</p>
      </div>
    </div>

    <!-- List -->
    <div class="sheet">
      <div class="sec-header">
        <h3>Client Types ({{ networks.length }})</h3>
      </div>

      <div>
        <div class="net-row" v-for="(item,index) in networks" :key="index">
          <div class="net-ico">👥</div>

          <div style="flex:1;">
            <div style="font-size:14px;font-weight:700;color:var(--text);">{{ item.type }}</div>
            <div style="font-size:11px;color:var(--muted);">
              Qty: {{ item.qty }} · {{ item.segment }}
            </div>
          </div>

          <div style="display:flex;gap:6px;">
            <button class="btn btn-outline btn-sm" @click="showToast('Edit opened')">Edit</button>
            <button class="btn btn-outline btn-sm" style="color:var(--danger);border-color:var(--danger);" @click="deleteNetwork(index)">Del</button>
          </div>
        </div>
      </div>

      <button class="btn btn-teal w-full mt-8" @click="showModal">+ Add Client Type</button>
    </div>

    <!-- Modal -->
    <div v-if="modalVisible" style="position:absolute;bottom:0;left:0;right:0;background:var(--card);border-radius:var(--radius-xl) var(--radius-xl) 0 0;padding:20px;box-shadow:0 -10px 40px rgba(0,0,0,.2);z-index:300;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
        <span style="font-size:16px;font-weight:800;">Add Client Type</span>
        <button @click="modalVisible=false" style="background:var(--bg);border-radius:8px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;color:var(--muted);">✕</button>
      </div>

      <label class="form-label">Client Type *</label>
      <select class="form-input" v-model="form.type">
        <option value="">Select...</option>
        <option>Builder / Contractor</option>
        <option>Interior Designer</option>
        <option>Furniture Manufacturer</option>
        <option>Retail Customer</option>
        <option>Architect</option>
        <option>Government / Institution</option>
        <option>Export Buyer</option>
        <option>Other</option>
      </select>

      <label class="form-label">Quantity Range</label>
      <input class="form-input" v-model="form.qty" placeholder="e.g. 500–1000 sheets/month">

      <label class="form-label">Segment</label>
      <select class="form-input" v-model="form.segment">
        <option>B2B</option>
        <option>B2C</option>
        <option>B2G</option>
      </select>

      <button class="btn btn-teal w-full" :disabled="loading" @click="addNetwork">
        {{ loading ? 'Adding...' : 'Add' }}
      </button>

      <p v-if="error" style="color:red;font-size:12px;margin-top:6px;">{{ error }}</p>
    </div>

    <!-- Bottom Nav -->
    <nav class="bottom-nav">
      <a href="/retailer/dashboard" class="nav-item active">Home</a>
      <a href="/retailer/products" class="nav-item">Products</a>
      <a href="/retailer/messages" class="nav-item">Messages</a>
      <a href="/pages/tanaya/retailer-transactions" class="nav-item">Payments</a>
      <a href="/retailer/profile" class="nav-item">Profile</a>
    </nav>

  </div>

  <!-- Toast -->
  <div class="toast" :class="{ show: toast.show }">{{ toast.msg }}</div>

  </div>
</div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'

const networks = ref([])

const modalVisible = ref(false)
const loading = ref(false)
const error = ref('')

const toast = reactive({
  show: false,
  msg: ''
})

const form = reactive({
  type: '',
  qty: '',
  segment: 'B2B'
})

const showToast = (msg) => {
  toast.msg = msg
  toast.show = true
  setTimeout(() => toast.show = false, 2500)
}

const showModal = () => {
  modalVisible.value = true
}

const deleteNetwork = (index) => {
  networks.value.splice(index, 1)
  showToast('Deleted')
}

const addNetwork = async () => {
  if (!form.type) {
    error.value = 'Please select a client type'
    return
  }

  loading.value = true
  error.value = ''

  try {
    await axios.post('/api/client-networks', form)

    networks.value.push({
      type: form.type,
      qty: form.qty || 'Negotiable',
      segment: form.segment
    })

    form.type = ''
    form.qty = ''
    form.segment = 'B2B'

    modalVisible.value = false
    showToast('Client network added!')
  } catch (e) {
    error.value = 'Something went wrong'
  } finally {
    loading.value = false
  }
}

const fetchNetworks = async () => {
  try {
    const res = await axios.get('/api/client-networks')
    networks.value = res.data || []
  } catch (e) {
    // fallback dummy data
    networks.value = [
      { type: 'Builder / Contractor', qty: '1000+ sheets/month', segment: 'B2B' },
      { type: 'Interior Designer', qty: '100–500 units/month', segment: 'B2B' },
      { type: 'Furniture Manufacturer', qty: '500+ sheets/month', segment: 'B2B' },
      { type: 'Retail Customer', qty: '1–50 units', segment: 'B2C' }
    ]
  }
}

onMounted(fetchNetworks)
</script>