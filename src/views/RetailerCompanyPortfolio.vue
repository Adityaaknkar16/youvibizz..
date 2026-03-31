<template>

      <!-- Topbar -->
      <div class="topbar anim">
        <button @click="$router.push('/retailer/dashboard')" class="back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <div class="top-title">Company Profile
        <div style="width:32px;">

        <div class="sheet anim">
          <!-- Profile Strength -->
          <div class="profile-strength-box">
             <div class="strength-header">
               <span>Complete Your Profile</span>
               <span class="pct">14%</span>
           
             <div class="strength-bar">
               <div class="strength-fill" style="width: 14%;">

          <div class="form-container">
            <!-- Role -->
            <div class="field">
              <label class="lbl">Role</label>
              <div class="inp-wrap">
                <input type="text" class="inp inp-no-ico readonly" value="Retailer" readonly>

            <h3 class="sec-title mt-16">Retailer Profile</h3>

            <!-- Industry/Sector -->
            <div class="field">
              <label class="lbl">Industry / Sector *</label>
              <div class="inp-wrap">
                <input type="text" class="inp inp-no-ico" v-model="form.industry" placeholder="Home Interior & Exterior Décor">

            <!-- Person Role -->
            <div class="field">
              <label class="lbl">Person Role *</label>
              <div class="inp-wrap">
                <select class="inp inp-no-ico" v-model="form.personRole">
                  <option value="Owner">Owner</option>
                  <option value="Partner">Partner</option>
                  <option value="Manager">Manager</option>
                  <option value="Director">Director</option>
                </select>

            <!-- Firm Name -->
            <div class="field">
              <label class="lbl">Firm Name *</label>
              <div class="inp-wrap">
                <input type="text" class="inp inp-no-ico" v-model="form.firmName" placeholder="Enter Firm Name">

            <!-- Company Type -->
            <div class="field">
              <label class="lbl">Company Type *</label>
              <div class="inp-wrap">
                <select class="inp inp-no-ico" v-model="form.companyType">
                  <option value="">Select Type</option>
                  <option value="Private Limited">Private Limited</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Proprietorship">Proprietorship</option>
                  <option value="Public Limited">Public Limited</option>
                </select>

            <!-- Year of Incorporation -->
            <div class="field">
              <label class="lbl">Year of Incorporation *</label>
              <div class="inp-wrap">
                <select class="inp inp-no-ico" v-model="form.incorporationYear">
                  <option value="">Select Year</option>
                  <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
                </select>

            <!-- GST Number -->
            <div class="field">
              <label class="lbl">GST Number *</label>
              <div class="inp-wrap">
                <input type="text" class="inp inp-no-ico" v-model="form.gstNumber" placeholder="Enter GST Number" maxlength="15">
            
              <p class="helper-txt">15 alphanumeric characters required</p>

            <!-- Owner Name -->
            <div class="field">
              <label class="lbl">Owner Name *</label>
              <div class="inp-wrap">
                <input type="text" class="inp inp-no-ico" v-model="form.ownerName" placeholder="Enter Owner Name">

            <!-- Contact Number -->
            <div class="field">
              <label class="lbl">Contact Number *</label>
              <div class="inp-wrap">
                <input type="tel" class="inp inp-no-ico" v-model="form.contactNumber" placeholder="Enter Contact Number">

            <!-- Contact Email ID -->
            <div class="field">
              <label class="lbl">Contact Email ID *</label>
              <div class="inp-wrap">
                <input type="email" class="inp inp-no-ico" v-model="form.email" placeholder="Enter Email ID">

            <!-- Other Partners / Directors -->
            <div class="field">
              <label class="lbl">Other Partners / Directors</label>
              <div class="inp-wrap">
                <input type="text" class="inp inp-no-ico" v-model="form.partners" placeholder="Names (comma separated)">

            <!-- Website -->
            <div class="field">
              <label class="lbl">Website</label>
              <div class="inp-wrap">
                <input type="url" class="inp inp-no-ico" v-model="form.website" placeholder="www.example.com">

            <h3 class="sec-title mt-16">Registered Address Location *</h3>

            <!-- Country -->
            <div class="field">
              <label class="lbl">Country *</label>
              <div class="inp-wrap">
                <select class="inp inp-no-ico" v-model="form.country">
                  <option value="">Select country</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                </select>

            <!-- State -->
            <div class="field">
              <label class="lbl">State *</label>
              <div class="inp-wrap">
                <select class="inp inp-no-ico" v-model="form.state">
                  <option value="">Select state</option>
                  <option v-for="s in states" :key="s" :value="s">{{ s }}</option>
                </select>

            <!-- City -->
            <div class="field">
              <label class="lbl">City *</label>
              <div class="inp-wrap">
                <select class="inp inp-no-ico" v-model="form.city">
                  <option value="">Select City</option>
                  <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
                </select>

            <!-- Full Address Details -->
            <div class="field">
              <label class="lbl">Full Address Details *</label>
              <div class="inp-wrap">
                <textarea class="inp inp-no-ico" v-model="form.address" placeholder="Flat No, Building, Street, Area..."></textarea>

            <h3 class="sec-title mt-16">Business Details</h3>

            <!-- Employees -->
            <div class="field">
              <label class="lbl">Employees *</label>
              <div class="inp-wrap">
                <select class="inp inp-no-ico" v-model="form.employees">
                  <option value="">Select</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="50+">50+</option>
                </select>

            <!-- Godowns -->
            <div class="field">
              <label class="lbl">Godowns *</label>
              <div class="inp-wrap">
                <select class="inp inp-no-ico" v-model="form.godowns">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>

            <!-- Total Godown Area -->
            <div class="field">
              <label class="lbl">Total Godown Area (in SFT) *</label>
              <div class="inp-wrap">
                <select class="inp inp-no-ico" v-model="form.godownArea">
                  <option value="">Select</option>
                  <option value="Below 1000">Below 1000</option>
                  <option value="1000-5000">1000-5000</option>
                  <option value="Above 5000">Above 5000</option>
                </select>

            <!-- Expandable -->
            <div class="field">
              <label class="lbl">Can Expand Godown Area for New Businesses *</label>
              <div class="inp-wrap">
                <select class="inp inp-no-ico" v-model="form.canExpand">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>

            <!-- Turnover -->
            <div class="field">
              <label class="lbl">Turnover (Cr/Month)</label>
              <div class="inp-wrap">
                <select class="inp inp-no-ico" v-model="form.turnover">
                  <option value="">Select</option>
                  <option value="Below 0.1">Below 0.1</option>
                  <option value="0.1 - 0.5">0.1 - 0.5</option>
                  <option value="Above 0.5">Above 0.5</option>
                </select>

            <!-- Additional Info -->
            <div class="field">
              <label class="lbl">Additional Info</label>
              <div class="inp-wrap">
                <textarea class="inp inp-no-ico" v-model="form.additionalInfo" placeholder="Any other details..."></textarea>

            <!-- Submit -->
            <div class="form-actions mt-24">
              <button class="btn btn-teal" @click="saveChanges" :disabled="loading">
                {{ loading ? 'Saving...' : 'Save Changes' }}
              </button>

        <!-- /.form-container -->
      <!-- /.sheet -->
    <!-- /.app -->

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
import { ref, computed } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const toastVisible = ref(false)
const toastMessage = ref('')

