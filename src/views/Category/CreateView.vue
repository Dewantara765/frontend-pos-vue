<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

const name = ref<string>('');
const description = ref<string>('');
const router = useRouter();
const validationErrors = ref<{[key: string]: string[]}>({});

const submit = async() => {
  try {
  await api.post('/categories', {
      name: name.value,
      description: description.value
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }

    });

    router.push('/category');;
  } catch (err) {
    if (err.response && err.response.status === 422) {
      validationErrors.value = err.response.data;
      return;
    }
    console.error('Failed to create category:', err.response.data);
  }
}

</script>

<template>
<div class="container">
  <p class="title">Create Category</p>
  <form @submit.prevent="submit" class="flex flex-col gap-4 m-4 w-2xl ms-4">
    <div>
      <label for="name" class="text-end inline-block w-40 p-2">Name</label>
      <input type="text" name="name" id="name" placeholder="Category Name" class="bg-gray-200 p-1" v-model="name">
    </div>
    <div v-if="validationErrors.name" class="text-red-500 text-sm">{{ validationErrors.name }}</div>
    <div>
      <label for="description" class="text-end inline-block w-40 p-2">Description</label>
      <textarea name="description" id="description" placeholder="Category Description" class="bg-gray-200 p-1" v-model="description"></textarea>
    </div>
    <div v-if="validationErrors.description" class="text-red-500 text-sm">{{ validationErrors.description }}</div>
    <button class="bg-amber-400 p-1 col-span-2 flex justify-center" type="submit">Create Category</button>
  </form>

</div>


</template>
