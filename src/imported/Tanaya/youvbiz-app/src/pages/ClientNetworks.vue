<template>
  <div style="display: contents">
    <div class="phone-notch" style="display: none !important"><div class="notch-speaker"></div><div class="notch-camera"></div></div>
    <div class="status-bar" style="display: none !important">
      <span class="status-time">9:41</span>
      <div class="status-icons">
        <svg viewBox="0 0 24 24" fill="white">
          <rect x="1" y="15" width="4" height="6" rx="1"/>
          <rect x="7" y="11" width="4" height="10" rx="1"/>
          <rect x="13" y="7" width="4" height="14" rx="1"/>
          <rect x="19" y="3" width="4" height="18" rx="1" opacity=".3"/>
        </svg>
        <div class="battery-icon"><div class="battery-body"><div class="battery-fill"></div></div></div>
      </div>
    </div>

    <div style="display: contents; height: 100%;">
      <div class="page-content">
        <!-- Topbar -->
        <div class="topbar">
          <a href="#" @click.prevent="$router.back()" class="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </a>
          <span class="topbar-title">Client Networks</span>
          <button class="topbar-icon-btn" @click="openModal('add')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>

        <!-- Hero -->
        <div class="hero" style="padding-bottom:50px;">
          <div class="hero-inner">
            <div class="badge"><span class="badge-dot"></span> Network</div>
            <h1 class="hero-title">Client <span class="accent">Networks</span></h1>
            <p class="hero-sub">Track your distributors, retailers &amp; business partners.</p>
          </div>
        </div>

        <!-- Sheet / List -->
        <div class="sheet" style="padding:20px;padding-bottom:100px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <h3 style="font-size:17px;font-weight:800;color:var(--navy);">Connections</h3>
            <button class="btn btn-teal btn-xs" @click="openModal('add')">+ Add Client</button>
          </div>

          <!-- Filter Tabs -->
          <div class="filter-tabs">
            <button
              v-for="tab in filterTabs"
              :key="tab.value"
              class="ftab"
              :class="{ active: activeFilter === tab.value }"
              @click="setFilter(tab.value)"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- Empty State -->
          <div v-if="!filteredClients.length" class="empty-state">
            <div class="e-ico">🤝</div>
            <p>No {{ activeFilter === 'all' ? 'clients' : activeFilter.toLowerCase() + 's' }} added yet.</p>
            <button class="btn btn-teal btn-sm" style="width:auto;padding:0 24px" @click="openModal('add')">
              + Add Client
            </button>
          </div>

          <!-- Client Cards -->
          <div v-for="client in filteredClients" :key="client.id" class="cn-card">
            <div class="cn-top">
              <div class="cn-avatar">{{ TYPE_EMOJIS[client.type] || '🤝' }}</div>
              <div style="flex:1;min-width:0;">
                <div class="cn-name">{{ client.firm }}</div>
                <div class="cn-type">
                  {{ client.name }} — {{ client.city || '' }}{{ client.state ? ', ' + client.state : '' }}
                </div>
              </div>
              <span class="pill" :class="TYPE_PILLS[client.type] || 'pill-gray'">{{ client.type }}</span>
            </div>
            <div class="cn-info">
              <span>📞 {{ client.phone }}</span>
              <span v-if="client.email">✉️ {{ client.email }}</span>
            </div>
            <p v-if="client.notes" style="font-size:12px;color:var(--muted);margin-bottom:8px;">{{ client.notes }}</p>
            <div class="cn-actions">
              <button class="btn btn-outline btn-xs" @click="openModal('edit', client.id)">✏️ Edit</button>
              <button class="btn btn-danger btn-xs" @click="deleteClient(client.id)">🗑 Delete</button>
            </div>
          </div>
        </div>
      </div>
      <!-- /app -->

      <!-- Bottom Nav -->
      <nav class="bottom-nav">
        <a href="/manufacturer/dashboard" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>Home
        </a>
        <a href="/manufacturer/products" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
          </svg>Products
        </a>
        <a href="/manufacturer/messages" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>Messages
        </a>
        <a href="/payments" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="1" y="4" width="22" height="16" rx="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>Payments
        </a>
        <a href="/manufacturer/profile" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>Profile
        </a>
      </nav>

      <!-- Add/Edit Modal -->
      <div class="modal-overlay" :class="{ open: isModalOpen }" @click.self="closeModal">
        <div class="modal-sheet">
          <div class="modal-handle"></div>
          <div class="modal-title">{{ modalTitle }}</div>

          <div class="field">
            <label class="lbl">Client Type *</label>
            <div class="inp-wrap select-wrap">
              <select class="inp inp-no-ico" v-model="form.type">
                <option value="">Select Type</option>
                <option value="Distributor">Distributor</option>
                <option value="Retailer">Retailer</option>
                <option value="Manufacturer">Manufacturer</option>
              </select>
            </div>
          </div>

          <div class="field">
            <label class="lbl">Business / Firm Name *</label>
            <input class="inp inp-no-ico" v-model="form.firm" placeholder="e.g. Sharma Traders" />
          </div>

          <div class="form-row">
            <div class="field">
              <label class="lbl">Contact Name *</label>
              <input class="inp inp-no-ico" v-model="form.name" placeholder="Full name" />
            </div>
            <div class="field">
              <label class="lbl">Phone *</label>
              <input class="inp inp-no-ico" v-model="form.phone" type="tel" maxlength="10" placeholder="10 digits" />
            </div>
          </div>

          <div class="field">
            <label class="lbl">Email</label>
            <input class="inp inp-no-ico" v-model="form.email" type="email" placeholder="email@example.com" />
          </div>

          <div class="form-row">
            <div class="field">
              <label class="lbl">State</label>
              <div class="inp-wrap select-wrap">
                <select class="inp inp-no-ico" v-model="form.state" @change="onStateChange">
                  <option value="">Select State</option>
                  <option v-for="state in stateList" :key="state" :value="state">{{ state }}</option>
                </select>
              </div>
            </div>
            <div class="field">
              <label class="lbl">City</label>
              <div class="inp-wrap select-wrap">
                <select class="inp inp-no-ico" v-model="form.city">
                  <option value="">Select City</option>
                  <option v-for="city in cityList" :key="city" :value="city">{{ city }}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="lbl">Notes</label>
            <textarea class="inp inp-no-ico" v-model="form.notes" rows="2" placeholder="Any additional notes..."></textarea>
          </div>

          <!-- Error -->
          <p v-if="errorMessage" style="color:red;font-size:12px;margin-top:8px;">{{ errorMessage }}</p>

          <div style="display:flex;gap:12px;margin-top:20px;">
            <button class="btn btn-outline" style="flex:1" @click="closeModal">Cancel</button>
            <button class="btn btn-teal" style="flex:2" :disabled="loading" @click="saveClient">
              {{ loading ? 'Saving...' : 'Save Client' }}
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

