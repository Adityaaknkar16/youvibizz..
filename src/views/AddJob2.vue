<template>
  <div class="topbar anim">
    <button @click="$router.push('/manufacturer/jobs')" class="back-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
    <div class="top-title">Add Job</div>
    <div style="width:32px;"></div>
  </div>

  <div class="sheet anim">
    <div class="form-container">
      <div class="field">
        <label class="lbl">Title *</label>
        <div class="inp-wrap">
          <input type="text" class="inp" v-model="form.title" placeholder="Job Title">
        </div>
      </div>

      <div class="field">
        <label class="lbl">Description *</label>
        <div class="inp-wrap">
          <textarea class="inp" v-model="form.description" placeholder="Short job description..."></textarea>
        </div>
      </div>

      <div class="field">
        <label class="lbl">Category *</label>
        <div class="inp-wrap">
          <select class="inp" v-model="form.category">
            <option value="">Select Category</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
      </div>

      <div class="field">
        <label class="lbl">Sub Category *</label>
        <div class="inp-wrap">
          <select class="inp" v-model="form.subCategory" :disabled="!form.category">
            <option value="">Select Sub Category</option>
            <option v-for="sub in subCategories" :key="sub" :value="sub">{{ sub }}</option>
          </select>
        </div>
      </div>

      <div class="field">
        <label class="lbl">Country *</label>
        <div class="inp-wrap">
          <select class="inp" v-model="form.country">
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="UAE">UAE</option>
          </select>
        </div>
      </div>

      <div class="field">
        <label class="lbl">State *</label>
        <div class="inp-wrap">
          <select class="inp" v-model="form.state">
            <option value="">Select State</option>
            <option v-for="st in states" :key="st" :value="st">{{ st }}</option>
          </select>
        </div>
      </div>

      <div class="field">
        <label class="lbl">City *</label>
        <div class="inp-wrap">
          <select class="inp" v-model="form.city" :disabled="!form.state">
            <option value="">Select City</option>
            <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
          </select>
        </div>
      </div>

      <div class="field" style="margin-top:20px;">
        <label class="check-pill" :class="{ checked: form.visibleToSelf }">
          <input type="checkbox" v-model="form.visibleToSelf" style="display:none;">
          <div class="check-box">
             <svg v-if="form.visibleToSelf" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
               <polyline points="20 6 9 17 4 12"></polyline>
             </svg>
          </div>
          <span>Visible to Self</span>
        </label>
      </div>

      <div class="form-actions mt-16">
        <button class="btn btn-teal" @click="saveJob" :disabled="loading">
          {{ loading ? 'Saving...' : 'Save' }}
        </button>
        <button class="btn btn-outline mt-12" @click="$router.back()">Cancel</button>
      </div>
    </div>
    
    <div class="toast" :class="{ show: toastVisible }">{{ toastMessage }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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

const categories = ['Manufacturing', 'Sales', 'Logistics', 'Marketing', 'Administration']
const subCategoriesMap = {
  'Manufacturing': ['Production', 'Quality Control', 'Maintenance'],
  'Sales': ['Direct Sales', 'Retail Sales', 'Export'],
  'Logistics': ['Warehousing', 'Inventory', 'Transport'],
  'Marketing': ['Branding', 'Digital Marketing', 'Events'],
  'Administration': ['HR', 'Accounts', 'Reception']
}

const subCategories = computed(() => subCategoriesMap[form.value.category] || [])

const states = ['Maharashtra', 'Gujarat', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Telangana']
const citiesMap = {
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara'],
  'Delhi': ['New Delhi', 'Rohini', 'Dwarka'],
  'Karnataka': ['Bangalore', 'Mysore', 'Hubli'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
  'Telangana': ['Hyderabad', 'Warangal']
}

const cities = computed(() => citiesMap[form.value.state] || [])

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2500)
}

function saveJob() {
  if (!form.value.title || !form.value.description) {
    showToast('Please fill all required fields')
    return
  }
  
  loading.value = true
  setTimeout(() => {
    loading.value = false
    showToast('Job posted successfully!')
    setTimeout(() => {
      router.push('/manufacturer/jobs')
    }, 1500)
  }, 1000)
}
</script>

<style scoped>
.form-container { padding-bottom: 20px; }
.check-pill { display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; border: none; background: transparent; padding: 0; }
.check-box { width: 22px; height: 22px; border: 2px solid var(--border); border-radius: 6px; background: #fff; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
.check-pill.checked .check-box { background: var(--teal); border-color: var(--teal); }
.check-box svg { width: 14px; height: 14px; color: #fff; }
.check-pill span { font-size: 14px; font-weight: 700; color: var(--navy); }
</style>
