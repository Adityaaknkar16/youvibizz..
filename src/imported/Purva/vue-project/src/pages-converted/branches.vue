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
        <span class="topbar-title">Branches</span>
        <button class="topbar-icon-btn" @click="openModal('add')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>

      <div class="sheet" style="padding:20px;padding-bottom:100px">
        <div class="page-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <h3 style="margin:0;">All Branches</h3>
          <button class="btn btn-teal" style="min-width:auto; height:36px; padding:0 16px; font-size:13px; font-weight:700;" @click="openModal('add')">+ Add New</button>
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
          <table class="data-table" style="width:100%; border-collapse:collapse; font-size:11px;">
            <thead>
              <tr style="background:#f8fafc;">
                <th @click="sortBy('country')">Country ⇅</th>
                <th @click="sortBy('state')">State ⇅</th>
                <th @click="sortBy('city')">City ⇅</th>
                <th @click="sortBy('address')">Address ⇅</th>
                <th @click="sortBy('firm')">Firm Name ⇅</th>
                <th @click="sortBy('person')">Contact Person ⇅</th>
                <th @click="sortBy('phone')">Contact Number ⇅</th>
                <th @click="sortBy('email')">Contact Mail-ID ⇅</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="b in filteredBranches" :key="b.id">
                <td style="padding:12px 15px; border-bottom:1px solid var(--border); white-space:nowrap;">{{ b.country }}</td>
                <td style="padding:12px 15px; border-bottom:1px solid var(--border); white-space:nowrap;">{{ b.state }}</td>
                <td style="padding:12px 15px; border-bottom:1px solid var(--border); white-space:nowrap;">{{ b.city }}</td>
                <td style="padding:12px 15px; border-bottom:1px solid var(--border); white-space:nowrap; max-width:150px; overflow:hidden; text-overflow:ellipsis;">{{ b.address }}</td>
                <td style="padding:12px 15px; border-bottom:1px solid var(--border); white-space:nowrap; font-weight:700; color:var(--navy);">{{ b.firm }}</td>
                <td style="padding:12px 15px; border-bottom:1px solid var(--border); white-space:nowrap;">{{ b.person }}</td>
                <td style="padding:12px 15px; border-bottom:1px solid var(--border); white-space:nowrap;">{{ b.phone }}</td>
                <td style="padding:12px 15px; border-bottom:1px solid var(--border); white-space:nowrap;">{{ b.email }}</td>
                <td style="padding:12px 15px; border-bottom:1px solid var(--border); white-space:nowrap;">
                  <div style="display:flex; gap:6px;">
                    <button class="opt-btn edit" @click="openModal('edit', b)">Edit</button>
                    <button class="opt-btn del" @click="deleteBranch(b.id)">Delete</button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredBranches.length === 0">
                <td colspan="9" style="text-align:center; padding:40px; color:var(--muted); font-size:13px; font-weight:600;">No records found!</td>
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

      <!-- Add/Edit Modal (Slide-up Sheet) -->
      <div class="modal-overlay" :class="{ open: showModal }" @click.self="closeModal">
        <div class="modal-sheet">
          <div class="modal-handle"></div>
          <div class="modal-title">{{ editMode ? 'Edit Branch' : 'Add Branch' }}</div>

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

          <div class="field">
            <label class="lbl">Registered Address</label>
            <textarea class="inp inp-no-ico" rows="2" v-model="form.address" placeholder="Enter full address"></textarea>
          </div>

          <div class="field">
            <label class="lbl">Firm Name</label>
            <input class="inp inp-no-ico" v-model="form.firm" placeholder="e.g. Sharma Enterprises" />
          </div>

          <div class="form-row">
            <div class="field">
              <label class="lbl">Contact Person</label>
              <input class="inp inp-no-ico" v-model="form.person" placeholder="Name" />
            </div>
            <div class="field">
              <label class="lbl">Contact Number</label>
              <input class="inp inp-no-ico" type="tel" maxlength="10" v-model="form.phone" placeholder="10 digits" />
            </div>
          </div>

          <div class="field">
            <label class="lbl">Contact Mail-ID</label>
            <input class="inp inp-no-ico" type="email" v-model="form.email" placeholder="branch@email.com" />
          </div>

          <div style="display:flex; gap:10px; margin-top:16px;">
            <button class="btn btn-teal btn-sm" style="flex:1" @click="saveBranch">save</button>
            <button class="btn btn-sm" style="flex:1; background:#e5e7eb; color:#374151;" @click="closeModal">Cancel</button>
          </div>
        </div>
      </div>

      <div class="toast" :class="{ show: !!toast }">{{ toast }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const showModal = ref(false)
const editMode = ref(false)
const toast = ref('')
const search = ref('')
const perPage = ref(15)
const sortKey = ref('firm')
const sortOrder = ref(1)

const countries = [
  'India','Afghanistan','Albania','Algeria','Argentina','Australia','Austria','Bangladesh','Belgium',
  'Brazil','Canada','Chile','China','Colombia','Denmark','Egypt','Finland','France','Germany','Ghana',
  'Greece','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Japan','Jordan','Kenya','Malaysia',
  'Mexico','Morocco','Netherlands','New Zealand','Nigeria','Norway','Pakistan','Philippines','Poland',
  'Portugal','Romania','Russia','Saudi Arabia','Singapore','South Africa','South Korea','Spain',
  'Sri Lanka','Sweden','Switzerland','Thailand','Turkey','UAE','UK','USA','Vietnam','Zimbabwe'
]

const indianStates = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana',
  'Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur',
  'Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana',
  'Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh',
  'Puducherry','Chandigarh','Andaman & Nicobar','Lakshadweep','Dadra & Nagar Haveli','Daman & Diu'
]

