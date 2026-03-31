<template>
  <div style="display: contents">
    <div class="phone-notch" style="display: none !important">
      <div class="notch-speaker"></div>
      <div class="notch-camera"></div>
    </div>
    <div class="status-bar" style="display: none !important">
      <span class="status-time">9:41</span>
      <div class="status-icons">
        <svg viewBox="0 0 24 24" fill="white">
          <rect x="1" y="15" width="4" height="6" rx="1" />
          <rect x="7" y="11" width="4" height="10" rx="1" />
          <rect x="13" y="7" width="4" height="14" rx="1" />
          <rect x="19" y="3" width="4" height="18" rx="1" opacity=".3" />
        </svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round">
          <path d="M5 12.55a11 11 0 0114.08 0" />
          <path d="M1.42 9a16 16 0 0121.16 0" />
          <path d="M8.53 16.11a6 6 0 016.95 0" />
          <circle cx="12" cy="20" r="1" fill="white" stroke="none" />
        </svg>
        <div class="battery-icon">
          <div class="battery-body"><div class="battery-fill"></div></div>
        </div>
      </div>
    </div>

    <div style="display: contents; height: 100%;">
      <div class="page-content">
        <!-- Topbar -->
        <div class="topbar">
          <a href="#" @click.prevent="$router.back()" class="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </a>
          <span class="topbar-title">Branches</span>
          <button class="topbar-icon-btn" @click="openModal('add')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>

        <!-- Hero -->
        <div class="hero" style="padding-bottom: 50px">
          <div class="hero-inner">
            <div class="badge"><span class="badge-dot"></span> Branch Management</div>
            <h1 class="hero-title">Your <span class="accent">Branches</span></h1>
            <p class="hero-sub">Manage all your business locations and contact points.</p>
          </div>
        </div>

        <!-- Sheet / List -->
        <div class="sheet" style="padding: 20px; padding-bottom: 100px">
          <div class="page-header">
            <h3>All Branches</h3>
            <button class="btn btn-teal btn-xs" @click="openModal('add')">+ Add Branch</button>
          </div>

          <!-- Empty State -->
          <div v-if="!branches.length" class="empty-state">
            <div class="e-ico">🏢</div>
            <p>No branches added yet.<br />Add your first branch location.</p>
            <button class="btn btn-teal btn-sm" style="width: auto; padding: 0 24px" @click="openModal('add')">
              + Add Branch
            </button>
          </div>

          <!-- Branch Cards -->
          <div v-for="branch in branches" :key="branch.id" class="branch-card">
            <div class="branch-card-header">
              <div>
                <div class="branch-firm">{{ branch.firm }}</div>
                <div class="branch-location">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {{ branch.city }}, {{ branch.state }}
                </div>
              </div>
              <span class="pill pill-teal">Branch</span>
            </div>
            <div class="branch-meta">
              <span>📍 {{ branch.address }}</span>
              <span>👤 {{ branch.person }} &nbsp;|&nbsp; 📞 {{ branch.phone }}</span>
              <span>✉️ {{ branch.email }}</span>
            </div>
            <div class="branch-actions">
              <button class="btn btn-outline btn-xs" @click="openModal('edit', branch.id)">✏️ Edit</button>
              <button class="btn btn-danger btn-xs" @click="deleteBranch(branch.id)">🗑 Delete</button>
            </div>
          </div>
        </div>
      </div>
      <!-- /app -->

      <!-- Bottom Nav -->
      <nav class="bottom-nav">
        <a href="/manufacturer/dashboard" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>Home
        </a>
        <a href="/manufacturer/products" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          </svg>Products
        </a>
        <a href="/manufacturer/messages" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>Messages
        </a>
        <a href="/payments" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="1" y="4" width="22" height="16" rx="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>Payments
        </a>
        <a href="/manufacturer/profile" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>Profile
        </a>
      </nav>

      <!-- Add/Edit Modal -->
      <div class="modal-overlay" :class="{ open: isModalOpen }" @click.self="closeModal">
        <div class="modal-sheet">
          <div class="modal-handle"></div>
          <div class="modal-title">{{ modalTitle }}</div>

          <div class="field">
            <label class="lbl">Country *</label>
            <select class="inp inp-no-ico" v-model="form.country">
              <option value="India">India</option>
            </select>
          </div>

          <div class="form-row">
            <div class="field">
              <label class="lbl">State *</label>
              <select class="inp inp-no-ico" v-model="form.state" @change="onStateChange">
                <option value="">Select State</option>
                <option v-for="state in stateList" :key="state" :value="state">{{ state }}</option>
              </select>
            </div>
            <div class="field">
              <label class="lbl">City *</label>
              <select class="inp inp-no-ico" v-model="form.city">
                <option value="">Select City</option>
                <option v-for="city in cityList" :key="city" :value="city">{{ city }}</option>
              </select>
            </div>
          </div>

          <div class="field">
            <label class="lbl">Address *</label>
            <textarea class="inp inp-no-ico" v-model="form.address" rows="2" placeholder="Enter full address"></textarea>
          </div>

          <div class="field">
            <label class="lbl">Firm Name *</label>
            <input class="inp inp-no-ico" v-model="form.firm" placeholder="e.g. Sharma Enterprises" />
          </div>

          <div class="form-row">
            <div class="field">
              <label class="lbl">Contact Person *</label>
              <input class="inp inp-no-ico" v-model="form.person" placeholder="Name" />
            </div>
            <div class="field">
              <label class="lbl">Phone *</label>
              <input class="inp inp-no-ico" v-model="form.phone" type="tel" maxlength="10" placeholder="10 digits" />
            </div>
          </div>

          <div class="field">
            <label class="lbl">Email *</label>
            <input class="inp inp-no-ico" v-model="form.email" type="email" placeholder="branch@email.com" />
          </div>

          <!-- Error message -->
          <p v-if="errorMessage" style="color: red; font-size: 12px; margin-top: 8px;">{{ errorMessage }}</p>

          <div style="display: flex; gap: 10px; margin-top: 4px">
            <button class="btn btn-outline btn-sm" style="flex: 1" @click="closeModal">Cancel</button>
            <button class="btn btn-teal btn-sm" style="flex: 2" :disabled="loading" @click="saveBranch">
              {{ loading ? 'Saving...' : 'Save Branch' }}
            </button>
          </div>
        </div>
      </div>

    </div>
    <!-- /phone-screen -->
  </div>
  <!-- /phone-frame -->
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import axios from 'axios'

