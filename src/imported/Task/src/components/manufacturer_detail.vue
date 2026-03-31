<template>
<div style="display: contents">
  <!-- Notch / Dynamic Island -->
  <div class="phone-notch" style="display: none !important">
    <div class="notch-speaker"></div>
    <div class="notch-camera"></div>
  </div>
  <!-- Status Bar -->
  <div class="status-bar" style="display: none !important">
    <span class="status-time">9:41</span>
    <div class="status-icons">
      <!-- Signal -->
      <svg viewBox="0 0 24 24" fill="white"><rect x="1" y="15" width="4" height="6" rx="1"/><rect x="7" y="11" width="4" height="10" rx="1"/><rect x="13" y="7" width="4" height="14" rx="1"/><rect x="19" y="3" width="4" height="18" rx="1" opacity=".3"/></svg>
      <!-- WiFi -->
      <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill="white" stroke="none"/></svg>
      <!-- Battery -->
      <div class="battery-icon">
        <div class="battery-body"><div class="battery-fill"></div></div>
      </div>
    </div>
  </div>
  <!-- Screen -->
  <div style="display: contents; height: 100%;">
    <div class="page-content">

      <div class="topbar" style="position:absolute;background:transparent;border:none;width:100%;">
        <a href="#" class="back-btn" style="background:rgba(0,0,0,.4);" @click="router.go(-1)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </a>
        <div class="topbar-actions">
          <button class="topbar-icon-btn" style="background:rgba(0,0,0,.4);" @click="showToast('Link copied!')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>
        </div>
      </div>

      <!-- Cover -->
      <img class="profile-cover" src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800" alt="Pinnacle Plywood">

      <!-- Intro -->
      <div class="profile-intro">
        <div class="profile-ava">PP</div>
        <div class="cname">Pinnacle Plywood Ltd</div>
        <div class="ctype">Manufacturer · Plywood &amp; Wood Products · Est. 2012</div>
        <div class="cbadges">
          <span class="pill pill-teal">✓ Verified</span>
          <span class="pill pill-navy">⭐ 4.9 Rating</span>
          <span class="pill pill-green">ISI Certified</span>
        </div>
        <div class="cactions">
          <button class="enquiry-btn" @click="showEnquiryModal = true">Send Enquiry</button>
          <button class="call-btn" @click="showToast('Calling +91 XXXXX XXXXX...')">Call Now</button>
          
          <router-link v-if="isManufacturer" to="/manufacturer-profile-edit" custom v-slot="{ navigate }">
            <button class="share-btn" style="background:var(--navy);color:#fff;width:auto;padding:0 12px;" @click="navigate">Edit</button>
          </router-link>
          
          <button class="share-btn" @click="showToast('Link copied!')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;margin:auto;display:block;"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="profile-stats">
        <div class="pstat"><div class="pstat-val">48</div><div class="pstat-lbl">Products</div></div>
        <div class="pstat"><div class="pstat-val">320+</div><div class="pstat-lbl">Enquiries</div></div>
        <div class="pstat"><div class="pstat-val">12yr</div><div class="pstat-lbl">Experience</div></div>
      </div>

      <!-- Tabs -->
      <div class="tab-bar">
        <div class="tbar-item" :class="{ active: activeTab === 'about' }" @click="activeTab = 'about'">About</div>
        <div class="tbar-item" :class="{ active: activeTab === 'products' }" @click="activeTab = 'products'">Products</div>
        <div class="tbar-item" :class="{ active: activeTab === 'certs' }" @click="activeTab = 'certs'">Certs</div>
        <div class="tbar-item" :class="{ active: activeTab === 'reviews' }" @click="activeTab = 'reviews'">Reviews</div>
      </div>

      <!-- About -->
      <div class="tab-panel" :class="{ active: activeTab === 'about' }">
        <p class="sec-label">About the Company</p>
        <div class="card mb-12">
          <p style="font-size:13px;line-height:1.7;color:var(--text);">Pinnacle Plywood Ltd is a leading manufacturer of premium quality plywood and wood-based panels. With over 12 years of experience, we serve distributors and retailers across India with ISI-certified products meeting IS:303 &amp; IS:710 standards.</p>
        </div>

        <p class="sec-label">Contact Information</p>
        <div class="card">
          <div class="info-row" style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border);">
            <div style="width:36px;height:36px;border-radius:10px;background:var(--teal-dim);display:flex;align-items:center;justify-content:center;color:var(--teal);flex-shrink:0;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
            <div><div style="font-size:11px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.3px;margin-bottom:2px;">Location</div><div style="font-size:13px;color:var(--text);">Mumbai, Maharashtra (Pan India Supply)</div></div>
          </div>
          <div class="info-row" style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border);">
            <div style="width:36px;height:36px;border-radius:10px;background:var(--teal-dim);display:flex;align-items:center;justify-content:center;color:var(--teal);flex-shrink:0;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15z"/></svg></div>
            <div><div style="font-size:11px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.3px;margin-bottom:2px;">Phone</div><div style="font-size:13px;color:var(--text);">+91 XXXXX XXXXX</div></div>
          </div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px 0;">
            <div style="width:36px;height:36px;border-radius:10px;background:var(--teal-dim);display:flex;align-items:center;justify-content:center;color:var(--teal);flex-shrink:0;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
            <div><div style="font-size:11px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.3px;margin-bottom:2px;">Email</div><div style="font-size:13px;color:var(--text);">info@pinnacleply.com</div></div>
          </div>
        </div>
      </div>

      <!-- Products -->
      <div class="tab-panel" :class="{ active: activeTab === 'products' }">
        <p class="sec-label">Product Catalog</p>
        <div class="product-grid">
          <div class="pgrid-card">
            <img :src="'/Media/Gurjan Face Commercial Ply.png'" alt="Commercial Ply" @error="$event.target.src='https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=300'">
            <div class="pgrid-label">Gurjan Face Ply</div>
          </div>
          <div class="pgrid-card">
            <img :src="'/Media/Marine Grade Ply.png'" alt="Marine Ply" @error="$event.target.src='https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=300'">
            <div class="pgrid-label">Marine Grade Ply</div>
          </div>
          <div class="pgrid-card">
            <img :src="'/Media/HDF Boards.png'" alt="HDF" @error="$event.target.src='https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300'">
            <div class="pgrid-label">HDF Boards 6mm</div>
          </div>
          <div class="pgrid-card">
            <img :src="'/Media/Decorative Laminates.png'" alt="Laminates" @error="$event.target.src='https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=300'">
            <div class="pgrid-label">Decorative Laminates</div>
          </div>
        </div>
      </div>

      <!-- Certificates -->
      <div class="tab-panel" :class="{ active: activeTab === 'certs' }">
        <p class="sec-label">Certifications &amp; Awards</p>
        <div class="card">
          <div class="cert-card">
            <div class="cert-ico">🏅</div>
            <div>
              <div class="cert-name">ISI Mark — IS:303 (Commercial Ply)</div>
              <div class="cert-date">Valid until Dec 2026 · Bureau of Indian Standards</div>
            </div>
          </div>
          <div class="cert-card">
            <div class="cert-ico">🏆</div>
            <div>
              <div class="cert-name">ISI Mark — IS:710 (Marine Ply)</div>
              <div class="cert-date">Valid until Aug 2026 · Bureau of Indian Standards</div>
            </div>
          </div>
          <div class="cert-card">
            <div class="cert-ico">🌿</div>
            <div>
              <div class="cert-name">FSC Certified Timber</div>
              <div class="cert-date">Forest Stewardship Council · 2024</div>
            </div>
          </div>
          <div class="cert-card">
            <div class="cert-ico">⭐</div>
            <div>
              <div class="cert-name">Best Plywood Manufacturer Award</div>
              <div class="cert-date">India Wood Award 2023 · Bangalore</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reviews -->
      <div class="tab-panel" :class="{ active: activeTab === 'reviews' }">
        <p class="sec-label">Customer Reviews · 4.9 ★</p>
        <div class="card mb-12">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
            <div class="avatar avatar-sm" style="background:var(--navy3);">TW</div>
            <div>
              <div style="font-size:13px;font-weight:700;color:var(--text);">TradeMax Wholesale</div>
              <div style="font-size:11px;color:var(--muted);">★★★★★ · 2 months ago</div>
            </div>
          </div>
          <p style="font-size:13px;color:var(--text);line-height:1.6;">"Excellent quality commercial ply. Consistent thickness and no delamination issues. Timely delivery every time. Highly recommended."</p>
        </div>
        <div class="card mb-12">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
            <div class="avatar avatar-sm" style="background:#16a34a;">VB</div>
            <div>
              <div style="font-size:13px;font-weight:700;color:var(--text);">ValuBoard Supplies</div>
              <div style="font-size:11px;color:var(--muted);">★★★★★ · 4 months ago</div>
            </div>
          </div>
          <p style="font-size:13px;color:var(--text);line-height:1.6;">"Best marine ply manufacturer we've worked with. Great GSM standards. Their team is responsive and professional."</p>
        </div>
      </div>

      <!-- Bottom padding -->
      <div style="height:80px;background:var(--bg);"></div>

      <!-- Navigation -->
      <nav class="bottom-nav">
        <router-link to="/" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Home
        </router-link>
        <router-link to="/listing" class="nav-item active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          Explore
        </router-link>
        <a href="#" class="nav-item" @click.prevent="showEnquiryModal = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          Enquire
        </a>
        <router-link to="/careers" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
          Jobs
        </router-link>
        <router-link to="/login" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Account
        </router-link>
      </nav>

      <!-- Enquiry Bottom Sheet trigger -->
      <div v-if="showEnquiryModal" class="modal-overlay" style="display:flex;position:absolute;inset:0;background:rgba(0,0,0,.5);z-index:400;align-items:flex-end;" @click="showEnquiryModal = false">
        <div style="background:var(--card);border-radius:24px 24px 0 0;padding:24px 20px 40px;width:100%;transform:translateY(0);" @click.stop>
          <div style="width:40px;height:4px;background:var(--border);border-radius:2px;margin:0 auto 20px;"></div>
          <div style="font-size:17px;font-weight:700;color:var(--navy);margin-bottom:16px;font-family:'Barlow',sans-serif;">Send Enquiry to Pinnacle Plywood</div>
          
          <div class="field">
            <label class="lbl">Product / Requirement</label>
            <input type="text" class="inp inp-no-ico" v-model="enquiryProduct" placeholder="e.g. Marine Ply 18mm, 500 sheets">
          </div>
          
          <div class="field">
            <label class="lbl">Your Message</label>
            <textarea class="inp inp-no-ico" v-model="enquiryMsg" rows="3" placeholder="Describe your requirement..."></textarea>
          </div>
          
          <div style="display:flex;gap:10px;margin-top:8px;">
            <button class="btn btn-teal" @click="sendEnquiry" style="flex:1;">Send Enquiry</button>
            <button @click="showEnquiryModal = false" style="flex:0 0 80px;height:52px;border-radius:var(--radius);background:#f3f4f6;color:var(--text);font-family:'Inter',sans-serif;font-weight:700;font-size:14px;border:none;cursor:pointer;">Cancel</button>
          </div>
        </div>
      </div>

      <div class="toast" :class="{ 'show': toastVisible }">{{ toastMsg }}</div>
      
    </div><!-- /app -->
  </div><!-- /phone-screen -->
