<script setup lang="ts">
import api from '@/services/api';
import { ref, onMounted } from 'vue';

interface Product {
  id_product: number;
  name: string;
  image: string;
  price: number;
  stock: number;
}
const products = ref<Product[]>([]);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await api.get('/products', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    products.value = response.data.data;
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to fetch products.';
  }
});

const deleteProduct = async(id: number) => {
  const confirmation = window.confirm('Are you sure you want to delete this product?');
  if (!confirmation) {
    return;
  }
  try {
    await api.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    products.value = products.value.filter(product => product.id_product !== id);
  } catch (error) {
    console.error('Failed to delete product:', error);
  }
}
</script>

<template>
  <div class="container">
    <p class="title">Product Index</p>
    <div v-if="error" class="text-red-500">{{ error }}</div>
    <button class="create-button"><router-link to="/product/create">Tambah</router-link></button>
    <div class="flex gap-4">
      <div v-for="product in products" :key="product.id_product" class="border p-4 w-60">
        <img :src="product.image" :alt="product.name" class="w-full h-40 object-contain mb-2">
        <h2 class="font-bold text-lg">{{ product.name }}</h2>
        <p>Price: {{ product.price }}</p>
        <p>Stock: {{ product.stock }}</p>
        <div class="mt-2 gap-2 flex">
          <button class="edit-button"><router-link :to="`/product/${product.id_product}/edit`">Edit</router-link></button>
          <button @click="deleteProduct(product.id_product)" class="delete-button">Delete</button>
      </div>
      <div v-if="products.length === 0">Tidak ada produk...</div>
    </div>

    </div>
  </div>
</template>
