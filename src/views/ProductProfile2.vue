<template>
  <div class="topbar">
    <RouterLink to="/manufacturer/dashboard" class="back-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
    </RouterLink>
    <span class="topbar-title">Product Portfolio</span>
    <div style="width:36px;"></div>
  </div>

  <div class="sheet">
    <div class="portfolio-card">
      <div class="portfolio-header">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;color:var(--teal);"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
        <span>Product Portfolio</span>
      </div>

      <div class="sector-box">
        <div class="sector-label">PRIMARY SECTOR</div>
        <div class="sector-value">Home Interior & Exterior Décor</div>
      </div>

      <div class="sub-label">SUB-CATEGORIES</div>
      <p class="sub-hint">Please select the sub-categories that best represent your current manufacturing or distribution capabilities.</p>

      <div class="category-grid">
        <label v-for="cat in categories" :key="cat" class="cat-item" :class="{ selected: selectedCats.includes(cat) }">
          <div class="cat-check">
            <input type="checkbox" :value="cat" v-model="selectedCats">
            <svg v-if="selectedCats.includes(cat)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <span class="cat-name">{{ cat }}</span>
        </label>
      </div>

      <button class="btn btn-teal mt-16" @click="updatePortfolio" :disabled="isUpdating">
        {{ isUpdating ? 'Updating...' : 'UPDATE PORTFOLIO' }}
      </button>
      <div style="height:20px;"></div>
    </div>

    <!-- Toast -->
    <div class="toast" :class="{ show: toastVisible }">{{ toastMessage }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isUpdating = ref(false)
const toastVisible = ref(false)
const toastMessage = ref('')

const categories = [
  'Acrylic & Thermolam',
  'Adhesive',
  'Bathroom Fittings',
  'Decorative Laminates (HPL)',
  'Decorative Veneers',
  'Façade',
  'Face Veneers',
  'Flooring (All Stone Type)',
  'Flooring (Wooden Type)',
  'Furniture Readymade',
  'Hardware for Furniture',
  'Home Furnishing',
  'Louvers & Other Decorative Products',
  'MDF Boards (HDHMR & Other MDF)',
  'OEM\'s (Factory Made Furniture for Interior Decoration)',
  'Paints',
  'Particle Boards',
  'Plumbing',
  'Plywood'
]

const selectedCats = ref([
  'Acrylic & Thermolam',
  'Adhesive',
  'Bathroom Fittings',
  'Decorative Veneers',
  'Façade',
  'Face Veneers',
  'Flooring (All Stone Type)',
  'Flooring (Wooden Type)',
  'Hardware for Furniture',
  'Home Furnishing'
])

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2500)
}

function updatePortfolio() {
  isUpdating.value = true
  setTimeout(() => {
    isUpdating.value = false
    showToast('Portfolio updated successfully!')
  }, 1000)
}
</script>

<style scoped>
.portfolio-card {
  background: var(--navy);
  border-radius: var(--radius-lg);
  padding: 20px;
  color: #fff;
  border: 1px solid rgba(255,255,255,0.05);
}

.portfolio-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 24px;
  font-family: 'Barlow', sans-serif;
}

.sector-box {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 24px;
}

.sector-label {
  font-size: 10px;
  font-weight: 800;
  color: var(--teal);
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

.sector-value {
  font-size: 13px;
  font-weight: 600;
  color: #fff;
}

.sub-label {
  font-size: 11px;
  font-weight: 800;
  color: var(--teal);
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.sub-hint {
  font-size: 11px;
  color: rgba(255,255,255,0.5);
  margin-bottom: 20px;
  line-height: 1.4;
}

.category-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.cat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 14px;
  cursor: pointer;
  transition: var(--transition);
}

.cat-item:hover {
  background: rgba(255,255,255,0.05);
}

.cat-item.selected {
  background: rgba(34,162,138,0.1);
  border-color: var(--teal);
}

.cat-check {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 2px solid rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
}

.cat-item.selected .cat-check {
  background: var(--teal);
  border-color: var(--teal);
}

.cat-check input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.cat-check svg {
  width: 14px;
  height: 14px;
  color: #fff;
}

.cat-name {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.8);
}

.cat-item.selected .cat-name {
  color: #fff;
}

@media (/* min-width removed for mobile layout */
  }
}
</style>
