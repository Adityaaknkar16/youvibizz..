<template>
<div style="display: contents">
  <div class="phone-notch" style="display: none !important"><div class="notch-speaker"></div><div class="notch-camera"></div></div>

  <div class="status-bar" style="display: none !important">
    <span class="status-time">9:41</span>
    <div class="status-icons">
      <svg viewBox="0 0 24 24" fill="white"><rect x="1" y="15" width="4" height="6"/><rect x="7" y="11" width="4" height="10"/><rect x="13" y="7" width="4" height="14"/><rect x="19" y="3" width="4" height="18" opacity=".3"/></svg>
      <svg viewBox="0 0 24 24" fill="none" stroke="white"><path d="M5 12.55a11 11 0 0114.08 0"/></svg>
      <div class="battery-icon"><div class="battery-body"><div class="battery-fill"></div></div></div>
    </div>
  </div>

  <div style="display: contents; height: 100%;">
  <div class="page-content">

    <div class="topbar">
      <a href="/pages/adityavuetask/distributor-dashboard" class="back-btn">
        <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
      </a>
      <span class="topbar-title">Coverage Areas</span>
      <div style="width:36px;"></div>
    </div>

    <div class="hero" style="padding:20px 22px 50px;">
      <div class="hero-inner">
        <h1 class="hero-title">Supply <span class="accent">Coverage</span></h1>
        <p class="hero-sub">Select states & districts you serve.</p>
      </div>
    </div>

    <div class="sheet">

      <!-- Selected Chips -->
      <p class="sec-label">Currently Covering</p>
      <div style="background:var(--card);padding:14px;display:flex;flex-wrap:wrap;gap:6px;">
        <span class="state-chip" v-for="state in selectedStates" :key="state">
          {{ state }}
          <button @click="removeState(state)">×</button>
        </span>
      </div>

      <!-- Search -->
      <p class="sec-label">Select States</p>
      <div class="search-bar">
        <input v-model="search" placeholder="Search states..." />
      </div>

      <!-- States -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        <button 
          v-for="state in filteredStates" 
          :key="state"
          class="state-btn"
          :class="{ sel: selectedStates.includes(state) }"
          @click="toggleState(state)"
        >
          {{ state }}
        </button>
      </div>

      <!-- Form -->
      <div class="card form-section">
        <div class="section-title">Supply Details</div>

        <div class="field">
          <label>Delivery Lead Time</label>
          <select v-model="form.leadTime">
            <option>Same Day</option>
            <option>1–2 Days</option>
            <option>3–5 Days</option>
          </select>
        </div>

        <div class="field">
          <label>Minimum Order</label>
          <input v-model="form.minOrder" placeholder="e.g. ₹10,000" />
        </div>

        <div class="field">
          <label>Freight Policy</label>
          <select v-model="form.freight">
            <option>FOB</option>
            <option>Door Delivery</option>
          </select>
        </div>
      </div>

      <button class="btn btn-teal w-full" :disabled="loading" @click="saveCoverage">
        {{ loading ? 'Saving...' : 'Save Coverage Areas' }}
      </button>

      <p v-if="error" style="color:red">{{ error }}</p>
      <p v-if="success" style="color:green">{{ success }}</p>

    </div>
  </div>
  </div>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'

const allStates = [
  'Maharashtra','Gujarat','Madhya Pradesh','Delhi','Karnataka','Tamil Nadu','Punjab'
]

const selectedStates = ref(['Maharashtra','Gujarat'])
const search = ref('')

const form = ref({
  leadTime: '3–5 Days',
  minOrder: '',
  freight: 'Door Delivery'
})

const loading = ref(false)
const error = ref('')
const success = ref('')

// Filter
const filteredStates = computed(() =>
  allStates.filter(s => s.toLowerCase().includes(search.value.toLowerCase()))
)

// Toggle state
const toggleState = (state) => {
  if (selectedStates.value.includes(state)) {
    selectedStates.value = selectedStates.value.filter(s => s !== state)
  } else {
    selectedStates.value.push(state)
  }
}

const removeState = (state) => {
  selectedStates.value = selectedStates.value.filter(s => s !== state)
}

// Save API
const saveCoverage = async () => {
  if (!selectedStates.value.length) {
    error.value = 'Select at least one state'
    return
  }

  loading.value = true
  error.value = ''
  success.value = ''

  try {
    await axios.post('/api/coverage', {
      states: selectedStates.value,
      ...form.value
    })
    success.value = 'Saved successfully!'
  } catch (e) {
    error.value = 'Failed to save'
  } finally {
    loading.value = false
  }
}
</script>