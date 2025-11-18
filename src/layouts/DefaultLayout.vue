<script setup lang="ts">
import { onMounted } from 'vue';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const user = ref([])
const error = ref('')
const token = ref(localStorage.getItem('token'))
const router = useRouter()


onMounted(async () => {
  if (!token.value) {
    error.value = 'No token found'
    return;
  }
   error.value = ''
   user.value = ''
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/user', {
            headers: {
                Authorization: `Bearer ${token.value}`
            }
        });
        user.value = response.data;
    } catch (err) {
        console.error(err);
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
    await axios.post('http://127.0.0.1:8000/api/logout', {

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
    <div class="bg-red-500 p-2 text-white h-screen">
      <div>Home</div>
      <div>Products</div>
      <hr>
      <div class="flex gap-1">
        <div>{{ user.name }}</div>
        <button @click="logout" class="bg-amber-400 p-1">Logout</button>
      </div>

    </div>
    <main>
    <router-view/>
  </main>
  </div>


</template>
