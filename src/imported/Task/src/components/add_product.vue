<template>
<div style="display: contents">
  <div class="phone-notch" style="display: none !important">
    <div class="notch-speaker"></div>
    <div class="notch-camera"></div>
  </div>

  <div class="status-bar" style="display: none !important">
    <span class="status-time">9:41</span>
    <div class="status-icons">
      <svg viewBox="0 0 24 24" fill="white"><rect x="1" y="15" width="4" height="6" rx="1"/><rect x="7" y="11" width="4" height="10" rx="1"/><rect x="13" y="7" width="4" height="14" rx="1"/><rect x="19" y="3" width="4" height="18" rx="1" opacity=".3"/></svg>
      <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M5 12.55a11 11 0 0114.08 0"/></svg>
      <div class="battery-icon"><div class="battery-body"><div class="battery-fill"></div></div></div>
    </div>
  </div>

  <div style="display: contents; height: 100%;">
    <div class="page-content">

      <div class="topbar">
        <a href="#" class="back-btn" @click.prevent="goBack">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </a>
        <span class="topbar-title">Add Product</span>
        <div style="width:36px;"></div>
      </div>

      <div class="hero" style="padding:20px 22px 50px;">
        <div class="hero-inner">
          <h1 class="hero-title" style="font-size:24px;">New <span class="accent">Listing</span></h1>
          <p class="hero-sub">List a product in your catalog.</p>
        </div>
      </div>

      <div class="sheet">

        <!-- Images -->
        <div style="margin-bottom:18px;">
          <label class="lbl">Product Images</label>

          <div id="imgGrid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:10px;">
            
            <div v-for="(img, index) in images" :key="index" style="aspect-ratio:1;border-radius:12px;overflow:hidden;position:relative;">
              <img :src="img" style="width:100%;height:100%;object-fit:cover;">
              <button @click="removeImage(index)" style="position:absolute;top:4px;right:4px;">✕</button>
            </div>

            <label v-if="images.length < 5" style="aspect-ratio:1;border:2px dashed var(--border);border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;background:var(--card);">
              📷
              <input type="file" multiple accept="image/*" style="display:none;" @change="handleImages">
            </label>

          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="submitProduct">

          <div class="card form-section">
            <div class="section-title">Basic Information</div>

            <input v-model="form.name" class="inp" placeholder="Product Name *" />

            <div class="form-row">
              <select v-model="form.category" class="inp">
                <option>Plywood</option>
                <option>Laminates</option>
              </select>
              <input v-model="form.subCategory" class="inp" placeholder="Sub Category" />
            </div>

            <textarea v-model="form.desc" class="inp" placeholder="Description"></textarea>
          </div>

          <div class="card form-section">
            <div class="section-title">Pricing</div>

            <div class="form-row">
              <input v-model="form.price" type="number" class="inp" placeholder="Price *" />
              <select v-model="form.unit" class="inp">
                <option>Per Sheet</option>
              </select>
            </div>
          </div>

          <button class="btn btn-teal w-full" :disabled="loading">
            {{ loading ? 'Publishing...' : 'Publish Product Listing' }}
          </button>

        </form>

      </div>
    </div>

    <div class="toast" v-if="toast">{{ toast }}</div>

  </div>
</div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'

const images = ref([])
const loading = ref(false)
const toast = ref('')

const form = reactive({
  name: '',
  category: 'Plywood',
  subCategory: '',
  desc: '',
  price: '',
  unit: 'Per Sheet'
})

const handleImages = (e) => {
  const files = Array.from(e.target.files)
  files.slice(0, 5 - images.value.length).forEach(file => {
    images.value.push(URL.createObjectURL(file))
  })
}

const removeImage = (index) => {
  images.value.splice(index, 1)
}

const showToast = (msg) => {
  toast.value = msg
  setTimeout(() => toast.value = '', 2500)
}

const submitProduct = async () => {
  if (!form.name || !form.price) {
    showToast('Please fill required fields')
    return
  }

  loading.value = true

  try {
    await axios.post('/api/products', {
      ...form,
      images: images.value
    })

    showToast('Product submitted!')
  } catch (e) {
    showToast('Error submitting product')
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  window.history.back()
}
</script>