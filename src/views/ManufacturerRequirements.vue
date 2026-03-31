<template>

        <div class="topbar">
          <a href="/manufacturer/dashboard" class="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </a>
          <span class="topbar-title">Requirements</span>
          <div style="width:36px;">

        <div class="hero" style="padding:20px 22px 50px;">
          <div class="hero-inner">
            <h1 class="hero-title" style="font-size:24px;">Buyer <span class="accent">Requirements</span></h1>
            <p class="hero-sub">Buyers looking for your products.</p>

        <div class="sheet">

          <!-- Search -->
          <div class="search-bar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search requirements..." v-model="searchQuery" />

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

          <!-- Requirement Cards -->
          <div
            v-for="req in filteredRequirements"
            :key="req.id"
            class="req-card"
          >
            <div class="req-head">
              <div>
                <div class="req-title">{{ req.title }}
                <div class="req-meta">
                  <span>📍 {{ req.location }}</span>
                  <span>🕐 {{ req.time }}</span>

              <span
                class="badge"
                :class="req.status === 'New' ? 'badge-success' : ''"
                :style="req.status !== 'New' ? 'background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;' : ''"
              >
                {{ req.status }}
              </span>
          
            <div class="req-qty">Quantity: {{ req.quantity }}
            <div class="req-tags">
              <span v-for="tag in req.tags" :key="tag" class="req-tag">{{ tag }}</span>
          
            <div style="font-size:12px;color:var(--muted);margin-bottom:12px;">{{ req.budgetInfo }}

            <button
              v-if="req.status === 'New'"
              class="btn btn-teal btn-sm w-full"
              :disabled="req.loading"
              @click="sendQuotation(req)"
            >
              {{ req.loading ? 'Sending...' : 'Send Quotation' }}
            </button>
            <button
              v-else
              class="btn btn-outline btn-sm w-full"
              @click="viewResponse(req)"
            >
              View Response
            </button>

            <p v-if="req.error" style="color:red;font-size:11px;margin-top:6px;">{{ req.error }}</p>

          <!-- Empty state -->
          <p v-if="filteredRequirements.length === 0" style="text-align:center;color:var(--muted);font-size:13px;padding:24px 0;">
            No requirements found.
          </p>

      

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
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'

// ─── Filter Tabs ───
const filterTabs = [
  { key: 'all', label: 'All (7)' },
  { key: 'new', label: 'New (3)' },
  { key: 'responded', label: 'Responded (4)' }
]
const activeFilter = ref('all')
const searchQuery = ref('')

// ─── Requirements ───
const requirements = ref([
  {
    id: 1,
    title: 'Gurjan Face Commercial Ply 18mm',
    location: 'Nagpur, MH',
    time: '2 hours ago',
    status: 'New',
    quantity: '500 Sheets',
    tags: ['Plywood', 'Commercial', 'Bulk'],
    budgetInfo: 'Budget: ₹60–75 per sheet · Delivery: Within 7 days',
    loading: false,
    error: ''
  },
  {
    id: 2,
    title: 'Natural Veneers — Walnut Finish',
    location: 'Pune, MH',
    time: '1 day ago',
    status: 'New',
    quantity: '200 Sq. ft',
    tags: ['Veneer', 'Walnut'],
    budgetInfo: 'Budget: Negotiable · Delivery: Flexible',
    loading: false,
    error: ''
  },
  {
    id: 3,
    title: 'HDF Boards 6mm for Furniture',
    location: 'Mumbai, MH',
    time: '3 days ago',
    status: 'Responded',
    quantity: '1000 Sheets',
    tags: ['HDF', 'Furniture', 'Large Order'],
    budgetInfo: 'Budget: ₹45–55 per sheet',
    loading: false,
    error: ''
  }
])

const filteredRequirements = computed(() => {
  return requirements.value.filter(r => {
    const matchesFilter =
      activeFilter.value === 'all' ||
      r.status.toLowerCase() === activeFilter.value
    const matchesSearch =
      !searchQuery.value ||
      r.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      r.location.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesFilter && matchesSearch
  })
})

// ─── Toast ───
const toastVisible = ref(false)
const toastMessage = ref('')

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2500)
}

// ─── Send Quotation (API) ───
async function sendQuotation(req) {
  req.loading = true
  req.error = ''
  try {
    await axios.post('/api/requirements/quotation', { requirementId: req.id })
    req.status = 'Responded'
    showToast('Response sent!')
  } catch (error) {
    req.error = error.response?.data?.message || 'Failed to send quotation.'
  } finally {
    req.loading = false
  }
}

// ─── View Response ───
function viewResponse(req) {
  showToast('Message thread opened')
}
</script>

<style scoped>
.filter-tabs { display:flex; gap:8px; overflow-x:auto; padding-bottom:2px; scrollbar-width:none; margin-bottom:16px; }
.filter-tabs::-webkit-scrollbar { display:none; }
.ftab { flex-shrink:0; padding:7px 16px; border-radius:20px; font-size:12px; font-weight:700; border:1.5px solid var(--border); background:var(--card); color:var(--muted); cursor:pointer; transition:var(--transition); }
.ftab.active { background:var(--navy); color:#fff; border-color:var(--navy); }
.req-card { background:var(--card); border-radius:var(--radius); padding:16px; margin-bottom:12px; box-shadow:var(--shadow-sm); }
.req-head { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:10px; }
.req-title { font-size:15px; font-weight:700; color:var(--text); margin-bottom:4px; }
.req-meta { font-size:11px; color:var(--muted); display:flex; gap:12px; flex-wrap:wrap; }
.req-qty { font-size:13px; font-weight:600; color:var(--navy); margin-bottom:8px; }
.req-tags { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:12px; }
.req-tag { padding:4px 10px; border-radius:20px; font-size:11px; font-weight:600; background:var(--bg); color:var(--muted); border:1px solid var(--border); }
</style>