</div><!-- /phone-frame -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeTab = ref('about')
const isManufacturer = ref(false)
const showEnquiryModal = ref(false)

const enquiryProduct = ref('')
const enquiryMsg = ref('')

const toastVisible = ref(false)
const toastMsg = ref('')

const showToast = (msg) => {
  toastMsg.value = msg
  toastVisible.value = true
  setTimeout(() => {
    toastVisible.value = false
  }, 2500)
}

onMounted(() => {
  if (localStorage.getItem('role') === 'manufacturer') {
    isManufacturer.value = true
  }
})

const sendEnquiry = () => {
  if (!enquiryProduct.value.trim() && !enquiryMsg.value.trim()) {
    showToast('Please provide an enquiry message.')
    return
  }
  
  showEnquiryModal.value = false
  showToast('✓ Enquiry sent to Pinnacle Plywood!')
  enquiryProduct.value = ''
  enquiryMsg.value = ''
}
</script>

<style scoped>
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
.share-btn { background: #f3f4f6; color: var(--text); flex: 0 0 42px; border-radius: 10px; text-decoration: none; display: flex; align-items: center; justify-content: center; }

.profile-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; background: var(--card); border-bottom: 1px solid var(--border); }
.pstat { padding: 14px; text-align: center; border-right: 1px solid var(--border); }
.pstat:last-child { border-right: none; }
.pstat-val { font-size: 18px; font-weight: 800; color: var(--navy); font-family: 'Barlow', sans-serif; }
.pstat-lbl { font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: .3px; }

