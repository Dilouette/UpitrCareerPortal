import { defineStore } from "pinia";

export const useSignup = defineStore({
    id: "signup",
    state: () => ({
        candidate: null,
    }),
    getters: {},
    actions: {
        setSignupUser(data) {
            this.candidate = data;
        },
    },
    persist: true
})