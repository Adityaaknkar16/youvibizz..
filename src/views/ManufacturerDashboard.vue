<template>
  <div class="topbar">
    <RouterLink to="/" class="topbar-brand">
      <img src="/Media/Logo.png" alt="YouVBiZ" style="height:32px;width:auto;object-fit:contain;">
    </RouterLink>
    <span class="topbar-title">Dashboard</span>
    <div class="topbar-actions">
      <button class="topbar-icon-btn" @click="showToast('No new notifications')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
      </button>
    </div>
  </div>

  <div class="hero" style="padding-bottom:50px;">
    <div class="hero-inner">
      <div class="badge"><span class="badge-dot"></span> Manufacturer Account</div>
      <h1 class="hero-title">Good Morning,<br><span class="accent">Welcome Back!</span></h1>
      <p class="hero-sub">Here's your business overview for today.</p>
    </div>
  </div>

  <div class="sheet">
    <!-- Stats -->
    <div class="dash-stats">
      <div v-for="stat in stats" :key="stat.label" class="dash-stat">
        <div class="dash-stat-ico" :style="stat.icoStyle">{{ stat.icon }}</div>
        <div class="dash-stat-val">{{ stat.value }}</div>
        <div class="dash-stat-lbl">{{ stat.label }}</div>
        <div class="dash-stat-trend" :class="stat.trendClass" :style="stat.trendStyle">{{ stat.trend }}</div>
      </div>
    </div>

    <!-- Quick Actions -->
    <p class="sec-label">Quick Actions</p>
    <div class="quick-actions">
      <RouterLink
        v-for="action in quickActions"
        :key="action.label"
        :to="action.to"
        class="qa-btn"
      >
        <div class="qa-ico" :style="action.icoStyle">{{ action.icon }}</div>
        {{ action.label }}
      </RouterLink>
    </div>

    <!-- Recent Activity -->
    <div class="sec-header mt-8">
      <h3>Recent Activity</h3>
      <RouterLink to="/manufacturer/enquiries">View All</RouterLink>
    </div>
    
    <div class="card">
      <div v-if="loading" style="text-align:center;padding:16px;color:var(--muted);">
        Loading...
      </div>
      <div v-else-if="error" style="text-align:center;padding:16px;color:var(--danger);">
        {{ error }}
      </div>
      <template v-else>
        <div
          v-for="item in recentActivity"
          :key="item.id"
          class="activity-item"
        >
          <div class="act-dot" :class="{ warn: item.warn }"></div>
          <div class="act-body">
            <div class="act-time">{{ item.time }}</div>
            <div class="act-text" v-html="item.text"></div>
          </div>
        </div>
      </template>
    </div>

    <!-- Profile Strength -->
    <div class="card mt-12" style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <span style="font-size:14px;font-weight:700;color:var(--navy);">Profile Strength</span>
        <span style="font-size:14px;font-weight:800;color:var(--teal);">{{ profileStrength }}%</span>
      </div>
      <div style="height:6px;background:#d1fae5;border-radius:4px;overflow:hidden;">
        <div :style="{ width: profileStrength + '%' }" style="height:100%;background:var(--teal);border-radius:4px;"></div>
      </div>
      <p style="font-size:12px;color:var(--muted);margin-top:8px;">Add certificates to reach 100% and get more visibility.</p>
      <RouterLink
        to="/manufacturer/certificates"
        style="display:inline-block;margin-top:10px;font-size:12px;font-weight:700;color:var(--teal);"
      >
        Add Certificates →
      </RouterLink>
    </div>

    <!-- Toast -->
    <div class="toast" :class="{ show: toastVisible }">{{ toastMessage }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'

// ── Loading / Error state ──
const loading = ref(false)
const error = ref('')

// ── Toast ──
const toastVisible = ref(false)
const toastMessage = ref('')

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2500)
}

// ── Stats ──
// ── Stats ──
// ── Stats ──
// ── Stats ──
const stats = ref([
  {
    icon: '⭐',
    value: 'No active plan',
    label: 'Subscription',
    trend: 'View Plans',
    trendClass: '',
    trendStyle: 'color:var(--teal);font-weight:700;',
    icoStyle: 'background:#f3e8ff;color:#9333ea;'
  },
  {
    icon: '🤝',
    value: 0,
    label: 'Distributors',
    trend: 'None yet',
    trendClass: '',
    trendStyle: 'color:var(--muted)',
    icoStyle: 'background:#ede9fe;color:#7c3aed;'
  },
  {
    icon: '📩',
    value: 0,
    label: 'Enqueries',
    trend: 'No new',
    trendClass: '',
    trendStyle: 'color:var(--muted)',
    icoStyle: 'background:#e8faf0;color:#16a34a;'
  },
  {
    icon: '🏷️',
    value: 10,
    label: 'Product Categories',
    trend: 'Listed',
    trendClass: '',
    trendStyle: 'color:var(--teal);font-weight:700;',
    icoStyle: 'background:#e8f4fe;color:#2563eb;'
  },
  {
    icon: '🏢',
    value: 0,
    label: 'Branches Listed',
    trend: 'Add Branch',
    trendClass: '',
    trendStyle: 'color:var(--muted)',
    icoStyle: 'background:#e0f2fe;color:#0369a1;'
  }
])

// ── Profile strength ──
const profileStrength = ref(75)

