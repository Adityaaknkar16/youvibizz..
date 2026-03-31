<template>
  <div style="display: contents">
    <div class="phone-notch" style="display: none !important"><div class="notch-speaker"></div><div class="notch-camera"></div></div>
    <div class="status-bar" style="display: none !important">
      <span class="status-time">9:41</span>
      <div class="status-icons">
        <svg viewBox="0 0 24 24" fill="white"><rect x="1" y="15" width="4" height="6" rx="1"/><rect x="7" y="11" width="4" height="10" rx="1"/><rect x="13" y="7" width="4" height="14" rx="1"/><rect x="19" y="3" width="4" height="18" rx="1" opacity=".3"/></svg>
        <div class="battery-icon"><div class="battery-body"><div class="battery-fill"></div></div></div>
      </div>
    </div>

    <div style="display: contents; height: 100%;">
      <div class="page-content">

        <!-- Topbar -->
        <div class="topbar">
          <a href="#" @click.prevent="$router.back()" class="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </a>
          <span class="topbar-title">Membership Plan</span>
          <div></div>
        </div>

        <!-- Hero -->
        <div class="hero" style="padding-bottom:46px;">
          <div class="hero-inner">
            <div class="badge"><span class="badge-dot"></span> Subscription</div>
            <h1 class="hero-title">Your <span class="accent">Plan</span></h1>
            <p class="hero-sub">Upgrade to unlock more visibility and business features.</p>
          </div>
        </div>

        <div class="sheet" style="padding:20px;padding-bottom:100px;">

          <!-- ── Current Plan Card ── -->
          <div class="current-plan">
            <div class="plan-badge">⭐ Current Plan</div>
            <div class="plan-name">{{ currentPlan.name }}</div>
            <div class="plan-expiry">{{ currentPlan.expiry }}</div>
            <div class="plan-features">
              <span v-for="feat in currentPlan.features" :key="feat" class="plan-feat">{{ feat }}</span>
            </div>
          </div>

          <!-- ── Usage ── -->
          <div class="card" style="margin-bottom:14px;">
            <p class="sec-label" style="margin-bottom:10px;">This Month's Usage</p>
            <div v-for="usage in usageItems" :key="usage.label" class="usage-bar-wrap" style="margin-top:10px;">
              <div class="usage-bar-label">
                <span>{{ usage.label }}</span>
                <span>{{ usage.display }}</span>
              </div>
              <div class="usage-bar">
                <div class="usage-fill" :style="{ width: usage.percent + '%', background: usage.color || 'var(--teal)' }"></div>
              </div>
            </div>
          </div>

          <!-- ── Upgrade Plans ── -->
          <p class="sec-label" style="margin-bottom:12px;">Upgrade Your Plan</p>

          <div
            v-for="plan in upgradePlans"
            :key="plan.id"
            class="upgrade-card"
            :class="{ popular: plan.popular }"
          >
            <span v-if="plan.popular" class="popular-badge">🔥 Most Popular</span>
            <div class="plan-title">{{ plan.name }}</div>
            <div class="plan-price">{{ plan.price }} <span>/ month</span></div>
            <ul class="plan-feature-list">
              <li
                v-for="feat in plan.features"
                :key="feat.text"
                :class="{ no: !feat.included }"
              >{{ feat.text }}</li>
            </ul>
            <button
              class="choose-btn"
              :class="plan.popular ? 'btn btn-teal' : 'btn btn-outline'"
              :disabled="choosingPlan"
              @click="choosePlan(plan)"
            >{{ choosingPlan && choosingPlanId === plan.id ? 'Processing...' : plan.cta }}</button>
          </div>

          <!-- ── Payment History ── -->
          <div class="card" style="margin-top:14px;">
            <p class="sec-label" style="margin-bottom:10px;">Payment History</p>
            <div v-if="paymentHistory.length === 0" style="padding:20px 0;text-align:center;">
              <p style="font-size:12px;color:var(--muted);">No payments made yet. You're on the free plan.</p>
            </div>
            <div v-else>
              <div
                v-for="h in paymentHistory"
                :key="h.id"
                class="history-item"
              >
                <div>
                  <div style="font-size:13px;font-weight:700;color:var(--navy);">{{ h.plan }} Plan</div>
                  <div style="font-size:11px;color:var(--muted);">{{ formatDate(h.date) }} &bull; {{ h.method }}</div>
                </div>
                <div style="text-align:right;">
                  <div style="font-size:14px;font-weight:700;color:var(--teal);">₹{{ Number(h.amount).toLocaleString() }}</div>
                  <span class="pill pill-green" style="font-size:10px;">{{ h.status }}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div><!-- /app -->

      <!-- Bottom Nav -->
      <nav class="bottom-nav">
        <a href="/manufacturer/dashboard" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home
        </a>
        <a href="/manufacturer/products" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>Products
        </a>
        <a href="/manufacturer/messages" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Messages
        </a>
        <a href="/payments" class="nav-item active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>Payments
        </a>
        <a href="/manufacturer/profile" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile
        </a>
      </nav>

      <div class="toast" :class="{ show: toastVisible }">{{ toastMessage }}</div>
    </div><!-- /phone-screen -->
  </div><!-- /phone-frame -->
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

