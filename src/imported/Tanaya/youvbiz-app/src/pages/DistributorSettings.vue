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
          <a href="#" @click.prevent="$router.back()" class="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </a>
          <span class="topbar-title">Settings</span>
          <div style="width:36px;"></div>
        </div>

        <!-- Hero -->
        <div class="hero" style="padding:20px 22px 50px;">
          <div class="hero-inner">
            <h1 class="hero-title" style="font-size:24px;">Account <span class="accent">Settings</span></h1>
            <p class="hero-sub">Manage your profile and preferences.</p>
          </div>
        </div>

        <!-- Sheet -->
        <div class="sheet">

          <!-- Notifications Section -->
          <p class="sec-label">Notifications</p>
          <div class="card settings-section">
            <div class="settings-row">
              <div class="settings-ico" style="background:#e8faf0;">🔔</div>
              <div class="settings-label">
                <div class="settings-title">Enquiry Alerts</div>
                <div class="settings-sub">Get notified for new enquiries</div>
              </div>
              <!-- Toggle: :class drives on/off, @click flips the ref -->
              <div class="toggle" :class="{ on: toggles.enquiryAlerts }" @click="toggles.enquiryAlerts = !toggles.enquiryAlerts"></div>
            </div>
            <div class="settings-row">
              <div class="settings-ico" style="background:#e8f4fe;">📧</div>
              <div class="settings-label">
                <div class="settings-title">Email Notifications</div>
                <div class="settings-sub">Receive updates via email</div>
              </div>
              <div class="toggle" :class="{ on: toggles.emailNotifications }" @click="toggles.emailNotifications = !toggles.emailNotifications"></div>
            </div>
          </div>

          <!-- Account Section -->
          <p class="sec-label">Account</p>
          <div class="card settings-section">
            <div class="settings-row" @click="showToast('Password reset email sent')" style="cursor:pointer;">
              <div class="settings-ico" style="background:#fef9c3;">🔑</div>
              <div class="settings-label">
                <div class="settings-title">Change Password</div>
                <div class="settings-sub">Update your login password</div>
              </div>
              <div class="settings-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </div>
            <a href="/pages/tanaya/membership-plan" class="settings-row" style="cursor:pointer;text-decoration:none;">
              <div class="settings-ico" style="background:#f3e8ff;">💳</div>
              <div class="settings-label">
                <div class="settings-title">Subscription Plan</div>
                <div class="settings-sub">Premium · Renews Mar 2026</div>
              </div>
              <div class="settings-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </a>
          </div>

          <!-- Danger Zone -->
          <p class="sec-label">Danger Zone</p>
          <div class="danger-zone">
            <div style="font-size:14px;font-weight:700;color:var(--danger);margin-bottom:8px;">Delete Account</div>
            <button class="btn btn-sm w-full" style="border:1.5px solid var(--danger);background:transparent;color:var(--danger);" @click="showToast('Contact support to delete account')">
              Request Account Deletion
            </button>
          </div>

        </div><!-- /sheet -->
      </div><!-- /app -->

      <!-- Bottom Nav -->
      <nav class="bottom-nav">
        <a href="/pages/adityavuetask/distributor-dashboard" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home
        </a>
        <a href="/pages/adityavuetask/distributor-products" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>Products
        </a>
        <a href="/pages/adityavuetask/distributor-messages" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Messages
        </a>
        <a href="/pages/tanaya/membership-plan" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Membership
        </a>
        <a href="/pages/adityavuetask/distributor-profile" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile
        </a>
      </nav>

      <!-- Toast — same position as original (inside phone-screen) -->
      <div class="toast" :class="{ show: toast.show }">{{ toast.message }}</div>

    </div><!-- /phone-screen -->
  </div><!-- /phone-frame -->
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'

// ─── Toggle states (both ON by default, matching original HTML) ─
const toggles = reactive({
  enquiryAlerts:      true,
  emailNotifications: true,
})

// ─── Toast ────────────────────────────────────────────────────
const toast = reactive({ show: false, message: '' })

function showToast(msg) {
  toast.message = msg
  toast.show    = true
  setTimeout(() => { toast.show = false }, 2500)
}

// ─── API: persist toggle changes ──────────────────────────────
import { watch } from 'vue'

watch(toggles, async (val) => {
  try {
    await axios.patch('/api/settings/notifications', {
      enquiryAlerts:      val.enquiryAlerts,
      emailNotifications: val.emailNotifications,
    })
  } catch {
    // silent fail — UI state is still updated
  }
}, { deep: true })
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
