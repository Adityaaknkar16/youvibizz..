<template>
  <div style="display: contents">
    <div class="phone-notch" style="display: none !important"><div class="notch-speaker"></div><div class="notch-camera"></div></div>
 
    <!-- Status Bar -->
    <div class="status-bar" style="display: none !important">
      <span class="status-time">9:41</span>
      <div class="status-icons">
        <svg viewBox="0 0 24 24" fill="white"><rect x="1" y="15" width="4" height="6" rx="1"/><rect x="7" y="11" width="4" height="10" rx="1"/><rect x="13" y="7" width="4" height="14" rx="1"/><rect x="19" y="3" width="4" height="18" rx="1" opacity=".3"/></svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill="white" stroke="none"/></svg>
        <div class="battery-icon"><div class="battery-body"><div class="battery-fill"></div></div></div>
      </div>
    </div>
 
    <div style="display: contents; height: 100%;">
      <div class="app rd-app">
 
        <!-- ── Floating Topbar ── -->
        <!-- FIX: position:absolute so it floats over the cover image, matching original HTML -->
        <div class="rd-topbar">
          <a href="#" @click.prevent="$router.back()" class="rd-icon-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><polyline points="15 18 9 12 15 6"/></svg>
          </a>
          <button class="rd-icon-btn" @click="showToast('Link copied!')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>
        </div>
 
        <!-- ── Cover Image ── -->
        <img
          class="rd-cover-img"
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800"
          alt="Pinnacle Plywood cover"
        />
 
        <!-- ── Profile Intro Card ──
             FIX: Matches original HTML structure exactly.
             Avatar sits at the top with a negative margin-top to overlap the cover image.
             Badges, name, type, actions all follow sequentially — NOT in a flex row with avatar.
        -->
        <div class="rd-intro">
          <div class="rd-avatar">PP</div>
          <div class="rd-cname">Pinnacle Plywood Ltd</div>
          <div class="rd-ctype">Manufacturer · Plywood &amp; Wood Products · Est. 2012</div>
          <div class="rd-cbadges">
            <span class="rd-pill rd-pill-teal">✓ Verified</span>
            <span class="rd-pill rd-pill-gold">⭐ 4.9 Rating</span>
            <span class="rd-pill rd-pill-green">ISI Certified</span>
          </div>
          <!-- FIX: Restored the share button (3rd action) that was missing in the Vue version -->
          <div class="rd-actions">
            <button class="rd-btn-enquiry" @click="showEnquiry">Send Enquiry</button>
            <button class="rd-btn-call" @click="showToast('Calling +91 XXXXX XXXXX...')">Call Now</button>
            <button class="rd-btn-share" @click="showToast('Link copied!')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" style="display:block;margin:auto;"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            </button>
          </div>
        </div>
 
        <!-- ── Profile Stats ──
             FIX: Moved OUTSIDE rd-intro as a separate block, matching the original HTML layout.
             In the original, .profile-stats is a sibling of .profile-intro, not nested inside it.
        -->
        <div class="rd-profile-stats">
          <div class="rd-pstat">
            <div class="rd-pstat-val">48</div>
            <div class="rd-pstat-lbl">Products</div>
          </div>
          <div class="rd-pstat">
            <div class="rd-pstat-val">320+</div>
            <div class="rd-pstat-lbl">Enquiries</div>
          </div>
          <div class="rd-pstat">
            <div class="rd-pstat-val">12yr</div>
            <div class="rd-pstat-lbl">Experience</div>
          </div>
        </div>
 
        <!-- ── Tab Bar ──
             FIX: top changed to 60px to match original HTML (top:60px), so it doesn't
             hide behind the floating topbar when scrolling.
        -->
        <div class="rd-tab-bar">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="rd-tab"
            :class="{ active: activeTab === tab.id }"
            @click="switchTab(tab.id)"
          >{{ tab.label }}</button>
        </div>
 
        <!-- ── Tab Panels ── -->
        <div class="rd-tab-content">
 
          <!-- About -->
          <div v-show="activeTab === 'about'" class="rd-panel">
            <div class="rd-section-label">About the Company</div>
            <div class="rd-card rd-about-card">
              <p class="rd-body-text">
                Pinnacle Plywood Ltd is a leading manufacturer of premium quality plywood and
                wood-based panels. With over 12 years of experience, we serve distributors and
                retailers across India with ISI-certified products meeting IS:303 &amp; IS:710 standards.
              </p>
            </div>
 
            <div class="rd-section-label">Contact Information</div>
            <div class="rd-card">
              <div class="rd-contact-row rd-border-bottom">
                <div class="rd-contact-ico rd-ico-teal">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <div class="rd-contact-lbl">Location</div>
                  <div class="rd-contact-val">Mumbai, Maharashtra (Pan India Supply)</div>
                </div>
              </div>
              <div class="rd-contact-row">
                <div class="rd-contact-ico rd-ico-teal">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 010 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14z"/></svg>
                </div>
                <div>
                  <div class="rd-contact-lbl">Phone</div>
                  <div class="rd-contact-val">+91 XXXXX XXXXX</div>
                </div>
              </div>
            </div>
          </div>
 
          <!-- Products -->
          <div v-show="activeTab === 'products'" class="rd-panel">
            <div class="rd-section-label">Product Catalog</div>
            <div class="rd-product-grid">
              <div
                v-for="product in products"
                :key="product.id"
                class="rd-product-card"
                @click="showToast(product.name + ' selected')"
              >
                <div class="rd-product-img-wrap">
                  <img
                    :src="product.src"
                    :alt="product.alt"
                    class="rd-product-img"
                    @error="handleImgError($event, product.fallback)"
                  />
                  <div class="rd-product-overlay">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" width="20" height="20"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  </div>
                </div>
                <div class="rd-product-info">
                  <div class="rd-product-name">{{ product.name }}</div>
                  <div class="rd-product-tag">{{ product.tag }}</div>
                </div>
              </div>
            </div>
          </div>
 
          <!-- Certs -->
          <div v-show="activeTab === 'certs'" class="rd-panel">
            <div class="rd-section-label">Certifications &amp; Awards</div>
            <div class="rd-card">
              <div
                v-for="(cert, i) in certifications"
                :key="cert.id"
                class="rd-cert-row"
                :class="{ 'rd-border-bottom': i < certifications.length - 1 }"
              >
                <div class="rd-cert-ico">{{ cert.icon }}</div>
                <div class="rd-cert-info">
                  <div class="rd-cert-name">{{ cert.name }}</div>
                  <div class="rd-cert-date">{{ cert.validity }}</div>
                </div>
                <span class="rd-cert-badge">Valid</span>
              </div>
            </div>
          </div>
 
          <!-- Reviews -->
          <div v-show="activeTab === 'reviews'" class="rd-panel">
            <div class="rd-section-label">Customer Reviews · 4.9 ★</div>
            <div v-for="review in reviews" :key="review.id" class="rd-review-card">
              <div class="rd-review-header">
                <div class="rd-review-avatar" :style="{ background: review.color }">{{ review.initials }}</div>
                <div>
                  <div class="rd-review-name">{{ review.name }}</div>
                  <div class="rd-review-stars">{{ '★'.repeat(review.stars) }}{{ '☆'.repeat(5 - review.stars) }}</div>
                </div>
                <div class="rd-review-date">{{ review.date }}</div>
              </div>
              <p class="rd-review-text">{{ review.text }}</p>
            </div>
          </div>
 
        </div><!-- /rd-tab-content -->
 
        <div style="height:90px;"></div>
      </div><!-- /rd-app -->
 
      <!-- ── Bottom Nav ── -->
      <nav class="bottom-nav">
        <a href="/retailer/dashboard" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home
        </a>
        <a href="/pages/task/listing" class="nav-item active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>Explore
        </a>
        <a href="#" class="nav-item" @click.prevent="showEnquiry">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Enquire
        </a>
        <a href="/pages/purva/careers" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>Jobs
        </a>
        <a href="/pages/task/login" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Account
        </a>
      </nav>
 
      <!-- ── Enquiry Bottom Sheet ── -->
      <Transition name="sheet">
        <div
          v-if="enquiryModalVisible"
          class="rd-sheet-overlay"
          @click="closeEnquiry($event)"
        >
          <div class="rd-sheet">
            <div class="rd-sheet-handle"></div>
            <div class="rd-sheet-title">Send Enquiry</div>
            <div class="rd-sheet-sub">to Pinnacle Plywood Ltd</div>
 
            <label class="rd-field-label">Your Requirement *</label>
            <input
              class="rd-field-input"
              type="text"
              placeholder="e.g. 500 sheets of 18mm ply"
              v-model="enquiryForm.requirement"
              :disabled="enquiryLoading"
            />
 
            <label class="rd-field-label">Quantity / Timeline</label>
            <input
              class="rd-field-input"
              type="text"
              placeholder="e.g. monthly, urgent"
              v-model="enquiryForm.quantity"
              :disabled="enquiryLoading"
            />
 
            <div class="rd-sheet-actions">
              <button class="rd-sheet-cancel" @click="enquiryModalVisible = false">Cancel</button>
              <button class="rd-sheet-send" :disabled="enquiryLoading" @click="sendEnquiry">
                <span v-if="!enquiryLoading">Send Enquiry</span>
                <span v-else class="rd-spinner"></span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
 
      <!-- Toast -->
      <div class="toast" :class="{ show: toastVisible }">{{ toastMessage }}</div>
    </div><!-- /phone-screen -->
  </div><!-- /phone-frame -->
