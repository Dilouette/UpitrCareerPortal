<script setup>
import { onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useMessage } from "./stores/message";
import { useProfile } from "./stores/profile";
import { useMiscellaneous } from "./stores/miscellaneous";
import { useAuthentication } from "./stores/authentication";

const messageStore = useMessage();
const profileStore = useProfile();
const miscStore = useMiscellaneous();
const { isAuthenticated } = storeToRefs(useAuthentication());

function fetchGeneralData () {
    miscStore.fetchCountries();
    miscStore.fetchCurrencies();
    miscStore.fetchIndustries();
    miscStore.fetchDesignations();
    miscStore.fetchJobFunctions();
    miscStore.fetchActivityType();
    miscStore.fetchQuestionTypes();
    miscStore.fetchEmploymentTypes();
    miscStore.fetchEducationLevels();
    miscStore.fetchExperienceLevels();
    miscStore.fetchActivityRelations();
    miscStore.fetchActivityImportance();
    miscStore.fetchDegreeClassification();

    profileStore.fetchEducation();
    profileStore.fetchExperience();
    messageStore.fetchMessages();
}

onMounted(() => {
  try {
    if (isAuthenticated.value) {
      fetchGeneralData();
    }
  } catch (error) {
    console.log(error);
  }
})

watch(() => isAuthenticated.value, (value) => {
  if (value) {
    fetchGeneralData();
  }
});

</script>

<template>
  <RouterView />
</template>

<style>
@import "@/assets/base.css";
</style>
