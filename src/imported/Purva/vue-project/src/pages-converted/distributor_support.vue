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
          <span class="topbar-title">Support to Distributors</span>
          <div></div>
        </div>

        <!-- Sheet -->
        <div class="sheet">
          <div class="card">
            <h3 class="sec-label">Type of Support to Distributors</h3>
            
            <div class="support-table">
              <div class="table-head">
                <span class="col-title">Title</span>
                <span class="col-action">Action</span>
              </div>
              
              <div v-for="support in supportList" :key="support.id" class="table-row">
                <input type="text" class="inp-static" :value="support.title" readonly>
                <div class="check-box">
                  <input type="checkbox" v-model="support.active">
                </div>
              </div>
            </div>

            <div class="mt-24">
              <label class="lbl">Add New Support *</label>
              <input type="text" class="inp inp-no-ico" v-model="newSupport" placeholder="Enter support type...">
              <button class="btn btn-teal btn-sm mt-12" @click="addSupport">
                + Add
              </button>
            </div>
          </div>
        </div>

      </div><!-- /app -->

      <BottomNav />

      <div class="toast" :class="{ show: !!toast }">{{ toast }}</div>

    </div><!-- /phone-screen -->
  </div><!-- /phone-frame -->
</template>

<script setup>
import { ref, reactive } from 'vue'
import BottomNav from '@/components/BottomNav.vue'

const toast = ref('')
const newSupport = ref('')

const supportList = reactive([
  { id: 1, title: 'Marketing Team', active: false },
  { id: 2, title: 'Branding Activity', active: false },
  { id: 3, title: 'Influencers Meet', active: false },
  { id: 4, title: 'Gift for Influencers and Dealers', active: false },
  { id: 5, title: 'Schemes', active: false },
  { id: 6, title: 'Stock Support', active: false }
])

function showToast(msg) {
  toast.value = msg
  setTimeout(() => toast.value = '', 2500)
}

function addSupport() {
  if (!newSupport.value) {
    showToast('Please enter support type')
    return
  }
  supportList.push({ id: Date.now(), title: newSupport.value, active: true })
  newSupport.value = ''
  showToast('Support type added!')
}
</script>

<style scoped>
.support-table { margin-top: 16px; border-radius: 8px; overflow: hidden; }
.table-head { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: transparent; border-bottom: 2px solid var(--border); }
.col-title { font-size: 11px; font-weight: 800; color: var(--navy); }
.col-action { font-size: 11px; font-weight: 800; color: var(--navy); }

.table-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border); }
.table-row:last-child { border-bottom: none; }
.inp-static { width: 85%; height: 40px; border-radius: 8px; border: 1px solid var(--border); background: #f8fafc; padding: 0 12px; font-size: 12px; font-weight: 600; color: var(--text); }
.check-box { width: 14px; height: 14px; border: 1.5px solid var(--border); border-radius: 3px; display: flex; align-items: center; justify-content: center; background: #fff; }
.check-box input { width: 100%; height: 100%; cursor: pointer; }

.mt-24 { margin-top: 24px; }
.mt-12 { margin-top: 12px; }
.w-full { width: 100%; }

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
