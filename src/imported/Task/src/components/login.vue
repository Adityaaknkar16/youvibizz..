<template>
  <div class="login-wrapper">

    <div class="topbar">
  <router-link to="/home" class="topbar-brand">
    <img src="/Media/Logo.png" alt="YouVBiZ"
         style="height:32px;width:auto;object-fit:contain;" />
  </router-link>

  <div class="topbar-actions">
    <router-link to="/register"
      style="font-size:12px;font-weight:700;color:var(--teal);">
      Register
    </router-link>
  </div>
</div>

      <!-- Hero -->
      <div class="hero">
        <div class="hero-inner">
          <div class="badge"><span class="badge-dot"></span> B2B Marketplace · Pan India</div>
          <h1 class="hero-title">Welcome Back<br>to <span class="accent">YouVBiZ</span></h1>
          <p class="hero-sub">Sign in to connect with manufacturers, distributors &amp; retailers across India.</p>
          <div class="stats-row">
            <div class="stat"><div class="stat-val">10K+</div><div class="stat-lbl">Businesses</div></div>
            <div class="stat"><div class="stat-val">28</div><div class="stat-lbl">States</div></div>
            <div class="stat"><div class="stat-val">100%</div><div class="stat-lbl">Verified</div></div>
          </div>
        </div>
      </div>

      <!-- Sheet -->
      <div class="sheet">

        <!-- Role Selector -->
        <p class="sec-label">I am a —</p>
        <div class="mob-roles">
          <button class="mob-role" :class="{ active: activeRole === 'manufacturer' }" @click="switchRole('manufacturer')">
            <div class="mob-role-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
                <line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
              </svg>
            </div>
            <span class="mob-role-name">Manufacturer/<br>Importer</span>
            <span class="mob-role-tag">Find Distributors</span>
          </button>
          
          <button class="mob-role" :class="{ active: activeRole === 'distributor' }" @click="switchRole('distributor')">
            <div class="mob-role-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/>
                <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
            </div>
            <span class="mob-role-name">Distributor/<br>Wholesaler</span>
            <span class="mob-role-tag">Find Manufacturers</span>
          </button>

          <button class="mob-role" :class="{ active: activeRole === 'retailer' }" @click="switchRole('retailer')">
            <div class="mob-role-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            <span class="mob-role-name">Retailer</span>
            <span class="mob-role-tag">Grow to Wholesale</span>
          </button>
        </div>

        <!-- Ribbon -->
        <div class="ribbon">
          <div class="ribbon-dot"></div>
          <div>
            <div class="ribbon-title">{{ currentRoleInfo.title }}</div>
            <div class="ribbon-text">{{ currentRoleInfo.text }}</div>
          </div>
        </div>

        <!-- Manufacturer Panel -->
        <div class="panel" :class="{ active: activeRole === 'manufacturer' }">
          <div class="card" style="margin-bottom:12px;">
            <form @submit.prevent="doLogin('manufacturer')">
              <div class="field">
                <label class="lbl">Email Address</label>
                <div class="inp-wrap">
                  <span class="inp-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
                  <input type="email" placeholder="name@company.com" class="inp" v-model="forms.manufacturer.email" required>
                </div>
              </div>
              <div class="field">
                <label class="lbl">Password</label>
                <div class="inp-wrap">
                  <span class="inp-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></span>
                  <input :type="showPw.manufacturer ? 'text' : 'password'" placeholder="••••••••" class="inp" v-model="forms.manufacturer.pw" required>
                  <button type="button" class="pw-toggle" :style="{ color: showPw.manufacturer ? 'var(--teal)' : '' }" @click="togglePw('manufacturer')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
              </div>
              <div class="meta-row">
                <div class="remember">
                  <input type="checkbox" class="custom-checkbox" id="rem-mfr" v-model="forms.manufacturer.remember">
                  <label for="rem-mfr">Remember me</label>
                </div>
                <a href="#" class="forgot">Forgot Password?</a>
              </div>
              <button type="submit" class="btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                Sign In as Manufacturer
              </button>
            </form>
          </div>
          <div class="signup-row">Don't have an account? <router-link to="/register">Sign up here</router-link></div>
        </div>

        <!-- Distributor Panel -->
        <div class="panel" :class="{ active: activeRole === 'distributor' }">
          <div class="card" style="margin-bottom:12px;">
            <form @submit.prevent="doLogin('distributor')">
              <div class="field">
                <label class="lbl">Email Address</label>
                <div class="inp-wrap">
                  <span class="inp-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
                  <input type="email" placeholder="name@company.com" class="inp" v-model="forms.distributor.email" required>
                </div>
              </div>
              <div class="field">
                <label class="lbl">Password</label>
                <div class="inp-wrap">
                  <span class="inp-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></span>
                  <input :type="showPw.distributor ? 'text' : 'password'" placeholder="••••••••" class="inp" v-model="forms.distributor.pw" required>
                  <button type="button" class="pw-toggle" :style="{ color: showPw.distributor ? 'var(--teal)' : '' }" @click="togglePw('distributor')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
              </div>
              <div class="meta-row">
                <div class="remember">
                  <input type="checkbox" class="custom-checkbox" id="rem-dist" v-model="forms.distributor.remember">
                  <label for="rem-dist">Remember me</label>
                </div>
                <a href="#" class="forgot">Forgot Password?</a>
              </div>
              <button type="submit" class="btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                Sign In as Distributor
              </button>
            </form>
          </div>
          <div class="signup-row">Don't have an account? <router-link to="/register">Sign up here</router-link></div>
        </div>

        <!-- Retailer Panel -->
        <div class="panel" :class="{ active: activeRole === 'retailer' }">
          <div class="card" style="margin-bottom:12px;">
            <form @submit.prevent="doLogin('retailer')">
              <div class="field">
                <label class="lbl">Email Address</label>
                <div class="inp-wrap">
                  <span class="inp-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
                  <input type="email" placeholder="name@company.com" class="inp" v-model="forms.retailer.email" required>
                </div>
              </div>
              <div class="field">
                <label class="lbl">Password</label>
                <div class="inp-wrap">
                  <span class="inp-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></span>
                  <input :type="showPw.retailer ? 'text' : 'password'" placeholder="••••••••" class="inp" v-model="forms.retailer.pw" required>
                  <button type="button" class="pw-toggle" :style="{ color: showPw.retailer ? 'var(--teal)' : '' }" @click="togglePw('retailer')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
              </div>
              <div class="meta-row">
                <div class="remember">
                  <input type="checkbox" class="custom-checkbox" id="rem-ret" v-model="forms.retailer.remember">
                  <label for="rem-ret">Remember me</label>
                </div>
                <a href="#" class="forgot">Forgot Password?</a>
              </div>
              <button type="submit" class="btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                Sign In as Retailer
              </button>
            </form>
          </div>
          <div class="signup-row">Don't have an account? <router-link to="/register">Sign up here</router-link></div>
        </div>

        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const activeRole = ref('manufacturer')

