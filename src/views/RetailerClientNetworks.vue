<template>
  <div class="topbar anim">
    <button @click="$router.back()" class="back-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
    <div class="top-title">Client Networks</div>
    <div style="width:32px;"></div>
  </div>

  <div class="hero anim" style="padding:24px 22px 50px;">
    <div class="hero-inner">
      <h1 class="hero-title" style="font-size:24px;">Business <span class="accent">Network</span></h1>
      <p class="hero-sub">Manage your client relationships and ranges.</p>
    </div>
  </div>

  <div class="sheet anim">
    <div class="flex-row-between mb-20">
      <h3 class="section-title">Client Networks</h3>
      <button class="btn btn-teal btn-sm" @click="$router.push('/retailer/client-networks/add')">Add New</button>
    </div>

    <div class="controls-row mb-20">
      <div class="show-wrap">
        <span class="ctrl-lbl">Show</span>
        <select class="ctrl-sel" v-model="showCount">
          <option value="15">15</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>

      <div class="search-wrap">
        <span class="ctrl-lbl">Search:</span>
        <input type="text" class="ctrl-inp" v-model="searchQuery">
      </div>
    </div>

    <div class="network-table">
      <div class="table-header">
        <div class="th-cell sortable">
          Client Type
          <span class="sort-ico">↕️</span>
        </div>
        <div class="th-cell sortable">
          Quantity Range
          <span class="sort-ico">↕️</span>
        </div>
        <div class="th-cell sortable">
          Options
          <span class="sort-ico">↕️</span>
        </div>
      </div>

      <div v-if="records.length === 0" class="zero-state-bar">
        No records found!
      </div>
      <div v-else class="table-body">
         <div v-for="(record, i) in records" :key="i" class="tr-row">
           <div class="td-cell">{{ record.type }}</div>
           <div class="td-cell">{{ record.quantity }}</div>
           <div class="td-cell">{{ record.options }}</div>
         </div>
      </div>
    </div>

    <div class="pagination-wrap mt-20">
      <div class="pagi-group">
        <button class="pagi-btn" disabled>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button class="pagi-btn" disabled>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>

    <div style="height: 40px;"></div>

    <div class="toast" :class="{ show: toastVisible }">{{ toastMessage }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showCount = ref(15)
const searchQuery = ref('')
const records = ref([])
const toastVisible = ref(false)
const toastMessage = ref('')

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2500)
}
</script>

<style scoped>
.section-title { font-size: 16px; font-weight: 800; color: var(--navy); margin: 0; }
.flex-row-between { display: flex; align-items: center; justify-content: space-between; gap: 12px; }

.controls-row { display: flex; flex-direction: column; gap: 16px; align-items: flex-start; }
.ctrl-lbl { font-size: 13px; font-weight: 700; color: var(--navy); margin-right: 8px; }
.ctrl-sel { padding: 6px 12px; border: 1.5px solid var(--border); border-radius: 8px; font-size: 13px; color: var(--text); background: #fff; width: 70px; }
.ctrl-inp { padding: 6px 12px; border: 1.5px solid var(--border); border-radius: 8px; font-size: 13px; color: var(--text); background: #fff; width: 140px; }

.table-header { display: grid; grid-template-columns: 1fr 1fr 1fr; border-bottom: 2px solid var(--border); padding-bottom: 12px; margin-bottom: 4px; }
.th-cell { font-size: 11px; font-weight: 800; color: var(--navy); display: flex; align-items: center; gap: 4px; text-transform: uppercase; }
.sort-ico { font-size: 10px; opacity: 0.3; }

.zero-state-bar { 
  background: #f8fafc; color: var(--muted); text-align: center; 
  padding: 16px; border-radius: 8px; font-size: 13px; font-weight: 500;
  border: 1px dashed var(--border); margin-top: 4px;
}

.table-body { border-top: 1px solid var(--border); }
.tr-row { display: grid; grid-template-columns: 1fr 1fr 1fr; padding: 12px 0; border-bottom: 1px solid var(--border); }
.td-cell { font-size: 13px; color: var(--text); }

.pagination-wrap { display: flex; justify-content: flex-end; }
.pagi-group { display: flex; border: 1.5px solid var(--border); border-radius: 8px; overflow: hidden; }
.pagi-btn { background: #fff; border: none; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--muted); }
.pagi-btn:not(:last-child) { border-right: 1.5px solid var(--border); }
.pagi-btn svg { width: 16px; height: 16px; }
.pagi-btn:disabled { opacity: 0.3; cursor: not-allowed; }

@media (/* min-width removed for mobile layout */ justify-content: space-between; align-items: center; width: 100%; }
  .search-wrap { display: flex; align-items: center; }
}

.btn-sm { height: 32px; padding: 0 16px; font-size: 12px; font-weight: 700; border-radius: 8px; }
.btn-teal { background: var(--teal); color: #fff; border: none; }
</style>
