<template>
  <div style="display: contents">
    <div class="phone-notch" style="display: none !important"><div class="notch-speaker"></div><div class="notch-camera"></div></div>
    <div class="status-bar" style="display: none !important">
      <span class="status-time">9:41</span>
      <div class="status-icons">
        <svg viewBox="0 0 24 24" fill="white">
          <rect x="1" y="15" width="4" height="6" rx="1"/>
          <rect x="7" y="11" width="4" height="10" rx="1"/>
          <rect x="13" y="7" width="4" height="14" rx="1"/>
          <rect x="19" y="3" width="4" height="18" rx="1" opacity=".3"/>
        </svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round">
          <path d="M5 12.55a11 11 0 0114.08 0"/>
          <path d="M1.42 9a16 16 0 0121.16 0"/>
          <path d="M8.53 16.11a6 6 0 016.95 0"/>
          <circle cx="12" cy="20" r="1" fill="white" stroke="none"/>
        </svg>
        <div class="battery-icon"><div class="battery-body"><div class="battery-fill"></div></div></div>
      </div>
    </div>

    <div style="display: contents; height: 100%;">
      <div class="page-content">

        <!-- Transparent Topbar (identical inline styles from original) -->
        <div class="topbar" style="position:absolute;background:transparent;border:none;">
          <a href="#" @click.prevent="$router.back()" class="back-btn" style="background:rgba(0,0,0,.4);">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </a>
          <div class="topbar-actions">
            <button class="topbar-icon-btn" style="background:rgba(0,0,0,.4);" @click="showToast('Link copied!')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Cover Image -->
        <img class="profile-cover" src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800" alt="TradeMax Wholesale">

        <!-- Profile Intro -->
        <div class="profile-intro">
          <div class="profile-ava">TW</div>
          <div class="cname">TradeMax Wholesale</div>
          <div class="ctype">Distributor · Multi-category Wholesale · Est. 2015</div>
          <div class="cbadges">
            <span class="pill pill-teal">✓ Verified</span>
            <span class="pill pill-navy">⭐ 4.8 Rating</span>
          </div>
          <div class="cactions">
            <button class="enquiry-btn" @click="showEnquiry">Send Message</button>
            <button class="call-btn" @click="showToast('Calling +91 XXXXX XXXXX...')">Call Now</button>
            <button class="share-btn" @click="showToast('Link copied!')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;margin:auto;display:block;">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Stats -->
        <div class="profile-stats">
          <div class="pstat"><div class="pstat-val">250+</div><div class="pstat-lbl">Brands</div></div>
          <div class="pstat"><div class="pstat-val">1500+</div><div class="pstat-lbl">Connects</div></div>
          <div class="pstat"><div class="pstat-val">10yr</div><div class="pstat-lbl">Experience</div></div>
        </div>

        <!-- Tab Bar -->
        <div class="tab-bar">
          <div class="tbar-item" :class="{ active: activeTab === 'about' }"    @click="switchTab('about')">About</div>
          <div class="tbar-item" :class="{ active: activeTab === 'products' }" @click="switchTab('products')">Portfolio</div>
          <div class="tbar-item" :class="{ active: activeTab === 'reviews' }"  @click="switchTab('reviews')">Reviews</div>
        </div>

        <!-- Tab Panel: About — matches original HTML exactly -->
        <div class="tab-panel" :class="{ active: activeTab === 'about' }" id="tab-about">
          <p class="sec-label">About the Company</p>
          <div class="card mb-12">
            <p style="font-size:13px;line-height:1.7;color:var(--text);">TradeMax Wholesale is one of Maharashtra's largest distributors of interior hardware and building materials. We provide a wide range of products to retailers across the state.</p>
          </div>
        </div>

        <!-- Tab Panel: Portfolio -->
        <div class="tab-panel" :class="{ active: activeTab === 'products' }" id="tab-products">
          <p class="sec-label">Portfolio</p>
          <div class="card mb-12">
            <p style="font-size:13px;line-height:1.7;color:var(--text);">Product portfolio will be listed here.</p>
          </div>
        </div>

        <!-- Tab Panel: Reviews -->
        <div class="tab-panel" :class="{ active: activeTab === 'reviews' }" id="tab-reviews">
          <p class="sec-label">Reviews</p>
          <div class="card mb-12">
            <p style="font-size:13px;line-height:1.7;color:var(--text);">Customer reviews will appear here.</p>
          </div>
        </div>

        <div style="height:80px;"></div>
      </div>
      <!-- /app -->

      <!-- Bottom Nav -->
      <nav class="bottom-nav">
        <a href="/pages/adityavuetask/distributor-dashboard" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home
        </a>
        <a href="/pages/task/listing" class="nav-item active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>Explore
        </a>
        <a href="/retailer/messages" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Messages
        </a>
        <a href="/pages/tanaya/membership-plan" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Membership
        </a>
        <a href="/retailer/profile" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile
        </a>
      </nav>
    </div>
    <!-- /phone-screen -->
  </div>
  <!-- /phone-frame -->

  <!-- ══════════════════════════════════════════════════════════
       Enquiry Modal — placed OUTSIDE .phone-frame exactly as in
       original HTML (body-level sibling of phone-frame).
       display toggled via :style binding to match original
       style="display:none" / style="display:flex" pattern.
  ═══════════════════════════════════════════════════════════════ -->
  <div
    id="enquiryModal"
    class="modal-overlay"
    :style="{
      display: isEnquiryOpen ? 'flex' : 'none',
      position: 'absolute',
      inset: '0',
      background: 'rgba(0,0,0,.5)',
      zIndex: 400,
      alignItems: 'flex-end'
    }"
    @click.self="closeEnquiry"
  >
    <div style="background:var(--card);border-radius:24px 24px 0 0;padding:24px 20px 40px;width:100%;">
      <div style="width:40px;height:4px;background:var(--border);border-radius:2px;margin:0 auto 20px;"></div>
      <div style="font-size:17px;font-weight:700;color:var(--navy);margin-bottom:16px;">Send Message</div>
      <div class="field">
        <label class="lbl">Message</label>
        <textarea class="inp inp-no-ico" v-model="enquiryMessage" rows="3" placeholder="Write your message..."></textarea>
      </div>
      <p v-if="enquiryError" style="color:red;font-size:12px;margin-bottom:8px;">{{ enquiryError }}</p>
      <button class="btn btn-teal" :disabled="enquiryLoading" @click="sendEnquiry">
        {{ enquiryLoading ? 'Sending...' : 'Send' }}
      </button>
    </div>
  </div>

  <!-- Toast — sibling of phone-frame, same as original -->
  <div class="toast" :class="{ show: toast.show }">{{ toast.message }}</div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'

