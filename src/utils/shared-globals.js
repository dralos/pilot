import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { ref } from "vue";

export const useGlobal = () => {
    const router = useRouter()
    const { t, locale } = useI18n()
    const loading = ref(false)
    const successful = ref(false)
    const message = ref('')

    return {
        router,
        t,
        locale,
        loading,
        successful,
        message
    }
}