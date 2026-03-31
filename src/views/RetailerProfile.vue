<template>
  <div class="topbar">
    <RouterLink to="/retailer/dashboard" class="back-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
    </RouterLink>
    <span class="topbar-title">My Profile</span>
    <RouterLink to="/retailer/settings" class="topbar-icon-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
    </RouterLink>
  </div>

  <!-- Profile Header -->
  <div class="profile-header">
    <RouterLink to="/retailer/profile/edit" class="edit-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
    </RouterLink>
    <div class="profile-avatar">{{ profile.initials }}</div>
    <div class="profile-name">{{ profile.businessName }}</div>
    <div class="profile-role">{{ profile.role }} · {{ profile.category }}</div>
    <div class="profile-badges">
      <span class="pill pill-teal">✓ Verified</span>
      <span class="pill pill-navy">⭐ {{ profile.rating }} Rating</span>
    </div>
  </div>

  <!-- Profile Stats -->
  <div class="profile-stats" style="margin-top:-28px;">
    <div class="profile-stat">
      <div class="profile-stat-val">{{ profile.stats.products }}</div>
      <div class="profile-stat-lbl">Products</div>
    </div>
    <div class="profile-stat">
      <div class="profile-stat-val">{{ profile.stats.enquiries }}</div>
      <div class="profile-stat-lbl">Enquiries</div>
    </div>
    <div class="profile-stat">
      <div class="profile-stat-val">{{ profile.stats.experience }}</div>
      <div class="profile-stat-lbl">Experience</div>
    </div>
  </div>

  <div class="sheet">
    <p class="sec-label">Business Information</p>
    <div class="card">
      <div class="info-row">
        <div class="info-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg></div>
        <div>
          <div class="info-label">Business Name</div>
          <div class="info-value">{{ profile.businessName }}</div>
        </div>
      </div>
  
      <div class="info-row">
        <div class="info-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
        <div>
          <div class="info-label">Location</div>
          <div class="info-value">{{ profile.location }}</div>
        </div>
      </div>
  
      <div class="info-row">
        <div class="info-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15z"/></svg></div>
        <div>
          <div class="info-label">Phone</div>
          <div class="info-value">{{ profile.phone }}</div>
        </div>
      </div>
  
      <div class="info-row">
        <div class="info-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
        <div>
          <div class="info-label">Email</div>
          <div class="info-value">{{ profile.email }}</div>
        </div>
      </div>
  
      <div class="info-row">
        <div class="info-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg></div>
        <div>
          <div class="info-label">GST Number</div>
          <div class="info-value">{{ profile.gst }}</div>
        </div>
      </div>
    </div>

    <p class="sec-label mt-16">Navigation</p>
    <div class="card">
      <RouterLink v-for="item in menuItems" :key="item.label" :to="item.to" class="menu-item">
        <div class="menu-item-ico" :style="item.style">{{ item.icon }}</div>
        <span class="menu-item-label">{{ item.label }}</span>
        <span class="menu-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></span>
      </RouterLink>
    </div>

    <button class="btn btn-danger mt-16" :disabled="loading" @click="doLogout">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      {{ loading ? 'Logging out...' : 'Logout' }}
    </button>

    <div class="toast" :class="{ show: toastVisible }">{{ toastMessage }}</div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const loading = ref(false)
const error = ref('')
const toastMessage = ref('')
const toastVisible = ref(false)

const profile = reactive({
  initials: 'YB',
  businessName: 'Your Business Name',
  role: 'Retailer',
  category: 'Your Category',
  rating: '4.8',
  location: 'Your City, State',
  phone: '+91 XXXXX XXXXX',
  email: 'your@email.com',
  gst: 'XXXXXXXXXXXX',
  stats: { products: 24, enquiries: 156, experience: '8yr' }
})

const menuItems = ref([
  { label: 'Dashboard',                to: '/retailer/dashboard',         icon: '🏠', style: 'background:#f1f5f9;color:#475569;' },
  { label: 'Company Portfolio (20%)',  to: '/retailer/company-profile',   icon: '🏢', style: 'background:#e8f4fe;color:#2563eb;' },
  { label: 'Product Portfolio',        to: '/manufacturer/products/portfolio', icon: '🛒', style: 'background:#f3e8ff;color:#9333ea;' },
  { label: 'Branches',                 to: '/retailer/branches',          icon: '🏢', style: 'background:#e0f2fe;color:#0369a1;' },
  { label: 'Business Network Areas',   to: '/retailer/distribution-areas', icon: '🕸️', style: 'background:#f0fdf4;color:#15803d;' },
  { label: 'Client Networks',          to: '/retailer/client-networks',   icon: '👥', style: 'background:#ede9fe;color:#7c3aed;' },
  { label: 'All Enquiries',            to: '/retailer/enquiries',         icon: '📩', style: 'background:#e8faf0;color:#16a34a;' },
  { label: 'Interested Products',      to: '/retailer/requirements',      icon: '🏢', style: 'background:#fffbeb;color:#d97706;' },
  { label: 'Enquiry Received',         to: '/retailer/enquiries',         icon: '🏢', style: 'background:#e8faf0;color:#16a34a;' },
  { label: 'Gallery',                  to: '/retailer/gallery',           icon: '🖼️', style: 'background:#e8f4fe;color:#2563eb;' },
  { label: 'Job Posted',               to: '/retailer/jobs',              icon: '🏢', style: 'background:#fee2e2;color:#dc2626;' },
  { label: 'Membership Plan',          to: '/retailer/membership',        icon: '👥', style: 'background:#f3e8ff;color:#9333ea;' },
])

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2500)
}

async function fetchProfile() {
  try {
    loading.value = true
    const response = await axios.get('/api/retailer/profile')
    Object.assign(profile, response.data)
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load profile'
  } finally {
    loading.value = false
  }
}

async function doLogout() {
  loading.value = true
  localStorage.removeItem('yb_token')
  localStorage.removeItem('yb_role')
  router.push('/login')
  loading.value = false
}

fetchProfile()
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
  transition: var(--transition); text-decoration: none;
}
.menu-item:last-child { border-bottom: none; }
.menu-item:hover { opacity: .7; }
.menu-item-ico { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.menu-item-label { flex: 1; font-size: 14px; font-weight: 600; color: var(--text); }
.menu-arrow { color: var(--muted); }
.menu-arrow svg { width: 16px; height: 16px; }
</style>
