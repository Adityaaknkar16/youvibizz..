<template>
  <!-- Transparent Topbar over cover -->
  <div class="topbar" style="position:absolute;background:transparent;border:none;z-index:10;">
    <a href="#" @click.prevent="$router.back()" class="back-btn" style="background:rgba(0,0,0,.4);">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </a>
    <div class="topbar-actions">
      <RouterLink to="/manufacturer/distributors/add" class="topbar-icon-btn" style="background:rgba(0,0,0,.4); text-decoration:none;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </RouterLink>
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
  <img class="profile-cover" src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800" alt="TradeMax Wholesale" />

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
    <div class="pstat">
      <div class="pstat-val">250+</div>
      <div class="pstat-lbl">Brands</div>
    </div>
    <div class="pstat">
      <div class="pstat-val">1500+</div>
      <div class="pstat-lbl">Connects</div>
    </div>
    <div class="pstat">
      <div class="pstat-val">10yr</div>
      <div class="pstat-lbl">Experience</div>
    </div>
  </div>

  <!-- Tab Bar -->
  <div class="tab-bar">
    <div class="tbar-item" :class="{ active: activeTab === 'about' }" @click="activeTab = 'about'">About</div>
    <div class="tbar-item" :class="{ active: activeTab === 'products' }" @click="activeTab = 'products'">Portfolio</div>
    <div class="tbar-item" :class="{ active: activeTab === 'reviews' }" @click="activeTab = 'reviews'">Reviews</div>
  </div>

  <!-- Tab Panels -->
  <div class="tab-panel" :class="{ active: activeTab === 'about' }">
    <p class="sec-label">About the Company</p>
    <div class="card mb-12">
      <p style="font-size:13px;line-height:1.7;color:var(--text);">
        TradeMax Wholesale is one of Maharashtra's largest distributors of interior hardware and building materials. We provide a wide range of products to retailers across the state.
      </p>
    </div>
  </div>

  <div class="tab-panel" :class="{ active: activeTab === 'products' }">
    <p class="sec-label">Portfolio</p>
    <div class="card mb-12">
      <p style="font-size:13px;color:var(--muted);">No portfolio items added yet.</p>
    </div>
  </div>

  <div class="tab-panel" :class="{ active: activeTab === 'reviews' }">
    <p class="sec-label">Reviews</p>
    <div class="card mb-12">
      <p style="font-size:13px;color:var(--muted);">No reviews yet.</p>
    </div>
  </div>

  <div style="height:80px;"></div>

  <!-- Enquiry Modal -->
  <div class="modal-overlay" :class="{ open: showModal }" @click.self="closeEnquiry">
    <div class="modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-title">Send Message</div>
      <div class="field">
        <label class="lbl">Message</label>
        <textarea class="inp inp-no-ico" rows="3" v-model="enquiryMsg" placeholder="Write your message..."></textarea>
      </div>
      <button class="btn btn-teal" @click="sendEnquiry">Send</button>
    </div>
  </div>

  <div class="toast" :class="{ show: !!toast }">{{ toast }}</div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const activeTab = ref('about')
const showModal = ref(false)
const enquiryMsg = ref('')
const toast = ref('')

function showToast(msg) {
  toast.value = msg
  setTimeout(() => toast.value = '', 2500)
}

function showEnquiry() { showModal.value = true }
function closeEnquiry() { showModal.value = false }
function sendEnquiry() {
  showModal.value = false
  showToast('Message sent!')
  enquiryMsg.value = ''
}
</script>

<style scoped>
.profile-cover { width: 100%; height: 180px; object-fit: cover; }

.profile-intro {
  background: var(--card);
  padding: 18px;
  border-bottom: 1px solid var(--border);
  position: relative;
}

.profile-ava {
  width: 70px; height: 70px;
  border-radius: 18px;
  background: var(--teal);
  color: #fff;
  font-family: 'Barlow', sans-serif;
  font-size: 28px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  border: 3px solid #fff;
  margin-top: -40px;
  box-shadow: var(--shadow);
  margin-bottom: 12px;
}

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

.profile-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: var(--card);
  border-bottom: 1px solid var(--border);
}
.pstat { padding: 14px; text-align: center; border-right: 1px solid var(--border); }
.pstat:last-child { border-right: none; }
.pstat-val { font-size: 18px; font-weight: 800; color: var(--navy); font-family: 'Barlow', sans-serif; }
.pstat-lbl { font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: .3px; }

.tab-bar {
  display: flex;
  background: var(--card);
  border-bottom: 2px solid var(--border);
  position: sticky; top: 60px; z-index: 10;
}
.tbar-item {
  flex: 1; padding: 14px 8px; text-align: center;
  font-size: 12px; font-weight: 700; color: var(--muted);
  cursor: pointer; border-bottom: 2px solid transparent;
  margin-bottom: -2px; transition: var(--transition);
}
.tbar-item.active { color: var(--teal); border-bottom-color: var(--teal); }

.tab-panel { display: none; padding: 18px; }
.tab-panel.active { display: block; }

.toast {
  position: fixed; bottom: 90px; left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: var(--navy); color: #fff;
  padding: 10px 20px; border-radius: 20px;
  font-size: 13px; font-weight: 600;
  z-index: 999; pointer-events: none;
  opacity: 0; transition: opacity .25s, transform .25s;
  white-space: nowrap;
}
.toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
</style>
