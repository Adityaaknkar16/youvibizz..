<template>
<div style="display: contents">
  <div class="phone-notch" style="display: none !important">
    <div class="notch-speaker"></div>
    <div class="notch-camera"></div>
  </div>

  <div class="status-bar" style="display: none !important">
    <span class="status-time">9:41</span>
    <div class="status-icons"></div>
  </div>

  <div style="display: contents; height: 100%;">
    <div class="page-content">

      <!-- Topbar -->
      <div class="topbar">
        <a href="/manufacturer/dashboard" class="back-btn">←</a>
        <span class="topbar-title">Cash on Delivery</span>
        <div></div>
      </div>

      <!-- Hero -->
      <div class="hero" style="padding-bottom:46px;">
        <div class="hero-inner">
          <div class="badge"><span class="badge-dot"></span> Payments</div>
          <h1 class="hero-title">Cash on <span class="accent">Delivery</span></h1>
          <p class="hero-sub">Manage COD orders and track commissions deducted from payments.</p>
        </div>
      </div>

      <div class="sheet" style="padding:20px;padding-bottom:100px;">

        <!-- Summary -->
        <div class="cod-summary">
          <div class="cod-stat">
            <div class="cod-stat-val green">₹{{ summary.totalAmount }}</div>
            <div class="cod-stat-lbl">Total COD Orders</div>
          </div>
          <div class="cod-stat">
            <div class="cod-stat-val orange">₹{{ summary.commission }}</div>
            <div class="cod-stat-lbl">Commissions Paid</div>
          </div>
          <div class="cod-stat">
            <div class="cod-stat-val">{{ summary.orders }}</div>
            <div class="cod-stat-lbl">COD Orders</div>
          </div>
          <div class="cod-stat">
            <div class="cod-stat-val red">{{ summary.pending }}</div>
            <div class="cod-stat-lbl">Pending COD</div>
          </div>
        </div>

        <!-- Settings -->
        <div class="card" style="margin-bottom:14px;">
          <p class="sec-label" style="margin-bottom:12px;">COD Settings</p>

          <div class="toggle-row" style="padding:0;background:none;border-radius:0;margin-bottom:12px;">
            <div>
              <div class="toggle-label">Enable Cash on Delivery</div>
              <div class="toggle-sub">Allow buyers to pay on delivery</div>
            </div>

            <label class="toggle">
              <input type="checkbox" v-model="form.enabled">
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="field">
            <label class="lbl">COD Charge (₹)</label>
            <input class="inp inp-no-ico" type="number" v-model="form.charge" />
          </div>

          <div class="field">
            <label class="lbl">Max COD Order Value (₹)</label>
            <input class="inp inp-no-ico" type="number" v-model="form.max" />
          </div>

          <button class="btn btn-teal btn-sm" :disabled="loading" @click="saveCODSettings">
            {{ loading ? 'Saving...' : 'Save COD Settings' }}
          </button>

          <p v-if="error" style="color:red;font-size:12px;">{{ error }}</p>
          <p v-if="success" style="color:green;font-size:12px;">{{ success }}</p>
        </div>

        <!-- Tabs -->
        <div class="tab-bar">
          <button class="tab-btn" :class="{active: activeTab==='all'}" @click="activeTab='all'">All</button>
          <button class="tab-btn" :class="{active: activeTab==='pending'}" @click="activeTab='pending'">Pending</button>
          <button class="tab-btn" :class="{active: activeTab==='completed'}" @click="activeTab='completed'">Completed</button>
        </div>

        <!-- Transactions -->
        <div>

          <div v-if="filteredTx.length === 0" class="empty-state">
            <div class="e-ico">📋</div>
            <p>No {{ activeTab }} transactions.</p>
          </div>

          <div v-for="t in filteredTx" :key="t.id" class="tx-item">
            <div class="tx-ico"
              :style="{
                background: t.status==='completed' ? '#dcfce7' : '#fef9c3',
                color: t.status==='completed' ? '#16a34a' : '#a16207'
              }">
              {{ t.status==='completed' ? '✅' : '⏳' }}
            </div>

            <div class="tx-body">
              <div class="tx-order">{{ t.order }}</div>
              <div class="tx-date">{{ formatDate(t.date) }}</div>
              <div style="margin-top:3px;">
                <span class="pill" :class="t.status==='completed' ? 'pill-green' : 'pill-yellow'">
                  {{ t.status }}
                </span>
              </div>
            </div>

            <div class="tx-right">
              <div class="tx-amount credit">₹{{ t.amount }}</div>
              <div style="font-size:11px;color:var(--danger);margin-top:2px;">
                -₹{{ t.commission }} commission
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import axios from 'axios'

// State
const loading = ref(false)
const error = ref('')
const success = ref('')

const activeTab = ref('all')

const form = reactive({
  enabled: true,
  charge: 50,
  max: 10000
})

const summary = reactive({
  totalAmount: 0,
  commission: 0,
  orders: 0,
  pending: 0
})

const transactions = ref([])

// Filtered list
const filteredTx = computed(() => {
  if (activeTab.value === 'all') return transactions.value
  return transactions.value.filter(t => t.status === activeTab.value)
})

// Format date
function formatDate(date) {
  return new Date(date).toLocaleDateString()
}

// Save API
async function saveCODSettings() {
  error.value = ''
  success.value = ''

  try {
    loading.value = true

    await axios.post('/api/cod-settings', {
      enabled: form.enabled,
      charge: form.charge,
      max: form.max
    })

    success.value = 'COD settings saved!'
  } catch (err) {
    error.value = 'Failed to save settings'
  } finally {
    loading.value = false
  }
}

// Fetch API
async function fetchData() {
  try {
    const res = await axios.get('/api/cod-data')

    const data = res.data

    transactions.value = data.transactions || []

    summary.totalAmount = data.totalAmount || 18420
    summary.commission = data.commission || 1842
    summary.orders = data.orders || 12
    summary.pending = data.pending || 3

    form.enabled = data.enabled ?? true
    form.charge = data.charge || 50
    form.max = data.max || 10000

  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  fetchData()
})
</script>