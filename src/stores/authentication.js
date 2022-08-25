import { defineStore } from "pinia";
import TokenService from "../service/token.service";
import AccountService from "../service/account.service";

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
            TokenService.saveToken(payload.access.token);
        },
        fetchUserProile() {
            AccountService.getProfile().then(response => {
                const { data } = response.data;
                this.userInfo = data;
            })
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