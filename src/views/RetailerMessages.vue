<template>

      <div class="page-content" style="overflow:hidden !important;">

        <div class="topbar">
          <RouterLink to="/retailer/profile" class="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </RouterLink>
          <span class="topbar-title">Messages</span>
          <div class="topbar-actions">
            <button class="topbar-icon-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>

        <div class="inbox-screen">
          <div class="msg-tabs">
            <button v-for="tab in tabs" :key="tab.key" class="msg-tab" :class="{ active: activeTab === tab.key }" @click="activeTab = tab.key">
              {{ tab.label }}
              <span v-if="tab.badge" class="tab-badge">{{ tab.badge }}</span>
            </button>

          <div class="conv-list" ref="convListRef">
            <div v-for="conv in filteredConversations" :key="conv.id" class="conv-item" @click="openChat(conv)">
              <div class="conv-avatar" :class="`conv-avatar-${conv.type}`">
                {{ conv.initials }}
                <span v-if="conv.online" class="conv-online"></span>
            
              <div class="conv-body">
                <div class="conv-top">
                  <span class="conv-name">{{ conv.name }}</span>
                  <span class="conv-time">{{ conv.time }}</span>
              
                <div class="conv-bottom">
                  <span class="conv-preview" :class="{ unread: conv.unread }">{{ conv.preview }}</span>
                  <span class="enq-type-tag" :class="`tag-${conv.type}`">{{ conv.typeLabel }}</span>
                  <span v-if="conv.unreadCount" class="conv-unread-badge">{{ conv.unreadCount }}</span>

      

      <div class="toast" :class="{ show: toastVisible }">{{ toastMessage }}

      <!-- Chat Screen -->
      <div class="chat-screen" :class="{ open: chatOpen }">
        <div class="chat-topbar">
          <button class="chat-back" @click="closeChat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div class="chat-avatar-sm" :style="{ background: activeChat ? typeColors[activeChat.type]?.bg : '', color: activeChat ? typeColors[activeChat.type]?.color : '' }">
            {{ activeChat?.initials }}
        
          <div class="chat-info">
            <div class="chat-name">{{ activeChat?.name }}
            <div class="chat-sub">{{ activeChat?.location }}
        
          <span class="chat-enq-type" :style="{ background: activeChat ? typeColors[activeChat.type]?.tagBg : '', color: activeChat ? typeColors[activeChat.type]?.tagColor : '', fontWeight: '700', borderRadius: '10px', padding: '4px 10px', fontSize: '9px' }">
            {{ activeChat ? typeColors[activeChat.type]?.label : '' }}
          </span>

        <div class="chat-bg" ref="chatBgRef">
          <div class="msg-date-divider"><span>Today</span>
          <div class="bubble-wrap in">
            <div class="bubble in">
              <div class="enq-detail-card">
                <div class="enq-detail-type">{{ activeChat ? typeColors[activeChat.type]?.label : '' }} Enquiry
                <div class="enq-detail-title">Product / Service Inquiry
                <div class="enq-detail-meta">Pan India · YouVBiZ Platform
            
              <div class="bubble-text">{{ activeChat?.firstMsg }}
              <div class="bubble-meta"><span class="bubble-time">10:23 AM</span>

          <div class="bubble-wrap out">
            <div class="bubble out">
              <div class="bubble-text">Thank you for reaching out! We would be happy to share our product details, pricing, and delivery terms with you.
              <div class="bubble-meta"><span class="bubble-time">10:31 AM</span><span class="bubble-ticks"><svg width="16" height="10" viewBox="0 0 16 10"><path d="M1 5l3 3 5-7" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 5l3 3 5-7" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span>

          <div class="bubble-wrap in">
            <div class="bubble in">
              <div class="bubble-text">That sounds good. Can you share more details about your product quality and certifications?
              <div class="bubble-meta"><span class="bubble-time">10:45 AM</span>

          <div class="bubble-wrap out">
            <div class="bubble out">
              <div class="bubble-text">Yes, all our products come with proper certifications. We can share documents digitally upon request.
              <div class="bubble-meta"><span class="bubble-time">11:02 AM</span><span class="bubble-ticks"><svg width="16" height="10" viewBox="0 0 16 10"><path d="M1 5l3 3 5-7" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 5l3 3 5-7" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span>

          <div v-for="msg in dynamicMessages" :key="msg.id" class="bubble-wrap" :class="msg.direction">
            <div class="bubble" :class="msg.direction">
              <div class="bubble-text">{{ msg.text }}
              <div class="bubble-meta">
                <span class="bubble-time">{{ msg.time }}</span>
                <span v-if="msg.direction === 'out'" class="bubble-ticks sent"><svg width="16" height="10" viewBox="0 0 16 10"><path d="M1 5l3 3 5-7" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 5l3 3 5-7" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span>

        <div class="chat-input-bar">
          <div class="chat-input-wrap">
            <button class="chat-emoji-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></button>
            <input type="text" placeholder="Type a message…" v-model="chatInputText" @keydown.enter="sendMsg">
            <button class="chat-attach-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg></button>
        
          <button class="chat-send-btn" @click="sendMsg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>

      <!-- Enquiry Type Modal -->
      <div class="type-modal-overlay" :class="{ show: showTypeModal }" @click.self="showTypeModal = false">
        <div class="type-modal">
          <div class="type-modal-handle">
          <div class="type-modal-title">New Enquiry
          <div class="type-option" @click="openCompose('general')"><div class="type-option-icon" style="background:rgba(34,162,138,.12);">💬<div class="type-option-body"><h4>General Enquiry</h4><p>Ask about products, pricing, availability, or any general question</p>
          <div class="type-option" @click="openCompose('requirement')"><div class="type-option-icon" style="background:rgba(10,37,64,.09);">📦<div class="type-option-body"><h4>Requirement Enquiry</h4><p>Post a specific product requirement with category, quantity & specs</p>
          <div class="type-option" @click="openCompose('job')"><div class="type-option-icon" style="background:rgba(245,158,11,.15);">💼<div class="type-option-body"><h4>Job Enquiry</h4><p>Apply for a job opening or enquire about career opportunities</p>

      <!-- Compose Modal -->
      <div class="compose-modal-overlay" :class="{ show: showComposeModal }" @click.self="showComposeModal = false">
        <div class="compose-modal">
          <div class="compose-modal-handle">
          <div v-if="composeType === 'general'">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;"><div style="width:40px;height:40px;border-radius:12px;background:rgba(34,162,138,.12);display:flex;align-items:center;justify-content:center;font-size:20px;">💬<div><div style="font-size:16px;font-weight:800;color:var(--navy);font-family:'Barlow',sans-serif;">General Enquiry<div style="font-size:11px;color:var(--muted);">Ask about products, pricing, or anything
            <div class="field"><label class="lbl">Your Name / Company</label><div class="inp-wrap"><input class="inp" type="text" placeholder="e.g. Sharma Traders Pvt Ltd" v-model="compose.name">
            <div class="field"><label class="lbl">Message</label><textarea class="inp inp-no-ico" rows="4" placeholder="Describe your enquiry in detail..." v-model="compose.message"></textarea>
            <button class="btn btn-teal" @click="submitCompose" style="width:100%;margin-top:8px;" :disabled="loading">{{ loading ? 'Sending...' : 'Send Enquiry' }}</button>
        
          <div v-if="composeType === 'requirement'">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;"><div style="width:40px;height:40px;border-radius:12px;background:rgba(10,37,64,.09);display:flex;align-items:center;justify-content:center;font-size:20px;">📦<div><div style="font-size:16px;font-weight:800;color:var(--navy);font-family:'Barlow',sans-serif;">Requirement Enquiry<div style="font-size:11px;color:var(--muted);">Post a specific product requirement
            <div class="field"><label class="lbl">Product Category</label><select class="inp" style="padding-left:14px;" v-model="compose.category"><option>🌾 Agriculture, Food &amp; FMCG</option><option>💄 Beauty &amp; Personal Care</option><option>🏗️ Construction</option><option>⚡ Electrical Products</option><option>📱 Electronics &amp; Appliances</option><option>🏥 Healthcare &amp; Pharma</option><option>🏠 Home Interior &amp; Décor</option></select>
            <div class="field"><label class="lbl">Product Name</label><div class="inp-wrap"><input class="inp" type="text" placeholder="e.g. Marine Grade Ply 18mm" v-model="compose.productName">
            <div class="field"><label class="lbl">Required Quantity</label><div class="inp-wrap"><input class="inp" type="text" placeholder="e.g. 500 sheets per month" v-model="compose.quantity">
            <div class="field"><label class="lbl">Additional Requirements</label><textarea class="inp inp-no-ico" rows="3" placeholder="Certifications, delivery location, etc." v-model="compose.additional"></textarea>
            <button class="btn btn-teal" @click="submitCompose" style="width:100%;margin-top:8px;" :disabled="loading">{{ loading ? 'Posting...' : 'Post Requirement' }}</button>
        
          <div v-if="composeType === 'job'">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;"><div style="width:40px;height:40px;border-radius:12px;background:rgba(245,158,11,.15);display:flex;align-items:center;justify-content:center;font-size:20px;">💼<div><div style="font-size:16px;font-weight:800;color:var(--navy);font-family:'Barlow',sans-serif;">Job Enquiry<div style="font-size:11px;color:var(--muted);">Apply or ask about job openings
            <div class="field"><label class="lbl">Full Name</label><div class="inp-wrap"><input class="inp" type="text" placeholder="Your full name" v-model="compose.fullName">
            <div class="field"><label class="lbl">Position Applied For</label><div class="inp-wrap"><input class="inp" type="text" placeholder="e.g. Sales Executive, Area Manager" v-model="compose.position">
            <div class="field"><label class="lbl">Experience</label><div class="inp-wrap"><input class="inp" type="text" placeholder="e.g. 4 years in B2B sales" v-model="compose.experience">
            <div class="field"><label class="lbl">Cover Message</label><textarea class="inp inp-no-ico" rows="3" placeholder="Why are you a good fit for this role?" v-model="compose.coverMessage"></textarea>
            <button class="btn btn-teal" @click="submitCompose" style="width:100%;margin-top:8px;" :disabled="loading">{{ loading ? 'Sending...' : 'Send Application' }}</button>


  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'

