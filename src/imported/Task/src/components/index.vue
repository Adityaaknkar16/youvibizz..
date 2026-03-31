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
        <svg viewBox="0 0 24 24" fill="white"><rect x="1" y="15" width="4" height="6" rx="1"/><rect x="7" y="11" width="4" height="10" rx="1"/><rect x="13" y="7" width="4" height="14" rx="1"/><rect x="19" y="3" width="4" height="18" rx="1" opacity=".3"/></svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill="white" stroke="none"/></svg>
        <div class="battery-icon">
          <div class="battery-body"><div class="battery-fill"></div></div>
        </div>
      </div>
    </div>
    <!-- Screen -->
    <div style="display: contents; height: 100%;">
      <div class="page-content">

        <!-- Top Bar -->
        <div class="topbar">
          <router-link to="/" class="topbar-brand">
            <img :src="'/Media/Logo.png'" alt="YouVBiZ" style="height:32px;width:auto;object-fit:contain;" @error="$event.target.style.display='none'">
          </router-link>
          <div class="topbar-actions">
            <router-link to="/login" class="topbar-icon-btn" id="loginIcon" title="Login">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </router-link>
          </div>
        </div>

        <!-- Landing Hero -->
        <div class="landing-hero">
          <div class="landing-hero-content">
            <h1>India's Largest<br><span>B2B Marketplace</span></h1>
            <p>Connect directly with top manufacturers, distributors, and retailers across India.</p>

            <!-- Stats Grid (Glass style) -->
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
                <div class="stat-val">12K+</div>
                <div class="stat-lbl">Distributors</div>
              </div>
              <div class="stat">
                <div class="stat-val">800+</div>
                <div class="stat-lbl">Cities</div>
              </div>
            </div>

            <!-- CTAs -->
            <div class="hero-ctas">
              <button class="hero-cta-btn hero-cta-primary" @click="$router.push('/register')">Get Started Free</button>
              <button class="hero-cta-btn hero-cta-outline" @click="$router.push('/directory')">Explore App</button>
            </div>
          </div>
        </div>


        <!-- Sheet -->
        <div class="sheet">

          <!-- Role Cards -->
          <div class="sec-header">
            <h3>Choose Your Role</h3>
          </div>

          <div class="role-cards">
            <!-- Manufacturer -->
            <router-link to="/login?role=manufacturer" class="role-card">
              <div class="role-icon-wrap role-icon-mfr">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:24px;height:24px;color:#059669;"><path d="M3 21h18M3 7v14M21 7v14M9 7V3h6v4M7 21V11h4v10M13 21V11h4v10"/></svg>
              </div>
              <div class="role-body">
                <h4>Manufacturer / Importer</h4>
                <p>Looking for Distributors — connect with retailers across India</p>
              </div>
              <div class="role-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
              </div>
            </router-link>

            <!-- Distributor -->
            <router-link to="/login?role=distributor" class="role-card">
              <div class="role-icon-wrap role-icon-dist">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:24px;height:24px;color:#2563eb;"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              </div>
              <div class="role-body">
                <h4>Distributor / Wholesaler</h4>
                <p>Looking for Manufacturers — expand your distribution network</p>
              </div>
              <div class="role-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
              </div>
            </router-link>

            <!-- Retailer -->
            <router-link to="/login?role=retailer" class="role-card">
              <div class="role-icon-wrap role-icon-ret">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:24px;height:24px;color:#d97706;"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
              </div>
              <div class="role-body">
                <h4>Retailer</h4>
                <p>Aspiring Wholesaler — connect with trusted manufacturers</p>
              </div>
              <div class="role-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
              </div>
            </router-link>
          </div>

          <!-- Categories from live site -->
          <div class="sec-header">
            <h3>Browse Categories</h3>
            <router-link to="/listing">View All</router-link>
          </div>
          <div class="info-chips">
            <span class="info-chip">🌾 Agriculture, Food &amp; FMCG</span>
            <span class="info-chip">💄 Beauty, Personal Care &amp; Wellness</span>
            <span class="info-chip">🏗️ Construction</span>
            <span class="info-chip">⚡ Electrical Products</span>
            <span class="info-chip">📱 Electronics &amp; Kitchen Appliances</span>
            <span class="info-chip">🎁 Handicrafts &amp; Gift Products</span>
            <span class="info-chip">🏥 Healthcare &amp; Pharma</span>
            <span class="info-chip">🏠 Home Interior &amp; Exterior Décor</span>
            <span class="info-chip">🧪 Industrial Chemicals &amp; Raw Materials</span>
            <span class="info-chip">🚛 Logistics</span>
            <span class="info-chip">⚙️ Metals, Alloys &amp; Mineral Products</span>
            <span class="info-chip">📦 Packaging</span>
            <span class="info-chip">🧴 Polymers, Plastics &amp; Rubber Products</span>
            <span class="info-chip">🔋 Power (Thermal Etc)</span>
            <span class="info-chip">♻️ Renewal Energy</span>
            <span class="info-chip">📝 Stationery &amp; Office Supplies</span>
            <span class="info-chip">👕 Textiles</span>
            <span class="info-chip">🚗 Vehicles &amp; Accessories (All Type)</span>
          </div>

          <!-- How it Works - from youvbiz.com/about -->
          <div class="sec-header">
            <h3>How Youv.Biz Works</h3>
            <span style="font-size:11px;color:var(--muted);">A simple 2-step process</span>
          </div>
          <div class="how-steps" style="margin-bottom:18px;">
            <div class="how-step">
              <div class="how-num">1</div>
              <div class="how-body">
                <h4>Create Profile</h4>
                <p>Manufacturer / Distributors / Retailers create their business profile on Youv.Biz.</p>
              </div>
            </div>
            <div class="how-step">
              <div class="how-num">2</div>
              <div class="how-body">
                <h4>Connect</h4>
                <p>Access profiles of each other and connect directly — no middleman, no delays.</p>
              </div>
            </div>
          </div>

          <!-- Why Partner -->
          <div class="sec-header">
            <h3>Why Partner With Us?</h3>
          </div>
          <div style="margin-bottom:18px;">
            <div class="how-step" style="margin-bottom:10px;flex-direction:column;align-items:flex-start;gap:8px;">
              <div style="font-size:13px;font-weight:700;color:var(--navy);">🏭 For Manufacturer / Importer</div>
              <ul style="font-size:11px;color:var(--muted);line-height:1.7;padding-left:16px;margin:0;">
                <li>Access to a pan-India network of distributors</li>
                <li>Get detailed information about distributors to make quick decisions</li>
                <li>Access retailers aspiring to be wholesalers</li>
              </ul>
            </div>
            <div class="how-step" style="margin-bottom:10px;flex-direction:column;align-items:flex-start;gap:8px;">
              <div style="font-size:13px;font-weight:700;color:var(--navy);">🚚 For Distributors / Wholesalers</div>
              <ul style="font-size:11px;color:var(--muted);line-height:1.7;padding-left:16px;margin:0;">
                <li>Access a pan-India network of manufacturers &amp; importers</li>
                <li>Expand your product portfolio by adding new products</li>
                <li>Get detailed manufacturer info to make quick decisions</li>
              </ul>
            </div>
            <div class="how-step" style="flex-direction:column;align-items:flex-start;gap:8px;">
              <div style="font-size:13px;font-weight:700;color:var(--navy);">🛒 For Retailers</div>
              <ul style="font-size:11px;color:var(--muted);line-height:1.7;padding-left:16px;margin:0;">
                <li>Get manufacturer details to start wholesale business</li>
                <li>Connect directly with manufacturers for bulk requirements</li>
                <li>Compare prices from multiple suppliers</li>
              </ul>
            </div>
          </div>

          <!-- Contact Strip -->
          <div class="contact-strip">
            <h4>📞 Get In Touch</h4>
            <div class="contact-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01.03 2.82 2 2 0 012 .68h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.5a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              <a href="tel:+919911662276">+91 99116 62276</a>
            </div>
            <div class="contact-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <a href="mailto:support@youvbiz.com">support@youvbiz.com</a>
            </div>
            <div class="contact-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Pan India Network</span>
            </div>
          </div>

          <!-- CTA -->
          <div class="cta-card">
            <h3>Ready to grow your business?</h3>
            <p>⭐ Trusted by 25,000+ Businesses across India</p>
            <router-link to="/register" class="btn btn-teal" style="text-decoration:none;display:flex;justify-content:center;">Post Your Requirement</router-link>
          </div>

        </div><!-- /sheet -->

      </div> <!-- Closes .app -->
      
      <BottomNav />

    </div><!-- /phone-screen -->
  </div><!-- /phone-frame -->
