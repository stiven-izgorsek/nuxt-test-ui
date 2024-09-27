<template>
  <button
    class="focus:outline-none cursor-pointer px-6 py-2 bg-gray-900 hover:bg-gray-800 rounded text-white flex justify-center items-center gap-2"
    :type="type"
    :icon="icon"
    @click="handleClick"
  >
    <i v-if="icon" :class="icon"></i>
    {{label}}
  </button>
</template>

<script setup lang="ts">
import Button from 'primevue/button';

defineProps({
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String as PropType<'button' | 'submit'>,
    default: 'button',
  },
  icon: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click');
};
</script>
