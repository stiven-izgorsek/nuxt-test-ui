import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', {
  state: () => ({
    loading: false,
  }),

  actions: {
    startLoading() {
      this.loading = true;
    },
    stopLoading() {
      this.loading = false;
    }
  },
});
