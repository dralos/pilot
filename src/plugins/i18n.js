// Lazy loading the internationalization
// source: https://vue-i18n.intlify.dev/guide/advanced/lazy.html
import { nextTick, isRef } from "vue"; 
import { createI18n } from "vue-i18n";

const isComposer = (instance, mode) => {
    return mode === 'composition' && isRef(instance.locale)
}

export const getLocale = (i18n) => {
    if(isComposer(i18n.global, i18n.mode)){
        return i18n.global.locale.value 
    } else {
        return i18n.global.locale
    }
}

export const SUPPORT_LOCALES = ['en', 'it']

export const setupI18n = (options = { locale: 'en'}) => {
    const i18n = createI18n(options)
    setI18nLanguage(i18n, options.locale)
    return i18n
}

export const setLocale = (i18n, locale) => {
    if(isComposer(i18n.global, i18n.mode)){
        i18n.global.locale.value = locale
    } else {
        i18n.global.locale = locale
    }
}


export const setI18nLanguage = (i18n, locale) => {
    setLocale(i18n, locale)

    /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */

    document.querySelector('html').setAttribute('lang', locale)
}

export const loadLocaleMessages = async (i18n, locale) => {
    // load locale messages with dynamic import
    const messages = await import(/* webpackChunkName: "lang-[request]" */ `../locales/${locale}.json`)

    // set locale and locale message
    i18n.global.setLocaleMessage(locale, messages.default)
    return nextTick()
}
