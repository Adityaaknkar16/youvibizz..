<template>
  <div style="display: contents">
    <div class="phone-notch" style="display: none !important"><div class="notch-speaker"></div><div class="notch-camera"></div></div>
    <div class="status-bar" style="display: none !important">
      <span class="status-time">9:41</span>
      <div class="status-icons">
        <svg viewBox="0 0 24 24" fill="white"><rect x="1" y="15" width="4" height="6" rx="1"/><rect x="7" y="11" width="4" height="10" rx="1"/><rect x="13" y="7" width="4" height="14" rx="1"/><rect x="19" y="3" width="4" height="18" rx="1" opacity=".3"/></svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill="white" stroke="none"/></svg>
        <div class="battery-icon"><div class="battery-body"><div class="battery-fill"></div></div></div>
      </div>
    </div>

    <div style="display: contents; height: 100%;">
      <div class="page-content">

        <!-- Topbar -->
        <div class="topbar">
          <a href="#" @click.prevent="$router.back()" class="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </a>
          <span class="topbar-title">Enquiries</span>
        </div>

        <!-- Hero -->
        <div class="hero" style="padding:20px 22px 50px;">
          <div class="hero-inner">
            <h1 class="hero-title" style="font-size:24px;">Buyer <span class="accent">Enquiries</span></h1>
            <p class="hero-sub">Respond to potential buyer enquiries.</p>
          </div>
        </div>

        <!-- Sheet -->
        <div class="sheet">

          <!-- Search Bar -->
          <div class="search-bar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" v-model="searchQuery" placeholder="Search enquiries..." />
          </div>

          <!-- Filter Tabs -->
          <div class="filter-tabs">
            <button
              v-for="tab in filterTabs"
              :key="tab"
              class="ftab"
              :class="{ active: activeFilter === tab }"
              @click="activeFilter = tab"
            >{{ tab }}</button>
          </div>

          <!-- Enquiry Cards -->
          <div v-for="enq in filteredEnquiries" :key="enq.id" :id="'enq' + enq.id" class="enq-card">
            <div class="enq-header">
              <div class="enq-avatar" :style="{ background: enq.avatarBg }">{{ enq.initials }}</div>
              <div>
                <div class="enq-name">{{ enq.name }}</div>
                <div class="enq-meta">📍 {{ enq.location }} · {{ enq.time }}</div>
              </div>
              <div class="enq-badge">
                <span
                  class="badge"
                  :class="enq.status === 'New' ? 'badge-success' : ''"
                  :style="enq.statusStyle"
                >{{ enq.status }}</span>
              </div>
            </div>
            <div class="enq-product">📦 {{ enq.product }}</div>
            <div class="enq-msg">{{ enq.message }}</div>
            <div class="enq-actions">
              <!-- New enquiries: View & Reply link -->
              <template v-if="enq.status === 'New'">
                <a href="/pages/task/enquiry-view" class="btn btn-teal btn-sm" style="flex:1;text-align:center;text-decoration:none;line-height:2.4;">View &amp; Reply</a>
                <button class="btn btn-outline btn-sm" @click="showToast('Marked as closed')">Close</button>
              </template>
              <!-- Replied enquiries: View Thread -->
              <template v-else-if="enq.status === 'Replied'">
                <button class="btn btn-outline btn-sm" style="flex:1;" @click="showToast('Thread opened')">View Thread</button>
                <button class="btn btn-outline btn-sm" @click="showToast('Marked as closed')">Close</button>
              </template>
              <!-- Closed enquiries: Reopen -->
              <template v-else>
                <button class="btn btn-outline btn-sm" style="flex:1;" @click="showToast('Thread opened')">View Thread</button>
                <button class="btn btn-outline btn-sm" @click="showToast('Reopened')">Reopen</button>
              </template>
            </div>
          </div>

        </div><!-- /sheet -->
      </div><!-- /app -->

      <!-- Reply Modal — position:absolute, inside phone-screen, exactly as original -->
      <div
        id="replyModal"
        :style="{
          display:      isReplyOpen ? 'block' : 'none',
          position:     'absolute',
          bottom:       '0',
          left:         '0',
          right:        '0',
          background:   'var(--card)',
          borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
          padding:      '20px',
          boxShadow:    '0 -10px 40px rgba(0,0,0,.2)',
          zIndex:       300,
        }"
      >
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
          <span style="font-size:16px;font-weight:700;">Quick Reply</span>
          <button @click="isReplyOpen = false" style="background:var(--bg);border-radius:8px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;color:var(--muted);">✕</button>
        </div>
        <textarea
          v-model="replyText"
          id="replyText"
          rows="4"
          style="width:100%;border:1.5px solid var(--border);border-radius:12px;padding:12px;font-family:Inter,sans-serif;font-size:13px;resize:none;background:var(--bg);box-sizing:border-box;"
          placeholder="Type your reply..."
        ></textarea>
        <p v-if="replyError" style="color:red;font-size:12px;margin-top:6px;">{{ replyError }}</p>
        <button class="btn btn-teal w-full mt-8" :disabled="replyLoading" @click="sendReply">
          {{ replyLoading ? 'Sending...' : 'Send Reply' }}
        </button>
      </div>

      <!-- Bottom Nav -->
      <nav class="bottom-nav">
        <a href="/manufacturer/dashboard" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home
        </a>
        <a href="/manufacturer/products" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>Products
        </a>
        <a href="/manufacturer/messages" class="nav-item active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Messages
        </a>
        <a href="/payments" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>Payments
        </a>
        <a href="/manufacturer/profile" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile
        </a>
      </nav>

      <!-- Toast — inside phone-screen, same as original -->
      <div class="toast" :class="{ show: toast.show }">{{ toast.message }}</div>

    </div><!-- /phone-screen -->
  </div><!-- /phone-frame -->
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import axios from 'axios'

