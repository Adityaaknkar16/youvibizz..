<template>
  <div style="display: contents">
    <div class="page-content">
      <!-- Topbar -->
      <div class="topbar">
        <a href="#" @click.prevent="$router.back()" class="back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </a>
        <span class="topbar-title">Network Areas</span>
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
          <div class="badge"><span class="badge-dot"></span> Business Network</div>
          <h1 class="hero-title">Network <span class="accent">Areas</span></h1>
          <p class="hero-sub">Define regions where your business network operates.</p>
        </div>
      </div>

      <div class="sheet" style="padding:20px;padding-bottom:100px;">
        <div class="page-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <h3 style="margin:0; font-size:17px; font-weight:800; color:var(--navy);">All Areas</h3>
          <button class="btn btn-teal" style="min-width:auto; height:36px; padding:0 24px; font-size:13px; font-weight:700;" @click="openModal('add')">+ Add New</button>
        </div>

        <!-- Controls -->
        <div class="ctrl-row" style="display:flex; align-items:center; gap:8px; margin:15px 0; flex-wrap:nowrap;">
          <div class="show-wrap" style="display:flex; align-items:center; gap:4px; font-size:12px; color:var(--muted);">
            <span>Show</span>
            <select v-model="perPage" class="ctrl-select" style="border:1.5px solid var(--border); border-radius:6px; padding:3px 6px; font-size:11px;">
              <option :value="15">15</option>
              <option :value="30">30</option>
              <option :value="50">50</option>
            </select>
          </div>
          <div class="search-bar" style="flex:1; position:relative; display:flex; align-items:center; background:#f1f5f9; border-radius:10px; padding:0 12px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px; height:14px; color:var(--muted); margin-right:8px;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input v-model="search" placeholder="Search..." style="border:none; background:none; font-size:12px; padding:8px 0; width:100%; outline:none;" />
          </div>
        </div>

        <!-- Table View -->
        <div class="table-wrap" style="overflow-x:auto; background:white; border-radius:12px; border:1px solid var(--border);">
          <table class="data-table" style="width:100%; border-collapse:collapse; font-size:12px;">
            <thead>
              <tr style="background:#f8fafc;">
                <th>Country</th>
                <th>State</th>
                <th>City</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="a in filteredAreas" :key="a.id">
                <td style="padding:12px 15px; border-bottom:1px solid var(--border); white-space:nowrap;">{{ a.country }}</td>
                <td style="padding:12px 15px; border-bottom:1px solid var(--border); white-space:nowrap;">{{ a.state }}</td>
                <td style="padding:12px 15px; border-bottom:1px solid var(--border); white-space:nowrap;">{{ a.city }}</td>
                <td style="padding:12px 15px; border-bottom:1px solid var(--border); white-space:nowrap;">
                  <button class="del-btn" style="background:#fee2e2; color:#dc2626; border:none; border-radius:8px; padding:6px 12px; font-size:11px; font-weight:700;" @click="deleteArea(a.id)">Delete</button>
                </td>
              </tr>
              <tr v-if="filteredAreas.length === 0">
                <td colspan="4" style="text-align:center; padding:40px; color:var(--muted); font-size:13px; font-weight:600;">No records found!</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="pagination" style="display:flex; justify-content:flex-end; align-items:center; gap:10px; margin-top:15px; font-size:12px; color:var(--muted);">
           <span>1 of 1</span>
           <div style="display:flex; gap:5px;">
             <button disabled style="border:1px solid var(--border); background:white; border-radius:4px; padding:2px 6px; cursor:not-allowed;">&lt;</button>
             <button disabled style="border:1px solid var(--border); background:white; border-radius:4px; padding:2px 6px; cursor:not-allowed;">&gt;</button>
           </div>
        </div>
      </div>

      <!-- Modal -->
      <div class="modal-overlay" :class="{ open: isModalOpen }" @click.self="closeModal">
        <div class="modal-sheet">
          <div class="modal-handle"></div>
          <div class="modal-title">Add Network Area</div>

          <div class="field">
            <label class="lbl">Country</label>
            <select class="inp inp-no-ico" v-model="form.country">
              <option value="">Select Country</option>
              <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>

          <div class="form-row">
            <div class="field">
              <label class="lbl">State</label>
              <select class="inp inp-no-ico" v-model="form.state">
                <option value="">Select State</option>
                <option v-for="s in indianStates" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>
            <div class="field">
              <label class="lbl">City</label>
              <select class="inp inp-no-ico" v-model="form.city">
                <option value="">Select City</option>
                <option v-for="c in indianCities" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>
          </div>

          <div style="display:flex; gap:10px; margin-top:16px;">
            <button class="btn btn-teal btn-sm" style="flex:1" @click="saveArea">save</button>
            <button class="btn btn-sm" style="flex:1; background:#e5e7eb; color:#374151;" @click="closeModal">Cancel</button>
          </div>
        </div>
      </div>

      <div class="toast" :class="{ show: !!message }">{{ message }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const areas = ref([
  { id: 1, country: 'India', state: 'Maharashtra', city: 'Pune' },
  { id: 2, country: 'India', state: 'Gujarat', city: 'Ahmedabad' }
])

const isModalOpen = ref(false)
const message = ref('')
const search = ref('')
const perPage = ref(15)

const form = reactive({
  country: 'India',
  state: '',
  city: ''
})

const countries = ['India','USA','UK','Canada','Australia','UAE','Singapore']
const indianStates = ['Maharashtra','Gujarat','Karnataka','Rajasthan','Delhi','Punjab','Tamil Nadu']
const indianCities = ['Mumbai','Pune','Ahmedabad','Surat','Bangalore','Jaipur','Delhi']

const filteredAreas = computed(() => {
  let result = areas.value.filter(a => {
    const q = search.value.toLowerCase();
    return a.state.toLowerCase().includes(q) || a.city.toLowerCase().includes(q);
  });
  return result.slice(0, perPage.value);
})

const openModal = () => {
  Object.assign(form, { country: 'India', state: '', city: '' })
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const showToast = (msg) => {
  message.value = msg
  setTimeout(() => (message.value = ''), 2000)
}

const saveArea = () => {
  if (!form.state || !form.city) return showToast('Select State and City')
  areas.value.push({ ...form, id: Date.now() })
  showToast('Area added!')
  closeModal()
}

const deleteArea = (id) => {
  areas.value = areas.value.filter(a => a.id !== id)
  showToast('Deleted')
}
</script>

<style scoped>
.data-table th { padding:12px 15px; text-align:left; font-weight:700; color:var(--muted); border-bottom:2px solid var(--border); }
.data-table td { padding:12px 15px; border-bottom:1px solid var(--border); color:var(--text); }
.toast { position:fixed; bottom:90px; left:50%; transform:translateX(-50%) translateY(10px); background:var(--navy); color:#fff; padding:10px 20px; border-radius:20px; font-size:13px; font-weight:600; z-index:999; pointer-events:none; opacity:0; transition:all .25s; }
.toast.show { opacity:1; transform:translateX(-50%) translateY(0); }
</style>