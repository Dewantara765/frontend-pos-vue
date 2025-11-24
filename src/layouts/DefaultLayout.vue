<script setup lang="ts">
import { onMounted } from 'vue';
import api from '@/services/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

interface User {
  id: number;
  name: string;
  email: string;
  // Tambahkan properti lain sesuai dengan struktur data user Anda
}

const user = ref<User[]>([])
const error = ref('')
const token = ref(localStorage.getItem('token'))
const router = useRouter()
const activeTab = ref('')

const changeActiveTab = (tabName: string) => {
  activeTab.value = tabName;
}


onMounted(async () => {
  if (!token.value) {
    error.value = 'No token found'
    return;
  }
   error.value = ''
   user.value = []
    try {
        const response = await api.get('/user', {
            headers: {
                Authorization: `Bearer ${token.value}`
            }
        });
        user.value = response.data;
    } catch (err: unknown) {
        if (err.response.status === 401) {
            error.value = 'Unauthorized';
            localStorage.removeItem('token');
            token.value = '';
        }else {
            error.value = 'An error occurred';
        }

    }

})

const performClientLogout = () => {
    // 3. Hapus Token dari localStorage
    localStorage.removeItem('token');

    // 4. Redirect ke halaman Login
    router.push({ name: 'Login' });

    // Opsional: Refresh halaman jika menggunakan state management (Vuex/Pinia)
    // untuk memastikan semua state otentikasi ter-reset.
    // window.location.reload();
};

const logout = async () => {
  if (!token.value) {
    performClientLogout();
    return
  }
  try {
    await api.post('/logout', {

    }, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    ;
    performClientLogout();
  } catch (err) {
    performClientLogout();

    // Opsional: Tampilkan pesan error jika server bermasalah (bukan karena 401)
    if (err.response && err.response.status !== 401) {
        error.value = 'Logout tidak sepenuhnya bersih, tetapi Anda sudah diarahkan ulang.';
    }
  }
}
</script>

<template>
  <div class="grid grid-cols-[1fr_10fr] gap-3">
    <div class="bg-gray-700 p-2 text-white h-screen">
      <div @click="changeActiveTab('home')" class="cursor-pointer" :class="activeTab === 'home' ? 'bg-rose-500' : ''"><router-link to="/">Home</router-link></div>
      <div @click="changeActiveTab('category')" class="cursor-pointer" :class="activeTab === 'category' ? 'bg-rose-500' : ''"><router-link to="/category">Category</router-link></div>
      <div @click="changeActiveTab('product')" class="cursor-pointer" :class="activeTab === 'product' ? 'bg-rose-500' : ''"><router-link to="/product">Product</router-link></div>
      <div @click="changeActiveTab('customer')" class="cursor-pointer" :class="activeTab === 'customer' ? 'bg-rose-500' : ''"><router-link to="/customer">Customer</router-link></div>
      <hr>
        <div class="p-2">{{ user.name }}</div>
        <button @click="logout" class="delete-button">Logout</button>
    </div>
    <main>
    <router-view/>
  </main>
  </div>


</template>
