<template>
  <div class="inbox-screen">
    <!-- Top Bar -->
    <div class="topbar">
      <RouterLink to="/manufacturer/profile" class="back-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </RouterLink>
      <span class="topbar-title">Messages</span>
      <div class="topbar-actions">
        <button class="topbar-icon-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>
    </div>

    <!-- Inbox Tabs -->
    <div class="msg-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="msg-tab"
        :class="{ active: activeTab === tab.key }"
        @click="switchTab(tab.key)"
      >
        {{ tab.label }}
        <span v-if="tab.badge" class="tab-badge">{{ tab.badge }}</span>
      </button>
    </div>

    <!-- Conversation List -->
    <div class="conv-list">
      <div
        v-for="conv in filteredConversations"
        :key="conv.id"
        class="conv-item"
        @click="openChat(conv)"
      >
        <div class="conv-avatar" :class="`conv-avatar-${conv.type}`">
          {{ conv.initials }}
          <span v-if="conv.online" class="conv-online"></span>
        </div>
        <div class="conv-body">
          <div class="conv-top">
            <span class="conv-name">{{ conv.name }}</span>
            <span class="conv-time">{{ conv.time }}</span>
          </div>
          <div class="conv-bottom">
            <span class="conv-preview" :class="{ unread: conv.unread }">{{ conv.preview }}</span>
            <span class="enq-type-tag" :class="`tag-${conv.type}`">{{ conv.typeLabel }}</span>
            <span v-if="conv.unreadCount" class="conv-unread-badge">{{ conv.unreadCount }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Screen Overlay -->
    <div class="chat-screen" :class="{ open: chatOpen }">
      <div class="chat-topbar">
        <button class="chat-back" @click="closeChat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <div class="chat-avatar-sm" :style="{ background: activeChat.avatarBg, color: activeChat.avatarColor }">
          {{ activeChat.initials }}
        </div>
        <div class="chat-info">
          <div class="chat-name">{{ activeChat.name }}</div>
          <div class="chat-sub">{{ activeChat.location }}</div>
        </div>
        <span class="chat-enq-type" :style="{ background: activeChat.tagBg, color: activeChat.tagColor }">
          {{ activeChat.typeLabel }}
        </span>
      </div>

      <div class="chat-bg" ref="chatBgRef">
        <div class="msg-date-divider"><span>Today</span></div>
        <div class="bubble-wrap in">
          <div class="bubble in">
            <div class="enq-detail-card">
              <div class="enq-detail-type">{{ activeChat.enqDetailType }}</div>
              <div class="enq-detail-title">Product / Service Inquiry</div>
              <div class="enq-detail-meta">Pan India · YouVBiZ Platform</div>
            </div>
            <div class="bubble-text">{{ activeChat.firstMsg }}</div>
            <div class="bubble-meta"><span class="bubble-time">10:23 AM</span></div>
          </div>
        </div>
        <template v-for="(msg, index) in dynamicMessages" :key="index">
          <div class="bubble-wrap out">
            <div class="bubble out">
              <div class="bubble-text">{{ msg.text }}</div>
              <div class="bubble-meta">
                <span class="bubble-time">{{ msg.time }}</span>
                <span class="bubble-ticks sent">
                  <svg width="16" height="10" viewBox="0 0 16 10"><path d="M1 5l3 3 5-7M6 5l3 3 5-7" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
              </div>
            </div>
          </div>
          <div v-if="msg.reply" class="bubble-wrap in">
             <div class="bubble in">
                <div class="bubble-text">{{ msg.reply }}</div>
                <div class="bubble-meta"><span class="bubble-time">{{ msg.time }}</span></div>
             </div>
          </div>
        </template>
      </div>

      <div class="chat-input-bar">
        <div class="chat-input-wrap">
          <button class="chat-emoji-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          </button>
          <input type="text" v-model="chatInput" placeholder="Type a message…" @keydown.enter="sendMsg">
          <button class="chat-attach-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>
          </button>
        </div>
        <button class="chat-send-btn" @click="sendMsg">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>

    <!-- Toast -->
    <div class="toast" :class="{ show: toastVisible }">{{ toastMessage }}</div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'

const typeColors = {
  general: { bg: 'rgba(34,162,138,.15)', color: '#22a28a', label: '💬 General', tagBg: 'rgba(34,162,138,.15)', tagColor: '#22a28a' },
  requirement: { bg: 'rgba(10,37,64,.1)', color: '#0a2540', label: '📦 Requirement', tagBg: 'rgba(10,37,64,.1)', tagColor: '#0a2540' },
  job: { bg: 'rgba(245,158,11,.15)', color: '#b45309', label: '💼 Job', tagBg: 'rgba(245,158,11,.15)', tagColor: '#b45309' }
}

const tabs = [
  { key: 'all', label: 'All', badge: 6 },
  { key: 'general', label: 'General', badge: null },
  { key: 'requirement', label: 'Requirement', badge: null },
  { key: 'job', label: 'Job', badge: null }
]
const activeTab = ref('all')
const switchTab = (key) => { activeTab.value = key }

const conversations = ref([
 { id:1, name:'TradeMax Wholesale', initials:'TW', type:'requirement', typeLabel:'Requirement', time:'2h', preview:'Bulk Supply Enquiry', unread:true, unreadCount:1, online:true, firstMsg:'Looking for bulk supply details.', location:'Construction' },
 { id:2, name:'Woodhouse Retail', initials:'WR', type:'general', typeLabel:'General', time:'5h', preview:'Product Inquiry', unread:true, unreadCount:2, online:false, firstMsg:'Need samples and pricing.', location:'Home Interior' }
])

const filteredConversations = computed(() => activeTab.value === 'all' ? conversations.value : conversations.value.filter(c => c.type === activeTab.value))

const chatOpen = ref(false)
const chatBgRef = ref(null)
const chatInput = ref('')
const dynamicMessages = ref([])
const activeChat = reactive({ name:'', initials:'', type:'', typeLabel:'', firstMsg:'', location:'', avatarBg:'', avatarColor:'', tagBg:'', tagColor:'', enqDetailType:'' })

const openChat = (conv) => {
  const t = typeColors[conv.type] || typeColors.general
  Object.assign(activeChat, {
    name: conv.name, initials: conv.initials, type: conv.type, typeLabel: t.label,
    firstMsg: conv.firstMsg, location: conv.location, avatarBg: t.bg, avatarColor: t.color,
    tagBg: t.tagBg, tagColor: t.tagColor, enqDetailType: t.label + ' Enquiry'
  })
  dynamicMessages.value = []
  chatInput.value = ''
  chatOpen.value = true
  nextTick(() => { if(chatBgRef.value) chatBgRef.value.scrollTop = chatBgRef.value.scrollHeight })
}
const closeChat = () => { chatOpen.value = false }

const sendMsg = () => {
  const text = chatInput.value.trim()
  if (!text) return
  dynamicMessages.value.push({ text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), reply: null })
  chatInput.value = ''
  nextTick(() => { if(chatBgRef.value) chatBgRef.value.scrollTop = chatBgRef.value.scrollHeight })
  setTimeout(() => {
    dynamicMessages.value[dynamicMessages.value.length-1].reply = "Thank you! We will get back to you."
    nextTick(() => { if(chatBgRef.value) chatBgRef.value.scrollTop = chatBgRef.value.scrollHeight })
  }, 1000)
}

