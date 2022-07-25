import { defineStore } from "pinia";

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    pageName: "",
    pageTitle: "",
  }),
  getters: {
    getPageName: (state) => state.pageName,
    getPageTitle: (state) => state.pageTitle,
  },
  actions: {
    setPageTitle(value) {
      this.pageTitle = value;
    },

    setPageName(value) {
      this.pageName = value;
    }
  },
});
