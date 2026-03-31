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

        <div class="topbar">
          <a href="#" @click.prevent="$router.back()" class="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </a>
          <span class="topbar-title">Enquiries</span>
          <div style="width:36px;"></div>
        </div>

        <div class="hero" style="padding:20px 22px 50px;">
          <div class="hero-inner">
            <h1 class="hero-title" style="font-size:24px;">Buyer <span class="accent">Enquiries</span></h1>
            <p class="hero-sub">Respond to enquiries from buyers.</p>
          </div>
        </div>

        <div class="sheet">

          <div class="search-bar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search enquiries..." v-model="searchQuery" />
          </div>

          <!-- Filter Tabs -->
          <div class="filter-tabs">
            <button
              v-for="tab in tabs"
              :key="tab.label"
              class="ftab"
              :class="{ active: activeTab === tab.label }"
              @click="setActiveTab(tab.label)"
            >{{ tab.label }}</button>
          </div>

          <!-- Enquiry Cards -->
          <div v-for="enq in filteredEnquiries" :key="enq.id" class="enq-card">
            <div class="enq-header">
              <div class="enq-avatar" :style="{ background: enq.avatarColor }">{{ enq.initials }}</div>
              <div>
                <div class="enq-name">{{ enq.name }}</div>
                <div class="enq-meta">📍 {{ enq.location }} · {{ enq.time }}</div>
              </div>
              <!-- FIX: Badge style depends on status, not always badge-success -->
              <div style="margin-left:auto;">
                <span
                  v-if="enq.status === 'new'"
                  class="badge badge-success"
                >New</span>
                <span
                  v-else-if="enq.status === 'replied'"
                  class="badge"
                  style="background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe;"
                >Replied</span>
                <span
                  v-else-if="enq.status === 'closed'"
                  class="badge"
                  style="background:#f3f4f6;color:#6b7280;border:1px solid #e5e7eb;"
                >Closed</span>
              </div>
            </div>

            <div style="font-size:12px;color:var(--muted);margin-bottom:8px;">📦 {{ enq.product }}</div>
            <div class="enq-msg">{{ enq.message }}</div>

            <div class="enq-actions">
              <button
                class="btn btn-teal btn-sm"
                style="flex:1;"
                :disabled="enq.loading || enq.status === 'closed'"
                @click="replyEnquiry(enq)"
              >{{ enq.loading ? 'Sending...' : 'Reply' }}</button>
              <button
                class="btn btn-outline btn-sm"
                :disabled="enq.status === 'closed'"
                @click="closeEnquiry(enq)"
              >Close</button>
            </div>
          </div>

          <!-- Empty state -->
          <div v-if="filteredEnquiries.length === 0" style="text-align:center;padding:32px 16px;color:var(--muted);font-size:13px;">
            No enquiries found.
          </div>

        </div><!-- /sheet -->
      </div><!-- /app -->

      <nav class="bottom-nav">
        <a href="/retailer/dashboard" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home
        </a>
        <a href="/retailer/products" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>Products
        </a>
        <a href="/retailer/messages" class="nav-item active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Messages
        </a>
        <a href="/pages/tanaya/membership-plan" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Membership
        </a>
        <a href="/retailer/profile" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile
        </a>
      </nav>

      <div class="toast" :class="{ show: toastVisible }">{{ toastMessage }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// ── Tabs ──────────────────────────────────────────────────────
const activeTab = ref('All (11)')
const searchQuery = ref('')

const tabs = [
  { label: 'All (11)' },
  { label: 'Unread (3)' },
  { label: 'Replied (7)' },
  { label: 'Closed (1)' }
]

function setActiveTab(label) {
  activeTab.value = label
}

// ── Enquiries data ────────────────────────────────────────────
// FIX: Added a 'status' field (new / replied / closed / unread) on each
// enquiry so both tab filtering and badge rendering work correctly.
const enquiries = ref([
  {
    id: 1,
    name: 'Amar Builders',
    initials: 'AB',
    avatarColor: '#0a2540',
    location: 'Pune',
    time: '30 min ago',
    status: 'new',
    product: 'Premium Laminates (1mm)',
    message: 'Need 300 sheets of your premium laminates for a housing project. Can you deliver to Kothrud, Pune?',
    loading: false
  },
  {
    id: 2,
    name: 'Krishna Interiors',
    initials: 'KI',
    avatarColor: '#22a28a',
    location: 'Mumbai',
    time: '2 hr ago',
    status: 'new',
    product: 'Marine Grade Ply (18mm)',
    message: 'Looking for waterproof plywood for a kitchen renovation. What is your bulk pricing?',
    loading: false
  },
  {
    id: 3,
    name: 'Sunrise Constructions',
    initials: 'SC',
    avatarColor: '#7c3aed',
    location: 'Nashik',
    time: 'Yesterday',
    status: 'new',
    product: 'Gurjan Face Commercial Ply',
    message: 'We need ISI certified commercial ply for an upcoming project. Please share your catalogue.',
    loading: false
  },
  {
    id: 4,
    name: 'Metro Furniture',
    initials: 'MF',
    avatarColor: '#b45309',
    location: 'Aurangabad',
    time: '2 days ago',
    status: 'replied',
    product: 'Block Board 19mm',
    message: 'Interested in your block board range. Can you provide samples before placing bulk order?',
    loading: false
  },
  {
    id: 5,
    name: 'City Developers',
    initials: 'CD',
    avatarColor: '#0a2540',
    location: 'Nagpur',
    time: '3 days ago',
    status: 'replied',
    product: 'Flush Door Skins',
    message: 'Need flush door skins in standard sizes. What is your minimum order quantity?',
    loading: false
  },
  {
    id: 6,
    name: 'Royal Contractors',
    initials: 'RC',
    avatarColor: '#065f46',
    location: 'Solapur',
    time: '5 days ago',
    status: 'closed',
    product: 'Premium Laminates (0.8mm)',
    message: 'Requirement for 200 sheets of decorative laminates. Already sourced, closing enquiry.',
    loading: false
  }
])

// FIX: filteredEnquiries now handles BOTH tab filter and search query together
const filteredEnquiries = computed(() => {
  let list = enquiries.value

  // Apply tab filter
  if (activeTab.value === 'Unread (3)') {
    list = list.filter(e => e.status === 'new')
  } else if (activeTab.value === 'Replied (7)') {
    list = list.filter(e => e.status === 'replied')
  } else if (activeTab.value === 'Closed (1)') {
    list = list.filter(e => e.status === 'closed')
  }
  // 'All (11)' shows everything — no filter

  // Apply search query on top of tab filter
  const q = searchQuery.value.trim().toLowerCase()
  if (q) {
    list = list.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.product.toLowerCase().includes(q) ||
      e.message.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q)
    )
  }

  return list
})

