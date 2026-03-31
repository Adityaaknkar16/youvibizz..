<template>
  <div class="topbar anim">
    <button @click="$router.back()" class="back-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
    <div class="top-title">All Enquiries</div>
    <div style="width:32px;"></div>
  </div>

  <div class="hero anim" style="padding:24px 22px 50px;">
    <div class="hero-inner">
      <h1 class="hero-title" style="font-size:24px;">Message <span class="accent">Center</span></h1>
      <p class="hero-sub">Manage and track all business enquiries.</p>
    </div>
  </div>

  <div class="sheet anim">
    <div class="search-section">
      <div class="filter-row">
        <div class="search-wrap">
          <svg class="search-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" class="search-inp" placeholder="Search name, email, company" v-model="searchQuery">
        </div>

        <div class="select-wrap">
          <select class="search-inp" v-model="filterType">
            <option value="Enquiries">Enquiries</option>
            <option value="Requirements">Requirements</option>
          </select>
          <div class="sel-arr">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>

        <button class="filter-btn">Filter</button>
      </div>
    </div>

    <div class="enquiry-list mt-20">
      <div class="table-labels">
        <span>Type</span>
        <span>Name</span>
        <span>Company</span>
        <span>Date</span>
      </div>

      <div v-if="enquiries.length === 0" class="zero-state-bar">
        No enquiries found
      </div>
      <div v-else class="data-list">
        <div v-for="(item, i) in enquiries" :key="i" class="enquiry-card">
           <!-- card content here -->
        </div>
      </div>
    </div>

    <div style="height: 40px;"></div>

    <div class="toast" :class="{ show: toastVisible }">{{ toastMessage }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const filterType = ref('Enquiries')
const enquiries = ref([])
const toastVisible = ref(false)
const toastMessage = ref('')

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2500)
}
</script>

<style scoped>
.search-section { margin-bottom: 24px; }
.filter-row { display: flex; flex-direction: column; gap: 12px; }

.search-wrap { position: relative; flex: 1; }
.search-ico { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: var(--muted); }
.search-inp { width: 100%; border: 1.5px solid var(--border); border-radius: 12px; padding: 12px 16px 12px 40px; font-size: 14px; color: var(--text); background: #fff; transition: all 0.2s; }
.search-inp:focus { border-color: var(--teal); outline: none; }

.select-wrap { position: relative; }
.select-wrap .search-inp { padding-left: 16px; appearance: none; -webkit-appearance: none; }
.sel-arr { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); pointer-events: none; color: var(--muted); }
.sel-arr svg { width: 16px; height: 16px; }

.filter-btn { 
  background: #007bff; color: #fff; border: none; border-radius: 8px; 
  padding: 12px; font-size: 14px; font-weight: 700; width: 100%; cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,123,255,0.25);
}

.table-labels { display: flex; justify-content: space-between; padding: 0 10px 12px; border-bottom: 1.5px solid var(--border); margin-bottom: 8px; }
.table-labels span { font-size: 11px; font-weight: 800; color: var(--navy); text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.8; }

.zero-state-bar { 
  background: #f8fafc; color: var(--muted); text-align: center; 
  padding: 12px; border-radius: 8px; font-size: 13px; font-weight: 500;
  border: 1px dashed var(--border); margin-top: 10px;
}

@media (/* min-width removed for mobile layout */ align-items: center; }
  .filter-btn { width: auto; padding: 12px 24px; }
}
</style>
