<template>
  <div class="mb-4">
    <label class="mb-1 block">{{ label }}</label>
     <DatePicker class="w-full" v-model="dateValue" @update:model-value="onUpdate" placeholder="Select date" />
    <span v-if="errorMessage" class="text-xs text-red-500">{{errorMessage}}</span>
  </div>
</template>

<script setup lang="ts">
import DatePicker from 'primevue/datepicker';
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

const dateValue = ref<string>('');

const { setValue, errorMessage } = useField<string>(() => props.name);

const onUpdate = () => {
  setValue(dateValue.value);
}
</script>
