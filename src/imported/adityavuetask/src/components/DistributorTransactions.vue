<template>
  <div style="display: contents">
    <div class="phone-notch" style="display: none !important"><div class="notch-speaker"></div><div class="notch-camera"></div></div>
    <div class="status-bar" style="display: none !important">
      <span class="status-time">{{ currentTime }}</span>
      <div class="status-icons">
        <svg viewBox="0 0 24 24" fill="white"><rect x="1" y="15" width="4" height="6" rx="1"/><rect x="7" y="11" width="4" height="10" rx="1"/><rect x="13" y="7" width="4" height="14" rx="1"/><rect x="19" y="3" width="4" height="18" rx="1" opacity=".3"/></svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill="white" stroke="none"/></svg>
        <div class="battery-icon"><div class="battery-body"><div class="battery-fill"></div></div></div>
      </div>
    </div>
    <div style="display: contents; height: 100%;">
      <div class="page-content">
        <div class="topbar">
          <button @click="router.back()" class="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <span class="topbar-title">Transactions</span>
          <button class="topbar-icon-btn" @click="handleDownload">
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
            <div class="balance-amount">{{ subscription.cost }}<span style="font-size:16px;font-weight:400;">/year</span></div>
            <div class="balance-meta">
              <div class="balance-stat">
                <div class="balance-stat-val">{{ subscription.status }}</div>
                <div class="balance-stat-lbl">Current Plan</div>
              </div>
              <div class="balance-stat">
                <div class="balance-stat-val">{{ subscription.renewsOn }}</div>
                <div class="balance-stat-lbl">Renews On</div>
              </div>
              <div class="balance-stat">
                <div class="balance-stat-val">{{ subscription.planType }}</div>
                <div class="balance-stat-lbl">Plan Type</div>
              </div>
            </div>
          </div>

          <!-- Filter -->
          <div class="filter-tabs">
            <button 
              v-for="f in filterOptions" 
              :key="f"
              class="ftab" 
              :class="{ active: activeFilter === f }"
              @click="activeFilter = f"
            >
              {{ f }}
            </button>
          </div>

          <!-- Transaction Groups -->
          <div v-for="(txns, month) in groupedTransactions" :key="month">
            <p class="sec-label mt-16">{{ month }}</p>

            <div v-for="t in txns" :key="t.id" class="txn-card">
              <div class="txn-ico" :style="{ background: t.iconBg }">{{ t.icon }}</div>
              <div class="txn-body">
                <div class="txn-name">{{ t.name }}</div>
                <div class="txn-date">{{ t.date }} · {{ t.method }} · #{{ t.id }}</div>
              </div>
              <div class="txn-amount" :class="t.type === 'debit' ? 'txn-debit' : 'txn-credit'">
                {{ t.type === 'debit' ? '-' : '+' }}{{ t.amount }}
              </div>
            </div>
          </div>

          <!-- Renew CTA -->
          <div class="card mt-16" style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);text-align:center;">
            <p style="font-size:13px;color:#15803d;font-weight:600;margin-bottom:10px;">Your plan renews in <strong>{{ subscription.monthsLeft }} months</strong></p>
            <button class="btn btn-teal btn-sm w-full" @click="showToast('Renewal info sent to your email')">Manage Subscription</button>
          </div>
        </div>
      </div>

      <nav class="bottom-nav">
        <router-link to="/distributor-dashboard" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home
        </router-link>
        <router-link to="/distributor-products" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>Products
        </router-link>
        <router-link to="/distributor-messages" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Messages
        </router-link>
        <router-link to="/distributor-transactions" class="nav-item active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>Payments
        </router-link>
        <router-link to="/distributor-profile" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile
        </router-link>
      </nav>

      <div class="toast" v-if="toast.show">{{ toast.message }}</div>
    </div>
  </div>
</template>

<script setup>
import '../utils/dashboard-shared.js';
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('9:41');
const filterOptions = ['All', 'Payments', 'Refunds'];
const activeFilter = ref('All');

const subscription = reactive({
  cost: '₹2,499',
  status: 'Active',
  renewsOn: 'Mar 2026',
  planType: 'Premium',
  monthsLeft: 12
});

const transactions = ref([
  { id: 'TXN2025031501', month: 'March 2025', name: 'Annual Subscription', date: '15 Mar 2025', method: 'UPI', amount: '2,499', type: 'debit', icon: '💳', iconBg: '#dcfce7', category: 'Payments' },
  { id: 'TXN2025030801', month: 'March 2025', name: 'Product Listing Boost', date: '8 Mar 2025', method: 'UPI', amount: '499', type: 'debit', icon: '📋', iconBg: '#dbeafe', category: 'Payments' },
  { id: 'TXN2025022201', month: 'February 2025', name: 'Featured Profile Upgrade', date: '22 Feb 2025', method: 'Card', amount: '999', type: 'debit', icon: '💳', iconBg: '#dcfce7', category: 'Payments' },
  { id: 'REF2025021001', month: 'February 2025', name: 'Refund — Duplicate Payment', date: '10 Feb 2025', method: 'Refund', amount: '499', type: 'credit', icon: '🔄', iconBg: '#fee2e2', category: 'Refunds' },
  { id: 'TXN2025020201', month: 'February 2025', name: 'Premium Enquiry Pack', date: '2 Feb 2025', method: 'UPI', amount: '299', type: 'debit', icon: '📋', iconBg: '#dbeafe', category: 'Payments' },
  { id: 'TXN2025010101', month: 'January 2025', name: 'Annual Subscription', date: '1 Jan 2025', method: 'UPI', amount: '2,499', type: 'debit', icon: '💳', iconBg: '#dcfce7', category: 'Payments' }
]);

const groupedTransactions = computed(() => {
  const filtered = transactions.value.filter(t => 
    activeFilter.value === 'All' || t.category === activeFilter.value
  );
  
  return filtered.reduce((groups, txn) => {
    if (!groups[txn.month]) groups[txn.month] = [];
    groups[txn.month].push(txn);
    return groups;
  }, {});
});

const toast = reactive({ show: false, message: '' });

const handleDownload = () => {
  showToast('Preparing statement download...');
};

const showToast = (msg) => {
  toast.message = msg;
  toast.show = true;
  setTimeout(() => toast.show = false, 2500);
};

onMounted(() => {
  const now = new Date();
  currentTime.value = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
});
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
