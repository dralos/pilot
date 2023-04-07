import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        async login({ commit }, user) {
            try {
                let loggedUser = await AuthService.login(user)
                commit('loginSuccess', loggedUser);
            } catch (error) {
                commit('loginFailure');
            }
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        },
        async register({ commit }, user) {
            try {
                let data = await AuthService.register(user);
                commit('registerSuccess');
                return data
            } catch (error) {
                commit('registerFailure');
                throw error
            }
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        }
    }
};