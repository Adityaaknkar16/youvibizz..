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
          <button class="back-btn" @click="goBack">←</button>
          <span class="topbar-title">Client Networks</span>
          <button class="topbar-icon-btn" @click="openModal('add')">+</button>
        </div>

        <!-- Hero -->
        <div class="hero">
          <div class="hero-inner">
            <h1 class="hero-title">Client Networks</h1>
          </div>
        </div>

        <!-- Content -->
        <div class="sheet">
          <div>
            <h3>Connections</h3>
            <button class="btn btn-teal btn-xs" @click="openModal('add')">
              + Add Client
            </button>
          </div>

          <!-- Filters -->
          <div class="filter-tabs">
            <button
              v-for="tab in tabs"
              :key="tab"
              class="ftab"
              :class="{ active: activeFilter === tab }"
              @click="activeFilter = tab"
            >
              {{ tab }}
            </button>
          </div>

          <!-- List -->
          <div v-if="filteredClients.length">
            <div v-for="c in filteredClients" :key="c.id" class="cn-card">
              <div class="cn-top">
                <div class="cn-avatar">{{ emojis[c.type] }}</div>

                <div style="flex:1">
                  <div class="cn-name">{{ c.firm }}</div>
                  <div class="cn-type">
                    {{ c.name }} — {{ c.city }}, {{ c.state }}
                  </div>
                </div>

                <span class="pill">{{ c.type }}</span>
              </div>

              <div class="cn-info">
                <span>📞 {{ c.phone }}</span>
                <span v-if="c.email">✉️ {{ c.email }}</span>
              </div>

              <p v-if="c.notes">{{ c.notes }}</p>

              <div class="cn-actions">
                <button @click="openModal('edit', c)">Edit</button>
                <button @click="deleteClient(c.id)">Delete</button>
              </div>
            </div>
          </div>

          <!-- Empty -->
          <div v-else class="empty-state">
            <p>No clients found</p>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div class="modal-overlay" :class="{ open: showModal }">
        <div class="modal-sheet">
          <div class="modal-handle"></div>
          <div class="modal-title">
            {{ isEdit ? "Edit Client" : "Add Client" }}
          </div>

          <div class="field">
            <label class="lbl">Type *</label>
            <select class="inp inp-no-ico" v-model="form.type">
              <option value="">Select Type</option>
              <option>Distributor</option>
              <option>Retailer</option>
              <option>Manufacturer</option>
            </select>
          </div>

          <div class="field">
            <label class="lbl">Firm Name *</label>
            <input class="inp inp-no-ico" v-model="form.firm" placeholder="Firm Name" />
          </div>

          <div class="field">
            <label class="lbl">Contact Name *</label>
            <input class="inp inp-no-ico" v-model="form.name" placeholder="Contact Name" />
          </div>

          <div class="form-row">
            <div class="field">
              <label class="lbl">Phone *</label>
              <input class="inp inp-no-ico" v-model="form.phone" placeholder="Phone" />
            </div>
            <div class="field">
              <label class="lbl">Email</label>
              <input class="inp inp-no-ico" v-model="form.email" placeholder="Email" />
            </div>
          </div>

          <div class="field">
            <label class="lbl">Notes</label>
            <textarea class="inp inp-no-ico" v-model="form.notes" placeholder="Notes..."></textarea>
          </div>

          <div style="display:flex;gap:10px;margin-top:4px;">
            <button class="btn btn-outline btn-sm" style="flex:1" @click="closeModal">Cancel</button>
            <button class="btn btn-teal btn-sm" style="flex:2" :disabled="loading" @click="submitForm">
              {{ loading ? "Saving..." : "Save Client" }}
            </button>
          </div>

          <div v-if="error" class="error">{{ error }}</div>
          <div v-if="success" class="success">{{ success }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import axios from "axios";

/* ---------------- STATE ---------------- */
const clients = ref([]);
const activeFilter = ref("All");
const showModal = ref(false);
const isEdit = ref(false);
const loading = ref(false);
const error = ref("");
const success = ref("");

const tabs = ["All", "Distributor", "Retailer", "Manufacturer"];

const emojis = {
  Distributor: "🚚",
  Retailer: "🏪",
  Manufacturer: "🏭",
};

const form = reactive({
  id: null,
  type: "",
  firm: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
});

/* ---------------- COMPUTED ---------------- */
const filteredClients = computed(() => {
  if (activeFilter.value === "All") return clients.value;
  return clients.value.filter(c => c.type === activeFilter.value);
});

/* ---------------- METHODS ---------------- */
const goBack = () => window.history.back();

const openModal = (mode, client = null) => {
  showModal.value = true;
  isEdit.value = mode === "edit";

  if (client) Object.assign(form, client);
  else resetForm();
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const resetForm = () => {
  form.id = null;
  form.type = "";
  form.firm = "";
  form.name = "";
  form.phone = "";
  form.email = "";
  form.notes = "";
};

/* ---------------- API ---------------- */
const fetchClients = async () => {
  try {
    const res = await axios.get("/api/clients");
    clients.value = res.data;
  } catch (err) {
    error.value = "Failed to load clients";
  }
};

const submitForm = async () => {
  loading.value = true;
  error.value = "";
  success.value = "";

  try {
    if (isEdit.value) {
      await axios.put(`/api/clients/${form.id}`, form);
      success.value = "Client updated!";
    } else {
      await axios.post("/api/clients", form);
      success.value = "Client added!";
    }

    await fetchClients();
    closeModal();
  } catch (err) {
    error.value = "Something went wrong";
  } finally {
    loading.value = false;
  }
};

const deleteClient = async (id) => {
  if (!confirm("Delete this client?")) return;

  try {
    await axios.delete(`/api/clients/${id}`);
    clients.value = clients.value.filter(c => c.id !== id);
  } catch {
    error.value = "Delete failed";
  }
};

/* ---------------- INIT ---------------- */
onMounted(() => {
  // fetchClients() — no backend yet, starts with empty list
});
</script>