<template>
<div style="display: contents">
  <div class="phone-notch" style="display: none !important"><div class="notch-speaker"></div><div class="notch-camera"></div></div>

  <div class="status-bar" style="display: none !important">
    <span class="status-time">9:41</span>
    <div class="status-icons">
      <svg viewBox="0 0 24 24" fill="white"><rect x="1" y="15" width="4" height="6" rx="1"/><rect x="7" y="11" width="4" height="10" rx="1"/><rect x="13" y="7" width="4" height="14" rx="1"/><rect x="19" y="3" width="4" height="18" rx="1" opacity=".3"/></svg>
      <div class="battery-icon"><div class="battery-body"><div class="battery-fill"></div></div></div>
    </div>
  </div>

  <div style="display: contents; height: 100%;">
    <div class="page-content">

      <!-- Topbar -->
      <div class="topbar">
        <a href="/manufacturer/enquiries" class="back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </a>
        <span class="topbar-title">{{ isDetail ? 'Enquiry Detail' : 'Enquiries' }}</span>
        <div></div>
      </div>

      <!-- Hero -->
      <div class="hero" style="padding-bottom:46px;">
        <div class="hero-inner">
          <div class="badge"><span class="badge-dot"></span> Inbox</div>
          <h1 class="hero-title">User <span class="accent">Enquiries</span></h1>
          <p class="hero-sub">Respond to customer questions and business enquiries.</p>
        </div>
      </div>

      <div class="sheet" style="padding:20px;padding-bottom:100px;">

        <!-- LIST VIEW -->
        <div v-if="!isDetail">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
            <h3 style="font-size:17px;font-weight:800;color:var(--navy);">All Enquiries</h3>
            <span class="pill pill-teal">{{ enquiries.length }} total</span>
          </div>

          <div v-if="!enquiries.length" class="empty-state">
            <div class="e-ico">📩</div>
            <p>No enquiries received yet.</p>
          </div>

          <div v-for="e in enquiries" :key="e.id" class="enq-list-item" @click="viewEnquiry(e)">
            <div class="enq-dot" :class="{ unread: !getReplies(e.id).length }"></div>

            <div class="enq-list-body">
              <div class="enq-list-name">
                {{ e.name }}
                <span style="font-size:11px;color:var(--muted);">— {{ e.email }}</span>
              </div>

              <div class="enq-list-preview">{{ e.description }}</div>

              <div style="margin-top:4px;display:flex;gap:8px;">
                <span class="pill pill-gray" style="font-size:10px;">📞 {{ e.phone }}</span>

                <span v-if="getReplies(e.id).length" class="pill pill-green" style="font-size:10px;">
                  Replied ({{ getReplies(e.id).length }})
                </span>
                <span v-else class="pill pill-yellow" style="font-size:10px;">
                  Pending
                </span>
              </div>
            </div>

            <div class="enq-list-time">{{ formatDate(e.created) }}</div>
          </div>
        </div>

        <!-- DETAIL VIEW -->
        <div v-else>
          <div class="back-link" @click="showList">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back to Enquiries
          </div>

          <div class="enq-card" v-if="selectedEnquiry">
            <div class="enq-header">
              <div class="enq-avatar">👤</div>
              <div>
                <div class="enq-sender">{{ selectedEnquiry.name }}</div>
                <div class="enq-date">{{ formatDate(selectedEnquiry.created) }}</div>
              </div>
            </div>

            <div class="enq-field">
              <div class="enq-field-label">Email</div>
              <div class="enq-field-val">{{ selectedEnquiry.email }}</div>
            </div>

            <div class="enq-field">
              <div class="enq-field-label">Phone</div>
              <div class="enq-field-val">{{ selectedEnquiry.phone }}</div>
            </div>

            <div class="enq-field">
              <div class="enq-field-label">Message</div>
              <div class="enq-field-val">{{ selectedEnquiry.description }}</div>
            </div>

            <div style="margin-top:10px;display:flex;gap:8px;">
              <a href="/pages/task/enquiry-reply" class="btn btn-teal btn-xs">Reply via Page</a>
              <button class="btn btn-danger btn-xs" @click="deleteEnquiry(selectedEnquiry.id)">🗑 Delete</button>
            </div>
          </div>

          <!-- Replies -->
          <div class="reply-thread">
            <p v-if="!getReplies(selectedEnquiry.id).length" style="font-size:12px;color:var(--muted);margin-bottom:8px;">
              No replies yet.
            </p>

            <template v-else>
              <p class="sec-label" style="margin-bottom:8px;">
                Reply Thread ({{ getReplies(selectedEnquiry.id).length }})
              </p>

              <div v-for="(r, i) in getReplies(selectedEnquiry.id)" :key="i"
                   class="reply-bubble"
                   :class="{ own: r.own }">

                <div class="reply-from">
                  {{ r.own ? '👤 You (Business)' : '💬 ' + r.from }}
                </div>

                <div class="reply-text">{{ r.text }}</div>
                <div class="reply-time">{{ formatDate(r.created) }}</div>
              </div>
            </template>
          </div>

          <!-- Reply Form -->
          <div class="card" style="margin-top:12px;">
            <p style="font-size:12px;font-weight:700;color:var(--navy);margin-bottom:10px;">Send Reply</p>

            <form @submit.prevent="sendReply">
              <div class="field">
                <textarea class="inp inp-no-ico" rows="3" v-model="replyText" placeholder="Write your reply..."></textarea>
              </div>

              <button class="btn btn-teal btn-sm" :disabled="loading">
                {{ loading ? 'Sending...' : 'Send Reply 📤' }}
              </button>
            </form>
          </div>
        </div>

      </div>

      <!-- Bottom Nav -->
      <nav class="bottom-nav">
        <a href="/manufacturer/dashboard" class="nav-item">Home</a>
        <a href="/manufacturer/products" class="nav-item">Products</a>
        <a href="/manufacturer/messages" class="nav-item active">Messages</a>
        <a href="/payments" class="nav-item">Payments</a>
        <a href="/manufacturer/profile" class="nav-item">Profile</a>
      </nav>

    </div>

    <!-- Toast -->
    <div class="toast" v-if="toast">{{ toast }}</div>

  </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const enquiries = ref([])
