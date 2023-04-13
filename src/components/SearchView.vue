<template>
  <div class="dropdown dropdown-end">
    <div class="form-control">
      <input
        v-model="input"
        type="text"
        :placeholder="t('search')"
        class="input input-ghost"
        :disabled="!productStore.loaded"
      />
    </div>
    <ul
      class="shadow menu dropdown-content bg-base-100 rounded-box w-64 text-base-content overflow-y-scroll"
      style="max-height: 50vh"
    >
      <li v-for="product in searchResults" :key="product.id">
        <a
          href="#"
          @click.prevent="navigate(product.id)"
          v-text="product.title"
        ></a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useProductStore } from "../stores/product";
import { useGlobal } from "../utils/shared-globals";

const { t } = useGlobal();
const productStore = useProductStore();
const input = ref("");

const searchResults = computed(() => {
  if (!input.value || input.value.length < 2) return [];
  return productStore.list.filter((item) => {
    return item.title.toLowerCase().includes(input.value.toLowerCase());
  });
});
const navigate = (id) => {
  input.value = "";
  alert(`/product/${id}`);
  //router.push(`/product/${id}`)
};
</script>