// ─── Constants ────────────────────────────────────────────────
const KEY = 'client_networks'

const TYPE_EMOJIS = { Distributor: '🚚', Retailer: '🏪', Manufacturer: '🏭' }
const TYPE_PILLS  = { Distributor: 'pill-teal', Retailer: 'pill-green', Manufacturer: 'pill-yellow' }

const filterTabs = [
  { label: 'All',           value: 'all' },
  { label: 'Distributors',  value: 'Distributor' },
  { label: 'Retailers',     value: 'Retailer' },
  { label: 'Manufacturers', value: 'Manufacturer' },
]

// ─── State ────────────────────────────────────────────────────
const clients      = ref([])
const activeFilter = ref('all')
const isModalOpen  = ref(false)
const modalMode    = ref('add')
const editId       = ref(null)
const loading      = ref(false)
const errorMessage = ref('')

const form = reactive({
  type:  '',
  firm:  '',
  name:  '',
  phone: '',
  email: '',
  state: '',
  city:  '',
  notes: '',
})

// ─── India State → City data ──────────────────────────────────
const INDIA_DATA = {
  Maharashtra:     ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Nanded'],
  Gujarat:         ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'],
  Rajasthan:       ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Prayagraj'],
  Delhi:           ['New Delhi', 'Dwarka', 'Rohini', 'Saket'],
  Karnataka:       ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubli'],
  'Tamil Nadu':    ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
  Telangana:       ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'],
  Kerala:          ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur'],
  'West Bengal':   ['Kolkata', 'Howrah', 'Asansol', 'Siliguri'],
  Punjab:          ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala'],
  Haryana:         ['Faridabad', 'Gurgaon', 'Panipat', 'Ambala'],
  'Madhya Pradesh':['Bhopal', 'Indore', 'Gwalior', 'Jabalpur'],
}

const stateList = computed(() => Object.keys(INDIA_DATA))
const cityList  = computed(() => INDIA_DATA[form.state] || [])

function onStateChange() { form.city = '' }

