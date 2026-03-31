<template>
<div style="display: contents">
  <div class="phone-notch" style="display: none !important"><div class="notch-speaker"></div><div class="notch-camera"></div></div>
  <div class="status-bar" style="display: none !important">
    <span class="status-time">9:41</span>
    <div class="status-icons">
      <svg viewBox="0 0 24 24" fill="white"><rect x="1" y="15" width="4" height="6" rx="1"/><rect x="7" y="11" width="4" height="10" rx="1"/><rect x="13" y="7" width="4" height="14" rx="1"/><rect x="19" y="3" width="4" height="18" rx="1" opacity=".3"/></svg>
      <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill="white" stroke="none"/></svg>
      <div class="battery-icon"><div class="battery-body"><div class="battery-fill"></div></div></div>
    </div>
  </div>
  <div style="display: contents; height: 100%;">
    <div class="page-content">

      <div class="topbar">
        <a href="#" class="back-btn" @click="router.go(-1)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </a>
        <span class="topbar-title">Client Networks</span>
        <button class="topbar-icon-btn" @click="isModalOpen = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>
      
      <div class="hero" style="padding:20px 22px 50px;">
        <div class="hero-inner">
          <h1 class="hero-title" style="font-size:24px;">Client <span class="accent">Networks</span></h1>
          <p class="hero-sub">Your existing customer segments.</p>
        </div>
      </div>
      
      <div class="sheet">
        <div class="sec-header">
          <h3>Client Types ({{ networks.length }})</h3>
        </div>
        
        <div id="netList">
          <transition-group name="list">
            <div v-for="net in networks" :key="net.id" class="net-row">
              <div class="net-ico">👥</div>
              <div style="flex:1;">
                <div style="font-size:14px;font-weight:700;color:var(--text);">{{ net.type }}</div>
                <div style="font-size:11px;color:var(--muted);">Qty: {{ net.qty }} · {{ net.seg }}</div>
              </div>
              <div style="display:flex;gap:6px;">
                <button class="btn btn-outline btn-sm" @click="showToast('Edit opened')">Edit</button>
                <button class="btn btn-outline btn-sm" style="color:var(--danger);border-color:var(--danger);" @click="removeNetwork(net.id)">Del</button>
              </div>
            </div>
          </transition-group>
        </div>
        
        <button class="btn btn-teal w-full mt-8" style="margin-top:20px;" @click="isModalOpen = true">+ Add Client Type</button>
      </div>

      <!-- Add Modal Bottom Sheet -->
      <transition name="slide-up">
        <div v-if="isModalOpen" id="addModal" style="position:absolute;bottom:0;left:0;right:0;background:var(--card);border-radius:var(--radius-xl) var(--radius-xl) 0 0;padding:20px;box-shadow:0 -10px 40px rgba(0,0,0,.2);z-index:300;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <span style="font-size:16px;font-weight:800;">Add Client Type</span>
            <button @click="isModalOpen = false" style="background:var(--bg);border-radius:8px;width:32px;height:32px;border:none;display:flex;align-items:center;justify-content:center;color:var(--muted);cursor:pointer;">✕</button>
          </div>
          
          <label class="form-label">Client Type *</label>
          <select class="form-input" v-model="cType">
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
          <input class="form-input" v-model="cQty" placeholder="e.g. 500–1000 sheets/month">
          
          <label class="form-label">Segment</label>
          <select class="form-input" v-model="cSeg">
            <option>B2B</option>
            <option>B2C</option>
            <option>B2G</option>
          </select>
          
          <button class="btn btn-teal w-full" @click="addNetwork" style="margin-top:8px;">Add</button>
        </div>
      </transition>
      
      <!-- Bottom Nav -->
      <nav class="bottom-nav">
        <router-link to="/dashboard" class="nav-item active"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home</router-link>
        <router-link to="/products" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>Products</router-link>
        <router-link to="/messages" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Messages</router-link>
        <router-link to="/payments" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>Payments</router-link>
        <router-link to="/profile" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile</router-link>
      </nav>

      <!-- Toast Component -->
      <div class="toast" :class="{ show: toastVisible }">{{ toastMsg }}</div>

    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isModalOpen = ref(false)
const cType = ref('')
const cQty = ref('')
const cSeg = ref('B2B')

const networks = ref([
  { id: 1, type: 'Builder / Contractor', qty: '1000+ sheets/month', seg: 'B2B' },
  { id: 2, type: 'Interior Designer', qty: '100–500 units/month', seg: 'B2B' },
  { id: 3, type: 'Furniture Manufacturer', qty: '500+ sheets/month', seg: 'B2B' },
  { id: 4, type: 'Retail Customer', qty: '1–50 units', seg: 'B2C' }
])

let nextId = 5

const toastVisible = ref(false)
const toastMsg = ref('')

const showToast = (msg) => {
  toastMsg.value = msg
  toastVisible.value = true
  setTimeout(() => {
    toastVisible.value = false
  }, 2500)
}

const addNetwork = () => {
  if (!cType.value) {
    showToast('Please select a client type')
    return
  }
  
  const qtyFinal = cQty.value.trim() || 'Negotiable'
  
  networks.value.push({
    id: nextId++,
    type: cType.value,
    qty: qtyFinal,
    seg: cSeg.value
  })
  
  cType.value = ''
  cQty.value = ''
  cSeg.value = 'B2B'
  isModalOpen.value = false
  
  showToast('Client network added!')
}

const removeNetwork = (id) => {
  networks.value = networks.value.filter(net => net.id !== id)
  showToast('Deleted')
}
</script>

<style scoped>
.form-label { font-size:12px; font-weight:700; color:var(--text); margin-bottom:6px; display:block; text-transform:uppercase; letter-spacing:.3px; }
.form-input { width:100%; border:1.5px solid var(--border); border-radius:10px; padding:12px 14px; font-size:14px; font-family:Inter,sans-serif; background:var(--card); color:var(--text); transition:var(--transition); margin-bottom:14px; }
.form-input:focus { border-color:var(--teal); box-shadow:0 0 0 3px var(--teal-dim); outline:none; }
select.form-input { appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 12px center; background-size:16px; }
textarea.form-input { resize:none; line-height:1.5; }
.form-row { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.form-section { margin-bottom:4px; }
.section-title { font-size:14px; font-weight:800; color:var(--navy); font-family:'Barlow',sans-serif; margin-bottom:14px; padding-bottom:8px; border-bottom:2px solid var(--border); }
.checkbox-group { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:14px; }
.check-pill { display:flex; align-items:center; gap:6px; padding:7px 14px; border-radius:20px; border:1.5px solid var(--border); background:var(--card); font-size:12px; font-weight:600; cursor:pointer; transition:var(--transition); user-select:none; }
.check-pill input { display:none; }
.check-pill.checked { border-color:var(--teal); background:var(--teal-dim); color:var(--teal); }
.net-row { background:var(--card);border-radius:var(--radius);padding:14px;box-shadow:var(--shadow-sm);margin-bottom:10px;display:flex;align-items:center;gap:12px; }
.net-ico { width:40px;height:40px;border-radius:12px;background:var(--teal-dim);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0; }

/* Modal Slide Up Transitions */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* List Delete Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Toast */
.toast {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: rgba(0,0,0,0.8);
  color: #fff;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 13px;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 1000;
}
.toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>