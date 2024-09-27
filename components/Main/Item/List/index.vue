<template>
  <div>
    <div class="flex justify-between items-center mb-3">
      <h1 class="text-2xl font-bold">Items</h1>
      <BasicButton label="Create" icon="pi pi-plus-circle" @click="openNewDialog"></BasicButton>
    </div>
    <DataTable
      v-if="rows?.length"
      :value="rows"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
    >
      <Column v-for="column in columns" :field="column.field" :header="column.header"></Column>
    </DataTable>
    <div v-else class="flex justify-center items-center min-h-20">
      <div>No data available</div>
    </div>

    <MainItemCreate :is-open="isOpen" @close="onCloseDialog"></MainItemCreate>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const { getItems } = useDirectusItems();

const { data: items, refresh } = await useAsyncData<any>('items', () => {
  return getItems({
    collection: 'items'
  });
});

const columns = ref([
  {
    field: 'name',
    header: 'Name'
  },
  {
    field: 'date',
    header: 'Date'
  },
  {
    field: 'important',
    header: 'Important'
  }
]);

const rows = computed(() => items.value.map((item: any) => ({ ...item, date: formatDate(item.date), important: item.important ? 'Yes' : 'No' })))

const isOpen = ref(false);

const openNewDialog = () => {
  isOpen.value = true;
};
const onCloseDialog = (value: boolean) => {
  isOpen.value = false;

  if (value) {
    refresh();
  }
}

const formatDate = (date: Date) => {
  return dayjs(date).format('DD/MM/YYYY')
}
</script>
