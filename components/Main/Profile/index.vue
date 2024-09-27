<template>
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold">User details</h1>
  </div>
  <form @submit="onSubmit">
    <div class="flex flex-col gap-4">
      <BasicInput label="First name" name="first_name" />
      <BasicInput label="Last name" name="last_name" />
      <BasicInput label="Email Address" name="email" />
      <BasicInput label="Password" name="password" type="password" />
      <BasicTextarea label="Biography" name="description" :rows="5" />
    </div>

    <div class="mt-4 flex justify-end">
      <BasicButton type="submit" label="Save" icon="pi pi-save"></BasicButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import * as Yup from 'yup';
import { useForm } from 'vee-validate';
import { useAppStore } from '~/stores/app.store';
import { useToast } from 'primevue/usetoast';

const user = useDirectusUser();
const toast = useToast();
const appStore = useAppStore();
const { updateUser } = useDirectusUsers();

const schema = Yup.object({
  first_name: Yup.string().label('First name').required(),
  last_name: Yup.string(),
  email: Yup.string().email().label('Email').required(),
  password: Yup.string().label('Password').required(),
  description: Yup.string().label('Biography'),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    first_name: user.value?.first_name,
    last_name: user.value?.last_name,
    email: user.value?.email,
    password: '',
    description: user.value?.description || ''
  }
});

const onSubmit = handleSubmit(async (formData) => {
    if (!user.value?.id) return;
    appStore.startLoading();
    updateUser({
      id: user.value.id,
      user: formData
    }).then(() => {
      appStore.stopLoading();
      toast.add({ severity: 'success', summary: 'Profile updated!', detail: 'Updated your profile successfully', life: 3000 });
    }).catch(err => {
      console.log("err: ", err);
      toast.add({ severity: 'error', summary: 'Something wrong!', detail: 'Failed to update your profile', life: 3000 });
      appStore.stopLoading();
    });
});
</script>
