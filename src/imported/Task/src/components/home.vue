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
        <svg viewBox="0 0 24 24" fill="white">
          <rect x="1" y="15" width="4" height="6" rx="1" />
          <rect x="7" y="11" width="4" height="10" rx="1" />
          <rect x="13" y="7" width="4" height="14" rx="1" />
          <rect x="19" y="3" width="4" height="18" rx="1" opacity=".3" />
        </svg>
        <!-- WiFi -->
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round">
          <path d="M5 12.55a11 11 0 0114.08 0" />
          <path d="M1.42 9a16 16 0 0121.16 0" />
          <path d="M8.53 16.11a6 6 0 016.95 0" />
          <circle cx="12" cy="20" r="1" fill="white" stroke="none" />
        </svg>
        <!-- Battery -->
        <div class="battery-icon">
          <div class="battery-body">
            <div class="battery-fill"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- Screen -->
    <div style="display: contents; height: 100%;">
      <div class="page-content">

        <!-- Top Bar -->
        <div class="topbar">
          <router-link to="/dashboard" class="topbar-brand">
            <img src="/Media/Logo.png" alt="YouVBiZ" style="height:32px;width:auto;object-fit:contain;" @error="$event.target.style.display='none'">
          </router-link>
          <div class="topbar-actions">
            <router-link to="/login" class="topbar-icon-btn" id="loginIcon" title="Login">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </router-link>
          </div>
        </div>

        <!-- Hero -->
        <div class="hero">
          <div class="hero-inner">
            <div class="badge"><span class="badge-dot"></span> B2B Marketplace · Pan India</div>
            <h1 class="hero-title">What are you<br>looking for <span class="accent">today?</span></h1>
            <p class="hero-sub">Connect with verified manufacturers, distributors &amp; retailers across India.</p>
            <div class="stats-row">
              <div class="stat">
                <div class="stat-val">25K+</div>
                <div class="stat-lbl">Businesses</div>
              </div>
              <div class="stat">
                <div class="stat-val">5000+</div>
                <div class="stat-lbl">Manufacturers</div>
              </div>
              <div class="stat">
                <div class="stat-val">800+</div>
                <div class="stat-lbl">Cities</div>
              </div>
            </div>
            <!-- Search -->
            <div class="search-card">
              <input type="text" id="searchInput" v-model="searchQuery" placeholder="🔍 Search companies or products">
              <input type="text" id="locationInput" v-model="locationQuery" placeholder="📍 City or location">
              <div class="search-btns">
                <button class="search-btn-primary" @click="doSearch">Search Now</button>
                <button class="search-btn-clear" @click="clearSearch">Clear</button>
              </div>
            </div>
            <div style="text-align:center;">
              <router-link to="/listing" class="btn-white-outline">Explore Manufacturers →</router-link>
            </div>
          </div>
        </div>

        <!-- Sheet -->
        <div class="sheet">

          <!-- Trust bar -->
          <div class="trust-bar" style="margin-bottom:18px; overflow-x:auto; display:flex; padding:0;">
            <div class="trust-chip">⭐ <span class="accent">25K+</span> Businesses</div>
            <div class="trust-chip">🏭 5000+ Manufacturers</div>
            <div class="trust-chip">🚚 12K Distributors</div>
            <div class="trust-chip">📍 800+ Cities</div>
          </div>

          <!-- Categories -->
          <div class="sec-header">
            <h3>Browse Categories</h3>
            <router-link to="/listing">View All</router-link>
          </div>
          <div class="cat-grid">
            <router-link to="/listing" class="cat-card">
              <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=300" alt="Commercial Ply">
              <div class="cat-label"> Commercial Ply</div>
            </router-link>
            <router-link to="/listing" class="cat-card">
              <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300" alt="Healthcare">
              <div style="font-size:28px;margin-bottom:6px;"></div>
              <div class="cat-label">Healthcare & Pharma</div>
            </router-link>
            <router-link to="/listing" class="cat-card">
              <img src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=300" alt="Shuttering">
              <div class="cat-label">Shuttering</div>
            </router-link>
            <router-link to="/listing" class="cat-card">
              <img src="https://images.unsplash.com/photo-1615529182904-14819c35db37?w=300" alt="MDF">
              <div class="cat-label"> MDF</div>
            </router-link>
            <router-link to="/listing" class="cat-card">
              <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300" alt="Home Decor">
              <div style="font-size:28px;margin-bottom:6px;"></div>
              <div class="cat-label">Home Interior Decor</div>
            </router-link>
            <router-link to="/listing" class="cat-card">
              <img src="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=300" alt="Hardware">
              <div class="cat-label"> Hardware</div>
            </router-link>
          </div>

          <!-- How it Works -->
          <div class="sec-header mt-16">
            <h3>How YouVBiZ Works</h3>
          </div>
          <div class="steps mb-16">
            <div class="step-card">
              <div class="step-num">1</div>
              <div class="step-body">
                <h4>Search</h4>
                <p>Find suppliers by product, category or city across India.</p>
              </div>
            </div>
            <div class="step-card">
              <div class="step-num">2</div>
              <div class="step-body">
                <h4>Connect</h4>
                <p>View profiles, ratings and contact directly.</p>
              </div>
            </div>
            <div class="step-card">
              <div class="step-num">3</div>
              <div class="step-body">
                <h4>Grow</h4>
                <p>Close deals and expand your business network.</p>
              </div>
            </div>
          </div>

          <!-- Featured Companies -->
          <div class="sec-header">
            <h3>Featured Companies</h3>
            <router-link to="/listing">See All</router-link>
          </div>
          <div class="company-list mb-16">
            <div class="company-card">
              <img src="https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=200" alt="Manufacturers">
              <div style="padding:0 8px 12px; flex: 1;">
                <div style="font-size:32px;margin-bottom:8px;"></div>
                <h4>Manufacturers</h4>
                <div class="company-meta">📍 Mumbai · ★ 4.8</div>
                <router-link to="/manufacturer-detail" class="company-btn">View Profile</router-link>
              </div>
            </div>
            <div class="company-card">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=200" alt="GreenDeck">
              <div class="company-body">
                <h4>GreenDeck Industries</h4>
                <div class="company-meta">📍 Bangalore · ★ 4.6</div>
                <router-link to="/manufacturer-detail" class="company-btn">View Profile</router-link>
              </div>
            </div>
            <div class="company-card">
              <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=200" alt="Distributors">
              <div style="padding:0 8px 12px; flex: 1;">
                <div style="font-size:32px;margin-bottom:8px;"></div>
                <h4>Distributors</h4>
                <div class="company-meta">📍 Delhi · ★ 4.9</div>
                <router-link to="/manufacturer-detail" class="company-btn">View Profile</router-link>
              </div>
            </div>
          </div>

          <!-- CTA -->
          <div class="cta-card">
            <h3>Ready to grow your business?</h3>
            <p>Join 25,000+ businesses on India's leading B2B platform.</p>
            <router-link to="/register" class="btn btn-teal" style="text-decoration:none;display:flex;justify-content:center;">Post Your
              Requirement</router-link>
          </div>

        </div><!-- /sheet -->

      </div> <!-- Closes .app -->
      
      <BottomNav />

      <div class="toast" :class="{ show: toastVisible }">{{ toastMsg }}</div>

    </div><!-- /phone-screen -->
  </div><!-- /phone-frame -->
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BottomNav from '@/components/BottomNav.vue'

