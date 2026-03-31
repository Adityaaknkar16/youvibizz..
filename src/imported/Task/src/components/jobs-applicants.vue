<template>
<div style="display: contents">
  <div class="phone-notch" style="display: none !important"><div class="notch-speaker"></div><div class="notch-camera"></div></div>
  <div class="status-bar" style="display: none !important">
    <span class="status-time">9:41</span>
    <div class="status-icons">
      <svg viewBox="0 0 24 24" fill="white"><rect x="1" y="15" width="4" height="6" rx="1"/><rect x="7" y="11" width="4" height="10" rx="1"/><rect x="13" y="7" width="4" height="14" rx="1"/><rect x="19" y="3" width="4" height="18" rx="1" opacity=".3"/></svg>
      <div class="battery-icon"><div class="battery-body"><div class="battery-fill"></div></div></div>
    </div>
  </div>
  <div style="display: contents; height: 100%;">
  <div class="page-content">
    <div class="topbar">
      <a href="#" class="back-btn" @click="router.go(-1)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
      </a>
      <span class="topbar-title">Job Applicants</span>
      <div></div>
    </div>

    <div class="hero" style="padding-bottom:46px;">
      <div class="hero-inner">
        <div class="badge"><span class="badge-dot"></span> Hiring</div>
        <h1 class="hero-title">Job <span class="accent">Applicants</span></h1>
        <p class="hero-sub">Review, shortlist and hire the best candidates for your openings.</p>
      </div>
    </div>

    <div class="sheet" style="padding:20px;padding-bottom:100px;">

      <!-- Stats -->
      <div class="stats-row">
        <div class="stat-box"><div class="stat-box-val">{{ stats.total }}</div><div class="stat-box-lbl">Total</div></div>
        <div class="stat-box"><div class="stat-box-val" style="color:#f59e0b">{{ stats.pending }}</div><div class="stat-box-lbl">Pending</div></div>
        <div class="stat-box"><div class="stat-box-val" style="color:var(--teal)">{{ stats.shortlisted }}</div><div class="stat-box-lbl">Shortlisted</div></div>
        <div class="stat-box"><div class="stat-box-val" style="color:#16a34a">{{ stats.hired }}</div><div class="stat-box-lbl">Hired</div></div>
      </div>

      <!-- Job Filter -->
      <div class="job-filter-wrap">
        <select class="inp inp-no-ico" v-model="jobFilter">
          <option value="all">All Jobs</option>
          <option v-for="job in JOBS" :key="job.id" :value="job.id">{{ job.title }}</option>
        </select>
      </div>

      <!-- Status Tabs -->
      <div class="filter-tabs">
        <button class="ftab" :class="{ active: activeStatus === 'all' }" @click="filterByStatus('all')">All</button>
        <button class="ftab" :class="{ active: activeStatus === 'pending' }" @click="filterByStatus('pending')">Pending</button>
        <button class="ftab" :class="{ active: activeStatus === 'shortlisted' }" @click="filterByStatus('shortlisted')">Shortlisted</button>
        <button class="ftab" :class="{ active: activeStatus === 'hired' }" @click="filterByStatus('hired')">Hired</button>
        <button class="ftab" :class="{ active: activeStatus === 'rejected' }" @click="filterByStatus('rejected')">Rejected</button>
      </div>

      <!-- Applicant List -->
      <div v-if="visibleApplicants.length === 0" class="empty-state">
        <div class="e-ico">👥</div>
        <p>No applicants {{ activeStatus !== 'all' ? 'with status "' + activeStatus + '"' : '' }} found.</p>
      </div>
      
      <div v-else>
        <div v-for="a in visibleApplicants" :key="a.id" class="applicant-card">
          <div class="app-top">
            <div class="app-avatar">{{ a.initials }}</div>
            <div style="flex:1;min-width:0;">
              <div class="app-name">{{ a.name }}</div>
              <div class="app-job">💼 {{ a.job }}</div>
            </div>
            <span class="pill" :class="getStatusColor(a.status)">{{ capitalize(a.status) }}</span>
          </div>
          <div class="app-meta">
            <span class="app-meta-item">📧 {{ a.email }}</span>
            <span class="app-meta-item">📞 {{ a.phone }}</span>
            <span class="app-meta-item">💼 {{ a.experience }}</span>
            <span class="app-meta-item">📅 {{ formatDate(a.created) }}</span>
          </div>
          <p style="font-size:12px;color:var(--muted);line-height:1.4;margin-bottom:10px;">
            {{ a.cover.length > 80 ? a.cover.slice(0,80) + '...' : a.cover }}
          </p>
          <div class="app-actions">
            <button class="btn btn-outline btn-xs" @click="viewDetail(a.id)">👁 View</button>
            <select class="status-select" :class="a.status" :value="a.status" @change="updateStatus(a.id, $event.target.value)">
              <option value="pending">Pending</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>
    </div><!-- /sheet -->
  </div><!-- /app -->

    <nav class="bottom-nav">
      <router-link to="/dashboard" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home</router-link>
      <router-link to="/products" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>Products</router-link>
      <router-link to="/messages" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Messages</router-link>
      <router-link to="/payments" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>Payments</router-link>
      <router-link to="/profile" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile</router-link>
    </nav>
  </div>
  <div class="toast" :class="{ show: toastVisible }">{{ toastMsg }}</div>
  </div>

