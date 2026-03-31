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
          <router-link to="/branches" class="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </router-link>
          <span class="topbar-title">{{ editMode ? 'Edit Branch' : 'Add Branch' }}</span>
          <div style="width:36px;"></div>
        </div>

        <!-- Hero -->
        <div class="hero" style="padding:20px 22px 50px;">
          <div class="hero-inner">
            <h1 class="hero-title">
              {{ editMode ? 'Edit ' : 'New ' }}<span class="accent">Branch</span>
            </h1>
            <p class="hero-sub">
              {{ editMode ? 'Update your branch location and contact info.' : 'Add a new business location to your network.' }}
            </p>
          </div>
        </div>

        <div class="sheet">

          <!-- Branch Location -->
          <div class="card form-section">
            <div class="section-title">Branch Location</div>

            <div class="field">
              <label class="lbl">Country *</label>
              <select class="inp inp-no-ico" v-model="form.country">
                <option value="India">India</option>
              </select>
            </div>

            <div class="form-row">
              <div class="field">
                <label class="lbl">State *</label>
                <select class="inp inp-no-ico" v-model="form.state" @change="handleStateChange">
                  <option value="">Select State</option>
                  <option v-for="s in states" :key="s" :value="s">{{ s }}</option>
                </select>
              </div>
              <div class="field">
                <label class="lbl">City *</label>
                <select class="inp inp-no-ico" v-model="form.city">
                  <option value="">Select City</option>
                  <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
                </select>
              </div>
            </div>

            <div class="field">
              <label class="lbl">Full Address *</label>
              <textarea class="inp inp-no-ico" rows="2" v-model="form.address" placeholder="Street, Area, Pincode"></textarea>
            </div>
          </div>

          <!-- Branch Details -->
          <div class="card form-section">
            <div class="section-title">Branch Details</div>

            <div class="field">
              <label class="lbl">Firm Name *</label>
              <input class="inp inp-no-ico" v-model="form.firm" placeholder="e.g. YouVBiZ Mumbai Branch" />
            </div>

            <div class="form-row">
              <div class="field">
                <label class="lbl">Contact Person *</label>
                <input class="inp inp-no-ico" v-model="form.person" placeholder="Name" />
              </div>
              <div class="field">
                <label class="lbl">Phone *</label>
                <input class="inp inp-no-ico" type="tel" maxlength="10" v-model="form.phone" placeholder="10 digits" />
              </div>
            </div>

            <div class="field">
              <label class="lbl">Email Address *</label>
              <input class="inp inp-no-ico" type="email" v-model="form.email" placeholder="branch@email.com" />
            </div>
          </div>

          <!-- Save Button -->
          <button class="btn btn-teal w-full" :disabled="loading" @click="saveBranch" style="margin-bottom:24px;">
            {{ loading ? 'Saving...' : editMode ? 'Update Branch' : 'Save Branch Details' }}
          </button>

          <div v-if="error" class="error">{{ error }}</div>
          <div v-if="success" class="success">{{ success }}</div>

        </div>
      </div>

      <div class="toast">{{ toast }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'

const loading = ref(false)
const error = ref('')
const success = ref('')
const toast = ref('')
const editMode = ref(false)

const states = ref(['Maharashtra', 'Karnataka', 'Gujarat', 'Rajasthan'])
const cities = ref([])

const form = reactive({
  country: 'India',
  state: '',
  city: '',
  address: '',
  firm: '',
  person: '',
  phone: '',
  email: ''
})

const cityMap = {
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
  Karnataka: ['Bangalore', 'Mysore'],
  Gujarat: ['Ahmedabad', 'Surat'],
  Rajasthan: ['Jaipur', 'Jodhpur']
}

function handleStateChange() {
  cities.value = cityMap[form.state] || []
  form.city = ''
}

function showToast(msg) {
  toast.value = msg
  setTimeout(() => toast.value = '', 2000)
}

function validate() {
  if (!form.state || !form.city || !form.address || !form.firm || !form.person || !form.phone || !form.email) {
    error.value = 'Please fill all required fields'
    return false
  }
  if (!/^\d{10}$/.test(form.phone)) {
    error.value = 'Phone must be 10 digits'
    return false
  }
  error.value = ''
  return true
}

async function saveBranch() {
  if (!validate()) return
  loading.value = true
  success.value = ''
  error.value = ''
  try {
    if (editMode.value) {
      await axios.put('/api/branches/1', { ...form })
      success.value = 'Branch updated successfully!'
      showToast('Updated!')
    } else {
      await axios.post('/api/branches', { ...form })
      success.value = 'New branch added successfully!'
      showToast('Added!')
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Something went wrong'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')
  if (id) {
    editMode.value = true
    axios.get(`/api/branches/${id}`)
      .then(res => { Object.assign(form, res.data); handleStateChange() })
      .catch(() => { error.value = 'Failed to load branch data' })
  }
})
</script>
