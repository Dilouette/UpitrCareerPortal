import { defineStore } from "pinia";
import AccountService from "../service/account.service";
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
        experienceFetched: false,
        educationFetched: false,
    }),
    getters: {},
    actions: {
        fetchUserProfile() {
            AccountService.getProfile().then(response => {
                const { data } = response.data;
                this.userInfo = data;
            })
        },
        setUserInfo(payload) {
            this.userInfo = payload;
        },
        async fetchEducation() {
            try {
                this.fetchingEducation = true;
                const response = await EducationService.all();
                const { data } = response.data.data;
                this.education = data;
                this.fetchingEducation = false;
                this.educationFetched = true;
            } catch (error) {
                this.fetchingEducation = false;
            }
        },
        async fetchExperience() {
            try {
                this.fetchingExperience = true;
                const response = await ExperienceService.all();
                const { data } = response.data.data;
                this.experiences = data;
                this.fetchingExperience = false;
                this.experienceFetched = true;
            } catch (error) {
                this.fetchingExperience = false;
            }
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