import { defineStore } from "pinia";
import FakeStoreService from "../services/fakestore.service";

export const useProductStore = defineStore("ProductStore", {
  state: () => {
    return {
      items: [],
      ids: [],
      filters: {
        limit: 5,
        sort: "desc",
      },
    };
  },
  getters: {
    loaded() {
      return this.items.length > 0;
    },
    list() {
      return this.ids.map((id) => this.items[id]);
    },
  },
  actions: {
    async load() {
      try {
        // if we loaded the data there is no reasson to load it again
        if (this.loaded) return;
        const data = await FakeStoreService.getProducts();
        this.ids = data.map((product) => {
          this.items[product.id] = product;
          return product.id;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
