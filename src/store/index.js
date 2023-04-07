import { createStore, createLogger  } from "vuex";
import { auth } from "./auth.module";

const debug = process.env.NODE_ENV !== 'production'

const store = createStore({
    modules: {
        auth,
    },
    plugins: debug ? [createLogger()] : []
});

export default store;