import { createRouter, createWebHistory } from 'vue-router'
import { externalRoutes } from './generated-routes.js'

import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Payments from '../views/Payments.vue'

// New Views
import InterestedProducts from '../views/InterestedProducts.vue'
import EnquiryReceived from '../views/EnquiryReceived.vue'
import DistributorJobForm from '../views/DistributorJobForm.vue'
import DistributorCompanyPortfolio from '../views/DistributorCompanyPortfolio.vue'

const routes = [
  { path: '/', name: 'login', component: () => import('../imported/Task/src/components/login.vue') },
  { path: '/home', name: 'home', component: Home },
  { path: '/register', name: 'register', component: Register },
  { path: '/payments', name: 'payments', component: Payments },

  // Distributor Routes
  { 
    path: '/distributor/dashboard', 
    name: 'distributor-dashboard', 
    component: () => import('../imported/adityavuetask/src/components/DistributorDashboard.vue') 
  },
  { path: '/distributor-dashboard', redirect: '/distributor/dashboard' },
  { path: '/interested-products', name: 'interested-products', component: InterestedProducts },
  { path: '/enquiry-received', name: 'enquiry-received', component: EnquiryReceived },
  { path: '/distributor-job-form', name: 'distributor-job-form', component: DistributorJobForm },
  { path: '/distributor_detail', name: 'company-portfolio', component: DistributorCompanyPortfolio },
  { path: '/branches', name: 'branches', component: () => import('../imported/Purva/vue-project/src/pages-converted/branches.vue') },
  { path: '/business-network-areas', name: 'business-network-areas', component: () => import('../imported/Purva/vue-project/src/pages-converted/business-network-areas.vue') },
  { path: '/client-networks-add-edit', name: 'client-networks', component: () => import('../imported/Purva/vue-project/src/pages-converted/client-networks-add-edit.vue') },
  { path: '/membership-plan', name: 'membership-plan', component: () => import('../imported/Tanaya/youvbiz-app/src/pages/MembershipPlan.vue') },
  { path: '/manufacturer-gallery', name: 'gallery', component: () => import('../imported/Task/src/components/manufacturer-gallery.vue') },
  { path: '/distributor-jobs', name: 'distributor-jobs', component: () => import('../imported/adityavuetask/src/components/DistributorJobs.vue') },
  { path: '/distributor-products', name: 'distributor-products', component: () => import('../imported/adityavuetask/src/components/DistributorProducts.vue') },

  // Role-based Views
  { path: '/retailer/dashboard',    name: 'retailer-dashboard',    component: () => import('../views/RetailerDashboard.vue') },
  { path: '/manufacturer/dashboard', name: 'manufacturer-dashboard', component: () => import('../views/ManufacturerDashboard.vue') },

  // Distributor profile & sub-pages (short URLs)
  { path: '/distributor/profile',       redirect: '/pages/adityavuetask/distributor-profile' },
  { path: '/distributor/profile-edit',  redirect: '/pages/adityavuetask/distributor-profile-edit' },
  { path: '/distributor/requirements',  redirect: '/pages/adityavuetask/distributor-requirements' },
  { path: '/distributor/settings',      redirect: '/pages/adityavuetask/distributor-settings' },
  { path: '/distributor/transactions',  redirect: '/pages/adityavuetask/distributor-transactions' },
  { path: '/distributor/enquiries',     redirect: '/pages/adityavuetask/distributor-enquiries' },

  // Manufacturer profile & sub-pages (short URLs)
  { path: '/manufacturer/profile',      redirect: '/pages/task/manufacturer-detail' },
  { path: '/manufacturer/profile/edit', redirect: '/pages/task/manufacturer-edit' },
  { path: '/manufacturer/jobs',         redirect: '/pages/task/manufacturer-jobs' },
  { path: '/manufacturer/certificates', redirect: '/pages/task/manufacturer-certificates' },
  { path: '/manufacturer/gallery',      redirect: '/manufacturer-gallery' },
  { path: '/manufacturer/enquiries',    redirect: '/pages/task/enquiry-view' },

  // Retailer profile & sub-pages (short URLs)
  { path: '/retailer/profile',          redirect: '/pages/tanaya/retailer-detail' },
  { path: '/retailer/jobs',             redirect: '/pages/tanaya/retailer-jobs' },
  { path: '/retailer/requirements',     redirect: '/pages/tanaya/retailer-requirements' },
  { path: '/retailer/enquiries',        redirect: '/pages/tanaya/retailer-enquiries' },
  { path: '/retailer/transactions',     redirect: '/pages/tanaya/retailer-transactions' },

  { path: '/listing', redirect: '/pages/task/listing' },
  { path: '/careers', redirect: '/pages/purva/careers' },

  // Include generated external routes
  ...externalRoutes,

  { 
    path: '/:pathMatch(.*)*', 
    redirect: () => {
      const role = localStorage.getItem('yb_role') || localStorage.getItem('role')
      return role ? '/home' : '/'
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
