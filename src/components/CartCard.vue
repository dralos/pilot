
<template>
    <!-- <div>
        <figure class="p-8">
            <img :src="cartProduct.image" alt="Card Image">
        </figure>
        <div>
            <h2>
                <router-link :to="{ name: product, params: { locale, id: cartProduct.id } }">{{ cartProduct.title
                }}</router-link>
            </h2>
            <p>{{ toCurrency(cartProduct.cost) }}</p>
            <div>
                <div>
                    <button class="btn" @click="cartStore.remove(cartProduct.id)">-</button>
                    <button class="btn">{{ cartProduct.quantity }}</button>
                    <button class="btn" @click="cartStore.add(cartProduct.id)">+</button>
                </div>
            </div>
        </div>
                </div> -->

    <v-card :loading="loading" class="mx-auto my-12" max-width="374">
        <template v-slot:loader="{ isActive }">
            <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
        </template>

        <v-img cover height="250" :src="cartProduct.image" alt=""></v-img>

        <v-card-item>
            <v-card-title>{{ cartProduct.title }}</v-card-title>

            <v-card-subtitle>
                <span class="me-1">{{ cartProduct.category }}</span>

                <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
            </v-card-subtitle>
        </v-card-item>

       
            <v-rating :model-value="cartProduct.rating.rate" color="white" active-color="yellow-accent-4"
                half-increments hover size="18" readonly></v-rating>

            <div class="text-grey ms-4">
                {{ cartProduct.rating.rate }}  ({{ cartProduct.rating.count }})
            </div>

        <v-card-text>


            <div class="mx-0">{{ cartProduct.description }}</div>
        </v-card-text>

        <v-divider class="mx-4 mb-1"></v-divider>

        <v-card-actions>
            <v-chip-group>
                <v-chip>{{ cartProduct.quantity }}</v-chip>
                <v-chip>{{ toCurrency(cartProduct.price) }}</v-chip>
                <v-chip>{{ toCurrency(cartProduct.quantity * cartProduct.price) }}</v-chip>
            </v-chip-group>
            <v-btn color="deep-purple-lighten-2" variant="text" @click.prevent="cartStore.remove(cartProduct.id)">
                <v-icon color="green" icon="mdi-minus-circle-outline" ></v-icon>
            </v-btn> 
            <v-btn color="deep-purple-lighten-2" variant="text" @click.prevent="cartStore.add(cartProduct.id)">
                <v-icon color="green" icon="mdi-plus-circle-outline" ></v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { useCartStore } from '../stores/cart';
import { toCurrency } from '../utils/utils';
import { useGlobal } from '../utils/shared-globals';

const { locale } = useGlobal()
const cartStore = useCartStore()

const props = defineProps({
    cartProduct: Object
})

</script>