const loading = ref(false)
const toastMessage = ref('')
const toastVisible = ref(false)
const activeTab = ref('all')
const chatOpen = ref(false)
const showTypeModal = ref(false)
const showComposeModal = ref(false)
const composeType = ref('general')
const chatInputText = ref('')
const chatBgRef = ref(null)
const convListRef = ref(null)
const activeChat = ref(null)
const dynamicMessages = ref([])
let msgIdCounter = 0

const compose = reactive({ name: '', message: '', category: '', productName: '', quantity: '', additional: '', fullName: '', position: '', experience: '', coverMessage: '' })

const tabs = [
  { key: 'all', label: 'All', badge: 6 },
  { key: 'general', label: 'General', badge: null },
  { key: 'requirement', label: 'Requirement', badge: null },
  { key: 'job', label: 'Job', badge: null }
]

const conversations = ref([
  { id: 1, name: 'BlueStar Manufacturer',  initials: 'BM', type: 'requirement', time: '2h',    preview: 'Electronics · New Range',       unread: true,  unreadCount: 1, online: true,  firstMsg: 'Looking for bulk supply. Please share your product details, pricing and delivery terms.', location: 'Construction · Marine Grade Ply' },
  { id: 2, name: 'Jain Wholesale House',   initials: 'JW', type: 'general',     time: '5h',    preview: 'Stationery · General Inquiry',  unread: true,  unreadCount: 2, online: false, firstMsg: 'Need samples and pricing details. Please share your product catalogue and availability.',  location: 'Home Interior · General Inquiry' },
  { id: 3, name: 'Rohan Enterprises',      initials: 'RE', type: 'job',         time: 'Yest.', preview: 'Job · Store Manager',           unread: true,  unreadCount: 3, online: false, firstMsg: 'Interested in the job opening. I have 8 years of relevant experience.',                   location: 'Job · Site Supervisor' },
  { id: 4, name: 'Anand Suppliers',        initials: 'AS', type: 'requirement', time: 'Yest.', preview: 'Healthcare · Stock Check',      unread: false, unreadCount: 0, online: false, firstMsg: 'Please provide catalog and pricing. We are looking for a reliable long-term supplier.',     location: 'Home Interior · Natural Veneers' },
  { id: 5, name: 'Modern Trade Co',        initials: 'MT', type: 'general',     time: '2d',    preview: 'Home Décor · General Inquiry',  unread: false, unreadCount: 0, online: false, firstMsg: 'We are interested in your products. Please share more details.',                            location: 'Packaging · General Inquiry' },
  { id: 6, name: 'Sunita Rawat',           initials: 'SR', type: 'job',         time: '3d',    preview: 'Job · Sales Staff',             unread: false, unreadCount: 0, online: false, firstMsg: 'I have 5 years of relevant experience. Applying for the position on YouVBiZ.',             location: 'Job · Carpenter' },
])