const rolesMap = {
  manufacturer: { title: 'For Manufacturers & Importers', text: 'Connect with distributors across India and expand your market reach.' },
  distributor:  { title: 'For Distributors & Wholesalers', text: 'Find quality suppliers and manage your wholesale business efficiently.' },
  retailer:     { title: 'For Retailers Aspiring to be Wholesalers', text: 'Grow from retail to wholesale and source directly from manufacturers.' }
}

const currentRoleInfo = computed(() => rolesMap[activeRole.value])

const forms = ref({
  manufacturer: { email: '', pw: '', remember: false },
  distributor:  { email: '', pw: '', remember: false },
  retailer:     { email: '', pw: '', remember: false }
})

const showPw = ref({
  manufacturer: false,
  distributor: false,
  retailer: false
})

const switchRole = (role) => {
  if (rolesMap[role]) {
    activeRole.value = role
  }
}

const togglePw = (role) => {
  showPw.value[role] = !showPw.value[role]
}

const doLogin = (role) => {
  localStorage.setItem('yb_role', role)
  router.push('/home')
}

// Check URL query parameters securely on mount
onMounted(() => {
  // If already logged in, go to home (which will route to dashboard)
  if (localStorage.getItem('yb_role') || localStorage.getItem('role')) {
    router.push('/home')
    return
  }

  const qRole = route.query.role
  if (qRole && rolesMap[qRole]) {
    activeRole.value = qRole
  }
})
</script>

