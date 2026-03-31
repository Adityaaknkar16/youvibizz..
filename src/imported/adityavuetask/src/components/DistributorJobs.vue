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
          <span class="topbar-title">Job Posts</span>
          <router-link to="/job-post-create" class="topbar-icon-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></router-link>
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
              :key="tab.id"
              class="ftab" 
              :class="{ active: currentFilter === tab.id }"
              @click="currentFilter = tab.id"
            >
              {{ tab.label }} ({{ getCount(tab.id) }})
            </button>
          </div>

          <div v-if="loading && jobs.length === 0" style="padding: 20px; text-align: center;">Loading jobs...</div>
          <div v-if="error" style="padding: 10px; color: red; text-align: center;">{{ error }}</div>

          <div v-for="job in filteredJobs" :key="job.id" class="job-card">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:6px;">
              <div class="job-title">{{ job.title }}</div>
              <span class="badge" :class="job.status === 'Active' ? 'badge-success' : 'badge-closed'">{{ job.status }}</span>
            </div>
            <div class="job-meta">
              <span>📍 {{ job.location }}</span>
              <span>💼 {{ job.type }}</span>
              <span>💰 {{ job.salary }}</span>
            </div>
            <div class="job-footer">
              <span class="job-apps">👥 {{ job.applicants }} Applicants</span>
              <div style="display:flex;gap:8px;">
                <button class="btn btn-outline btn-sm" @click="handleEdit(job.id)">Edit</button>
                <button 
                  v-if="job.status === 'Active'"
                  class="btn btn-outline btn-sm" 
                  style="color:var(--danger);border-color:var(--danger);" 
                  @click="handleClose(job.id)"
                >Close</button>
              </div>
            </div>
          </div>

          <router-link to="/job-post-create" class="btn btn-teal w-full mt-8" style="display:flex;align-items:center;justify-content:center;gap:8px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Post New Job
          </router-link>
        </div>
      </div>
      
      <nav class="bottom-nav">
        <router-link to="/distributor-dashboard" class="nav-item active"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home</router-link>
        <router-link to="/distributor-products" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>Products</router-link>
        <router-link to="/distributor-messages" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Messages</router-link>
        <router-link to="/distributor-transactions" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>Payments</router-link>
        <router-link to="/distributor-profile" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile</router-link>
      </nav>

      <div class="toast" v-if="toast.show">{{ toast.message }}</div>
    </div>
  </div>
</template>

<script setup>
import '../utils/dashboard-shared.js';
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('9:41');
const loading = ref(false);
const error = ref(null);
const currentFilter = ref('All');

const tabs = [
  { id: 'All', label: 'All' },
  { id: 'Active', label: 'Active' },
  { id: 'Closed', label: 'Closed' }
];

const jobs = ref([
  { id: 1, title: 'Distribution Executive', status: 'Active', location: 'Pune', type: 'Full Time', salary: '₹22K–30K/mo', applicants: 9 },
  { id: 2, title: 'Warehouse & Logistics Manager', status: 'Active', location: 'Mumbai', type: 'Full Time', salary: '₹35K–45K/mo', applicants: 14 }
]);

const toast = reactive({
  show: false,
  message: ''
});

const getCount = (filter) => {
  if (filter === 'All') return jobs.value.length;
  return jobs.value.filter(j => j.status === filter).length;
};

const filteredJobs = computed(() => {
  if (currentFilter.value === 'All') return jobs.value;
  return jobs.value.filter(j => j.status === currentFilter.value);
});

const fetchJobs = async () => {
  try {
    loading.value = true;
    error.value = null;
    // const response = await axios.get('/api/distributor/jobs');
    // jobs.value = response.data;
  } catch (err) {
    error.value = 'Failed to load job listings';
  } finally {
    loading.value = false;
  }
};

const handleEdit = (id) => {
  showToast('Edit job');
  // router.push(`/job-post/edit/${id}`);
};

const handleClose = async (id) => {
  try {
    loading.value = true;
    // await axios.post(`/api/jobs/${id}/close`);
    showToast('Job closed');
    const job = jobs.value.find(j => j.id === id);
    if (job) job.status = 'Closed';
  } catch (err) {
    showToast('Failed to close job');
  } finally {
    loading.value = false;
  }
};

const showToast = (msg) => {
  toast.message = msg;
  toast.show = true;
  setTimeout(() => toast.show = false, 2500);
};

onMounted(() => {
  fetchJobs();
  const now = new Date();
  currentTime.value = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
});
</script>


<style scoped>
.filter-tabs { display:flex; gap:8px; overflow-x:auto; padding-bottom:2px; scrollbar-width:none; margin-bottom:16px; }
.filter-tabs::-webkit-scrollbar { display:none; }
.ftab { flex-shrink:0; padding:7px 16px; border-radius:20px; font-size:12px; font-weight:700; border:1.5px solid var(--border); background:var(--card); color:var(--muted); cursor:pointer; transition:var(--transition); }
.ftab.active { background:var(--navy); color:#fff; border-color:var(--navy); }
.job-card { background:var(--card); border-radius:var(--radius); padding:16px; margin-bottom:12px; box-shadow:var(--shadow-sm); }
.job-title { font-size:15px; font-weight:700; color:var(--text); margin-bottom:4px; }
.job-meta { font-size:11px; color:var(--muted); display:flex; gap:12px; flex-wrap:wrap; margin-bottom:10px; }
.job-footer { display:flex; align-items:center; justify-content:space-between; }
.job-apps { font-size:12px; color:var(--teal); font-weight:600; }
</style>