const toastVisible = ref(false)
const toastMessage = ref('')
const showToast = (msg) => { toastMessage.value = msg; toastVisible.value = true; setTimeout(() => toastVisible.value = false, 2500) }
</script>

<style scoped>
.inbox-screen { display: flex; flex-direction: column; height: 100%; overflow: hidden; background: var(--bg); }
.msg-tabs { display: flex; background: #fff; border-bottom: 1px solid var(--border); }
.msg-tab { flex: 1; padding: 12px; font-size: 12px; font-weight: 700; color: var(--muted); border: none; background: none; border-bottom: 3px solid transparent; cursor: pointer; }
.msg-tab.active { color: var(--navy); border-bottom-color: var(--teal); }
.tab-badge { background: var(--teal); color: #fff; font-size: 10px; padding: 2px 6px; border-radius: 10px; margin-left: 4px; }

.conv-list { flex: 1; overflow-y: auto; }
.conv-item { display: flex; gap: 12px; padding: 16px; background: #fff; border-bottom: 1px solid var(--border); cursor: pointer; }
.conv-avatar { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; position: relative; }
.conv-avatar-requirement { background: rgba(10,37,64,.1); color: var(--navy); }
.conv-avatar-general { background: rgba(34,162,138,.15); color: var(--teal); }
.conv-online { position: absolute; bottom: 2px; right: 2px; width: 10px; height: 10px; border-radius: 50%; background: #22c55e; border: 2px solid #fff; }
.conv-body { flex: 1; min-width: 0; }
.conv-top { display: flex; justify-content: space-between; margin-bottom: 4px; }
.conv-name { font-weight: 700; color: var(--navy); }
.conv-time { font-size: 11px; color: var(--muted); }
.conv-bottom { display: flex; justify-content: space-between; align-items: center; }
.conv-preview { font-size: 13px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; }
.conv-preview.unread { color: var(--navy); font-weight: 600; }
.enq-type-tag { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 10px; margin-left: 8px; }
.tag-requirement { background: rgba(10,37,64,.1); color: var(--navy); }
.tag-general { background: rgba(34,162,138,.15); color: var(--teal); }

.chat-screen { position: absolute; inset: 0; background: #fff; transform: translateX(100%); transition: transform .3s ease; z-index: 100; display: flex; flex-direction: column; }
.chat-screen.open { transform: translateX(0); }
.chat-topbar { padding: 40px 16px 12px; background: var(--navy); color: #fff; display: flex; align-items: center; gap: 12px; }
.chat-back { background: none; border: none; color: #fff; cursor: pointer; padding: 4px; }
.chat-avatar-sm { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px; }
.chat-info { flex: 1; }
.chat-name { font-weight: 700; font-size: 14px; }
.chat-sub { font-size: 11px; opacity: 0.7; }
.chat-enq-type { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 10px; }

.chat-bg { flex: 1; overflow-y: auto; padding: 20px 16px; background: #f8fafc; }
.msg-date-divider { text-align: center; margin: 20px 0; position: relative; }
.msg-date-divider span { background: #f8fafc; padding: 0 12px; font-size: 11px; color: var(--muted); position: relative; z-index: 1; }
.msg-date-divider::after { content: ''; position: absolute; left: 0; top: 50%; width: 100%; height: 1px; background: var(--border); }

.bubble-wrap { display: flex; margin-bottom: 16px; }
.bubble-wrap.in { justify-content: flex-start; }
.bubble-wrap.out { justify-content: flex-end; }
.bubble { max-width: 85%; padding: 12px 14px; border-radius: 16px; font-size: 14px; line-height: 1.5; position: relative; }
.bubble.in { background: #fff; color: var(--navy); border-bottom-left-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
.bubble.out { background: var(--teal); color: #fff; border-bottom-right-radius: 4px; }
.bubble-meta { font-size: 10px; margin-top: 4px; display: flex; justify-content: flex-end; align-items: center; gap: 4px; opacity: 0.7; }
.enq-detail-card { background: rgba(0,0,0,0.05); padding: 10px; border-radius: 12px; margin-bottom: 10px; border-left: 3px solid var(--teal); }
.enq-detail-type { font-size: 11px; font-weight: 700; opacity: 0.8; }
.enq-detail-title { font-weight: 700; margin: 2px 0; }
.enq-detail-meta { font-size: 11px; opacity: 0.6; }

.chat-input-bar { padding: 12px 16px; background: #fff; border-top: 1px solid var(--border); display: flex; align-items: center; gap: 12px; }
.chat-input-wrap { flex: 1; background: #f1f5f9; border-radius: 24px; padding: 4px 8px; display: flex; align-items: center; }
.chat-input-wrap input { flex: 1; background: none; border: none; padding: 8px 12px; font-size: 14px; color: var(--navy); outline: none; }
.chat-emoji-btn, .chat-attach-btn { background: none; border: none; color: var(--muted); cursor: pointer; padding: 6px; display: flex; }
.chat-send-btn { width: 40px; height: 40px; border-radius: 50%; background: var(--teal); color: #fff; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; }
</style>
