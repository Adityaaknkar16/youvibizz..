<template>
  <div class="topbar">
    <button @click="$router.back()" class="back-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <span class="topbar-title">Company Portfolio</span>
  </div>

  <div class="sheet">
    <!-- Progress Tracker -->
    <div class="card p-16 mb-16">
      <div class="flex-between mb-8">
        <span class="lbl-sm">Complete Your Profile</span>
        <span class="pct">30%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 30%"></div>
      </div>
    </div>

    <!-- Business Profile -->
    <div class="sec-label">Business Information</div>
    <div class="card p-16">
      <div class="field">
        <label class="lbl">Industry / Sector</label>
        <select class="inp inp-no-ico" v-model="form.sector">
          <option value="">Select Industry</option>
          <option v-for="s in sectors" :key="s">{{ s }}</option>
        </select>
      </div>

      <div class="field">
        <label class="lbl">Business Model</label>
        <div class="check-grid">
          <label class="check-wrap" v-for="m in models" :key="m">
            <input type="checkbox" v-model="form.businessModel" :value="m" />
            <span>{{ m }}</span>
          </label>
        </div>
      </div>

      <div class="form-row">
        <div class="field">
          <label class="lbl">GST Number</label>
          <input class="inp inp-no-ico" v-model="form.gst" placeholder="GSTN..." />
        </div>
        <div class="field">
          <label class="lbl">Year of Incorporation</label>
          <input class="inp inp-no-ico" v-model="form.year" placeholder="YYYY" />
        </div>
      </div>

      <div class="field">
        <label class="lbl">Owner Name</label>
        <input class="inp inp-no-ico" v-model="form.owner" placeholder="Full name of the owner" />
      </div>

      <div class="form-row">
        <div class="field">
          <label class="lbl">Contact Number</label>
          <input class="inp inp-no-ico" v-model="form.contact" placeholder="+91..." />
        </div>
        <div class="field">
          <label class="lbl">Official Email-ID</label>
          <input class="inp inp-no-ico" v-model="form.email" placeholder="email@company.com" />
        </div>
      </div>
    </div>

    <!-- Location & Scale -->
    <div class="sec-label mt-16">Location & Scalability</div>
    <div class="card p-16">
      <div class="form-row">
        <div class="field">
          <label class="lbl">Total Godowns</label>
          <input class="inp inp-no-ico" v-model="form.godowns" placeholder="0" />
        </div>
        <div class="field">
          <label class="lbl">Total Godown Area (in SFT)</label>
          <input class="inp inp-no-ico" v-model="form.area" placeholder="e.g. 5000" />
        </div>
      </div>

      <div class="field">
        <label class="lbl">Registered Address</label>
        <textarea class="inp inp-no-ico" v-model="form.address" rows="3" placeholder="Full business address..."></textarea>
      </div>

      <div class="form-row">
        <div class="field">
          <label class="lbl">Number of Employees</label>
          <input class="inp inp-no-ico" v-model="form.employees" placeholder="0" />
        </div>
        <div class="field">
          <label class="lbl">Avg. Turnover (Cr / Month)</label>
          <input class="inp inp-no-ico" v-model="form.turnover" placeholder="0.0" />
        </div>
      </div>

      <div class="field">
        <label class="lbl">Website Link</label>
        <input class="inp inp-no-ico" v-model="form.website" placeholder="https://www.yourcompany.com" />
      </div>
    </div>

    <button class="btn btn-teal w-full mt-16" @click="saveProfile">Save Changes</button>
  </div>

  <div class="toast" :class="{ show: toastVisible }">{{ toastMsg }}</div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const toastVisible = ref(false)
const toastMsg = ref('')

const form = reactive({
  sector: '',
  businessModel: [],
  gst: '',
  year: '',
  owner: '',
  contact: '',
  email: '',
  godowns: '',
  area: '',
  address: '',
  employees: '',
  turnover: '',
  website: ''
})

const sectors = ['Agriculture', 'Construction', 'FMCG', 'Electronics', 'Healthcare', 'Home Decor', 'Logistics']
const models = ['Distributor', 'Wholesaler', 'Wholesale Market', 'Retailer']

function saveProfile() {
  showToast('Profile updated & saved!')
}

function showToast(msg) {
  toastMsg.value = msg
  toastVisible.value = true
  setTimeout(() => toastVisible.value = false, 2500)
}
</script>

<style scoped>
.p-16 { padding: 16px; }
.mb-16 { margin-bottom: 16px; }
.mt-16 { margin-top: 16px; }
.mb-8 { margin-bottom: 8px; }
.flex-between { display: flex; align-items: center; justify-content: space-between; }
.lbl-sm { font-size: 13px; font-weight: 700; color: var(--navy); }
.pct { font-size: 14px; font-weight: 800; color: #f59e0b; }
.progress-bar { height: 8px; background: #fee2e2; border-radius: 4px; overflow: hidden; }
.progress-fill { height: 100%; background: linear-gradient(90deg, #f97316, #fbbf24); border-radius: 4px; }
.check-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 8px; }
.check-wrap { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: var(--text); }
.toast { position:fixed; bottom:90px; left:50%; transform:translateX(-50%) translateY(10px); background:var(--navy); color:#fff; padding:10px 20px; border-radius:20px; font-size:13px; font-weight:600; z-index:999; pointer-events:none; opacity:0; transition:all .25s; white-space:nowrap; }
.toast.show { opacity:1; transform:translateX(-50%) translateY(0); }
</style>
