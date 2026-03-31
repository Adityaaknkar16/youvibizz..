<template>
  <div class="topbar">
    <button @click="$router.back()" class="back-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <span class="topbar-title">Enquiry Received</span>
    <button class="topbar-icon-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg></button>
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
    </div>

    <!-- Table -->
    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>Sender Name</th><th>Email</th><th>Phone</th><th>Description</th><th>Date</th><th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(enquiry, i) in filtered" :key="i">
            <td style="font-weight:700;color:var(--navy);">{{ enquiry.name }}</td>
            <td>{{ enquiry.email }}</td>
            <td>{{ enquiry.phone }}</td>
            <td style="max-width:150px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ enquiry.desc }}</td>
            <td>{{ enquiry.date }}</td>
            <td class="opt-col">
              <div style="display:flex;gap:6px;">
                <button class="opt-btn reply" @click="showToast('Viewing Enquiry...')">View Enquiry</button>
                <button class="opt-btn reply" @click="showToast('Opening Reply Box...')">Reply</button>
                <button class="opt-btn del" @click="deleteRow(i)">Delete</button>
              </div>
            </td>
          </tr>
          <tr v-if="filtered.length === 0">
            <td colspan="6" class="empty-cell">No records found!</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="toast" :class="{ show: toastVisible }">{{ toastMsg }}</div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const perPage = ref(15)
const toastVisible = ref(false)
const toastMsg = ref('')

const enquiries = ref([
  { name: 'Deepak', email: 'deepak@example.com', phone: '+91 9876543210', desc: 'Looking for distributor in Maharashtra region.', date: '31 Mar 2026' },
  { name: 'Rajesh Textiles', email: 'rajesh@textiles.in', phone: '+91 9988776655', desc: 'Interested in bulk orders for home decor.', date: '30 Mar 2026' }
])

const filtered = computed(() => {
  const q = search.value.toLowerCase()
  return enquiries.value.filter(e =>
    !q || e.name.toLowerCase().includes(q) || e.desc.toLowerCase().includes(q)
  )
})

function deleteRow(i) {
  enquiries.value.splice(i, 1)
  showToast('Deleted enquiry!')
}

function showToast(msg) {
  toastMsg.value = msg
  toastVisible.value = true
  setTimeout(() => toastVisible.value = false, 2500)
}
</script>

<style scoped>
.ctrl-row { display:flex; align-items:center; gap:8px; margin-bottom:14px; flex-wrap:nowrap; }
.show-wrap { display:flex; align-items:center; gap:4px; font-size:12px; color:var(--muted); }
.ctrl-select { border:1.5px solid var(--border); border-radius:6px; padding:3px 6px; font-size:11px; }
.search-bar { position:relative; display:flex; align-items:center; background:#f1f5f9; border-radius:10px; padding:0 12px; }
.search-bar svg { width:14px; height:14px; color:var(--muted); margin-right:8px; }
.search-bar input { border:none; background:none; font-size:12px; padding:8px 0; width:100%; outline:none; }

.table-wrap { overflow-x:auto; background:var(--card); border-radius:12px; border:1px solid var(--border); }
.data-table { width:100%; border-collapse:collapse; font-size:12px; }
.data-table th { background:#f8fafc; padding:12px 20px; text-align:left; font-weight:700; color:var(--muted); border-bottom:1.5px solid var(--border); white-space:nowrap; cursor:pointer; }
.data-table td { padding:12px 20px; border-bottom:1px solid var(--border); color:var(--text); white-space:nowrap; }
.empty-cell { text-align:center; padding:30px; color:var(--muted); font-size:13px; }

.opt-btn { border:none; border-radius:8px; padding:6px 12px; font-size:11px; font-weight:700; cursor:pointer; white-space:nowrap; }
.opt-btn.reply { background:#dcfce7; color:#16a34a; }
.opt-btn.del { background:#fee2e2; color:#dc2626; }

.toast { position:fixed; bottom:90px; left:50%; transform:translateX(-50%) translateY(10px); background:var(--navy); color:#fff; padding:10px 20px; border-radius:20px; font-size:13px; font-weight:600; z-index:999; pointer-events:none; opacity:0; transition:all .25s; white-space:nowrap; }
.toast.show { opacity:1; transform:translateX(-50%) translateY(0); }
</style>
