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
      <label :for="name" class="text-end inline-block w-40 p-2">{{ text }}</label>
      <input
        type="text"
        :name="name"
        :id="name"
        :placeholder="placeholder"
        class="bg-gray-200 p-1"
        :value="modelValue"
        @input="updateValue"
      />
    </div>
</template>
