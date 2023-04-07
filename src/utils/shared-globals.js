import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { computed, ref, onMounted } from "vue";

export const useGlobal = () => {
    const store = useStore()
    const router = useRouter()
    const { t, locale } = useI18n()
    const loading = ref(false)
    const successful = ref(false)
    const message = ref('')

    const loggedIn = computed(() => store.state.auth.status.loggedIn)
    const currentUser = computed(() => store.state.auth.user)

    return {
        store,
        router,
        t,
        locale,
        loading,
        successful,
        message,
        loggedIn,
        currentUser,
    }
}