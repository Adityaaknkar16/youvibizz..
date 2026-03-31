const fs = require('fs');
const content = `<template>
  <div class="topbar">
    <RouterLink to="/" class="topbar-brand">
      <img src="/Media/Logo.png" alt="YouVBiZ" style="height:32px;width:auto;object-fit:contain;">
    </RouterLink>
    <span class="topbar-title">Dashboard</span>
    <div class="topbar-actions">
      <button class="topbar-icon-btn" @click="showToast('No new notifications')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
      </button>
    </div>
  </div>

  <div class="hero" style="padding-bottom:50px;">
    <div class="hero-inner">
      <div class="badge"><span class="badge-dot"></span> Manufacturer Account</div>
      <h1 class="hero-title">Good Morning,<br><span class="accent">Welcome Back!</span></h1>
      <p class="hero-sub">Here's your business overview for today.</p>
    </div>
  </div>

  <div class="sheet">
    <!-- Stats -->
    <div class="dash-stats">
      <div v-for="stat in stats" :key="stat.label" class="dash-stat">
        <div class="dash-stat-ico" :style="stat.icoStyle">{{ stat.icon }}</div>
        <div class="dash-stat-val">{{ stat.value }}</div>
        <div class="dash-stat-lbl">{{ stat.label }}</div>
        <div class="dash-stat-trend" :class="stat.trendClass" :style="stat.trendStyle">{{ stat.trend }}</div>
      </div>
    </div>

    <!-- Quick Actions -->
    <p class="sec-label">Quick Actions</p>
    <div class="quick-actions">
      <RouterLink
        v-for="action in quickActions"
        :key="action.label"
        :to="action.to"
        class="qa-btn"
      >
        <div class="qa-ico" :style="action.icoStyle">{{ action.icon }}</div>
        {{ action.label }}
      </RouterLink>
    </div>

    <!-- Recent Activity -->
    <div class="sec-header mt-8">
      <h3>Recent Activity</h3>
      <RouterLink to="/manufacturer/enquiries">View All</RouterLink>
    </div>
    
    <div class="card">
      <div v-if="loading" style="text-align:center;padding:16px;color:var(--muted);">
        Loading...
      </div>
      <div v-else-if="error" style="text-align:center;padding:16px;color:var(--danger);">
        {{ error }}
      </div>
      <template v-else>
        <div
          v-for="item in recentActivity"
          :key="item.id"
          class="activity-item"
        >
          <div class="act-dot" :class="{ warn: item.warn }"></div>
          <div class="act-body">
            <div class="act-time">{{ item.time }}</div>
            <div class="act-text" v-html="item.text"></div>
          </div>
        </div>
      </template>
    </div>

    <!-- Profile Strength -->
    <div class="card mt-12" style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <span style="font-size:14px;font-weight:700;color:var(--navy);">Profile Strength</span>
        <span style="font-size:14px;font-weight:800;color:var(--teal);">{{ profileStrength }}%</span>
      </div>
      <div style="height:6px;background:#d1fae5;border-radius:4px;overflow:hidden;">
        <div :style="{ width: profileStrength + '%' }" style="height:100%;background:var(--teal);border-radius:4px;"></div>
      </div>
      <p style="font-size:12px;color:var(--muted);margin-top:8px;">Add certificates to reach 100% and get more visibility.</p>
      <RouterLink
        to="/manufacturer/certificates"
        style="display:inline-block;margin-top:10px;font-size:12px;font-weight:700;color:var(--teal);"
      >
        Add Certificates →
      </RouterLink>
    </div>

    <!-- Toast -->
    <div class="toast" :class="{ show: toastVisible }">{{ toastMessage }}</div>
  </div>
</template>
`;
let fileStr = fs.readFileSync('src/views/ManufacturerDashboard.vue', 'utf8');
const scriptIndex = fileStr.indexOf('// ── Loading / Error state ──');
const scriptContent = '\n<script setup>\nimport { ref } from \'vue\'\nimport { RouterLink } from \'vue-router\'\nimport axios from \'axios\'\n\n' + fileStr.substring(scriptIndex);
fs.writeFileSync('src/views/ManufacturerDashboard.vue', content + scriptContent);
console.log('Done!');
