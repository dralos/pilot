import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@mdi/font/css/materialdesignicons.css"
import { FontAwesomeIcon } from './plugins/font-awesome'
import { setupRouter } from './router'
import { createPinia } from 'pinia';
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
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    defaultTheme: 'dark'
  }
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
    .use(i18n)
    .use(createPinia())
    .use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