const typeColors = {
  general:     { bg: 'rgba(34,162,138,.15)', color: '#22a28a', label: '💬 General',     tagBg: 'rgba(34,162,138,.15)', tagColor: '#22a28a' },
  requirement: { bg: 'rgba(10,37,64,.1)',    color: '#0a2540', label: '📦 Requirement', tagBg: 'rgba(10,37,64,.1)',    tagColor: '#0a2540' },
  job:         { bg: 'rgba(245,158,11,.15)', color: '#b45309', label: '💼 Job',         tagBg: 'rgba(245,158,11,.15)', tagColor: '#b45309' },
}

conversations.value.forEach(c => { c.typeLabel = c.type.charAt(0).toUpperCase() + c.type.slice(1) })

const filteredConversations = computed(() => {
  if (activeTab.value === 'all') return conversations.value
  return conversations.value.filter(c => c.type === activeTab.value)
})

function showToast(msg) { toastMessage.value = msg; toastVisible.value = true; setTimeout(() => { toastVisible.value = false }, 2500) }
function getCurrentTime() { const now = new Date(); const h = now.getHours(); const m = String(now.getMinutes()).padStart(2, '0'); return `${h}:${m} ${h >= 12 ? 'PM' : 'AM'}` }

function openChat(conv) {
  activeChat.value = conv; dynamicMessages.value = []; chatInputText.value = ''; chatOpen.value = true
  nextTick(() => { if (chatBgRef.value) chatBgRef.value.scrollTop = chatBgRef.value.scrollHeight })
}
function closeChat() { chatOpen.value = false }