const router = useRouter()
const searchQuery = ref('')
const locationQuery = ref('')

const toastVisible = ref(false)
const toastMsg = ref('Searching...')

const doSearch = () => {
  if (searchQuery.value.trim() || locationQuery.value.trim()) {
    // Route to listing
    router.push('/listing')
  } else {
    showToast('Please enter a search term')
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  locationQuery.value = ''
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
/* ── Hero Search ── */
.search-card {
  background: rgba(255, 255, 255, .1);
  border: 1px solid rgba(255, 255, 255, .2);
  border-radius: var(--radius);
  padding: 14px;
  backdrop-filter: blur(10px);
  margin-top: 18px;
}

.search-card input {
  width: 100%;
  height: 46px;
  padding: 0 14px;
  border: 1.5px solid rgba(255, 255, 255, .25);
  border-radius: 10px;
  background: rgba(255, 255, 255, .1);
  color: #fff;
  font-size: 14px;
  margin-bottom: 10px;
  outline: none;
  transition: var(--transition);
  box-sizing: border-box;
}

.search-card input::placeholder {
  color: rgba(255, 255, 255, .5);
}

.search-card input:focus {
  border-color: var(--teal);
  background: rgba(255, 255, 255, .15);
}

.search-btns {
  display: flex;
  gap: 10px;
}

.search-btns button {
  flex: 1;
  height: 46px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: var(--transition);
}

.search-btn-primary {
  background: var(--teal);
  color: #fff;
}

.search-btn-primary:hover {
  background: var(--teal2);
}

.search-btn-clear {
  background: rgba(255, 255, 255, .1);
  color: rgba(255, 255, 255, .7);
  border: 1px solid rgba(255, 255, 255, .2) !important;
}

.btn-white-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, .05);
  border: 1.5px solid rgba(255, 255, 255, .25);
  border-radius: 12px;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  height: 44px;
  padding: 0 20px;
  transition: var(--transition);
  cursor: pointer;
  margin-top: 14px;
  text-decoration: none;
}
.btn-white-outline:hover {
  background: rgba(255, 255, 255, .12);
  border-color: rgba(255, 255, 255, .4);
}

