<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';
import TextInput from '../components/TextInput.vue';
import EmailInput from '../components/EmailInput.vue';
import TextAreaInput from '../components/TextAreaInput.vue';
const name = ref<string>('');
const phone = ref<string>('');
const email = ref<string>('');
const address = ref<string>('');
const router = useRouter();
const pushError = ref<string | null>(null);

const submit = async () => {
  try {
    await api.post('/customers', {
      name: name.value,
      phone: phone.value,
      email: email.value,
      address: address.value
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    router.push('/customer');
  } catch (err: any) {
    console.error('Error creating customer:', err);
    pushError.value = err.response?.data?.message || 'Failed to create customer.';
  }
};
</script>

<template>
  <div class="container">
    <p class="title">Tambah Data Pembeli</p>
    <form @submit.prevent="submit"  class="flex flex-col gap-4 m-4 w-2xl ms-4">
    <TextInput
      v-model="name"
      name="name"
      placeholder="Nama Pembeli"
      text="Nama Pembeli"
    />

    <EmailInput
      v-model="email"
      name="email"
      placeholder="Email Pembeli"
      text="Email Pembeli"
    />
    <!-- <div v-if="validationErrors.name" class="text-red-500 text-sm">{{ validationErrors.name }}</div> -->

    <TextInput
      v-model="phone"
      name="phone"
      placeholder="Nomor Telepon"
      text="Nomor Telepon"
    />
    <!-- <div v-if="validationErrors.image" class="text-red-500 text-sm">{{ validationErrors.image }}</div> -->

      <TextAreaInput
      v-model="address"
      name="address"
      placeholder="Alamat Pembeli"
      text="Alamat Pembeli"
    />


    <button class="bg-amber-400 p-1 col-span-2 flex justify-center" type="submit">Tambah Pembeli</button>
  </form>
  </div>
</template>
