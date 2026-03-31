<template>
<div style="display: contents">
  <div class="phone-notch" style="display: none !important">
    <div class="notch-speaker"></div>
    <div class="notch-camera"></div>
  </div>

  <div class="status-bar" style="display: none !important">
    <span class="status-time">9:41</span>
  </div>

  <div style="display: contents; height: 100%;">
    <div class="page-content">

      <!-- Topbar -->
      <div class="topbar">
        <a href="/manufacturer/dashboard" class="back-btn">←</a>
        <span class="topbar-title">Comments</span>
        <div></div>
      </div>

      <!-- Hero -->
      <div class="hero" style="padding-bottom:46px;">
        <div class="hero-inner">
          <div class="badge"><span class="badge-dot"></span> Reviews</div>
          <h1 class="hero-title">Product <span class="accent">Comments</span></h1>
          <p class="hero-sub">Monitor and manage customer comments on your products.</p>
        </div>
      </div>

      <div class="sheet" style="padding:20px;padding-bottom:100px;">

        <!-- Stats -->
        <div class="stats-row">
          <div class="stat-box">
            <div class="stat-box-val">{{ totalComments }}</div>
            <div class="stat-box-lbl">Total</div>
          </div>
          <div class="stat-box">
            <div class="stat-box-val" style="color:#16a34a;">{{ avgRating }}⭐</div>
            <div class="stat-box-lbl">Avg Rating</div>
          </div>
          <div class="stat-box">
            <div class="stat-box-val" style="color:var(--teal);">{{ recentComments }}</div>
            <div class="stat-box-lbl">This Week</div>
          </div>
        </div>

        <!-- Search -->
        <div class="search-wrap">
          <input class="inp" v-model="searchQuery" placeholder="Search comments..." style="padding-left:38px;" />
        </div>

        <!-- Filters -->
        <div class="filter-tabs">
          <button class="ftab" :class="{active: activeFilter==='all'}" @click="activeFilter='all'">All</button>
          <button class="ftab" :class="{active: activeFilter==='5'}" @click="activeFilter='5'">⭐⭐⭐⭐⭐</button>
          <button class="ftab" :class="{active: activeFilter==='4'}" @click="activeFilter='4'">⭐⭐⭐⭐</button>
          <button class="ftab" :class="{active: activeFilter==='3'}" @click="activeFilter='3'">⭐⭐⭐</button>
          <button class="ftab" :class="{active: activeFilter==='low'}" @click="activeFilter='low'">1-2 ⭐</button>
        </div>

        <!-- Comments -->
        <div>

          <div v-if="filteredComments.length === 0" class="empty-state">
            <div class="e-ico">💬</div>
            <p>No comments match your filter.</p>
          </div>

          <div v-for="c in filteredComments" :key="c.id" class="comment-card">
            
            <div class="comment-header">
              <div class="comment-avatar">{{ c.initials }}</div>

              <div style="flex:1;">
                <div class="comment-user">{{ c.user }}</div>
                <div class="comment-product">📦 {{ c.product }}</div>
              </div>

              <div class="comment-time">{{ formatDate(c.created) }}</div>
            </div>

            <div class="stars">
              {{ '★'.repeat(c.rating) }}{{ '☆'.repeat(5 - c.rating) }}
            </div>

            <div class="comment-text" style="margin-top:6px;">
              {{ c.comment }}
            </div>

            <div class="comment-actions">
              <button class="btn btn-outline btn-xs" @click="reply()">💬 Reply</button>
              <button class="btn btn-danger btn-xs" @click="removeComment(c.id)">🗑 Remove</button>
              <span v-if="c.rating <= 2" class="pill pill-red">⚠️ Low Rating</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// State
const loading = ref(false)
const searchQuery = ref('')
const activeFilter = ref('all')

const comments = ref([])

// Computed Stats
const totalComments = computed(() => comments.value.length)

const avgRating = computed(() => {
  if (!comments.value.length) return 0
  const sum = comments.value.reduce((acc, c) => acc + c.rating, 0)
  return (sum / comments.value.length).toFixed(1)
})

const recentComments = computed(() => {
  const weekAgo = Date.now() - 7 * 86400000
  return comments.value.filter(c => new Date(c.created) > weekAgo).length
})

// Filtered list
const filteredComments = computed(() => {
  let list = comments.value

  if (activeFilter.value === '5') list = list.filter(c => c.rating === 5)
  else if (activeFilter.value === '4') list = list.filter(c => c.rating === 4)
  else if (activeFilter.value === '3') list = list.filter(c => c.rating === 3)
  else if (activeFilter.value === 'low') list = list.filter(c => c.rating <= 2)

  if (searchQuery.value) {
    const s = searchQuery.value.toLowerCase()
    list = list.filter(c =>
      c.user.toLowerCase().includes(s) ||
      c.product.toLowerCase().includes(s) ||
      c.comment.toLowerCase().includes(s)
    )
  }

  return list
})

// Format date
function formatDate(date) {
  return new Date(date).toLocaleDateString()
}

// Actions
function reply() {
  alert('Reply feature coming soon')
}

function removeComment(id) {
  comments.value = comments.value.filter(c => c.id !== id)
}

// API
async function fetchComments() {
  try {
    loading.value = true

    const res = await axios.get('/api/comments')
    comments.value = res.data || []

  } catch (err) {
    console.log(err)

    // fallback sample data
    comments.value = [
      { id:1, user:'Rajesh Sharma', initials:'RS', product:'Plywood', comment:'Excellent quality!', rating:5, created:new Date().toISOString() },
      { id:2, user:'Priya Mehta', initials:'PM', product:'Marine Ply', comment:'Good but delayed', rating:4, created:new Date().toISOString() }
    ]

  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchComments()
})
</script>