<template>
<div style="display: contents">
  <div class="phone-notch" style="display: none !important"><div class="notch-speaker"></div><div class="notch-camera"></div></div>

  <div class="status-bar" style="display: none !important">
    <span class="status-time">9:41</span>
  </div>

  <div style="display: contents; height: 100%;">
    <div class="page-content">

      <!-- Topbar -->
      <div class="topbar">
        <a href="/manufacturer/dashboard" class="back-btn">
          <svg viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </a>
        <span class="topbar-title">Payments</span>
        <div></div>
      </div>

      <!-- Hero -->
      <div class="hero">
        <div class="hero-inner">
          <div class="badge"><span class="badge-dot"></span> Finance</div>
          <h1 class="hero-title">Payment <span class="accent">History</span></h1>
          <p class="hero-sub">Track all membership and promotion payment transactions.</p>
        </div>
      </div>

      <!-- Content -->
      <div class="sheet">

        <!-- Summary -->
        <div class="pay-summary">
          <div class="pay-stat">
            <div class="pay-stat-val">₹{{ totalPaid }}</div>
            <div class="pay-stat-lbl">Total Paid</div>
          </div>
          <div class="pay-stat">
            <div class="pay-stat-val">{{ txCount }}</div>
            <div class="pay-stat-lbl">Transactions</div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="tab-bar">
          <button class="tab-btn" :class="{active: activeTab==='membership'}" @click="activeTab='membership'">Membership</button>
          <button class="tab-btn" :class="{active: activeTab==='promotion'}" @click="activeTab='promotion'">Promotions</button>
        </div>

        <!-- Membership -->
        <div class="tab-panel" :class="{active: activeTab==='membership'}">
          <div v-if="!membership.length" class="empty-state">
            <div class="e-ico">📋</div>
            <p>No membership payments yet.</p>
          </div>

          <div v-for="t in membership" :key="t.id" class="pay-card">
            <div class="pay-card-top">
              <div>
                <div class="pay-id">{{ t.payment_id }}</div>
                <div class="pay-plan">{{ t.plan }} Plan</div>
                <div class="pay-method">{{ methodIcon(t.method) }} {{ t.method }}</div>
              </div>
              <div style="text-align:right;">
                <div class="pay-amount">₹{{ t.amount }}</div>
                <div class="pay-date">{{ formatDate(t.date) }}</div>
              </div>
            </div>

            <span class="pill" :class="statusClass(t.status)">
              {{ statusLabel(t.status) }}
            </span>

            <div v-if="t.status==='pending_payment'" class="bank-alert">
              ⚠️ Payment pending. Please confirm.
            </div>

            <div class="pay-actions">
              <button class="btn btn-outline btn-xs" @click="downloadInvoice">
                🧾 Invoice
              </button>
            </div>
          </div>
        </div>

        <!-- Promotion -->
        <div class="tab-panel" :class="{active: activeTab==='promotion'}">
          <div v-if="!promotion.length" class="empty-state">
            <div class="e-ico">📣</div>
            <p>No promotion payments yet.</p>
          </div>

          <div v-for="t in promotion" :key="t.id" class="pay-card">
            <div class="pay-card-top">
              <div>
                <div class="pay-id">{{ t.payment_id }}</div>
                <div class="pay-plan">{{ t.plan }}</div>
                <div>📦 {{ t.product }}</div>
                <div class="pay-method">{{ methodIcon(t.method) }} {{ t.method }}</div>
              </div>
              <div style="text-align:right;">
                <div class="pay-amount">₹{{ t.amount }}</div>
                <div class="pay-date">{{ formatDate(t.date) }}</div>
              </div>
            </div>

            <span class="pill" :class="statusClass(t.status)">
              {{ statusLabel(t.status) }}
            </span>

            <div v-if="t.status==='pending_payment'" class="bank-alert">
              ⚠️ Bank transfer pending review.
            </div>

            <div class="pay-actions">
              <button class="btn btn-outline btn-xs" @click="downloadInvoice">
                🧾 Invoice
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import axios from "axios"

const activeTab = ref("membership")
const membership = ref([])
const promotion = ref([])
const loading = ref(false)
const error = ref("")

const METHOD_ICONS = {
  Card: "💳",
  UPI: "📱",
  NetBanking: "🏦",
  bank_transfer: "🏦",
  razorpay: "💳",
  paypal: "🅿️"
}

const STATUS_MAP = {
  paid: { label: "Paid", class: "pill-green" },
  pending_payment: { label: "Pending", class: "pill-yellow" },
  failed: { label: "Failed", class: "pill-red" }
}

const totalPaid = computed(() => {
  return membership.value.reduce((s, t) => s + t.amount, 0)
})

const txCount = computed(() => {
  return membership.value.length + promotion.value.length
})

function methodIcon(method) {
  return METHOD_ICONS[method] || "💳"
}

function statusClass(status) {
  return STATUS_MAP[status]?.class || "pill-gray"
}

function statusLabel(status) {
  return STATUS_MAP[status]?.label || status
}

function formatDate(date) {
  return new Date(date).toLocaleDateString()
}

async function fetchPayments() {
  try {
    loading.value = true

    // Example API call
    const res = await axios.get("/api/payments")

    membership.value = res.data.membership || []
    promotion.value = res.data.promotion || []

  } catch (err) {
    error.value = "Failed to load payments"
    console.error(err)
  } finally {
    loading.value = false
  }
}

async function downloadInvoice() {
  try {
    loading.value = true
    await axios.get("/api/invoice") // dummy
    alert("Invoice download coming soon")
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPayments()

  // fallback demo data (if API empty)
  membership.value = [
    { id:1, payment_id:'PAY_MEM_001', method:'Card', plan:'Professional', amount:2499, status:'paid', date:new Date() },
    { id:2, payment_id:'PAY_MEM_002', method:'UPI', plan:'Basic', amount:999, status:'paid', date:new Date() }
  ]

  promotion.value = [
    { id:1, payment_id:'PAY_PRO_001', method:'UPI', product:'Plywood', amount:499, status:'paid', plan:'Featured', date:new Date() }
  ]
})
</script>