</template>

<script setup>
import { useRouter } from 'vue-router'
import BottomNav from '@/components/BottomNav.vue'
const router = useRouter()
// Setup any necessary script logic here if required
</script>

<style scoped>
/* ── Landing Hero ── */
.landing-hero {
  position: relative;
  background: linear-gradient(160deg, var(--navy) 0%, var(--navy2) 50%, #163D6E 100%);
  padding: 32px 20px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 380px;
}

.landing-hero-content {
  position: relative;
  z-index: 1;
}

.landing-hero h1 {
  font-family: 'Barlow', sans-serif;
  font-size: 32px;
  font-weight: 900;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.landing-hero h1 span { 
  color: #34d399; 
  display: block; 
}

.landing-hero p {
  font-size: 14px;
  color: rgba(255,255,255,0.8);
  line-height: 1.5;
  margin-bottom: 24px;
  max-width: 90%;
}

/* ── Stats row in hero (Glass style) ── */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin: 24px 0;
}

.stat {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 18px;
  padding: 14px 4px;
  text-align: center;
  backdrop-filter: blur(12px);
  transition: transform 0.2s ease;
}

.stat:hover { 
  transform: translateY(-3px); 
  background: rgba(255,255,255,0.12); 
}

.stat-val {
  font-family: 'Barlow', sans-serif;
  font-size: 14px;
  font-weight: 800;
  color: #34d399; 
  margin-bottom: 3px;
}

.stat-lbl {
  font-size: 7.5px;
  color: rgba(255,255,255,0.7);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  line-height: 1;
}

/* ── Hero CTA buttons ── */
.hero-ctas {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.hero-cta-btn {
  flex: 1;
  height: 52px;
  border-radius: 18px;
  font-size: 14px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Barlow', sans-serif;
  transition: all 0.3s ease;
}

.hero-cta-primary {
  background: #22a28a;
  color: #fff;
  box-shadow: 0 10px 25px rgba(34,162,138,0.3);
}

.hero-cta-primary:active { 
  transform: translateY(1px); 
}

.hero-cta-outline {
  background: transparent;
  color: #fff;
  border: 1.5px solid rgba(255,255,255,0.3) !important;
}

.hero-cta-outline:hover { 
  background: rgba(255,255,255,0.05); 
  border-color: #fff !important; 
}


/* ── Role Cards ── */
.role-cards { 
  display: flex; 
  flex-direction: column; 
  gap: 12px; 
  margin-bottom: 18px; 
}

.role-card {
  background: var(--card);
  border-radius: var(--radius);
  padding: 16px;
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  gap: 14px;
  border: 1.5px solid transparent;
  transition: var(--transition);
  cursor: pointer;
  text-decoration: none;
}

.role-card:hover, .role-card:active {
  border-color: var(--teal);
  box-shadow: var(--shadow);
  transform: translateY(-2px);
}

.role-icon-wrap {
  width: 48px; 
  height: 48px;
  border-radius: 14px;
  display: flex; 
  align-items: center; 
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}

.role-icon-mfr { background: rgba(34,162,138,0.12); }
.role-icon-dist { background: rgba(10,37,64,0.08); }
.role-icon-ret { background: rgba(245,158,11,0.1); }

.role-body { flex: 1; }
.role-body h4 {
  font-size: 14px;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 2px;
}
.role-body p {
  font-size: 11px;
  color: var(--muted);
  line-height: 1.4;
  margin: 0;
}

.role-arrow {
  color: var(--teal);
  flex-shrink: 0;
}
.role-arrow svg { 
  width: 16px; 
  height: 16px; 
}

/* ── Info chips ── */
.info-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
}

.info-chip {
  background: rgba(34,162,138,0.09);
  border: 1px solid rgba(34,162,138,0.2);
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 600;
  color: #22a28a;
}

/* ── How it Works ── */
.how-steps { 
  display: flex; 
  flex-direction: column; 
  gap: 10px; 
}

.how-step {
  background: var(--card);
  border-radius: var(--radius);
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: var(--shadow-sm);
}

.how-num {
  width: 32px; 
  height: 32px;
  border-radius: 10px;
  background: var(--navy);
  color: #fff;
  display: flex; 
  align-items: center; 
  justify-content: center;
  font-weight: 800;
  font-size: 14px;
  font-family: 'Barlow', sans-serif;
  flex-shrink: 0;
}

.how-body h4 { 
  font-size: 13px; 
  font-weight: 700; 
  color: var(--navy); 
  margin-bottom: 2px; 
}

.how-body p { 
  font-size: 11px; 
  color: var(--muted); 
  line-height: 1.4; 
  margin: 0; 
}

/* ── Contact strip ── */
.contact-strip {
  background: linear-gradient(135deg, var(--navy), var(--navy3));
  border-radius: var(--radius);
  padding: 16px;
  margin-bottom: 18px;
}

.contact-strip h4 {
  font-size: 13px; 
  font-weight: 700;
  color: #fff; 
  margin-bottom: 10px;
}

.contact-row {
  display: flex; 
  align-items: center; 
  gap: 8px;
  font-size: 12px; 
  color: rgba(255,255,255,0.8);
  margin-bottom: 6px;
}

.contact-row:last-child { 
  margin-bottom: 0; 
}

.contact-row svg { 
  width: 14px; 
  height: 14px; 
  color: var(--teal); 
  flex-shrink: 0; 
}

.contact-row a { 
  color: rgba(255,255,255,0.9); 
  font-weight: 600; 
  text-decoration: none; 
}

/* ── CTA card ── */
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
  color: rgba(255,255,255,.6); 
  margin-bottom: 20px; 
}

/* Fix for gallery-upload styling to prevent visual artifacts or bleed-through */
.gallery-upload {
  background:#fff;
  position:relative;
  z-index:5; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  padding: 20px; 
  border-radius: 18px; 
  border: 1px solid rgba(0,0,0,0.1); 
  cursor: pointer;
  text-align: center;
}

.gallery-upload input[type="file"] {
  display: none; 
}

.gallery-upload .upload-ico {
  font-size: 30px;
  margin-bottom: 8px;
}

.gallery-upload .upload-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--navy);
  margin-bottom: 4px;
}

.gallery-upload .upload-sub {
  font-size: 10px;
  color: var(--muted);
}
</style>