<template>
  <div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
    <div class="flex-none lg:hidden">
      <label for="drawer-input" class="btn btn-square btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </label>
    </div>
    <div class="flex-none px-2 mx-2">
      <span class="text-lg font-bold"> Shopping Cart</span>
    </div>
    <div class="flex-1 px-2 mx-2">
      <div class="items-stretch hidden lg:flex">
        <router-link
          class="btn btn-ghost btn-sm rounded-btn"
          :to="{ name: 'home', params: { locale } }"
        >
          <font-awesome-icon icon="home" /> {{ t("home") }}
        </router-link>
        <router-link
          v-if="showAdminBoard"
          :to="{ name: 'admin', params: { locale } }"
          class="nav-link"
        >
          {{ t("adminBoard") }}
        </router-link>
        <router-link
          v-if="showModeratorBoard"
          :to="{ name: 'moderator', params: { locale } }"
          class="nav-link"
        >
          {{ t("moderatorBoard") }}
        </router-link>
        <router-link
          v-if="currentUser"
          :to="{ name: 'user', params: { locale } }"
          class="nav-link"
        >
          {{ t("user") }}
        </router-link>

        <div v-if="!currentUser">
          <router-link
            :to="{ name: 'register', params: { locale } }"
            class="nav-link"
          >
            <font-awesome-icon icon="user-plus" /> {{ t("signUp") }}
          </router-link>
          <router-link
            :to="{ name: 'login', params: { locale } }"
            class="nav-link"
          >
            <font-awesome-icon icon="sign-in-alt" /> {{ t("login") }}
          </router-link>
        </div>

        <div v-if="currentUser" class="navbar-nav ml-auto">
          <router-link
            :to="{ name: 'profile', params: { locale } }"
            class="nav-link"
          >
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
          <a class="nav-link" @click.prevent="logout">
            <font-awesome-icon icon="sign-out-alt" /> {{ t("logout") }}
          </a>
        </div>
        <router-link
          class="btn btn-ghost btn-sm rounded-btn"
          :to="{ name: 'cart', params: { locale } }"
        >
          {{ t("cart") }}
          <div class="badge ml-2 badge-outline" v-text="count"></div>
        </router-link>
      </div>
    </div>
    <div class="flex-1 lg:flex-none">
      <Search />
    </div>

    <!-- move this to a separate component -->
    <form class="language">
      <label for="locale-select">{{ t("labels.language") }}</label>
      <select id="locale-select" v-model="currentLocale">
        <option
          v-for="optionLocale in supportLocales"
          :key="optionLocale"
          :value="optionLocale"
        >
          {{ optionLocale }}
        </option>
      </select>
    </form>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useCartStore } from "../stores/cart";
import { SUPPORT_LOCALES as supportLocales } from "../plugins/i18n";
import { useAuthStore } from "../stores/auth";
import { useGlobal } from "../utils/shared-globals";
import Search from "./SearchView.vue";

const { t, locale, router } = useGlobal();
const authStore = useAuthStore();
const cartStore = useCartStore();

// use this everytime you want to access computed getters
// otherwise the reactivity brakes
const { currentUser } = storeToRefs(authStore);
const { count } = storeToRefs(cartStore);
const currentLocale = ref(locale.value);

const showAdminBoard = computed(() => {
  if (currentUser.value && currentUser.value["roles"]) {
    return currentUser.value["roles"].includes("ROLE_ADMIN");
  }
  return false;
});

const showModeratorBoard = computed(() => {
  if (currentUser.value && currentUser.value["roles"]) {
    return currentUser.value["roles"].includes("ROLE_MODERATOR");
  }
  return false;
});

// sync to switch locale from router locale path
watch(router.currentRoute, (newRoute) => {
  currentLocale.value = newRoute.params.locale;
});

/**
 * when change the locale, go to locale route
 *
 * when the changes are detected, load the locale message and set the language via vue-router navigation guard.
 * change the vue-i18n locale too.
 */
watch(currentLocale, (newValue) => {
  router.push({
    name: router.currentRoute.value.name,
    params: { locale: newValue },
  });
});

const logout = async () => {
  await authStore.logout();
  router.push({ name: "login", params: { locale: currentLocale.value } });
};
</script>
