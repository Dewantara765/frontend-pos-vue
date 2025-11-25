<script setup lang="ts">
import { onMounted } from 'vue';
import api from '@/services/api';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { formatPrice} from '@/composables/formatPrice';
import { formatDate } from '@/composables/formatDate';

const route = useRoute();
const transactionId = Number(route.params.id);
const items = ref<TransactionDetail[]>([]);
const fetchError = ref<string | null>(null);
interface Transaction {
  id_transaction: number;
  transaction_code: string;
  customer: {
    id_customer: number;
    name: string;
  };
  date: string;
  total_amount: number;
  payment_method: string;

  // Tambahkan properti lain sesuai dengan struktur data transaksi Anda
}

interface TransactionDetail {
  id_detail: number;
  transaction: Transaction;
  product: {
    id_product: number;
    name: string;
  };
  quantity: number;
  price: number;
  subtotal: number;
}
const transaction = ref<Transaction | null>(null);

const fetchTransaction = async () => {
  try {
    const response = await api.get(`/transactions/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    transaction.value = response.data.data;
  } catch (error : any) {
    fetchError.value = 'Error fetching transaction details';
    console.error(fetchError.value, error);
  }
};

const fetchDetails = async () => {
  try {
    const response = await api.get(`/transactions/${transactionId}/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    items.value = response.data.data;
  } catch (error : any) {
    fetchError.value = 'Error fetching transaction details';
    console.error(fetchError.value, error);
  }
}

onMounted(() => {
  fetchTransaction();
  fetchDetails();
});
</script>

<template>
  <div class="container">
    <p class="title">Detail Transaksi</p>
    <div v-if="transaction" class="border p-4 w-2xl">
        <h2 class="font-bold text-xl">{{ transaction.transaction_code }}</h2>
        <button class="mt-2 mb-4 bg-blue-500 text-white px-4 py-2 rounded">
          <router-link :to="`/transaction/${transaction.id_transaction}/add`">Tambah Item Transaksi</router-link>
        </button>
        <div class="border-y-2 border-gray-400 p-4"><b>Item Transaksi:</b>
          <div v-if="items">
          <table>
            <thead>
              <tr>
                <th class="left-table-header">No</th>
                <th class="mid-table-header">Produk</th>
                <th class="mid-table-header">Jumlah</th>
                <th class="mid-table-header">Harga</th>
                <th class="right-table-header">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.id_detail">
                <td class="left-table-header">{{ item.id_detail }}</td>
                <td class="mid-table-header">{{ item.product.name }}</td>
                <td class="mid-table-header">{{ item.quantity }}</td>
                <td class="mid-table-header">{{ formatPrice(item.price) }}</td>
                <td class="right-table-header">{{ formatPrice(item.subtotal) }} </td>
              </tr>
            </tbody>
          </table>
          </div>

        </div>
        <p class="border-y-2 border-gray-400 p-4"><b>Pembeli:</b> {{ transaction.customer.name }}</p>
        <p class="border-y-2 border-gray-400 p-4"><b>Tanggal:</b> {{ formatDate(transaction.date) }}</p>
        <p class="border-b-2 border-gray-400 p-4"><b>Total:</b> {{ formatPrice(transaction.total_amount) }}</p>
        <p class="border-b-2 border-gray-400 p-4"><b>Metode Pembayaran:</b> {{ transaction.payment_method }}</p>
    </div>
  </div>
</template>
