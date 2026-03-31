<template>
  <div style="display: contents">
    <div class="phone-notch" style="display: none !important">
      <div class="notch-speaker"></div>
      <div class="notch-camera"></div>
    </div>

    <div class="status-bar" style="display: none !important">
      <span class="status-time">9:41</span>
      <div class="status-icons">
        <svg viewBox="0 0 24 24" fill="white">
          <rect x="1" y="15" width="4" height="6" rx="1"/>
          <rect x="7" y="11" width="4" height="10" rx="1"/>
          <rect x="13" y="7" width="4" height="14" rx="1"/>
          <rect x="19" y="3" width="4" height="18" rx="1" opacity=".3"/>
        </svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round">
          <path d="M5 12.55a11 11 0 0114.08 0"/>
          <path d="M1.42 9a16 16 0 0121.16 0"/>
          <path d="M8.53 16.11a6 6 0 016.95 0"/>
          <circle cx="12" cy="20" r="1" fill="white" stroke="none"/>
        </svg>
        <div class="battery-icon">
          <div class="battery-body"><div class="battery-fill"></div></div>
        </div>
      </div>
    </div>

    <div style="display: contents; height: 100%;">
      <div class="page-content">

        <!-- Topbar -->
        <div class="topbar">
          <a href="#" @click.prevent="$router.back()" class="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </a>
          <span class="topbar-title">Contact Us</span>
          <div style="width:36px;"></div>
        </div>

        <!-- Cover Image -->
        <img
          class="contact-img"
          :src="imgSrc"
          alt="Contact YouVBiZ"
          @error="imgSrc = 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800'"
        />

        <!-- Hero -->
        <div class="hero" style="padding:24px 22px 52px;margin-top:-10px;">
          <div class="hero-inner">
            <div class="badge"><span class="badge-dot"></span> We're Here to Help</div>
            <h1 class="hero-title">Get in<br><span class="accent">Touch</span></h1>
            <p class="hero-sub">Have questions about our marketplace or need assistance? We're here to help you grow your business.</p>
          </div>
        </div>

        <!-- Sheet -->
        <div class="sheet">

          <p class="sec-label">Contact Information</p>

          <!-- Address Card -->
          <div class="contact-card">
            <h4>UV Plylam Private Limited</h4>
            <p style="margin-top:8px;">
              Survey No : 376, Door No : 5-9-262/Part-24,<br>
              Rajiv Gandhi Nagar, Prashanthi Nagar,<br>
              Hyderabad - 500072
            </p>
          </div>

          <!-- Contact Items Card -->
          <div class="contact-card">
            <div class="contact-item">
              <div class="contact-ico">📞</div>
              <div style="flex:1;">
                <div class="contact-label">Call Us</div>
                <div class="contact-value"><a href="tel:+919911662276">+91 99116 62276</a></div>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-ico">✉️</div>
              <div style="flex:1;">
                <div class="contact-label">Email Us</div>
                <div class="contact-value"><a href="mailto:support@youvbiz.com">support@youvbiz.com</a></div>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-ico">📍</div>
              <div style="flex:1;">
                <div class="contact-label">Location</div>
                <div class="contact-value">Pan India Network</div>
              </div>
            </div>
          </div>

          <!-- WhatsApp -->
          <a href="https://wa.me/919911662276" class="whatsapp-btn" target="_blank" style="margin-bottom:16px;">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Chat on WhatsApp
          </a>

          <p class="sec-label">Send us a Message</p>

          <!-- Contact Form -->
          <div class="card">
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-input" placeholder="Enter your full name" v-model="form.name" required />
              </div>
              <div class="form-group">
                <label class="form-label">Email Address</label>
                <input type="email" class="form-input" placeholder="your.email@example.com" v-model="form.email" required />
              </div>
              <div class="form-group">
                <label class="form-label">Phone Number</label>
                <input type="tel" class="form-input" placeholder="+91 XXXXX XXXXX" v-model="form.phone" required />
              </div>
              <div class="form-group">
                <label class="form-label">Message</label>
                <textarea class="form-input form-textarea" placeholder="Tell us how we can help you..." v-model="form.message" required></textarea>
              </div>
              <div class="form-group" style="display:flex;align-items:flex-start;gap:8px;margin-bottom:16px;">
                <input type="checkbox" id="terms" v-model="form.terms" style="margin-top:3px;" required />
                <label for="terms" style="font-size:11px;color:var(--muted);line-height:1.5;">
                  I have read and agree to the <a href="#" style="color:var(--teal);font-weight:600;">Terms & Conditions</a>
                </label>
              </div>
              <button type="submit" class="btn btn-teal" style="width:100%;" :disabled="loading">
                {{ loading ? 'Submitting...' : 'Submit' }}
              </button>
              <div v-if="success" class="success">{{ success }}</div>
              <div v-if="error" class="error">{{ error }}</div>
            </form>
          </div>

          <p class="sec-label mt-16">Office Hours</p>
          <div class="card">
            <div class="hours-row" style="border-bottom:1px solid var(--border);">
              <span>Monday - Friday</span><span>9:00 AM - 6:00 PM</span>
            </div>
            <div class="hours-row" style="border-bottom:1px solid var(--border);">
              <span>Saturday</span><span>10:00 AM - 4:00 PM</span>
            </div>
            <div class="hours-row">
              <span>Sunday</span><span>Closed</span>
            </div>
          </div>

        </div><!-- /sheet -->
      </div><!-- /app -->

      <!-- Bottom Nav -->
      <nav class="bottom-nav">
        <a href="#" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Home
        </a>
        <a href="#" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          Explore
        </a>
        <a href="#" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          Post
        </a>
        <a href="#" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
          Jobs
        </a>
        <a href="#" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Account
        </a>
      </nav>

    </div><!-- /phone-screen -->
  </div><!-- /phone-frame -->
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'