// ── Quick Actions ──
const quickActions = ref([
  { label: 'Dashboard',                to: '/manufacturer/dashboard',    icon: '🏠', icoStyle: 'background:#f1f5f9;color:#475569;' },
  { label: 'Company Profile (100%)',   to: '/manufacturer/profile/edit',  icon: '🏢', icoStyle: 'background:#e8f4fe;color:#2563eb;' },
  { label: 'Product Profile',          to: '/manufacturer/products/portfolio',      icon: '🛍️', icoStyle: 'background:#f3e8ff;color:#9333ea;' },
  { label: 'Branches',                 to: '/manufacturer/branches',      icon: '🏢', icoStyle: 'background:#e0f2fe;color:#0369a1;' },
  { label: 'Existing Distributors',    to: '/manufacturer/distributors',  icon: '🤝', icoStyle: 'background:#ede9fe;color:#7c3aed;' },
  { label: 'Area Open for Distribution', to: '/manufacturer/distribution-areas', icon: '🏢', icoStyle: 'background:#f0fdf4;color:#15803d;' },
  { label: 'Enquiry Received',         to: '/manufacturer/enquiries',     icon: '📩', icoStyle: 'background:#e8faf0;color:#16a34a;' },
  { label: 'Support Type',             to: '/manufacturer/support',       icon: '📄', icoStyle: 'background:#fffbeb;color:#d97706;' },
  { label: 'Gallery',                  to: '/manufacturer/gallery',       icon: '🖼️', icoStyle: 'background:#e8f4fe;color:#2563eb;' },
  { label: 'Certificates',             to: '/manufacturer/certificates',  icon: '🏅', icoStyle: 'background:#f0fdf4;color:#16a34a;' },
  { label: 'Job Posted',               to: '/manufacturer/jobs',          icon: '💼', icoStyle: 'background:#fee2e2;color:#dc2626;' },
  { label: 'Membership Plan',          to: '/manufacturer/membership',    icon: '⭐', icoStyle: 'background:#f3e8ff;color:#9333ea;' }
])

// ── Recent Activity ──
const recentActivity = ref([
  { id: 1, time: '2 hours ago',       text: 'New enquiry received from Rajesh Traders.',                                               warn: false },
  { id: 2, time: '5 hours ago',       text: 'Your product listing is pending approval.',                                               warn: true  },
  { id: 3, time: 'Yesterday, 3:45 PM', text: 'A business viewed your profile.',                                                        warn: false },
  { id: 4, time: 'Yesterday, 11:20 AM', text: 'New requirement posted for <strong>Gurjan Face Commercial Ply</strong> in Nagpur.',     warn: true  }
])

// ── API: Fetch dashboard data ──
async function fetchDashboard() {
  try {
    loading.value = true
    error.value = ''
    const response = await axios.get('/api/manufacturer/dashboard')
    const data = response.data

    // Merge API values into stats
    if (data.stats) {
      const map = { subscription: 0, distributors: 1, enquiries: 2, categories: 3, branches: 4 }
      if (data.stats.subscription != null) stats.value[map.subscription].value = data.stats.subscription
      if (data.stats.distributors != null) stats.value[map.distributors].value = data.stats.distributors
      if (data.stats.enquiries    != null) stats.value[map.enquiries].value    = data.stats.enquiries
      if (data.stats.categories   != null) stats.value[map.categories].value   = data.stats.categories
      if (data.stats.branches     != null) stats.value[map.branches].value     = data.stats.branches
    }
    if (data.profileStrength != null) profileStrength.value = data.profileStrength
    if (data.recentActivity)          recentActivity.value  = data.recentActivity
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load dashboard data.'
  } finally {
    loading.value = false
  }
}

fetchDashboard()
</script>

<style scoped>
.welcome-banner { background:linear-gradient(135deg,var(--navy),var(--navy3)); border-radius:var(--radius-lg); padding:20px; margin-bottom:18px; position:relative; overflow:hidden; }
.welcome-banner::after { content:''; position:absolute; top:-40px; right:-40px; width:120px; height:120px; border-radius:50%; background:rgba(34,162,138,.15); pointer-events:none; }
.welcome-banner h3 { font-size:20px; font-weight:800; color:#fff; margin-bottom:4px; }
.welcome-banner p { font-size:12px; color:rgba(255,255,255,.6); }
.welcome-tag { display:inline-flex; align-items:center; gap:5px; background:var(--teal-dim); border:1px solid rgba(34,162,138,.3); border-radius:12px; padding:3px 10px; font-size:10px; font-weight:700; color:var(--teal); margin-bottom:10px; }
.dash-stats { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:18px; }
.dash-stats .dash-stat:first-child { grid-column: span 2; }
.quick-actions { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:18px; }
.qa-btn { background:var(--card); border-radius:var(--radius); padding:16px 14px; box-shadow:var(--shadow-sm); display:flex; align-items:center; gap:10px; font-size:13px; font-weight:600; color:var(--text); transition:var(--transition); text-decoration: none; }
.qa-btn:hover { transform:translateY(-2px); box-shadow:var(--shadow); }
.qa-ico { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0; }
.activity-item { padding:12px 0; border-bottom:1px solid var(--border); display:flex; align-items:flex-start; gap:10px; }
.activity-item:last-child { border-bottom:none; }
.act-dot { width:8px; height:8px; border-radius:50%; background:var(--teal); margin-top:5px; flex-shrink:0; }
.act-dot.warn { background:var(--warning); }
.act-body { flex:1; }
.act-time { font-size:10px; color:var(--muted); font-weight:600; margin-bottom:2px; }
.act-text { font-size:13px; color:var(--text); line-height:1.4; }
</style>
