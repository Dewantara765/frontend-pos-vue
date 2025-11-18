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
