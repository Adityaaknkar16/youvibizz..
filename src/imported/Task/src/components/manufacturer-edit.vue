<template>
<div style="display: contents">
  <div class="phone-notch" style="display: none !important"><div class="notch-speaker"></div><div class="notch-camera"></div></div>
  <div class="status-bar" style="display: none !important">
    <span class="status-time">9:41</span>
    <div class="status-icons">
      <svg viewBox="0 0 24 24" fill="white"><rect x="1" y="15" width="4" height="6" rx="1"/><rect x="7" y="11" width="4" height="10" rx="1"/><rect x="13" y="7" width="4" height="14" rx="1"/><rect x="19" y="3" width="4" height="18" rx="1" opacity=".3"/></svg>
      <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill="white" stroke="none"/></svg>
      <div class="battery-icon"><div class="battery-body"><div class="battery-fill"></div></div></div>
    </div>
  </div>
  <div style="display: contents; height: 100%;">
    <div class="page-content">

      <!-- Topbar -->
      <div class="topbar">
        <a href="#" class="back-btn" @click="router.go(-1)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </a>
        <span class="topbar-title">Edit Profile</span>
        <div style="width:36px;"></div>
      </div>

      <!-- Hero -->
      <div class="hero" style="padding:20px 22px 50px;">
        <div class="hero-inner">
          <h1 class="hero-title" style="font-size:24px;">Edit <span class="accent">Profile</span></h1>
          <p class="hero-sub">Update your business information.</p>
        </div>
      </div>

      <!-- Sheet -->
      <div class="sheet">
        
        <!-- Info Card -->
        <div class="card">
          <div class="section-title">Manufacturer Information</div>
          
          <div class="field">
            <label class="lbl">Company Name *</label>
            <input class="inp inp-no-ico" v-model="companyName" placeholder="Your company name">
          </div>
          
          <div class="field">
            <label class="lbl">Industry / Sector *</label>
            <input class="inp inp-no-ico" value="Wood & Plywood" readonly style="background:var(--bg);color:var(--muted);">
          </div>
          
          <div class="field">
            <label class="lbl">Person Role *</label>
            <select class="inp inp-no-ico" v-model="personRole">
              <option>Owner</option>
              <option>Manager</option>
              <option>Director</option>
            </select>
          </div>
          
          <div class="field">
            <label class="lbl">Business Model *</label>
            <div class="checkbox-group">
              <label v-for="model in availModels" :key="model" class="check-pill" :class="{ checked: businessModels.includes(model) }">
                <input type="checkbox" :value="model" v-model="businessModels">
                {{ model }}
              </label>
            </div>
          </div>
          
          <div class="form-row">
            <div class="field">
              <label class="lbl">Incorporation Year *</label>
              <select class="inp inp-no-ico" v-model="incYear">
                <option>2025</option><option>2024</option><option>2023</option>
                <option>2015</option><option>2010</option><option>2005</option><option>2000</option>
              </select>
            </div>
            <div class="field">
              <label class="lbl">Employees</label>
              <select class="inp inp-no-ico" v-model="employees">
                <option>1–10</option><option>11–50</option>
                <option>51–200</option><option>200+</option>
              </select>
            </div>
          </div>
          
          <div class="field">
            <label class="lbl">GST Number</label>
            <input class="inp inp-no-ico" v-model="gst" placeholder="15-digit GSTIN">
          </div>
          
          <div class="field">
            <label class="lbl">Annual Turnover</label>
            <select class="inp inp-no-ico" v-model="turnover">
              <option>Below ₹50L</option><option>₹50L–1Cr</option>
              <option>₹1Cr–5Cr</option><option>₹5Cr–25Cr</option><option>₹25Cr+</option>
            </select>
          </div>
        </div>

        <!-- Contact Details Card -->
        <div class="card">
          <div class="section-title">Contact Details</div>
          
          <div class="field">
            <label class="lbl">Contact Number *</label>
            <input class="inp inp-no-ico" type="tel" v-model="phone" placeholder="+91 XXXXX XXXXX">
          </div>
          
          <div class="field">
            <label class="lbl">WhatsApp Number</label>
            <input class="inp inp-no-ico" type="tel" v-model="whatsapp" placeholder="+91 XXXXX XXXXX">
          </div>
          
          <div class="field">
            <label class="lbl">Business Email</label>
            <input class="inp inp-no-ico" type="email" v-model="email" placeholder="business@email.com">
          </div>
          
          <div class="field">
            <label class="lbl">Website</label>
            <input class="inp inp-no-ico" type="url" v-model="website" placeholder="https://yourwebsite.com">
          </div>
        </div>

        <!-- Address Card -->
        <div class="card">
          <div class="section-title">Address</div>
          
          <div class="field">
            <label class="lbl">Street Address *</label>
            <textarea class="inp inp-no-ico" rows="2" v-model="address" placeholder="Door No, Street, Area"></textarea>
          </div>
          
          <div class="form-row">
            <div class="field">
              <label class="lbl">City *</label>
              <input class="inp inp-no-ico" v-model="city" placeholder="City">
            </div>
            <div class="field">
              <label class="lbl">Pin Code *</label>
              <input class="inp inp-no-ico" type="number" v-model="pin" placeholder="6 digits">
            </div>
          </div>
          
          <div class="field">
            <label class="lbl">State *</label>
            <select class="inp inp-no-ico" v-model="state">
              <option>Maharashtra</option><option>Gujarat</option><option>Madhya Pradesh</option>
              <option>Rajasthan</option><option>Karnataka</option><option>Tamil Nadu</option>
              <option>Telangana</option><option>Uttar Pradesh</option>
            </select>
          </div>
        </div>

        <!-- About Business Card -->
        <div class="card">
          <div class="section-title">About Your Business</div>
          
          <div class="field">
            <label class="lbl">Short Description</label>
            <textarea class="inp inp-no-ico" rows="4" v-model="about" placeholder="Tell buyers about your business..."></textarea>
          </div>
          
          <div class="field">
            <label class="lbl">Product Categories</label>
            <div class="checkbox-group">
              <label v-for="cat in availCats" :key="cat" class="check-pill" :class="{ checked: categories.includes(cat) }">
                <input type="checkbox" :value="cat" v-model="categories">
                {{ cat }}
              </label>
            </div>
          </div>
        </div>

        <!-- Submission -->
        <button class="btn btn-teal w-full" @click="saveProfile" style="margin-bottom:24px;">
          Save Changes
        </button>

      </div> <!-- Closes .sheet -->

      <!-- Toast Component -->
      <div class="toast" :class="{ show: toastVisible }">{{ toastMsg }}</div>

    </div><!-- Closes .app -->
  </div><!-- /phone-screen -->
