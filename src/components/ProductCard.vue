<template>
    <!-- <div>
        <figure>
            <img :src="product.image" alt="Card Image" />
        </figure>
        <div>
            <h2>
                <router-link class="link link-hover" :to="{ name: 'product', params: { locale, id: product.id } }">{{
                    product.title }}</router-link>
            </h2>
            <p>{{ toCurrency(product.price) }}</p>
            <div class="justify-end card-actions">
                <button class="btn btn-primary" @click="cartStore.add(product.id)">{{ t('addToCart') }}</button>
            </div>
        </div>
    </div> -->

    <v-card :loading="loading" class="mx-auto my-12" max-width="374">
        <template v-slot:loader="{ isActive }">
            <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
        </template>

        <v-img cover height="250" :src="product.image" alt=""></v-img>

        <v-card-item>
            <v-card-title>{{ product.title }}</v-card-title>

            <v-card-subtitle>
                <span class="me-1">{{ product.category }}</span>

                <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
            </v-card-subtitle>
        </v-card-item>


        <v-rating :model-value="product.rating.rate" color="white" active-color="yellow-accent-4" half-increments hover
            size="18" readonly></v-rating>

        <div class="text-grey ms-4">
            {{ product.rating.rate }} ({{ product.rating.count }})
        </div>

        <v-card-text>


            <div class="mx-0">{{ product.description }}</div>
        </v-card-text>

        <v-divider class="mx-4 mb-1"></v-divider>

        <v-card-actions>
            <v-chip-group>
                <v-chip>{{ toCurrency(product.price) }}</v-chip>
            </v-chip-group>
            <v-btn color="deep-purple-lighten-2" variant="text" @click.prevent="add(product.id)">
                <v-icon color="green" icon="mdi-plus-circle-outline"></v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '../stores/cart';
import { toCurrency } from '../utils/utils';
import { useGlobal } from '../utils/shared-globals';

const { t, locale } = useGlobal()
const loading = ref(false)
const cartStore = useCartStore()

const props = defineProps({
    product: Object
})

const add = (productId) => {
    try {
        loading.value = true
        cartStore.add(productId)
        setTimeout(() => (loading.value = false), 2000)
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

</script>