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
        <span class="topbar-title">Certificates</span>
        <div style="width:36px;"></div>
      </div>

      <!-- Hero -->
      <div class="hero" style="padding:20px 22px 50px;">
        <div class="hero-inner">
          <h1 class="hero-title" style="font-size:24px;">Business <span class="accent">Certificates</span></h1>
          <p class="hero-sub">Showcase your certifications & compliance.</p>
        </div>
      </div>

      <!-- Main Sheet -->
      <div class="sheet">
        <!-- Form Card -->
        <div class="card" style="margin-bottom:20px;">
          <h3 class="section-title" style="margin-bottom:16px;">Add New Certificate</h3>
          
          <div class="field">
            <label class="lbl">Certificate Title *</label>
            <input class="inp inp-no-ico" type="text" v-model="certTitle" placeholder="e.g. ISO 9001:2015">
          </div>
          
          <div class="field">
            <label class="lbl">Issuing Authority</label>
            <input class="inp inp-no-ico" type="text" v-model="certIssuer" placeholder="e.g. BIS, FSSAI, ISO">
          </div>
          
          <div class="field">
            <label class="lbl">Valid Until</label>
            <input class="inp inp-no-ico" type="date" v-model="certDate">
          </div>
          
          <div class="field">
            <label class="lbl">Upload Evidence (PDF/Image)</label>
            <input type="file" id="certFile" accept="image/*,.pdf" style="display:none;" @change="handleFileUpload">
            <label for="certFile" class="cert-upload-box">
              <div style="font-size:32px;">🏅</div>
              <div style="font-weight:700;color:var(--navy);font-size:14px;">Click to Upload</div>
              <div style="font-size:11px;color:var(--muted);">{{ uploadedFileName || 'Supports PDF, JPG, PNG' }}</div>
            </label>
          </div>
          
          <button class="btn btn-teal mt-12" @click="addCert" style="width:100%; margin-top:12px;">Add Certificate</button>
        </div>

        <!-- Existing Certs -->
        <div class="sec-header mt-16" style="margin-top:16px;">
          <h3>My Certificates</h3>
        </div>
        
        <div id="certList">
          <transition-group name="list">
            <div v-for="cert in certificates" :key="cert.id" class="cert-card">
              <div class="cert-ico">{{ cert.icon }}</div>
              <div style="flex:1;min-width:0;">
                <div class="cert-name">{{ cert.title }}</div>
                <div class="cert-issuer">{{ cert.issuer }}</div>
              </div>
              <button class="cert-del" @click="removeCert(cert.id)">🗑</button>
            </div>
          </transition-group>
        </div>
        
        <!-- Bottom Spacing -->
        <div style="height:60px;"></div>
      </div> <!-- Closes .sheet -->

      <!-- Bottom Nav -->
      <nav class="bottom-nav">
        <router-link to="/dashboard" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home</router-link>
        <router-link to="/products" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>Products</router-link>
        <router-link to="/messages" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Messages</router-link>
        <router-link to="/membership" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Membership</router-link>
        <router-link to="/profile" class="nav-item active"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile</router-link>
      </nav>

      <!-- Toast Component -->
      <div class="toast" :class="{ show: toastVisible }">{{ toastMsg }}</div>

    </div> <!-- Closes .app -->
  </div><!-- /phone-screen -->
</div><!-- /phone-frame -->
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const certTitle = ref('')
const certIssuer = ref('')
const certDate = ref('')
const uploadedFileName = ref('')

const certificates = ref([
  { id: 1, icon: '🏅', title: 'ISO 9001:2015', issuer: 'Bureau of Indian Standards · Valid till Dec 2026' },
  { id: 2, icon: '📜', title: 'BIS Certification', issuer: 'BIS India · Valid till Jun 2025' },
  { id: 3, icon: '✅', title: 'FSSAI License', issuer: 'Food Safety & Standards Authority · Valid till Mar 2026' }
])

let nextId = 4

const toastVisible = ref(false)
const toastMsg = ref('')

const showToast = (msg) => {
  toastMsg.value = msg
  toastVisible.value = true
  setTimeout(() => {
    toastVisible.value = false
  }, 2500)
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    uploadedFileName.value = file.name
  }
}

const addCert = () => {
  if (!certTitle.value.trim()) {
    showToast('Please enter a certificate title')
    return
  }
  
  const issuerValue = certIssuer.value.trim() || 'Unknown Authority'
  let displayIssuer = issuerValue
  
  if (certDate.value) {
    const d = new Date(certDate.value)
    const options = { month: 'short', year: 'numeric' }
    displayIssuer += ` · Valid till ${d.toLocaleDateString(undefined, options)}`
  }
  
  certificates.value.unshift({
    id: nextId++,
    icon: '🏅',
    title: certTitle.value.trim(),
    issuer: displayIssuer
  })
  
  certTitle.value = ''
  certIssuer.value = ''
  certDate.value = ''
  uploadedFileName.value = ''
  
  showToast('Certificate added!')
}

const removeCert = (id) => {
  certificates.value = certificates.value.filter(c => c.id !== id)
  showToast('Certificate removed')
}
</script>

<style scoped>
.cert-upload-box {
  border: 2px dashed var(--border);
  border-radius: var(--radius);
  padding: 30px 20px;
  text-align: center;
  cursor: pointer;
  transition: var(--transition);
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.cert-upload-box:hover, .cert-upload-box:active {
  border-color: var(--teal);
  background: var(--teal-dim);
}
.cert-card {
  background: var(--card);
  border-radius: var(--radius);
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  gap: 14px;
  border: 1px solid var(--border);
}
.cert-ico {
  width: 44px; height: 44px; border-radius: 12px;
  background: #fffbeb; color: #d97706;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; flex-shrink: 0;
}
.cert-name { font-size: 14px; font-weight: 700; color: var(--text); }
.cert-issuer { font-size: 12px; color: var(--muted); margin-top: 2px; }
.cert-del {
  margin-left: auto; width: 32px; height: 32px; border-radius: 8px;
  border: 1.5px solid var(--border); background: transparent;
  display: flex; align-items: center; justify-content: center;
  color: var(--danger); cursor: pointer; transition: var(--transition);
}
.cert-del:hover { background: #fee2e2; border-color: #ef4444; }

/* Transitions for List */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

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