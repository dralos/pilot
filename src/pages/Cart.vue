<template>
    <div>
        <div v-if="!productStore.loaded">
            <CartCardSkeleton v-for="n in 15" :key="n" />
        </div>
        <div v-else-if="!formattedCart.length">
            <h1 class="text-xl">{{ t('emptyCart') }}</h1>
        </div>
        <div v-else class="space-y-4">
            <CartCard v-for="(cartProduct, index) in formattedCart" :key="index" :cartProduct="cartProduct" />
            <div class="text-right text-2xl md:text-4xl">
                {{ total }}
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia'
import CartCard from '../components/CartCard.vue';
import CartCardSkeleton from '../components/CartCardSkeleton.vue';
import { useProductStore } from '../stores/product';
import { useCartStore } from '../stores/cart';
import { toCurrency } from '../utils/utils'
import { useGlobal } from '../utils/shared-globals'

const { t } = useGlobal()
const productStore = useProductStore()
const cartStore = useCartStore()
const { formattedCart } = storeToRefs(cartStore) 

const total = computed(()=> {
    return `${t('total')} : ${toCurrency(cartStore.total)}`
})


</script>