<!-- Detail Modal -->
<div class="modal-overlay" :class="{ open: isModalOpen }" @click="handleModalClick">
  <div class="modal-sheet" @click.stop v-if="currentApplicant">
    <div class="modal-handle"></div>
    <div class="modal-title">Applicant Details</div>
    
    <div id="detailContent">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
        <div style="width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,var(--navy),var(--navy2));display:flex;align-items:center;justify-content:center;font-size:20px;color:#fff;font-weight:900;font-family:'Barlow',sans-serif;">{{ currentApplicant.initials }}</div>
        <div><div style="font-size:16px;font-weight:800;color:var(--navy);">{{ currentApplicant.name }}</div><div style="font-size:12px;color:var(--teal);">💼 {{ currentApplicant.job }}</div></div>
        <span class="pill" :class="getStatusColor(currentApplicant.status)" style="margin-left:auto;">{{ capitalize(currentApplicant.status) }}</span>
      </div>
      <div class="detail-row"><span class="detail-key">Email</span><span class="detail-val">{{ currentApplicant.email }}</span></div>
      <div class="detail-row"><span class="detail-key">Phone</span><span class="detail-val">{{ currentApplicant.phone }}</span></div>
      <div class="detail-row"><span class="detail-key">Experience</span><span class="detail-val">{{ currentApplicant.experience }}</span></div>
      <div class="detail-row"><span class="detail-key">Applied On</span><span class="detail-val">{{ formatDate(currentApplicant.created) }}</span></div>
      <div class="detail-row" style="flex-direction:column; gap:4px;">
        <span class="detail-key" style="margin-bottom:4px;">Cover Note</span>
        <span class="detail-val">{{ currentApplicant.cover }}</span>
      </div>
    </div>
    
    <div style="display:flex;gap:8px;margin-top:14px;">
      <button class="btn btn-teal btn-sm" style="flex:1" @click="updateStatusAndClose('shortlisted')">✅ Shortlist</button>
      <button class="btn btn-sm" style="flex:1;background:#16a34a;color:#fff;" @click="updateStatusAndClose('hired')">🎉 Hire</button>
      <button class="btn btn-danger btn-sm" style="flex:1" @click="updateStatusAndClose('rejected')">❌ Reject</button>
    </div>
    <button class="btn btn-outline btn-sm w-full" style="margin-top:8px;" @click="closeModal">Close</button>
  </div>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const JOBS = [
  { id: 1, title: 'Sales Executive' },
  { id: 2, title: 'Production Manager' },
  { id: 3, title: 'Logistics Coordinator' },
]

