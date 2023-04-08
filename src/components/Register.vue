<template>
    <div class="col-md-12">
        <div class="card card-container">
            <img id="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" class="profile-img-card" />
            <Form @submit="handleRegister" :validation-schema="schema">
                <div v-if="!successful">
                    <div class="form-group">
                        <label for="username">{{ t('username') }}</label>
                        <Field name="username" type="text" class="form-control" />
                        <ErrorMessage name="username" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="email">{{ t('email') }}</label>
                        <Field name="email" type="email" class="form-control" />
                        <ErrorMessage name="email" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="password">{{ t('password') }}</label>
                        <Field name="password" type="password" class="form-control" />
                        <ErrorMessage name="password" class="error-feedback" />
                    </div>

                    <div class="form-group">
                        <button class="btn btn-primary btn-block" :disabled="loading">
                            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                            {{ t('signUp') }}
                        </button>
                    </div>
                </div>
            </Form>

            <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
                {{ message }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { onMounted } from "vue";
import * as yup from "yup";
import { useGlobal } from "../utils/shared-globals";
import { useAuthStore } from "../stores/authStore";
import { storeToRefs } from "pinia";


const authStore = useAuthStore()
const { loggedIn } = storeToRefs(authStore)
const { router, t, locale, successful, loading, message } = useGlobal()

const schema = yup.object().shape({
    username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
    email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
    password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
});

onMounted(() => {
    if (loggedIn.value) {
        router.push({ name: 'profile', params: { locale: locale.value } })
    }
})

const handleRegister = async (user) => {
    try {
        message.value = ""
        successful.value = false
        loading.value = true
        let { data } = await authStore.register(user)
        message.value = data.message
        successful.value = true
    } catch (error) {
        message.value = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        successful.value = false
    } finally {
        loading.value = false
    }
}

</script>

<style scoped></style>