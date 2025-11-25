<script setup lang="ts">
import { ref, inject, onMounted} from 'vue';
import TextInput from '../components/TextInput.vue';
import DateInput from '../components/DateInput.vue';
import NumberInput from '../components/NumberInput.vue';
import SelectInput from '../components/SelectInput.vue';
import api from '@/services/api';
import { useRouter } from 'vue-router';

const transaction_code = ref<string>('');
const date = ref<string>('');
const total_amount = ref<number >(0);
const payment_method = ref<string>('');
const user = inject('user');
const user_id = user.value.id_user;
const customer = ref<number | null>(null);
const customers = ref<Customer[]>([]);
const router = useRouter();
interface Customer {
  id_customer: number;
  name: string;
  phone: string;
  email: string;
  address: string;
}
onMounted(async () => {
  try {
    const response = await api.get('/customers', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    customers.value = response.data.data;
  } catch (err: any) {
    console.error('Error fetching customers:', err);
  }
})

const submit = async () => {

  try {
    await api.post('/transactions', {
      transaction_code: transaction_code.value,
      date: date.value,
      total_amount: total_amount.value,
      payment_method: payment_method.value,
      user_id: user_id,
      customer_id: customer.value
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    router.push('/transaction');
  } catch (err: any) {
    console.error('Error creating transaction:', err);
  }
}
</script>

<template>
  <div class="container">
    <p class="title">Buat Transaksi Baru</p>
    <form @submit.prevent="submit" class="flex flex-col gap-4 m-4 w-2xl ms-4">
      <TextInput
      v-model="transaction_code"
      name="transactionCode"
      placeholder="Kode Transaksi"
      text="Kode Transaksi"/>

      <DateInput
      v-model="date"
      name="date"
      text="Tanggal"/>

      <NumberInput
      v-model="total_amount"
      name="totalAmount"
      placeholder="Total Harga"
      text="Total Harga"
      readonly
      />

      <SelectInput
      v-model="payment_method"
      name="paymentMethod"
      text="Pembayaran"
      :options="['Cash', 'Debit', 'Credit', 'Transfer', 'e-Wallet']"/>

      <TextInput
      v-model="user_id"
      name="userId"
      placeholder="ID User"
      text="ID User"
      readonly
      />

    <div>
      <label for="customer" class="text-end inline-block w-40 p-2">Pembeli</label>
      <select v-model="customer" name="customer" class="bg-gray-200 p-1">
        <option value="">Pilih Pembeli</option>
        <option v-for="customer in customers" :key="customer.id_customer" :value="customer.id_customer">
          {{ customer.name }}
        </option>
      </select>
    </div>

    <button class="bg-amber-400 p-1 col-span-2 flex justify-center" type="submit">Tambah Transaksi</button>

    </form>

  </div>
</template>
