<template>
<div style="display: contents">
  <div class="phone-notch" style="display: none !important">
    <div class="notch-speaker"></div>
    <div class="notch-camera"></div>
  </div>

  <div class="status-bar" style="display: none !important">
    <span class="status-time">9:41</span>
    <div class="status-icons">
      <svg viewBox="0 0 24 24" fill="white">
        <rect x="1" y="15" width="4" height="6" rx="1"/>
        <rect x="7" y="11" width="4" height="10" rx="1"/>
        <rect x="13" y="7" width="4" height="14" rx="1"/>
        <rect x="19" y="3" width="4" height="18" rx="1" opacity=".3"/>
      </svg>
      <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <path d="M5 12.55a11 11 0 0114.08 0"/>
        <path d="M1.42 9a16 16 0 0121.16 0"/>
        <path d="M8.53 16.11a6 6 0 016.95 0"/>
        <circle cx="12" cy="20" r="1" fill="white"/>
      </svg>
      <div class="battery-icon">
        <div class="battery-body"><div class="battery-fill"></div></div>
      </div>
    </div>
  </div>

  <div style="display: contents; height: 100%;">
    <div class="page-content">

      <div class="topbar">
        <a href="/pages/task/index" class="back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </a>
        <span class="topbar-title">Jobs & Careers</span>
        <a href="/pages/task/job-post" class="topbar-icon-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </a>
      </div>

      <div class="hero" style="padding:20px 22px 50px;">
        <div class="hero-inner">
          <div class="badge"><span class="badge-dot"></span> Opportunities Across India</div>
          <h1 class="hero-title">Find Your Next<br><span class="accent">Opportunity</span></h1>
          <p class="hero-sub">Jobs posted by manufacturers, distributors & retailers on YouVBiZ marketplace.</p>
        </div>
      </div>

      <div class="sheet">

        <!-- Search -->
        <div class="search-bar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" placeholder="Search job title or company..." v-model="searchQuery">
        </div>

        <!-- Filters -->
        <div class="filter-chips">
          <button
            v-for="chip in chips"
            :key="chip"
            class="chip"
            :class="{ active: selectedChip === chip }"
            @click="selectChip(chip)"
          >
            {{ chip }}
          </button>
        </div>

        <!-- Job Cards -->
        <div v-for="job in filteredJobs" :key="job.title" class="job-card">
          <div class="job-header">
            <div class="job-logo">{{ job.icon }}</div>
            <div class="job-co">
              <div class="job-title">{{ job.title }}</div>
              <div class="job-company">{{ job.company }}</div>
            </div>
            <span v-if="job.tag" class="pill" :class="job.tagClass">{{ job.tag }}</span>
          </div>

          <div class="job-tags">
            <span v-for="tag in job.tags" :key="tag" class="pill pill-gray">{{ tag }}</span>
          </div>

          <div class="job-footer">
            <div class="job-salary">{{ job.salary }}</div>
            <button class="apply-btn" @click="applyJob(job.title)" :disabled="loading">
              {{ loading ? 'Applying...' : 'Apply Now' }}
            </button>
          </div>
        </div>

        <!-- CTA -->
        <div class="post-job-cta">
          <h4>Hiring? Post a Job</h4>
          <p>Reach thousands of qualified professionals in the B2B materials industry.</p>
          <a href="/pages/task/job-post" class="btn btn-teal btn-sm" style="text-decoration:none;display:inline-flex;width:auto;padding:0 24px;">
            Post a Job
          </a>
        </div>

      </div>
    </div>

    <!-- Bottom Nav -->
    <nav class="bottom-nav">
      <a href="/pages/task/index" class="nav-item">Home</a>
      <a href="/pages/task/listing" class="nav-item">Explore</a>
      <a href="/register" class="nav-item">Post</a>
      <a href="/pages/purva/careers" class="nav-item active">Jobs</a>
      <a href="/pages/task/login" class="nav-item">Account</a>
    </nav>

    <!-- Toast -->
    <div class="toast" v-if="toastMessage">{{ toastMessage }}</div>

  </div>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'

const searchQuery = ref('')
const selectedChip = ref('All Jobs')
const loading = ref(false)
const toastMessage = ref('')

const chips = ['All Jobs', 'Sales', 'Operations', 'Marketing', 'Tech']

const jobs = ref([
  { title: 'Sales Executive', company: 'Manufacturing Company · Mumbai', icon: '🏭', salary: '₹4–6 LPA', tags: ['Full Time','3-5 yrs exp'], category: 'Sales', tag:'New', tagClass:'pill-teal' },
  { title: 'Distribution Manager', company: 'Distribution Company · Delhi', icon: '🚚', salary: '₹6–10 LPA', tags: ['Full Time','5+ yrs exp'], category: 'Operations', tag:'Urgent', tagClass:'pill-yellow' },
  { title: 'Product Specialist', company: 'Business · Bangalore', icon: '✨', salary: '₹3.5–5 LPA', tags: ['Full Time','2-4 yrs exp'], category: 'Marketing', tag:'New', tagClass:'pill-teal' },
  { title: 'Digital Marketing Executive', company: 'YouVBiZ · Hyderabad (Remote)', icon: '💻', salary: '₹3–4.5 LPA', tags: ['Full Time','1-3 yrs exp'], category: 'Marketing' },
  { title: 'Store Manager', company: 'Retail Company · Pune', icon: '🏪', salary: '₹4–6 LPA', tags: ['Full Time','4+ yrs exp'], category: 'Operations' }
])

const filteredJobs = computed(() => {
  return jobs.value.filter(job => {
    const matchSearch = job.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchChip = selectedChip.value === 'All Jobs' || job.category === selectedChip.value
    return matchSearch && matchChip
  })
})

function selectChip(chip) {
  selectedChip.value = chip
}

async function applyJob(title) {
  loading.value = true
  try {
    await axios.post('/api/apply-job', { jobTitle: title })
    toastMessage.value = `Applied for ${title}! ✓`
    setTimeout(() => toastMessage.value = '', 2500)
  } catch (err) {
    toastMessage.value = 'Something went wrong!'
    setTimeout(() => toastMessage.value = '', 2500)
  } finally {
    loading.value = false
  }
}
</script>