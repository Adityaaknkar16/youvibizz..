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

        <!-- Topbar -->
        <div class="topbar">
          <a href="#" @click.prevent="$router.back()" class="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </a>
          <span class="topbar-title">Requirements</span>
          <button class="topbar-icon-btn" @click="showAddModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>

        <!-- Hero -->
        <div class="hero" style="padding:20px 22px 50px;">
          <div class="hero-inner">
            <h1 class="hero-title" style="font-size:24px;">My <span class="accent">Requirements</span></h1>
            <p class="hero-sub">Post and manage your supply needs.</p>
          </div>
        </div>

        <!-- Sheet -->
        <div class="sheet">

          <!-- Filter Tabs -->
          <div class="filter-tabs">
            <button
              v-for="tab in filterTabs"
              :key="tab"
              class="ftab"
              :class="{ active: activeFilter === tab }"
              @click="activeFilter = tab"
            >{{ tab }}</button>
          </div>

          <!-- Requirements List -->
          <div id="reqList">
            <div v-for="req in requirements" :key="req.id" class="req-card">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px;">
                <div style="font-size:15px;font-weight:700;color:var(--text);">{{ req.product }}</div>
                <span
                  class="badge"
                  :class="req.status === 'New' ? 'badge-success' : ''"
                  :style="req.status === 'Responded' ? 'background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;' : ''"
                >{{ req.status }}</span>
              </div>
              <div style="font-size:12px;color:var(--muted);display:flex;gap:14px;flex-wrap:wrap;margin-bottom:8px;">
                <span>📍 {{ req.location }}</span>
                <span>📦 {{ req.qty }}</span>
              </div>
              <div style="font-size:13px;color:var(--text);background:var(--bg);border-radius:10px;padding:10px;margin-bottom:12px;">{{ req.notes }}</div>
              <div style="display:flex;gap:8px;">
                <button class="btn btn-outline btn-sm" style="flex:1;" @click="showToast('Edit opened')">Edit</button>
                <button class="btn btn-outline btn-sm" style="color:var(--danger);border-color:var(--danger);" @click="deleteReq(req.id)">Delete</button>
              </div>
            </div>
          </div>

          <!-- Add New Requirement Button -->
          <button class="btn btn-teal w-full mt-8" @click="showAddModal" style="margin-bottom:24px;">
            + Add New Requirement
          </button>

        </div><!-- /sheet -->

        <!-- ── Add Modal — inside .app, position:absolute, exactly as original ── -->
        <div
          id="addModal"
          :style="{ display: isModalOpen ? 'block' : 'none', position:'absolute', bottom:'0', left:'0', right:'0', background:'var(--card)', borderRadius:'var(--radius-xl) var(--radius-xl) 0 0', padding:'20px', boxShadow:'0 -10px 40px rgba(0,0,0,.2)', zIndex:300, maxHeight:'80%', overflowY:'auto' }"
        >
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <span style="font-size:16px;font-weight:800;">Add Requirement</span>
            <button @click="isModalOpen = false" style="background:var(--bg);border-radius:8px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;color:var(--muted);">✕</button>
          </div>

          <label class="form-label">Product / Category *</label>
          <input class="form-input" v-model="form.product" placeholder="e.g. Plywood 18mm, Marine Ply" />

          <label class="form-label">Location *</label>
          <input class="form-input" v-model="form.location" placeholder="e.g. Pune, Maharashtra" />

          <label class="form-label">Quantity Required</label>
          <input class="form-input" v-model="form.qty" placeholder="e.g. 500 sheets/month" />

          <label class="form-label">Additional Notes</label>
          <textarea class="form-input" v-model="form.notes" rows="2" placeholder="Specifications, delivery terms, etc."></textarea>

          <p v-if="formError" style="color:red;font-size:12px;margin-bottom:8px;">{{ formError }}</p>

          <button class="btn btn-teal w-full" :disabled="loading" @click="addReq">
            {{ loading ? 'Submitting...' : 'Submit Requirement' }}
          </button>
        </div>

      </div><!-- /app -->

      <!-- Bottom Nav -->
      <nav class="bottom-nav">
        <a href="/pages/adityavuetask/distributor-dashboard" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home
        </a>
        <a href="/pages/adityavuetask/distributor-products" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>Products
        </a>
        <a href="/pages/adityavuetask/distributor-messages" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Messages
        </a>
        <a href="/pages/tanaya/membership-plan" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Membership
        </a>
        <a href="/pages/adityavuetask/distributor-profile" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile
        </a>
      </nav>

      <!-- Toast — same position as original (inside phone-screen) -->
      <div class="toast" :class="{ show: toast.show }">{{ toast.message }}</div>

    </div><!-- /phone-screen -->
  </div><!-- /phone-frame -->
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'

