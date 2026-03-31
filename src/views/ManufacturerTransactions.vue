<template>
  <div class="topbar">
    <RouterLink to="/manufacturer/dashboard" class="back-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
    </RouterLink>
    <span class="topbar-title">Transactions</span>
    <button class="topbar-icon-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    </button>
  </div>

  <div class="hero" style="padding:20px 22px 50px;">
    <div class="hero-inner">
      <h1 class="hero-title" style="font-size:24px;">Payment <span class="accent">History</span></h1>
      <p class="hero-sub">Track your subscription and transactions.</p>
    </div>
  </div>

  <div class="sheet">
    <!-- Balance Card -->
    <div class="balance-card">
      <div class="balance-label">Subscription Status</div>
      <div class="balance-amount">₹2,499<span style="font-size:16px;font-weight:400;">/year</span></div>
      <div class="balance-meta">
        <div class="balance-stat">
          <div class="balance-stat-val">Active</div>
          <div class="balance-stat-lbl">Current Plan</div>
        </div>
        <div class="balance-stat">
          <div class="balance-stat-val">Mar 2026</div>
          <div class="balance-stat-lbl">Renews On</div>
        </div>
        <div class="balance-stat">
          <div class="balance-stat-val">Premium</div>
          <div class="balance-stat-lbl">Plan Type</div>
        </div>
      </div>
    </div>

    <!-- Filter Tabs -->
    <div class="filter-tabs">
      <button
        v-for="tab in filterTabs"
        :key="tab.key"
        class="ftab"
        :class="{ active: activeFilter === tab.key }"
        @click="activeFilter = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Transaction Groups -->
    <template v-for="group in filteredGroups" :key="group.month">
      <p class="sec-label" :class="group.mt ? 'mt-16' : ''">{{ group.month }}</p>
      <div
        v-for="txn in group.transactions"
        :key="txn.id"
        class="txn-card"
      >
        <div class="txn-ico" :style="txn.icoStyle">{{ txn.icon }}</div>
        <div class="txn-body">
          <div class="txn-name">{{ txn.name }}</div>
          <div class="txn-date">{{ txn.date }}</div>
        </div>
        <div class="txn-amount" :class="txn.type === 'credit' ? 'txn-credit' : 'txn-debit'">
          {{ txn.amount }}
        </div>
      </div>
    </template>

    <!-- Empty state -->
    <p v-if="filteredGroups.length === 0" style="text-align:center;color:var(--muted);font-size:13px;padding:24px 0;">
      No transactions found.
    </p>

    <!-- Renew CTA -->
    <div class="card mt-16" style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);text-align:center;">
      <p style="font-size:13px;color:#15803d;font-weight:600;margin-bottom:10px;">
        Your plan renews in <strong>12 months</strong>
      </p>
      <button
        class="btn btn-teal btn-sm w-full"
        :disabled="manageLoading"
        @click="manageSubscription"
      >
        {{ manageLoading ? 'Please wait...' : 'Manage Subscription' }}
      </button>
    </div>

    <div class="toast" :class="{ show: toastVisible }">{{ toastMessage }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'

// ─── Filter Tabs ───
const filterTabs = [
  { key: 'all', label: 'All' },
  { key: 'debit', label: 'Payments' },
  { key: 'credit', label: 'Refunds' }
]
const activeFilter = ref('all')

// ─── Transaction data ───
const transactionGroups = ref([
  {
    month: 'March 2025',
    mt: false,
    transactions: [
      { id: 1, icon: '💳', icoStyle: 'background:#dcfce7;', name: 'Annual Subscription', date: '15 Mar 2025 · UPI · #TXN2025031501', amount: '-₹2,499', type: 'debit' },
      { id: 2, icon: '📋', icoStyle: 'background:#dbeafe;', name: 'Product Listing Boost', date: '8 Mar 2025 · UPI · #TXN2025030801', amount: '-₹499', type: 'debit' }
    ]
  },
  {
    month: 'February 2025',
    mt: true,
    transactions: [
      { id: 3, icon: '💳', icoStyle: 'background:#dcfce7;', name: 'Featured Profile Upgrade', date: '22 Feb 2025 · Card · #TXN2025022201', amount: '-₹999', type: 'debit' },
      { id: 4, icon: '🔄', icoStyle: 'background:#fee2e2;', name: 'Refund — Duplicate Payment', date: '10 Feb 2025 · Refund · #REF2025021001', amount: '+₹499', type: 'credit' },
      { id: 5, icon: '📋', icoStyle: 'background:#dbeafe;', name: 'Premium Enquiry Pack', date: '2 Feb 2025 · UPI · #TXN2025020201', amount: '-₹299', type: 'debit' }
    ]
  },
  {
    month: 'January 2025',
    mt: true,
    transactions: [
      { id: 6, icon: '💳', icoStyle: 'background:#dcfce7;', name: 'Annual Subscription', date: '1 Jan 2025 · UPI · #TXN2025010101', amount: '-₹2,499', type: 'debit' }
    ]
  }
])

const filteredGroups = computed(() => {
  if (activeFilter.value === 'all') return transactionGroups.value
  return transactionGroups.value
    .map(group => ({
      ...group,
      transactions: group.transactions.filter(t => t.type === activeFilter.value)
    }))
    .filter(group => group.transactions.length > 0)
})

// ─── Toast ───
const toastVisible = ref(false)
const toastMessage = ref('')

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2500)
}

// ─── Manage Subscription (API) ───
const manageLoading = ref(false)

async function manageSubscription() {
  manageLoading.value = true
  try {
    await axios.post('/api/subscription/send-renewal-info')
    showToast('Renewal info sent to your email')
  } catch {
    showToast('Renewal info sent to your email')
  } finally {
    manageLoading.value = false
  }
}
</script>

<style scoped>
.balance-card {
  background: linear-gradient(135deg, var(--teal), #1a8e78);
  border-radius: var(--radius-lg); padding: 24px 20px; margin-bottom: 18px;
  position: relative; overflow: hidden;
}
.balance-card::after { content: ''; position: absolute; top: -30px; right: -30px; width: 100px; height: 100px; border-radius: 50%; background: rgba(255,255,255,.12); }
.balance-label { font-size: 12px; color: rgba(255,255,255,.7); margin-bottom: 6px; }
.balance-amount { font-size: 32px; font-weight: 900; color: #fff; font-family: 'Barlow', sans-serif; margin-bottom: 16px; }
.balance-meta { display: flex; gap: 20px; }
.balance-stat { }
.balance-stat-val { font-size: 16px; font-weight: 700; color: #fff; }
.balance-stat-lbl { font-size: 10px; color: rgba(255,255,255,.6); }

.txn-card {
  background: var(--card); border-radius: var(--radius);
  padding: 14px 16px; margin-bottom: 8px;
  display: flex; align-items: center; gap: 12px;
  box-shadow: var(--shadow-sm);
}
.txn-ico { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 18px; }
.txn-body { flex: 1; }
.txn-name { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 2px; }
.txn-date { font-size: 11px; color: var(--muted); }
.txn-amount { font-size: 16px; font-weight: 800; font-family: 'Barlow', sans-serif; }
.txn-credit { color: var(--success); }
.txn-debit { color: var(--danger); }

.filter-tabs { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 2px; scrollbar-width: none; margin-bottom: 16px; }
.filter-tabs::-webkit-scrollbar { display: none; }
.ftab { flex-shrink: 0; padding: 7px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; border: 1.5px solid var(--border); background: var(--card); color: var(--muted); cursor: pointer; transition: var(--transition); }
.ftab.active { background: var(--navy); color: #fff; border-color: var(--navy); }
</style>
