<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <div class="shadow-xl rounded-xl bg-gray-50 bg-opacity-5 p-8 min-w-120">
      <form @submit="onSubmit">
        <h1 class="text-center text-2xl mb-4"> Login with your account </h1>
        <BasicInput class="mb-4" label="Email" placeholder="Enter email" name="email"></BasicInput>
        <BasicInput type="password" label="Password" placeholder="Enter password" name="password"></BasicInput>

        <div class="flex justify-end">
          <BasicButton type="submit" label="Login"></BasicButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as Yup from 'yup';
import { useAppStore } from '~/stores/app.store';
import { useToast } from 'primevue/usetoast';

definePageMeta({
  middleware: ['guest'],
});

const { login } = useDirectusAuth();
const appStore = useAppStore();
const toast = useToast();

const schema = Yup.object({
  email: Yup.string().email().label('Email').required(),
  password: Yup.string().label('Password').required(),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit(async (formData) => {
  appStore.startLoading();
  login({
    email: formData.email,
    password: formData.password,
  }).then(res => {
    appStore.stopLoading();
    toast.add({ severity: 'success', summary: 'Login succeed!', detail: 'You are successfully logged in.', life: 3000 });

    if (!!res.access_token && !!res.refresh_token) {
      window.sessionStorage.setItem('nuxt-access-token', res.access_token);
      window.sessionStorage.setItem('nuxt-refresh-token', res.refresh_token);

      navigateTo('/home');
    }
  }).catch(err => {
    console.log("err: ", err);
    appStore.stopLoading();
    toast.add({ severity: 'error', summary: 'Login failed!', detail: 'Invalid username or password!', life: 3000 });
  });
});
</script>
