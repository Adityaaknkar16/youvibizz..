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

      <div class="topbar">
        <router-link to="/" class="back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </router-link>
        <span class="topbar-title">Explore</span>
        <button class="topbar-icon-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div class="hero" style="padding:20px 22px 50px;">
        <div class="hero-inner">
          <h1 class="hero-title" style="font-size:24px;">Find <span class="accent">Businesses</span></h1>
          <p class="hero-sub">Search manufacturers, distributors &amp; retailers.</p>
        </div>
      </div>

      <div class="sheet">

        <!-- Search -->
        <div class="search-bar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Company name or product..." v-model="searchQuery">
        </div>

        <!-- Type Filters -->
        <div class="filter-chips">
          <button v-for="type in types" :key="type" class="chip" :class="{ active: activeType === type }" @click="activeType = type">
            {{ type }}
          </button>
        </div>

        <!-- Category chips -->
        <div class="filter-chips" style="margin-bottom:16px;">
          <button v-for="cat in categories" :key="cat" class="chip" :class="{ active: activeCategory === cat }" @click="activeCategory = cat">
            {{ cat }}
          </button>
        </div>

        <!-- Sort / Count bar -->
        <div class="sort-bar">
          <span class="sort-count"><strong>47</strong> results found</span>
          <button class="sort-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="13" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>
            Sort
          </button>
        </div>

        <!-- Results -->
        <router-link to="/manufacturer-detail" class="result-card">
          <img class="result-img" :src="'/Media/Pinnacle Plywood Ltd.png'" alt="Pinnacle Plywood" @error="$event.target.src='https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400'">
          <div class="result-body">
            <div class="result-header">
              <div class="result-name">Pinnacle Plywood Ltd</div>
              <span class="pill pill-teal">★ 4.9</span>
            </div>
            <div class="result-type">Manufacturer · 12 yrs in business</div>
            <div class="result-tags">
              <span class="pill pill-navy">Commercial Ply</span>
              <span class="pill pill-navy">Marine Ply</span>
              <span class="pill pill-navy">MDF</span>
            </div>
            <div class="result-footer">
              <span class="result-location">📍 Mumbai, Maharashtra</span>
              <button class="contact-btn" @click.prevent>Send Enquiry</button>
            </div>
          </div>
        </router-link>

        <router-link to="/manufacturer-detail" class="result-card">
          <img class="result-img" :src="'/Media/EcoVeneer Industries.png'" alt="EcoVeneer" @error="$event.target.src='https://images.unsplash.com/photo-1552664730-d307ca884978?w=400'">
          <div class="result-body">
            <div class="result-header">
              <div class="result-name">EcoVeneer Industries</div>
              <span class="pill pill-teal">★ 4.7</span>
            </div>
            <div class="result-type">Manufacturer · 7 yrs in business</div>
            <div class="result-tags">
              <span class="pill pill-navy">Veneers</span>
              <span class="pill pill-navy">Laminates</span>
            </div>
            <div class="result-footer">
              <span class="result-location">📍 Bangalore, Karnataka</span>
              <button class="contact-btn" @click.prevent>Send Enquiry</button>
            </div>
          </div>
        </router-link>

        <router-link to="/distributor-detail" class="result-card">
          <img class="result-img" :src="'/Media/TradeMax Wholesale.png'" alt="TradeMax" @error="$event.target.src='https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=400'">
          <div class="result-body">
            <div class="result-header">
              <div class="result-name">TradeMax Wholesale</div>
              <span class="pill pill-teal">★ 4.6</span>
            </div>
            <div class="result-type">Distributor · Pan India Supply</div>
            <div class="result-tags">
              <span class="pill pill-navy">All Plywood</span>
              <span class="pill pill-navy">Hardware</span>
            </div>
            <div class="result-footer">
              <span class="result-location">📍 Delhi, NCR</span>
              <button class="contact-btn" @click.prevent>Send Enquiry</button>
            </div>
          </div>
        </router-link>

        <router-link to="/retailer-detail" class="result-card">
          <img class="result-img" :src="'/Media/Woodhouse Retail.png'" alt="Woodhouse" @error="$event.target.src='https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400'">
          <div class="result-body">
            <div class="result-header">
              <div class="result-name">Woodhouse Retail</div>
              <span class="pill pill-teal">★ 4.5</span>
            </div>
            <div class="result-type">Retailer · Interior Products</div>
            <div class="result-tags">
              <span class="pill pill-navy">Laminates</span>
              <span class="pill pill-navy">Decorative</span>
            </div>
            <div class="result-footer">
              <span class="result-location">📍 Pune, Maharashtra</span>
              <button class="contact-btn" @click.prevent>Send Enquiry</button>
            </div>
          </div>
        </router-link>

        <router-link to="/manufacturer-detail" class="result-card">
          <img class="result-img" :src="'/Media/GreenLeaf Plywood Industries.png'" alt="GreenLeaf" @error="$event.target.src='https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400'">
          <div class="result-body">
            <div class="result-header">
              <div class="result-name">GreenLeaf Plywood Industries</div>
              <span class="pill pill-teal">★ 4.8</span>
            </div>
            <div class="result-type">Manufacturer · Eco-Friendly</div>
            <div class="result-tags">
              <span class="pill pill-navy">Marine Ply</span>
              <span class="pill pill-navy">Shuttering</span>
            </div>
            <div class="result-footer">
              <span class="result-location">📍 Hyderabad, Telangana</span>
              <button class="contact-btn" @click.prevent>Send Enquiry</button>
            </div>
          </div>
        </router-link>

      </div> <!-- Closes .sheet -->
    </div> <!-- Closes .app -->
    
    <BottomNav />
  </div><!-- /phone-screen -->
