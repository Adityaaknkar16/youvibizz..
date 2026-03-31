<template>
  <!-- Topbar -->
  <div class="topbar anim">
    <button @click="$router.push('/manufacturer/dashboard')" class="back-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
    <span class="topbar-title">Job Management</span>
    <button class="topbar-icon-btn" @click="goToAddJob">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </button>
  </div>

  <!-- Sheet -->
  <div class="sheet anim">
    <div class="job-list">
      <div v-for="job in jobs" :key="job.id" class="job-card">
        <div class="job-header">
          <div class="job-title-group">
            <h4 class="job-title">{{ job.title }}</h4>
            <span class="status-badge" :class="job.status.toLowerCase()">{{ job.status }}</span>
          </div>
        </div>

        <div class="job-meta-grid">
          <span class="meta-item"><span class="meta-ico">📍</span> {{ job.location }}</span>
          <span class="meta-item"><span class="meta-ico">💼</span> {{ job.type }}</span>
          <span class="meta-item"><span class="meta-ico">💰</span> {{ job.salary }}</span>
        </div>

        <div class="job-tags">
          <span v-for="tag in job.tags" :key="tag" class="job-tag">{{ tag }}</span>
        </div>

        <div class="job-footer">
          <div class="applicants">
            <span class="meta-ico">👥</span> {{ job.applicants }} Applicants
          </div>
          <div class="job-actions">
            <button class="action-btn edit-btn" @click="goToAddJob">Edit</button>
            <button class="action-btn close-btn" @click="confirmClose(job)">Close</button>
          </div>
        </div>
      </div>

      <!-- Post New Job Button -->
      <button class="post-job-entry-btn anim" @click="goToAddJob">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Post New Job
      </button>
    </div>
  </div>

  <!-- Toast -->
  <div class="toast" :class="{ show: toastVisible }">{{ toastMessage }}</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const jobs = ref([
  {
    id: 1,
    title: 'Sales Executive — Timber Products',
    status: 'Active',
    location: 'Pune',
    type: 'Full Time',
    salary: '₹20K–28K/mo',
    tags: ['Sales', 'B2B', 'Timber'],
    applicants: 8
  },
  {
    id: 2,
    title: 'Quality Control Inspector',
    status: 'Active',
    location: 'Nagpur',
    type: 'Full Time',
    salary: '₹18K–24K/mo',
    tags: ['Quality', 'Manufacturing'],
    applicants: 3
  }
])

const toastVisible = ref(false)
const toastMessage = ref('')

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2500)
}

function confirmClose(job) {
  if (confirm(`Are you sure you want to close "${job.title}"?`)) {
    showToast('Job closed successfully')
  }
}

function goToAddJob() {
  const roleValue = localStorage.getItem('yb_role') || 'retailer'
  const role = roleValue.toLowerCase()
  
  if (role === 'manufacturer') {
    router.push('/manufacturer/jobs/add')
  } else {
    router.push('/retailer/jobs/add')
  }
}
</script>

<style scoped>
.job-list { padding-bottom: 20px; }
.job-card { background: #fff; border: 1.5px solid var(--border); border-radius: 18px; padding: 18px; margin-bottom: 16px; box-shadow: var(--shadow-sm); }

.job-header { margin-bottom: 12px; }
.job-title-group { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
.job-title { font-size: 16px; font-weight: 800; color: var(--navy); line-height: 1.3; margin: 0; }

.status-badge { font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
.status-badge.active { background: #e8faf0; color: #16a34a; border: 1px solid rgba(22,163,74,0.15); }

.job-meta-grid { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 14px; }
.meta-item { font-size: 12px; font-weight: 600; color: var(--muted); display: flex; align-items: center; gap: 4px; }
.meta-ico { font-size: 13px; }

.job-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
.job-tag { background: #f1f5f9; color: #475569; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 12px; border: 1px solid var(--border); }

.job-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1.5px solid var(--border); }
.applicants { font-size: 13px; font-weight: 700; color: var(--teal); }

.job-actions { display: flex; gap: 8px; }
.action-btn { height: 32px; padding: 0 14px; font-size: 12px; font-weight: 700; border-radius: 8px; cursor: pointer; transition: var(--transition); background: transparent; }
.edit-btn { color: var(--teal); border: 1.5px solid var(--teal); }
.edit-btn:hover { background: var(--teal); color: #fff; }
.close-btn { color: #ef4444; border: 1.5px solid #ef4444; }
.close-btn:hover { background: #ef4444; color: #fff; }

.post-job-entry-btn { 
  width: 100%; height: 54px; background: var(--teal); color: #fff; border: none; border-radius: 16px;
  font-size: 15px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 10px;
  box-shadow: 0 10px 25px rgba(34,162,138,0.3); margin-top: 24px; cursor: pointer; transition: var(--transition);
}
.post-job-entry-btn:active { transform: scale(0.97); }
.post-job-entry-btn svg { width: 20px; height: 20px; color: #fff; }

.toast {
  position: fixed; bottom: 90px; left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: var(--navy); color: #fff;
  padding: 10px 20px; border-radius: 20px;
  font-size: 13px; font-weight: 600;
  z-index: 999; pointer-events: none;
  opacity: 0; transition: opacity .25s, transform .25s;
  white-space: nowrap;
}
.toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
</style>
