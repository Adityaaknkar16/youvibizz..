<template>
<div style="display: contents">
  <div style="display: contents; height: 100%;">
    <div class="page-content">

      <!-- Topbar -->
      <div class="topbar">
        <a href="#" class="back-btn">←</a>
        <span class="topbar-title">Coupons</span>
        <button class="topbar-icon-btn" @click="switchTab('add')">+</button>
      </div>

      <!-- Hero -->
      <div class="hero" style="padding-bottom:50px;">
        <div class="hero-inner">
          <div class="badge"><span class="badge-dot"></span> Promotions</div>
          <h1 class="hero-title">Discount <span class="accent">Coupons</span></h1>
          <p class="hero-sub">Create and manage promotional coupon codes.</p>
        </div>
      </div>

      <div class="sheet" style="padding:20px;padding-bottom:100px;">

        <!-- Tabs -->
        <div class="tab-bar">
          <button class="tab-btn" :class="{active: tab==='list'}" @click="switchTab('list')">All Coupons</button>
          <button class="tab-btn" :class="{active: tab==='add'}" @click="switchTab('add')">Add Coupon</button>
          <button class="tab-btn" :class="{active: tab==='products'}" @click="switchTab('products')">Products</button>
        </div>

        <!-- LIST -->
        <div v-if="tab==='list'">
          <div v-if="coupons.length===0" class="empty-state">
            <div class="e-ico">🎟️</div>
            <p>No coupons created yet.</p>
            <button class="btn btn-teal btn-sm" @click="switchTab('add')">+ Create Coupon</button>
          </div>

          <div v-for="c in coupons" :key="c.id" class="coupon-card" :class="{expired: isExpired(c.expiry)}">
            <div class="coupon-top">
              <div>
                <div class="coupon-code">{{ c.code }}</div>
                <div class="coupon-meta">
                  <span>🎟️ {{ c.count }}</span>
                  <span>🛒 ₹{{ c.minorder || 0 }}</span>
                </div>
                <div class="coupon-meta">
                  <span>⏰ {{ c.expiry }}</span>
                </div>
              </div>

              <div>
                <div class="coupon-discount">{{ c.discount }}%</div>
                <span class="pill" :class="isExpired(c.expiry)?'pill-red':'pill-green'">
                  {{ isExpired(c.expiry) ? 'Expired' : 'Active' }}
                </span>
              </div>
            </div>

            <div class="coupon-actions">
              <button class="btn btn-outline btn-xs" @click="editCoupon(c)">✏️ Edit</button>
              <button class="btn btn-outline btn-xs" @click="openProducts(c.id)">📦 Products</button>
              <button class="btn btn-danger btn-xs" @click="deleteCoupon(c.id)">🗑</button>
            </div>
          </div>
        </div>

        <!-- ADD -->
        <div v-if="tab==='add'">
          <div class="card">
            <p class="sec-label">Coupon Details</p>

            <div class="field">
              <label class="lbl">Code</label>
              <input class="inp" v-model="form.code" />
              <button class="generate-btn" @click="generateCode">Generate</button>
            </div>

            <div class="form-row">
              <input class="inp" type="number" v-model="form.discount" placeholder="Discount" />
              <input class="inp" type="number" v-model="form.count" placeholder="Count" />
            </div>

            <input class="inp" type="number" v-model="form.minorder" placeholder="Min Order" />
            <input class="inp" type="date" v-model="form.expiry" />

            <button class="btn btn-teal" :disabled="loading" @click="saveCoupon">
              {{ loading ? 'Saving...' : 'Save Coupon' }}
            </button>
          </div>
        </div>

        <!-- PRODUCTS -->
        <div v-if="tab==='products'">
          <select class="inp" v-model="selectedCoupon">
            <option value="">Select Coupon</option>
            <option v-for="c in coupons" :key="c.id" :value="c.id">
              {{ c.code }}
            </option>
          </select>

          <div v-if="selectedCoupon" class="prod-check-list">
            <div v-for="p in products" :key="p.id" class="prod-check-item">
              <input type="checkbox" :value="p.id" v-model="productMap[selectedCoupon]" />
              <label>{{ p.name }}</label>
            </div>
          </div>

          <button class="btn btn-teal btn-sm" @click="saveProducts">Save Selection</button>
        </div>

      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'

// state
const tab = ref('list')
const loading = ref(false)

const coupons = ref([])
const selectedCoupon = ref('')

const products = ref([
  {id:1,name:'Plywood'},
  {id:2,name:'Laminate'},
  {id:3,name:'Door'}
])

const productMap = reactive({})

const form = reactive({
  id:null,
  code:'',
  discount:'',
  count:'',
  minorder:'',
  expiry:''
})

// methods
function switchTab(t){ tab.value = t }

function generateCode(){
  form.code = Math.random().toString(36).substring(2,8).toUpperCase()
}

function isExpired(date){
  return new Date(date) < new Date()
}

function editCoupon(c){
  form.id = c.id
  Object.assign(form, c)
  tab.value='add'
}

function openProducts(id){
  selectedCoupon.value = id
  tab.value='products'
}

async function saveCoupon(){
  try{
    loading.value = true

    if(form.id){
      await axios.put('/api/coupons/'+form.id, form)
    }else{
      await axios.post('/api/coupons', form)
    }

    await fetchCoupons()
    tab.value='list'

  }catch(e){
    console.log(e)
  }finally{
    loading.value=false
  }
}

function deleteCoupon(id){
  coupons.value = coupons.value.filter(c=>c.id!==id)
}

async function saveProducts(){
  await axios.post('/api/coupon-products',{
    couponId:selectedCoupon.value,
    products:productMap[selectedCoupon.value] || []
  })
}

// fetch
async function fetchCoupons(){
  try{
    const res = await axios.get('/api/coupons')
    coupons.value = res.data || []
  }catch(e){
    coupons.value = []
  }
}

onMounted(fetchCoupons)
</script>