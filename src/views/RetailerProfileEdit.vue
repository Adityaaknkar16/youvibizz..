<template>

        <div class="topbar">
          <RouterLink to="/retailer/profile" class="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </RouterLink>
          <span class="topbar-title">Edit Profile</span>
          <div style="width:36px;">

        <div class="hero" style="padding:20px 22px 50px;">
          <div class="hero-inner">
            <h1 class="hero-title" style="font-size:24px;">Edit <span class="accent">Profile</span></h1>
            <p class="hero-sub">Update your business information.</p>

        <div class="sheet">

          <div class="card form-section">
            <div class="section-title">Retailer Information
            <label class="form-label">Firm / Store Name *</label>
            <input class="form-input" v-model="form.firmName" placeholder="Your store name">
            <label class="form-label">Industry / Sector</label>
            <input class="form-input" value="Wood & Building Materials" readonly style="background:var(--bg);color:var(--muted);">
            <label class="form-label">Person Role *</label>
            <select class="form-input" v-model="form.personRole">
              <option>Owner</option>
              <option>Manager</option>
            </select>
            <label class="form-label">Business Type</label>
            <div class="checkbox-group">
              <label v-for="type in businessTypes" :key="type" class="check-pill" :class="{ checked: form.businessType.includes(type) }" @click="toggleSelection(form.businessType, type)">
                <input type="checkbox" :checked="form.businessType.includes(type)" style="display:none;">{{ type }}
              </label>
          
            <label class="form-label">Company Type</label>
            <select class="form-input" v-model="form.companyType">
              <option>Proprietor</option><option>Partnership</option><option>Company</option>
            </select>
            <label class="form-label">GST Number</label>
            <input class="form-input" v-model="form.gst" placeholder="15-digit GSTIN (optional)">
            <label class="form-label">Owner Name *</label>
            <input class="form-input" v-model="form.ownerName" placeholder="Full name">

          <div class="card form-section">
            <div class="section-title">Contact Details
            <label class="form-label">Contact Number *</label>
            <input class="form-input" v-model="form.phone" type="tel" placeholder="+91 XXXXX XXXXX">
            <label class="form-label">WhatsApp Number</label>
            <input class="form-input" v-model="form.whatsapp" type="tel" placeholder="+91 XXXXX XXXXX">
            <label class="form-label">Business Email</label>
            <input class="form-input" v-model="form.email" type="email" placeholder="business@email.com">
            <label class="form-label">Website</label>
            <input class="form-input" v-model="form.website" type="url" placeholder="https://yourwebsite.com">

          <div class="card form-section">
            <div class="section-title">Address
            <label class="form-label">Street Address *</label>
            <textarea class="form-input" rows="2" v-model="form.address" placeholder="Door No, Street, Area"></textarea>
            <div class="form-row">
              <div>
                <label class="form-label">City *</label>
                <input class="form-input" v-model="form.city" placeholder="City">
            
              <div>
                <label class="form-label">Pin Code *</label>
                <input class="form-input" v-model="form.pin" type="number" placeholder="6 digits">

            <label class="form-label">State *</label>
            <select class="form-input" v-model="form.state">
              <option>Maharashtra</option><option>Gujarat</option><option>Madhya Pradesh</option>
              <option>Rajasthan</option><option>Karnataka</option><option>Tamil Nadu</option>
              <option>Telangana</option><option>Uttar Pradesh</option>
            </select>

          <div class="card form-section">
            <div class="section-title">About Your Business
            <label class="form-label">Short Description</label>
            <textarea class="form-input" rows="4" v-model="form.about" placeholder="Tell buyers about your business..."></textarea>
            <label class="form-label">Product Categories Dealt In</label>
            <div class="checkbox-group">
              <label v-for="cat in productCategories" :key="cat" class="check-pill" :class="{ checked: form.categories.includes(cat) }" @click="toggleSelection(form.categories, cat)">
                <input type="checkbox" :checked="form.categories.includes(cat)" style="display:none;">{{ cat }}
              </label>

          <div v-if="errorMessage" style="color:var(--danger);font-size:12px;margin-bottom:12px;text-align:center;">{{ errorMessage }}

          <button class="btn btn-teal w-full" :disabled="loading" @click="saveProfile" style="margin-bottom:24px;">
            {{ loading ? 'Saving...' : 'Save Changes' }}
          </button>

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
</template>

<script setup>
import { ref, reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const loading = ref(false)
const errorMessage = ref('')
const toastMessage = ref('')
const toastVisible = ref(false)

const businessTypes = ['Retail Shop', 'Showroom', 'Online', 'Franchise']
const productCategories = ['Plywood', 'Veneers', 'Laminates', 'HDF Boards', 'Hardware', 'Machinery']

const form = reactive({
  firmName: 'Woodhouse Retail', personRole: 'Owner', businessType: ['Retail Shop'],
  companyType: 'Proprietor', gst: '27AABCW1234Q1Z5', ownerName: 'Suresh Patil',
  phone: '+91 98765 43210', whatsapp: '+91 98765 43210', email: 'contact@pinnacle.com',
  website: '', address: 'Plot 12, MIDC Industrial Area, Nagpur', city: 'Nagpur',
  pin: '440001', state: 'Maharashtra',
  about: 'Leading manufacturer of high-quality plywood and wood products since 2015.',
  categories: ['Plywood', 'Veneers']
})

function showToast(msg) { toastMessage.value = msg; toastVisible.value = true; setTimeout(() => { toastVisible.value = false }, 2500) }
function toggleSelection(arr, value) { const i = arr.indexOf(value); if (i > -1) arr.splice(i, 1); else arr.push(value) }

async function saveProfile() {
  errorMessage.value = ''
  if (!form.phone.trim()) { errorMessage.value = 'Please fill all required fields'; return }
  try {
    loading.value = true
    await axios.put('/api/retailer/profile', form)
    showToast('Profile updated successfully!')
    setTimeout(() => { router.push('/retailer/profile') }, 1200)
  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Failed to save profile'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.form-label { font-size:12px; font-weight:700; color:var(--text); margin-bottom:6px; display:block; text-transform:uppercase; letter-spacing:.3px; }
.form-input { width:100%; border:1.5px solid var(--border); border-radius:10px; padding:12px 14px; font-size:14px; font-family:Inter,sans-serif; background:var(--card); color:var(--text); transition:var(--transition); margin-bottom:14px; }
.form-input:focus { border-color:var(--teal); box-shadow:0 0 0 3px var(--teal-dim); outline:none; }
select.form-input { appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 12px center; background-size:16px; }
textarea.form-input { resize:none; line-height:1.5; }
.form-row { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.form-section { margin-bottom:4px; }
.section-title { font-size:14px; font-weight:800; color:var(--navy); font-family:'Barlow',sans-serif; margin-bottom:14px; padding-bottom:8px; border-bottom:2px solid var(--border); }
.checkbox-group { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:14px; }
.check-pill { display:flex; align-items:center; gap:6px; padding:7px 14px; border-radius:20px; border:1.5px solid var(--border); background:var(--card); font-size:12px; font-weight:600; cursor:pointer; transition:var(--transition); user-select:none; }
.check-pill input { display:none; }
.check-pill.checked { border-color:var(--teal); background:var(--teal-dim); color:var(--teal); }
</style>
