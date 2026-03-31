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
          <span class="topbar-title">Interested Territory &amp; Product</span>
          <button class="topbar-icon-btn" @click="showAddModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>

        <div class="hero" style="padding:20px 22px 50px;">
          <div class="hero-inner">
            <h1 class="hero-title" style="font-size:24px;">My <span class="accent">Requirements</span></h1>
            <p class="hero-sub">Post and manage your supply needs.</p>
          </div>
        </div>

        <div class="sheet">

          <!-- FIX: Filter tabs — active styling now matches HTML (.ftab.active = navy bg) -->
          <div class="filter-tabs">
            <button
              v-for="tab in tabs"
              :key="tab.label"
              class="ftab"
              :class="{ active: activeTab === tab.label }"
              @click="setActiveTab(tab.label)"
            >{{ tab.label }}</button>
          </div>

          <!-- FIX: filteredRequirements used so tab switching actually filters the list -->
          <div id="reqList">
            <div v-for="req in filteredRequirements" :key="req.id" class="req-card">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px;">
                <div style="font-size:15px;font-weight:700;color:var(--text);">{{ req.product }}</div>

                <!-- FIX: Badge logic corrected — badge-success for New, inline style for Responded,
                     matching original HTML exactly. No conflicting dual-binding. -->
                <span
                  v-if="req.status === 'New'"
                  class="badge badge-success"
                >New</span>
                <span
                  v-else
                  class="badge"
                  style="background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;"
                >{{ req.status }}</span>
              </div>

              <div style="font-size:12px;color:var(--muted);display:flex;gap:14px;flex-wrap:wrap;margin-bottom:8px;">
                <span>📍 {{ req.location }}</span>
                <span>📦 {{ req.quantity }}</span>
              </div>
              <div style="font-size:13px;color:var(--text);background:var(--bg);border-radius:10px;padding:10px;margin-bottom:12px;">{{ req.notes }}</div>
              <div style="display:flex;gap:8px;">
                <button class="btn btn-outline btn-sm" style="flex:1;" @click="showToast('Edit opened')">Edit</button>
                <button class="btn btn-outline btn-sm" style="color:var(--danger);border-color:var(--danger);" @click="deleteReq(req.id)">Delete</button>
              </div>
            </div>
          </div>

          <button class="btn btn-teal w-full mt-8" style="margin-bottom:24px;" @click="showAddModal">
            + Add New Requirement
          </button>
        </div>

        <!-- Add Modal -->
        <!-- FIX: Replaced v-if with v-show to preserve scroll position; close btn has border:none -->
        <div
          v-show="addModalVisible"
          style="display:block;position:absolute;bottom:0;left:0;right:0;background:var(--card);border-radius:var(--radius-xl) var(--radius-xl) 0 0;padding:20px;box-shadow:0 -10px 40px rgba(0,0,0,.2);z-index:300;max-height:80%;overflow-y:auto;"
        >
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <span style="font-size:16px;font-weight:800;">Add Requirement</span>
            <!-- FIX: Added border:none and cursor:pointer to close button -->
            <button
              @click="addModalVisible = false"
              style="background:var(--bg);border:none;border-radius:8px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;color:var(--muted);cursor:pointer;"
            >✕</button>
          </div>

          <label class="form-label">Product / Category *</label>
          <input class="form-input" v-model="addForm.product" placeholder="e.g. Plywood 18mm, Marine Ply">

          <label class="form-label">Location *</label>
          <input class="form-input" v-model="addForm.location" placeholder="e.g. Pune, Maharashtra">

          <label class="form-label">Quantity Required</label>
          <input class="form-input" v-model="addForm.quantity" placeholder="e.g. 500 sheets/month">

          <label class="form-label">Additional Notes</label>
          <textarea class="form-input" v-model="addForm.notes" rows="2" placeholder="Specifications, delivery terms, etc."></textarea>

          <button class="btn btn-teal w-full" :disabled="addLoading" @click="addReq">
            {{ addLoading ? 'Submitting...' : 'Submit Requirement' }}
          </button>
        </div>

      </div><!-- /app -->

      <nav class="bottom-nav">
        <a href="/retailer/dashboard" class="nav-item active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home
        </a>
        <a href="/retailer/products" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>Products
        </a>
        <a href="/retailer/messages" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Messages
        </a>
        <a href="/pages/tanaya/retailer-transactions" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>Payments
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
import { ref, reactive, computed } from 'vue'

