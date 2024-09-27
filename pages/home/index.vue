<template>
  <div class="p-4">
    <div>
      <Tabs value="Items">
        <TabList>
          <Tab value="Items" class="flex items-center gap-2">
            <i class="pi pi-list"></i>
            Items
          </Tab>
          <Tab value="Profile" class="flex items-center gap-2">
            <i class="pi pi-user"></i>
            Profile
          </Tab>
          <div class="ml-auto mr-8 flex items-center">
            <BasicButton label="Log out" icon="pi pi-sign-out" @click="onLogout" />
          </div>
        </TabList>
        <TabPanels class="mt-2">
          <TabPanel key="Items" value="Items" :class="['rounded-xl py-4 px-6']">
            <MainItemList />
          </TabPanel>
          <TabPanel key="Profile" value="Profile" :class="['rounded-xl py-4 px-6']">
            <MainProfile />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>
<script setup lang="ts">
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

definePageMeta({
  middleware: ['auth'],
});

const { logout } = useDirectusAuth();

const onLogout = async () => {
  await logout();
  navigateTo('/');
};
</script>
