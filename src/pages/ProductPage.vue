<template>
  <div>
    <div v-if="!productStore.loaded">
      <CartCardSkeleton />
    </div>
    <div v-else-if="product">
      <figure class="px-10 pt-10">
        <img :src="product.image" alt="Card Image" />
      </figure>
      <div>
        <h2 v-text="product.title"></h2>
        <p v-text="product.description"></p>
        <p>{{ toCurrency(product.price) }}</p>
        <div>
          <button class="btn" @click="cartStore.add(product.id)">
            {{ t("addToCart") }}
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="text-xl text-error">
        No product found with id {{ route.params.productId }}
      </h1>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "../stores/cart";
import { useProductStore } from "../stores/product";
import { toCurrency } from "../utils/utils";
import CartCardSkeleton from "../components/CartCardSkeleton.vue";
const cartStore = useCartStore();
const productStore = useProductStore();
const route = useRoute();
const product = computed(() => productStore.items[route.params.productId]);
</script>
