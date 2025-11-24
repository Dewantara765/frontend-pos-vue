<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';
import TextInput from '../components/TextInput.vue';
import FileInput from '../components/FileInput.vue';
import NumberInput from '../components/NumberInput.vue';

const name = ref<string>('');
const image = ref<File | null>(null);
const price = ref<number | null>(null);
const stock = ref<number | null>(null);
const categories = ref<Category[]>([]);
const category = ref<number | null>(null);
const router = useRouter();
const fetchError = ref<string | null>(null);

const validationErrors = ref<{[key: string]: string[]}>({});

interface Category {
  id_category: number;
  name: string;
  description: string;
}

onMounted(async() => {
  try {
    const response = await api.get('/categories', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    categories.value = response.data.data;
  } catch (err : any) {
    fetchError.value = err.message;
  }
})

const submit = async() => {
  const formData = new FormData();
  formData.append('name', name.value);
  if (image.value) {
    formData.append('image', image.value);
  }
  if (price.value !== null) {
    formData.append('price', price.value.toString());
  }
  if (stock.value !== null) {
    formData.append('stock', stock.value.toString());
  }
  if (category.value) {
    formData.append('category_id', category.value.toString());
  }
  try {
    await api.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    router.push('/product');
  } catch (err : any) {
    validationErrors.value = err.response.data;
  }
}

</script>

<template>
  <div class="container">
    <p class="title">Tambah Produk</p>
    <form @submit.prevent="submit"  class="flex flex-col gap-4 m-4 w-2xl ms-4">
    <TextInput
      v-model="name"
      name="name"
      placeholder="Nama Produk"
      text="Nama Produk"
    />

    <div v-if="validationErrors.name" class="text-red-500 text-sm">{{ validationErrors.name }}</div>

    <FileInput
      labelFor="image"
      text="Gambar Produk"
      v-model="image"
    />
    <div v-if="validationErrors.image" class="text-red-500 text-sm">{{ validationErrors.image }}</div>



    <NumberInput
      v-model="price"
      name="price"
      placeholder="Harga Produk"
      text="Harga Produk"
    />
    <div v-if="validationErrors.price" class="text-red-500 text-sm">{{ validationErrors.price }}</div>

    <NumberInput
      v-model="stock"
      name="stock"
      placeholder="Stok Produk"
      text="Stok Produk"
    />
    <div v-if="validationErrors.stock" class="text-red-500 text-sm">{{ validationErrors.stock }}</div>
    <div>
      <label for="category" class="text-end inline-block w-40 p-2">Kategori</label>
      <select v-model="category" name="category" class="bg-gray-200 p-1">
        <option value="">Pilih Kategori</option>
        <option v-for="category in categories" :key="category.id_category" :value="category.id_category">
          {{ category.name }}
        </option>
      </select>
    </div>
    <div v-if="validationErrors.category_id" class="text-red-500 text-sm">{{ validationErrors.category_id }}</div>

    <button class="bg-amber-400 p-1 col-span-2 flex justify-center" type="submit">Tambah Produk</button>
  </form>
  </div>
</template>
