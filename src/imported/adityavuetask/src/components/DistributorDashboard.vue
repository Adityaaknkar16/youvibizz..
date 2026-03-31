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
          <router-link to="/" class="topbar-brand"><img src="/Media/Logo.png" alt="YouVBiZ" style="height:32px;width:auto;object-fit:contain;"></router-link>
          <span class="topbar-title">Dashboard</span>
          <div class="topbar-actions"><button class="topbar-icon-btn" @click="handleNotificationClick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg></button></div>
        </div>
        <div class="hero" style="padding-bottom:50px;">
          <div class="hero-inner">
            <div class="badge"><span class="badge-dot"></span> Distributor Account</div>
            <h1 class="hero-title">Good Morning,<br><span class="accent">Welcome Back!</span></h1>
            <p class="hero-sub">Here's your distribution network overview.</p>
          </div>
        </div>
        <div class="sheet">
          <div v-if="loading" style="padding: 20px; text-align: center;">Loading...</div>
          <div v-if="error" style="padding: 10px; color: red; text-align: center;">{{ error }}</div>
          
          <div class="dash-stats">
            <div class="dash-stat"><div class="dash-stat-ico" style="background:#e8f4fe;color:#2563eb;">📦</div><div class="dash-stat-val">{{ stats.products }}</div><div class="dash-stat-lbl">Products Listed</div><div class="dash-stat-trend trend-up">↑ +4 this week</div></div>
            <div class="dash-stat"><div class="dash-stat-ico" style="background:#e8faf0;color:#16a34a;">📩</div><div class="dash-stat-val">{{ stats.enquiries }}</div><div class="dash-stat-lbl">New Enquiries</div><div class="dash-stat-trend trend-up">↑ +7 today</div></div>
            <div class="dash-stat"><div class="dash-stat-ico" style="background:#fef9c3;color:#a16207;">🗺️</div><div class="dash-stat-val">{{ stats.coverageAreas }}</div><div class="dash-stat-lbl">Coverage Areas</div><div class="dash-stat-trend" style="color:var(--muted)">Active</div></div>
            <div class="dash-stat"><div class="dash-stat-ico" style="background:#fee2e2;color:#dc2626;">💼</div><div class="dash-stat-val">{{ stats.jobPostings }}</div><div class="dash-stat-lbl">Job Postings</div><div class="dash-stat-trend" style="color:var(--muted)">Active</div></div>
          </div>

          <p class="sec-label">Quick Actions</p>
          <div class="quick-actions">
            <router-link to="/distributor/dashboard" class="qa-btn"><div class="qa-ico" style="background:#f1f5f9;color:#475569;">🏠</div> Dashboard</router-link>
            <router-link to="/distributor_detail" class="qa-btn"><div class="qa-ico" style="background:#e8f4fe;color:#2563eb;">🏢</div> Company Portfolio (20%)</router-link>
            <router-link to="/distributor-products" class="qa-btn"><div class="qa-ico" style="background:#f3e8ff;color:#9333ea;">🛍️</div> Product Portfolio</router-link>
            <router-link to="/branches" class="qa-btn"><div class="qa-ico" style="background:#e0f2fe;color:#0369a1;">🏢</div> Branches</router-link>
            <router-link to="/business-network-areas" class="qa-btn"><div class="qa-ico" style="background:#f0fdf4;color:#15803d;">🏢</div> Business Network Areas</router-link>
            <router-link to="/client-networks-add-edit" class="qa-btn"><div class="qa-ico" style="background:#ede9fe;color:#7c3aed;">🤝</div> Client Networks</router-link>
            <router-link to="/enquiry-received" class="qa-btn"><div class="qa-ico" style="background:#e8faf0;color:#16a34a;">📩</div> All Enquiries</router-link>
            <router-link to="/interested-products" class="qa-btn"><div class="qa-ico" style="background:#fffbeb;color:#d97706;">🛍️</div> Interested Products</router-link>
            <router-link to="/enquiry-received" class="qa-btn"><div class="qa-ico" style="background:#e8faf0;color:#16a34a;">📩</div> Enquiry Received</router-link>
            <router-link to="/manufacturer-gallery" class="qa-btn"><div class="qa-ico" style="background:#e8f4fe;color:#2563eb;">🖼️</div> Gallery</router-link>
            <router-link to="/distributor-jobs" class="qa-btn"><div class="qa-ico" style="background:#fee2e2;color:#dc2626;">💼</div> Job Posted</router-link>
            <router-link to="/membership-plan" class="qa-btn"><div class="qa-ico" style="background:#f3e8ff;color:#9333ea;">⭐</div> Membership Plan</router-link>
          </div>

          <div class="sec-header mt-8"><h3>Latest Enquiries</h3><router-link to="/enquiry-received" class="view-all-btn">View All</router-link></div>
          <div class="card" style="padding:0;overflow:hidden;">
            <div class="table-wrap">
              <table class="data-table">
                <thead style="background:#f8fafc;">
                  <tr>
                    <th>Date</th><th>Sender Name</th><th>Description</th><th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="enquiry in latestEnquiries" :key="enquiry.id">
                    <td>{{ enquiry.date }}</td>
                    <td style="font-weight:700;">{{ enquiry.name }}</td>
                    <td style="max-width:120px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ enquiry.desc }}</td>
                    <td><button class="reply-mini-btn" @click="$router.push('/enquiry-received')">Reply</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="card mt-12" style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
              <span style="font-size:14px;font-weight:700;color:var(--navy);">Profile Strength</span>
              <span style="font-size:14px;font-weight:800;color:var(--teal);">{{ profileStrength }}%</span>
            </div>
            <div style="height:6px;background:#d1fae5;border-radius:4px;overflow:hidden;"><div :style="{ width: profileStrength + '%', height: '100%', background: 'var(--teal)', borderRadius: '4px' }"></div></div>
            <p style="font-size:12px;color:var(--muted);margin-top:8px;">Add coverage areas and products to improve visibility.</p>
            <router-link to="/add_coverage_area" style="display:inline-block;margin-top:10px;font-size:12px;font-weight:700;color:var(--teal);">Add Coverage Area →</router-link>
          </div>
        </div>
      </div>
      
      <nav class="bottom-nav">
        <router-link to="/distributor/dashboard" class="nav-item active"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home</router-link>
        <router-link to="/distributor-products" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>Products</router-link>
        <router-link to="/enquiry-received" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Enquiries</router-link>
        <router-link to="/membership-plan" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Membership
        </router-link>
        <router-link to="/distributor_detail" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile</router-link>
      </nav>

      <div class="toast" v-if="toast.show">{{ toast.message }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

const currentTime = ref('9:41');
const loading = ref(false);
const error = ref(null);
const profileStrength = ref(20);

const stats = reactive({ products: 36, enquiries: 22, coverageAreas: 5, jobPostings: 2 });

const latestEnquiries = ref([
  { id: 1, date: '31 Mar', name: 'Deepak', desc: 'Looking for distributor in Maharashtra region.' },
  { id: 2, date: '30 Mar', name: 'Rajesh textiles', desc: 'Interested in bulk orders.' }
]);

const toast = reactive({ show: false, message: '' });

const handleNotificationClick = () => { showToast('No new notifications'); };
const showToast = (msg) => { toast.message = msg; toast.show = true; setTimeout(() => toast.show = false, 2500); };

onMounted(() => {
  const now = new Date();
  currentTime.value = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
});
</script>

<style scoped>
.quick-actions { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:18px; }
.qa-btn { background:var(--card); border-radius:var(--radius); padding:16px 14px; box-shadow:var(--shadow-sm); display:flex; align-items:center; gap:10px; font-size:12px; font-weight:700; color:var(--text); transition:var(--transition); text-decoration:none; }
.qa-btn:hover { transform:translateY(-2px); box-shadow:var(--shadow); }
.qa-ico { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0; }
.table-wrap { overflow-x:auto; }
.data-table { width:100%; border-collapse:collapse; font-size:11px; }
.data-table th { padding:10px 12px; text-align:left; font-weight:700; color:var(--muted); border-bottom:1.5px solid var(--border); }
.data-table td { padding:10px 12px; border-bottom:1px solid var(--border); color:var(--text); vertical-align:middle; }
.view-all-btn { background:#f1f5f9; color:#475569; padding:4px 10px; border-radius:8px; font-size:11px; font-weight:700; text-decoration:none; }
.reply-mini-btn { background:var(--teal); color:#fff; border:none; border-radius:6px; padding:4px 10px; font-size:10px; font-weight:800; cursor:pointer; }
.toast { position:fixed; bottom:90px; left:50%; transform:translateX(-50%) translateY(10px); background:var(--navy); color:#fff; padding:10px 20px; border-radius:20px; font-size:13px; font-weight:600; z-index:999; pointer-events:none; opacity:0; transition:all .25s; }
</style>
