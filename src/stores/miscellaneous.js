import { defineStore } from "pinia";
import MiscService from '../service/miscellaneous.service';

export const useMiscellaneous = defineStore({
    id: "miscellaneous",
    state: () => ({        
        countries: [],
        industries: [],
        currencies: [],
        designations: [],
        jobFunctions: [],
        questionTypes: [],
        activityTypes: [],
        employmentTypes: [],
        educationLevels: [],
        experienceLevels: [],
        activityRelations: [],
        activityImportance: [],
        degreeClassifications: [],
    }),
    getters: {
    },
    actions: {
        fetchCountries() {
            MiscService.getCountries().then(result => {
                this.countries = result.data.data;
            })
        },
        fetchIndustries() {
            MiscService.getIndustries().then(result => {
                this.industries = result.data.data;
            })
        },
        fetchCurrencies() {
            MiscService.getCurrencies().then(result => {
                this.currencies = result.data.data;
            })
        },
        fetchDesignations() {
            MiscService.getDesignations().then(result => {
                this.designations = result.data.data;
            })
        },
        fetchJobFunctions() {
            MiscService.getJobFunctions().then(result => {
                this.jobFunctions = result.data.data;
            })
        },
        fetchEmploymentTypes() {
            MiscService.getEmploymentTypes().then(result => {
                this.employmentTypes = result.data.data;
            })
        },
        fetchEducationLevels() {
            MiscService.getEducationLevels().then(result => {
                this.educationLevels = result.data.data;
            })
        },
        fetchExperienceLevels() {
            MiscService.getExperienceLevels().then(result => {
                this.experienceLevels = result.data.data;
            })
        },
        fetchQuestionTypes() {
            MiscService.getQuestionTypes().then(result => {
                this.questionTypes = result.data.data;
            })
        },
        fetchDegreeClassification() {
            MiscService.getDegreeClassifications().then(result => {
                this.degreeClassifications = result.data.data;
            })
        },
        fetchActivityImportance() {
            MiscService.getActivityImportance().then(result => {
                this.activityImportance = result.data.data;
            })
        },
        fetchActivityType() {
            MiscService.getActivityType().then(result => {
                this.activityTypes = result.data.data;
            })
        },
        fetchActivityRelations() {
            MiscService.getActivityRelations().then(result => {
                this.activityRelations = result.data.data;
            })
        }
    },
    persist: true
})