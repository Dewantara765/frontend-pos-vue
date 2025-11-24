<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '@/services/api';
import TextInput from '../components/TextInput.vue';
import EmailInput from '../components/EmailInput.vue';
import TextAreaInput from '../components/TextAreaInput.vue';
import { on } from 'events';
const name = ref<string>('');
const phone = ref<string>('');
const email = ref<string>('');
const address = ref<string>('');
const router = useRouter();
const route = useRoute();
const customerId = route.params.id as string;
const updateError = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await api.get(`/customers/${customerId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const customer = response.data.data;
    name.value = customer.name;
    phone.value = customer.phone;
    email.value = customer.email;
    address.value = customer.address;
    document.title = `Edit ${customer.name} Customer - My App`;
  } catch (err: any) {
    console.error('Error fetching customer data:', err);
    updateError.value = err.response?.data?.message || 'Failed to fetch customer data.';
  }
});

const submit = async () => {
  try {
    await api.post(`/customers/${customerId}`, {
      name: name.value,
      phone: phone.value,
      email: email.value,
      address: address.value,
      _method: 'PUT'
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    router.push(`/customer/${customerId}`);
  } catch (err: any) {
    console.error('Error updating customer:', err);
    updateError.value = err.response?.data?.message || 'Failed to update customer.';
  }
};
</script>

<template>
  <div class="container">
    <p class="title">Ubah Data Pembeli</p>
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


    <button class="bg-amber-400 p-1 col-span-2 flex justify-center" type="submit">Ubah Data Pembeli</button>
  </form>
  </div>
</template>