.tab-bar { display: flex; background: var(--card); border-bottom: 2px solid var(--border); position: sticky; top: 0; z-index: 10; }
.tbar-item { flex: 1; padding: 14px 8px; text-align: center; font-size: 12px; font-weight: 700; color: var(--muted); cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: var(--transition); }
.tbar-item.active { color: var(--teal); border-bottom-color: var(--teal); }

.tab-panel { display: none; padding: 18px; }
.tab-panel.active { display: block; }

.product-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.pgrid-card { background: var(--card); border-radius: var(--radius-sm); overflow: hidden; box-shadow: var(--shadow-sm); }
.pgrid-card img { width: 100%; height: 90px; object-fit: cover; }
.pgrid-label { padding: 8px 10px; font-size: 12px; font-weight: 600; color: var(--text); }
.pgrid-price { padding: 0 10px 8px; font-size: 13px; font-weight: 800; color: var(--navy); font-family: 'Barlow', sans-serif; }

.cert-card { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border); }
.cert-card:last-child { border-bottom: none; }
.cert-ico { width: 40px; height: 40px; border-radius: 10px; background: #fef9c3; color: #a16207; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
.cert-name { font-size: 13px; font-weight: 600; color: var(--text); }
.cert-date { font-size: 11px; color: var(--muted); }

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