const repliesStore = ref({})
const selectedEnquiry = ref(null)
const isDetail = ref(false)
const replyText = ref('')
const loading = ref(false)
const toast = ref('')

// Fetch enquiries
const fetchEnquiries = async () => {
  try {
    const res = await axios.get('/api/enquiries')
    enquiries.value = res.data || []
  } catch {
    enquiries.value = [
      { id:1, name:'Rajesh Traders', email:'rajesh@traders.com', phone:'9876543210', description:'Bulk enquiry for plywood', created:new Date().toISOString() },
      { id:2, name:'Priya Suppliers', email:'priya@supply.com', phone:'9876543211', description:'Interested in partnership', created:new Date().toISOString() }
    ]
  }
}

// Fetch replies
const fetchReplies = async () => {
  try {
    const res = await axios.get('/api/enquiry-replies')
    repliesStore.value = res.data || {}
  } catch {
    repliesStore.value = {}
  }
}

const getReplies = (id) => {
  return repliesStore.value[id] || []
}

const viewEnquiry = (e) => {
  selectedEnquiry.value = e
  isDetail.value = true
}

const showList = () => {
  isDetail.value = false
  selectedEnquiry.value = null
}

const sendReply = async () => {
  if (!replyText.value.trim()) {
    showToast('Write a reply first')
    return
  }

  loading.value = true
  try {
    await axios.post('/api/enquiry-replies', {
      enquiryId: selectedEnquiry.value.id,
      text: replyText.value
    })

    if (!repliesStore.value[selectedEnquiry.value.id]) {
      repliesStore.value[selectedEnquiry.value.id] = []
    }

    repliesStore.value[selectedEnquiry.value.id].push({
      from: 'You',
      text: replyText.value,
      own: true,
      created: new Date().toISOString()
    })

    replyText.value = ''
    showToast('Reply sent!')
  } catch {
    showToast('Failed to send reply')
  } finally {
    loading.value = false
  }
}

const deleteEnquiry = async (id) => {
  try {
    await axios.delete(`/api/enquiries/${id}`)
    enquiries.value = enquiries.value.filter(e => e.id !== id)
    showList()
    showToast('Deleted')
  } catch {
    showToast('Delete failed')
  }
}

const showToast = (msg) => {
  toast.value = msg
  setTimeout(() => toast.value = '', 2500)
}

const formatDate = (d) => {
  return new Date(d).toLocaleDateString()
}

onMounted(() => {
  fetchEnquiries()
  fetchReplies()
})
</script>