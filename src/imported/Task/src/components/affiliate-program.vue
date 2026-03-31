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
      <div class="battery-icon">
        <div class="battery-body">
          <div class="battery-fill"></div>
        </div>
      </div>
    </div>
  </div>

  <div style="display: contents; height: 100%;">
    <div class="page-content">

      <!-- Topbar -->
      <div class="topbar">
        <a href="/manufacturer/dashboard" class="back-btn">←</a>
        <span class="topbar-title">Affiliate Program</span>
        <div></div>
      </div>

      <!-- Hero -->
      <div class="hero" style="padding-bottom:46px;">
        <div class="hero-inner">
          <div class="badge"><span class="badge-dot"></span> Referral Program</div>
          <h1 class="hero-title">Affiliate <span class="accent">Program</span></h1>
          <p class="hero-sub">Grow sales through referrals. Reward partners who bring you customers.</p>
        </div>
      </div>

      <div class="sheet" style="padding:20px;padding-bottom:100px;">

        <!-- Stats -->
        <div class="aff-stats">
          <div class="aff-stat">
            <div class="aff-stat-val">{{ stats.refs }}</div>
            <div class="aff-stat-lbl">Referrals</div>
          </div>
          <div class="aff-stat">
            <div class="aff-stat-val">₹{{ stats.earned }}</div>
            <div class="aff-stat-lbl">Commission Paid</div>
          </div>
        </div>

        <!-- Affiliate Link -->
        <div class="card" style="margin-bottom:14px;">
          <p style="font-size:12px;font-weight:700;color:var(--navy);margin-bottom:8px;">Your Affiliate Link</p>
          <div class="link-box">
            <span class="link-text">{{ affiliateLink }}</span>
            <button class="copy-btn" @click="copyLink">Copy</button>
          </div>
        </div>

        <!-- Settings -->
        <div class="card">
          <p class="sec-label" style="margin-bottom:12px;">Program Settings</p>

          <!-- Radio -->
          <div class="field">
            <label class="lbl">Affiliate Status</label>

            <div class="radio-group">
              <label class="radio-card" :class="{selected: form.status==='1'}" @click="form.status='1'">
                <input type="radio" value="1" v-model="form.status">
                <div class="radio-card-body">
                  <div class="radio-card-title">Enable for All Products</div>
                  <div class="radio-card-desc">Affiliate commission applies to every product in your catalogue.</div>
                </div>
              </label>

              <label class="radio-card" :class="{selected: form.status==='2'}" @click="form.status='2'">
                <input type="radio" value="2" v-model="form.status">
                <div class="radio-card-body">
                  <div class="radio-card-title">Enable for Selected Products Only</div>
                  <div class="radio-card-desc">Choose specific products that participate in the affiliate program.</div>
                </div>
              </label>

              <label class="radio-card" :class="{selected: form.status==='0'}" @click="form.status='0'">
                <input type="radio" value="0" v-model="form.status">
                <div class="radio-card-body">
                  <div class="radio-card-title">Disable Affiliate Program</div>
                  <div class="radio-card-desc">No referral commissions will be offered.</div>
                </div>
              </label>
            </div>
          </div>

          <!-- Inputs -->
          <div class="rate-row">
            <div class="field">
              <label class="lbl">Referrer Commission %</label>
              <input class="inp" type="number" v-model="form.commission" min="0" max="99" />
            </div>

            <div class="field">
              <label class="lbl">Buyer Discount %</label>
              <input class="inp" type="number" v-model="form.discount" min="0" max="99" />
            </div>
          </div>

          <!-- Button -->
          <button class="btn btn-teal" :disabled="loading" @click="saveSettings">
            {{ loading ? 'Saving...' : 'Save Changes' }}
          </button>

          <p v-if="error" style="color:red;font-size:12px;margin-top:8px;">{{ error }}</p>
          <p v-if="success" style="color:green;font-size:12px;margin-top:8px;">{{ success }}</p>

        </div>

      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'

// State
const loading = ref(false)
const error = ref('')
const success = ref('')

const stats = reactive({
  refs: 0,
  earned: 0
})

const affiliateLink = ref('')

const form = reactive({
  status: '0',
  commission: 5,
  discount: 3
})

// Generate link
function generateLink() {
  const code = 'YVB' + Math.random().toString(36).substring(2, 8).toUpperCase()
  affiliateLink.value = `https://youvbiz.com/ref/${code}`
}

// Copy
function copyLink() {
  navigator.clipboard.writeText(affiliateLink.value)
}

// API Call
async function saveSettings() {
  error.value = ''
  success.value = ''

  if (form.commission < 0 || form.commission > 99 || form.discount < 0 || form.discount > 99) {
    error.value = 'Rates must be between 0 and 99'
    return
  }

  try {
    loading.value = true

    await axios.post('/api/affiliate-settings', {
      status: form.status,
      commission: form.commission,
      discount: form.discount
    })

    success.value = 'Affiliate settings saved!'
  } catch (err) {
    error.value = 'Failed to save settings'
  } finally {
    loading.value = false
  }
}

// Fetch data
async function fetchData() {
  try {
    const res = await axios.get('/api/affiliate-settings')

    const data = res.data

    form.status = data.status || '0'
    form.commission = data.commission || 5
    form.discount = data.discount || 3

    stats.refs = data.refs || 12
    stats.earned = data.earned || 2340

  } catch (err) {
    console.log(err)
  }
}

// Init
onMounted(() => {
  generateLink()
  fetchData()
})
</script>