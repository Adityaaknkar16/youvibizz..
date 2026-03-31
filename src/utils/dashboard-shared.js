/* YouVBiZ Dashboard – Shared Utilities */

/* ── Toast ── */
function showToast(msg, type='info') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast show toast-' + type;
  setTimeout(() => t.classList.remove('show'), 2600);
}

/* ── Confirm Delete ── */
function confirmDelete(msg, cb) {
  if (confirm(msg || 'Are you sure you want to delete this item?')) cb();
}

/* ── Indian States (sample for dropdowns) ── */
const STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Delhi','Jammu & Kashmir'
];

const CITIES = {
  'Maharashtra': ['Mumbai','Pune','Nagpur','Nashik','Aurangabad','Thane','Solapur'],
  'Gujarat': ['Ahmedabad','Surat','Vadodara','Rajkot','Bhavnagar','Jamnagar'],
  'Delhi': ['New Delhi','Dwarka','Rohini','Noida','Gurgaon'],
  'Karnataka': ['Bangalore','Mysore','Hubli','Mangalore','Belgaum'],
  'Tamil Nadu': ['Chennai','Coimbatore','Madurai','Tiruchirappalli','Salem'],
  'Telangana': ['Hyderabad','Warangal','Nizamabad','Karimnagar'],
  'Uttar Pradesh': ['Lucknow','Kanpur','Agra','Varanasi','Allahabad','Meerut'],
  'West Bengal': ['Kolkata','Howrah','Durgapur','Asansol'],
  'Rajasthan': ['Jaipur','Jodhpur','Udaipur','Ajmer','Kota'],
  'Madhya Pradesh': ['Bhopal','Indore','Gwalior','Jabalpur'],
};

function populateStates(selectId, selectedVal) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.innerHTML = '<option value="">Select State</option>';
  STATES.forEach(s => {
    const o = document.createElement('option');
    o.value = s; o.textContent = s;
    if (s === selectedVal) o.selected = true;
    sel.appendChild(o);
  });
}

function populateCities(stateVal, selectId, selectedVal) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.innerHTML = '<option value="">Select City</option>';
  const cities = CITIES[stateVal] || [];
  cities.forEach(c => {
    const o = document.createElement('option');
    o.value = c; o.textContent = c;
    if (c === selectedVal) o.selected = true;
    sel.appendChild(o);
  });
}

/* ── Nav active state ── */
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.bottom-nav .nav-item');
  const cur = location.pathname.split('/').pop();
  links.forEach(l => {
    if (l.getAttribute('href') === cur) l.classList.add('active');
    else l.classList.remove('active');
  });
});

/* ── Sample data store (localStorage) ── */
function getData(key) {
  try { return JSON.parse(localStorage.getItem('yvb_' + key) || 'null'); } catch { return null; }
}
function setData(key, val) {
  try { localStorage.setItem('yvb_' + key, JSON.stringify(val)); } catch {}
}
function getList(key) { return getData(key) || []; }
function saveList(key, arr) { setData(key, arr); }
function nextId(arr) { return arr.length ? Math.max(...arr.map(x => x.id || 0)) + 1 : 1; }
function formatDate(d) {
  const dt = d ? new Date(d) : new Date();
  return dt.toLocaleDateString('en-IN', {day:'2-digit', month:'short', year:'numeric'});
}

