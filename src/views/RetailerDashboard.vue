<template>
  <div class="topbar">
    <RouterLink to="/retailer/dashboard" class="topbar-brand">
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
      <div class="badge"><span class="badge-dot"></span> Retailer Account</div>
      <h1 class="hero-title">Good Morning,<br><span class="accent">Welcome Back!</span></h1>
      <p class="hero-sub">Here's your retail business overview.</p>
    </div>
  </div>

  <div class="sheet">
    <div class="stats-grid anim">
      <div v-for="(s, i) in statsArr" :key="i" class="stat-card" :class="{ 'span-2': i === 0 }">
        <div class="stat-main">
          <div class="stat-info">
            <div class="stat-val">{{ s.value }}</div>
            <div class="stat-lbl">{{ s.label }}</div>
          </div>
          <div class="stat-ico" :style="s.icoStyle">{{ s.icon }}</div>
        </div>
        <div class="stat-footer">
          <span class="stat-trend" :class="s.trendClass" :style="s.trendStyle">{{ s.trend }}</span>
        </div>
      </div>
    </div>

    <p class="sec-label">Quick Actions</p>
    <div class="quick-actions">
      <RouterLink v-for="action in quickActions" :key="action.label" :to="action.to" class="qa-btn">
        <div class="qa-ico" :style="action.icoStyle">{{ action.icon }}</div>
        {{ action.label }}
      </RouterLink>
    </div>

    <div class="sec-header mt-8">
      <h3>Recent Activity</h3>
      <RouterLink to="/retailer/enquiries">View All</RouterLink>
    </div>
    
    <div class="card">
      <div v-for="item in recentActivity" :key="item.id" class="activity-item">
        <div class="act-dot" :class="{ warn: item.warn }"></div>
        <div class="act-body">
          <div class="act-time">{{ item.time }}</div>
          <div class="act-text" v-html="item.text"></div>
        </div>
      </div>
    </div>

    <div class="card mt-12" style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <span style="font-size:14px;font-weight:700;color:var(--navy);">Profile Strength</span>
        <span style="font-size:14px;font-weight:800;color:var(--teal);">{{ profileStrength }}%</span>
      </div>
      <div style="height:6px;background:#d1fae5;border-radius:4px;overflow:hidden;">
        <div :style="{ width: profileStrength + '%' }" style="height:100%;background:var(--teal);border-radius:4px;"></div>
      </div>
      <p style="font-size:12px;color:var(--muted);margin-top:8px;">Complete your profile to get more buyer enquiries.</p>
      <RouterLink to="/retailer/profile" style="display:inline-block;margin-top:10px;font-size:12px;font-weight:700;color:var(--teal);">
        Complete Profile →
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

import { RouterLink } from 'vue-router'
import axios from 'axios'

const toastMessage = ref('')
const toastVisible = ref(false)
const loading = ref(false)
const error = ref('')

const statsArr = ref([
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
    icon: '🛒',
    value: 0,
    label: 'Requirements',
    trend: 'Post New',
    trendClass: '',
    trendStyle: 'color:var(--teal);font-weight:700;',
    icoStyle: 'background:#e8faf0;color:#16a34a;'
  },
  {
    icon: '🏷️',
    value: 7,
    label: 'Product Categories',
    trend: 'Browse All',
    trendClass: '',
    trendStyle: 'color:var(--muted)',
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
const profileStrength = ref(55)

const quickActions = ref([
  { label: 'Dashboard',                to: '/retailer/dashboard',         icon: '🏠', icoStyle: 'background:#f1f5f9;color:#475569;' },
  { label: 'Company Portfolio (20%)',  to: '/retailer/company-profile',   icon: '🏢', icoStyle: 'background:#e8f4fe;color:#2563eb;' },
  { label: 'Product Portfolio',        to: '/manufacturer/products/portfolio', icon: '🛒', icoStyle: 'background:#f3e8ff;color:#9333ea;' },
  { label: 'Branches',                 to: '/retailer/branches',          icon: '🏢', icoStyle: 'background:#e0f2fe;color:#0369a1;' },
  { label: 'Business Network Areas',   to: '/retailer/distribution-areas', icon: '🕸️', icoStyle: 'background:#f0fdf4;color:#15803d;' },
  { label: 'Client Networks',          to: '/retailer/client-networks',   icon: '👥', icoStyle: 'background:#ede9fe;color:#7c3aed;' },
  { label: 'All Enquiries',            to: '/retailer/enquiries',         icon: '📩', icoStyle: 'background:#e8faf0;color:#16a34a;' },
  { label: 'Interested Products',      to: '/retailer/requirements',      icon: '🏢', icoStyle: 'background:#fffbeb;color:#d97706;' },
  { label: 'Settings',                 to: '/retailer/settings',          icon: '⚙️', icoStyle: 'background:#f1f5f9;color:#475569;' },
  { label: 'Gallery',                  to: '/retailer/gallery',           icon: '🖼️', icoStyle: 'background:#e8f4fe;color:#2563eb;' },
  { label: 'Job Posted',               to: '/retailer/jobs',              icon: '🏢', icoStyle: 'background:#fee2e2;color:#dc2626;' },
  { label: 'Membership Plan',          to: '/retailer/membership',        icon: '👥', icoStyle: 'background:#f3e8ff;color:#9333ea;' },
])

const recentActivity = ref([
  { id: 1, time: '30 min ago',      text: 'New enquiry from a buyer in Pune.',                                      warn: false },
  { id: 2, time: '2 hours ago',     text: 'Product listing <strong>Premium Laminates</strong> is under review.',   warn: true  },
  { id: 3, time: 'Yesterday, 2:00 PM', text: 'Your profile received 12 views today.',                              warn: false },
])

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2500)
}

async function fetchDashboardStats() {
  try {
    loading.value = true
    const response = await axios.get('/api/retailer/dashboard')
    const data = response.data
    
    if (data.stats) {
      const map = { subscription: 0, requirements: 1, categories: 2, branches: 3 }
      if (data.stats.subscription != null) statsArr.value[map.subscription].value = data.stats.subscription
      if (data.stats.requirements != null) statsArr.value[map.requirements].value = data.stats.requirements
      if (data.stats.categories   != null) statsArr.value[map.categories].value   = data.stats.categories
      if (data.stats.branches     != null) statsArr.value[map.branches].value     = data.stats.branches
    }
    
    profileStrength.value = data.profileStrength ?? profileStrength.value
    if (data.recentActivity) recentActivity.value = data.recentActivity
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load dashboard data'
  } finally {
    loading.value = false
  }
}

fetchDashboardStats()
</script>

<style scoped>
.stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; perspective: 1000px; }
.stat-card { background: #fff; border: 1.5px solid var(--border); border-radius: 18px; padding: 16px; box-shadow: var(--shadow-sm); transition: var(--transition); display: flex; flex-direction: column; gap: 10px; }
.stat-card:active { transform: scale(0.96); }
.stat-card.span-2 { grid-column: span 2; }
.stat-card.span-2 .stat-main { align-items: center; }

.stat-main { display: flex; justify-content: space-between; align-items: flex-start; }
.stat-val { font-size: 18px; font-weight: 800; color: var(--navy); line-height: 1; margin-bottom: 4px; }
.stat-lbl { font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; }
.stat-ico { width: 38px; height: 38px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 18px; }

.stat-footer { display: flex; align-items: center; }
.stat-trend { font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 6px; background: #f1f5f9; }

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
