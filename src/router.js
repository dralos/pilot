import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/HomePage.vue";
import Login from "./components/LoginView.vue";
import Register from "./components/RegisterView.vue";
import Cart from "./pages/CartPage.vue";
import Product from "./pages/ProductPage.vue";
import {
  SUPPORT_LOCALES,
  loadLocaleMessages,
  setI18nLanguage,
  getLocale,
} from "./plugins/i18n";
// lazy-loaded
const Profile = () => import("./components/ProfileView.vue");
const BoardAdmin = () => import("./components/BoardAdmin.vue");
const BoardModerator = () => import("./components/BoardModerator.vue");
const BoardUser = () => import("./components/BoardUser.vue");
const NotFound = () => import("./components/NotFound.vue");

export const setupRouter = (i18n) => {
  const locale = getLocale(i18n);

  const routes = [
    {
      path: "/:locale/",
      component: Home,
    },
    {
      path: "/:locale/home",
      name: "home",
      component: Home,
    },
    {
      path: "/:locale/login",
      name: "login",
      component: Login,
    },
    {
      path: "/:locale/register",
      name: "register",
      component: Register,
    },
    {
      path: "/:locale/cart",
      name: "cart",
      component: Cart,
    },
    {
      path: "/:locale/product",
      name: "product",
      component: Product,
    },
    {
      path: "/:locale/profile",
      name: "profile",
      // lazy-loaded
      component: Profile,
    },
    {
      path: "/:locale/admin",
      name: "admin",
      // lazy-loaded
      component: BoardAdmin,
    },
    {
      path: "/:locale/mod",
      name: "moderator",
      // lazy-loaded
      component: BoardModerator,
    },
    {
      path: "/:locale/user",
      name: "user",
      // lazy-loaded
      component: BoardUser,
    },
    {
      path: "/:pathMatch(.*)*",
      component: NotFound,
    },
  ];

  // create router instance
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  // navigation guards
  router.beforeEach(async (to, from, next) => {
    const paramsLocale = to.params.locale;
    const publicPages = [
      `/${paramsLocale}/login`,
      `/${paramsLocale}/register`,
      `/${paramsLocale}/home`,
      `${paramsLocale}`,
    ];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem("user");

    // use locale if paramsLocale is not in SUPPORT_LOCALES
    if (!SUPPORT_LOCALES.includes(paramsLocale)) {
      return next(`/${locale}`);
    }

    // load locale messages
    if (!i18n.global.availableLocales.includes(paramsLocale)) {
      await loadLocaleMessages(i18n, paramsLocale);
    }

    //set i18n language
    setI18nLanguage(i18n, paramsLocale);

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      next({ name: "login", params: { locale } });
    } else {
      next();
    }
  });

  return router;
};