<style scoped>
.mob-roles { display: flex; gap: 9px; margin-bottom: 18px; }
.mob-role {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 7px;
  padding: 14px 6px 12px; border-radius: 18px;
  border: 2px solid #dde3ec; background: #fff;
  cursor: pointer; transition: all .22s ease;
  box-shadow: var(--shadow-sm);
}
.mob-role.active { border-color: var(--navy); background: var(--navy); box-shadow: var(--shadow-lg); }
.mob-role-ico {
  width: 42px; height: 42px; border-radius: 13px; background: #eef1f6;
  display: flex; align-items: center; justify-content: center; transition: all .22s;
}
.mob-role.active .mob-role-ico { background: rgba(34,162,138,.2); }
.mob-role-ico svg { width: 20px; height: 20px; color: var(--navy); transition: color .22s; }
.mob-role.active .mob-role-ico svg { color: var(--teal); }
.mob-role-name { font-size: 10px; font-weight: 700; color: #374151; text-align: center; line-height: 1.3; }
.mob-role.active .mob-role-name { color: #fff; }
.mob-role-tag { font-size: 9px; color: var(--muted); text-align: center; }
.mob-role.active .mob-role-tag { color: rgba(255,255,255,.45); }

.ribbon {
  display: flex; align-items: flex-start; gap: 10px;
  background: linear-gradient(135deg, rgba(10,37,64,.04), rgba(34,162,138,.07));
  border: 1px solid rgba(34,162,138,.2); border-radius: 14px;
  padding: 12px 14px; margin-bottom: 18px;
}
.ribbon-dot { width: 8px; height: 8px; background: var(--teal); border-radius: 50%; flex-shrink: 0; margin-top: 3px; }
.ribbon-title { font-size: 12px; font-weight: 700; color: var(--navy); margin-bottom: 2px; }
.ribbon-text { font-size: 11px; color: #4B5563; line-height: 1.5; }

.panel { display: none; }
.panel.active { display: block; animation: fadeInUp .28s ease forwards; }

.pw-toggle {
  position: absolute; right: 13px; top: 50%;
  transform: translateY(-50%); background: none; border: none;
  color: var(--muted); cursor: pointer; padding: 4px; transition: color .18s;
}
.pw-toggle:hover { color: var(--teal); }
.pw-toggle svg { width: 17px; height: 17px; }

.meta-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
.remember { display: flex; align-items: center; gap: 7px; }
.remember label { font-size: 12px; color: var(--muted); cursor: pointer; }
.forgot { font-size: 12px; font-weight: 600; color: var(--teal); text-decoration: none; }
.forgot:hover { text-decoration: underline; }

.signup-row { text-align: center; font-size: 13px; color: var(--muted); padding: 8px 0; }
.signup-row a { color: var(--teal); font-weight: 700; text-decoration: none; }
.signup-row a:hover { text-decoration: underline; }

.custom-checkbox {
  appearance: none; width: 18px; height: 18px; border: 2px solid #D1D5DB;
  border-radius: 4px; background: white; cursor: pointer; position: relative;
  transition: all .3s;
}
.custom-checkbox:checked { background: var(--teal); border-color: var(--teal); }
.custom-checkbox:checked::after {
  content: '✓'; position: absolute; color: white; font-size: 12px;
  top: 50%; left: 50%; transform: translate(-50%, -50%);
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.btn {
  display: flex; align-items: center; justify-content: center; gap: 10px;
  width: 100%; height: 50px; border-radius: 12px;
  background: var(--teal); color: #fff; border: none;
  font-size: 15px; font-weight: 700; cursor: pointer;
  transition: all .2s; outline: none; box-shadow: 0 4px 12px rgba(34,162,138,0.25);
}
.btn:active { transform: scale(0.97); box-shadow: 0 2px 6px rgba(34,162,138,0.2); }
.btn svg { width: 18px; height: 18px; }
</style>