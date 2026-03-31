<template>
  <div style="display: contents">
    <div class="phone-notch" style="display: none !important"><div class="notch-speaker"></div><div class="notch-camera"></div></div>
    <div class="status-bar" style="display: none !important">
      <span class="status-time">{{ currentTime }}</span>
      <div class="status-icons">
        <svg viewBox="0 0 24 24" fill="white"><rect x="1" y="15" width="4" height="6" rx="1"/><rect x="7" y="11" width="4" height="10" rx="1"/><rect x="13" y="7" width="4" height="14" rx="1"/><rect x="19" y="3" width="4" height="18" rx="1" opacity=".3"/></svg>
        <div class="battery-icon"><div class="battery-body"><div class="battery-fill"></div></div></div>
      </div>
    </div>
    <div style="display: contents; height: 100%;">
      <div class="page-content">
        <div class="topbar">
          <button @click="router.back()" class="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <span class="topbar-title">Distribution Areas</span>
          <button class="topbar-icon-btn" @click="openModal('add')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>

        <div class="hero" style="padding-bottom:50px;">
          <div class="hero-inner">
            <div class="badge"><span class="badge-dot"></span> Distribution</div>
            <h1 class="hero-title">Distribution <span class="accent">Areas</span></h1>
            <p class="hero-sub">Manage the geographic regions you serve as a distributor.</p>
          </div>
        </div>

        <div class="sheet" style="padding:20px;padding-bottom:100px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <h3 style="font-size:17px;font-weight:800;color:var(--navy);">All Areas</h3>
            <button class="btn btn-teal btn-xs" @click="openModal('add')">+ Add Area</button>
          </div>

          <div v-if="areas.length === 0" class="empty-state">
            <div class="e-ico">🗺️</div>
            <p>No distribution areas defined yet.</p>
            <button class="btn btn-teal btn-sm" style="width:auto;padding:0 24px" @click="openModal('add')">+ Add Area</button>
          </div>

          <div v-else id="areaList">
            <div v-for="a in areas" :key="a.id" class="area-card">
              <div class="area-card-row">
                <div>
                  <div class="area-loc">{{ a.city }}, {{ a.state }}</div>
                  <div class="area-sub">India &nbsp;•&nbsp; {{ a.date }}</div>
                </div>
                <span class="pill pill-teal">Active</span>
              </div>
              <div class="area-meta">
                <span>🏢 {{ a.firm }}</span>
                <span>👤 {{ a.person }} &nbsp;|&nbsp; 📞 {{ a.phone }}</span>
              </div>
              <div class="area-actions">
                <button class="btn btn-outline btn-xs" @click="openModal('edit', a)">✏️ Edit</button>
                <button class="btn btn-danger btn-xs" @click="handleDelete(a.id)" :disabled="loading">🗑 Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav class="bottom-nav">
        <router-link to="/distributor-dashboard" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home
        </router-link>
        <router-link to="/distributor-products" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>Products
        </router-link>
        <router-link to="/distributor-messages" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Messages
        </router-link>
        <router-link to="/membership" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Membership
        </router-link>
        <router-link to="/distributor-profile" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile
        </router-link>
      </nav>

      <!-- Modal -->
      <div v-if="showModal" class="modal-overlay open" @click.self="closeModal">
        <div class="modal-sheet">
          <div class="modal-handle"></div>
          <div class="modal-title">{{ modalMode === 'add' ? 'Add Distribution Area' : 'Edit Distribution Area' }}</div>

          <div class="field">
            <label class="lbl">Country *</label>
            <select v-model="form.country" class="inp inp-no-ico">
              <option value="India">India</option>
            </select>
          </div>
          <div class="form-row">
            <div class="field">
              <label class="lbl">State *</label>
              <select v-model="form.state" class="inp inp-no-ico">
                <option value="">Select State</option>
                <option v-for="s in states" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>
            <div class="field">
              <label class="lbl">City *</label>
              <select v-model="form.city" class="inp inp-no-ico">
                <option value="">Select City</option>
                <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>
          </div>
          <div class="field">
            <label class="lbl">Firm Name *</label>
            <input v-model="form.firm" class="inp inp-no-ico" placeholder="e.g. Sharma Enterprises" />
          </div>
          <div class="form-row">
            <div class="field">
              <label class="lbl">Contact Person *</label>
              <input v-model="form.person" class="inp inp-no-ico" placeholder="Name" />
            </div>
            <div class="field">
              <label class="lbl">Contact No *</label>
              <input v-model="form.phone" class="inp inp-no-ico" type="tel" maxlength="10" placeholder="10 digits" />
            </div>
          </div>

          <!-- Modal Actions -->
          <div style="display:flex;gap:12px;margin-top:20px;">
            <button class="btn btn-outline" style="flex:1" @click="closeModal">Cancel</button>
            <button class="btn btn-teal" style="flex:2" @click="handleSave" :disabled="loading">Save Area</button>
          </div>
        </div>
      </div>

      <div class="toast" v-if="toast.show">{{ toast.message }}</div>
    </div>
  </div>
