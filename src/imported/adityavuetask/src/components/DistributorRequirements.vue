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
        <div class="topbar">
          <button @click="router.back()" class="back-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>
          <span class="topbar-title">Requirements</span>
          <button class="topbar-icon-btn" @click="showAddModal = true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
        <div class="hero" style="padding:20px 22px 50px;">
          <div class="hero-inner">
            <h1 class="hero-title" style="font-size:24px;">My <span class="accent">Requirements</span></h1>
            <p class="hero-sub">Post and manage your supply needs.</p>
          </div>
        </div>
        <div class="sheet">
          <div class="filter-tabs">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              class="ftab" 
              :class="{ active: currentFilter === tab.id }"
              @click="currentFilter = tab.id"
            >
              {{ tab.label }} ({{ getCount(tab.id) }})
            </button>
          </div>

          <div v-if="loading && requirements.length === 0" style="padding: 20px; text-align: center;">Loading requirements...</div>
          <div v-if="error" style="padding: 10px; color: red; text-align: center;">{{ error }}</div>

          <div v-for="req in filteredRequirements" :key="req.id" class="req-card">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px;">
              <div style="font-size:15px;font-weight:700;color:var(--text);">{{ req.product }}</div>
              <span class="badge" :class="req.status === 'New' ? 'badge-success' : ''" :style="req.status === 'Responded' ? 'background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;' : ''">
                {{ req.status }}
              </span>
            </div>
            <div style="font-size:12px;color:var(--muted);display:flex;gap:14px;flex-wrap:wrap;margin-bottom:8px;">
              <span>📍 {{ req.location }}</span><span>📦 {{ req.quantity }}</span>
            </div>
            <div style="font-size:13px;color:var(--text);background:var(--bg);border-radius:10px;padding:10px;margin-bottom:12px;">{{ req.notes }}</div>
            <div style="display:flex;gap:8px;">
              <button class="btn btn-outline btn-sm" style="flex:1;" @click="handleEdit(req.id)">Edit</button>
              <button class="btn btn-outline btn-sm" style="color:var(--danger);border-color:var(--danger);" @click="handleDelete(req.id)" :disabled="loading">Delete</button>
            </div>
          </div>

          <div v-if="filteredRequirements.length === 0 && !loading" style="padding: 40px 20px; text-align: center; color: var(--muted);">
            No requirements found.
          </div>

          <button class="btn btn-teal w-full mt-8" @click="showAddModal = true" style="margin-bottom:24px;">
            + Add New Requirement
          </button>
        </div>

        <!-- Add Modal -->
        <div v-if="showAddModal" class="add-modal-backdrop" @click.self="showAddModal = false" style="position:absolute; inset:0; background:rgba(0,0,0,0.5); z-index:299;">
          <div class="add-modal" style="position:absolute;bottom:0;left:0;right:0;background:var(--card);border-radius:var(--radius-xl) var(--radius-xl) 0 0;padding:20px;box-shadow:0 -10px 40px rgba(0,0,0,.2);z-index:300;max-height:80%;overflow-y:auto;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
              <span style="font-size:16px;font-weight:800;">Add Requirement</span>
              <button @click="showAddModal = false" style="background:var(--bg);border-radius:8px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;color:var(--muted);">✕</button>
            </div>
            
            <label class="form-label">Product / Category *</label>
            <input v-model="form.product" class="form-input" placeholder="e.g. Plywood 18mm, Marine Ply">
            
            <label class="form-label">Location *</label>
            <input v-model="form.location" class="form-input" placeholder="e.g. Pune, Maharashtra">
            
            <label class="form-label">Quantity Required</label>
            <input v-model="form.quantity" class="form-input" placeholder="e.g. 500 sheets/month">
            
            <label class="form-label">Additional Notes</label>
            <textarea v-model="form.notes" class="form-input" rows="2" placeholder="Specifications, delivery terms, etc."></textarea>
            
            <button class="btn btn-teal w-full" @click="handleSubmit" :disabled="loading">Submit Requirement</button>
          </div>
        </div>
      </div>

      <nav class="bottom-nav">
        <router-link to="/" class="nav-item">
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

      <div class="toast" v-if="toast.show">{{ toast.message }}</div>
    </div>
  </div>
</template>

<script setup>
import '../utils/dashboard-shared.js';
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTime = ref('9:41');
const loading = ref(false);
const error = ref(null);
const currentFilter = ref('All');
const showAddModal = ref(false);

const tabs = [
  { id: 'All', label: 'All' },
  { id: 'Active', label: 'Active' },
  { id: 'Responded', label: 'Responded' }
];