const form = ref({
  industry: 'Home Interior & Exterior Décor',
  personRole: 'Owner',
  firmName: 'test 3',
  companyType: '',
  incorporationYear: '',
  gstNumber: '',
  ownerName: '',
  contactNumber: '',
  email: '',
  partners: '',
  website: '',
  country: 'India',
  state: '',
  city: '',
  address: '',
  employees: '',
  godowns: '',
  godownArea: '',
  canExpand: '',
  turnover: '',
  additionalInfo: ''
})

const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i)
const states = ['Maharashtra', 'Gujarat', 'Delhi', 'Karnataka']
const cities = ['Mumbai', 'Pune', 'Ahmedabad', 'Bangalore']

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2500)
}

function saveChanges() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    showToast('Changes saved successfully!')
  }, 1000)
}
</script>

<style scoped>
.profile-strength-box { background: #fff; border: 1.5px solid var(--border); border-radius: 14px; padding: 15px; margin-bottom: 20px; }
.strength-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.strength-header span { font-size: 13px; font-weight: 700; color: var(--navy); }
.strength-header .pct { color: var(--teal); font-weight: 800; }
.strength-bar { height: 8px; background: #f1f5f9; border-radius: 4px; overflow: hidden; }
.strength-fill { height: 100%; background: linear-gradient(90deg, #ff9f43, #ff6b6b); border-radius: 4px; transition: width 0.5s ease; }

.sec-title { font-size: 15px; font-weight: 800; color: var(--navy); border-left: 4px solid var(--teal); padding-left: 10px; margin-bottom: 12px; }
.helper-txt { font-size: 11px; color: var(--muted); margin-top: 4px; margin-bottom: 0; }
.readonly { background: #f8fafc; color: var(--muted); cursor: not-allowed; }
</style>
