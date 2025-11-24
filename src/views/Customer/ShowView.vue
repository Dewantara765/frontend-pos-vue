<script setup lang="ts">
import api from '@/services/api';
import { on } from 'events';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const customerId = Number(route.params.id);
const fetchError = ref<string | null>(null);
interface Customer {
  id_customer: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}
const customer = ref<Customer | null>(null);

onMounted(async () => {
  try {
    const response = await api.get(`/customers/${customerId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    customer.value = response.data.data;
    document.title = `Detail ${customer.value.name} Customer - My App`;
  } catch (err : any) {
    fetchError.value = err.response?.data?.message || 'Failed to fetch customer details.';
    console.error('Failed to fetch customer details:', err);
  }
})
</script>

<template>
  <div class="container">
    <p class="title">Detail Data {{ customer?.name }}</p>
    <!-- Content for Customer Index goes here -->
    <div v-if="customer" class="border p-4 w-sm">
        <h2 class="font-bold text-xl">{{ customer.name }}</h2>
        <p class="border-y-2 border-gray-400"><b>Email:</b> {{ customer.email }}</p>
        <p class="border-b-2 border-gray-400"><b>No Telepon:</b> {{ customer.phone }}</p>
        <p class="border-b-2 border-gray-400"><b>Alamat:</b> {{ customer.address }}</p>
    </div>
  </div>
</template>
