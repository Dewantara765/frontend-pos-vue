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
            title : 'Kategori'
          },
        },
        {
          path: 'create',
          name: 'CategoryCreate',
          component: () => import('../views/Category/CreateView.vue'),
          meta: {
            requiresAuth: true,
            title : 'Buat Kategori'
          },
        },
        {
          path: ':id/edit',
          name: 'CategoryEdit',
          component: () => import('../views/Category/EditView.vue'),
          meta: {
            requiresAuth: true,
            title : 'Ubah Kategori'
          },
        },
        {
          path: ':id/products',
          name: 'CategoryProducts',
          component: () => import('../views/Category/ProductsView.vue'),
          meta: {
            requiresAuth: true,
            title : 'Produk dalam Kategori'
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
            title : 'Produk'
          },
        },
        {
          path: 'create',
          name: 'ProductCreate',
          component: () => import('../views/Product/CreateView.vue'),
          meta: {
            requiresAuth: true,
            title : 'Buat Produk'
          },
        },
        {
          path: ':id/edit',
          name: 'ProductEdit',
          component: () => import('../views/Product/EditView.vue'),
          meta: {
            requiresAuth: true,
            title : 'Ubah Produk'
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
            title : 'Pembeli'
          },
        },
        {
          path: 'create',
          name: 'CustomerCreate',
          component: () => import('../views/Customer/CreateView.vue'),
          meta: {
            requiresAuth: true,
            title : 'Buat Data Pembeli'
          },
        },
        {
          path: ':id',
          name: 'CustomerView',
          component: () => import('../views/Customer/ShowView.vue'),
          meta: {
            requiresAuth: true,
            title : 'Lihat Data Pembeli'
          },
        },

        {
          path: ':id/edit',
          name: 'CustomerEdit',
          component: () => import('../views/Customer/EditView.vue'),
          meta: {
            requiresAuth: true,
            title : 'Ubah Data Pembeli'
          },
        }
      ],
    },
    {
      path: '/transaction',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'Transaction',
          component: () => import('../views/Transaction/IndexView.vue'),
          meta: {
            requiresAuth: true,
            title : 'Transaksi'
          },
        },
        {
          path: ':id',
          name: 'TransactionView',
          component: () => import('../views/Transaction/ShowView.vue'),
          meta: {
            requiresAuth: true,
            title : 'Lihat Transaksi'
          },
        },
        {
          path: ':id/add',
          name: 'TransactionAddItem',
          component: () => import('../views/Transaction/AddItemView.vue'),
          meta: {
            requiresAuth: true,
            title : 'Tambah Item Transaksi'
          },
        },
        {
          path: 'create',
          name: 'TransactionCreate',
          component: () => import('../views/Transaction/CreateView.vue'),
          meta: {
            requiresAuth: true,
            title : 'Buat Data Transaksi'
          },
        }

      ],
    }


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
