<template>
  <div style="display: contents">
    <div class="phone-notch" style="display: none !important"><div class="notch-speaker"></div><div class="notch-camera"></div></div>
    <div class="status-bar" style="display: none !important">
      <span class="status-time">{{ currentTime }}</span>
      <div class="status-icons">
        <svg viewBox="0 0 24 24" fill="white"><rect x="1" y="15" width="4" height="6" rx="1"/><rect x="7" y="11" width="4" height="10" rx="1"/><rect x="13" y="7" width="4" height="14" rx="1"/><rect x="19" y="3" width="4" height="18" rx="1" opacity=".3"/></svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill="white" stroke="none"/></svg>
        <div class="battery-icon"><div class="battery-body"><div class="battery-fill"></div></div></div>
      </div>
    </div>

    <div style="display: contents; height: 100%;">
      <div class="page-content">
        <!-- Top Bar -->
        <div class="topbar">
          <button @click="router.back()" class="back-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>
          <span class="topbar-title">Messages</span>
          <div class="topbar-actions">
            <button class="topbar-icon-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></button>
          </div>
        </div>

        <!-- Inbox Screen -->
        <div class="inbox-screen">
          <div class="msg-tabs">
            <button v-for="tab in tabs" :key="tab.id" class="msg-tab" :class="{ active: currentTab === tab.id }" @click="currentTab = tab.id">
              {{ tab.label }}
              <span v-if="tab.id === 'all'" class="tab-badge">6</span>
            </button>
          </div>

          <div class="conv-list">
            <div v-for="conv in filteredConversations" :key="conv.id" class="conv-item" @click="handleOpenChat(conv)">
              <div class="conv-avatar" :class="'conv-avatar-' + conv.type">
                {{ conv.initials }}
                <span v-if="conv.online" class="conv-online"></span>
              </div>
              <div class="conv-body">
                <div class="conv-top">
                  <span class="conv-name">{{ conv.name }}</span>
                  <span class="conv-time">{{ conv.time }}</span>
                </div>
                <div class="conv-bottom">
                  <span class="conv-preview" :class="{ unread: conv.unreadCount > 0 }">{{ conv.preview }}</span>
                  <span class="enq-type-tag" :class="'tag-' + conv.type">{{ conv.typeLabel }}</span>
                  <span v-if="conv.unreadCount > 0" class="conv-unread-badge">{{ conv.unreadCount }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Nav -->
        <nav class="bottom-nav">
          <router-link to="/distributor-dashboard" class="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home
          </router-link>
          <router-link to="/distributor-products" class="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>Products
          </router-link>
          <router-link to="/distributor-messages" class="nav-item active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Messages
          </router-link>
          <router-link to="/distributor-transactions" class="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>Payments
          </router-link>
          <router-link to="/distributor-profile" class="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile
          </router-link>
        </nav>
      </div>

      <!-- CHAT SCREEN -->
      <div class="chat-screen" :class="{ open: !!selectedChat }">
        <div v-if="selectedChat" class="chat-topbar">
          <button class="chat-back" @click="handleCloseChat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div class="chat-avatar-sm" :style="{ background: typeColors[selectedChat.type].bg, color: typeColors[selectedChat.type].color }">
            {{ selectedChat.initials }}
          </div>
          <div class="chat-info">
            <div class="chat-name">{{ selectedChat.name }}</div>
            <div class="chat-sub">{{ selectedChat.location }} · Online</div>
          </div>
          <span class="chat-enq-type" :style="{ background: typeColors[selectedChat.type].tagBg, color: typeColors[selectedChat.type].tagColor }">
            {{ typeColors[selectedChat.type].label }}
          </span>
        </div>

        <div class="chat-bg" ref="chatBg">
          <div class="msg-date-divider"><span>Today</span></div>

          <div v-for="(msg, idx) in currentMessages" :key="idx" class="bubble-wrap" :class="msg.out ? 'out' : 'in'">
            <div class="bubble" :class="msg.out ? 'out' : 'in'">
              <!-- Detail Card (only for first msg) -->
              <div v-if="idx === 0" class="enq-detail-card">
                <div class="enq-detail-type">📋 {{ typeColors[selectedChat.type].label }} Enquiry</div>
                <div class="enq-detail-title">{{ selectedChat.preview }}</div>
                <div class="enq-detail-meta">{{ selectedChat.location }} · YouVBiZ Platform</div>
              </div>
              <div class="bubble-text" v-html="msg.text"></div>
              <div class="bubble-meta">
                <span class="bubble-time">{{ msg.time }}</span>
                <span v-if="msg.out" class="bubble-ticks" :class="{ sent: !msg.read }">
                  <svg width="16" height="10" viewBox="0 0 16 10"><path d="M1 5l3 3 5-7" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 5l3 3 5-7" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="chat-input-bar">
          <div class="chat-input-wrap">
            <button class="chat-emoji-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></button>
            <input type="text" v-model="pendingMessage" placeholder="Type a message…" @keydown.enter="handleSendMsg">
            <button class="chat-attach-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg></button>
          </div>
          <button class="chat-send-btn" @click="handleSendMsg" :disabled="loading">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>

      <!-- FAB (Optional, commented in original) -->
      <button class="new-enquiry-fab" @click="showTypeModal = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>

      <!-- Picker Modal -->
      <div v-if="showTypeModal" class="type-modal-overlay show" @click.self="showTypeModal = false">
        <div class="type-modal">
          <div class="type-modal-handle"></div>
          <div class="type-modal-title">New Enquiry</div>
          <div class="type-option" @click="openCompose('general')">
            <div class="type-option-icon" style="background:rgba(34,162,138,.12);">💬</div>
            <div class="type-option-body">
              <h4>General Enquiry</h4>
              <p>Ask about products, pricing, availability, or any general question</p>
            </div>
          </div>
          <div class="type-option" @click="openCompose('requirement')">
            <div class="type-option-icon" style="background:rgba(10,37,64,.09);">📦</div>
            <div class="type-option-body">
              <h4>Requirement Enquiry</h4>
              <p>Post a specific product requirement with category, quantity & specs</p>
            </div>
          </div>
          <div class="type-option" @click="openCompose('job')">
            <div class="type-option-icon" style="background:rgba(245,158,11,.15);">💼</div>
            <div class="type-option-body">
              <h4>Job Enquiry</h4>
              <p>Apply for a job opening or enquire about career opportunities</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Compose Modal -->
      <div v-if="showComposeModal" class="compose-modal-overlay show" @click.self="showComposeModal = false">
        <div class="compose-modal">
          <div class="compose-modal-handle"></div>
          
          <div v-if="composeType === 'general'">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
              <div style="width:40px;height:40px;border-radius:12px;background:rgba(34,162,138,.12);display:flex;align-items:center;justify-content:center;font-size:20px;">💬</div>
              <div>
                <div style="font-size:16px;font-weight:800;color:var(--navy);font-family:'Barlow',sans-serif;">General Enquiry</div>
                <div style="font-size:11px;color:var(--muted);">Ask about products, pricing, or anything</div>
              </div>
            </div>
            <div class="field">
              <label class="lbl">Your Name / Company</label>
              <div class="inp-wrap"><input v-model="composeForm.name" class="inp" type="text" placeholder="e.g. Sharma Traders Pvt Ltd"></div>
            </div>
            <div class="field">
              <label class="lbl">Message</label>
              <textarea v-model="composeForm.message" class="inp" rows="4" placeholder="Describe your enquiry in detail..."></textarea>
            </div>
            <button class="btn btn-teal" @click="handleSubmitCompose" :disabled="loading" style="width:100%;margin-top:8px;">Send Enquiry</button>
          </div>

          <div v-if="composeType === 'requirement'">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
              <div style="width:40px;height:40px;border-radius:12px;background:rgba(10,37,64,.09);display:flex;align-items:center;justify-content:center;font-size:20px;">📦</div>
              <div>
                <div style="font-size:16px;font-weight:800;color:var(--navy);font-family:'Barlow',sans-serif;">Requirement Enquiry</div>
                <div style="font-size:11px;color:var(--muted);">Post a specific product requirement</div>
              </div>
            </div>
            <div class="field">
              <label class="lbl">Product Category</label>
              <select v-model="composeForm.category" class="inp">
                <option value="">Select Category</option>
                <option>🌾 Agriculture, Food & FMCG</option>
                <option>💄 Beauty & Personal Care</option>
                <option>🏗️ Construction</option>
                <option>⚡ Electrical Products</option>
                <option>📱 Electronics & Appliances</option>
              </select>
            </div>
            <div class="field">
              <label class="lbl">Product Name</label>
              <div class="inp-wrap"><input v-model="composeForm.productName" class="inp" type="text" placeholder="e.g. Marine Grade Ply 18mm"></div>
            </div>
            <button class="btn btn-teal" @click="handleSubmitCompose" :disabled="loading" style="width:100%;margin-top:8px;">Post Requirement</button>
          </div>

          <div v-if="composeType === 'job'">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
              <div style="width:40px;height:40px;border-radius:12px;background:rgba(245,158,11,.15);display:flex;align-items:center;justify-content:center;font-size:20px;">💼</div>
              <div>
                <div style="font-size:16px;font-weight:800;color:var(--navy);font-family:'Barlow',sans-serif;">Job Enquiry</div>
                <div style="font-size:11px;color:var(--muted);">Apply or ask about job openings</div>
              </div>
            </div>
            <div class="field">
              <label class="lbl">Full Name</label>
              <div class="inp-wrap"><input v-model="composeForm.name" class="inp" type="text" placeholder="Your full name"></div>
            </div>
            <div class="field">
              <label class="lbl">Position Applied For</label>
              <div class="inp-wrap"><input v-model="composeForm.position" class="inp" type="text" placeholder="e.g. Sales Executive"></div>
            </div>
            <button class="btn btn-teal" @click="handleSubmitCompose" :disabled="loading" style="width:100%;margin-top:8px;">Send Application</button>
          </div>

        </div>
      </div>

      <transition name="fade">
        <div v-if="toast.show" class="toast" style="display: flex;">{{ toast.message }}</div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import '../utils/dashboard-shared.js';
import { ref, reactive, computed, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const chatBg = ref(null);

const currentTime = ref('9:41');
const loading = ref(false);
const currentTab = ref('all');
const selectedChat = ref(null);
const pendingMessage = ref('');
const showTypeModal = ref(false);
const showComposeModal = ref(false);
const composeType = ref('general');

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'general', label: 'General' },
  { id: 'requirement', label: 'Requirement' },
  { id: 'job', label: 'Job' }
];

