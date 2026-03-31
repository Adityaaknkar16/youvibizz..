<template>
  <div class="topbar">
    <RouterLink to="/manufacturer/dashboard" class="back-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
    </RouterLink>
    <span class="topbar-title">Payments</span>
    <div style="width:36px;"></div>
  </div>

  <div class="hero" style="padding-bottom:46px;">
    <div class="hero-inner">
      <div class="badge"><span class="badge-dot"></span> Finance</div>
      <h1 class="hero-title">Payment <span class="accent">History</span></h1>
      <p class="hero-sub">Track all membership and promotion payment transactions.</p>
    </div>
  </div>

  <div class="sheet" style="padding:20px;padding-bottom:100px;">

    <!-- Summary -->
    <div class="pay-summary">
      <div class="pay-stat">
        <div class="pay-stat-val">₹{{ totalPaid.toLocaleString() }}</div>
        <div class="pay-stat-lbl">Total Paid</div>
      </div>
      <div class="pay-stat">
        <div class="pay-stat-val">{{ totalTransactions }}</div>
        <div class="pay-stat-lbl">Transactions</div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tab-bar">
      <button class="tab-btn" :class="{ active: activeTab === 'membership' }" @click="activeTab = 'membership'">Membership</button>
      <button class="tab-btn" :class="{ active: activeTab === 'promotion' }" @click="activeTab = 'promotion'">Promotions</button>
    </div>

    <div v-if="loading" style="text-align:center;padding:20px;color:var(--muted);">Loading payments...</div>
    <div v-else-if="error" style="text-align:center;padding:20px;color:var(--danger);">{{ error }}</div>

    <!-- Membership Tab -->
    <div v-show="activeTab === 'membership' && !loading && !error">
      <div v-if="membershipData.length === 0" class="empty-state">
        <div class="e-ico">📋</div>
        <p>No membership payments yet.<br><a href="/pages/tanaya/membership-plan" style="color:var(--teal);font-weight:700;">Choose a plan →</a></p>
      </div>
      <div v-else v-for="tx in membershipData" :key="tx.id" class="pay-card">
        <div class="pay-card-top">
          <div>
            <div class="pay-id">{{ tx.payment_id }}</div>
            <div class="pay-plan">{{ tx.plan }} Plan</div>
            <div class="pay-method">{{ methodIcon(tx.method) }} {{ tx.method }}</div>
          </div>
          <div style="text-align:right;">
            <div class="pay-amount">₹{{ tx.amount.toLocaleString() }}</div>
            <div class="pay-date">{{ formatDate(tx.date) }}</div>
          </div>
        </div>
        <span class="pill" :class="statusPillClass(tx.status)">{{ statusLabel(tx.status) }}</span>
        <div v-if="tx.status === 'pending_payment'" class="bank-alert">
          ⚠️ Payment pending. Please report your bank transfer to confirm.
        </div>
        <div class="pay-actions">
          <button class="btn btn-outline btn-xs" @click="showToast('Invoice download coming soon', 'info')">🧾 Invoice</button>
        </div>
      </div>
    </div>

    <!-- Promotion Tab -->
    <div v-show="activeTab === 'promotion' && !loading && !error">
      <div v-if="promoData.length === 0" class="empty-state">
        <div class="e-ico">📣</div>
        <p>No promotion payments yet.</p>
      </div>
      <div v-else v-for="tx in promoData" :key="tx.id" class="pay-card">
        <div class="pay-card-top">
          <div>
            <div class="pay-id">{{ tx.payment_id }}</div>
            <div class="pay-plan">{{ tx.plan }}</div>
            <div style="font-size:12px;color:var(--muted);margin-top:2px;">📦 {{ tx.product }}</div>
            <div class="pay-method">{{ methodIcon(tx.method) }} {{ tx.method }}</div>
          </div>
          <div style="text-align:right;">
            <div class="pay-amount">₹{{ tx.amount.toLocaleString() }}</div>
            <div class="pay-date">{{ formatDate(tx.date) }}</div>
          </div>
        </div>
        <span class="pill" :class="statusPillClass(tx.status)">{{ statusLabel(tx.status) }}</span>
        <div v-if="tx.status === 'pending_payment'" class="bank-alert">
          ⚠️ Bank transfer pending review. Our team will verify within 24 hours.
        </div>
        <div class="pay-actions">
          <button class="btn btn-outline btn-xs" @click="showToast('Invoice download coming soon', 'info')">🧾 Invoice</button>
        </div>
      </div>
    </div>
  </div>

  

  <div class="toast" :class="{ show: toastVisible }">{{ toastMessage }}</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'

// ── State ──
const loading = ref(false)
const error = ref('')
const toastMessage = ref('')
const toastVisible = ref(false)
const activeTab = ref('membership')

