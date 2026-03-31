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
          <span class="topbar-title">My Network</span>
          <div style="width:36px;"></div>
        </div>
        <div class="hero" style="padding:20px 22px 50px;">
          <div class="hero-inner">
            <h1 class="hero-title" style="font-size:24px;">Business <span class="accent">Network</span></h1>
            <p class="hero-sub">Your manufacturer connections.</p>
          </div>
        </div>
        <div class="sheet">
          <div class="search-bar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" v-model="searchQuery" placeholder="Search connections...">
          </div>
          <div class="sec-header">
            <h3>Connected Partners ({{ filteredPartners.length }})</h3>
            <router-link to="/listing">Browse More</router-link>
          </div>

          <div v-if="loading && partners.length === 0" style="padding: 20px; text-align: center;">Loading network...</div>
          <div v-if="error" style="padding: 10px; color: red; text-align: center;">{{ error }}</div>

          <div id="netList">
            <div v-for="partner in filteredPartners" :key="partner.id" class="network-card">
              <div class="net-avatar">{{ partner.initials }}</div>
              <div class="net-body">
                <div class="net-name">{{ partner.name }}</div>
                <div class="net-meta">📍 {{ partner.location }} · {{ partner.type }} · ⭐ {{ partner.rating }}</div>
              </div>
              <div class="net-actions">
                <button class="net-btn net-msg" @click="handleMessage(partner.id)">Message</button>
                <router-link :to="'/manufacturer/' + partner.id" class="net-btn net-view">View</router-link>
              </div>
            </div>
          </div>
          
          <div v-if="filteredPartners.length === 0 && !loading" style="padding: 40px 20px; text-align: center; color: var(--muted);">
            No connections found.
          </div>
        </div>
      </div>

      <nav class="bottom-nav">
        <router-link to="/" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home
        </router-link>
        <router-link to="/distributor-products" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>Products
        </router-link>
        <router-link to="/distributor-messages" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Messages
        </router-link>
        <router-link to="/membership" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Membership
        </router-link>
        <router-link to="/distributor-profile" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile
        </router-link>
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

const partners = ref([
  { id: 1, initials: 'PP', name: 'Pinnacle Plywood Ltd', location: 'Nagpur, MH', type: 'Manufacturer', rating: 4.9 },
  { id: 2, initials: 'RW', name: 'Royal Woods Pvt Ltd', location: 'Pune, MH', type: 'Manufacturer', rating: 4.8 },
  { id: 3, initials: 'GT', name: 'Green Timber Co.', location: 'Mumbai, MH', type: 'Manufacturer', rating: 4.7 }
]);

const toast = reactive({
  show: false,
  message: ''
});

const filteredPartners = computed(() => {
  if (!searchQuery.value) return partners.value;
  return partners.value.filter(p => 
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const fetchNetwork = async () => {
  try {
    loading.value = true;
    error.value = null;
    // const response = await axios.get('/api/distributor/network');
    // partners.value = response.data;
  } catch (err) {
    error.value = 'Failed to load network partners';
  } finally {
    loading.value = false;
  }
};

const handleMessage = async (id) => {
  showToast('Message sent');
  // router.push(`/messages?chat=${id}`);
};

const showToast = (msg) => {
  toast.message = msg;
  toast.show = true;
  setTimeout(() => toast.show = false, 2500);
};

onMounted(() => {
  fetchNetwork();
  const now = new Date();
  currentTime.value = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
});
</script>


<style scoped>
.network-card { background:var(--card);border-radius:var(--radius);padding:14px;box-shadow:var(--shadow-sm);margin-bottom:10px;display:flex;align-items:center;gap:12px; }
.net-avatar { width:46px;height:46px;border-radius:12px;background:linear-gradient(135deg,var(--teal),var(--teal2));color:#fff;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;flex-shrink:0;font-family:'Barlow',sans-serif; }
.net-body { flex:1;min-width:0; }
.net-name { font-size:14px;font-weight:700;color:var(--text);margin-bottom:2px; }
.net-meta { font-size:11px;color:var(--muted); }
.net-actions { display:flex;flex-direction:column;gap:5px; }
.net-btn { padding:6px 12px;border-radius:8px;font-size:11px;font-weight:700;border:none;cursor:pointer;text-align:center; }
.net-msg { background:var(--teal);color:#fff; }
.net-view { background:#f3f4f6;color:var(--text); }
</style>