const requirements = ref([
  { id: 1, product: 'Plywood Distribution', status: 'New', location: 'Maharashtra', quantity: '500+ sheets/month', notes: 'Nagpur region preferred' },
  { id: 2, product: 'Laminate Wholesale', status: 'Responded', location: 'Gujarat', quantity: 'Negotiable', notes: 'Looking for steady supplier' },
  { id: 3, product: 'Hardware Fittings', status: 'New', location: 'Pan India', quantity: 'Large Volume', notes: 'Modular furniture components' }
]);

const form = reactive({
  product: '',
  location: '',
  quantity: '',
  notes: ''
});

const toast = reactive({ show: false, message: '' });

const getCount = (filter) => {
  if (filter === 'All') return requirements.value.length;
  if (filter === 'Active') return requirements.value.filter(r => r.status === 'New').length;
  return requirements.value.filter(r => r.status === filter).length;
};

const filteredRequirements = computed(() => {
  if (currentFilter.value === 'All') return requirements.value;
  if (currentFilter.value === 'Active') return requirements.value.filter(r => r.status === 'New');
  return requirements.value.filter(r => r.status === currentFilter.value);
});

const fetchRequirements = async () => {
  try {
    loading.value = true;
    error.value = null;
    // const response = await axios.get('/api/distributor/requirements');
    // requirements.value = response.data;
  } catch (err) {
    error.value = 'Failed to load requirements';
  } finally {
    loading.value = false;
  }
};

const handleSubmit = async () => {
  if (!form.product || !form.location) {
    showToast('Please fill required fields');
    return;
  }

  try {
    loading.value = true;
    // const response = await axios.post('/api/distributor/requirements', form);
    
    // For demo/dev purposes:
    requirements.value.unshift({
      id: Date.now(),
      product: form.product,
      location: form.location,
      quantity: form.quantity || 'Negotiable',
      notes: form.notes || 'No additional notes',
      status: 'New'
    });

    showToast('Requirement added!');
    showAddModal.value = false;
    resetForm();
  } catch (err) {
    showToast('Failed to add requirement');
  } finally {
    loading.value = false;
  }
};

const handleDelete = async (id) => {
  if (!confirm('Are you sure you want to delete this requirement?')) return;
  try {
    loading.value = true;
    // await axios.delete(`/api/requirements/${id}`);
    requirements.value = requirements.value.filter(r => r.id !== id);
    showToast('Requirement deleted');
  } catch (err) {
    showToast('Failed to delete requirement');
  } finally {
    loading.value = false;
  }
};

const handleEdit = (id) => {
  showToast('Edit opened');
};

const resetForm = () => {
  form.product = '';
  form.location = '';
  form.quantity = '';
  form.notes = '';
};

const showToast = (msg) => {
  toast.message = msg;
  toast.show = true;
  setTimeout(() => toast.show = false, 2500);
};

onMounted(() => {
  fetchRequirements();
  const now = new Date();
  currentTime.value = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
});
</script>


<style scoped>
.form-label { font-size:12px; font-weight:700; color:var(--text); margin-bottom:6px; display:block; text-transform:uppercase; letter-spacing:.3px; }
.form-input { width:100%; border:1.5px solid var(--border); border-radius:10px; padding:12px 14px; font-size:14px; font-family:Inter,sans-serif; background:var(--card); color:var(--text); transition:var(--transition); margin-bottom:14px; }
.form-input:focus { border-color:var(--teal); box-shadow:0 0 0 3px var(--teal-dim); outline:none; }
select.form-input { appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 12px center; background-size:16px; }
textarea.form-input { resize:none; line-height:1.5; }
.form-row { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.form-section { margin-bottom:4px; }
.section-title { font-size:14px; font-weight:800; color:var(--navy); font-family:'Barlow',sans-serif; margin-bottom:14px; padding-bottom:8px; border-bottom:2px solid var(--border); }
.checkbox-group { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:14px; }
.check-pill { display:flex; align-items:center; gap:6px; padding:7px 14px; border-radius:20px; border:1.5px solid var(--border); background:var(--card); font-size:12px; font-weight:600; cursor:pointer; transition:var(--transition); user-select:none; }
.check-pill input { display:none; }
.check-pill.checked { border-color:var(--teal); background:var(--teal-dim); color:var(--teal); }
.filter-tabs { display:flex;gap:8px;overflow-x:auto;padding-bottom:2px;scrollbar-width:none;margin-bottom:16px; }
.filter-tabs::-webkit-scrollbar { display:none; }
.ftab { flex-shrink:0;padding:7px 16px;border-radius:20px;font-size:12px;font-weight:700;border:1.5px solid var(--border);background:var(--card);color:var(--muted);cursor:pointer;transition:var(--transition); }
.ftab.active { background:var(--navy);color:#fff;border-color:var(--navy); }
.req-card { background:var(--card);border-radius:var(--radius);padding:16px;margin-bottom:12px;box-shadow:var(--shadow-sm); }
</style>
