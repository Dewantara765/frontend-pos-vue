<script setup lang="ts">
import api from '@/services/api';
import { ref, onMounted } from 'vue';

const categories = ref<Category[]>([]);

interface Category {
  id_category: number;
  name: string;
  description: string;
  // Tambahkan properti lain sesuai dengan struktur data kategori Anda
}
onMounted(async () => {
  try {
    const response = await api.get('/categories', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    categories.value = response.data.data;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
});

const deleteCategory = async(id: number) => {
  const confirmation = window.confirm('Are you sure you want to delete this category?');
  if (!confirmation) {
    return;
  }
  try {
    await api.delete(`/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    categories.value = categories.value.filter(category => category.id_category !== id);
  } catch (error) {
    console.error('Failed to delete category:', error);
  }
}

</script>

<template>
  <div class="container">
    <p class="title">Indeks Kategori</p>
    <button class="create-button"><router-link to="/category/create">Tambah Kategori</router-link></button>
      <div class="flex gap-4">
          <div v-for="category in categories" :key="category.id_category" class="card">
            <div class="card-title">{{ category.name }}</div>
            <div class="mb-4">{{ category.description }}</div>
            <div class="flex gap-2">
              <button class="view-button"><router-link :to="`/category/${category.id_category}/products`">View</router-link></button>
              <button class="edit-button"><router-link :to="`/category/${category.id_category}/edit`">Edit</router-link></button>
              <button @click="deleteCategory(category.id_category)" class="delete-button">Delete</button>
            </div>
          </div>
      </div>
  </div>
</template>