/* ── Role-based Navigation & Route Guard ── */
(function() {
  const role = localStorage.getItem('role');
  const path = window.location.pathname;
  const pageName = path.split('/').pop() || 'index.html';

  // 1. Strict Route Guarding
  function handleRedirection() {
    if (role && role !== 'undefined') {
      // Prevent logged-in users from hitting login/register (but allow landing page index.html)
      if ((pageName === 'login.html' && !window.location.search.includes('role')) || pageName === 'register.html') {
        window.location.href = 'home.html';
        return true;
      }
    } else {
      // Prevent guest users from hitting private business pages
      const isPrivate = ['-dashboard', '-profile', '-settings', '-products', '-messages', '-enquiries', '-requirements', '-transactions', '-jobs', '-network', '-gallery', '-certificates'].some(term => pageName.includes(term));
      if (isPrivate) {
        window.location.href = 'index.html';
        return true;
      }
    }
    return false;
  }

  // 2. Navigation Syncing
  function syncNavigation() {
    if (!role || role === 'undefined') return;

    // A. Update Dashboard links (Topbar icon & Bottom-nav)
    // We now use the top-right icon as the primary dashboard link
    const dashboardIcon = document.getElementById('loginIcon');
    if (dashboardIcon) {
      if (pageName === 'home.html') {
        dashboardIcon.href = role + '-dashboard.html';
        dashboardIcon.title = 'Dashboard';
        dashboardIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`;
      } else {
        // Guest/Index view: stays login.html with profile icon
        dashboardIcon.title = 'Profile';
      }
    }

    // Hide the redundant text-based dashboard link if it exists
    const textDashboardLink = document.getElementById('dashboardLink');
    if (textDashboardLink) textDashboardLink.style.display = 'none';

    // B. Map Bottom Nav Links to Role Context
    console.log('[Sync] Applying role-based navigation for:', role);
    const navItems = document.querySelectorAll('.bottom-nav .nav-item, .menu-item');
    navItems.forEach(item => {
      let href = item.getAttribute('href');
      
      // 1. Remove Dashboard link from bottom nav as per user request
      if (item.id === 'dashboardNavLink' || item.innerText.includes('Dashboard')) {
        item.style.display = 'none';
        return;
      }

      if (!href || href === '#') return;

      // 2. Map role-specific pages for all links (Bottom Nav + Menu Items)
      // Robust mapping: swap the "manufacturer-" prefix for the current role
      if (href.includes('dashboard.html') || item.innerText.includes('Home')) {
         item.href = 'home.html';
      } else if (href === 'post-requirement.html' || item.innerText.includes('Post')) {
         item.href = role + '-requirements.html';
      } else if (href === 'careers.html' || item.innerText.includes('Jobs')) {
         item.href = role + '-jobs.html';
      } else if (href === 'Listing.html' || item.innerText.includes('Explore')) {
         item.href = 'Listing.html';
      } else if (href.startsWith('manufacturer-')) {
         const shared = ['manufacturer-gallery.html', 'manufacturer-certificates.html'];
         if (shared.includes(href)) {
           // Do not rename shared pages
         } else {
           item.href = role + href.substring(12);
         }
      } else if (href.startsWith('distributor-') || href.startsWith('retailer-')) {
         // Consistent mapping for other prefixes
         // If for some reason a retailer- link is on a manufacturer profile?
         // We should map it to the current role
         const prefixEnd = href.indexOf('-');
         item.href = role + href.substring(prefixEnd);
      } else if (href === 'index.html' && role) {
         item.href = 'home.html';
      } else if (href === 'login.html' || item.id === 'accountLink') {
         item.href = role + '-profile.html';
         const textNode = Array.from(item.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0);
         if (textNode) {
           if (pageName === 'index.html') textNode.textContent = ' Account';
           else textNode.textContent = ' Profile';
         }
      }

      // 3. Rename "Payments" to "Membership" as per user request
      if (item.innerText.includes('Payments') || href.includes('transactions.html') || href === 'payments.html') {
        item.href = 'membership-plan.html';
        const textNode = Array.from(item.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0);
        if (textNode) textNode.textContent = ' Membership';
        const svg = item.querySelector('svg');
        if (svg) {
          svg.innerHTML = '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>';
        }
      }

      // 4. Active Tab Highlighting
      item.classList.remove('active');
      if (pageName === item.getAttribute('href')) {
        item.classList.add('active');
      }
    });

    // D. Universal Back-Button Logic (A -> B -> A flow)
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        // If there's local history, go back naturally
        if (window.history.length > 1) {
          e.preventDefault();
          window.history.back();
        }
        // Otherwise, let the default href (defined in HTML) act as a fallback
      });
    }

    // E. Detail Page Context (e.g. show "Edit" on manufacturer_detail if owner)
    if (pageName === 'manufacturer_detail.html') {
      const editBtn = document.getElementById('editCompanyBtn');
      if (editBtn && role === 'manufacturer') editBtn.style.display = 'block';
    }
  }

  // Execute Guard immediately to prevent flickering
  if (!handleRedirection()) {
    document.addEventListener('DOMContentLoaded', syncNavigation);
  }

  // Global Helpers
  window.doLogout = function() {
    localStorage.removeItem('role');
    window.location.href = 'index.html';
  };

  window.showToast = function(msg) {
    let t = document.getElementById('toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast'; t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
  };
})();
