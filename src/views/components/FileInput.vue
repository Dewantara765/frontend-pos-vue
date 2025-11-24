<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';
const props = defineProps<{
  labelFor: string;
  text: string;
  modelValue: File | null;
  imageUrl?: string;
}>();

const  emit = defineEmits<{
  (e: 'update:modelValue', value: File | null): void;
}>();

const previewUrl = ref<string | null>(null);

watch(
  () => props.modelValue,
  (file) => {
    if (file instanceof File) {
      previewUrl.value = URL.createObjectURL(file);
    } else {
      previewUrl.value = null;
    }
  },
  { immediate: true }

)

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0] ?? null

  emit('update:modelValue', file)

  if (file) {
    previewUrl.value = URL.createObjectURL(file)
  } else {
    previewUrl.value = null
  }
}

/** Cleanup URL agar tidak memory leak */
onUnmounted(() => {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
})


</script>

<template>
  <div>
      <label :for="labelFor" class="text-end inline-block w-40 p-2">{{ text }}</label>
      <input type="file" :name="labelFor" :id="labelFor" class="bg-gray-200 p-1" @change="onFileChange" />
      <div v-if="previewUrl" class="mt-3">
      <img
        :src="previewUrl"
        alt="Preview"
        class="h-20 rounded  object-cover"
      />
    </div>
    <div v-if="imageUrl" class="mt-3">
      <img
        :src="imageUrl"
        alt="Preview"
        class="h-20 rounded  object-cover"
      />
    </div>
    </div>
</template>
