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
        <router-link to="/" class="topbar-brand">
          <img :src="'/Media/Logo.png'" alt="YouVBiZ" style="height:32px;width:auto;object-fit:contain;" @error="$event.target.style.display='none'">
        </router-link>
        <span class="topbar-title">Dashboard</span>
        <div class="topbar-actions">
          <button class="topbar-icon-btn" @click="showToast('No new notifications')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
          </button>
        </div>
      </div>

      <!-- Hero -->
      <div class="hero" style="padding-bottom:50px;">
        <div class="hero-inner">
          <div class="badge"><span class="badge-dot"></span> Manufacturer Account</div>
          <h1 class="hero-title">Good Morning,<br><span class="accent">Welcome Back!</span></h1>
          <p class="hero-sub">Here's your business overview for today.</p>
        </div>
      </div>

      <!-- Sheet -->
      <div class="sheet">
        <!-- Dashboard Stats -->
        <div class="dash-stats">
          <div class="dash-stat">
            <div class="dash-stat-ico" style="background:#e8f4fe;color:#2563eb;">📦</div>
            <div class="dash-stat-val">24</div>
            <div class="dash-stat-lbl">Active Products</div>
            <div class="dash-stat-trend trend-up">↑ +3 this week</div>
          </div>
          <div class="dash-stat">
            <div class="dash-stat-ico" style="background:#e8faf0;color:#16a34a;">📩</div>
            <div class="dash-stat-val">18</div>
            <div class="dash-stat-lbl">New Enquiries</div>
            <div class="dash-stat-trend trend-up">↑ +5 today</div>
          </div>
          <div class="dash-stat">
            <div class="dash-stat-ico" style="background:#fef9c3;color:#a16207;">📋</div>
            <div class="dash-stat-val">7</div>
            <div class="dash-stat-lbl">Requirements</div>
            <div class="dash-stat-trend trend-down">↓ 2 pending</div>
          </div>
          <div class="dash-stat">
            <div class="dash-stat-ico" style="background:#fee2e2;color:#dc2626;">💼</div>
            <div class="dash-stat-val">3</div>
            <div class="dash-stat-lbl">Job Postings</div>
            <div class="dash-stat-trend" style="color:var(--muted)">Active</div>
          </div>
        </div>

        <p class="sec-label">Quick Actions</p>
        <div class="quick-actions">
          <router-link to="/dashboard" class="qa-btn">
            <div class="qa-ico" style="background:#f1f5f9;color:#475569;">🏠</div> Dashboard
          </router-link>
          <router-link to="/manufacturer-detail" class="qa-btn">
            <div class="qa-ico" style="background:#e8f4fe;color:#2563eb;">🏢</div> Company Profile
          </router-link>
          <router-link to="/products" class="qa-btn">
            <div class="qa-ico" style="background:#f3e8ff;color:#9333ea;">🛍️</div> Product Profile
          </router-link>
          <router-link to="/branches" class="qa-btn">
            <div class="qa-ico" style="background:#e0f2fe;color:#0369a1;">🏢</div> Branches
          </router-link>
          <router-link to="/manufacturer-client-networks" class="qa-btn">
            <div class="qa-ico" style="background:#ede9fe;color:#7c3aed;">🤝</div> Existing Distributors
          </router-link>
          <router-link to="/distribution-areas" class="qa-btn">
            <div class="qa-ico" style="background:#f0fdf4;color:#15803d;">🏢</div> Area Open for Distribution
          </router-link>
          <router-link to="/manufacturer-enquiries" class="qa-btn">
            <div class="qa-ico" style="background:#e8faf0;color:#16a34a;">📩</div> Enquiry Received
          </router-link>
          <router-link to="/distributor-support" class="qa-btn">
            <div class="qa-ico" style="background:#fffbeb;color:#d97706;">📄</div> Support Type
          </router-link>
          <router-link to="/manufacturer-gallery" class="qa-btn">
            <div class="qa-ico" style="background:#e8f4fe;color:#2563eb;">🖼️</div> Gallery
          </router-link>
          <router-link to="/manufacturer-certificates" class="qa-btn">
            <div class="qa-ico" style="background:#f0fdf4;color:#16a34a;">🏅</div> Certificates
          </router-link>
          <router-link to="/manufacturer-jobs" class="qa-btn">
            <div class="qa-ico" style="background:#fee2e2;color:#dc2626;">💼</div> Job Posted
          </router-link>
          <router-link to="/membership" class="qa-btn">
            <div class="qa-ico" style="background:#f3e8ff;color:#9333ea;">⭐</div> Membership Plan
          </router-link>
        </div>

        <div class="sec-header mt-8" style="margin-top:20px;">
          <h3>Recent Activity</h3>
          <router-link to="/manufacturer-enquiries">View All</router-link>
        </div>
        
        <div class="card">
          <div class="activity-item">
            <div class="act-dot"></div>
            <div class="act-body">
              <div class="act-time">2 hours ago</div>
              <div class="act-text">New enquiry received from Rajesh Traders.</div>
            </div>
          </div>
          <div class="activity-item">
            <div class="act-dot warn"></div>
            <div class="act-body">
              <div class="act-time">5 hours ago</div>
              <div class="act-text">Your product listing is pending approval.</div>
            </div>
          </div>
          <div class="activity-item">
            <div class="act-dot"></div>
            <div class="act-body">
              <div class="act-time">Yesterday, 3:45 PM</div>
              <div class="act-text">A business viewed your profile.</div>
            </div>
          </div>
          <div class="activity-item">
            <div class="act-dot warn"></div>
            <div class="act-body">
              <div class="act-time">Yesterday, 11:20 AM</div>
              <div class="act-text">New requirement posted for <strong>Gurjan Face Commercial Ply</strong> in Nagpur.</div>
            </div>
          </div>
        </div>

        <div class="card mt-12" style="background:linear-gradient(135deg,#f0fdf4,#dcfce7); margin-top:16px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
            <span style="font-size:14px;font-weight:700;color:var(--navy);">Profile Strength</span>
            <span style="font-size:14px;font-weight:800;color:var(--teal);">75%</span>
          </div>
          <div style="height:6px;background:#d1fae5;border-radius:4px;overflow:hidden;">
            <div style="width:75%;height:100%;background:var(--teal);border-radius:4px;"></div>
          </div>
          <p style="font-size:12px;color:var(--muted);margin-top:8px;">Add certificates to reach 100% and get more visibility.</p>
          <router-link to="/manufacturer-certificates" style="display:inline-block;margin-top:10px;font-size:12px;font-weight:700;color:var(--teal);">Add Certificates →</router-link>
        </div>
        
        <!-- Bottom spacing -->
        <div style="height:80px;"></div>
      </div> <!-- Closes .sheet -->

      <!-- Bottom Nav -->
      <nav class="bottom-nav">
        <router-link to="/dashboard" class="nav-item active"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home</router-link>
        <router-link to="/products" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>Products</router-link>
        <router-link to="/messages" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Messages</router-link>
        <router-link to="/membership" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          Membership
        </router-link>
        <router-link to="/profile" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile</router-link>
      </nav>

      <!-- Toast Component -->
      <div class="toast" :class="{ show: toastVisible }">{{ toastMsg }}</div>

    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'

const toastVisible = ref(false)
const toastMsg = ref('')

const showToast = (msg) => {
  toastMsg.value = msg
  toastVisible.value = true
  setTimeout(() => {
    toastVisible.value = false
  }, 2500)
}
</script>

<style scoped>
.welcome-banner { background:linear-gradient(135deg,var(--navy),var(--navy3)); border-radius:var(--radius-lg); padding:20px; margin-bottom:18px; position:relative; overflow:hidden; }
.welcome-banner::after { content:''; position:absolute; top:-40px; right:-40px; width:120px; height:120px; border-radius:50%; background:rgba(34,162,138,.15); pointer-events:none; }
.welcome-banner h3 { font-size:20px; font-weight:800; color:#fff; margin-bottom:4px; }
.welcome-banner p { font-size:12px; color:rgba(255,255,255,.6); }
.welcome-tag { display:inline-flex; align-items:center; gap:5px; background:var(--teal-dim); border:1px solid rgba(34,162,138,.3); border-radius:12px; padding:3px 10px; font-size:10px; font-weight:700; color:var(--teal); margin-bottom:10px; }
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