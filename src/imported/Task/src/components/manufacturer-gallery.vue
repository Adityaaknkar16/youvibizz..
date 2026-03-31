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
        <a href="#" class="back-btn" @click="router.go(-1)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </a>
        <span class="topbar-title">Gallery</span>
        <div style="width:36px;"></div>
      </div>
      
      <!-- Hero -->
      <div class="hero" style="padding:20px 22px 50px;">
        <div class="hero-inner">
          <h1 class="hero-title" style="font-size:24px;">Business <span class="accent">Gallery</span></h1>
          <p class="hero-sub">Upload photos of your products & setup.</p>
        </div>
      </div>
      
      <!-- Content Sheet -->
      <div class="sheet" style="overflow:hidden;">
        
        <div class="gallery-upload" @click="triggerUpload">
          <input type="file" ref="galleryInput" multiple accept="image/*,video/mp4" @change="handleUpload" style="display:none;">
          <div class="upload-ico">📸</div>
          <div class="upload-label">Upload Images or Videos</div>
          <div class="upload-sub">JPG, PNG, WEBP, MP4 · Max 10MB each</div>
        </div>

        <div class="sec-header">
          <h3>Uploaded Media</h3>
          <span class="sec-count">{{ gallery.length }} item{{ gallery.length !== 1 ? 's' : '' }}</span>
        </div>

        <!-- Dynamic Grid -->
        <transition-group name="list" tag="div" class="gallery-grid">
          <div v-for="item in gallery" :key="item.id" class="gallery-item">
            <!-- Ensure local fallback URLs trigger gracefully without logging console spam if unhandled -->
            <img :src="item.src" alt="Gallery Media" @error="$event.target.src='https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=300'">
            <div class="gallery-del" @click="delItem(item.id)">✕</div>
          </div>
        </transition-group>

        <!-- Tooltip -->
        <div class="card" style="background:var(--teal-dim);border:1px solid rgba(34,162,138,.2);">
          <p style="font-size:12px;color:var(--teal);font-weight:600;">💡 Tip: Businesses with 10+ photos get 3x more profile views. Upload your factory, machinery, and product images.</p>
        </div>
        
        <!-- Bottom padding for nav offset -->
        <div style="height: 60px;"></div>
      </div> <!-- Closes .sheet -->

      <!-- Bottom Nav -->
      <nav class="bottom-nav">
        <router-link to="/dashboard" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home
        </router-link>
        <router-link to="/products" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>Products
        </router-link>
        <router-link to="/messages" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Messages
        </router-link>
        <router-link to="/membership" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Membership
        </router-link>
        <router-link to="/profile" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile
        </router-link>
      </nav>

      <!-- Toast Component -->
      <div class="toast" :class="{ show: toastVisible }">{{ toastMsg }}</div>

    </div> <!-- Closes .app -->
  </div> <!-- Closes .phone-screen -->
</div> <!-- Closes .phone-frame -->
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const galleryInput = ref(null)

let nextId = 7

const gallery = ref([
  { id: 1, src: 'Media/Gurjan Face Commercial Ply.png' },
  { id: 2, src: 'Media/Marine Grade Ply.png' },
  { id: 3, src: 'Media/Natural Veneers.png' },
  { id: 4, src: 'Media/HDF Boards.png' },
  { id: 5, src: 'Media/Hardware Fittings.png' },
  { id: 6, src: 'Media/Machinery.png' }
])

const toastVisible = ref(false)
const toastMsg = ref('')

const showToast = (msg) => {
  toastMsg.value = msg
  toastVisible.value = true
  setTimeout(() => {
    toastVisible.value = false
  }, 2500)
}

const triggerUpload = () => {
  if (galleryInput.value) {
    galleryInput.value.click()
  }
}

const handleUpload = (e) => {
  const files = Array.from(e.target.files)
  if (!files.length) return
  
  files.forEach(file => {
    gallery.value.push({
      id: nextId++,
      src: URL.createObjectURL(file)
    })
  })
  
  showToast(`${files.length} file(s) uploaded`)
  // Empties file buffer to securely allow re-selecting the identical filename
  e.target.value = ''
}

const delItem = (id) => {
  gallery.value = gallery.value.filter(item => item.id !== id)
  showToast('Item removed')
}
</script>

<style scoped>
.gallery-upload { border:2px solid var(--border); border-radius:var(--radius); padding:24px; text-align:center; margin-bottom:18px; cursor:pointer; background:#fff; display: block; position: relative; }
.upload-ico { font-size:32px; margin-bottom:10px; }
.upload-label { font-size:14px; font-weight:600; color:var(--navy); margin-bottom:4px; }
.upload-sub { font-size:12px; color:var(--muted); }

/* Force disabling possible artifacts from standard theme inheriting hero bounds */
.hero::before, .hero::after { display: none !important; }

.gallery-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin-bottom:18px; }
.gallery-item { position:relative; border-radius:12px; overflow:hidden; aspect-ratio:1; background:var(--bg); }
.gallery-item img { width:100%;height:100%;object-fit:cover; }
.gallery-del { position:absolute; top:6px; right:6px; width:24px; height:24px; border-radius:8px; background:rgba(0,0,0,.55); color:#fff; display:flex; align-items:center; justify-content:center; font-size:12px; cursor:pointer; transition: background 0.2s; }
.gallery-del:hover { background:var(--danger); }

/* Vue Animations */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.list-leave-active {
  position: absolute;
}

/* Toast Component Styling */
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