<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

const email = ref('')
const password = ref('')
const token = ref('')
const router = useRouter()
const error = ref('')


const login = async () => {
  try {
    const response = await api.post('/login', {
      email: email.value,
      password: password.value,
    });
    if (response.data.token) {
      token.value = response.data.token;
      localStorage.setItem('token', token.value);
    }
    router.push('/');
  } catch (err) {
    error.value = err;
  }
}
</script>

<template>

<div class="w-xl mx-auto bg-sky-200 p-2 m-4">

      <p class="text-center text-2xl font-semibold">Login</p>
      <form @submit.prevent="login" class="grid grid-rows-3 grid-cols-[1fr_2fr] gap-4 m-4">
        <label for="email" class="text-end">Email</label>
        <input type="email" name="email" id="email" placeholder="Email" class="bg-gray-200 p-1" v-model="email">
        <label for="password" class="text-end">Password</label>
        <input type="password" name="password" id="password" placeholder="Password" class="bg-gray-200 p-1"
        v-model="password">
        <button class="bg-amber-400 p-1 col-span-2 flex justify-center">Login</button>
      </form>
</div>
</template>