const typeColors = {
  general:     { bg: 'rgba(34,162,138,.15)', color: '#22a28a', label: '💬 General', tagBg: 'rgba(34,162,138,.15)', tagColor: '#22a28a' },
  requirement: { bg: 'rgba(10,37,64,.1)',    color: '#0a2540', label: '📦 Requirement', tagBg: 'rgba(10,37,64,.1)', tagColor: '#0a2540' },
  job:         { bg: 'rgba(245,158,11,.15)', color: '#b45309', label: '💼 Job', tagBg: 'rgba(245,158,11,.15)', tagColor: '#b45309' }
};

const conversations = ref([
  { id: 1, type: 'requirement', initials: 'SR', online: true, name: 'Star Retail Mart', time: '2h', preview: 'FMCG · Bulk Supply Order', typeLabel: 'Requirement', unreadCount: 1, location: 'Mumbai' },
  { id: 2, type: 'general', initials: 'GV', online: false, name: 'Green Valley Stores', time: '5h', preview: 'Agriculture · General Inquiry', typeLabel: 'General', unreadCount: 2, location: 'Pune' },
  { id: 3, type: 'job', initials: 'HL', online: false, name: 'Harish Logistics', time: 'Yest.', preview: 'Job · Driver Position', typeLabel: 'Job', unreadCount: 3, location: 'Mumbai' },
  { id: 4, type: 'requirement', initials: 'CB', online: false, name: 'City Bazaar', time: 'Yest.', preview: 'Home Décor · Wholesale Req', typeLabel: 'Requirement', unreadCount: 0, location: 'Delhi' },
  { id: 5, type: 'general', initials: 'AR', online: false, name: 'Apex Retailers', time: '2d', preview: 'Electronics · General Inquiry', typeLabel: 'General', unreadCount: 0, location: 'Bangalore' },
  { id: 6, type: 'job', initials: 'VS', online: false, name: 'Vikas Sharma', time: '3d', preview: 'Job · Warehouse Assistant', typeLabel: 'Job', unreadCount: 0, location: 'Chennai' }
]);

