<template>
  <div class="topbar">
    <RouterLink to="/manufacturer/distributors" class="back-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
    </RouterLink>
    <span class="topbar-title">Add Distributors</span>
    <div style="width:36px;"></div>
  </div>

  <div class="sheet">
    <form @submit.prevent="saveDistributor" class="card" style="margin-top:10px;">
      <div class="field">
        <label class="lbl">Firm Name *</label>
        <input type="text" class="inp" v-model="form.firmName" placeholder="Enter firm name">
      </div>
      <div class="field">
        <label class="lbl">Contact Person *</label>
        <input type="text" class="inp" v-model="form.contactPerson" placeholder="Enter contact person">
      </div>
      <div class="field">
        <label class="lbl">Contact No *</label>
        <input type="text" class="inp" v-model="form.contactNo" placeholder="Enter contact number">
      </div>
      <div class="field">
        <label class="lbl">Country *</label>
        <div class="inp-wrap">
          <select class="inp" v-model="form.country">
            <option value="India">India</option>
          </select>
        </div>
      </div>
      <div class="field">
        <label class="lbl">State *</label>
        <div class="inp-wrap">
          <select class="inp" v-model="form.state">
            <option value="">State</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi">Delhi</option>
            <option value="Gujarat">Gujarat</option>
          </select>
        </div>
      </div>
      <div class="field">
        <label class="lbl">City *</label>
        <div class="inp-wrap">
          <select class="inp" v-model="form.city">
            <option value="">Select City</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
          </select>
        </div>
      </div>

      <div class="form-actions" style="display:flex; gap:10px; margin-top:20px;">
        <button type="submit" class="btn btn-teal" :disabled="isSaving" style="flex:1;">
          {{ isSaving ? 'Saving...' : 'save' }}
        </button>
        <button type="button" class="btn btn-gray" @click="$router.back()" style="flex:1;">
          Cancel
        </button>
      </div>
    </form>

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
  firmName: '',
  contactPerson: '',
  contactNo: '',
  country: 'India',
  state: '',
  city: ''
})

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2500)
}

function saveDistributor() {
  if (!form.firmName || !form.contactNo) {
    showToast('Please fill required fields')
    return
  }
  isSaving.value = true
  setTimeout(() => {
    isSaving.value = false
    showToast('Distributor added successfully!')
    setTimeout(() => router.back(), 1000)
  }, 1000)
}
</script>

<style scoped>
.btn-gray {
  background: var(--border);
  color: var(--text);
  border: none;
  font-weight: 700;
}
.btn-teal {
  text-transform: lowercase; /* as per screenshot 'save' */
}
</style>