/* ── Trust Bar ── */
.trust-bar {
  display: flex;
  gap: 0;
  overflow-x: auto;
  padding: 0 18px 0;
  scrollbar-width: none;
  margin-bottom: 18px;
}

.trust-bar::-webkit-scrollbar {
  display: none;
}

.trust-chip {
  flex-shrink: 0;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 7px 14px;
  font-size: 11px;
  font-weight: 600;
  color: var(--navy);
  margin-right: 8px;
  white-space: nowrap;
  box-shadow: var(--shadow-sm);
}

.trust-chip .accent {
  color: var(--teal);
}

/* ── Category Grid ── */
.cat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 18px;
}

.cat-card {
  background: var(--card);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
  text-decoration: none;
  display: block;
}

.cat-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}

.cat-card img {
  width: 100%;
  height: 90px;
  object-fit: cover;
  display: block;
}

.cat-label {
  padding: 10px 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
}

/* ── How it Works ── */
.steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.step-card {
  background: var(--card);
  border-radius: var(--radius);
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  box-shadow: var(--shadow-sm);
}

.step-num {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--teal);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 16px;
  font-family: 'Barlow', sans-serif;
  flex-shrink: 0;
}

.step-body h4 {
  font-size: 15px;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 3px;
}

.step-body p {
  font-size: 12px;
  color: var(--muted);
  line-height: 1.5;
  margin: 0;
}

/* ── Companies ── */
.company-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.company-card {
  background: var(--card);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  gap: 0;
}

.company-card img {
  width: 90px;
  height: 80px;
  object-fit: cover;
  flex-shrink: 0;
}

.company-body {
  padding: 12px 14px;
  flex: 1;
}

.company-body h4 {
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 3px;
}

.company-meta {
  font-size: 11px;
  color: var(--muted);
  margin-bottom: 8px;
}

.company-btn {
  display: inline-block;
  padding: 6px 14px;
  border: 1.5px solid var(--teal);
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  color: var(--teal);
  transition: var(--transition);
  background: transparent;
  text-decoration: none;
}

.company-btn:hover {
  background: var(--teal);
  color: #fff;
}

/* ── CTA ── */
.cta-card {
  background: linear-gradient(135deg, var(--navy), var(--navy3));
  border-radius: var(--radius-lg);
  padding: 28px 22px;
  text-align: center;
  margin-bottom: 18px;
}

.cta-card h3 {
  font-size: 22px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 8px;
}

.cta-card p {
  font-size: 13px;
  color: rgba(255, 255, 255, .6);
  margin-bottom: 20px;
}

.mt-16 { margin-top: 16px; }
.mb-16 { margin-bottom: 16px; }

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