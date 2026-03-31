<template>
  <!-- Topbar -->
  <div class="topbar anim">
    <button @click="$router.back()" class="back-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
    <div class="top-title">Product Portfolio</div>
    <div style="width:32px;"></div>
  </div>

  <!-- Dashboard Section -->
  <div class="sheet anim">
    <div class="portfolio-header">
      <div class="sec-label">PRIMARY SECTOR</div>
      <h3 class="sec-value">Home Interior & Exterior Décor</h3>
    </div>

    <div class="portfolio-box mt-16">
      <div class="sec-label teal">SUB-CATEGORIES</div>
      <p class="instruction">Please select the sub-categories that best represent your current manufacturing or distribution capabilities.</p>

      <div class="category-grid mt-16">
        <label v-for="(cat, idx) in subCategories" :key="idx" class="cat-card" :class="{ active: cat.selected }">
          <div class="cat-check">
            <input type="checkbox" v-model="cat.selected">
            <div class="check-box">
              <svg v-if="cat.selected" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
          <span class="cat-name">{{ cat.name }}</span>
        </label>
      </div>
    </div> <!-- /.portfolio-box -->

    <!-- Update Button -->
    <div class="form-actions mt-24">
      <button class="btn btn-teal" @click="updatePortfolio" :disabled="loading">
        {{ loading ? 'Updating...' : 'UPDATE PORTFOLIO' }}
      </button>
    </div>

    <!-- Toast -->
    <div class="toast" :class="{ show: toastVisible }">{{ toastMessage }}</div>
  </div> <!-- /.sheet -->
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)
const toastVisible = ref(false)
const toastMessage = ref('')

const subCategories = ref([
  { name: 'Acrylic & Thermolam', selected: false },
  { name: 'Adhesive', selected: false },
  { name: 'Bathroom Fittings', selected: false },
  { name: 'Decorative Laminates (HPL)', selected: true },
  { name: 'Decorative Veneers', selected: true },
  { name: 'Façade', selected: false },
  { name: 'Face Veneers', selected: false },
  { name: 'Flooring (All Stone Type)', selected: true },
  { name: 'Flooring (Wooden Type)', selected: false },
  { name: 'Furniture Readymade', selected: false },
  { name: 'Hardware for Furniture', selected: true },
  { name: 'Home Furnishing', selected: false },
  { name: 'Louvers & Other Decorative Products', selected: false },
  { name: 'MDF Boards (HDHMR & Other MDF)', selected: true },
  { name: 'OEM\'s (Factory Made Furniture for Interior Decoration)', selected: false },
  { name: 'Paints', selected: false },
  { name: 'Particle Boards', selected: false },
  { name: 'Plumbing', selected: true },
  { name: 'Plywood', selected: true }
])

function showToast(msg) {
  toastMessage.value = msg
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2500)
}

function updatePortfolio() {
  const selectedCount = subCategories.value.filter(c => c.selected).length
  if (selectedCount === 0) {
    showToast('Please select at least one category')
    return
  }
  
  loading.value = true
  setTimeout(() => {
    loading.value = false
    showToast('Portfolio updated successfully!')
  }, 1200)
}
</script>

<style scoped>
.portfolio-header { background: var(--navy); border: 1.5px solid rgba(255,255,255,0.05); border-radius: 14px; padding: 18px; margin-bottom: 20px; }
.sec-label { font-size: 10px; font-weight: 800; color: var(--teal); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
.sec-label.teal { color: var(--teal); }
.sec-value { font-size: 16px; font-weight: 800; color: #fff; margin: 0; }

.portfolio-box { background: #fff; border: 1.5px solid var(--border); border-radius: 18px; padding: 20px; }
.instruction { font-size: 11px; color: var(--muted); line-height: 1.5; font-weight: 600; margin-top: 4px; }

.category-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }

.cat-card { display: flex; align-items: center; gap: 12px; padding: 14px 16px; background: #fbfcfd; border: 1.5px solid var(--border); border-radius: 12px; cursor: pointer; transition: all 0.2s; }
.cat-card:active { transform: scale(0.98); }
.cat-card.active { border-color: var(--teal); background: rgba(34,162,138,0.03); }

.cat-check { position: relative; width: 22px; height: 22px; }
.cat-check input { position: absolute; opacity: 0; cursor: pointer; height: 0; width: 0; }
.check-box { width: 22px; height: 22px; border: 2px solid var(--border); border-radius: 6px; background: #fff; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
.cat-card.active .check-box { background: var(--teal); border-color: var(--teal); }
.check-box svg { width: 14px; height: 14px; color: #fff; }

.cat-name { font-size: 13px; font-weight: 700; color: var(--navy); }
.cat-card.active .cat-name { color: var(--teal); }

@media (min-width: 380px) {
  /* No change needed as single column looks best on mobile for this UI */
}
</style>
