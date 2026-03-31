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
          <span class="topbar-title">Distribution Areas</span>
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
            <div class="badge"><span class="badge-dot"></span> Distribution</div>
            <h1 class="hero-title">Distribution <span class="accent">Areas</span></h1>
            <p class="hero-sub">Manage the geographic regions you serve as a distributor.</p>
          </div>
        </div>

        <!-- Sheet / List -->
        <div class="sheet" style="padding:20px;padding-bottom:100px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <h3 style="font-size:17px;font-weight:800;color:var(--navy);">All Areas</h3>
            <button class="btn btn-teal btn-xs" @click="openModal('add')">+ Add Area</button>
          </div>

          <!-- Empty State -->
          <div v-if="!areas.length" class="empty-state">
            <div class="e-ico">🗺️</div>
            <p>No distribution areas defined yet.</p>
            <button class="btn btn-teal btn-sm" style="width:auto;padding:0 24px" @click="openModal('add')">
              + Add Area
            </button>
          </div>

          <!-- Area Cards -->
          <div v-for="area in areas" :key="area.id" class="area-card">
            <div class="area-card-row">
              <div>
                <div class="area-loc">{{ area.city }}, {{ area.state }}</div>
                <div class="area-sub">India &nbsp;•&nbsp; {{ formatDate(area.created) }}</div>
              </div>
              <span class="pill pill-teal">Active</span>
            </div>
            <div class="area-meta">
              <span>🏢 {{ area.firm }}</span>
              <span>👤 {{ area.person }} &nbsp;|&nbsp; 📞 {{ area.phone }}</span>
            </div>
            <div class="area-actions">
              <button class="btn btn-outline btn-xs" @click="openModal('edit', area.id)">✏️ Edit</button>
              <button class="btn btn-danger btn-xs" @click="deleteArea(area.id)">🗑 Delete</button>
            </div>
          </div>
        </div>
      </div>
      <!-- /app -->

      <!-- Bottom Nav -->
      <nav class="bottom-nav">
        <a href="/pages/adityavuetask/distributor-dashboard" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>Home
        </a>
        <a href="/pages/adityavuetask/distributor-products" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
          </svg>Products
        </a>
        <a href="/pages/adityavuetask/distributor-messages" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>Messages
        </a>
        <a href="/pages/tanaya/membership-plan" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>Membership
        </a>
        <a href="/pages/adityavuetask/distributor-profile" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>Profile
        </a>
      </nav>

      <!-- Modal -->
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
            <label class="lbl">Firm Name *</label>
            <input class="inp inp-no-ico" v-model="form.firm" placeholder="e.g. Sharma Enterprises" />
          </div>

          <div class="form-row">
            <div class="field">
              <label class="lbl">Contact Person *</label>
              <input class="inp inp-no-ico" v-model="form.person" placeholder="Name" />
            </div>
            <div class="field">
              <label class="lbl">Contact No *</label>
              <input class="inp inp-no-ico" v-model="form.phone" type="tel" maxlength="10" placeholder="10 digits" />
            </div>
          </div>

          <!-- Error -->
          <p v-if="errorMessage" style="color:red;font-size:12px;margin-top:8px;">{{ errorMessage }}</p>

          <div style="display:flex;gap:12px;margin-top:20px;">
            <button class="btn btn-outline" style="flex:1" @click="closeModal">Cancel</button>
            <button class="btn btn-teal" style="flex:2" :disabled="loading" @click="saveArea">
              {{ loading ? 'Saving...' : 'Save Area' }}
            </button>
          </div>
        </div>
      </div>

      <div class="toast" :class="{ show: toast.show }">{{ toast.message }}</div>

    </div>
    <!-- /phone-screen -->
  </div>
  <!-- /phone-frame -->
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import axios from 'axios'

// ─── Constants ────────────────────────────────────────────────
const KEY = 'dist_areas'

// ─── State ────────────────────────────────────────────────────
const areas        = ref([])
const isModalOpen  = ref(false)
const modalMode    = ref('add')
const editId       = ref(null)
const loading      = ref(false)
const errorMessage = ref('')

const toast = reactive({ show: false, message: '' })

const form = reactive({
  country: 'India',
  state:   '',
  city:    '',
  firm:    '',
  person:  '',
  phone:   '',
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
const modalTitle = computed(() => modalMode.value === 'add' ? 'Add Distribution Area' : 'Edit Distribution Area')

// ─── Helpers ─────────────────────────────────────────────────
function getList()      { return JSON.parse(localStorage.getItem(KEY) || '[]') }
function saveList(list) { localStorage.setItem(KEY, JSON.stringify(list)) }
function nextId(list)   { return list.length ? Math.max(...list.map(x => x.id)) + 1 : 1 }
function loadAreas()    { areas.value = getList() }

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function showToast(msg) {
  toast.message = msg
  toast.show    = true
  setTimeout(() => { toast.show = false }, 2500)
}

// ─── Modal ────────────────────────────────────────────────────
function openModal(mode, id = null) {
  modalMode.value    = mode
  editId.value       = null
  errorMessage.value = ''
  Object.assign(form, { country: 'India', state: '', city: '', firm: '', person: '', phone: '' })

  if (mode === 'edit' && id !== null) {
    const a = getList().find(x => x.id === id)
    if (!a) return
    editId.value = id
    Object.assign(form, {
      country: 'India',
      state:   a.state  || '',
      city:    a.city   || '',
      firm:    a.firm   || '',
      person:  a.person || '',
      phone:   a.phone  || '',
    })
  }
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value  = false
  errorMessage.value = ''
}

// ─── Save Area (API + localStorage) ──────────────────────────
async function saveArea() {
  errorMessage.value = ''

  if (!form.state || !form.city || !form.firm || !form.person || !form.phone) {
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
      await axios.put(`/api/distribution-areas/${editId.value}`, payload)
      const idx = list.findIndex(x => x.id === editId.value)
      if (idx > -1) list[idx] = { ...list[idx], ...payload }
      showToast('Area updated!')
    } else {
      await axios.post('/api/distribution-areas', payload)
      payload.id      = nextId(list)
      payload.created = new Date().toISOString()
      list.push(payload)
      showToast('Area added!')
    }

    saveList(list)
    loadAreas()
    closeModal()
  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}

// ─── Delete Area ──────────────────────────────────────────────
async function deleteArea(id) {
  if (!confirm('Delete this distribution area?')) return
  try {
    await axios.delete(`/api/distribution-areas/${id}`)
    saveList(getList().filter(x => x.id !== id))
    loadAreas()
    showToast('Deleted')
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to delete area.')
  }
}

// ─── Init ─────────────────────────────────────────────────────
onMounted(() => {
  loadAreas()
})
</script>

<style scoped>
.phone-screen {
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 90px;
}

.area-card {
  background: white;
  border-radius: 18px;
  padding: 16px;
  margin-bottom: 14px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.08);
  border: 1px solid #eef2f7;
}

.area-card-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.area-loc {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}

.area-sub {
  font-size: 12px;
  color: #64748b;
}

.area-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
  color: #475569;
  margin: 10px 0;
}

.area-actions {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}
</style>