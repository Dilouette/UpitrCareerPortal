
<template>
  <div class="min-h-full flex flex-col justify-center py-16 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <svg class="mx-auto shrink-0 h-16 w-16 text-indigo-300" viewBox="0 0 24 24"><path class="fill-current text-indigo-200" d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"></path><path class="fill-current text-indigo-400" d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"></path></svg>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign In</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        {{ ' ' }}
        <a href="/signup" class="font-medium text-indigo-600 hover:text-indigo-500"> Sign Up </a>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" v-on:submit.prevent>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
            <div class="mt-1">
              <input 
              id="email" 
              name="email" 
              type="email"  
              v-model="signinForm.email"
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
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
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input 
                id="remember-me" 
                name="remember-me" 
                type="checkbox" 
                v-model="signinForm.remember_me"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
            </div>
          </div>

          <div>
            <app-button
              @click="signin"
              :processing="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >Sign In</app-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { required, email } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

import { useAuthentication } from "../../stores/authentication";
import AuthService from "../../service/authentication.service";

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

async function signin() {
  const valid = await v$.value.$validate();

  if (valid) {
    loading.value = true;
    AuthService.signIn(signinForm.value).then(result => {
      const { data } = result.data;
      setAuthInfo(data);
      toast.success('Login successful');
      router.push('/dashboard');
    }).catch((error) => {
      console.log(error);
      toast.error('An error occured');
    }).finally(() => {
      loading.value = false;
    })
  }

  if (!valid) {
    toast.error('All fields are required. Please enter missing fields');
  }
}

</script>