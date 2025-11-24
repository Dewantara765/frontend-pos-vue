<script setup lang="ts">

defineProps<{
  modelValue: number | null;
  name: string;
  placeholder: string;
  text: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', Number(target.value));
};
</script>

<template>
 <div>
      <label :for="name" class="text-end inline-block w-40 p-2">{{ text }}</label>
      <input
        type="number"
        :name="name"
        :id="name"
        :placeholder="placeholder"
        class="bg-gray-200 p-1"
        :value="modelValue"
        @input="updateValue"
        min="0"
      />
    </div>
</template>
