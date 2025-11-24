<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/services/api';
interface Customer {
  id_customer: number;
  name: string;

  // Tambahkan properti lain sesuai dengan struktur data customer Anda
}

const customers = ref<Customer[]>([]);
const fetchError = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await api.get('/customers', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    customers.value = response.data.data;
  } catch (error : any) {
    fetchError.value = error.response?.data?.message || 'Failed to fetch customers.';
    console.error('Error fetching customers:', error);
  }
});

const deleteCustomer = async (customerId: number) => {
  const confirmation = window.confirm('Anda yakin ingin menghapus data pembeli ini?');
  if (!confirmation) {
    return;
  }
  try {
    await api.delete(`/customers/${customerId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    customers.value = customers.value.filter(c => c.id_customer !== customerId);
  } catch (error : any) {
    console.error('Error deleting customer:', error);
  }
}

</script>

<template>
  <div class="container">
    <p class="title">Indeks Pembeli</p>
    <button class="create-button">
      <router-link to="/customer/create">Tambah Pembeli</router-link>
    </button>
    <table>
      <thead class="bg-gray-300">
        <tr>
          <th class="left-table-header">No</th>
          <th class="mid-table-header">Nama</th>
          <th class="right-table-header">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.id_customer">
          <td class="left-table-header">{{ customer.id_customer }}</td>
          <td class="mid-table-header">{{ customer.name }}</td>
          <td class="right-table-header gap-2 flex">
            <router-link :to="`/customer/${customer.id_customer}`" class="view-button">Detail</router-link>
            <router-link :to="`/customer/${customer.id_customer}/edit`" class="edit-button">Ubah</router-link>
            <button @click="deleteCustomer(customer.id_customer)" class="delete-button">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
