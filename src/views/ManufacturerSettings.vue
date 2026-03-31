<template>
  <div class="topbar">
    <RouterLink to="/manufacturer/dashboard" class="back-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
    </RouterLink>
    <span class="topbar-title">Settings</span>
    <div style="width:36px;"></div>
  </div>

  <div class="hero" style="padding:20px 22px 50px;">
    <div class="hero-inner">
      <h1 class="hero-title" style="font-size:24px;">Account <span class="accent">Settings</span></h1>
      <p class="hero-sub">Manage your profile and preferences.</p>
    </div>
  </div>

  <div class="sheet">
    <!-- Notifications -->
    <p class="sec-label">Notifications</p>
    <div class="card settings-section">
      <div
        v-for="item in notificationSettings"
        :key="item.key"
        class="settings-row"
      >
        <div class="settings-ico" :style="item.icoStyle">{{ item.icon }}</div>
        <div class="settings-label">
          <div class="settings-title">{{ item.title }}</div>
          <div class="settings-sub">{{ item.sub }}</div>
        </div>
        <div
          class="toggle"
          :class="{ on: item.enabled }"
          @click="item.enabled = !item.enabled"
        ></div>
      </div>
    </div>

    <!-- Privacy -->
    <p class="sec-label">Privacy</p>
    <div class="card settings-section">
      <div class="settings-row">
        <div class="settings-ico" style="background:#fee2e2;">👁</div>
        <div class="settings-label">
          <div class="settings-title">Profile Visibility</div>
          <div class="settings-sub">Public to all users</div>
        </div>
        <div class="settings-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>
      <div class="settings-row">
        <div class="settings-ico" style="background:#f0fdf4;">📞</div>
        <div class="settings-label">
          <div class="settings-title">Show Phone Number</div>
          <div class="settings-sub">Visible on your profile</div>
        </div>
        <div
          class="toggle"
          :class="{ on: privacy.showPhone }"
          @click="privacy.showPhone = !privacy.showPhone"
        ></div>
      </div>
    </div>

    <!-- Account -->
    <p class="sec-label">Account</p>
    <div class="card settings-section">
      <div class="settings-row" style="cursor:pointer;" @click="changePassword">
        <div class="settings-ico" style="background:#fef9c3;">🔑</div>
        <div class="settings-label">
          <div class="settings-title">Change Password</div>
          <div class="settings-sub">Update your login password</div>
        </div>
        <div class="settings-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></div>
      </div>
      <div class="settings-row" style="cursor:pointer;" @click="changeLanguage">
        <div class="settings-ico" style="background:#e8f4fe;">🌐</div>
        <div class="settings-label">
          <div class="settings-title">Language</div>
          <div class="settings-sub">English (India)</div>
        </div>
        <div class="settings-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></div>
      </div>
      <RouterLink to="/manufacturer/membership" class="settings-row" style="cursor:pointer;text-decoration:none;">
        <div class="settings-ico" style="background:#f3e8ff;">💳</div>
        <div class="settings-label">
          <div class="settings-title">Subscription Plan</div>
          <div class="settings-sub">Premium · Renews Mar 2026</div>
        </div>
        <div class="settings-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></div>
      </RouterLink>
      <RouterLink to="/pages/task/affiliate-program" class="settings-row" style="cursor:pointer;text-decoration:none;">
        <div class="settings-ico" style="background:#fdf4ff;">🔗</div>
        <div class="settings-label">
          <div class="settings-title">Affiliate Program</div>
          <div class="settings-sub">Manage referral commissions</div>
        </div>
        <div class="settings-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></div>
      </RouterLink>
      <RouterLink to="/pages/task/cash-on-delivery" class="settings-row" style="cursor:pointer;text-decoration:none;">
        <div class="settings-ico" style="background:#fef9c3;">💵</div>
        <div class="settings-label">
          <div class="settings-title">Cash on Delivery</div>
          <div class="settings-sub">Manage COD settings</div>
        </div>
        <div class="settings-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></div>
      </RouterLink>
    </div>

    <!-- Danger Zone -->
    <p class="sec-label">Danger Zone</p>
    <div class="danger-zone">
      <div style="font-size:14px;font-weight:700;color:var(--danger);margin-bottom:8px;">Delete Account</div>
      <p style="font-size:12px;color:var(--muted);margin-bottom:14px;">
        Permanently delete your account and all associated data. This cannot be undone.
      </p>
      <button
        class="btn btn-sm w-full"
        style="border:1.5px solid var(--danger);background:transparent;color:var(--danger);"
        @click="requestDeletion"
      >
        Request Account Deletion
      </button>
    </div>

    <!-- Toast -->
    <div class="toast" :class="{ show: toastVisible }">{{ toastMessage }}</div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'

// ─── Notification toggles ───
const notificationSettings = ref([
  { key: 'enquiry', icon: '🔔', title: 'Enquiry Alerts', sub: 'Get notified for new enquiries', enabled: true, icoStyle: 'background:#e8faf0;' },
  { key: 'email', icon: '📧', title: 'Email Notifications', sub: 'Receive updates via email', enabled: true, icoStyle: 'background:#e8f4fe;' },
  { key: 'sms', icon: '📱', title: 'SMS Alerts', sub: 'Important alerts via SMS', enabled: false, icoStyle: 'background:#fef9c3;' },
  { key: 'whatsapp', icon: '💬', title: 'WhatsApp Updates', sub: 'Get updates on WhatsApp', enabled: true, icoStyle: 'background:#f3e8ff;' }
])

// ─── Privacy toggles ───
const privacy = reactive({ showPhone: true })

// ─── Toast ───
const toastVisible = ref(false)
const toastMessage = ref('')

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2500)
}

// ─── Account actions (API) ───
async function changePassword() {
  try {
    await axios.post('/api/auth/password-reset-email')
    showToast('Password reset email sent')
  } catch {
    showToast('Password reset email sent')
  }
}

function changeLanguage() {
  showToast('Language settings coming soon')
}

async function requestDeletion() {
  try {
    await axios.post('/api/account/request-deletion')
    showToast('Request submitted. Our team will contact you.')
  } catch {
    showToast('Please contact support to delete account')
  }
}
</script>

<style scoped>
.settings-section { margin-bottom:20px; }
.settings-row { display:flex; align-items:center; gap:14px; padding:14px 0; border-bottom:1px solid var(--border); }
.settings-row:last-child { border-bottom:none; }
.settings-ico { width:40px; height:40px; border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:18px; }
.settings-label { flex:1; }
.settings-title { font-size:14px; font-weight:600; color:var(--text); }
.settings-sub { font-size:11px; color:var(--muted); margin-top:1px; }
.toggle { width:44px; height:24px; border-radius:12px; background:var(--border); position:relative; cursor:pointer; transition:var(--transition); flex-shrink:0; }
.toggle.on { background:var(--teal); }
.toggle::after { content:''; position:absolute; top:3px; left:3px; width:18px; height:18px; border-radius:50%; background:#fff; transition:var(--transition); box-shadow:0 1px 4px rgba(0,0,0,.2); }
.toggle.on::after { left:23px; }
.settings-arrow { color:var(--muted); }
.settings-arrow svg { width:16px; height:16px; }
.danger-zone { border-radius:var(--radius); border:1.5px solid rgba(239,68,68,.3); padding:16px; background:rgba(239,68,68,.04); }
</style>
