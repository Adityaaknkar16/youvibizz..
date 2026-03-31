<template>
  <div style="display: contents">
    <div class="phone-notch" style="display: none !important"><div class="notch-speaker"></div><div class="notch-camera"></div></div>
    <div class="status-bar" style="display: none !important">
      <span class="status-time">{{ currentTime }}</span>
      <div class="status-icons">
        <svg viewBox="0 0 24 24" fill="white"><rect x="1" y="15" width="4" height="6" rx="1"/><rect x="7" y="11" width="4" height="10" rx="1"/><rect x="13" y="7" width="4" height="14" rx="1"/><rect x="19" y="3" width="4" height="18" rx="1" opacity=".3"/></svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill="white" stroke="none"/></svg>
        <div class="battery-icon"><div class="battery-body"><div class="battery-fill"></div></div></div>
      </div>
    </div>
    <div style="display: contents; height: 100%;">
      <div class="page-content">
        <div class="topbar">
          <button @click="router.back()" class="back-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>
          <span class="topbar-title">Edit Profile</span>
          <div style="width:36px;"></div>
        </div>

        <div class="hero" style="padding:20px 22px 50px;">
          <div class="hero-inner">
            <h1 class="hero-title" style="font-size:24px;">Edit <span class="accent">Profile</span></h1>
            <p class="hero-sub">Update your business information.</p>
          </div>
        </div>

        <div class="sheet">
          <div v-if="loading" class="text-center p-4">Saving changes...</div>
          
          <form @submit.prevent="handleSave">
            <!-- Distributor Information -->
            <div class="card form-section">
              <div class="section-title">Distributor Information</div>
              
              <label class="form-label">Firm Name *</label>
              <input v-model="form.firmName" class="form-input" placeholder="Your firm name" required>
              
              <label class="form-label">Industry / Sector</label>
              <input class="form-input" :value="form.industry" readonly style="background:var(--bg);color:var(--muted);">
              
              <label class="form-label">Person Role *</label>
              <select v-model="form.role" class="form-input">
                <option value="Owner">Owner</option>
                <option value="Manager">Manager</option>
              </select>
              
              <label class="form-label">Business Model *</label>
              <div class="checkbox-group">
                <label 
                  v-for="model in businessModels" 
                  :key="model"
                  class="check-pill" 
                  :class="{ checked: form.selectedModels.includes(model) }"
                  @click="toggleOption('selectedModels', model)"
                >
                  {{ model }}
                </label>
              </div>
              
              <label class="form-label">Company Type *</label>
              <select v-model="form.companyType" class="form-input">
                <option value="Proprietor">Proprietor</option>
                <option value="Partnership">Partnership</option>
                <option value="LLP">LLP</option>
                <option value="Company">Company</option>
              </select>
              
              <div class="form-row">
                <div>
                  <label class="form-label">Year Incorporated</label>
                  <select v-model="form.year" class="form-input">
                    <option v-for="y in [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2015, 2010]" :key="y" :value="y">{{ y }}</option>
                  </select>
                </div>
                <div>
                  <label class="form-label">Employees</label>
                  <select v-model="form.employees" class="form-input">
                    <option value="1–10">1–10</option>
                    <option value="11–50">11–50</option>
                    <option value="51–200">51–200</option>
                  </select>
                </div>
              </div>
              
              <label class="form-label">GST Number *</label>
              <input v-model="form.gstNumber" class="form-input" placeholder="15-digit GSTIN" required>
              
              <label class="form-label">Owner Name *</label>
              <input v-model="form.ownerName" class="form-input" placeholder="Full name" required>
            </div>

            <!-- Contact Details -->
            <div class="card form-section">
              <div class="section-title">Contact Details</div>
              <label class="form-label">Contact Number *</label>
              <input v-model="form.phone" type="tel" class="form-input" placeholder="+91 XXXXX XXXXX" required>
              
              <label class="form-label">WhatsApp Number</label>
              <input v-model="form.whatsapp" type="tel" class="form-input" placeholder="+91 XXXXX XXXXX">
              
              <label class="form-label">Business Email</label>
              <input v-model="form.email" type="email" class="form-input" placeholder="business@email.com">
              
              <label class="form-label">Website</label>
              <input v-model="form.website" type="url" class="form-input" placeholder="https://yourwebsite.com">
            </div>

            <!-- Address -->
            <div class="card form-section">
              <div class="section-title">Address</div>
              <label class="form-label">Street Address *</label>
              <textarea v-model="form.address" class="form-input" rows="2" placeholder="Door No, Street, Area" required></textarea>
              
              <div class="form-row">
                <div>
                  <label class="form-label">City *</label>
                  <input v-model="form.city" class="form-input" placeholder="City" required>
                </div>
                <div>
                  <label class="form-label">Pin Code *</label>
                  <input v-model="form.pinCode" class="form-input" type="number" placeholder="6 digits" required>
                </div>
              </div>
              <label class="form-label">State *</label>
              <select v-model="form.state" class="form-input" required>
                <option v-for="s in ['Maharashtra', 'Gujarat', 'Madhya Pradesh', 'Rajasthan', 'Karnataka', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh']" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>

            <!-- About Your Business -->
            <div class="card form-section">
              <div class="section-title">About Your Business</div>
              <label class="form-label">Short Description</label>
              <textarea v-model="form.about" class="form-input" rows="4" placeholder="Tell buyers about your business..."></textarea>
              
              <label class="form-label">Product Categories Dealt In</label>
              <div class="checkbox-group">
                <label 
                  v-for="cat in productCategories" 
                  :key="cat"
                  class="check-pill" 
                  :class="{ checked: form.selectedCategories.includes(cat) }"
                  @click="toggleOption('selectedCategories', cat)"
                >
                  {{ cat }}
                </label>
              </div>
            </div>

            <button type="submit" class="btn btn-teal w-full" :disabled="loading" style="margin-bottom:24px;">
              Save Changes
            </button>
          </form>
        </div>
      </div>

      <div class="toast" v-if="toast.show">{{ toast.message }}</div>
    </div>
  </div>
