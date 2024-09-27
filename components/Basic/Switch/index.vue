<template>
  <div class="flex items-center">
    <label class="mr-4">{{ label }}</label>
    <ToggleSwitch
      :name="name"
      v-model="value"
    />
  </div>
</template>

<script setup lang="ts">
import ToggleSwitch from 'primevue/toggleswitch';
import { useField } from 'vee-validate';

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  }
});

const { value } = useField<boolean>(() => props.name);
</script>