// ─── Computed ─────────────────────────────────────────────────
const modalTitle = computed(() => modalMode.value === 'add' ? 'Add Client' : 'Edit Client')

const filteredClients = computed(() =>
  activeFilter.value === 'all'
    ? clients.value
    : clients.value.filter(c => c.type === activeFilter.value)
)

// ─── localStorage helpers ─────────────────────────────────────
function getList()      { return JSON.parse(localStorage.getItem(KEY) || '[]') }
function saveList(list) { localStorage.setItem(KEY, JSON.stringify(list)) }
function nextId(list)   { return list.length ? Math.max(...list.map(x => x.id)) + 1 : 1 }

function loadClients() { clients.value = getList() }

// ─── Filter ───────────────────────────────────────────────────
function setFilter(val) { activeFilter.value = val }

// ─── Modal ────────────────────────────────────────────────────
function openModal(mode, id = null) {
  modalMode.value    = mode
  editId.value       = null
  errorMessage.value = ''
  Object.assign(form, { type: '', firm: '', name: '', phone: '', email: '', state: '', city: '', notes: '' })

  if (mode === 'edit' && id !== null) {
    const c = getList().find(x => x.id === id)
    if (!c) return
    editId.value = id
    Object.assign(form, {
      type:  c.type  || '',
      firm:  c.firm  || '',
      name:  c.name  || '',
      phone: c.phone || '',
      email: c.email || '',
      state: c.state || '',
      city:  c.city  || '',
      notes: c.notes || '',
    })
  }
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value  = false
  errorMessage.value = ''
}

// ─── Save Client (API + localStorage) ────────────────────────
async function saveClient() {
  errorMessage.value = ''

  if (!form.type || !form.firm || !form.name || !form.phone) {
    errorMessage.value = 'Fill all required fields'
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
      await axios.put(`/api/client-networks/${editId.value}`, payload)
      const idx = list.findIndex(x => x.id === editId.value)
      if (idx > -1) list[idx] = { ...list[idx], ...payload }
    } else {
      await axios.post('/api/client-networks', payload)
      payload.id      = nextId(list)
      payload.created = new Date().toISOString()
      list.push(payload)
    }

    saveList(list)
    loadClients()
    closeModal()
  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}

// ─── Delete Client ────────────────────────────────────────────
async function deleteClient(id) {
  if (!confirm('Remove this client from your network?')) return
  try {
    await axios.delete(`/api/client-networks/${id}`)
    saveList(getList().filter(x => x.id !== id))
    loadClients()
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to remove client.')
  }
}

// ─── Seed & init ─────────────────────────────────────────────
onMounted(() => {
  if (!localStorage.getItem(KEY)) {
    saveList([
      { id: 1, type: 'Distributor', firm: 'Sharma Distributors',  name: 'Rajesh Sharma', phone: '9876543210', email: 'rajesh@sharma.com', state: 'Maharashtra', city: 'Pune',       notes: 'Primary distributor for western region', created: new Date().toISOString() },
      { id: 2, type: 'Retailer',    firm: 'Modern Retail Store',  name: 'Priya Mehta',   phone: '9876543211', email: 'priya@modern.com',  state: 'Gujarat',     city: 'Ahmedabad', notes: '',                                       created: new Date().toISOString() },
      { id: 3, type: 'Manufacturer',firm: 'XYZ Ply Industries',   name: 'Anil Gupta',    phone: '9876543212', email: '',                  state: 'Rajasthan',   city: 'Jaipur',    notes: 'Supplier of raw materials',              created: new Date().toISOString() },
    ])
  }
  loadClients()
})
</script>

<style scoped>
.phone-screen {
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 90px;
}

.cn-card {
  background: white;
  border-radius: 18px;
  padding: 16px;
  margin-bottom: 14px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.08);
  border: 1px solid #eef2f7;
}

.cn-top {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 10px;
}

.cn-avatar {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #f5f7fb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.cn-name {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
}

.cn-type {
  font-size: 12px;
  color: #64748b;
}

.cn-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
  color: #475569;
  margin: 10px 0;
}

.cn-actions {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}

.filter-tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  margin-bottom: 16px;
}

.ftab {
  padding: 8px 14px;
  border-radius: 20px;
  border: 1px solid #dbe2ea;
  background: white;
  font-size: 12px;
  font-weight: 600;
}

.ftab.active {
  background: #0f766e;
  color: white;
  border-color: #0f766e;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
}

.e-ico {
  font-size: 40px;
  margin-bottom: 10px;
}
</style>
