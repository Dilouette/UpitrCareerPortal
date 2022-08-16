import { defineStore } from "pinia";
import ProfileService from "../service/profile.service";
import EducationService from "../service/education.service";
import ExperienceService from "../service/experience.service";

export const useProfile = defineStore({
    id: "profile",
    state: () => ({
        userInfo: null,
        education: [],
        experiences: [],
        fetchingEducation: false,
        fetchingExperience: false,
    }),
    getters: {},
    actions: {
        fetchUserProfile() {
            ProfileService.getProfile().then(response => {
                const { data } = response.data;
                this.userInfo = data;
            })
        },
        setUserInfo(payload) {
            this.userInfo = payload;
        },
        fetchEducation() {
            this.fetchingEducation = true;
            EducationService.all().then(response => {
                const { data } = response.data.data;
                this.education = data;
            }).catch(() => {
                // log error
            }).finally(() => {
                this.fetchingEducation = false;
            })
        },
        fetchExperience() {
            this.fetchingExperience = true;
            ExperienceService.all().then(response => {
                const { data } = response.data.data;
                this.experiences = data;
            }).catch(() => {
                // log error
            }).finally(() => {
                this.fetchingExperience = false;
            })
        },
        updateEducation(payload) {
            this.education = payload;
        },
        updateExperience(payload) {
            this.experiences = payload;
        }
    },
    persist: true
})