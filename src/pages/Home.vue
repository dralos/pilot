<template>
    <div class="ma-4">
        <div class="d-flex align-content-start flex-wrap">
            <ProductCardSkeleton v-show="!productStore.loaded" v-for="n in 15" :key="n" />
            <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import ProductCard from '../components/ProductCard.vue';
import ProductCardSkeleton from '../components/ProductCardSkeleton.vue';
import { useProductStore } from '../stores/product';
import { usePersistCart } from '../composables/usePersistCart';

const productStore = useProductStore();
const { list: products } = storeToRefs(productStore)
productStore.load()
onMounted(async () => {
    await productStore.load()
})
usePersistCart()

</script>