const imgSrc = ref('Media/contact.jpg')
const loading = ref(false)
const success = ref('')
const error = ref('')

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
  terms: false
})

async function submitForm() {
  error.value = ''
  success.value = ''
  loading.value = true
  try {
    await axios.post('/api/contact', form)
    success.value = 'Form submitted! Our team will reach out to you within 24 hours.'
    form.name = ''; form.email = ''; form.phone = ''; form.message = ''; form.terms = false
  } catch {
    error.value = 'Failed to send message. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.contact-img { width: 100%; height: 200px; object-fit: cover; }

.contact-card {
  background: var(--card);
  border-radius: var(--radius);
  padding: 16px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 12px;
}
.contact-card h4 { font-size: 14px; font-weight: 700; color: var(--navy); margin-bottom: 4px; }
.contact-card p { font-size: 12px; color: var(--muted); line-height: 1.6; margin: 0; }

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}
.contact-item:last-child { border-bottom: none; }

.contact-ico {
  width: 36px; height: 36px;
  border-radius: 10px;
  background: var(--teal-dim);
  display: flex; align-items: center; justify-content: center;
  color: var(--teal);
  flex-shrink: 0;
  font-size: 16px;
}

.contact-label { font-size: 11px; color: var(--muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.3px; margin-bottom: 2px; }
.contact-value { font-size: 13px; color: var(--text); font-weight: 600; }
.contact-value a { color: var(--text); text-decoration: none; }

.form-group { margin-bottom: 14px; }
.form-label { font-size: 12px; font-weight: 600; color: var(--navy); margin-bottom: 6px; display: block; }
.form-input {
  width: 100%;
  padding: 11px 14px;
  border: 1.5px solid var(--border);
  border-radius: 10px;
  font-size: 13px;
  font-family: inherit;
  transition: var(--transition);
  background: #fff;
  color: var(--text);
  outline: none;
}
.form-input:focus { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(34,162,138,0.1); }
.form-textarea { min-height: 100px; resize: vertical; }

.whatsapp-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #25D366;
  color: white;
  padding: 12px 18px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  font-size: 13px;
  transition: var(--transition);
}
.whatsapp-btn:active { transform: scale(0.97); }

.hours-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}
.hours-row span:first-child { font-size: 12px; color: var(--text); font-weight: 600; }
.hours-row span:last-child { font-size: 12px; color: var(--muted); }

.mt-16 { margin-top: 16px; }

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  font-size: 10px;
}
.nav-item svg { width: 20px; height: 20px; }
</style>
