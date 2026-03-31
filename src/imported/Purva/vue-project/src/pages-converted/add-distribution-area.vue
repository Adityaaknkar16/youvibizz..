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
          <div class="battery-body">
            <div class="battery-fill"></div>
          </div>
        </div>
      </div>
    </div>

    <div style="display: contents; height: 100%;">
      <div class="page-content">

        <!-- Topbar -->
        <div class="topbar">
          <a href="/pages/purva/distribution-areas" class="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </a>
          <span class="topbar-title">
            {{ editMode ? 'Edit Area' : 'Add Area' }}
          </span>
          <div style="width:36px;"></div>
        </div>

        <!-- Hero -->
        <div class="hero" style="padding:20px 22px 50px;">
          <div class="hero-inner">
            <h1 class="hero-title" style="font-size:24px;">
              {{ editMode ? 'Edit ' : 'New ' }}
              <span class="accent">Area</span>
            </h1>
            <p class="hero-sub">
              {{ editMode
                ? 'Update your distribution coverage details.'
                : 'Manage the geographic regions you serve.' }}
            </p>
          </div>
        </div>

        <div class="sheet">

          <!-- Location -->
          <div class="card form-section">
            <div class="section-title">Location Coverage</div>

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
          </div>

          <!-- Contact -->
          <div class="card form-section">
            <div class="section-title">Contact Information</div>

            <div class="field">
              <label class="lbl">Firm Name *</label>
              <input class="inp inp-no-ico"
                v-model="form.firm"
                placeholder="e.g. Sharma Distributors">
            </div>

            <div class="form-row">
              <div class="field">
                <label class="lbl">Contact Person *</label>
                <input class="inp inp-no-ico"
                  v-model="form.person"
                  placeholder="Name">
              </div>

              <div class="field">
                <label class="lbl">Contact No *</label>
                <input class="inp inp-no-ico"
                  type="tel"
                  maxlength="10"
                  v-model="form.phone"
                  placeholder="10 digits">
              </div>
            </div>
          </div>

          <!-- Button -->
          <button class="btn btn-teal w-full"
            :disabled="loading"
            @click="saveArea"
            style="margin-bottom:24px;">
            {{ loading
              ? 'Saving...'
              : editMode
                ? 'Update Distribution Area'
                : 'Save Distribution Area' }}
          </button>

          <!-- Messages -->
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

// State
const loading = ref(false)
const error = ref('')
const success = ref('')
const toast = ref('')
const editMode = ref(false)

const states = ref(['Maharashtra', 'Karnataka'])
const cities = ref([])

// Form
const form = reactive({
  country: 'India',
  state: '',
  city: '',
  firm: '',
  person: '',
  phone: ''
})

// City Map
const cityMap = {
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
  Karnataka: ['Bangalore', 'Mysore']
}

// Handle state change
function handleStateChange() {
  cities.value = cityMap[form.state] || []
  form.city = ''
}

// Toast
function showToast(msg) {
  toast.value = msg
  setTimeout(() => (toast.value = ''), 2000)
}

// Validation
function validate() {
  if (!form.state || !form.city || !form.firm || !form.person || !form.phone) {
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

// Save
async function saveArea() {
  if (!validate()) return

  loading.value = true
  error.value = ''
  success.value = ''

  try {
    const payload = { ...form }

    if (editMode.value) {
      await axios.put('/api/areas/1', payload)
      success.value = 'Area updated successfully!'
      showToast('Updated!')
    } else {
      await axios.post('/api/areas', payload)
      success.value = 'New area added successfully!'
      showToast('Added!')
    }

  } catch (err) {
    error.value = err.response?.data?.message || 'Something went wrong'
  } finally {
    loading.value = false
  }
}

// Init
onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')

  if (id) {
    editMode.value = true

    axios.get(`/api/areas/${id}`)
      .then(res => {
        Object.assign(form, res.data)
        handleStateChange()
      })
      .catch(() => {
        error.value = 'Failed to load area data'
      })
  }
})
</script>