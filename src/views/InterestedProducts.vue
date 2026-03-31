<template>
  <!-- Topbar -->
  <div class="topbar">
    <button @click="$router.back()" class="back-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <span class="topbar-title">Interested Products</span>
    <button class="topbar-icon-btn" @click="showAddModal = true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    </button>
  </div>

  <div class="sheet">
    <!-- Controls -->
    <div class="ctrl-row">
      <div class="show-wrap">
        <span>Show</span>
        <select v-model="perPage" class="ctrl-select">
          <option>15</option><option>30</option><option>50</option>
        </select>
      </div>
      <div class="search-bar" style="flex:1;margin-bottom:0;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input v-model="search" placeholder="Search..." />
      </div>
      <button class="add-btn" @click="showAddModal = true">+ Add New</button>
    </div>

    <!-- Table -->
    <div class="table-wrap">
      <table class="data-table" v-if="filtered.length">
        <thead>
          <tr>
            <th>Category</th><th>Sub Category</th><th>Firm Name</th>
            <th>Location</th><th>Status</th><th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in filtered" :key="i">
            <td>{{ row.category }}</td>
            <td>{{ row.subCategory }}</td>
            <td>{{ row.firmName }}</td>
            <td>{{ row.city }}</td>
            <td><span class="status-pill" :class="row.status === 'Active' ? 'active' : 'inactive'">{{ row.status }}</span></td>
            <td><button class="del-btn" @click="deleteRow(i)">Delete</button></td>
          </tr>
        </tbody>
      </table>
      <div v-else class="empty-state">
        <div class="empty-icon">📋</div>
        <p>No records found!</p>
      </div>
    </div>
  </div>

  <!-- Add Modal -->
  <div class="modal-overlay" :class="{ open: showAddModal }" @click.self="showAddModal = false">
    <div class="modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-title">Add Interested Product</div>

      <div class="form-row">
        <div class="field">
          <label class="lbl">Country</label>
          <select class="inp inp-no-ico" v-model="form.country">
            <option value="">Select Country</option>
            <option v-for="c in countries" :key="c">{{ c }}</option>
          </select>
        </div>
        <div class="field">
          <label class="lbl">State</label>
          <select class="inp inp-no-ico" v-model="form.state">
            <option value="">Select State</option>
            <option v-for="s in indianStates" :key="s">{{ s }}</option>
          </select>
        </div>
      </div>
      <div class="field">
        <label class="lbl">City</label>
        <select class="inp inp-no-ico" v-model="form.city">
          <option value="">Select City</option>
          <option v-for="c in indianCities" :key="c">{{ c }}</option>
        </select>
      </div>
      <div class="field">
        <label class="lbl">Firm Name</label>
        <input class="inp inp-no-ico" v-model="form.firmName" placeholder="Enter firm name" />
      </div>
      <div class="form-row">
        <div class="field">
          <label class="lbl">Category</label>
          <select class="inp inp-no-ico" v-model="form.category">
            <option value="">Select Category</option>
            <option v-for="c in categories" :key="c">{{ c }}</option>
          </select>
        </div>
        <div class="field">
          <label class="lbl">Sub Category (Optional)</label>
          <input class="inp inp-no-ico" v-model="form.subCategory" placeholder="Sub category" />
        </div>
      </div>

      <div class="modal-btns">
        <button class="btn btn-teal btn-sm" @click="addRecord">save</button>
        <button class="btn btn-sm" style="background:#e5e7eb;color:#374151;" @click="showAddModal = false">Cancel</button>
      </div>
    </div>
  </div>

  <div class="toast" :class="{ show: toastVisible }">{{ toastMsg }}</div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const search = ref('')
const perPage = ref(15)
const showAddModal = ref(false)
const toastVisible = ref(false)
const toastMsg = ref('')

const records = ref([])

const form = reactive({ country: 'India', state: '', city: '', firmName: '', category: '', subCategory: '', status: 'Active' })