// ── Tabs ──────────────────────────────────────────────────────
const activeTab = ref('All (2)')

const tabs = [
  { label: 'All (2)' },
  { label: 'Active' },
  { label: 'Responded' }
]

function setActiveTab(label) {
  activeTab.value = label
}

// ── Requirements ──────────────────────────────────────────────
const requirements = ref([
  {
    id: 1,
    product: 'Premium Laminates (Retail)',
    status: 'New',
    location: 'Pune',
    quantity: '100–300 units/month',
    notes: 'Decorative variants needed'
  },
  {
    id: 2,
    product: 'Commercial Ply 18mm',
    status: 'Responded',
    location: 'Mumbai',
    quantity: '50+ sheets/month',
    notes: 'Regular supply required'
  }
])

// FIX: filteredRequirements computed so tab clicks actually filter the displayed list
const filteredRequirements = computed(() => {
  if (activeTab.value === 'Active') {
    return requirements.value.filter(r => r.status === 'New')
  }
  if (activeTab.value === 'Responded') {
    return requirements.value.filter(r => r.status === 'Responded')
  }
  return requirements.value
})

function deleteReq(id) {
  requirements.value = requirements.value.filter(r => r.id !== id)
  showToast('Requirement deleted')
}

// ── Add Modal ─────────────────────────────────────────────────
const addModalVisible = ref(false)
const addLoading = ref(false)

const addForm = reactive({
  product: '',
  location: '',
  quantity: '',
  notes: ''
})

function showAddModal() {
  addModalVisible.value = true
}

async function addReq() {
  if (!addForm.product.trim() || !addForm.location.trim()) {
    showToast('Please fill required fields')
    return
  }
  addLoading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    requirements.value.unshift({
      id: Date.now(),
      product: addForm.product.trim(),
      status: 'New',
      location: addForm.location.trim(),
      quantity: addForm.quantity.trim() || 'Negotiable',
      notes: addForm.notes.trim() || 'No additional notes'
    })
    addModalVisible.value = false
    addForm.product = ''
    addForm.location = ''
    addForm.quantity = ''
    addForm.notes = ''
    showToast('Requirement added!')
  } catch (err) {
    showToast('Failed to add requirement.')
  } finally {
    addLoading.value = false
  }
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
/* ── Form elements ────────────────────────────────────────────
   FIX: These were defined only in the HTML <style> block and were
   completely missing from the Vue file, causing the modal form
   to render with no styling at all.
*/
.form-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 6px;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}
.form-input {
  width: 100%;
  border: 1.5px solid var(--border);
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 14px;
  font-family: Inter, sans-serif;
  background: var(--card);
  color: var(--text);
  transition: var(--transition);
  margin-bottom: 14px;
  box-sizing: border-box;
  outline: none;
}
.form-input:focus {
  border-color: var(--teal);
  box-shadow: 0 0 0 3px var(--teal-dim);
}
textarea.form-input {
  resize: none;
  line-height: 1.5;
}

/* ── Filter tabs ──────────────────────────────────────────────
   FIX: Also missing from the Vue file. Without these the tab row
   had no horizontal scroll, no pill shape, and no active state.
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
/* FIX: Active tab uses navy background + white text, matching original HTML */
.ftab.active {
  background: var(--navy);
  color: #fff;
  border-color: var(--navy);
}

/* ── Requirement cards ────────────────────────────────────────
   FIX: .req-card style was also only in the HTML, missing in Vue.
*/
.req-card {
  background: var(--card);
  border-radius: var(--radius);
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: var(--shadow-sm);
}
</style>