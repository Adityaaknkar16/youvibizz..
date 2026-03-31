<template>

      <!-- Topbar -->
      <div class="topbar anim">
        <button @click="$router.back()" class="back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <div class="top-title">Add Client Network
        <div style="width:32px;">

        <!-- Hero Summary -->
        <div class="hero anim" style="padding:24px 22px 50px;">
          <div class="hero-inner">
            <h1 class="hero-title" style="font-size:24px;">New <span class="accent">Client</span></h1>
            <p class="hero-sub">Define the relationship and volume range.</p>

        <div class="sheet anim">
          <div class="form-container">
            
            <!-- Client Type -->
            <div class="field">
              <label class="lbl">Client Type *</label>
              <div class="inp-wrap">
                <select class="inp" v-model="form.clientType">
                  <option value="">Select</option>
                  <option v-for="t in clientTypes" :key="t" :value="t">{{ t }}</option>
                </select>
                <div class="sel-arr">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>

            <!-- Quantity Range -->
            <div class="field">
              <label class="lbl">Quantity Range *</label>
              <div class="inp-wrap">
                <select class="inp" v-model="form.quantityRange">
                  <option value="">Select</option>
                  <option v-for="q in quantityRanges" :key="q" :value="q">{{ q }}</option>
                </select>
                <div class="sel-arr">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>

            <!-- Actions -->
            <div class="form-actions mt-32">
              <button class="btn btn-teal" @click="saveClient" :disabled="loading" style="flex:1;">
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
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)
const toastVisible = ref(false)
const toastMessage = ref('')

const form = ref({
  clientType: '',
  quantityRange: ''
})

const clientTypes = [
  'Dealers',
  'Direct Customers',
  'Influencers',
  'Corporates'
]

const quantityRanges = [
  '0-50',
  '50-100',
  '100-200',
  '200-300',
  '300 & Above'
]

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2500)
}

function saveClient() {
  if (!form.value.clientType || !form.value.quantityRange) {
    showToast('Please fill all required fields')
    return
  }
  
  loading.value = true
  setTimeout(() => {
    loading.value = false
    showToast('Client network added successfully!')
    // In a real app we'd navigate back: router.back()
  }, 1200)
}
</script>

<style scoped>
.field { margin-bottom: 24px; }
.lbl { display: block; font-size: 13px; font-weight: 700; color: var(--navy); margin-bottom: 8px; }
.inp-wrap { position: relative; }
.inp { width: 100%; border: 1.5px solid var(--border); border-radius: 12px; padding: 14px 16px; font-size: 14px; font-weight: 500; color: var(--text); background: #fff; transition: all 0.2s; }
.inp:focus { border-color: var(--teal); outline: none; box-shadow: 0 0 0 4px rgba(34,162,138,0.1); }
.inp-wrap select { appearance: none; -webkit-appearance: none; }
.sel-arr { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); pointer-events: none; color: var(--muted); }
.sel-arr svg { width: 18px; height: 18px; }

.btn-teal { background: var(--teal); color: #fff; border: none; font-weight: 700; }
.btn-outline { background: #f1f5f9; color: var(--navy); border: none; font-weight: 700; }
.btn-outline:hover { background: #e2e8f0; }

.mt-32 { margin-top: 32px; }
</style>
