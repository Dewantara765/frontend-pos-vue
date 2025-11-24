<script setup lang="ts">

defineProps<{
  modelValue: string;
  name: string;
  placeholder: string;
  text: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
 <div>
      <label :for="name" class="inline-block w-40 p-2">{{ text }}</label>
      <textarea
        :name="name"
        :id="name"
        :placeholder="placeholder"
        class="bg-gray-200 p-1"
        :value="modelValue"
        @input="updateValue"
        cols="40"
        rows="5"
      ></textarea>
    </div>
</template>
