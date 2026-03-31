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
          <span class="topbar-title">My Profile</span>
          <router-link to="/distributor/settings" class="topbar-icon-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
          </router-link>
        </div>

        <div class="profile-header">
          <router-link to="/distributor/profile-edit" class="edit-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </router-link>
          <div class="profile-avatar">{{ profile.initials }}</div>
          <div class="profile-name">{{ profile.businessName }}</div>
          <div class="profile-role">{{ profile.type }} · {{ profile.category }}</div>
          <div class="profile-badges">
            <span v-if="profile.verified" class="pill pill-teal">✓ Verified by YouVBiZ</span>
            <span class="pill pill-navy">⭐ {{ profile.rating }} Rating</span>
          </div>
        </div>

        <div class="profile-stats" style="margin-top:-28px;">
          <div class="profile-stat"><div class="profile-stat-val">{{ stats.products }}</div><div class="profile-stat-lbl">Products</div></div>
          <div class="profile-stat"><div class="profile-stat-val">{{ stats.enquiries }}</div><div class="profile-stat-lbl">Enquiries</div></div>
          <div class="profile-stat"><div class="profile-stat-val">{{ stats.experience }}yr</div><div class="profile-stat-lbl">Experience</div></div>
        </div>

        <div class="sheet">
          <p class="sec-label">Business Information</p>
          <div class="card">
            <div class="info-row">
              <div class="info-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg></div>
              <div><div class="info-label">Business Name</div><div class="info-value">{{ profile.businessName }}</div></div>
            </div>
            <div class="info-row">
              <div class="info-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
              <div><div class="info-label">Location</div><div class="info-value">{{ profile.location }}</div></div>
            </div>
            <div class="info-row">
              <div class="info-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15z"/></svg></div>
              <div><div class="info-label">Phone</div><div class="info-value">{{ profile.phone }}</div></div>
            </div>
            <div class="info-row">
              <div class="info-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
              <div><div class="info-label">Email</div><div class="info-value">{{ profile.email }}</div></div>
            </div>
            <div class="info-row">
              <div class="info-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg></div>
              <div><div class="info-label">GST Number</div><div class="info-value">{{ profile.gstNumber }}</div></div>
            </div>
          </div>

          <p class="sec-label mt-16">Navigation</p>
          <div class="card">
            <router-link v-for="item in menuItems" :key="item.path" :to="item.path" class="menu-item">
              <div class="menu-item-ico" :style="{ background: item.bg, color: item.color }">{{ item.icon }}</div>
              <span class="menu-item-label">{{ item.label }}</span>
              <span class="menu-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></span>
            </router-link>
          </div>

          <button class="btn btn-danger mt-16" @click="handleLogout" :disabled="loading">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Logout
          </button>
        </div>
      </div>

      <nav class="bottom-nav">
        <router-link to="/distributor-dashboard" class="nav-item">
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
        <router-link to="/distributor-profile" class="nav-item active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile
        </router-link>
      </nav>

      <div class="toast" v-if="toast.show">{{ toast.message }}</div>
    </div>
  </div>
</template>

<script setup>
import '../utils/dashboard-shared.js';
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('9:41');
const loading = ref(false);

const profile = reactive({
  initials: 'DB',
  businessName: 'Demo Distributor Business',
  type: 'Distributor',
  category: 'Construction & Building Materials',
  verified: true,
  rating: 4.8,
  location: 'Mumbai, Maharashtra',
  phone: '+91 99116 62276',
  email: 'support@youvbiz.com',
  gstNumber: '27XXXXX1234X1Z5'
});

const stats = reactive({
  products: 24,
  enquiries: 156,
  experience: 8
});

