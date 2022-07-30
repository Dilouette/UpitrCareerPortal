import { defineStore } from "pinia";
import TokenService from "../service/token.service";

export const useAuthentication = defineStore({
    id: "authentication",
    state: () => ({
        userInfo: null,
        tokenInfo: null,
        isAuthenticated: false,
    }),
    getters: {},
    actions: {
        setAuthInfo(payload) {
            this.userInfo = payload.user;
            this.tokenInfo = payload.access;
            this.isAuthenticated = true;
            TokenService.saveToken(payload.access.token)
        },
        setUserInfo(payload) {
            this.userInfo = payload;
        },
        signOut() {
            this.userInfo = null;
            this.tokenInfo = null;
            this.isAuthenticated = false;
            TokenService.destroyToken();
        }
    },
    persist: true
})