async function sendMsg() {
  const text = chatInputText.value.trim()
  if (!text) return
  const time = getCurrentTime()
  dynamicMessages.value.push({ id: ++msgIdCounter, text, direction: 'out', time })
  chatInputText.value = ''
  nextTick(() => { if (chatBgRef.value) chatBgRef.value.scrollTop = chatBgRef.value.scrollHeight })
  try { await axios.post('/api/messages/send', { conversationId: activeChat.value?.id, text }) } catch { /* optimistic */ }
  setTimeout(() => {
    const replies = ['Thank you! We will get back to you shortly.', 'Can you share a formal quotation?', 'Please send the product catalog.', 'We will discuss and revert.']
    dynamicMessages.value.push({ id: ++msgIdCounter, text: replies[Math.floor(Math.random() * replies.length)], direction: 'in', time })
    nextTick(() => { if (chatBgRef.value) chatBgRef.value.scrollTop = chatBgRef.value.scrollHeight })
  }, 1200)
}

function openCompose(type) { composeType.value = type; showTypeModal.value = false; setTimeout(() => { showComposeModal.value = true }, 150) }

async function submitCompose() {
  try {
    loading.value = true
    await axios.post('/api/enquiries', { type: composeType.value, ...compose })
    showComposeModal.value = false
    showToast({ general: '✓ General enquiry sent!', requirement: '✓ Requirement posted!', job: '✓ Job application sent!' }[composeType.value] || '✓ Sent!')
    Object.keys(compose).forEach(k => { compose[k] = '' })
  } catch (err) {
    showToast(err.response?.data?.message || 'Failed to send. Please try again.')
  } finally { loading.value = false }
}

