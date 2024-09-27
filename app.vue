<template>
  <NuxtLayout>
    <NuxtPage />
    <div v-if="appStore.loading" class="fixed left-0 top-0 w-screen h-screen flex justify-center items-center">
      <ProgressSpinner />
    </div>
    <Toast />
  </NuxtLayout>
</template>
<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';
import Toast from 'primevue/toast';
import { useAppStore } from './stores/app.store';
import 'primeicons/primeicons.css'

const appStore = useAppStore();
</script>
