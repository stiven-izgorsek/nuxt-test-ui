<template>
  <div class="mb-4">
    <label class="mb-1 block">{{label}}</label>
    <InputText
      v-model="value"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      class="w-full"
    />
    <span v-if="errorMessage" class="text-xs text-red-500">{{errorMessage}}</span>
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import { useField } from 'vee-validate';

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: null,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  name: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
});

const { value, errorMessage } = useField<string>(() => props.name);

</script>