</template>

<script setup>
import '../utils/dashboard-shared.js';
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('9:41');
const loading = ref(false);

const businessModels = ['Distributor', 'C&F', 'Retailer', 'Showroom', 'OEM'];
const productCategories = ['Plywood', 'Veneers', 'Laminates', 'HDF Boards', 'Hardware', 'Machinery'];

const form = reactive({
  firmName: 'TradeMax Wholesale',
  industry: 'Wood & Building Materials',
  role: 'Owner',
  selectedModels: ['Distributor'],
  companyType: 'Proprietor',
  year: 2018,
  employees: '1–10',
  gstNumber: '27AABCT9876Q1Z3',
  ownerName: 'Ramesh Sharma',
  phone: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  email: 'contact@pinnacle.com',
  website: '',
  address: 'Plot 12, MIDC Industrial Area, Nagpur',
  city: 'Nagpur',
  pinCode: 440001,
  state: 'Maharashtra',
  about: 'Leading manufacturer of high-quality plywood and wood products since 2015, serving clients across Maharashtra and beyond.',
  selectedCategories: ['Plywood', 'Veneers']
});

const toast = reactive({ show: false, message: '' });

const toggleOption = (field, value) => {
  const index = form[field].indexOf(value);
  if (index > -1) {
    form[field].splice(index, 1);
  } else {
    form[field].push(value);
  }
};

const handleSave = async () => {
  if (!form.firmName || !form.phone || !form.gstNumber) {
    showToast('Please fill all required fields');
    return;
  }

  try {
    loading.value = true;
    // await axios.post('/api/distributor/profile/update', form);
    showToast('Profile updated successfully!');
    setTimeout(() => {
      router.push('/pages/adityavuetask/distributor-profile');
    }, 1200);
  } catch (err) {
    showToast('Failed to update profile');
  } finally {
    loading.value = false;
  }
};

const showToast = (msg) => {
  toast.message = msg;
  toast.show = true;
  setTimeout(() => toast.show = false, 2500);
};

onMounted(() => {
  const now = new Date();
  currentTime.value = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
});
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
