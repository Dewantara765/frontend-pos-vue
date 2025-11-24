<script setup lang="ts">
import api from '@/services/api';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const categoryId = Number(route.params.id);

const products = ref<Product[]>([]);

interface Product {
  id_product: number;
  name: string;
  image: string;
  price: number;
  // Tambahkan properti lain sesuai dengan struktur data produk Anda
}

onMounted(async () => {
  try {
    const response = await api.get(`/categories/${categoryId}/products`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    products.value = response.data.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
});

</script>

<template>
  <div class="container">
    <p class="title">Products in Category</p>
     <div class="flex gap-4">
         <div v-for="product in products" :key="product.id_product" class="card">
           <div class="card-title">{{ product.name }}</div>
           <img :src="product.image" :alt="product.name" class="w-full h-40 object-contain mb-2">
            <div class="mb-4">Price: {{ product.price }}</div>
         </div>
     </div>
 </div>
</template>