</template>
 
<script setup>
import { ref, reactive } from 'vue'
 
// ── Tabs ────────────────────────────────────────────────────
const activeTab = ref('about')
 
const tabs = [
  { id: 'about',    label: 'About'    },
  { id: 'products', label: 'Products' },
  { id: 'certs',    label: 'Certs'    },
  { id: 'reviews',  label: 'Reviews'  }
]
 
function switchTab(id) {
  activeTab.value = id
}
 
// ── Products ─────────────────────────────────────────────────
const products = ref([
  {
    id: 1,
    src: '/images/Gurjan Face Commercial Ply.png',
    alt: 'Gurjan Face Commercial Ply',
    fallback: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400',
    name: 'Gurjan Face Ply',
    tag: 'Commercial Grade'
  },
  {
    id: 2,
    src: '/images/Marine Grade Ply.png',
    alt: 'Marine Grade Ply',
    fallback: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400',
    name: 'Marine Grade Ply',
    tag: 'Waterproof / BWP'
  }
])
 
function handleImgError(event, fallbackSrc) {
  event.target.onerror = null
  event.target.src = fallbackSrc
}
 
// ── Certifications ────────────────────────────────────────────
const certifications = ref([
  { id: 1, icon: '🏅', name: 'ISI Mark — IS:303', validity: 'Valid until Dec 2026' },
  { id: 2, icon: '🏆', name: 'ISO 9001:2015',     validity: 'Valid until Aug 2025' }
])
 