// ── Storage keys (matching original HTML) ─────────────────────
const KEY      = 'membership'
const HIST_KEY = 'membership_payments'

// ── Plan feature map (matching original choosePlan logic) ─────
const PLAN_FEATURES = {
  Basic:        ['25 Products', '50 Enquiries/mo', 'Featured Badge'],
  Professional: ['100 Products', 'Unlimited Enquiries', 'Priority Search'],
  Enterprise:   ['Unlimited Products', 'Dedicated Manager', 'Top Placement']
}

// ── Current plan state ────────────────────────────────────────
const currentPlan = reactive({
  name:     'Free Plan',
  expiry:   'No expiry — Limited features',
  features: ['5 Products', 'Basic Profile', '10 Enquiries/mo']
})

// ── Usage bars (static, matching HTML) ───────────────────────
const usageItems = [
  { label: 'Products',      display: '3 / 5',   percent: 60,  color: 'var(--teal)' },
  { label: 'Enquiries',     display: '7 / 10',  percent: 70,  color: 'var(--teal)' },
  { label: 'Profile Views', display: '48 / ∞',  percent: 100, color: '#9ca3af'     }
]

// ── Upgrade plan definitions ──────────────────────────────────
const upgradePlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: '₹999',
    rawPrice: '999',
    popular: false,
    cta: 'Choose Basic',
    features: [
      { text: '25 Product Listings',        included: true  },
      { text: '50 Enquiries / month',        included: true  },
      { text: 'Featured Profile Badge',      included: true  },
      { text: 'WhatsApp Business Button',    included: true  },
      { text: 'Priority Placement',          included: false },
      { text: 'Affiliate Program',           included: false }
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '₹2,499',
    rawPrice: '2499',
    popular: true,
    cta: 'Choose Professional',
    features: [
      { text: '100 Product Listings',        included: true },
      { text: 'Unlimited Enquiries',         included: true },
      { text: 'Featured Profile Badge',      included: true },
      { text: 'WhatsApp Business Button',    included: true },
      { text: 'Priority Placement in Search',included: true },
      { text: 'Affiliate Program Access',    included: true }
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '₹4,999',
    rawPrice: '4999',
    popular: false,
    cta: 'Choose Enterprise',
    features: [
      { text: 'Unlimited Product Listings',  included: true },
      { text: 'Unlimited Enquiries',         included: true },
      { text: 'Dedicated Account Manager',   included: true },
      { text: 'Custom Brand Page',           included: true },
      { text: 'Top Placement Guarantee',     included: true },
      { text: 'Full Affiliate + COD Program',included: true }
    ]
  }
]

// ── Payment history ───────────────────────────────────────────
const paymentHistory = ref([])

// ── Loading state for choose button ──────────────────────────
const choosingPlan   = ref(false)
const choosingPlanId = ref(null)

// ── Toast ─────────────────────────────────────────────────────
const toastMessage = ref('')
const toastVisible = ref(false)
let toastTimer = null

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastVisible.value = false }, 2500)
}

// ── Helpers ───────────────────────────────────────────────────
function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function getData(key) {
  try { return JSON.parse(localStorage.getItem(key)) } catch { return null }
}
function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
function nextId(arr) {
  return arr.length ? Math.max(...arr.map(i => i.id)) + 1 : 1
}

// ── Load saved plan from localStorage ────────────────────────
function loadPlan() {
  const saved = getData(KEY)
  if (saved) {
    currentPlan.name     = saved.name + ' Plan'
    currentPlan.expiry   = 'Expires: ' + formatDate(saved.expiry)
    currentPlan.features = PLAN_FEATURES[saved.name] || []
  }
}

// ── Load payment history from localStorage ────────────────────
function loadHistory() {
  paymentHistory.value = getData(HIST_KEY) || []
}

