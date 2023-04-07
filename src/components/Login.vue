<template>
    <div class="col-md-12">
        <div class="card card-container">
            <img id="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" class="profile-img-card" />
            <Form @submit="handleLogin" :validation-schema="schema">
                <div class="form-group">
                    <label for="username">{{ t('username') }}</label>
                    <Field name="username" type="text" class="form-control" />
                    <ErrorMessage name="username" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="password">{{ t('password') }}</label>
                    <Field name="password" type="password" class="form-control" />
                    <ErrorMessage name="password" class="error-feedback" />
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block" :disabled="loading">
                        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                        <span>{{ t('login') }}</span>
                    </button>
                </div>

                <div class="form-group">
                    <div v-if="message" class="alert alert-danger" role="alert">
                        {{ message }}
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { onMounted, } from 'vue'
import { useGlobal } from '../utils/shared-globals'

const { loading, message, store, loggedIn, t, router, locale } = useGlobal()

const schema = yup.object().shape({
    username: yup.string().required("Username is required!"),
    password: yup.string().required("Password is required!"),
});


onMounted(() => {
    if (loggedIn.value) {
        router.push({ name: 'profile', params: { locale: locale.value } })
    }
})

const handleLogin = async (user) => {
    try {
        loading.value = true
        await store.dispatch('auth/login', user);
        router.push({ name: 'profile', params: { locale: locale.value } })
    } catch (error) {
        loading.value = false
        message.value = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
    } finally {
        loading.value = false
    }
}


</script>

<style scoped></style>