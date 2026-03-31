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
            <p class="hero-sub">Manage job postings for your store.</p>
          </div>
        </div>

        <div class="sheet">

          <!-- Filter Tabs -->
          <div class="filter-tabs">
            <button
              v-for="tab in tabs"
              :key="tab.label"
              class="ftab"
              :class="{ active: activeTab === tab.label }"
              @click="setActiveTab(tab.label)"
            >{{ tab.label }}</button>
          </div>

          <!-- Job Cards -->
          <div v-for="job in filteredJobs" :key="job.id" class="job-card">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:6px;">
              <div class="job-title">{{ job.title }}</div>
              <!-- FIX: Badge style depends on status — green for Active, grey for Closed -->
              <span v-if="job.status === 'active'" class="badge badge-success">Active</span>
              <span v-else class="badge" style="background:#f3f4f6;color:#6b7280;border:1px solid #e5e7eb;">Closed</span>
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
                <button
                  class="btn btn-outline btn-sm"
                  style="color:var(--danger);border-color:var(--danger);"
                  :disabled="job.status === 'closed'"
                  @click="closeJob(job)"
                >Close</button>
              </div>
            </div>
          </div>

          <!-- Empty state -->
          <div v-if="filteredJobs.length === 0" style="text-align:center;padding:32px 16px;color:var(--muted);font-size:13px;">
            No job posts found.
          </div>

          <a href="/pages/task/job-post" class="btn btn-teal w-full mt-8" style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:24px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Post New Job
          </a>

        </div>

      </div><!-- /app -->

      <!-- FIX: bottom-nav and toast moved OUTSIDE .app, as siblings inside
           .phone-screen — matching the HTML structure exactly.
           Previously they were nested inside .app which broke the fixed
           bottom nav layout. -->
      <nav class="bottom-nav">
        <a href="/retailer/dashboard" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home
        </a>
        <a href="/retailer/products" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>Products
        </a>
        <a href="/retailer/messages" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Messages
        </a>
        <a href="/pages/tanaya/retailer-transactions" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>Payments
        </a>
        <a href="/retailer/profile" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile
        </a>
      </nav>

      <div class="toast" :class="{ show: toastVisible }">{{ toastMessage }}</div>

    </div><!-- /phone-screen -->
  </div><!-- /phone-frame -->
</template>

<script setup>
import { ref, computed } from 'vue'

// ── Tabs ──────────────────────────────────────────────────────
const activeTab = ref('All (2)')

const tabs = [
  { label: 'All (2)' },
  { label: 'Active (2)' },
  { label: 'Closed (0)' }
]

function setActiveTab(label) {
  activeTab.value = label
}

// ── Jobs data ─────────────────────────────────────────────────
// FIX: Added 'status' field (active / closed) so tab filtering
// and badge rendering both work correctly.
const jobs = ref([
  {
    id: 1,
    title: 'Store Sales Executive',
    status: 'active',
    location: 'Pune',
    type: 'Full Time',
    salary: '₹15K–20K/mo',
    applicants: 6
  },
  {
    id: 2,
    title: 'Store Manager',
    status: 'active',
    location: 'Pune',
    type: 'Full Time',
    salary: '₹25K–35K/mo',
    applicants: 4
  }
])

// FIX: filteredJobs computed so tab clicks actually filter the list
const filteredJobs = computed(() => {
  if (activeTab.value === 'Active (2)') return jobs.value.filter(j => j.status === 'active')
  if (activeTab.value === 'Closed (0)') return jobs.value.filter(j => j.status === 'closed')
  return jobs.value
})

function closeJob(job) {
  job.status = 'closed'
  showToast('Job closed')
}

// ── Toast ─────────────────────────────────────────────────────
const toastMessage = ref('')
const toastVisible = ref(false)
let toastTimer = null

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastVisible.value = false }, 2500)
}
</script>

<style scoped>
/* ── Filter tabs ──────────────────────────────────────────────
   FIX: Entire <style scoped> block was missing. All classes below
   are taken directly from the HTML <style> block.
*/
.filter-tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 2px;
  scrollbar-width: none;
  margin-bottom: 16px;
}
.filter-tabs::-webkit-scrollbar { display: none; }

.ftab {
  flex-shrink: 0;
  padding: 7px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  border: 1.5px solid var(--border);
  background: var(--card);
  color: var(--muted);
  cursor: pointer;
  transition: var(--transition);
}
.ftab.active {
  background: var(--navy);
  color: #fff;
  border-color: var(--navy);
}

/* ── Job cards ────────────────────────────────────────────────*/
.job-card {
  background: var(--card);
  border-radius: var(--radius);
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: var(--shadow-sm);
}
.job-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 4px;
}
.job-meta {
  font-size: 11px;
  color: var(--muted);
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.job-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.job-apps {
  font-size: 12px;
  color: var(--teal);
  font-weight: 600;
}
</style>