const menuItems = [
  { path: '/distributor-dashboard', label: 'Dashboard', icon: '🏠', bg: '#f1f5f9', color: '#475569' },
  { path: '/distributor_detail', label: 'Company Portfolio ( 20% )', icon: '🏢', bg: '#e8f4fe', color: '#2563eb' },
  { path: '/distributor-products', label: 'Product Portfolio', icon: '🧺', bg: '#f3e8ff', color: '#9333ea' },
  { path: '/branches', label: 'Branches', icon: '🏢', bg: '#e0f2fe', color: '#0369a1' },
  { path: '/distribution-areas', label: 'Business Network Areas', icon: '🕸️', bg: '#f0fdf4', color: '#15803d' },
  { path: '/client-networks-add-edit', label: 'Client Networks', icon: '👥', bg: '#ede9fe', color: '#7c3aed' },
  { path: '/distributor-requirements', label: 'Interested Products', icon: '🏢', bg: '#fffbeb', color: '#d97706' },
  { path: '/distributor-enquiries', label: 'Enquiry Received', icon: '🏢', bg: '#e8faf0', color: '#16a34a' },
  { path: '/manufacturer-gallery', label: 'Gallery', icon: '🖼️', bg: '#e8f4fe', color: '#2563eb' },
  { path: '/distributor-jobs', label: 'Job Posted', icon: '🏢', bg: '#fee2e2', color: '#dc2626' },
  { path: '/membership-plan', label: 'Membership Plan', icon: '👥', bg: '#f3e8ff', color: '#9333ea' }
];

const toast = reactive({ show: false, message: '' });

const handleLogout = async () => {
  try {
    loading.value = true;
    // await axios.post('/api/logout');
    showToast('Logged out successfully');
    setTimeout(() => {
      router.push('/pages/task/login');
    }, 1000);
  } catch (err) {
    showToast('Failed to logout');
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
  const now = new Date();
  currentTime.value = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
});
</script>


<style scoped>
.profile-header {
  background: linear-gradient(135deg, var(--navy), var(--navy3));
  padding: 30px 22px 60px; text-align: center; position: relative;
}
.profile-avatar {
  width: 80px; height: 80px; border-radius: 20px;
  background: var(--teal); color: #fff;
  font-family: 'Barlow', sans-serif; font-size: 32px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 14px; border: 3px solid rgba(255,255,255,.3);
}
.profile-name { font-size: 22px; font-weight: 800; color: #fff; margin-bottom: 4px; font-family: 'Barlow', sans-serif; }
.profile-role { font-size: 13px; color: rgba(255,255,255,.6); margin-bottom: 12px; }
.profile-badges { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }

.profile-stats { display: flex; margin: -24px 18px 0; gap: 0; background: var(--card); border-radius: var(--radius-lg); padding: 16px; box-shadow: var(--shadow-lg); position: relative; z-index: 5; margin-bottom: 20px; }
.profile-stat { flex: 1; text-align: center; padding: 8px; border-right: 1px solid var(--border); }
.profile-stat:last-child { border-right: none; }
.profile-stat-val { font-size: 18px; font-weight: 800; color: var(--navy); font-family: 'Barlow', sans-serif; }
.profile-stat-lbl { font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: .4px; margin-top: 2px; }

.info-row { display: flex; align-items: center; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--border); }
.info-row:last-child { border-bottom: none; }
.info-ico { width: 38px; height: 38px; border-radius: 10px; background: var(--teal-dim); display: flex; align-items: center; justify-content: center; color: var(--teal); flex-shrink: 0; }
.info-ico svg { width: 17px; height: 17px; }
.info-label { font-size: 11px; color: var(--muted); margin-bottom: 2px; font-weight: 600; text-transform: uppercase; letter-spacing: .3px; }
.info-value { font-size: 14px; color: var(--text); font-weight: 500; }

.edit-btn {
  position: absolute; top: 16px; right: 16px;
  width: 36px; height: 36px; border-radius: 10px;
  background: rgba(255,255,255,.15); display: flex; align-items: center; justify-content: center;
  color: #fff; border: 1px solid rgba(255,255,255,.2); transition: var(--transition);
}
.edit-btn:hover { background: rgba(255,255,255,.25); }
.edit-btn svg { width: 16px; height: 16px; }

.menu-item {
  display: flex; align-items: center; gap: 12px; padding: 16px 0;
  border-bottom: 1px solid var(--border); cursor: pointer;
  transition: var(--transition);
}
.menu-item:last-child { border-bottom: none; }
.menu-item:hover { opacity: .7; }
.menu-item-ico { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.menu-item-label { flex: 1; font-size: 14px; font-weight: 600; color: var(--text); }
.menu-arrow { color: var(--muted); }
.menu-arrow svg { width: 16px; height: 16px; }
</style>
