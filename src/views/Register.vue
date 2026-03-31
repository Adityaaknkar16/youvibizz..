<template>
  <div class="topbar">
    <RouterLink :to="`/${currentRole}/dashboard`" class="back-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></RouterLink>
    <span class="topbar-title">Create Account</span>
    <RouterLink :to="`/${currentRole}/dashboard`" style="font-size:12px;font-weight:700;color:var(--teal);">Dashboard</RouterLink>
  </div>

  <div class="hero" style="padding:20px 22px 50px;">
    <div class="hero-inner">
      <div class="badge"><span class="badge-dot"></span> Join India's B2B Network</div>
      <h1 class="hero-title">Grow Your<br><span class="accent">Business Today</span></h1>
      <p class="hero-sub">Register for free and connect with 25,000+ businesses across India.</p>
    </div>
  </div>

  <div class="sheet">
    <!-- Role Selection -->
    <p class="sec-label">I want to register as —</p>
    <div class="mob-roles">
      <button v-for="role in roles" :key="role.key"
        class="mob-role" :class="{ active: currentRole === role.key }"
        @click="currentRole = role.key">
        <div class="mob-role-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" v-html="role.svgPath"></svg>
        </div>
        <span class="mob-role-name" v-html="role.label"></span>
      </button>
    </div>

    <!-- Step Progress -->
    <div class="step-progress">
      <div class="sp">
        <div class="sp-num" :class="stepNumClass(1)">{{ currentStep > 1 ? '✓' : '1' }}</div>
        <span class="sp-lbl" :class="{ active: currentStep === 1 }">Basic</span>
      </div>
      <div class="sp-line" :class="{ done: currentStep > 1 }"></div>
      <div class="sp">
        <div class="sp-num" :class="stepNumClass(2)">{{ currentStep > 2 ? '✓' : '2' }}</div>
        <span class="sp-lbl" :class="{ active: currentStep === 2 }">Business</span>
      </div>
      <div class="sp-line" :class="{ done: currentStep > 2 }"></div>
      <div class="sp">
        <div class="sp-num" :class="stepNumClass(3)">3</div>
        <span class="sp-lbl" :class="{ active: currentStep === 3 }">Done</span>
      </div>
    </div>

    <!-- Step 1: Basic Info -->
    <div v-if="currentStep === 1" class="panel active">
      <div class="card">
        <div class="field">
          <label class="lbl">Full Name</label>
          <div class="inp-wrap">
            <span class="inp-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
            <input type="text" placeholder="Your full name" class="inp" v-model="step1.fullName" required>
          </div>
        </div>
        <div class="field">
          <label class="lbl">Email Address</label>
          <div class="inp-wrap">
            <span class="inp-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
            <input type="email" placeholder="name@company.com" class="inp" v-model="step1.email" required>
          </div>
        </div>
        <div class="field">
          <label class="lbl">Phone Number</label>
          <div class="inp-wrap">
            <span class="inp-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15z"/></svg></span>
            <input type="tel" placeholder="+91 XXXXX XXXXX" class="inp" v-model="step1.phone" required>
          </div>
        </div>
        <div class="field">
          <label class="lbl">Password</label>
          <div class="inp-wrap">
            <span class="inp-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></span>
            <input type="password" placeholder="Create password" class="inp" v-model="step1.password" required>
          </div>
        </div>
      </div>
      <div v-if="errorMessage" style="color:var(--danger);font-size:12px;margin-bottom:8px;text-align:center;">{{ errorMessage }}</div>
      <button class="btn btn-teal mt-12" @click="goStep(2)" style="width: 100%;">
        Continue
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:16px; height:16px; margin-left:8px;"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      <p style="text-align:center;font-size:12px;color:var(--muted);margin-top:12px;">Already have an account? <RouterLink :to="`/${currentRole}/dashboard`" style="color:var(--teal);font-weight:700;">Go to Dashboard</RouterLink></p>
    </div>

    <!-- Step 2: Business Info -->
    <div v-if="currentStep === 2" class="panel active">
      <div class="card">
        <div class="field">
          <label class="lbl">Business / Company Name</label>
          <div class="inp-wrap">
            <span class="inp-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg></span>
            <input type="text" placeholder="Your company name" class="inp" v-model="step2.companyName" required>
          </div>
        </div>
        <div class="field">
          <label class="lbl">City</label>
          <div class="inp-wrap">
            <span class="inp-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
            <input type="text" placeholder="Your city" class="inp" v-model="step2.city" required>
          </div>
        </div>
        <div class="field">
          <label class="lbl">GST Number (Optional)</label>
          <div class="inp-wrap">
            <span class="inp-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg></span>
            <input type="text" placeholder="e.g. 29AAACC1234C1Z5" class="inp" v-model="step2.gst">
          </div>
        </div>
        <div class="field">
          <label class="lbl">Product Category</label>
          <div class="inp-wrap">
            <span class="inp-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg></span>
            <select class="inp" style="padding-left:44px;" v-model="step2.category">
              <option value="">Select category</option>
              <option>Hardware</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <input type="checkbox" class="custom-checkbox" id="terms" v-model="step2.agreedToTerms">
          <label for="terms" style="font-size:12px;color:var(--muted);">I agree to <a href="#" style="color:var(--teal);font-weight:700;">Terms &amp; Conditions</a></label>
        </div>
      </div>
      <div v-if="errorMessage" style="color:var(--danger);font-size:12px;margin-bottom:8px;text-align:center;">{{ errorMessage }}</div>
      <div style="display:flex;gap:10px;margin-top:12px;">
        <button class="btn" @click="goStep(1)" style="flex:0 0 80px;background:#f3f4f6;color:var(--text);box-shadow:none;border-radius:var(--radius);">Back</button>
        <button class="btn btn-teal" style="flex:1;" :disabled="loading" @click="doRegister">
          {{ loading ? 'Creating...' : 'Create Account' }}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:16px; height:16px; margin-left:8px;"><polyline points="20 6 9 17 4 12"/></svg>
        </button>
      </div>
    </div>

    <!-- Step 3: Success -->
    <div v-if="currentStep === 3" class="panel active">
      <div class="card" style="text-align:center;padding:40px 20px;">
        <div style="width:70px;height:70px;background:var(--teal-dim);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:32px;">✓</div>
        <h3 style="font-size:22px;font-weight:800;color:var(--navy);margin-bottom:8px;font-family:'Barlow',sans-serif;">Account Created!</h3>
        <p style="font-size:13px;color:var(--muted);line-height:1.6;margin-bottom:24px;">Welcome to YouVBiZ! Your account is under review. You'll receive a confirmation shortly.</p>
        <RouterLink :to="`/${currentRole}/dashboard`" class="btn btn-teal" style="text-decoration:none;display:flex;">Go to Dashboard</RouterLink>
      </div>
    </div>

  </div> <!-- /sheet -->

  <!-- Toast -->
  <div class="toast" :class="{ show: toastVisible }">{{ toastMessage }}</div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