// ─── Tab switching ────────────────────────────────────────────
// activeTab drives :class="{ active: activeTab === '...' }" on each
// .tab-panel and .tbar-item — CSS handles display:none / display:block
const activeTab = ref('about')

function switchTab(id) {
  activeTab.value = id
}

// ─── Toast ────────────────────────────────────────────────────
const toast = reactive({ show: false, message: '' })

function showToast(msg) {
  toast.message = msg
  toast.show    = true
  setTimeout(() => { toast.show = false }, 2500)
}

// ─── Enquiry Modal ────────────────────────────────────────────
const isEnquiryOpen  = ref(false)
const enquiryMessage = ref('')
const enquiryLoading = ref(false)
const enquiryError   = ref('')

function showEnquiry() {
  enquiryMessage.value = ''
  enquiryError.value   = ''
  isEnquiryOpen.value  = true
}

function closeEnquiry() {
  isEnquiryOpen.value = false
}

async function sendEnquiry() {
  enquiryError.value = ''
  if (!enquiryMessage.value.trim()) {
    enquiryError.value = 'Please write a message before sending.'
    return
  }
  try {
    enquiryLoading.value = true
    await axios.post('/api/enquiries', {
      distributorId: 'trademax-wholesale',
      message: enquiryMessage.value.trim(),
    })
    closeEnquiry()
    showToast('Message sent!')
  } catch (err) {
    enquiryError.value = err.response?.data?.message || 'Failed to send. Please try again.'
  } finally {
    enquiryLoading.value = false
  }
}
</script>

<style scoped>
/* ─── All styles copied verbatim from the original <style> block ─── */
.profile-cover { width: 100%; height: 180px; object-fit: cover; }
.profile-intro { background: var(--card); padding: 18px; border-bottom: 1px solid var(--border); position: relative; }
.profile-ava { width: 70px; height: 70px; border-radius: 18px; background: var(--teal); color: #fff; font-family: 'Barlow', sans-serif; font-size: 28px; font-weight: 800; display: flex; align-items: center; justify-content: center; border: 3px solid #fff; margin-top: -40px; box-shadow: var(--shadow); margin-bottom: 12px; }
.cname { font-size: 20px; font-weight: 800; color: var(--text); margin-bottom: 3px; font-family: 'Barlow', sans-serif; }
.ctype { font-size: 13px; color: var(--muted); margin-bottom: 10px; }
.cbadges { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
.cactions { display: flex; gap: 10px; }
.cactions button { flex: 1; height: 42px; border-radius: 10px; font-size: 13px; font-weight: 700; border: none; cursor: pointer; transition: var(--transition); }
.enquiry-btn { background: var(--teal); color: #fff; }
.enquiry-btn:hover { background: var(--teal2); }
.call-btn { background: var(--navy); color: #fff; }
.call-btn:hover { background: var(--navy3); }
.share-btn { background: #f3f4f6; color: var(--text); flex: 0 0 42px !important; border-radius: 10px; }
.profile-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; background: var(--card); border-bottom: 1px solid var(--border); }
.pstat { padding: 14px; text-align: center; border-right: 1px solid var(--border); }
.pstat:last-child { border-right: none; }
.pstat-val { font-size: 18px; font-weight: 800; color: var(--navy); font-family: 'Barlow', sans-serif; }
.pstat-lbl { font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: .3px; }
.tab-bar { display: flex; background: var(--card); border-bottom: 2px solid var(--border); position: sticky; top: 60px; z-index: 10; }
.tbar-item { flex: 1; padding: 14px 8px; text-align: center; font-size: 12px; font-weight: 700; color: var(--muted); cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: var(--transition); }
.tbar-item.active { color: var(--teal); border-bottom-color: var(--teal); }
.tab-panel { display: none; padding: 18px; }
.tab-panel.active { display: block; }
</style>
