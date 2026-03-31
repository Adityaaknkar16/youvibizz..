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
          <rect x="1" y="15" width="4" height="6" rx="1"/>
          <rect x="7" y="11" width="4" height="10" rx="1"/>
          <rect x="13" y="7" width="4" height="14" rx="1"/>
          <rect x="19" y="3" width="4" height="18" rx="1" opacity=".3"/>
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

        <!-- Sheet -->
        <div class="sheet" style="padding:20px;padding-bottom:100px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <h3 style="font-size:17px;font-weight:800;color:var(--navy);">All Areas</h3>
            <button class="btn btn-teal btn-xs" @click="openModal('add')">+ Add Area</button>
          </div>

          <!-- Empty State -->
          <div v-if="!areas.length" class="empty-state">
            <div class="e-ico">🗺️</div>
            <p>No distribution areas defined yet.</p>
            <button class="btn btn-teal btn-sm" style="width:auto;padding:0 24px" @click="openModal('add')">+ Add Area</button>
          </div>

          <!-- Area List -->
          <div v-else>
            <div class="area-card" v-for="a in areas" :key="a.id">
              <div class="area-card-row">
                <div>
                  <div class="area-loc">{{ a.city }}, {{ a.state }}</div>
                  <div class="area-sub">India &nbsp;•&nbsp; {{ formatDate(a.created) }}</div>
                </div>
                <span class="pill pill-teal">Active</span>
              </div>
              <div class="area-meta">
                <span>🏢 {{ a.firm }}</span>
                <span>👤 {{ a.person }} &nbsp;|&nbsp; 📞 {{ a.phone }}</span>
              </div>
              <div class="area-actions">
                <button class="btn btn-outline btn-xs" @click="openModal('edit', a)">✏️ Edit</button>
                <button class="btn btn-danger btn-xs" @click="deleteArea(a.id)">🗑 Delete</button>
              </div>
            </div>
          </div>
        </div>

      </div><!-- /app -->

      <!-- Bottom Nav -->
      <nav class="bottom-nav">
        <a href="#" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Home
        </a>
        <a href="#" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
          Products
        </a>
        <a href="#" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          Messages
        </a>
        <a href="#" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          Membership
        </a>
        <a href="#" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Profile
        </a>
      </nav>

      <!-- Modal -->
      <div class="modal-overlay" :class="{ open: showModal }" @click.self="closeModal">
        <div class="modal-sheet">
          <div class="modal-handle"></div>
          <div class="modal-title">{{ editMode ? 'Edit Distribution Area' : 'Add Distribution Area' }}</div>

          <div class="field">
            <label class="lbl">Country *</label>
            <select class="inp inp-no-ico" v-model="form.country">
              <option value="India">India</option>
            </select>
          </div>

          <div class="form-row">
            <div class="field">
              <label class="lbl">State *</label>
              <select class="inp inp-no-ico" v-model="form.state" @change="handleStateChange">
                <option value="">Select State</option>
                <option v-for="s in states" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>
            <div class="field">
              <label class="lbl">City *</label>
              <select class="inp inp-no-ico" v-model="form.city">
                <option value="">Select City</option>
                <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
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
              <input class="inp inp-no-ico" type="tel" maxlength="10" v-model="form.phone" placeholder="10 digits" />
            </div>
          </div>

          <div style="display:flex;gap:12px;margin-top:20px;">
            <button class="btn btn-outline" style="flex:1" @click="closeModal">Cancel</button>
            <button class="btn btn-teal" style="flex:2" @click="saveArea">Save Area</button>
          </div>
        </div>
      </div>

      <div class="toast" :class="{ show: !!toast }">{{ toast }}</div>

    </div><!-- /phone-screen -->
  </div><!-- /phone-frame -->
</template>

<script setup>
import { ref, reactive } from 'vue'

const showModal = ref(false)
const editMode = ref(false)
const toast = ref('')

const states = ['Maharashtra', 'Gujarat', 'Karnataka', 'Rajasthan', 'Delhi', 'Tamil Nadu', 'Telangana']
const cityMap = {
  Maharashtra: ['Pune', 'Mumbai', 'Nagpur'],
  Gujarat: ['Ahmedabad', 'Surat', 'Vadodara'],
  Karnataka: ['Bangalore', 'Mysore'],
  Rajasthan: ['Jaipur', 'Jodhpur'],
  Delhi: ['New Delhi'],
  'Tamil Nadu': ['Chennai', 'Coimbatore'],
  Telangana: ['Hyderabad', 'Warangal']
}
const cities = ref([])

const form = reactive({ id: null, country: 'India', state: '', city: '', firm: '', person: '', phone: '' })

const areas = ref([])

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function handleStateChange() {
  cities.value = cityMap[form.state] || []
  form.city = ''
}

function showToast(msg) {
  toast.value = msg
  setTimeout(() => toast.value = '', 2000)
}

function openModal(mode, area = null) {
  editMode.value = mode === 'edit'
  Object.assign(form, { id: null, country: 'India', state: '', city: '', firm: '', person: '', phone: '' })
  cities.value = []
  if (area) {
    Object.assign(form, area)
    cities.value = cityMap[area.state] || []
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function saveArea() {
  if (!form.state || !form.city || !form.firm || !form.person || !form.phone) {
    showToast('Fill all required fields')
    return
  }
  if (!/^\d{10}$/.test(form.phone)) {
    showToast('Phone must be 10 digits')
    return
  }
  if (editMode.value) {
    const idx = areas.value.findIndex(a => a.id === form.id)
    if (idx > -1) areas.value[idx] = { ...form }
    showToast('Area updated!')
  } else {
    const newId = areas.value.length ? Math.max(...areas.value.map(a => a.id)) + 1 : 1
    areas.value.push({ ...form, id: newId, created: new Date().toISOString() })
    showToast('Area added!')
  }
  closeModal()
}

function deleteArea(id) {
  if (!confirm('Delete this distribution area?')) return
  areas.value = areas.value.filter(a => a.id !== id)
  showToast('Deleted')
}
</script>

<style scoped>
.area-card { background: var(--card); border-radius: var(--radius); padding: 14px; box-shadow: var(--shadow-sm); margin-bottom: 10px; }
.area-card-row { display: flex; align-items: center; justify-content: space-between; }
.area-loc { font-size: 14px; font-weight: 700; color: var(--navy); }
.area-sub { font-size: 12px; color: var(--muted); margin-top: 3px; }
.area-meta { font-size: 12px; color: var(--text); margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--border); }
.area-meta span { display: block; margin-bottom: 3px; }
.area-actions { display: flex; gap: 6px; margin-top: 10px; }

.empty-state { text-align: center; padding: 40px 20px; }
.empty-state .e-ico { font-size: 40px; margin-bottom: 12px; }
.empty-state p { font-size: 13px; color: var(--muted); margin-bottom: 16px; }

.nav-item { display: flex; flex-direction: column; align-items: center; gap: 3px; font-size: 10px; }
.nav-item svg { width: 20px; height: 20px; }

.toast {
  position: absolute; bottom: 80px; left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: var(--navy); color: #fff;
  padding: 10px 20px; border-radius: 20px;
  font-size: 13px; font-weight: 600;
  z-index: 300; pointer-events: none;
  opacity: 0; transition: opacity .25s, transform .25s;
  white-space: nowrap;
}
.toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
</style>