// ── Choose plan (matches original confirm → save → refresh) ───
async function choosePlan(plan) {
  const confirmed = window.confirm(
    `Upgrade to ${plan.name} Plan for ₹${plan.rawPrice}/month?\n\n(This is a demo — no real payment will be made.)`
  )
  if (!confirmed) return

  choosingPlan.value   = true
  choosingPlanId.value = plan.id

  try {
    // Replace with real Axios call, e.g.:
    // await axios.post('/api/membership/upgrade', { plan: plan.name, price: plan.rawPrice })
    await new Promise(resolve => setTimeout(resolve, 600))

    // Save plan to localStorage
    const expiry = new Date()
    expiry.setMonth(expiry.getMonth() + 1)
    setData(KEY, { name: plan.name, price: plan.rawPrice, expiry: expiry.toISOString() })

    // Save payment history entry
    const hist = getData(HIST_KEY) || []
    hist.unshift({
      id:     nextId(hist),
      plan:   plan.name,
      amount: plan.rawPrice,
      method: 'Card',
      status: 'paid',
      date:   new Date().toISOString()
    })
    setData(HIST_KEY, hist)

    // Refresh reactive state
    loadPlan()
    loadHistory()

    showToast(`Upgraded to ${plan.name} Plan! 🎉`)
  } catch (err) {
    showToast(err.response?.data?.message || 'Failed to upgrade plan.')
  } finally {
    choosingPlan.value   = false
    choosingPlanId.value = null
  }
}

// ── Init ──────────────────────────────────────────────────────
onMounted(() => {
  loadPlan()
  loadHistory()
})
</script>

<style scoped>
/* ── Current plan gradient card ─────────────────────────────── */
.current-plan {
  background: linear-gradient(135deg, var(--teal), var(--teal2));
  border-radius: var(--radius-lg);
  padding: 20px;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
}
.current-plan::after {
  content: '';
  position: absolute;
  top: -30px;
  right: -30px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  pointer-events: none;
}
.plan-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
}
.plan-name {
  font-size: 22px;
  font-weight: 900;
  color: #fff;
  font-family: 'Barlow', sans-serif;
  margin-bottom: 4px;
}
.plan-expiry {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}
.plan-features {
  display: flex;
  gap: 12px;
  margin-top: 12px;
  flex-wrap: wrap;
}
.plan-feat {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
}

/* ── Usage bars ──────────────────────────────────────────────── */
.usage-bar-wrap { margin-top: 12px; }
.usage-bar-label {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--muted);
  margin-bottom: 4px;
}
.usage-bar {
  height: 6px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}
.usage-fill {
  height: 100%;
  background: var(--teal);
  border-radius: 4px;
  transition: width 0.5s ease;
}

/* ── Upgrade plan cards ──────────────────────────────────────── */
.upgrade-card {
  background: var(--card);
  border-radius: var(--radius);
  padding: 16px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 10px;
  border: 2px solid var(--border);
  transition: var(--transition);
  cursor: pointer;
}
.upgrade-card:hover,
.upgrade-card.popular {
  border-color: var(--teal);
}
.upgrade-card.popular {
  background: rgba(34, 162, 138, 0.04);
}
.popular-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--teal);
  color: #fff;
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 10px;
  font-weight: 700;
  margin-bottom: 8px;
}
.plan-title {
  font-size: 16px;
  font-weight: 800;
  color: var(--navy);
  font-family: 'Barlow', sans-serif;
}
.plan-price {
  font-size: 24px;
  font-weight: 900;
  color: var(--teal);
  font-family: 'Barlow', sans-serif;
  margin: 6px 0;
}
.plan-price span {
  font-size: 14px;
  color: var(--muted);
  font-weight: 400;
}

/* ── Plan feature list ───────────────────────────────────────── */
.plan-feature-list {
  list-style: none;
  padding: 0;
  margin: 10px 0;
}
.plan-feature-list li {
  font-size: 12px;
  color: var(--text);
  padding: 4px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}
.plan-feature-list li::before {
  content: '✓';
  color: var(--teal);
  font-weight: 700;
  font-size: 13px;
}
.plan-feature-list li.no::before {
  content: '✕';
  color: #9ca3af;
}
.plan-feature-list li.no {
  color: #9ca3af;
}

/* ── Choose button ───────────────────────────────────────────── */
.choose-btn {
  width: 100%;
  height: 42px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 700;
  margin-top: 10px;
}
.choose-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

/* ── Payment history ─────────────────────────────────────────── */
.history-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}
.history-item:last-child {
  border-bottom: none;
}
</style>