<template>
  <div style="display: contents">
    <div class="phone-notch" style="display: none !important">
      <div class="notch-speaker"></div>
      <div class="notch-camera"></div>
    </div>
    <div class="status-bar" style="display: none !important">
      <span class="status-time">9:41</span>
      <div class="status-icons">
        <svg viewBox="0 0 24 24" fill="white">
          <rect x="1" y="15" width="4" height="6" rx="1"/>
          <rect x="7" y="11" width="4" height="10" rx="1"/>
          <rect x="13" y="7" width="4" height="14" rx="1"/>
          <rect x="19" y="3" width="4" height="18" rx="1" opacity=".3"/>
        </svg>
        <div class="battery-icon">
          <div class="battery-body">
            <div class="battery-fill"></div>
          </div>
        </div>
      </div>
    </div>
    <div style="display: contents; height: 100%;">
      <div class="page-content">
        <div class="topbar">
          <a href="#" @click.prevent="$router.back()" class="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </a>
          <span class="topbar-title">Reply to Enquiry</span>
          <div style="width:36px;"></div>
        </div>
        
        <div class="hero" style="padding:20px 22px 50px;">
          <div class="hero-inner">
            <h1 class="hero-title" style="font-size:24px;">Send a <span class="accent">Reply</span></h1>
            <p class="hero-sub">Respond professionally to build relationships.</p>
          </div>
        </div>
        
        <div class="sheet" style="padding-bottom:100px;">
          <div class="field" style="margin-bottom:14px;">
            <label class="lbl">Select Enquiry</label>
            <div class="inp-wrap enq-select-wrap">
              <select class="inp inp-no-ico" id="enqSelector" v-model="selectedEnquiry" @change="loadEnquiry">
                <option value="">— Choose an enquiry —</option>
                <option value="1">Rajesh Traders — Looking for Gurjan Face...</option>
                <option value="2">Priya Suppliers — Interested in partnersh...</option>
              </select>
            </div>
          </div>
          
          <div id="enqSummary" v-if="currentEnquiry">
            <div class="enq-summary" id="summaryBox">
              <div class="enq-summary-name">{{ currentEnquiry.name }}</div>
              <div class="enq-summary-msg">"{{ currentEnquiry.message }}"</div>
            </div>
            <div class="card">
              <p style="font-size:13px;font-weight:700;color:var(--navy);margin-bottom:10px;">Quick Templates</p>
              <div class="template-chips">
                <span class="template-chip" @click="useTemplate('Thank you for your enquiry.')">🙏 Thank you</span>
                <span class="template-chip" @click="useTemplate('Our team will call you shortly.')">📞 Will call</span>
              </div>
              <div class="field">
                <label class="lbl">Your Reply *</label>
                <textarea class="inp inp-no-ico" id="replyText" rows="4" placeholder="Write your reply..." v-model="replyText"></textarea>
              </div>
              <button class="btn btn-teal w-full" @click="sendReply">Send Reply 📤</button>
            </div>
          </div>
        </div> <!-- Closes .sheet -->
      </div> <!-- Closes .app -->

      <nav class="bottom-nav">
        <router-link to="/dashboard" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home
        </router-link>
        <router-link to="/products" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>Products
        </router-link>
        <router-link to="/messages" class="nav-item active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Messages
        </router-link>
        <router-link to="/membership" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Membership
        </router-link>
        <router-link to="/profile" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile
        </router-link>
      </nav>
      
      <div class="toast" :class="{ show: toastVisible }">{{ toastMsg }}</div>
    </div> <!-- Closes .phone-screen -->
  </div> <!-- Closes .phone-frame -->
</template>

<script setup>
import { ref } from 'vue'

const selectedEnquiry = ref('')
const currentEnquiry = ref(null)
const replyText = ref('')
const toastVisible = ref(false)
const toastMsg = ref('')

const enquiries = {
  1: { name: 'Rajesh Traders', message: 'Looking for Gurjan Face Commercial Ply 18mm in bulk...' },
  2: { name: 'Priya Suppliers', message: 'Interested in partnership opportunities...' }
}

const loadEnquiry = () => {
  if (selectedEnquiry.value) {
    currentEnquiry.value = enquiries[selectedEnquiry.value] || null
  } else {
    currentEnquiry.value = null
  }
}

const useTemplate = (t) => {
  replyText.value = t
}

const sendReply = () => {
  if (!replyText.value.trim()) return
  showToast('Reply sent successfully!')
  replyText.value = ''
}

const showToast = (msg) => {
  toastMsg.value = msg
  toastVisible.value = true
  setTimeout(() => {
    toastVisible.value = false
  }, 2500)
}
</script>

<style scoped>
.enq-summary { background: linear-gradient(135deg, var(--navy), var(--navy2)); border-radius: var(--radius); padding: 16px; margin-bottom: 16px; color: #fff; }
.enq-summary-name { font-size: 16px; font-weight: 800; margin-bottom: 4px; }
.enq-summary-msg { font-size: 12px; opacity: .7; line-height: 1.5; }
.enq-meta { display: flex; gap: 10px; margin-top: 10px; flex-wrap: wrap; }
.enq-meta-item { font-size: 11px; opacity: .8; display: flex; align-items: center; gap: 4px; }
.reply-bubble { border-radius: 14px 14px 14px 4px; padding: 12px 14px; margin-bottom: 10px; border-left: 3px solid var(--teal); background: #f0fdf4; }
.reply-bubble.own { background: #f0f4ff; border-radius: 14px 14px 4px 14px; border-left: none; border-right: 3px solid var(--navy2); }
.reply-from { font-size: 11px; font-weight: 700; color: var(--teal); margin-bottom: 4px; }
.reply-bubble.own .reply-from { color: var(--navy2); }
.reply-text { font-size: 13px; color: var(--text); line-height: 1.5; }
.reply-time { font-size: 10px; color: var(--muted); margin-top: 4px; }
.char-count { font-size: 11px; color: var(--muted); text-align: right; margin-top: 3px; }
.template-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
.template-chip { padding: 5px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; background: #f1f5f9; color: var(--navy); border: 1.5px solid var(--border); cursor: pointer; transition: var(--transition); }
.template-chip:hover { background: var(--teal-dim); border-color: var(--teal); color: var(--teal); }
.enq-select-wrap { position: relative; }
.enq-select-wrap::after { content: '▾'; position: absolute; right: 14px; top: 50%; transform: translateY(-50%); pointer-events: none; color: var(--muted); font-size: 12px; }

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