<template>
  <!-- Top Bar -->
  <div class="topbar">
    <RouterLink to="/manufacturer/profile" class="back-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
    </RouterLink>
    <span class="topbar-title">Company Profile</span>
    <div class="topbar-actions">
      <div style="width:36px;"></div>
    </div>
  </div>

  <div class="sheet">
    <!-- Profile Progress -->
    <div class="form-section">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-size:12px; font-weight:700; color:var(--navy);">Complete Your Profile</span>
        <span style="font-size:12px; font-weight:800; color:var(--teal);">18%</span>
      </div>
      <div style="height:6px; background:#e2e8f0; border-radius:3px; overflow:hidden; margin-bottom:20px;">
        <div style="width:18%; height:100%; background:linear-gradient(90deg, #f59e0b, #fbbf24); border-radius:3px;"></div>
      </div>
    </div>

    <form @submit.prevent="saveChanges">
      <!-- Role -->
      <div class="field">
        <label class="lbl">Role</label>
        <input type="text" class="inp" value="Manufacturer / Importer" disabled>
      </div>

      <div class="section-title">Manufacturer / Importer Profile</div>

      <!-- Industry / Sector -->
      <div class="field">
        <label class="lbl">Industry / Sector *</label>
        <input type="text" class="inp" value="Home Interior & Exterior Décor" disabled>
      </div>

      <!-- Person Role -->
      <div class="field">
        <label class="lbl">Person Role *</label>
        <div class="inp-wrap">
          <select class="inp" v-model="form.personRole">
            <option value="Owner">Owner</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
          </select>
        </div>
      </div>

      <!-- Country -->
      <div class="field">
        <label class="lbl">Country *</label>
        <div class="inp-wrap">
          <select class="inp" v-model="form.country">
            <option value="">Select country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </select>
        </div>
      </div>

      <!-- Business Model -->
      <div class="field">
        <label class="lbl">Business Model *</label>
        <div class="checkbox-group">
          <label class="check-pill" :class="{ checked: form.businessModel.includes('Manufacturing') }">
            <input type="checkbox" value="Manufacturing" v-model="form.businessModel" style="display:none;"> Manufacturing
          </label>
          <label class="check-pill" :class="{ checked: form.businessModel.includes('Outsourcing') }">
            <input type="checkbox" value="Outsourcing" v-model="form.businessModel" style="display:none;"> Outsourcing
          </label>
          <label class="check-pill" :class="{ checked: form.businessModel.includes('Importer') }">
            <input type="checkbox" value="Importer" v-model="form.businessModel" style="display:none;"> Importer
          </label>
        </div>
      </div>

      <!-- Company Name -->
      <div class="field">
        <label class="lbl">Company Name *</label>
        <input type="text" class="inp" v-model="form.companyName" placeholder="Enter company name">
      </div>

      <!-- Year of Incorporation -->
      <div class="field">
        <label class="lbl">Year of Incorporation *</label>
        <div class="inp-wrap">
          <select class="inp" v-model="form.incorporationYear">
            <option value="">Select Year</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
      </div>

      <!-- Type of Company -->
      <div class="field">
        <label class="lbl">Type of Company *</label>
        <div class="inp-wrap">
          <select class="inp" v-model="form.companyType">
            <option value="Proprietor">Proprietor</option>
            <option value="Partnership">Partnership</option>
            <option value="Private Limited">Private Limited</option>
          </select>
        </div>
      </div>

      <!-- Owner Name -->
      <div class="field">
        <label class="lbl">Owner Name *</label>
        <input type="text" class="inp" v-model="form.ownerName" placeholder="Enter owner name">
      </div>

      <!-- Other Directors -->
      <div class="field">
        <label class="lbl">Other Directors</label>
        <input type="text" class="inp" v-model="form.otherDirectors" placeholder="Enter other directors">
      </div>

      <!-- GST Number -->
      <div class="field">
        <label class="lbl">GST Number *</label>
        <input type="text" class="inp" v-model="form.gstNumber" placeholder="Enter GST number">
      </div>

      <div class="section-title">Address Details</div>

      <!-- Head Office Location -->
      <div class="form-row">
        <div class="field">
          <label class="lbl">Head Office Country *</label>
          <select class="inp" v-model="form.hoCountry">
            <option value="">Select country</option>
            <option value="India">India</option>
          </select>
        </div>
        <div class="field">
          <label class="lbl">Head Office State *</label>
          <select class="inp" v-model="form.hoState">
            <option value="">Select state</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi">Delhi</option>
            <option value="Gujarat">Gujarat</option>
          </select>
        </div>
      </div>

      <div class="field">
        <label class="lbl">Head Office City *</label>
        <select class="inp" v-model="form.hoCity">
          <option value="">Select city</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
        </select>
      </div>

      <!-- Manufacturing Unit Location -->
      <div class="form-row">
        <div class="field">
          <label class="lbl">Manufacturing Unit Country *</label>
          <select class="inp" v-model="form.mfgCountry">
            <option value="">Select country</option>
            <option value="India">India</option>
          </select>
        </div>
        <div class="field">
          <label class="lbl">Manufacturing Unit State *</label>
          <select class="inp" v-model="form.mfgState">
            <option value="">Select state</option>
            <option value="Maharashtra">Maharashtra</option>
          </select>
        </div>
      </div>

      <div class="field">
        <label class="lbl">Manufacturing Unit City *</label>
        <select class="inp" v-model="form.mfgCity">
          <option value="">Select city</option>
          <option value="Mumbai">Mumbai</option>
        </select>
      </div>

      <div class="section-title">Contact & Web</div>
      
      <div class="field">
        <label class="lbl">Primary Contact Name *</label>
        <input type="text" class="inp" v-model="form.contactName" placeholder="Enter name">
      </div>

      <div class="field">
        <label class="lbl">Primary Contact Number *</label>
        <input type="text" class="inp" v-model="form.contactNumber" placeholder="Enter number">
      </div>

      <div class="field">
        <label class="lbl">Primary Contact Mail ID *</label>
        <input type="email" class="inp" v-model="form.contactEmail" placeholder="Enter email">
      </div>

      <div class="field">
        <label class="lbl">Website</label>
        <input type="text" class="inp" v-model="form.website" placeholder="https://example.com">
      </div>

      <div class="field">
        <label class="lbl">Additional Information</label>
        <textarea class="inp" v-model="form.additionalInfo" placeholder="Any other details..."></textarea>
      </div>

      <div class="field">
        <label class="lbl">Address</label>
        <textarea class="inp" v-model="form.address" placeholder="Full business address"></textarea>
      </div>

      <!-- Submit -->
      <button type="submit" class="btn btn-teal mt-16" :disabled="isSaving">
        {{ isSaving ? 'Saving...' : 'Save Changes' }}
      </button>
      <div style="height:20px;"></div>
    </form>

    <!-- Toast -->
    <div class="toast" :class="{ show: toastVisible }">{{ toastMessage }}</div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()
