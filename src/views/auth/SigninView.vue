
<template>
  <div class="flex flex-col justify-center min-h-full py-16 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img src="../../assets/images/logo.png" class="w-3/6 mx-auto">
      <!-- <svg class="w-16 h-16 mx-auto text-indigo-300 shrink-0" viewBox="0 0 24 24"><path class="text-indigo-200 fill-current" d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"></path><path class="text-indigo-400 fill-current" d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"></path></svg> -->
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" v-on:submit.prevent>
          <h2 class="text-3xl font-extrabold text-center text-gray-900 mb-8">Sign In</h2>          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
            <div class="mt-1">
              <input 
              id="email" 
              name="email" 
              type="email"  
              v-model="signinForm.email"
              class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
            <div class="mt-1">
              <input 
              id="password" 
              name="password" 
              type="password" 
              v-model="signinForm.password"
              class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input 
                id="remember-me" 
                name="remember-me" 
                type="checkbox" 
                v-model="signinForm.remember_me"
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              <label for="remember-me" class="block ml-2 text-sm text-gray-900"> Remember me </label>
            </div>

            <div class="text-sm">
              <a href="forgot-password" class="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
            </div>
          </div>

          <div>
            <app-button
              @click="signin"
              :processing="loading"
              class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >Sign In</app-button>
            <p class="text-xs text-center text-gray-600 mt-6">
              Don't have an account yet?
              {{ ' ' }}
              <a href="/signup" class="font-medium text-indigo-600 hover:text-indigo-500"> Signup Here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { required, email } from '@vuelidate/validators';
import LogRocket from 'logrocket';
import useVuelidate from '@vuelidate/core';
import { useMessage } from "../../stores/message";
import { useProfile } from "../../stores/profile";
import { useMiscellaneous } from "../../stores/miscellaneous";
import { useAuthentication } from "../../stores/authentication";
import AuthService from "../../service/authentication.service";

const messageStore = useMessage();
const profileStore = useProfile();
const miscStore = useMiscellaneous();

const signinForm = ref({
  email: '',
  password: '',
  remember_me: false,
})

const loading = ref(false);

const rules = {
  email: { required, email },
  password: { required }
}

const toast = useToast();
const router = useRouter();
const v$ = useVuelidate(rules, signinForm)

const { setAuthInfo } = useAuthentication();

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

async function signin() {
  const valid = await v$.value.$validate();

  if (valid) {
    loading.value = true;
    AuthService.signIn(signinForm.value).then(result => {
      const { data } = result.data;
      setAuthInfo(data);
      console.log(data);
      toast.success('Login successful');
      fetchGeneralData();
      LogRocket.identify(data.user.email, {name: `${data.user.firstname}, ${data.user.middlename} ${data.user.lastname}`});
      router.push('/dashboard');
    }).catch((error) => {
      if (error.status === 401) {
        toast.error('Invalid username or password');
        return;
      }
      toast.error('Something went wrong, please try again later');
    }).finally(() => {
      loading.value = false;
    })
  }

  if (!valid) {
    toast.error('All fields are required. Please enter missing fields');
  }
}

</script>