const SAMPLE_APPS = [
  { id: 1, job_id: 1, job: 'Sales Executive', name: 'Arjun Kapoor', initials: 'AK', email: 'arjun@gmail.com', phone: '9876543210', experience: '3 years in B2B sales', status: 'pending', cover: 'I have 3 years of B2B sales experience in building materials. Keen to contribute to YouVBiZ growth.', created: new Date(Date.now() - 86400000 * 1).toISOString() },
  { id: 2, job_id: 1, job: 'Sales Executive', name: 'Sneha Rao', initials: 'SR', email: 'sneha@gmail.com', phone: '9876543211', experience: '5 years', status: 'shortlisted', cover: 'Extensive network in the plywood and furniture industry across Maharashtra.', created: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: 3, job_id: 2, job: 'Production Manager', name: 'Manish Gupta', initials: 'MG', email: 'manish@gmail.com', phone: '9876543212', experience: '7 years', status: 'hired', cover: 'Production management specialist with expertise in lean manufacturing.', created: new Date(Date.now() - 86400000 * 3).toISOString() },
  { id: 4, job_id: 3, job: 'Logistics Coordinator', name: 'Pooja Singh', initials: 'PS', email: 'pooja@gmail.com', phone: '9876543213', experience: '2 years', status: 'pending', cover: 'Supply chain and logistics coordination experience with major FMCG companies.', created: new Date(Date.now() - 86400000 * 4).toISOString() },
  { id: 5, job_id: 2, job: 'Production Manager', name: 'Ravi Verma', initials: 'RV', email: 'ravi@gmail.com', phone: '9876543214', experience: '4 years', status: 'rejected', cover: 'Interested in the production manager role. Available immediately.', created: new Date(Date.now() - 86400000 * 5).toISOString() },
]

const applicants = ref(SAMPLE_APPS)
const activeStatus = ref('all')
const jobFilter = ref('all')

const currentAppId = ref(null)
const isModalOpen = ref(false)
const toastVisible = ref(false)
const toastMsg = ref('')

const showToast = (msg) => {
  toastMsg.value = msg
  toastVisible.value = true
  setTimeout(() => toastVisible.value = false, 2500)
}

const filteredTopStats = computed(() => {
  let list = applicants.value
  if (jobFilter.value !== 'all') {
    list = list.filter(a => String(a.job_id) === String(jobFilter.value))
  }
  return list
})

const stats = computed(() => {
  const all = filteredTopStats.value
  return {
    total: all.length,
    pending: all.filter(a => a.status === 'pending').length,
    shortlisted: all.filter(a => a.status === 'shortlisted').length,
    hired: all.filter(a => a.status === 'hired').length
  }
})

const visibleApplicants = computed(() => {
  let list = filteredTopStats.value
  if (activeStatus.value !== 'all') {
    list = list.filter(a => a.status === activeStatus.value)
  }
  return list
})

const currentApplicant = computed(() => {
  return applicants.value.find(a => a.id === currentAppId.value) || null
})

const filterByStatus = (val) => {
  activeStatus.value = val
}

const updateStatus = (id, status) => {
  const idx = applicants.value.findIndex(a => a.id === id)
  if (idx > -1) {
    applicants.value[idx].status = status
  }
  
  const labels = { pending: 'Moved to Pending', shortlisted: 'Shortlisted! ✅', hired: 'Hired! 🎉', rejected: 'Rejected' }
  showToast(labels[status] || 'Status updated')
}

const updateStatusAndClose = (status) => {
  if (currentAppId.value) {
    updateStatus(currentAppId.value, status)
  }
  closeModal()
}

const viewDetail = (id) => {
  currentAppId.value = id
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const handleModalClick = (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    closeModal()
  }
}