// ── Reviews ───────────────────────────────────────────────────
const reviews = ref([
  {
    id: 1,
    initials: 'RK',
    color: '#0a2540',
    name: 'Rajesh Kumar',
    stars: 5,
    date: 'Jan 2025',
    text: 'Excellent quality products. Timely delivery every time. Highly recommended for bulk orders.'
  },
  {
    id: 2,
    initials: 'PS',
    color: '#22a28a',
    name: 'Priya Sharma',
    stars: 5,
    date: 'Dec 2024',
    text: 'Very professional team. The marine ply quality is top-notch and the pricing is competitive.'
  }
])
 
// ── Enquiry Modal ─────────────────────────────────────────────
const enquiryModalVisible = ref(false)
const enquiryLoading = ref(false)
const enquiryForm = reactive({ requirement: '', quantity: '' })
 
function showEnquiry() {
  enquiryModalVisible.value = true
}
 
function closeEnquiry(e) {
  if (e.target === e.currentTarget) {
    enquiryModalVisible.value = false
  }
}
 
async function sendEnquiry() {
  if (!enquiryForm.requirement.trim()) {
    showToast('Please describe your requirement.')
    return
  }
  enquiryLoading.value = true
  try {
    // Replace with real Axios call, e.g.:
    // await axios.post('/api/enquiries', {
    //   companyId: 'pinnacle-plywood',
    //   requirement: enquiryForm.requirement,
    //   quantity: enquiryForm.quantity
    // })
    await new Promise(resolve => setTimeout(resolve, 700))
    enquiryModalVisible.value = false
    enquiryForm.requirement = ''
    enquiryForm.quantity = ''
    showToast('Enquiry sent! 🎉')
  } catch (err) {
    showToast(err.response?.data?.message || 'Failed to send enquiry.')
  } finally {
    enquiryLoading.value = false
  }
}
 
