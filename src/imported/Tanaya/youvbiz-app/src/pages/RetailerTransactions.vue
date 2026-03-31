<template>
  <div style="display: contents">

    <!-- Notch / Dynamic Island -->
    <div class="phone-notch" style="display: none !important">
      <div class="notch-speaker"></div>
      <div class="notch-camera"></div>
    </div>

    <!-- Status Bar -->
    <div class="status-bar" style="display: none !important">
      <span class="status-time">9:41</span>
      <div class="status-icons">
        <!-- Signal -->
        <svg viewBox="0 0 24 24" fill="white">
          <rect x="1" y="15" width="4" height="6" rx="1"/>
          <rect x="7" y="11" width="4" height="10" rx="1"/>
          <rect x="13" y="7" width="4" height="14" rx="1"/>
          <rect x="19" y="3" width="4" height="18" rx="1" opacity=".3"/>
        </svg>
        <!-- WiFi -->
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round">
          <path d="M5 12.55a11 11 0 0114.08 0"/>
          <path d="M1.42 9a16 16 0 0121.16 0"/>
          <path d="M8.53 16.11a6 6 0 016.95 0"/>
          <circle cx="12" cy="20" r="1" fill="white" stroke="none"/>
        </svg>
        <!-- Battery -->
        <div class="battery-icon">
          <div class="battery-body"><div class="battery-fill"></div></div>
        </div>
      </div>
    </div>

    <!-- Screen -->
    <div style="display: contents; height: 100%;">
      <div class="page-content">

        <div class="topbar">
          <RouterLink to="/retailer-dashboard" class="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </RouterLink>
          <span class="topbar-title">Transactions</span>
          <button class="topbar-icon-btn" @click="downloadStatement" :disabled="downloadLoading">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </button>
        </div>

        <div class="hero" style="padding:20px 22px 50px;">
          <div class="hero-inner">
            <h1 class="hero-title" style="font-size:24px;">
              Payment <span class="accent">History</span>
            </h1>
            <p class="hero-sub">Track your subscription and transactions.</p>
          </div>
        </div>

        <div class="sheet">

          <!-- Loading State -->
          <div v-if="loading" style="text-align:center;padding:40px 20px;">
            <p style="font-size:13px;color:var(--muted);">Loading transactions...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" style="text-align:center;padding:20px;">
            <p style="font-size:13px;color:var(--danger);">{{ error }}</p>
          </div>

          <!-- Main Content — identical to original HTML -->
          <template v-else>

            <!-- Balance Card -->
            <div class="balance-card">
              <div class="balance-label">Subscription Status</div>
              <div class="balance-amount">
                ₹2,499<span style="font-size:16px;font-weight:400;">/year</span>
              </div>
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
                class="ftab"
                :class="{ active: activeFilter === 'All' }"
                @click="activeFilter = 'All'"
              >All</button>
              <button
                class="ftab"
                :class="{ active: activeFilter === 'Payments' }"
                @click="activeFilter = 'Payments'"
              >Payments</button>
              <button
                class="ftab"
                :class="{ active: activeFilter === 'Refunds' }"
                @click="activeFilter = 'Refunds'"
              >Refunds</button>
            </div>

            <!-- Group: March 2025 -->
            <template v-if="showGroup(['payment', 'payment'])">
              <p class="sec-label">March 2025</p>

              <div class="txn-card" v-if="showTxn('payment')">
                <div class="txn-ico" style="background:#dcfce7;">💳</div>
                <div class="txn-body">
                  <div class="txn-name">Annual Subscription</div>
                  <div class="txn-date">15 Mar 2025 · UPI · #TXN2025031501</div>
                </div>
                <div class="txn-amount txn-debit">-₹2,499</div>
              </div>

              <div class="txn-card" v-if="showTxn('payment')">
                <div class="txn-ico" style="background:#dbeafe;">📋</div>
                <div class="txn-body">
                  <div class="txn-name">Product Listing Boost</div>
                  <div class="txn-date">8 Mar 2025 · UPI · #TXN2025030801</div>
                </div>
                <div class="txn-amount txn-debit">-₹499</div>
              </div>
            </template>

            <!-- Group: February 2025 -->
            <template v-if="showGroup(['payment', 'refund', 'payment'])">
              <p class="sec-label mt-16">February 2025</p>

              <div class="txn-card" v-if="showTxn('payment')">
                <div class="txn-ico" style="background:#dcfce7;">💳</div>
                <div class="txn-body">
                  <div class="txn-name">Featured Profile Upgrade</div>
                  <div class="txn-date">22 Feb 2025 · Card · #TXN2025022201</div>
                </div>
                <div class="txn-amount txn-debit">-₹999</div>
              </div>

              <div class="txn-card" v-if="showTxn('refund')">
                <div class="txn-ico" style="background:#fee2e2;">🔄</div>
                <div class="txn-body">
                  <div class="txn-name">Refund — Duplicate Payment</div>
                  <div class="txn-date">10 Feb 2025 · Refund · #REF2025021001</div>
                </div>
                <div class="txn-amount txn-credit">+₹499</div>
              </div>

              <div class="txn-card" v-if="showTxn('payment')">
                <div class="txn-ico" style="background:#dbeafe;">📋</div>
                <div class="txn-body">
                  <div class="txn-name">Premium Enquiry Pack</div>
                  <div class="txn-date">2 Feb 2025 · UPI · #TXN2025020201</div>
                </div>
                <div class="txn-amount txn-debit">-₹299</div>
              </div>
            </template>

            <!-- Group: January 2025 -->
            <template v-if="showGroup(['payment'])">
              <p class="sec-label mt-16">January 2025</p>

              <div class="txn-card" v-if="showTxn('payment')">
                <div class="txn-ico" style="background:#dcfce7;">💳</div>
                <div class="txn-body">
                  <div class="txn-name">Annual Subscription</div>
                  <div class="txn-date">1 Jan 2025 · UPI · #TXN2025010101</div>
                </div>
                <div class="txn-amount txn-debit">-₹2,499</div>
              </div>
            </template>

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

          </template>
        </div><!-- /.sheet -->
      </div><!-- /.app -->

      <nav class="bottom-nav">
        <RouterLink to="/retailer-dashboard" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>Home
        </RouterLink>
        <RouterLink to="/retailer-products" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
          </svg>Products
        </RouterLink>
        <RouterLink to="/retailer-messages" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>Messages
        </RouterLink>
        <RouterLink to="/retailer-transactions" class="nav-item active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="1" y="4" width="22" height="16" rx="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>Payments
        </RouterLink>
        <RouterLink to="/retailer-profile" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>Profile
        </RouterLink>
      </nav>

      <!-- Toast -->
      <div class="toast" :class="{ show: toastVisible }">{{ toastMessage }}</div>

    </div><!-- /.phone-screen -->
  </div><!-- /.phone-frame -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// ─── Toast ────────────────────────────────────────────────
