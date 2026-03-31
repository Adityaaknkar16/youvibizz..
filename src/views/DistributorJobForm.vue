<template>
  <div class="topbar">
    <button @click="$router.back()" class="back-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <span class="topbar-title">Post New Job</span>
  </div>

  <div class="sheet">
    <div class="field">
      <label class="lbl">Job Title</label>
      <input class="inp inp-no-ico" v-model="job.title" placeholder="e.g. Sales Executive" />
    </div>

    <div class="field">
      <label class="lbl">Description</label>
      <textarea class="inp inp-no-ico" v-model="job.description" rows="5" placeholder="Enter job responsibilities, requirements, etc."></textarea>
    </div>

    <div class="form-row">
      <div class="field">
        <label class="lbl">Category</label>
        <select class="inp inp-no-ico" v-model="job.category">
          <option value="">Select Category</option>
          <option v-for="c in categories" :key="c">{{ c }}</option>
        </select>
      </div>
      <div class="field">
        <label class="lbl">Sub Category (Optional)</label>
        <input class="inp inp-no-ico" v-model="job.subCategory" placeholder="Sub category" />
      </div>
    </div>

    <div class="form-row">
      <div class="field">
        <label class="lbl">Country</label>
        <select class="inp inp-no-ico" v-model="job.country">
          <option v-for="c in countries" :key="c">{{ c }}</option>
        </select>
      </div>
      <div class="field">
        <label class="lbl">State</label>
        <select class="inp inp-no-ico" v-model="job.state">
          <option value="">Select State</option>
          <option v-for="s in indianStates" :key="s">{{ s }}</option>
        </select>
      </div>
    </div>

    <div class="field">
      <label class="lbl">City</label>
      <select class="inp inp-no-ico" v-model="job.city">
        <option value="">Select City</option>
        <option v-for="c in indianCities" :key="c">{{ c }}</option>
      </select>
    </div>

    <div class="field flex-row" style="margin-top: 10px;">
      <input type="checkbox" id="visible-self" v-model="job.visibleToSelf" />
      <label for="visible-self" style="font-size: 13px; font-weight: 600; color: var(--text);">Visible to Self</label>
    </div>

    <div class="form-actions" style="margin-top: 24px;">
      <button class="btn btn-teal w-full mb-8" @click="saveJob" :disabled="loading">
        {{ loading ? 'Saving...' : 'save' }}
      </button>
      <button class="btn w-full" style="background:#e5e7eb;color:#374151;" @click="$router.back()">Cancel</button>
    </div>
  </div>

  <div class="toast" :class="{ show: toastVisible }">{{ toastMsg }}</div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const toastVisible = ref(false)
const toastMsg = ref('')

const job = reactive({
  title: '',
  description: '',
  category: '',
  subCategory: '',
  country: 'India',
  state: '',
  city: '',
  visibleToSelf: false
})

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

const countries = ['India', 'USA', 'UK', 'Canada', 'Australia', 'UAE', 'Singapore'] // Shortened for form as requested

function saveJob() {
  if (!job.title || !job.category || !job.city) {
    showToast('Please fill required fields')
    return
  }
  loading.value = true
  setTimeout(() => {
    loading.value = false
    showToast('Job posted successfully!')
    setTimeout(() => router.back(), 1500)
  }, 1000)
}

function showToast(msg) {
  toastMsg.value = msg
  toastVisible.value = true
  setTimeout(() => toastVisible.value = false, 2500)
}
</script>

<style scoped>
.flex-row { display: flex; align-items: center; gap: 10px; }
.mb-8 { margin-bottom: 8px; }
.w-full { width: 100%; }
.toast { position:fixed; bottom:90px; left:50%; transform:translateX(-50%) translateY(10px); background:var(--navy); color:#fff; padding:10px 20px; border-radius:20px; font-size:13px; font-weight:600; z-index:999; pointer-events:none; opacity:0; transition:all .25s; white-space:nowrap; }
.toast.show { opacity:1; transform:translateX(-50%) translateY(0); }
</style>
