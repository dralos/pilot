import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from './plugins/font-awesome'
import { setupRouter } from './router'
import { setupI18n } from './plugins/i18n'
import it from './locales/it.json'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

// i18n
const i18n = setupI18n({
  legacy: false,
  locale: 'it',
  fallbackLocale: 'it',
  messages: {
    it
  }
})

const router = setupRouter(i18n)

createApp(App)
    .use(vuetify)
    .use(store)
    .use(router)
    .use(i18n)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