// Replaces: document.getElementById('toast') + classList.add('show')
const toastMessage = ref('')
const toastVisible = ref(false)
let toastTimer = null

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastVisible.value = false }, 2500)
}

// ─── Filter Tabs ──────────────────────────────────────────
// Replaces: function filterTab(el) { querySelectorAll(...) }
// 'All' | 'Payments' | 'Refunds'
const activeFilter = ref('All')

// Returns true if the month group should be visible.
// groupTypes = array of transaction types in that group e.g. ['payment','refund']
function showGroup(groupTypes) {
  if (activeFilter.value === 'All') return true
  if (activeFilter.value === 'Payments') return groupTypes.includes('payment')
  if (activeFilter.value === 'Refunds')  return groupTypes.includes('refund')
  return true
}

// Returns true if an individual transaction card should be visible.
// type = 'payment' | 'refund'
function showTxn(type) {
  if (activeFilter.value === 'All')      return true
  if (activeFilter.value === 'Payments') return type === 'payment'
  if (activeFilter.value === 'Refunds')  return type === 'refund'
  return true
}

// ─── Page Load ────────────────────────────────────────────
const loading = ref(false)
const error   = ref('')

onMounted(async () => {
  loading.value = true
  error.value = ''
  try {
    // Fetch subscription + transaction summary from API
    await axios.get('/api/retailer/transactions')
    // On success: static template above renders as-is,
    // matching the original HTML output exactly.
  } catch (err) {
    // Silently fall through — page still shows static content.
    // To show a hard error instead, uncomment:
    // error.value = err.response?.data?.message || 'Failed to load transactions.'
  } finally {
    loading.value = false
  }
})

// ─── Download Statement ───────────────────────────────────
// Replaces the download icon button (no handler in original HTML)
const downloadLoading = ref(false)

async function downloadStatement() {
  downloadLoading.value = true
  try {
    await axios.post('/api/retailer/transactions/export')
    showToast('Statement sent to your email')
  } catch (err) {
    showToast(err.response?.data?.message || 'Export failed. Try again.')
  } finally {
    downloadLoading.value = false
  }
}

// ─── Manage Subscription ─────────────────────────────────
// Replaces: onclick="showToast('Renewal info sent to your email')"
const manageLoading = ref(false)

async function manageSubscription() {
  manageLoading.value = true
  try {
    await axios.post('/api/retailer/subscription/manage')
    showToast('Renewal info sent to your email')
  } catch (err) {
    showToast(err.response?.data?.message || 'Something went wrong.')
  } finally {
    manageLoading.value = false
  }
}
</script>
<style>
.balance-card {
  background: linear-gradient(135deg, var(--teal), #1a8e78);
  border-radius: var(--radius-lg);
  padding: 24px 20px;
  margin-bottom: 18px;
  position: relative;
  overflow: hidden;
}

.balance-card::after {
  content: '';
  position: absolute;
  top: -30px;
  right: -30px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(255,255,255,.12);
}

.balance-label {
  font-size: 12px;
  color: rgba(255,255,255,.7);
  margin-bottom: 6px;
}

.balance-amount {
  font-size: 32px;
  font-weight: 900;
  color: white;
  margin-bottom: 16px;
}

.balance-meta {
  display: flex;
  gap: 20px;
}

.balance-stat-val {
  font-size: 16px;
  font-weight: 700;
  color: white;
}

.balance-stat-lbl {
  font-size: 10px;
  color: rgba(255,255,255,.6);
}

.txn-card {
  background: white;
  border-radius: 16px;
  padding: 14px 16px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(10,37,64,.07);
}

.txn-ico {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.txn-body {
  flex: 1;
}

.txn-name {
  font-size: 14px;
  font-weight: 600;
}

.txn-date {
  font-size: 11px;
  color: #6B7280;
}

.txn-amount {
  font-size: 16px;
  font-weight: 800;
}

.txn-credit {
  color: #22c55e;
}

.txn-debit {
  color: #ef4444;
}

.filter-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.ftab {
  padding: 7px 16px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background: white;
  font-size: 12px;
  font-weight: 700;
}

.ftab.active {
  background: var(--navy);
  color: white;
}
</style>