const membershipData = ref([
  { id: 1, payment_id: 'PAY_MEM_001', method: 'Card', plan: 'Professional', amount: 2499, currency: 'INR', status: 'paid', date: new Date(Date.now() - 86400000 * 30).toISOString() },
  { id: 2, payment_id: 'PAY_MEM_002', method: 'UPI', plan: 'Basic', amount: 999, currency: 'INR', status: 'paid', date: new Date(Date.now() - 86400000 * 60).toISOString() }
])

const promoData = ref([
  { id: 1, payment_id: 'PAY_PRO_001', method: 'UPI', product: 'Gurjan Face Ply 18mm', amount: 499, currency: 'INR', status: 'paid', plan: 'Featured Listing - 30 days', date: new Date(Date.now() - 86400000 * 10).toISOString() },
  { id: 2, payment_id: 'PAY_PRO_002', method: 'bank_transfer', product: 'Marine Grade Plywood', amount: 299, currency: 'INR', status: 'pending_payment', plan: 'Spotlight - 7 days', date: new Date(Date.now() - 86400000 * 2).toISOString() }
])

// ── Computed ──
const totalPaid = computed(() =>
  [...membershipData.value, ...promoData.value]
    .filter(t => t.status === 'paid')
    .reduce((s, t) => s + t.amount, 0)
)

const totalTransactions = computed(() => membershipData.value.length + promoData.value.length)

// ── Helpers ──
const METHOD_ICONS = { Card: '💳', UPI: '📱', NetBanking: '🏦', bank_transfer: '🏦', razorpay: '💳', paypal: '🅿️' }
const STATUS_PILL = { paid: 'pill-green', pending_payment: 'pill-yellow', failed: 'pill-red' }
const STATUS_LABEL = { paid: 'Paid', pending_payment: 'Pending', failed: 'Failed' }

function methodIcon(method) { return METHOD_ICONS[method] || '💳' }
function statusPillClass(status) { return STATUS_PILL[status] || 'pill-gray' }
function statusLabel(status) { return STATUS_LABEL[status] || status }

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2500)
}

// ── API: Fetch payment history ──
async function fetchPayments() {
  try {
    loading.value = true
    const [memRes, promoRes] = await Promise.all([
      axios.get('/api/payments/membership'),
      axios.get('/api/payments/promotions')
    ])
    membershipData.value = memRes.data
    promoData.value = promoRes.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load payment history'
  } finally {
    loading.value = false
  }
}

fetchPayments()
</script>

<style scoped>
.pay-summary { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; }
.pay-stat { background: var(--card); border-radius: var(--radius); padding: 14px; box-shadow: var(--shadow-sm); }
.pay-stat-val { font-size: 22px; font-weight: 900; font-family: 'Barlow', sans-serif; color: var(--teal); }
.pay-stat-lbl { font-size: 11px; color: var(--muted); margin-top: 3px; }
.tab-bar { display: flex; background: #f1f5f9; border-radius: 12px; padding: 4px; margin-bottom: 14px; }
.tab-btn { flex: 1; padding: 8px; border-radius: 9px; font-size: 12px; font-weight: 700; color: var(--muted); background: transparent; transition: var(--transition); text-align: center; border: none; cursor: pointer; }
.tab-btn.active { background: #fff; color: var(--navy); box-shadow: var(--shadow-sm); }
.tab-panel { display: none; }
.tab-panel.active { display: block; }
.pay-card { background: var(--card); border-radius: var(--radius-sm); padding: 14px; box-shadow: var(--shadow-sm); margin-bottom: 10px; }
.pay-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 8px; }
.pay-id { font-size: 11px; font-weight: 700; color: var(--muted); font-family: monospace; }
.pay-method { font-size: 12px; font-weight: 600; color: var(--navy); }
.pay-plan { font-size: 13px; font-weight: 700; color: var(--navy); margin-bottom: 4px; }
.pay-amount { font-size: 18px; font-weight: 900; color: var(--teal); font-family: 'Barlow', sans-serif; }
.pay-date { font-size: 11px; color: var(--muted); }
.pay-actions { display: flex; gap: 6px; margin-top: 10px; }
.method-ico { display: inline-flex; align-items: center; gap: 4px; }
.empty-state { text-align: center; padding: 30px 20px; }
.empty-state .e-ico { font-size: 36px; margin-bottom: 10px; }
.empty-state p { font-size: 12px; color: var(--muted); }
.bank-alert { background: #fef3c7; border-radius: var(--radius-sm); padding: 10px 12px; border-left: 3px solid #f59e0b; margin-top: 8px; font-size: 12px; color: #92400e; }
</style>