// ─── Filter Tabs ──────────────────────────────────────────────
const filterTabs   = ['All (18)', 'Unread (5)', 'Replied (10)', 'Closed (3)']
const activeFilter = ref('All (18)')

// ─── Search ───────────────────────────────────────────────────
const searchQuery = ref('')

// ─── Enquiries seed data (matches original HTML exactly) ─────
const enquiries = ref([
  {
    id: 1, initials: 'RT', avatarBg: '#0a2540',
    name: 'Rajesh Traders',         location: 'Nagpur',    time: '2 hours ago',
    status: 'New',      statusStyle: '',
    product: 'Gurjan Face Commercial Ply (18mm)',
    message: 'We need 500 sheets urgently for a project. Can you confirm stock availability and pricing for bulk order?',
  },
  {
    id: 2, initials: 'MW', avatarBg: '#163D6E',
    name: 'Maharashtra Wood Co.',   location: 'Pune',      time: '5 hours ago',
    status: 'New',      statusStyle: '',
    product: 'Marine Grade Ply (12mm)',
    message: 'Please share your current price list and MOQ for Marine Ply. We are looking for a regular supplier.',
  },
  {
    id: 3, initials: 'PL', avatarBg: '#22a28a',
    name: 'Prime Laminates',        location: 'Mumbai',    time: 'Yesterday',
    status: 'Replied',  statusStyle: 'background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;',
    product: 'Decorative Laminates (1mm)',
    message: 'Can you provide samples of your decorative laminate range before we place a bulk order?',
  },
  {
    id: 4, initials: 'SK', avatarBg: '#475569',
    name: 'Sunrise Kitchen World',  location: 'Hyderabad', time: '2 days ago',
    status: 'Closed',   statusStyle: 'background:#f1f5f9;color:#64748b;border:1px solid #e2e8f0;',
    product: 'HDF Boards (6mm)',
    message: 'We require HDF boards in quantity 200 pcs for furniture manufacturing. Please confirm dispatch timelines.',
  },
])

// ─── Live search computed ──────────────────────────────────────
const filteredEnquiries = computed(() => {
  const q = searchQuery.value.toLowerCase()
  if (!q) return enquiries.value
  return enquiries.value.filter(e =>
    e.name.toLowerCase().includes(q) ||
    e.product.toLowerCase().includes(q) ||
    e.message.toLowerCase().includes(q)
  )
})

// ─── Toast ────────────────────────────────────────────────────
const toast = reactive({ show: false, message: '' })

function showToast(msg) {
  toast.message = msg
  toast.show    = true
  setTimeout(() => { toast.show = false }, 2500)
}

// ─── Reply Modal ──────────────────────────────────────────────
const isReplyOpen  = ref(false)
const replyText    = ref('')
const replyLoading = ref(false)
const replyError   = ref('')

function openReply() {
  replyText.value  = ''
  replyError.value = ''
  isReplyOpen.value = true
}

async function sendReply() {
  replyError.value = ''
  if (!replyText.value.trim()) {
    replyError.value = 'Please type a reply'
    return
  }
  try {
    replyLoading.value = true
    await axios.post('/api/enquiries/reply', { message: replyText.value.trim() })
    isReplyOpen.value = false
    replyText.value   = ''
    showToast('Reply sent!')
  } catch (err) {
    replyError.value = err.response?.data?.message || 'Failed to send reply. Please try again.'
  } finally {
    replyLoading.value = false
  }
}
</script>

<style scoped>
.filter-tabs { display:flex; gap:8px; overflow-x:auto; padding-bottom:2px; scrollbar-width:none; margin-bottom:16px; }
.filter-tabs::-webkit-scrollbar { display:none; }
.ftab { flex-shrink:0; padding:7px 16px; border-radius:20px; font-size:12px; font-weight:700; border:1.5px solid var(--border); background:var(--card); color:var(--muted); cursor:pointer; transition:var(--transition); }
.ftab.active { background:var(--navy); color:#fff; border-color:var(--navy); }
.enq-card { background:var(--card); border-radius:var(--radius); padding:16px; margin-bottom:12px; box-shadow:var(--shadow-sm); }
.enq-header { display:flex; align-items:flex-start; gap:12px; margin-bottom:10px; }
.enq-avatar { width:42px; height:42px; border-radius:12px; background:var(--navy); color:#fff; font-family:'Barlow',sans-serif; font-size:18px; font-weight:800; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.enq-name { font-size:14px; font-weight:700; color:var(--text); }
.enq-meta { font-size:11px; color:var(--muted); margin-top:2px; }
.enq-badge { margin-left:auto; }
.enq-product { font-size:12px; color:var(--muted); margin-bottom:8px; }
.enq-msg { font-size:13px; color:var(--text); line-height:1.5; background:var(--bg); border-radius:10px; padding:10px; margin-bottom:10px; }
.enq-actions { display:flex; gap:8px; }
</style>