const currentMessages = ref([]);

const toast = reactive({ show: false, message: '' });
const composeForm = reactive({ name: '', message: '', category: '', productName: '', position: '' });

const filteredConversations = computed(() => {
  if (currentTab.value === 'all') return conversations.value;
  return conversations.value.filter(c => c.type === currentTab.value);
});

const handleOpenChat = (conv) => {
  selectedChat.value = conv;
  // Initialize with dummy history
  currentMessages.value = [
    { text: "I am interested in your products. Please share pricing, availability, and delivery terms.", time: "10:23 AM", out: false, read: true },
    { text: "Thank you for reaching out! We would be happy to share our product details.", time: "10:31 AM", out: true, read: true },
    { text: "That sounds good. Can you share more details about your product quality?", time: "10:45 AM", out: false, read: true }
  ];
  scrollToBottom();
};

const handleCloseChat = () => {
  selectedChat.value = null;
};

const scrollToBottom = () => {
  nextTick(() => {
    if (chatBg.value) chatBg.value.scrollTop = chatBg.value.scrollHeight;
  });
};

const handleSendMsg = async () => {
  const text = pendingMessage.value.trim();
  if (!text) return;

  const getTime = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
  };

  const newMsg = { text, time: getTime(), out: true, read: false };
  currentMessages.value.push(newMsg);
  pendingMessage.value = '';
  scrollToBottom();

  try {
    loading.value = true;
    // await axios.post('/api/messages/send', { chatId: selectedChat.value.id, text });
    
    // Simulate tick update
    setTimeout(() => { newMsg.read = true; }, 1000);

    // Simulate auto-reply
    setTimeout(() => {
      currentMessages.value.push({
        text: "Thank you! We will look into it and get back to you.",
        time: getTime(),
        out: false,
        read: true
      });
      scrollToBottom();
    }, 2000);

  } catch (err) {
    showToast('Failed to send message');
  } finally {
    loading.value = false;
  }
};

const openCompose = (type) => {
  composeType.value = type;
  showTypeModal.value = false;
  showComposeModal.value = true;
};

const handleSubmitCompose = async () => {
  try {
    loading.value = true;
    // await axios.post('/api/enquiry/create', { type: composeType.value, ...composeForm });
    
    const messages = { general: '✓ General enquiry sent!', requirement: '✓ Requirement posted!', job: '✓ Job application sent!' };
    showToast(messages[composeType.value] || '✓ Sent!');
    showComposeModal.value = false;
  } catch (err) {
    showToast('Failed to submit');
  } finally {
    loading.value = false;
  }
};

const showToast = (msg) => {
  toast.message = msg;
  toast.show = true;
  setTimeout(() => toast.show = false, 2500);
};

onMounted(() => {
  const now = new Date();
  currentTime.value = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
});
</script>


<style scoped>
/* ── INBOX LIST ── */
.inbox-screen { display: flex; flex-direction: column; flex: 1; min-height: 0; overflow: hidden; }

/* Make app non-scrolling so inner conv-list handles scroll */
.page-content { overflow: hidden !important; }

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
