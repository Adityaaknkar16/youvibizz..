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
        <a href="#" class="back-btn" @click="router.go(-1)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </a>
        <span class="topbar-title">Job Posts</span>
        <router-link to="/job_post" class="topbar-icon-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </router-link>
      </div>

      <!-- Hero -->
      <div class="hero" style="padding:20px 22px 50px;">
        <div class="hero-inner">
          <h1 class="hero-title" style="font-size:24px;">Job <span class="accent">Listings</span></h1>
          <p class="hero-sub">Manage your active job openings.</p>
        </div>
      </div>

      <!-- Main Sheet -->
      <div class="sheet">
        
        <!-- Filter Tabs -->
        <div class="filter-tabs">
          <button class="ftab" :class="{ active: activeTab === 'All' }" @click="activeTab = 'All'">All ({{ allCount }})</button>
          <button class="ftab" :class="{ active: activeTab === 'Active' }" @click="activeTab = 'Active'">Active ({{ activeCount }})</button>
          <button class="ftab" :class="{ active: activeTab === 'Closed' }" @click="activeTab = 'Closed'">Closed ({{ closedCount }})</button>
        </div>

        <!-- Job Cards List -->
        <transition-group name="list" tag="div">
          <div v-for="job in filteredJobs" :key="job.id" class="job-card">
            
            <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:6px;">
              <div class="job-title">{{ job.title }}</div>
              <span class="badge" :class="job.status === 'Active' ? 'badge-success' : 'badge-danger'" style="font-size:10px;padding:3px 8px;border-radius:10px;font-weight:600;" :style="job.status === 'Closed' ? 'background:#fee2e2;color:#ef4444;' : 'background:#dcfce7;color:#16a34a;'">{{ job.status }}</span>
            </div>
            
            <div class="job-meta">
              <span>📍 {{ job.location }}</span>
              <span>💼 {{ job.type }}</span>
              <span>💰 {{ job.salary }}</span>
            </div>
            
            <div class="job-tags">
              <span v-for="tag in job.tags" :key="tag" class="job-tag">{{ tag }}</span>
            </div>
            
            <div class="job-footer">
              <router-link to="/jobs-applicants" class="job-apps" style="text-decoration:none;">
                👥 {{ job.applicants }} Applicant{{ job.applicants !== 1 ? 's' : '' }}
              </router-link>
              
              <div style="display:flex;gap:8px;">
                <button class="btn btn-outline btn-sm" @click="showToast('Edit job opened')">Edit</button>
                <button v-if="job.status === 'Active'" class="btn btn-outline btn-sm" style="color:var(--danger);border-color:var(--danger);" @click="toggleJobStatus(job.id)">Close</button>
                <button v-else class="btn btn-outline btn-sm" style="color:var(--teal);border-color:var(--teal);" @click="toggleJobStatus(job.id)">Reopen</button>
              </div>
            </div>
          </div>
        </transition-group>

        <!-- Zero State Fallback -->
        <div v-if="filteredJobs.length === 0" style="text-align:center;padding:40px 0;color:var(--muted);font-size:14px;">
          No {{ activeTab.toLowerCase() }} jobs found.
        </div>

        <!-- Post Job Button -->
        <router-link to="/job_post" class="btn btn-teal w-full mt-8" style="display:flex;align-items:center;justify-content:center;gap:8px;margin-top:24px;text-decoration:none;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Post New Job
        </router-link>
        
        <div style="height: 60px;"></div>

      </div> <!-- Closes .sheet -->

      <!-- Bottom Nav -->
      <nav class="bottom-nav">
        <router-link to="/dashboard" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home
        </router-link>
        <router-link to="/products" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>Products
        </router-link>
        <router-link to="/messages" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Messages
        </router-link>
        <router-link to="/membership" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Membership
        </router-link>
        <router-link to="/profile" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile
        </router-link>
      </nav>

      <!-- Toast Component -->
      <div class="toast" :class="{ show: toastVisible }">{{ toastMsg }}</div>

    </div> <!-- Closes .app -->
  </div> <!-- Closes .phone-screen -->
</div> <!-- Closes .phone-frame -->
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeTab = ref('All')

const jobs = ref([
  {
    id: 1,
    title: 'Plywood Production Supervisor',
    status: 'Active',
    location: 'Nagpur',
    type: 'Full Time',
    salary: '₹25K–35K/mo',
    tags: ['Manufacturing', 'Production', 'Supervisor'],
    applicants: 12
  },
  {
    id: 2,
    title: 'Sales Executive — Timber Products',
    status: 'Active',
    location: 'Pune',
    type: 'Full Time',
    salary: '₹20K–28K/mo',
    tags: ['Sales', 'B2B', 'Timber'],
    applicants: 8
  },
  {
    id: 3,
    title: 'Quality Control Inspector',
    status: 'Active',
    location: 'Nagpur',
    type: 'Full Time',
    salary: '₹18K–24K/mo',
    tags: ['Quality', 'Inspection', 'QC'],
    applicants: 5
  }
])

const allCount = computed(() => jobs.value.length)
const activeCount = computed(() => jobs.value.filter(j => j.status === 'Active').length)
const closedCount = computed(() => jobs.value.filter(j => j.status === 'Closed').length)

const filteredJobs = computed(() => {
  if (activeTab.value === 'Active') return jobs.value.filter(j => j.status === 'Active')
  if (activeTab.value === 'Closed') return jobs.value.filter(j => j.status === 'Closed')
  return jobs.value
})

const toastVisible = ref(false)
const toastMsg = ref('')

const showToast = (msg) => {
  toastMsg.value = msg
  toastVisible.value = true
  setTimeout(() => {
    toastVisible.value = false
  }, 2500)
}

const toggleJobStatus = (id) => {
  const job = jobs.value.find(j => j.id === id)
  if (job) {
    if (job.status === 'Active') {
      job.status = 'Closed'
      showToast('Job closed')
    } else {
      job.status = 'Active'
      showToast('Job reactivated')
    }
  }
}
</script>

<style scoped>
.filter-tabs { display:flex; gap:8px; overflow-x:auto; padding-bottom:2px; scrollbar-width:none; margin-bottom:16px; }
.filter-tabs::-webkit-scrollbar { display:none; }
.ftab { flex-shrink:0; padding:7px 16px; border-radius:20px; font-size:12px; font-weight:700; border:1.5px solid var(--border); background:var(--card); color:var(--muted); cursor:pointer; transition:var(--transition); }
.ftab.active { background:var(--navy); color:#fff; border-color:var(--navy); }
.job-card { background:var(--card); border-radius:var(--radius); padding:16px; margin-bottom:12px; box-shadow:var(--shadow-sm); }
.job-title { font-size:15px; font-weight:700; color:var(--text); margin-bottom:4px; }
.job-meta { font-size:11px; color:var(--muted); display:flex; gap:12px; flex-wrap:wrap; margin-bottom:10px; }
.job-tags { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:12px; }
.job-tag { padding:4px 10px; border-radius:20px; font-size:11px; font-weight:600; background:var(--bg); color:var(--muted); border:1px solid var(--border); }
.job-footer { display:flex; align-items:center; justify-content:space-between; }
.job-apps { font-size:12px; color:var(--teal); font-weight:600; }

/* Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.list-leave-active {
  position: absolute;
  width: 100%;
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