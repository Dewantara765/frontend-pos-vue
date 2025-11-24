import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { isAuthenticated } from '@/utils/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:catchAll(.*)',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'NotFound',
          component: () => import('../views/NotFound.vue'),
        },
      ],
    },
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'Home',
          component: HomeView,
        },
      ],
      meta: {
        requiresAuth: true,
        title : 'Dashboard'
      },
    },
      {
      path: '/login',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'Login',
          component: LoginView,
        },
      ],
      meta: {
        title : 'Login'
      },
    },
    {
      path: '/category',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'Category',
          component: () => import('../views/Category/IndexView.vue'),
          meta: {
            requiresAuth: true,
            title : 'Category'
          },
        },
        {
          path: 'create',
          name: 'CategoryCreate',
          component: () => import('../views/Category/CreateView.vue'),
          meta: {
            requiresAuth: true,
            title : 'Create Category'
          },
        },
        {
          path: ':id/edit',
          name: 'CategoryEdit',
          component: () => import('../views/Category/EditView.vue'),
          meta: {
            requiresAuth: true,
            title : 'Edit Category'
          },
        },
        {
          path: ':id/products',
          name: 'CategoryProducts',
          component: () => import('../views/Category/ProductsView.vue'),
          meta: {
            requiresAuth: true,
            title : 'Category Products'
          },
        },
      ],

    },
    {
      path: '/product',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'Product',
          component: () => import('../views/Product/IndexView.vue'),
          meta: {
            requiresAuth: true,
            title : 'Product'
          },
        },
        {
          path: 'create',
          name: 'ProductCreate',
          component: () => import('../views/Product/CreateView.vue'),
          meta: {
            requiresAuth: true,
            title : 'Create Product'
          },
        },
        {
          path: ':id/edit',
          name: 'ProductEdit',
          component: () => import('../views/Product/EditView.vue'),
          meta: {
            requiresAuth: true,
            title : 'Edit Product'
          },
        }
      ],
    },
    {
      path: '/customer',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'Customer',
          component: () => import('../views/Customer/IndexView.vue'),
          meta: {
            requiresAuth: true,
            title : 'Customer'
          },
        },
        {
          path: 'create',
          name: 'CustomerCreate',
          component: () => import('../views/Customer/CreateView.vue'),
          meta: {
            requiresAuth: true,
            title : 'Create Customer'
          },
        },
        {
          path: ':id',
          name: 'CustomerView',
          component: () => import('../views/Customer/ShowView.vue'),
          meta: {
            requiresAuth: true,
            title : 'View Customer'
          },
        },

        {
          path: ':id/edit',
          name: 'CustomerEdit',
          component: () => import('../views/Customer/EditView.vue'),
          meta: {
            requiresAuth: true,
            title : 'Edit Customer'
          },
        }
      ],
    },



  ],
})

router.beforeEach((to) => {
    const defaultTitle = 'My App';
    document.title = to.meta.title ? `${to.meta.title} - ${defaultTitle}` : defaultTitle;
  // Cek apakah route yang dituju memerlukan otentikasi
  if (to.meta.requiresAuth && !isAuthenticated()) {
    // Jika belum login dan mencoba mengakses halaman yang memerlukan otentikasi, arahkan ke halaman Login
    return { name: 'Login' };

  }

});

export default router
