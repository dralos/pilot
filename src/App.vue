<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" class="navbar-brand">NavBar</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'home', params: { locale } }" class="nav-link">
            <font-awesome-icon icon="home" /> {{ t('home') }}
          </router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link :to="{ name: 'admin', params: { locale } }" class="nav-link">
            {{ t('adminBoard') }}
          </router-link>
        </li>
        <li v-if="showModeratorBoard" class="nav-item">
          <router-link :to="{ name: 'moderator', params: { locale } }" class="nav-link">
            {{ t('moderatorBoard') }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" :to="{ name: 'user', params: { locale } }" class="nav-link">
            {{ t('user') }}
          </router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'register', params: { locale } }" class="nav-link">
            <font-awesome-icon icon="user-plus" /> {{ t('signUp') }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'login', params: { locale } }" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> {{ t('login') }}
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'profile', params: { locale } }" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> {{ t('logOut') }}
          </a>
        </li>
      </div>
      <div>
        <ol>
          <li>
            <form class="language">
              <label for="locale-select">{{ t('labels.language') }}</label>
              <select id="locale-select" v-model="currentLocale">
                <option v-for="optionLocale in supportLocales" :key="optionLocale" :value="optionLocale">
                  {{ optionLocale }}
                </option>
              </select>
            </form>
          </li>
        </ol>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { watch, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { SUPPORT_LOCALES as supportLocales } from './plugins/i18n';
import { useStore } from 'vuex'


const router = useRouter()
const store = useStore()
const { t, locale } = useI18n() // same as `useI18n({ useScope: 'global' })`

const currentLocale = ref(locale.value)

const currentUser = computed(() => store.state.auth.user)

const showAdminBoard = computed(() => {
  if (currentUser.value && currentUser.value['roles']) {
    return currentUser.value['roles'].includes('ROLE_ADMIN');
  }
  return false;
})

const showModeratorBoard = computed(() => {
  if (currentUser.value && currentUser.value['roles']) {
    return currentUser.value['roles'].includes('ROLE_MODERATOR')
  }
  return false;
})

// sync to switch locale from router locale path
watch(router.currentRoute, (newRoute, prevRoute) => {
  currentLocale.value = newRoute.params.locale
})

/**
 * when change the locale, go to locale route
 *
 * when the changes are detected, load the locale message and set the language via vue-router navigation guard.
 * change the vue-i18n locale too.
 */
watch(currentLocale, (newValue, oldValue) => {
  router.push({
    name: router.currentRoute.value.name,
    params: { locale: newValue }
  })
})

const logOut = () => {
  store.dispatch('auth/logout');
  router.push({ name: 'login', params: { locale: currentLocale.value } });
}

</script>