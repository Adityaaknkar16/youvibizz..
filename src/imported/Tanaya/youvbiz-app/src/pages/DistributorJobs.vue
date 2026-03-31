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
          <a href="#" @click.prevent="$router.back()" class="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </a>
          <span class="topbar-title">Job Posts</span>
          <a href="/pages/task/job-post" class="topbar-icon-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </a>
        </div>

        <div class="hero" style="padding:20px 22px 50px;">
          <div class="hero-inner">
            <h1 class="hero-title" style="font-size:24px;">Job <span class="accent">Listings</span></h1>
            <p class="hero-sub">Manage open positions at your company.</p>
          </div>
        </div>

        <div class="sheet">
          <div class="filter-tabs">
            <button
              v-for="tab in tabs"
              :key="tab.label"
              class="ftab"
              :class="{ active: activeTab === tab.label }"
              @click="setActiveTab(tab.label)"
            >{{ tab.label }}</button>
          </div>

          <div v-for="job in jobs" :key="job.id" class="job-card">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:6px;">
              <div class="job-title">{{ job.title }}</div>
              <span class="badge badge-success">{{ job.status }}</span>
            </div>
            <div class="job-meta">
              <span>📍 {{ job.location }}</span>
              <span>💼 {{ job.type }}</span>
              <span>💰 {{ job.salary }}</span>
            </div>
            <div class="job-footer">
              <span class="job-apps">👥 {{ job.applicants }} Applicants</span>
              <div style="display:flex;gap:8px;">
                <button class="btn btn-outline btn-sm" @click="showToast('Edit job')">Edit</button>
                <button class="btn btn-outline btn-sm" style="color:var(--danger);border-color:var(--danger);" @click="showToast('Job closed')">Close</button>
              </div>
            </div>
          </div>

          <a href="/pages/task/job-post" class="btn btn-teal w-full mt-8" style="display:flex;align-items:center;justify-content:center;gap:8px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Post New Job
          </a>
        </div>

        <nav class="bottom-nav">
          <a href="/pages/adityavuetask/distributor-dashboard" class="nav-item active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home
          </a>
          <a href="/pages/adityavuetask/distributor-products" class="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>Products
          </a>
          <a href="/pages/adityavuetask/distributor-messages" class="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Messages
          </a>
          <a href="/pages/adityavuetask/distributor-transactions" class="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>Payments
          </a>
          <a href="/pages/adityavuetask/distributor-profile" class="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile
          </a>
        </nav>

      </div>

      <!-- Toast -->
      <div class="toast" :class="{ show: toastVisible }">{{ toastMessage }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('All (2)')

const tabs = [
  { label: 'All (2)' },
  { label: 'Active (2)' },
  { label: 'Closed (0)' }
]

const jobs = ref([
  {
    id: 1,
    title: 'Distribution Executive',
    status: 'Active',
    location: 'Pune',
    type: 'Full Time',
    salary: '₹22K–30K/mo',
    applicants: 9
  },
  {
    id: 2,
    title: 'Warehouse & Logistics Manager',
    status: 'Active',
    location: 'Mumbai',
    type: 'Full Time',
    salary: '₹35K–45K/mo',
    applicants: 14
  }
])

const toastMessage = ref('')
const toastVisible = ref(false)
let toastTimer = null

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastVisible.value = false }, 2500)
}

function setActiveTab(label) {
  activeTab.value = label
}
</script>

<style scoped>
.job-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 18px;
  margin-bottom: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
}

.job-title {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
}

.job-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 13px;
  color: #6b7280;
  margin: 10px 0;
}

.job-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.job-apps {
  font-size: 13px;
  color: #374151;
}
</style>