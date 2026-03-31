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
          <span class="topbar-title">Enquiries</span>
        </div>
        <div class="hero" style="padding:20px 22px 50px;">
          <div class="hero-inner">
            <h1 class="hero-title" style="font-size:24px;">Buyer <span class="accent">Enquiries</span></h1>
            <p class="hero-sub">Manage incoming buyer enquiries.</p>
          </div>
        </div>
        <div class="sheet">
          <div class="search-bar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" v-model="searchQuery" placeholder="Search enquiries...">
          </div>
          
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

          <div v-if="loading" style="padding: 20px; text-align: center;">Loading...</div>
          <div v-if="error" style="padding: 10px; color: red; text-align: center;">{{ error }}</div>

          <div v-for="enquiry in filteredEnquiries" :key="enquiry.id" class="enq-card">
            <div class="enq-header">
              <div class="enq-avatar" :style="{ background: enquiry.avatarBg }">{{ enquiry.initials }}</div>
              <div>
                <div class="enq-name">{{ enquiry.name }}</div>
                <div class="enq-meta">📍 {{ enquiry.location }} · {{ enquiry.time }}</div>
              </div>
              <div class="enq-badge">
                <span class="badge" :class="getStatusClass(enquiry.status)" :style="enquiry.status === 'Replied' ? 'background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;' : ''">{{ enquiry.status }}</span>
              </div>
            </div>
            <div style="font-size:12px;color:var(--muted);margin-bottom:8px;">📦 {{ enquiry.product }}</div>
            <div class="enq-msg">{{ enquiry.message }}</div>
            <div class="enq-actions">
              <template v-if="enquiry.status === 'New'">
                <button class="btn btn-teal btn-sm" style="flex:1;" @click="handleReply(enquiry.id)" :disabled="loading">Reply</button>
                <button class="btn btn-outline btn-sm" @click="handleClose(enquiry.id)" :disabled="loading">Close</button>
              </template>
              <template v-else>
                <button class="btn btn-outline btn-sm" style="flex:1;" @click="handleViewThread(enquiry.id)">View Thread</button>
                <button v-if="enquiry.status !== 'Closed'" class="btn btn-outline btn-sm" @click="handleClose(enquiry.id)" :disabled="loading">Close</button>
              </template>
            </div>
          </div>
          
          <div v-if="filteredEnquiries.length === 0 && !loading" style="padding: 40px 20px; text-align: center; color: var(--muted);">
            No enquiries found.
          </div>
        </div>
      </div>

      <nav class="bottom-nav">
        <router-link to="/distributor-dashboard" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home</router-link>
        <router-link to="/distributor-products" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>Products</router-link>
        <router-link to="/distributor-messages" class="nav-item active"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Messages</router-link>
        <router-link to="/distributor-transactions" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>Payments</router-link>
        <router-link to="/distributor-profile" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile</router-link>
      </nav>

      <div class="toast" v-if="toast.show">{{ toast.message }}</div>
    </div>
  </div>
</template>

<script setup>
import '../utils/dashboard-shared.js';
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('9:41');
const loading = ref(false);
const error = ref(null);
const searchQuery = ref('');
const currentFilter = ref('All');

const tabs = [
  { id: 'All', label: 'All' },
  { id: 'Unread', label: 'Unread' },
  { id: 'Replied', label: 'Replied' },
  { id: 'Closed', label: 'Closed' }
];

const enquiries = ref([
  { id: 1, initials: 'MW', avatarBg: '#0a2540', name: 'Mumbai Wholesale Market', location: 'Mumbai', time: '1 hour ago', status: 'New', product: 'Ready Stock Plywood', message: 'We need 1000 sheets of Ready Stock Ply for an upcoming project. Please share best price for bulk quantity.' },
  { id: 2, initials: 'GT', avatarBg: '#163D6E', name: 'Green Timber Co.', location: 'Pune', time: '3 hours ago', status: 'New', product: 'Premium Laminates', message: 'Do you distribute Premium Laminates in Pune? Looking for a reliable distributor for monthly supply.' },
  { id: 3, initials: 'SK', avatarBg: '#22a28a', name: 'Sunrise Kitchens', location: 'Nashik', time: 'Yesterday', status: 'Replied', product: 'Hardware Fittings', message: 'Need Hardware Fittings catalogue and pricing. We are a modular kitchen manufacturer.' }
]);

