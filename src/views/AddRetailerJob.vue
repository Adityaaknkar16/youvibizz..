<template>

      <!-- Topbar -->
      <div class="topbar anim">
        <button @click="$router.back()" class="back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <div class="top-title">Add Job
        <div style="width:32px;">

        <div class="sheet anim">
          <div class="form-container">
            <!-- Title -->
            <div class="field">
              <label class="lbl">Title *</label>
              <div class="inp-wrap">
                <input type="text" class="inp" v-model="form.title" placeholder="Job Title">

            <!-- Description -->
            <div class="field">
              <label class="lbl">Description *</label>
              <div class="inp-wrap">
                <textarea class="inp" v-model="form.description" placeholder="Job Description" style="height: 120px;"></textarea>

            <!-- Category -->
            <div class="field">
              <label class="lbl">Category *</label>
              <div class="inp-wrap">
                <select class="inp" v-model="form.category">
                  <option value="">Select</option>
                  <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
                </select>
                <div class="sel-arr">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>

            <!-- Sub Category -->
            <div class="field">
              <label class="lbl">Sub Category *</label>
              <div class="inp-wrap">
                <select class="inp" v-model="form.subCategory">
                  <option value="">Select</option>
                  <option value="General">General</option>
                  <option value="Technical">Technical</option>
                </select>
                <div class="sel-arr">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>

            <!-- Country -->
            <div class="field">
              <label class="lbl">Country *</label>
              <div class="inp-wrap">
                <select class="inp" v-model="form.country">
                  <option value="India">India</option>
                </select>
                <div class="sel-arr">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>

            <!-- State -->
            <div class="field">
              <label class="lbl">State *</label>
              <div class="inp-wrap">
                <select class="inp" v-model="form.state">
                  <option value="">State</option>
                  <option v-for="s in states" :key="s" :value="s">{{ s }}</option>
                </select>
                <div class="sel-arr">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>

            <!-- City -->
            <div class="field">
              <label class="lbl">City *</label>
              <div class="inp-wrap">
                <select class="inp" v-model="form.city">
                  <option value="">Select City</option>
                  <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
                </select>
                <div class="sel-arr">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>

            <!-- Visible to Self -->
            <label class="chk-row">
              <input type="checkbox" v-model="form.visibleToSelf">
              <span class="chk-box"><svg v-if="form.visibleToSelf" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></span>
              <span class="chk-lbl">Visible to Self</span>
            </label>

            <!-- Actions -->
            <div class="form-actions mt-24">
              <button class="btn btn-teal" @click="saveJob" :disabled="loading" style="flex:1;">
                {{ loading ? 'Saving...' : 'save' }}
              </button>
              <button class="btn btn-outline" @click="$router.back()" style="flex:1;">
                Cancel
              </button>

        <!-- /.form-container -->
      <!-- /.sheet -->
    <!-- /.app -->

      <!-- Toast -->
      <div class="toast" :class="{ show: toastVisible }">{{ toastMessage }}


  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)
const toastVisible = ref(false)
const toastMessage = ref('')

const form = ref({
  title: '',
  description: '',
  category: '',
  subCategory: '',
  country: 'India',
  state: '',
  city: '',
  visibleToSelf: true
})

const categories = [
  'Agriculture Food Fmcg',
  'Beauty Personal Care Wellness',
  'Construction',
  'Electrical',
  'Electronics Kitchen Appliances',
  'Handicrafts Gift Products',
  'Healthcare Pharma',
  'Home Interior Exterior Decor',
  'Chemicals Raw Materials',
  'Logistics',
  'Metals Alloys Mineral Products',
  'Packaging',
  'Polymers Plastics Rubber Products',
  'Power Thermal Etc',
  'Renewal Energy',
  'Stationery Office Supplies',
  'Textiles'
]

const states = ['Maharashtra', 'Gujarat', 'Delhi', 'Karnataka']
const cities = ['Mumbai', 'Pune', 'Ahmedabad', 'Bangalore']

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2500)
}

function saveJob() {
  if (!form.value.title || !form.value.description || !form.value.category) {
    showToast('Please fill all required fields')
    return
  }
  
  loading.value = true
  setTimeout(() => {
    loading.value = false
    showToast('Job saved successfully!')
  }, 1200)
}
</script>

<style scoped>
.field { margin-bottom: 20px; }
.lbl { display: block; font-size: 13px; font-weight: 700; color: var(--navy); margin-bottom: 8px; }
.inp-wrap { position: relative; }
.inp { width: 100%; border: 1.5px solid var(--border); border-radius: 12px; padding: 14px 16px; font-size: 14px; font-weight: 500; color: var(--text); background: #fff; transition: all 0.2s; }
.inp:focus { border-color: var(--teal); outline: none; box-shadow: 0 0 0 4px rgba(34,162,138,0.1); }
.inp-wrap select { appearance: none; -webkit-appearance: none; }
.sel-arr { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); pointer-events: none; color: var(--muted); }
.sel-arr svg { width: 18px; height: 18px; }

.chk-row { display: flex; align-items: center; gap: 10px; cursor: pointer; margin-top: 10px; }
.chk-row input { display: none; }
.chk-box { width: 20px; height: 20px; border: 2px solid var(--border); border-radius: 4px; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
.chk-row input:checked + .chk-box { background: #e11d48; border-color: #e11d48; } /* Matching the red check in image */
.chk-lbl { font-size: 14px; font-weight: 700; color: var(--navy); }

.btn-outline { background: #f1f5f9; color: var(--navy); border: none; font-weight: 700; }
.btn-outline:hover { background: #e2e8f0; }

.btn-teal { background: var(--teal); color: #fff; font-weight: 700; border: none; }
.btn-teal:hover { opacity: 0.9; }
</style>