// ─── Constants ───────────────────────────────────────────────
const KEY = 'branches'

// ─── State ───────────────────────────────────────────────────
const branches    = ref([])
const isModalOpen = ref(false)
const modalMode   = ref('add')  // 'add' | 'edit'
const editId      = ref(null)
const loading     = ref(false)
const errorMessage = ref('')

const form = reactive({
  country: 'India',
  state:   '',
  city:    '',
  address: '',
  firm:    '',
  person:  '',
  phone:   '',
  email:   '',
})

// ─── India State → City data ──────────────────────────────────
const INDIA_DATA = {
  Maharashtra:  ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Nanded'],
  Gujarat:      ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'],
  Rajasthan:    ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Prayagraj'],
  Delhi:        ['New Delhi', 'Dwarka', 'Rohini', 'Saket'],
  Karnataka:    ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubli'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
  Telangana:    ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'],
  Kerala:       ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur'],
  'West Bengal':['Kolkata', 'Howrah', 'Asansol', 'Siliguri'],
  Punjab:       ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala'],
  Haryana:      ['Faridabad', 'Gurgaon', 'Panipat', 'Ambala'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur'],
}

const stateList = computed(() => Object.keys(INDIA_DATA))
const cityList  = computed(() => INDIA_DATA[form.state] || [])

function onStateChange() {
  form.city = ''
}

// ─── Computed ─────────────────────────────────────────────────
const modalTitle = computed(() => modalMode.value === 'add' ? 'Add Branch' : 'Edit Branch')

// ─── localStorage helpers ─────────────────────────────────────
function getList()       { return JSON.parse(localStorage.getItem(KEY) || '[]') }
function saveList(list)  { localStorage.setItem(KEY, JSON.stringify(list)) }
function nextId(list)    { return list.length ? Math.max(...list.map(x => x.id)) + 1 : 1 }

// ─── Load branches ────────────────────────────────────────────
function loadBranches() {
  branches.value = getList()
}

// ─── Modal open/close ─────────────────────────────────────────
function openModal(mode, id = null) {
  modalMode.value  = mode
  editId.value     = null
  errorMessage.value = ''

  // Reset form
  Object.assign(form, { country: 'India', state: '', city: '', address: '', firm: '', person: '', phone: '', email: '' })

  if (mode === 'edit' && id !== null) {
    const branch = getList().find(x => x.id === id)
    if (!branch) return
    editId.value = id
    Object.assign(form, {
      country: branch.country || 'India',
      state:   branch.state   || '',
      city:    branch.city    || '',
      address: branch.address || '',
      firm:    branch.firm    || '',
      person:  branch.person  || '',
      phone:   branch.phone   || '',
      email:   branch.email   || '',
    })
  }
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value  = false
  errorMessage.value = ''
}

// ─── Save Branch (API + localStorage) ────────────────────────
async function saveBranch() {
  errorMessage.value = ''

  // Validation
  if (!form.state || !form.city || !form.address || !form.firm || !form.person || !form.phone || !form.email) {
    errorMessage.value = 'Please fill all required fields'
    return
  }
  if (!/^\d{10}$/.test(form.phone)) {
    errorMessage.value = 'Phone must be 10 digits'
    return
  }

  const payload = { ...form }

  try {
    loading.value = true
    const list = getList()

    if (editId.value !== null) {
      // Edit mode — PUT request
      await axios.put(`/api/branches/${editId.value}`, payload)
      const idx = list.findIndex(x => x.id === editId.value)
      if (idx > -1) list[idx] = { ...list[idx], ...payload }
    } else {
      // Add mode — POST request
      await axios.post('/api/branches', payload)
      payload.id      = nextId(list)
      payload.created = new Date().toISOString()
      list.push(payload)
    }

    saveList(list)
    loadBranches()
    closeModal()
  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}

// ─── Delete Branch ────────────────────────────────────────────
async function deleteBranch(id) {
  if (!confirm('Delete this branch?')) return
  try {
    await axios.delete(`/api/branches/${id}`)
    saveList(getList().filter(x => x.id !== id))
    loadBranches()
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to delete branch.')
  }
}

// ─── Seed sample data & init ──────────────────────────────────
onMounted(() => {
  if (!localStorage.getItem(KEY)) {
    saveList([
      { id: 1, country: 'India', state: 'Maharashtra', city: 'Pune',       address: 'Survey No 45, Kothrud, Pune',    firm: 'YouVBiZ Pune Branch',       person: 'Amit Sharma', phone: '9876543210', email: 'pune@youvbiz.com',       created: new Date().toISOString() },
      { id: 2, country: 'India', state: 'Gujarat',     city: 'Ahmedabad',  address: 'Navrangpura, Ahmedabad',         firm: 'YouVBiZ Ahmedabad Branch',  person: 'Priya Patel', phone: '9876543211', email: 'ahmedabad@youvbiz.com',  created: new Date().toISOString() },
    ])
  }
  loadBranches()
})
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.page-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--navy);
}

.branch-card {
  background: white;
  border-radius: var(--radius);
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: var(--shadow-sm);
}

.branch-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.branch-firm {
  font-size: 15px;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 4px;
}

.branch-location {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--muted);
}

.branch-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
  color: var(--text);
  margin-bottom: 14px;
}

.branch-actions {
  display: flex;
  gap: 8px;
}

.empty-state {
  background: white;
  border-radius: var(--radius);
  padding: 30px 20px;
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.e-ico {
  font-size: 40px;
  margin-bottom: 12px;
}

.empty-state p {
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 16px;
}
</style>