</template>

<script setup>
import '../utils/dashboard-shared.js';
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('9:41');
const loading = ref(false);
const showModal = ref(false);
const modalMode = ref('add');
const editId = ref(null);

const states = ['Maharashtra', 'Gujarat', 'Karnataka', 'Rajasthan', 'Telangana'];
const cities = ['Pune', 'Ahmedabad', 'Bangalore', 'Jaipur', 'Hyderabad'];

const areas = ref([
  { id: 1, state: 'Maharashtra', city: 'Pune', firm: 'Pune Logistics Hub', person: 'Amit K.', phone: '9876543210', date: '21 Mar 2026' },
  { id: 2, state: 'Gujarat', city: 'Ahmedabad', firm: 'Western Traders', person: 'Suresh P.', phone: '9876543211', date: '22 Mar 2026' }
]);

const form = reactive({
  country: 'India',
  state: '',
  city: '',
  firm: '',
  person: '',
  phone: ''
});

const toast = reactive({ show: false, message: '' });

const openModal = (mode, area = null) => {
  modalMode.value = mode;
  if (mode === 'edit' && area) {
    editId.value = area.id;
    Object.assign(form, { ...area });
  } else {
    editId.value = null;
    resetForm();
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const handleSave = async () => {
  if (!form.state || !form.city || !form.firm || !form.person || !form.phone) {
    showToast('Fill all required fields');
    return;
  }
  if (!/^\d{10}$/.test(form.phone)) {
    showToast('Phone must be 10 digits');
    return;
  }

  try {
    loading.value = true;
    // await axios.post('/api/distribution-areas', form);
    if (modalMode.value === 'edit') {
      const idx = areas.value.findIndex(a => a.id === editId.value);
      if (idx > -1) areas.value[idx] = { ...form, id: editId.value, date: new Date().toLocaleDateString() };
      showToast('Area updated!');
    } else {
      areas.value.push({ ...form, id: Date.now(), date: new Date().toLocaleDateString() });
      showToast('Area added!');
    }
    closeModal();
  } catch (err) {
    showToast('Failed to save area');
  } finally {
    loading.value = false;
  }
};

const handleDelete = async (id) => {
  if (!confirm('Delete this distribution area?')) return;
  try {
    loading.value = true;
    // await axios.delete(`/api/distribution-areas/${id}`);
    areas.value = areas.value.filter(a => a.id !== id);
    showToast('Deleted');
  } catch (err) {
    showToast('Failed to delete area');
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  Object.assign(form, {
    country: 'India',
    state: '',
    city: '',
    firm: '',
    person: '',
    phone: ''
  });
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
.area-card { background:var(--card);border-radius:var(--radius);padding:14px;box-shadow:var(--shadow-sm);margin-bottom:10px; }
.area-card-row { display:flex;align-items:center;justify-content:space-between; }
.area-loc { font-size:14px;font-weight:700;color:var(--navy); }
.area-sub { font-size:12px;color:var(--muted);margin-top:3px; }
.area-meta { font-size:12px;color:var(--text);margin-top:8px;padding-top:8px;border-top:1px solid var(--border); }
.area-meta span { display:block;margin-bottom:3px; }
.area-actions { display:flex;gap:6px;margin-top:10px; }
.empty-state { text-align:center;padding:40px 20px; }
.empty-state .e-ico { font-size:40px;margin-bottom:12px; }
.empty-state p { font-size:13px;color:var(--muted);margin-bottom:16px; }
</style>
