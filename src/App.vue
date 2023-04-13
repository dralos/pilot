<template>
  <div>
    <!-- <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" class="navbar-brand">Logo</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link">
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
          <a class="nav-link" @click.prevent="logout">
            <font-awesome-icon icon="sign-out-alt" /> {{ t('logout') }}
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
    </nav> -->
    <Nav></Nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Nav from './components/nav.vue';
import { ref } from 'vue';
const  links = ref([
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ])

// const {t, locale, router} = useGlobal()
// const authStore = useAuthStore()
// use this everytime you want to access computed getters
// otherwise the reactivity brakes

// const currentLocale = ref(locale.value)



// // sync to switch locale from router locale path
// watch(router.currentRoute, (newRoute, prevRoute) => {
//   currentLocale.value = newRoute.params.locale
// })

// /**
//  * when change the locale, go to locale route
//  *
//  * when the changes are detected, load the locale message and set the language via vue-router navigation guard.
//  * change the vue-i18n locale too.
//  */
// watch(currentLocale, (newValue, oldValue) => {
//   router.push({
//     name: router.currentRoute.value.name,
//     params: { locale: newValue }
//   })
// })

// const logout = async () => {
//   await authStore.logout()
//   router.push({ name: 'login', params: { locale: currentLocale.value } });
// }

</script>