async function fetchConversations() {
  try {
    loading.value = true
    const response = await axios.get('/api/retailer/messages')
    conversations.value = response.data.map(c => ({ ...c, typeLabel: c.type.charAt(0).toUpperCase() + c.type.slice(1) }))
  } catch { /* keep local data */ } finally { loading.value = false }
}

fetchConversations()
</script>

<style scoped>
/* ── INBOX LIST ── */
.inbox-screen { display: flex; flex-direction: column; flex: 1; min-height: 0; overflow: hidden; }

/* Make app non-scrolling so inner conv-list handles scroll */
.app { overflow: hidden !important; }

.msg-tabs {
  display: flex; gap: 0;
  background: var(--card);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.msg-tab {
  flex: 1; padding: 12px 8px 10px;
  font-size: 11px; font-weight: 700;
  text-align: center; color: var(--muted);
  border-bottom: 2.5px solid transparent;
  cursor: pointer; transition: var(--transition);
  position: relative;
  background: none; border-top: none; border-left: none; border-right: none;
}
.msg-tab.active { color: var(--navy); border-bottom-color: var(--teal); }
.msg-tab .tab-badge {
  position: absolute; top: 8px; right: 12px;
  background: var(--teal); color: #fff;
  font-size: 9px; font-weight: 800;
  border-radius: 10px; padding: 1px 5px;
  min-width: 16px; text-align: center;
}

/* ── CONVERSATION LIST ── */
.conv-list { flex: 1; overflow-y: auto; background: var(--bg); min-height: 0; }
.conv-item {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border);
  cursor: pointer; transition: background .15s;
  background: var(--card);
}
.conv-item:active { background: #f1f5f9; }
.conv-avatar {
  width: 46px; height: 46px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 15px; font-family: 'Barlow', sans-serif;
  flex-shrink: 0; position: relative;
}
.conv-avatar-general { background: rgba(34,162,138,.15); color: var(--teal); }
.conv-avatar-requirement { background: rgba(10,37,64,.1); color: var(--navy); }
.conv-avatar-job { background: rgba(245,158,11,.15); color: #b45309; }
.conv-online {
  position: absolute; bottom: 1px; right: 1px;
  width: 11px; height: 11px; border-radius: 50%;
  background: #22c55e; border: 2px solid var(--card);
}
.conv-body { flex: 1; min-width: 0; }
.conv-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px; }
.conv-name { font-size: 14px; font-weight: 700; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.conv-time { font-size: 10px; color: var(--muted); flex-shrink: 0; margin-left: 6px; }
.conv-bottom { display: flex; justify-content: space-between; align-items: center; }
.conv-preview { font-size: 12px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; line-height: 1.4; }
.conv-preview.unread { color: var(--text); font-weight: 600; }
.conv-unread-badge {
  background: var(--teal); color: #fff;
  font-size: 10px; font-weight: 800;
  border-radius: 10px; padding: 1px 6px;
  min-width: 18px; text-align: center;
  margin-left: 6px; flex-shrink: 0;
}
.enq-type-tag {
  font-size: 9px; font-weight: 700;
  padding: 2px 7px; border-radius: 8px;
  text-transform: uppercase; letter-spacing: 0.4px;
  flex-shrink: 0; margin-left: 6px;
}
.tag-general { background: rgba(34,162,138,.12); color: var(--teal); }
.tag-requirement { background: rgba(10,37,64,.09); color: var(--navy); }
.tag-job { background: rgba(245,158,11,.15); color: #b45309; }

/* ── CHAT SCREEN ── */
.chat-screen {
  position: absolute; inset: 0; z-index: 200;
  display: flex; flex-direction: column;
  background: var(--bg);
  transform: translateX(100%);
  transition: transform .28s cubic-bezier(.4,0,.2,1);
}
.chat-screen.open { transform: translateX(0); }

.chat-topbar {
  display: flex; align-items: center; gap: 10px;
  padding: 56px 14px 12px;
  background: var(--navy);
  flex-shrink: 0;
}
.chat-back {
  width: 34px; height: 34px; border-radius: 10px;
  background: rgba(255,255,255,.1);
  display: flex; align-items: center; justify-content: center;
  color: #fff; flex-shrink: 0; cursor: pointer;
  border: none;
}
.chat-back svg { width: 18px; height: 18px; }
.chat-avatar-sm {
  width: 38px; height: 38px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 13px; font-family: 'Barlow', sans-serif;
  flex-shrink: 0;
}
.chat-info { flex: 1; min-width: 0; }
.chat-name { font-size: 15px; font-weight: 700; color: #fff; }
.chat-sub { font-size: 11px; color: rgba(255,255,255,.5); }
.chat-enq-type {
  font-size: 9px; font-weight: 700;
  padding: 3px 9px; border-radius: 10px;
  flex-shrink: 0; text-transform: uppercase; letter-spacing: 0.5px;
}

/* WhatsApp-style chat bubble area */
.chat-bg {
  flex: 1; overflow-y: auto;
  padding: 14px 12px;
  background: #e5ddd5;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c5b9a8' fill-opacity='0.25'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.msg-date-divider {
  text-align: center; margin: 10px 0;
}
.msg-date-divider span {
  background: rgba(0,0,0,.15); color: #fff;
  font-size: 11px; font-weight: 600;
  padding: 4px 12px; border-radius: 12px;
}

/* Incoming (left) */
.bubble-wrap { display: flex; margin-bottom: 6px; }
.bubble-wrap.out { justify-content: flex-end; }
.bubble-wrap.in { justify-content: flex-start; }

.bubble {
  max-width: 78%; padding: 8px 12px 6px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,.13);
  position: relative;
}
.bubble.in {
  background: #fff;
  border-top-left-radius: 3px;
}
.bubble.out {
  background: #dcf8c6;
  border-top-right-radius: 3px;
}
.bubble-text { font-size: 13px; color: #303030; line-height: 1.5; }
.bubble-meta { display: flex; justify-content: flex-end; align-items: center; gap: 4px; margin-top: 3px; }
.bubble-time { font-size: 10px; color: #8a8a8a; }
.bubble-ticks { color: #53bdeb; }
.bubble-ticks.sent { color: #8a8a8a; }

/* Enquiry detail card inside bubble */
.enq-detail-card {
  background: rgba(34,162,138,.08);
  border: 1px solid rgba(34,162,138,.2);
  border-radius: 8px; padding: 10px; margin-bottom: 8px;
}
.enq-detail-type {
  font-size: 10px; font-weight: 700; color: var(--teal);
  text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;
}
.enq-detail-title { font-size: 13px; font-weight: 700; color: var(--navy); margin-bottom: 3px; }
.enq-detail-meta { font-size: 11px; color: var(--muted); }

/* Chat input bar */
.chat-input-bar {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 12px 16px;
  background: #f0f0f0;
  flex-shrink: 0;
}
.chat-input-wrap {
  flex: 1; display: flex; align-items: center;
  background: #fff; border-radius: 24px;
  padding: 0 14px; min-height: 44px;
  box-shadow: 0 1px 3px rgba(0,0,0,.1);
  gap: 8px;
}
.chat-input-wrap input {
  flex: 1; border: none; background: none;
  font-size: 14px; color: var(--text);
  padding: 10px 0; outline: none;
}
.chat-input-wrap input::placeholder { color: #aaa; }
.chat-emoji-btn, .chat-attach-btn {
  color: #8a8a8a; background: none; border: none;
  cursor: pointer; flex-shrink: 0;
  display: flex; align-items: center;
}
.chat-emoji-btn svg, .chat-attach-btn svg { width: 20px; height: 20px; }
.chat-send-btn {
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--teal);
  display: flex; align-items: center; justify-content: center;
  color: #fff; flex-shrink: 0; cursor: pointer;
  border: none; box-shadow: 0 2px 8px rgba(34,162,138,.4);
  transition: transform .15s;
}
.chat-send-btn:active { transform: scale(.92); }
.chat-send-btn svg { width: 18px; height: 18px; }

/* New inquiry button */
.new-enquiry-fab {
  position: absolute; bottom: 80px; right: 16px; z-index: 50;
  width: 52px; height: 52px; border-radius: 50%;
  background: var(--teal);
  display: flex; align-items: center; justify-content: center;
  color: #fff; border: none; cursor: pointer;
  box-shadow: 0 4px 16px rgba(34,162,138,.5);
  transition: transform .15s;
}
.new-enquiry-fab:active { transform: scale(.92); }
.new-enquiry-fab svg { width: 22px; height: 22px; }

/* New enquiry type picker modal */
.type-modal-overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,.5);
  z-index: 300; display: flex; align-items: flex-end;
  opacity: 0; pointer-events: none; transition: opacity .2s;
}
.type-modal-overlay.show { opacity: 1; pointer-events: all; }
.type-modal {
  background: var(--card); border-radius: 24px 24px 0 0;
  padding: 20px 18px 40px; width: 100%;
  transform: translateY(100%); transition: transform .28s ease;
}
.type-modal-overlay.show .type-modal { transform: translateY(0); }
.type-modal-handle { width: 38px; height: 4px; background: var(--border); border-radius: 2px; margin: 0 auto 18px; }
.type-modal-title { font-size: 16px; font-weight: 800; color: var(--navy); margin-bottom: 16px; font-family: 'Barlow', sans-serif; }
.type-option {
  display: flex; align-items: center; gap: 14px;
  padding: 14px; border-radius: 14px;
  border: 1.5px solid var(--border);
  cursor: pointer; margin-bottom: 10px;
  transition: var(--transition);
  background: var(--card);
}
.type-option:hover { border-color: var(--teal); background: rgba(34,162,138,.04); }
.type-option-icon {
  width: 44px; height: 44px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; flex-shrink: 0;
}
.type-option-body h4 { font-size: 14px; font-weight: 700; color: var(--navy); margin-bottom: 2px; }
.type-option-body p { font-size: 11px; color: var(--muted); line-height: 1.4; }

/* Compose enquiry modal */
.compose-modal-overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,.5);
  z-index: 350; display: flex; align-items: flex-end;
  opacity: 0; pointer-events: none; transition: opacity .2s;
}
.compose-modal-overlay.show { opacity: 1; pointer-events: all; }
.compose-modal {
  background: var(--card); border-radius: 24px 24px 0 0;
  padding: 20px 18px 36px; width: 100%;
  transform: translateY(100%); transition: transform .28s ease;
  max-height: 85%;
  overflow-y: auto;
}
.compose-modal-overlay.show .compose-modal { transform: translateY(0); }
.compose-modal-handle { width: 38px; height: 4px; background: var(--border); border-radius: 2px; margin: 0 auto 16px; }
</style>