const toast = reactive({
  show: false,
  message: ''
});

const getCount = (filter) => {
  if (filter === 'All') return enquiries.value.length;
  if (filter === 'Unread') return enquiries.value.filter(e => e.status === 'New').length;
  return enquiries.value.filter(e => e.status === filter).length;
};

const filteredEnquiries = computed(() => {
  return enquiries.value.filter(enq => {
    const matchesSearch = enq.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          enq.product.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    if (currentFilter.value === 'All') return matchesSearch;
    if (currentFilter.value === 'Unread') return matchesSearch && enq.status === 'New';
    return matchesSearch && enq.status === currentFilter.value;
  });
});

const getStatusClass = (status) => {
  if (status === 'New') return 'badge-success';
  if (status === 'Replied') return ''; // style handled by inline or general css
  return '';
};

const fetchEnquiries = async () => {
  try {
    loading.value = true;
    error.value = null;
    // const response = await axios.get('/api/distributor/enquiries');
    // enquiries.value = response.data;
  } catch (err) {
    error.value = 'Failed to load enquiries';
  } finally {
    loading.value = false;
  }
};

const handleReply = async (id) => {
  try {
    loading.value = true;
    // await axios.post(`/api/enquiries/${id}/reply`, { ... });
    showToast('Reply sent!');
    const enq = enquiries.value.find(e => e.id === id);
    if (enq) enq.status = 'Replied';
  } catch (err) {
    showToast('Failed to send reply');
  } finally {
    loading.value = false;
  }
};

const handleClose = async (id) => {
  try {
    loading.value = true;
    // await axios.post(`/api/enquiries/${id}/close`);
    showToast('Marked as closed');
    const enq = enquiries.value.find(e => e.id === id);
    if (enq) enq.status = 'Closed';
  } catch (err) {
    showToast('Failed to close enquiry');
  } finally {
    loading.value = false;
  }
};

const handleViewThread = (id) => {
  showToast('Thread opened');
  // router.push(`/enquiry/${id}`);
};

const showToast = (msg) => {
  toast.message = msg;
  toast.show = true;
  setTimeout(() => toast.show = false, 2500);
};

onMounted(() => {
  fetchEnquiries();
  const now = new Date();
  currentTime.value = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
});
</script>


<style scoped>
.filter-tabs { display:flex; gap:8px; overflow-x:auto; padding-bottom:2px; scrollbar-width:none; margin-bottom:16px; }
.filter-tabs::-webkit-scrollbar { display:none; }
.ftab { flex-shrink:0; padding:7px 16px; border-radius:20px; font-size:12px; font-weight:700; border:1.5px solid var(--border); background:var(--card); color:var(--muted); cursor:pointer; transition:var(--transition); }
.ftab.active { background:var(--navy); color:#fff; border-color:var(--navy); }
.enq-card { background:var(--card); border-radius:var(--radius); padding:16px; margin-bottom:12px; box-shadow:var(--shadow-sm); }
.enq-header { display:flex; align-items:flex-start; gap:12px; margin-bottom:10px; }
.enq-avatar { width:42px; height:42px; border-radius:12px; color:#fff; font-family:'Barlow',sans-serif; font-size:18px; font-weight:800; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.enq-name { font-size:14px; font-weight:700; color:var(--text); }
.enq-meta { font-size:11px; color:var(--muted); margin-top:2px; }
.enq-badge { margin-left:auto; }
.enq-msg { font-size:13px; color:var(--text); line-height:1.5; background:var(--bg); border-radius:10px; padding:10px; margin-bottom:10px; }
.enq-actions { display:flex; gap:8px; }
</style>