const categories = [
  'Agriculture Food Fmcg', 'Beauty Personal Care Wellness', 'Construction, Electrical, Electricals',
  'Electronics Kitchen Appliances', 'Handicrafts Gift Products', 'Healthcare Pharma',
  'Home Interior Exterior Decor', 'Chemicals Raw Materials', 'Logistics',
  'Metals Alloys Mineral Products', 'Packaging', 'Polymers Plastics Rubber Products',
  'Power Thermal Etc', 'Renewal Energy', 'Stationery Office Supplies', 'Textiles', 'Automotive Mobility'
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

const countries = [
  'India','Afghanistan','Albania','Algeria','Argentina','Australia','Austria','Bangladesh','Belgium',
  'Brazil','Canada','Chile','China','Colombia','Denmark','Egypt','Finland','France','Germany','Ghana',
  'Greece','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Japan','Jordan','Kenya','Malaysia',
  'Mexico','Morocco','Netherlands','New Zealand','Nigeria','Norway','Pakistan','Philippines','Poland',
  'Portugal','Romania','Russia','Saudi Arabia','Singapore','South Africa','South Korea','Spain',
  'Sri Lanka','Sweden','Switzerland','Thailand','Turkey','UAE','UK','USA','Vietnam','Zimbabwe'
]

const filtered = computed(() => {
  const q = search.value.toLowerCase()
  return records.value.filter(r =>
    !q || r.firmName.toLowerCase().includes(q) || r.category.toLowerCase().includes(q) || r.city.toLowerCase().includes(q)
  )
})

function addRecord() {
  if (!form.firmName || !form.category) { showToast('Fill required fields'); return }
  records.value.push({ ...form })
  Object.assign(form, { country: 'India', state: '', city: '', firmName: '', category: '', subCategory: '', status: 'Active' })
  showAddModal.value = false
  showToast('Record added!')
}

function deleteRow(i) {
  records.value.splice(i, 1)
  showToast('Deleted')
}

function showToast(msg) {
  toastMsg.value = msg
  toastVisible.value = true
  setTimeout(() => toastVisible.value = false, 2500)
}
</script>

<style scoped>
.ctrl-row { display:flex; align-items:center; gap:8px; margin-bottom:14px; flex-wrap:wrap; }
.show-wrap { display:flex; align-items:center; gap:6px; font-size:12px; color:var(--muted); }
.ctrl-select { border:1.5px solid var(--border); border-radius:8px; padding:4px 8px; font-size:12px; }
.add-btn { background:var(--teal); color:#fff; border:none; border-radius:10px; padding:8px 14px; font-size:12px; font-weight:700; cursor:pointer; white-space:nowrap; }
.table-wrap { overflow-x:auto; }
.data-table { width:100%; border-collapse:collapse; font-size:12px; }
.data-table th { background:#f8fafc; padding:10px 8px; text-align:left; font-weight:700; color:var(--muted); border-bottom:2px solid var(--border); white-space:nowrap; }
.data-table td { padding:10px 8px; border-bottom:1px solid var(--border); color:var(--text); vertical-align:middle; }
.status-pill { display:inline-block; padding:3px 10px; border-radius:20px; font-size:10px; font-weight:700; }
.status-pill.active { background:#dcfce7; color:#16a34a; }
.status-pill.inactive { background:#fee2e2; color:#dc2626; }
.del-btn { background:#fee2e2; color:#dc2626; border:none; border-radius:8px; padding:4px 10px; font-size:11px; font-weight:700; cursor:pointer; }
.empty-state { text-align:center; padding:40px 20px; color:var(--muted); }
.empty-icon { font-size:40px; margin-bottom:10px; }
.empty-state p { font-size:14px; font-weight:600; }
.modal-btns { display:flex; gap:8px; margin-top:16px; }
.toast { position:fixed; bottom:90px; left:50%; transform:translateX(-50%) translateY(10px); background:var(--navy); color:#fff; padding:10px 20px; border-radius:20px; font-size:13px; font-weight:600; z-index:999; pointer-events:none; opacity:0; transition:all .25s; white-space:nowrap; }
.toast.show { opacity:1; transform:translateX(-50%) translateY(0); }
</style>