</div><!-- /phone-frame -->
</template>

<script setup>
import { ref } from 'vue'
import BottomNav from '@/components/BottomNav.vue'

const searchQuery = ref('')
const activeType = ref('All')
const activeCategory = ref('')

const types = ['All', 'Manufacturers', 'Distributors', 'Retailers']
const categories = ['🪵 Plywood', '✨ Laminates', '📦 MDF/HDF', '🌿 Veneers', '🔨 Hardware']
</script>

<style scoped>
.filter-chips { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 2px; scrollbar-width: none; margin-bottom: 16px; }
.filter-chips::-webkit-scrollbar { display: none; }
.chip { flex-shrink: 0; padding: 7px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; border: 1.5px solid var(--border); background: var(--card); color: var(--muted); cursor: pointer; transition: var(--transition); }
.chip.active { background: var(--navy); color: #fff; border-color: var(--navy); }

.result-card {
  background: var(--card); border-radius: var(--radius);
  box-shadow: var(--shadow-sm); overflow: hidden; margin-bottom: 12px;
  transition: var(--transition);
  display: block;
  text-decoration: none;
}
.result-card:hover { transform: translateY(-2px); box-shadow: var(--shadow); }
.result-img { width: 100%; height: 150px; object-fit: cover; display: block; }
.result-body { padding: 14px; }
.result-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 6px; }
.result-name { font-size: 16px; font-weight: 700; color: var(--text); }
.result-type { font-size: 11px; color: var(--muted); margin-bottom: 8px; }
.result-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
.result-footer { display: flex; align-items: center; justify-content: space-between; }
.result-location { font-size: 12px; color: var(--muted); }
.contact-btn { background: var(--teal); color: #fff; border: none; padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; transition: var(--transition); }
.contact-btn:hover { background: var(--teal2); }

.sort-bar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.sort-count { font-size: 13px; color: var(--muted); }
.sort-count strong { color: var(--navy); }
.sort-btn { display: flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 700; color: var(--navy); background: var(--card); border: 1.5px solid var(--border); padding: 6px 12px; border-radius: 8px; cursor: pointer; }
.sort-btn svg { width: 14px; height: 14px; }
</style>
