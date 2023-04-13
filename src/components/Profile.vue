<template>
    <div class="container">
        <header class="jumbotron">
            <h3>
                <strong>{{ currentUser?.username }}</strong> {{ t('profile') }}
            </h3>
        </header>
        <p>
            <strong>{{ t('token') }}:</strong>
            {{ currentUser?.accessToken.substring(0, 20) }} ... {{
                currentUser?.accessToken.substr(currentUser.accessToken.length
                    - 20) }}
        </p>
        <p>
            <strong>{{ t('id') }}:</strong>
            {{ currentUser?.id }}
        </p>
        <p>
            <strong>{{ t('email') }}:</strong>
            {{ currentUser?.email }}
        </p>
        <strong>{{ t('authorities') }}:</strong>
        <ul>
            <li v-for="role in currentUser?.roles" :key="role">{{ t(role) }}</li>
        </ul>
    </div>
</template>

<script setup>
import {  onMounted } from 'vue'
import { useGlobal } from '../utils/shared-globals'
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';

const { router, t, locale} = useGlobal()
const authStore = useAuthStore()
const { currentUser } = storeToRefs(authStore)

onMounted(() => {
    if (!currentUser.value) {
        router.push({ name: 'login', params: { locale: locale.value } });
    }
})

</script>