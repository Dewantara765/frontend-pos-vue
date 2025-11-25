<script setup lang="ts">
defineProps<{
  modelValue: string;
  name: string;
  text: string;
  options: string[]
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <div>
      <label :for="name" class="text-end inline-block w-40 p-2">{{ text }}</label>
      <select
        :name="name"
        :id="name"
        class="bg-gray-200 p-1"
        :value="modelValue"
        @input="updateValue"
      >
        <option value="">Pilih {{ text }}</option>
        <option v-for="(option, index) in options" :key="index" :value="option">
          {{ option }}
        </option>
      </select>
  </div>
</template>
