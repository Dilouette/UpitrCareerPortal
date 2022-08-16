import { defineStore } from "pinia";
import MessageService from "../service/message.service";

export const useMessage = defineStore({
    id: "message",
    state: () => ({
        messages: null,
        loading: false,
    }),
    getters: {},
    actions: {
        fetchMessages() {
            this.loading = true;
            MessageService.all().then(response => {
                this.messages = response.data.data;
            }).catch(() => {})
            .finally(() => {
                this.loading = false
            })
        },
        fetchMessagesByUrl(url) {
            this.loading = true;
            MessageService.get(url).then(response => {
                this.messages = response.data.data;
            }).catch(() => {})
            .finally(() => {
                this.loading = false
            })
        }
    },
    persist: true
})