<template>
  <div class="mb-4">
    <label class="mb-1 block">{{label}}</label>
    <Textarea
      v-model="value"
      :name="name"
      :placeholder="placeholder"
      :rows="rows"
      class="w-full"
    />
    <span v-if="errorMessage" class="text-xs text-red-500">{{errorMessage}}</span>
  </div>
</template>

<script setup lang="ts">
import Textarea from 'primevue/textarea';
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
  name: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
  rows: {
    type: Number,
    default: 4,
  }
});

const { value, errorMessage } = useField<string>(() => props.name);

</script>