// ── Toast ─────────────────────────────────────────────────────
const toastMessage = ref('')
const toastVisible = ref(false)
let toastTimer = null
 
function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastVisible.value = false }, 2500)
}
</script>
 
<style scoped>
/* ─── App wrapper ────────────────────────────────────────────── */
.rd-app {
  position: relative;
  padding: 0;
  background: var(--bg, #f4f6f8);
  overflow-y: auto;
}
 
/* ─── Floating topbar ────────────────────────────────────────── */
/* FIX: position:absolute so it truly floats over the cover image */
.rd-topbar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
}
.rd-icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;
}
.rd-icon-btn:hover { background: rgba(0, 0, 0, 0.65); }
 
/* ─── Cover image ────────────────────────────────────────────── */
/* FIX: Flat <img> block matching original .profile-cover — no overlay wrapper needed */
.rd-cover-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}
 
/* ─── Intro card ─────────────────────────────────────────────── */
/* FIX: Added padding-top so the card has a proper top surface for
        the avatar's negative margin-top to push against.
        Matches original: background card + padding + border-bottom */
.rd-intro {
  background: var(--card, #fff);
  padding: 18px;
  border-bottom: 1px solid var(--border, #e5e7eb);
  position: relative;
}
 
/* FIX: Avatar uses negative margin-top to overlap the cover image,
        exactly as the original .profile-ava { margin-top: -40px } */
.rd-avatar {
  width: 70px;
  height: 70px;
  border-radius: 18px;
  background: var(--teal, #22a28a);
  color: #fff;
  font-family: 'Barlow', sans-serif;
  font-size: 28px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #fff;
  margin-top: -40px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  margin-bottom: 12px;
}
 
.rd-cname {
  font-size: 20px;
  font-weight: 800;
  color: var(--text, #111827);
  font-family: 'Barlow', sans-serif;
  margin-bottom: 3px;
}
.rd-ctype {
  font-size: 13px;
  color: var(--muted, #6b7280);
  margin-bottom: 10px;
}
 
/* Badges row */
.rd-cbadges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}
.rd-pill {
  display: inline-flex;
  align-items: center;
  padding: 3px 9px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
}
.rd-pill-teal  { background: rgba(34,162,138,0.1);  color: var(--teal, #22a28a); border: 1px solid rgba(34,162,138,0.25); }
.rd-pill-gold  { background: #fef9c3; color: #a16207; border: 1px solid #fde68a; }
.rd-pill-green { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
 
/* ─── Action buttons ─────────────────────────────────────────── */
/* FIX: Restored 3-button layout matching original HTML:
        enquiry (flex:1) + call (flex:1) + share (fixed 42px square) */
.rd-actions {
  display: flex;
  gap: 10px;
}
.rd-btn-enquiry,
.rd-btn-call {
  flex: 1;
  height: 42px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: opacity 0.15s;
}
.rd-btn-enquiry { background: var(--teal, #22a28a); color: #fff; }
.rd-btn-enquiry:hover { opacity: 0.88; }
.rd-btn-call { background: var(--navy, #0a2540); color: #fff; }
.rd-btn-call:hover { opacity: 0.88; }
.rd-btn-share {
  flex: 0 0 42px;
  height: 42px;
  border-radius: 10px;
  background: #f3f4f6;
  color: var(--text, #111827);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}
.rd-btn-share:hover { background: #e5e7eb; }
 
/* ─── Profile Stats ──────────────────────────────────────────── */
/* FIX: Separate block outside rd-intro, matching original .profile-stats
        grid layout with per-cell right borders */
.rd-profile-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: var(--card, #fff);
  border-bottom: 1px solid var(--border, #e5e7eb);
}
.rd-pstat {
  padding: 14px;
  text-align: center;
  border-right: 1px solid var(--border, #e5e7eb);
}
.rd-pstat:last-child { border-right: none; }
.rd-pstat-val {
  font-size: 18px;
  font-weight: 800;
  color: var(--navy, #0a2540);
  font-family: 'Barlow', sans-serif;
}
.rd-pstat-lbl {
  font-size: 10px;
  color: var(--muted, #6b7280);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}
 
/* ─── Tab bar ────────────────────────────────────────────────── */
/* FIX: top:60px matches original HTML so tab bar clears the floating topbar on scroll */
.rd-tab-bar {
  display: flex;
  background: var(--card, #fff);
  border-bottom: 2px solid var(--border, #e5e7eb);
  position: sticky;
  top: 60px;
  z-index: 10;
}
.rd-tab {
  flex: 1;
  padding: 14px 8px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  color: var(--muted, #6b7280);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}
.rd-tab.active {
  color: var(--teal, #22a28a);
  border-bottom-color: var(--teal, #22a28a);
}
 
/* ─── Tab content ────────────────────────────────────────────── */
.rd-tab-content { background: var(--bg, #f4f6f8); }
.rd-panel { padding: 16px; }
 
.rd-section-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--muted, #6b7280);
  margin-bottom: 10px;
  margin-top: 4px;
}
.rd-card {
  background: var(--card, #fff);
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 14px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}
.rd-about-card .rd-body-text {
  font-size: 13px;
  line-height: 1.75;
  color: var(--text, #111827);
}
 
/* Contact rows */
.rd-contact-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
}
.rd-border-bottom { border-bottom: 1px solid var(--border, #e5e7eb); }
.rd-contact-ico {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.rd-ico-teal { background: rgba(34,162,138,0.1); color: var(--teal, #22a28a); }
.rd-contact-lbl {
  font-size: 10px;
  color: var(--muted, #6b7280);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 2px;
}
.rd-contact-val { font-size: 13px; color: var(--text, #111827); }
 
/* ─── Product grid ───────────────────────────────────────────── */
.rd-product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.rd-product-card {
  background: var(--card, #fff);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 1px 6px rgba(0,0,0,0.07);
  cursor: pointer;
  transition: transform 0.18s, box-shadow 0.18s;
}
.rd-product-card:active {
  transform: scale(0.97);
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.rd-product-img-wrap {
  position: relative;
  width: 100%;
  height: 90px;
  overflow: hidden;
}
.rd-product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s;
}
.rd-product-card:hover .rd-product-img { transform: scale(1.05); }
.rd-product-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.28);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}
.rd-product-card:hover .rd-product-overlay { opacity: 1; }
.rd-product-info { padding: 8px 10px 8px; }
.rd-product-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--text, #111827);
  margin-bottom: 4px;
}
.rd-product-tag {
  font-size: 10px;
  font-weight: 600;
  color: var(--teal, #22a28a);
  background: rgba(34,162,138,0.1);
  display: inline-block;
  padding: 2px 8px;
  border-radius: 20px;
}
 
/* ─── Certifications ─────────────────────────────────────────── */
.rd-cert-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
}
.rd-cert-ico {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #fef9c3;
  color: #a16207;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.rd-cert-info { flex: 1; }
.rd-cert-name { font-size: 13px; font-weight: 600; color: var(--text, #111827); }
.rd-cert-date { font-size: 11px; color: var(--muted, #6b7280); margin-top: 2px; }
.rd-cert-badge {
  font-size: 10px;
  font-weight: 700;
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
  border-radius: 20px;
  padding: 2px 10px;
}
 
/* ─── Reviews ────────────────────────────────────────────────── */
.rd-review-card {
  background: var(--card, #fff);
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}
.rd-review-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.rd-review-avatar {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  color: #fff;
  font-family: 'Barlow', sans-serif;
  font-size: 14px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.rd-review-name { font-size: 13px; font-weight: 700; color: var(--text, #111827); }
.rd-review-stars { font-size: 11px; color: #f59e0b; letter-spacing: 1px; }
.rd-review-date { margin-left: auto; font-size: 10px; color: var(--muted, #6b7280); }
.rd-review-text { font-size: 13px; color: var(--text, #111827); line-height: 1.6; }
 
/* ─── Bottom Sheet (Enquiry) ─────────────────────────────────── */
.rd-sheet-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 400;
  display: flex;
  align-items: flex-end;
}
.rd-sheet {
  background: var(--card, #fff);
  border-radius: 24px 24px 0 0;
  padding: 20px 20px 36px;
  width: 100%;
  box-shadow: 0 -8px 32px rgba(0,0,0,0.15);
}
.rd-sheet-handle {
  width: 40px;
  height: 4px;
  background: var(--border, #e5e7eb);
  border-radius: 2px;
  margin: 0 auto 18px;
}
.rd-sheet-title {
  font-size: 17px;
  font-weight: 800;
  color: var(--navy, #0a2540);
  margin-bottom: 2px;
  font-family: 'Barlow', sans-serif;
}
.rd-sheet-sub {
  font-size: 12px;
  color: var(--muted, #6b7280);
  margin-bottom: 18px;
}
.rd-field-label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: var(--text, #111827);
  margin-bottom: 6px;
}
.rd-field-input {
  width: 100%;
  border: 1.5px solid var(--border, #e5e7eb);
  border-radius: 10px;
  padding: 11px 14px;
  font-size: 14px;
  background: var(--bg, #f4f6f8);
  color: var(--text, #111827);
  margin-bottom: 14px;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  font-family: inherit;
}
.rd-field-input:focus {
  border-color: var(--teal, #22a28a);
  box-shadow: 0 0 0 3px rgba(34,162,138,0.12);
}
.rd-field-input:disabled { opacity: 0.6; }
.rd-sheet-actions { display: flex; gap: 10px; margin-top: 4px; }
.rd-sheet-cancel {
  flex: 0 0 90px;
  height: 44px;
  border-radius: 11px;
  border: 1.5px solid var(--border, #e5e7eb);
  background: transparent;
  color: var(--muted, #6b7280);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
.rd-sheet-send {
  flex: 1;
  height: 44px;
  border-radius: 11px;
  background: var(--teal, #22a28a);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.15s;
}
.rd-sheet-send:disabled { opacity: 0.65; cursor: not-allowed; }
.rd-sheet-send:hover:not(:disabled) { opacity: 0.88; }
 
/* Spinner */
.rd-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: rd-spin 0.7s linear infinite;
  display: inline-block;
}
@keyframes rd-spin { to { transform: rotate(360deg); } }
 
/* ─── Sheet enter/leave transition ──────────────────────────── */
.sheet-enter-active { transition: opacity 0.22s ease; }
.sheet-leave-active { transition: opacity 0.22s ease; }
.sheet-enter-active .rd-sheet { transition: transform 0.26s cubic-bezier(0.32, 1, 0.6, 1); }
.sheet-leave-active .rd-sheet { transition: transform 0.22s ease-in; }
.sheet-enter-from { opacity: 0; }
.sheet-enter-from .rd-sheet { transform: translateY(100%); }
.sheet-leave-to { opacity: 0; }
.sheet-leave-to .rd-sheet { transform: translateY(100%); }
</style>