import { defineStore } from "pinia";

export const useAssessment = defineStore({
    id: "assessment",
    state: () => ({
        assessmentInfo: {
            id: 0,
            total: 0,
            duration: 0,
        }
    }),
    getters: {},
    actions: {
        updateAssessment(payload) {
            this.assessmentInfo = payload;
        }
    },
    persist: true
})