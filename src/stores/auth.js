import { defineStore } from "pinia";
import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const useAuthStore = defineStore("AuthStore", {
  state: () => {
    return {
      user: user || null,
      status: {
        loggedIn: user ? true : false,
      },
    };
  },
  getters: {
    loggedIn() {
      return this.status.loggedIn;
    },
    currentUser() {
      return this.user;
    },
  },
  actions: {
    async login(user) {
      try {
        let loggedUser = await AuthService.login(user);
        this.user = loggedUser;
        this.status.loggedIn = true;
      } catch (error) {
        console.log(error);
        this.user = false;
        this.status.loggedIn = false;
      }
    },
    async logout() {
      try {
        await AuthService.logout();
        this.status.loggedIn = false;
        this.user = null;
      } catch (error) {
        console.log(error);
      }
    },
    async register(user) {
      try {
        let data = await AuthService.register(user);
        this.status.loggedIn = false;
        return data;
      } catch (error) {
        this.status.loggedIn = false;
        console.log(error);
      }
    },
  },
});
