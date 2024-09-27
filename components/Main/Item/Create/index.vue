<template>
  <Dialog :visible="isOpen" :closable="false" modal class="w-96" header="Create New Item">
    <form @submit="onSubmit">
      <BasicInput class="mb-4" label="Name" placeholder="Enter name" name="name"></BasicInput>

      <BasicDatePicker label="Date" name="date"></BasicDatePicker>

      <BasicSwitch label="Important" name="important"></BasicSwitch>

      <div class="mt-4 flex justify-end gap-2">
        <BasicButton type="submit" label="Save" icon="pi pi-check"></BasicButton>
        <BasicButton type="button" label="Cancel" @click="onClose(false)" icon="pi pi-times"></BasicButton>
      </div>
    </form>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { useForm } from 'vee-validate';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { useAppStore } from '~/stores/app.store';
import { useToast } from 'primevue/usetoast';

const appStore = useAppStore();
const toast = useToast();
const { createItems } = useDirectusItems();

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const schema = Yup.object({
  name: Yup.string().label('Name').required(),
  date: Yup.string().label('Date').required(),
  important: Yup.boolean(),
});

const emit = defineEmits(['close']);

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const onClose = (value: boolean) => {
  emit('close', value);
}

const onSubmit = handleSubmit(async (formData, actions) => {
  appStore.startLoading();
  createItems({
    collection: 'items',
    items: {
      name: formData.name,
      date: dayjs(formData.date),
      important: formData.important,
    }
  }).then(() => {
    appStore.stopLoading();
    toast.add({ severity: 'success', summary: 'Item created!', detail: 'New item created successfully.', life: 3000 });

    actions.resetForm();
  
    emit('close', true);
  }).catch(err => {
    console.log("err: ", err);
    toast.add({ severity: 'error', summary: 'Something wrong!', detail: 'Failed to create new item.', life: 3000 });
    appStore.stopLoading();
  });
});
</script>
