<template>
    <div class="container">
        <header class="jumbotron">
            <h3>{{ content }}</h3>
        </header>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import UserService from "../services/user.service";

const content = ref("")

onMounted(async () => {
    try {
        let response = await UserService.getModeratorBoard();
        content.value = response.data
    } catch (error) {
        content.value = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
    }
})
</script>