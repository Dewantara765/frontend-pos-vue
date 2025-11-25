<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';
interface Transaction {
  id_transaction: number;
  transaction_code: string;
  // Tambahkan properti lain sesuai dengan struktur data transaksi Anda
}

const transactions = ref<Transaction[]>([]);


onMounted(async () => {
  try {
    const response = await api.get('/transactions', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    transactions.value = response.data.data;
  } catch (error : any) {
    console.error('Error fetching transactions:', error);
  }
});
</script>

<template>
  <div class="container">
    <p class="title">Indeks Transaksi</p>
    <button class="create-button"><router-link to="/transaction/create">Tambah Transaksi</router-link> </button>
    <table>
      <thead class="bg-gray-300">
        <tr>
          <th class="left-table-header">No</th>
          <th class="mid-table-header">Kode Transaksi</th>
          <th class="right-table-header">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(transaction, index) in transactions" :key="transaction.id_transaction" class="hover:bg-gray-100">
          <td class="left-table-header">{{ index + 1 }}</td>
          <td class="mid-table-header">{{ transaction.transaction_code }}</td>
          <td class="right-table-header">
            <router-link :to="`/transaction/${transaction.id_transaction}`" class="view-button">Detail</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