</div><!-- /phone-frame -->
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Standard string / number fields pre-populated exactly identically as dummy HTML forms
const companyName = ref('Pinnacle Plywood Ltd')
const personRole = ref('Owner')
const incYear = ref('2015')
const employees = ref('51–200')
const gst = ref('27AABCP1234Q1Z5')
const turnover = ref('₹1Cr–5Cr')
const phone = ref('+91 98765 43210')
const whatsapp = ref('+91 98765 43210')
const email = ref('contact@pinnacle.com')
const website = ref('')
const address = ref('Plot 12, MIDC Industrial Area, Nagpur')
const city = ref('Nagpur')
const pin = ref('440001')
const state = ref('Maharashtra')
const about = ref('Leading manufacturer of high-quality plywood and wood products since 2015.')

// Models tied to checkbox groups natively maintaining true state
const businessModels = ref(['Manufacturing'])
const availModels = ['Manufacturing', 'Outsourcing', 'Importer']

const categories = ref(['Plywood', 'Veneers'])
const availCats = ['Plywood', 'Veneers', 'Laminates', 'HDF Boards']

const toastVisible = ref(false)
const toastMsg = ref('')

const showToast = (msg) => {
  toastMsg.value = msg
  toastVisible.value = true
  setTimeout(() => {
    toastVisible.value = false
  }, 2500)
}

const saveProfile = () => {
  showToast('Profile updated successfully!')
  setTimeout(() => {
    router.push('/manufacturer/detail')
  }, 1200)
}
</script>

<style scoped>
.section-title { font-size:14px; font-weight:800; color:var(--navy); font-family:'Barlow',sans-serif; margin-bottom:14px; padding-bottom:8px; border-bottom:2px solid var(--border); }
.checkbox-group { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:14px; }
.check-pill { display:flex; align-items:center; gap:6px; padding:7px 14px; border-radius:20px; border:1.5px solid var(--border); background:var(--card); font-size:12px; font-weight:600; cursor:pointer; transition:var(--transition); user-select:none; }
.check-pill input { display:none; }
.check-pill.checked { border-color:var(--teal); background:var(--teal-dim); color:var(--teal); }

/* Toast */
.toast {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: rgba(0,0,0,0.8);
  color: #fff;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 13px;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 1000;
}
.toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>