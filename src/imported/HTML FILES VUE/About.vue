<template>
<div style="display: contents">
  <div class="phone-notch" style="display: none !important">
    <div class="notch-speaker"></div>
    <div class="notch-camera"></div>
  </div>

  <div class="status-bar" style="display: none !important">
    <span class="status-time">9:41</span>
    <div class="status-icons">
      <svg viewBox="0 0 24 24" fill="white"><rect x="1" y="15" width="4" height="6" rx="1"/><rect x="7" y="11" width="4" height="10" rx="1"/><rect x="13" y="7" width="4" height="14" rx="1"/><rect x="19" y="3" width="4" height="18" rx="1" opacity=".3"/></svg>
      <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill="white"/></svg>
      <div class="battery-icon"><div class="battery-body"><div class="battery-fill"></div></div></div>
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
      <span class="topbar-title">About YouVBiZ</span>
    </div>

    <img class="about-img" :src="imageSrc" @error="handleImgError" alt="About YouVBiZ" />

    <div class="hero" style="padding:24px 22px 52px;margin-top:-10px;">
      <div class="hero-inner">
        <div class="badge"><span class="badge-dot"></span> India's First Technology-Driven B2B Marketplace</div>
        <h1 class="hero-title">About<br><span class="accent">Youv.Biz</span></h1>
        <p class="hero-sub">India's first technology-driven B2B marketplace connecting Manufacturers, Distributors, and Retailers across the country.</p>
      </div>
    </div>

    <div class="sheet">

      <!-- Static content unchanged -->

      <p class="sec-label">Our Mission & Vision</p>
      <div class="value-card">
        <div class="value-ico">🎯</div>
        <div>
          <div class="value-title">Our Mission</div>
          <div class="value-text">Expanding business networks across India — our platform brings together manufacturers, importers, wholesalers, aspiring retailers and Startup Businesses.</div>
        </div>
      </div>

      <div class="value-card">
        <div class="value-ico">🔭</div>
        <div>
          <div class="value-title">Our Vision</div>
          <div class="value-text">To become India's most trusted business network platform for the entire supply chain.</div>
        </div>
      </div>

      <!-- Example dynamic stats -->
      <div class="dash-stats mb-16">
        <div class="dash-stat" v-for="stat in stats" :key="stat.label">
          <div class="dash-stat-ico">{{ stat.icon }}</div>
          <div class="dash-stat-val">{{ stat.value }}</div>
          <div class="dash-stat-lbl">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Leadership -->
      <p class="sec-label">Meet the Leadership</p>
      <div class="card mb-16">
        <div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px;">
          <img :src="leaderImg" @error="hideLeaderImg" v-show="showLeader" style="width:100px;height:100px;border-radius:50%;" />
          <div>
            <div style="font-size:15px;font-weight:700;color:var(--navy);">Kuldeep Jain</div>
            <div style="font-size:12px;color:var(--teal);font-weight:600;">Founder & CEO</div>
          </div>
        </div>
      </div>

      <!-- Contact -->
      <p class="sec-label">Get In Touch</p>
      <div class="card">
        <div style="display:flex;flex-direction:column;gap:12px;">
          <a href="tel:+919911662276">📞 +91 99116 62276</a>
          <a href="mailto:support@youvbiz.com">✉️ support@youvbiz.com</a>
        </div>
      </div>

      <button class="btn btn-teal mt-16" :disabled="loading" @click="joinNow">
        {{ loading ? 'Joining...' : 'Join YouVBiZ Today' }}
      </button>

      <p v-if="error" style="color:red;font-size:12px;">{{ error }}</p>
      <p v-if="success" style="color:green;font-size:12px;">{{ success }}</p>

    </div>

  </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const imageSrc = ref('Media/about.jpg')
const leaderImg = ref('Media/aboutLeader.jpeg')
const showLeader = ref(true)

const stats = ref([])

const loading = ref(false)
const error = ref('')
const success = ref('')

// Image fallback
const handleImgError = () => {
  imageSrc.value = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800'
}

const hideLeaderImg = () => {
  showLeader.value = false
}

// Fetch stats (API)
const fetchStats = async () => {
  try {
    const res = await axios.get('/api/stats')
    stats.value = res.data
  } catch (err) {
    // fallback data
    stats.value = [
      { icon: '🏭', value: '5000+', label: 'Manufacturers' },
      { icon: '🚚', value: '12K+', label: 'Distributors' },
      { icon: '📍', value: '800+', label: 'Cities' },
      { icon: '⭐', value: '25K+', label: 'Businesses' }
    ]
  }
}

// Join API
const joinNow = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    await axios.post('/api/join', { source: 'about-page' })
    success.value = 'Successfully joined!'
  } catch (err) {
    error.value = 'Something went wrong. Try again.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchStats()
})
</script>