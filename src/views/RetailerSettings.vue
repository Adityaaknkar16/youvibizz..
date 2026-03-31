<template>

      <!-- Topbar -->
      <div class="topbar anim">
        <button @click="$router.back()" class="back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <div class="top-title">Settings
        <div style="width:32px;">

        <!-- Hero Summary -->
        <div class="hero anim" style="padding:24px 22px 50px;">
          <div class="hero-inner">
            <h1 class="hero-title" style="font-size:24px;">Account <span class="accent">Settings</span></h1>
            <p class="hero-sub">Manage your preferences and security.</p>

        <div class="sheet anim">
          
          <!-- Notifications -->
          <p class="sec-label">Notifications</p>
          <div class="card settings-section">
            <div v-for="item in notificationSettings" :key="item.key" class="settings-row">
              <div class="settings-ico" :style="item.icoStyle">{{ item.icon }}
              <div class="settings-label">
                <div class="settings-title">{{ item.title }}
                <div class="settings-sub">{{ item.sub }}
            
              <div class="toggle" :class="{ on: item.enabled }" @click="item.enabled = !item.enabled">

          <!-- Security & Privacy -->
          <p class="sec-label">Security & Privacy</p>
          <div class="card settings-section">
            <div class="settings-row clickable" @click="changePassword">
              <div class="settings-ico" style="background:#fef9c3;">🔑
              <div class="settings-label">
                <div class="settings-title">Change Password
                <div class="settings-sub">Update your account password
            
              <div class="settings-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>

            <div class="settings-row">
              <div class="settings-ico" style="background:#f0fdf4;">📞
              <div class="settings-label">
                <div class="settings-title">Show Phone Number
                <div class="settings-sub">Visible on your profile
            
              <div class="toggle" :class="{ on: privacy.showPhone }" @click="privacy.showPhone = !privacy.showPhone">

          <!-- Documentation -->
          <p class="sec-label">Resources</p>
          <div class="card settings-section">
            <div class="settings-row clickable" @click="showToast('Help Center coming soon')">
              <div class="settings-ico" style="background:#e8f4fe;">❓
              <div class="settings-label">
                <div class="settings-title">Help Center
                <div class="settings-sub">FAQs and support guides
            
              <div class="settings-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          
            <div class="settings-row clickable" @click="showToast('Privacy Policy coming soon')">
              <div class="settings-ico" style="background:#ede9fe;">⚖️
              <div class="settings-label">
                <div class="settings-title">Privacy Policy
                <div class="settings-sub">How we handle your data
            
              <div class="settings-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>

          <!-- Danger Zone -->
          <p class="sec-label">Danger Zone</p>
          <div class="danger-zone">
            <div class="danger-title">Delete Account
            <p class="danger-sub">Permanently delete your account. This action cannot be undone.</p>
            <button class="btn-danger-outline" @click="requestDeletion">Request Deletion</button>

          <div style="height: 40px;">
      <!-- /.sheet -->
    <!-- /.app -->

      <!-- Toast -->
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
</template>

<script setup>
import { ref, reactive } from 'vue'

const notificationSettings = ref([
  { key: 'enquiry', icon: '🔔', title: 'New Enquiries', sub: 'Alerts when someone contacts you', enabled: true, icoStyle: 'background:#e8faf0;color:#16a34a;' },
  { key: 'whatsapp', icon: '💬', title: 'WhatsApp Alerts', sub: 'Fast updates on WhatsApp', enabled: true, icoStyle: 'background:#f3e8ff;color:#9333ea;' }
])

const privacy = reactive({ showPhone: true })
const toastVisible = ref(false)
const toastMessage = ref('')

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2500)
}

function changePassword() {
  showToast('Password reset link sent to email')
}

function requestDeletion() {
  showToast('Contact support to delete account')
}
</script>

<style scoped>
.settings-section { margin-bottom: 24px; }
.settings-row { display: flex; align-items: center; gap: 14px; padding: 16px 0; border-bottom: 1.5px solid var(--border); }
.settings-row:last-child { border-bottom: none; }
.settings-row.clickable { cursor: pointer; transition: all 0.2s; }
.settings-row.clickable:active { opacity: 0.6; }

.settings-ico { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
.settings-label { flex: 1; }
.settings-title { font-size: 15px; font-weight: 700; color: var(--navy); }
.settings-sub { font-size: 11px; color: var(--muted); margin-top: 1px; font-weight: 500; }

.toggle { width: 44px; height: 24px; border-radius: 12px; background: var(--border); position: relative; cursor: pointer; transition: 0.3s; flex-shrink: 0; }
.toggle.on { background: var(--teal); }
.toggle::after { content: ''; position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: 0.3s; box-shadow: 0 1px 4px rgba(0,0,0,0.1); }
.toggle.on::after { left: 23px; }

.settings-arrow { color: var(--muted); }
.settings-arrow svg { width: 16px; height: 16px; }

.danger-zone { border: 1.5px solid #fee2e2; border-radius: 16px; padding: 16px; background: #fff1f2; }
.danger-title { font-size: 14px; font-weight: 700; color: #dc2626; margin-bottom: 4px; }
.danger-sub { font-size: 12px; color: #991b1b; margin-bottom: 14px; line-height: 1.4; opacity: 0.8; }
.btn-danger-outline { width: 100%; border: 1.5px solid #dc2626; background: transparent; color: #dc2626; padding: 10px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; }
</style>