const formatDate = (isoStr) => {
  const d = new Date(isoStr)
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const getStatusColor = (status) => {
  const map = { pending: 'pill-yellow', shortlisted: 'pill-teal', hired: 'pill-green', rejected: 'pill-red' }
  return map[status] || 'pill-gray'
}

const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}
</script>

<style scoped>
.applicant-card { background: var(--card); border-radius: var(--radius); padding: 14px; box-shadow: var(--shadow-sm); margin-bottom: 10px; transition: var(--transition); }
.app-top { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 10px; }
.app-avatar { width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, var(--navy), var(--navy2)); display: flex; align-items: center; justify-content: center; font-size: 17px; color: #fff; font-weight: 900; flex-shrink: 0; font-family: 'Barlow', sans-serif; }
.app-name { font-size: 14px; font-weight: 700; color: var(--navy); }
.app-job { font-size: 12px; color: var(--teal); margin-top: 1px; }
.app-meta { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 8px; }
.app-meta-item { font-size: 11px; color: var(--muted); display: flex; align-items: center; gap: 3px; }
.app-actions { display: flex; gap: 6px; flex-wrap: wrap; }
.status-select { padding: 5px 10px; border-radius: 8px; font-size: 11px; font-weight: 700; border: 1.5px solid var(--border); background: #fff; color: var(--navy); cursor: pointer; }
.status-select.shortlisted { border-color: var(--teal); color: var(--teal); background: rgba(34,162,138,.08); }
.status-select.hired { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }
.status-select.rejected { border-color: var(--danger); color: var(--danger); background: #fef2f2; }
.status-select.pending { border-color: #f59e0b; color: #92400e; background: #fef9c3; }
.filter-tabs { display: flex; gap: 8px; margin-bottom: 14px; overflow-x: auto; padding-bottom: 4px; }
.filter-tabs::-webkit-scrollbar { display: none; }
.ftab { padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; border: 1.5px solid var(--border); background: #fff; color: var(--muted); white-space: nowrap; cursor: pointer; }
.ftab.active { background: var(--navy); color: #fff; border-color: var(--navy); }
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 14px; }
.stat-box { background: var(--card); border-radius: var(--radius-sm); padding: 10px; text-align: center; box-shadow: var(--shadow-sm); }
.stat-box-val { font-size: 18px; font-weight: 900; font-family: 'Barlow', sans-serif; }
.stat-box-lbl { font-size: 9px; color: var(--muted); margin-top: 2px; text-transform: uppercase; letter-spacing: .2px; }
.job-filter-wrap { position: relative; margin-bottom: 14px; }
.job-filter-wrap::after { content: '▾'; position: absolute; right: 14px; top: 50%; transform: translateY(-50%); pointer-events: none; color: var(--muted); font-size: 12px; }

/* Modal */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.6); z-index: 900; display: none; align-items: flex-end; justify-content: center; }
.modal-overlay.open { display: flex; }
.modal-sheet { background: #fff; border-radius: 26px 26px 0 0; width: 100%; max-width: 390px; padding: 20px; max-height: 85vh; overflow-y: auto; animation: slideUp .25s ease; }
@keyframes slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
.modal-handle { width: 36px; height: 4px; background: #d1d5db; border-radius: 4px; margin: 0 auto 16px; }
.modal-title { font-size: 16px; font-weight: 800; color: var(--navy); margin-bottom: 14px; }
.detail-row { display: flex; align-items: flex-start; gap: 8px; padding: 8px 0; border-bottom: 1px solid var(--border); }
.detail-row:last-child { border-bottom: none; }
.detail-key { font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: .3px; min-width: 90px; flex-shrink: 0; }
.detail-val { font-size: 13px; color: var(--text); }
.empty-state { text-align: center; padding: 40px 20px; }
.empty-state .e-ico { font-size: 40px; margin-bottom: 12px; }
.empty-state p { font-size: 13px; color: var(--muted); }

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