// ─── Filter Tabs ──────────────────────────────────────────────
const filterTabs   = ['All (3)', 'Active', 'Responded']
const activeFilter = ref('All (3)')

// ─── Requirements list (seed data matches original HTML) ──────
const requirements = ref([
  { id: 1, product: 'Plywood Distribution', status: 'New',       location: 'Maharashtra', qty: '500+ sheets/month', notes: 'Nagpur region preferred'      },
  { id: 2, product: 'Laminate Wholesale',   status: 'Responded', location: 'Gujarat',     qty: 'Negotiable',        notes: 'Looking for steady supplier'  },
  { id: 3, product: 'Hardware Fittings',    status: 'New',       location: 'Pan India',   qty: 'Large Volume',      notes: 'Modular furniture components' },
])

// ─── Add Modal state ──────────────────────────────────────────
const isModalOpen = ref(false)
const loading     = ref(false)
const formError   = ref('')

const form = reactive({ product: '', location: '', qty: '', notes: '' })

function showAddModal() {
  formError.value = ''
  isModalOpen.value = true
}

// ─── Toast ────────────────────────────────────────────────────
const toast = reactive({ show: false, message: '' })

function showToast(msg) {
  toast.message = msg
  toast.show    = true
  setTimeout(() => { toast.show = false }, 2500)
}

// ─── Add Requirement (API + local state) ─────────────────────
async function addReq() {
  formError.value = ''
  if (!form.product.trim() || !form.location.trim()) {
    formError.value = 'Please fill required fields'
    return
  }

  const payload = {
    product:  form.product.trim(),
    location: form.location.trim(),
    qty:      form.qty.trim()      || 'Negotiable',
    notes:    form.notes.trim()    || 'No additional notes',
    status:   'New',
  }

  try {
    loading.value = true
    await axios.post('/api/requirements', payload)
    payload.id = Date.now()
    requirements.value.unshift(payload)
    isModalOpen.value   = false
    form.product  = ''
    form.location = ''
    form.qty      = ''
    form.notes    = ''
    showToast('Requirement added!')
  } catch (err) {
    formError.value = err.response?.data?.message || 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}

// ─── Delete Requirement ───────────────────────────────────────
async function deleteReq(id) {
  try {
    await axios.delete(`/api/requirements/${id}`)
    requirements.value = requirements.value.filter(r => r.id !== id)
    showToast('Deleted')
  } catch (err) {
    showToast('Failed to delete')
  }
}
</script>

<style scoped>
.form-label { font-size:12px; font-weight:700; color:var(--text); margin-bottom:6px; display:block; text-transform:uppercase; letter-spacing:.3px; }
.form-input { width:100%; border:1.5px solid var(--border); border-radius:10px; padding:12px 14px; font-size:14px; font-family:Inter,sans-serif; background:var(--card); color:var(--text); transition:var(--transition); margin-bottom:14px; box-sizing:border-box; }
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
.filter-tabs { display:flex; gap:8px; overflow-x:auto; padding-bottom:2px; scrollbar-width:none; margin-bottom:16px; }
.filter-tabs::-webkit-scrollbar { display:none; }
.ftab { flex-shrink:0; padding:7px 16px; border-radius:20px; font-size:12px; font-weight:700; border:1.5px solid var(--border); background:var(--card); color:var(--muted); cursor:pointer; transition:var(--transition); }
.ftab.active { background:var(--navy); color:#fff; border-color:var(--navy); }
.req-card { background:var(--card); border-radius:var(--radius); padding:16px; margin-bottom:12px; box-shadow:var(--shadow-sm); }
</style>
