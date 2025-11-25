<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter} from 'vue-router';
import NumberInput from '../components/NumberInput.vue';
import api from '@/services/api';
const route = useRoute();
const router = useRouter();
const transactionId = Number(route.params.id);
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
}

interface Product {
  id_product: number;
  name: string;
  price: number;
  stock: number;
}

const products = ref<Product[]>([]);
const product = ref<number | null>(null);
const quantity = ref<number>(1);
const price = ref<number | null>(null);
const subtotal = ref<number | null>(null);
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
    console.error('Error fetching transaction details:', error);
  }
};

const fetchProducts = async () => {
  try {
    const response = await api.get('/products', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    products.value = response.data.data;
  } catch (error : any) {
    console.error('Error fetching products:', error);
  }
};

const setPrice = () => {
  const selectedProduct = products.value.find(p => p.id_product === product.value);
  if (selectedProduct) {
    price.value = selectedProduct.price;
  } else {
    price.value = null;
  }
}

const setSubtotal = () => {
  if (price.value !== null) {
    subtotal.value = price.value * quantity.value;
  } else {
    subtotal.value = null;
  }
}
onMounted(() => {
  fetchTransaction();
  fetchProducts();
});

const submit = async () => {
  try {
    await api.post(`/transaction-details`, {
      transaction_id: transactionId,
      product_id: product.value,
      quantity: quantity.value,
      price: price.value,
      subtotal: subtotal.value
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    router.push(`/transaction/${transactionId}`);
  } catch (error : any) {
    console.error('Error adding transaction item:', error);
    alert('Gagal menambahkan item transaksi');
  }
};

</script>

<template>
  <div class="container">
    <p class="title">Tambah Item Transaksi</p>
    <form @submit.prevent="submit" class="flex flex-col gap-4 m-4 w-2xl ms-4">
    <div>
      <label for="transactionCode" class="text-end inline-block w-40 p-2">Kode Transaksi</label>
      <select name="transactionCode" id="transactionCode" class="bg-gray-200 p-1">
        <option :value="transactionId">{{ transaction?.transaction_code }}</option>
      </select>
    </div>

     <div>
      <label for="product" class="text-end inline-block w-40 p-2">Produk</label>
      <select v-model="product" name="product" class="bg-gray-200 p-1" @change="setPrice">
        <option value="">Pilih Produk</option>
        <option v-for="product in products" :key="product.id_product" :value="product.id_product">
          {{ product.name }}
        </option>
      </select>
    </div>

    <NumberInput
      v-model="quantity"
      name="quantity"
      placeholder="Jumlah"
      text="Jumlah"
      @change="setSubtotal"
    />

    <NumberInput
      v-model="price"
      name="price"
      placeholder="Harga"
      text="Harga"
    />

      <NumberInput
      v-model="subtotal"
      name="subtotal"
      placeholder="Subtotal"
      text="Subtotal"
    />

    <button class="bg-amber-400 p-1 col-span-2 flex justify-center" type="submit">Tambah Item Transaksi</button>

    </form>
  </div>
</template>