// ── State ──
const loading = ref(false)
const errorMessage = ref('')
const toastMessage = ref('')
const toastVisible = ref(false)
const currentStep = ref(1)
const currentRole = ref('manufacturer')

const roles = [
  {
    key: 'manufacturer',
    label: 'Manufacturer/<br>Importer',
    svgPath: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>'
  },
  {
    key: 'distributor',
    label: 'Distributor/<br>Wholesaler',
    svgPath: '<rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>'
  },
  {
    key: 'retailer',
    label: 'Retailer',
    svgPath: '<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>'
  }
]

const step1 = reactive({ fullName: '', email: '', phone: '', password: '' })
const step2 = reactive({ companyName: '', city: '', gst: '', category: '', agreedToTerms: false })

// ── Helpers ──
function stepNumClass(n) {
  if (n < currentStep.value) return 'sp-num done'
  if (n === currentStep.value) return 'sp-num active'
  return 'sp-num'
}

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2500)
}

function goStep(n) {
  errorMessage.value = ''
  if (n === 2) {
    if (!step1.fullName.trim() || !step1.email.trim() || !step1.phone.trim() || !step1.password.trim()) {
      errorMessage.value = 'Please fill all required fields'
      return
    }
  }
  currentStep.value = n
}

// ── API: Register ──
async function doRegister() {
  errorMessage.value = ''
  if (!step2.companyName.trim() || !step2.city.trim()) {
    errorMessage.value = 'Please fill all required fields'
    return
  }
  if (!step2.agreedToTerms) {
    errorMessage.value = 'Please agree to the Terms & Conditions'
    return
  }
  try {
    loading.value = true
    await axios.post('/api/auth/register', {
      role: currentRole.value,
      fullName: step1.fullName,
      email: step1.email,
      phone: step1.phone,
      password: step1.password,
      companyName: step2.companyName,
      city: step2.city,
      gst: step2.gst,
      category: step2.category
    })
    currentStep.value = 3
  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.mob-roles { display: flex; gap: 9px; margin-bottom: 18px; }
.mob-role { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 7px; padding: 14px 6px 12px; border-radius: 18px; border: 2px solid #dde3ec; background: #fff; cursor: pointer; transition: all .22s ease; box-shadow: var(--shadow-sm); }
.mob-role.active { border-color: var(--navy); background: var(--navy); }
.mob-role-ico { width: 42px; height: 42px; border-radius: 13px; background: #eef1f6; display: flex; align-items: center; justify-content: center; }
.mob-role.active .mob-role-ico { background: rgba(34,162,138,.2); }
.mob-role-ico svg { width: 20px; height: 20px; color: var(--navy); }
.mob-role.active .mob-role-ico svg { color: var(--teal); }
.mob-role-name { font-size: 10px; font-weight: 700; color: #374151; text-align: center; line-height: 1.3; }
.mob-role.active .mob-role-name { color: #fff; }

.panel { display: none; }
.panel.active { display: block; animation: fadeInUp .28s ease forwards; }

.step-progress { display: flex; align-items: center; gap: 0; margin-bottom: 20px; }
.sp { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
.sp-num { width: 28px; height: 28px; border-radius: 50%; background: var(--border); color: var(--muted); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; transition: all .3s; }
.sp-num.active { background: var(--teal); color: #fff; box-shadow: 0 0 0 4px rgba(34,162,138,.2); }
.sp-num.done { background: var(--navy); color: #fff; }
.sp-lbl { font-size: 9px; color: var(--muted); text-transform: uppercase; letter-spacing: .3px; }
.sp-lbl.active { color: var(--teal); }
.sp-line { flex: 1; height: 2px; background: var(--border); margin: 0 4px 14px; transition: background .3s; }
.sp-line.done { background: var(--teal); }

.custom-checkbox { appearance: none; width: 18px; height: 18px; border: 2px solid #D1D5DB; border-radius: 4px; background: white; cursor: pointer; position: relative; transition: all .3s; }
.custom-checkbox:checked { background: var(--teal); border-color: var(--teal); }
.custom-checkbox:checked::after { content: '✓'; position: absolute; color: white; font-size: 12px; top: 50%; left: 50%; transform: translate(-50%,-50%); }
</style>