const indianCities = [
  'Mumbai','Delhi','Bangalore','Hyderabad','Ahmedabad','Chennai','Kolkata','Pune','Surat','Jaipur',
  'Lucknow','Kanpur','Nagpur','Indore','Thane','Bhopal','Visakhapatnam','Patna','Vadodara','Ludhiana',
  'Agra','Nashik','Faridabad','Meerut','Rajkot','Varanasi','Srinagar','Aurangabad','Dhanbad','Amritsar',
  'Allahabad','Ranchi','Coimbatore','Jabalpur','Gwalior','Kochi','Chandigarh','Mysore','Guwahati'
]

const branches = ref([
  { id: 1, country: 'India', state: 'Maharashtra', city: 'Pune', address: 'Survey No 45, Kothrud, Pune', firm: 'YouVBiZ Pune Branch', person: 'Amit Sharma', phone: '9876543210', email: 'pune@youvbiz.com' },
  { id: 2, country: 'India', state: 'Gujarat', city: 'Ahmedabad', address: 'Navrangpura, Ahmedabad', firm: 'YouVBiZ Ahmedabad Branch', person: 'Priya Patel', phone: '9876543211', email: 'ahmedabad@youvbiz.com' }
])

const form = reactive({
  id: null,
  country: 'India',
  state: '',
  city: '',
  address: '',
  firm: '',
  person: '',
  phone: '',
  email: ''
})

const filteredBranches = computed(() => {
  let result = branches.value.filter(b => {
    const q = search.value.toLowerCase();
    return b.firm.toLowerCase().includes(q) || b.city.toLowerCase().includes(q) || b.person.toLowerCase().includes(q);
  });
  
  result.sort((a,b) => {
    let valA = a[sortKey.value];
    let valB = b[sortKey.value];
    if (valA < valB) return -1 * sortOrder.value;
    if (valA > valB) return 1 * sortOrder.value;
    return 0;
  });

  return result.slice(0, perPage.value);
})

function sortBy(key) {
  if (sortKey.value === key) {
    sortOrder.value *= -1;
  } else {
    sortKey.value = key;
    sortOrder.value = 1;
  }
}

function showToast(msg) {
  toast.value = msg
  setTimeout(() => toast.value = '', 2000)
}

function openModal(mode, branch = null) {
  editMode.value = mode === 'edit'
  Object.assign(form, { id: null, country: 'India', state: '', city: '', address: '', firm: '', person: '', phone: '', email: '' })

  if (branch) {
    Object.assign(form, branch)
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function saveBranch() {
  if (!form.firm || !form.phone || !form.email) {
    showToast('Firm, Phone and Email are required')
    return
  }

  if (editMode.value) {
    const idx = branches.value.findIndex(b => b.id === form.id)
    if (idx > -1) branches.value[idx] = { ...form }
    showToast('Branch updated!')
  } else {
    const newId = branches.value.length ? Math.max(...branches.value.map(b => b.id)) + 1 : 1
    branches.value.push({ ...form, id: newId })
    showToast('Branch added!')
  }
  closeModal()
}

function deleteBranch(id) {
  if (!confirm('Delete this branch?')) return
  branches.value = branches.value.filter(b => b.id !== id)
  showToast('Deleted')
}
</script>

<style scoped>
.data-table th { padding:12px 15px; text-align:left; font-weight:700; color:var(--muted); border-bottom:2.5px solid var(--border); white-space:nowrap; cursor:pointer; }
.opt-btn { border:none; border-radius:8px; padding:6px 12px; font-size:11px; font-weight:700; cursor:pointer; }
.opt-btn.edit { background:#dcfce7; color:#16a34a; }
.opt-btn.del { background:#fee2e2; color:#dc2626; }
.toast { position:fixed; bottom:90px; left:50%; transform:translateX(-50%) translateY(10px); background:var(--navy); color:#fff; padding:10px 20px; border-radius:20px; font-size:13px; font-weight:600; z-index:999; pointer-events:none; opacity:0; transition:all .25s; white-space:nowrap; }
.toast.show { opacity:1; transform:translateX(-50%) translateY(0); }
</style>
