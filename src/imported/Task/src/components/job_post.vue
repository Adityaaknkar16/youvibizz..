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

      <div class="topbar">
        <a href="#" class="back-btn" @click="router.go(-1)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </a>
        <span class="topbar-title">Post a Job</span>
        <div style="width:36px;"></div>
      </div>
      <div class="hero" style="padding:20px 22px 50px;">
        <div class="hero-inner">
          <h1 class="hero-title" style="font-size:24px;">Hire <span class="accent">Talent</span></h1>
          <p class="hero-sub">Post a job opening in minutes.</p>
        </div>
      </div>
      <div class="sheet">
        <div class="card form-section">
          <div class="section-title">Job Details</div>
          <div class="field">
            <label class="lbl">Job Title *</label>
            <input class="inp inp-no-ico" v-model="jobTitle" placeholder="e.g. Sales Executive, Production Supervisor">
          </div>
          
          <div class="form-row">
            <div class="field">
              <label class="lbl">Department *</label>
              <select class="inp inp-no-ico" v-model="jobDept">
                <option value="">Select...</option>
                <option>Sales</option><option>Production</option><option>Logistics</option>
                <option>Quality Control</option><option>Accounts</option><option>HR</option>
                <option>Operations</option><option>Procurement</option><option>IT</option>
              </select>
            </div>
            <div class="field">
              <label class="lbl">Experience</label>
              <select class="inp inp-no-ico" v-model="jobExp">
                <option>Fresher (0–1 yr)</option><option>1–3 Years</option>
                <option>3–5 Years</option><option>5–8 Years</option><option>8+ Years</option>
              </select>
            </div>
          </div>

          <div class="field">
            <label class="lbl">Job Description *</label>
            <textarea class="inp inp-no-ico" v-model="jobDesc" rows="4" placeholder="Describe responsibilities..."></textarea>
          </div>

          <label class="lbl">Required Skills</label>
          <div class="checkbox-group">
            <label v-for="skill in availableSkills" :key="skill" class="check-pill" :class="{ checked: selectedSkills.includes(skill) }">
              <input type="checkbox" :value="skill" v-model="selectedSkills"> {{ skill }}
            </label>
          </div>
        </div>

        <div class="card form-section">
          <div class="section-title">Type & Compensation</div>
          <div class="form-row">
            <div class="field">
              <label class="lbl">Job Type</label>
              <select class="inp inp-no-ico" v-model="jobType">
                <option>Full-time</option><option>Part-time</option>
                <option>Contract</option><option>Internship</option>
              </select>
            </div>
            <div class="field">
              <label class="lbl">Work Mode</label>
              <select class="inp inp-no-ico" v-model="jobMode">
                <option>On-site</option><option>Hybrid</option><option>Remote</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="field">
              <label class="lbl">Min Salary (₹/mo)</label>
              <input class="inp inp-no-ico" v-model="salMin" type="number" placeholder="e.g. 15000">
            </div>
            <div class="field">
              <label class="lbl">Max Salary (₹/mo)</label>
              <input class="inp inp-no-ico" v-model="salMax" type="number" placeholder="e.g. 25000">
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
            <div class="toggle" :class="{ on: salConfidential }" @click="salConfidential = !salConfidential"></div>
            <span style="font-size:13px;color:var(--muted);">Mark salary as confidential</span>
          </div>
        </div>

        <div class="card form-section">
          <div class="section-title">Location</div>
          <div class="field">
            <label class="lbl">Job Location *</label>
            <input class="inp inp-no-ico" v-model="jobLoc" placeholder="City, State">
          </div>
          <div class="form-row">
            <div class="field">
              <label class="lbl">Number of Openings</label>
              <input class="inp inp-no-ico" v-model="jobOpenings" type="number" placeholder="e.g. 2">
            </div>
            <div class="field">
              <label class="lbl">Application Deadline</label>
              <input class="inp inp-no-ico" v-model="jobDeadline" type="date">
            </div>
          </div>
        </div>

        <button class="btn btn-teal w-full" @click="submitJob" style="margin-bottom:24px;">
          Post Job Listing
        </button>
      </div>
    </div>
    <div class="toast" :class="{ show: toastVisible }">{{ toastMsg }}</div>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const jobTitle = ref('')
const jobDept = ref('')
const jobExp = ref('Fresher (0–1 yr)')
const jobDesc = ref('')
const selectedSkills = ref([]) 
const jobType = ref('Full-time')
const jobMode = ref('On-site')
const salMin = ref('')
const salMax = ref('')
const salConfidential = ref(false)
const jobLoc = ref('')
const jobOpenings = ref(1)
const jobDeadline = ref('')

const availableSkills = [
  'B2B Sales', 'Negotiation', 'Excel/ERP', 'Quality Mgmt', 'Logistics', 'Machine Operation', 'Team Management'
]

const toastVisible = ref(false)
const toastMsg = ref('')

const showToast = (msg) => {
  toastMsg.value = msg
  toastVisible.value = true
  setTimeout(() => {
    toastVisible.value = false
  }, 2500)
}

const submitJob = () => {
  if (!jobTitle.value.trim()) {
    showToast('Please enter a job title')
    return
  }
  if (!jobDept.value) {
    showToast('Please select a department')
    return
  }
  if (!jobDesc.value.trim()) {
    showToast('Please enter a job description')
    return
  }
  if (!jobLoc.value.trim()) {
    showToast('Please enter the job location')
    return
  }
  
  showToast('Job posted successfully!')
  setTimeout(() => {
    router.go(-1)
  }, 1200)
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

/* Toast Styling */
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