const isSaving = ref(false)
const toastVisible = ref(false)
const toastMessage = ref('')

const form = reactive({
  personRole: 'Owner',
  country: 'India',
  businessModel: ['Manufacturing'],
  companyName: 'test manufacture',
  incorporationYear: '',
  companyType: 'Proprietor',
  ownerName: '',
  otherDirectors: '',
  gstNumber: '',
  hoCountry: 'India',
  hoState: '',
  hoCity: '',
  mfgCountry: 'India',
  mfgState: '',
  mfgCity: '',
  contactName: '',
  contactNumber: '',
  contactEmail: '',
  website: '',
  additionalInfo: '',
  address: ''
})

const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i)

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2500)
}

async function saveChanges() {
  if (!form.companyName || !form.gstNumber) {
    showToast('Please fill required fields')
    return
  }
  
  isSaving.value = true
  // Simulate API call
  setTimeout(() => {
    isSaving.value = false
    showToast('Profile updated successfully!')
  }, 1000)
}
</script>

<style scoped>
.section-title {
  font-size: 14px;
  font-weight: 800;
  color: var(--navy);
  margin: 24px 0 16px;
  padding-bottom: 8px;
  border-bottom: 2.5px solid var(--border);
  font-family: 'Barlow', sans-serif;
}

.inp:disabled {
  background: #f1f5f9;
  color: #64748b;
  cursor: not-allowed;
}

.check-pill {
  margin-bottom: 0;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