// ── Actions ───────────────────────────────────────────────────
async function replyEnquiry(enq) {
  enq.loading = true
  try {
    // Replace with real Axios call, e.g.:
    // await axios.post('/api/enquiries/reply', { id: enq.id, message: '...' })
    await new Promise(resolve => setTimeout(resolve, 600))
    enq.status = 'replied'
    showToast('Reply sent!')
  } catch (err) {
    showToast(err.response?.data?.message || 'Failed to send reply.')
  } finally {
    enq.loading = false
  }
}

function closeEnquiry(enq) {
  enq.status = 'closed'
  showToast('Marked as closed')
}

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
</script>

<style scoped>
/* ── Filter tabs ──────────────────────────────────────────────
   FIX: Entire <style scoped> block was missing from the Vue file.
   All classes below are taken directly from the HTML <style> block.
*/
.filter-tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 2px;
  scrollbar-width: none;
  margin-bottom: 16px;
}
.filter-tabs::-webkit-scrollbar { display: none; }

.ftab {
  flex-shrink: 0;
  padding: 7px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  border: 1.5px solid var(--border);
  background: var(--card);
  color: var(--muted);
  cursor: pointer;
  transition: var(--transition);
}
.ftab.active {
  background: var(--navy);
  color: #fff;
  border-color: var(--navy);
}

/* ── Enquiry cards ────────────────────────────────────────────*/
.enq-card {
  background: var(--card);
  border-radius: var(--radius);
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: var(--shadow-sm);
}
.enq-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 10px;
}
.enq-avatar {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  color: #fff;
  font-family: 'Barlow', sans-serif;
  font-size: 18px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.enq-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
}
.enq-meta {
  font-size: 11px;
  color: var(--muted);
  margin-top: 2px;
}
.enq-msg {
  font-size: 13px;
  color: var(--text);
  line-height: 1.5;
  background: var(--bg);
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}
.enq-actions {
  display: flex;
  gap: 8px;
}
</style>