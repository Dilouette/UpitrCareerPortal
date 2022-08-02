<template>
  <div class="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <svg
        class="w-16 h-16 mx-auto text-indigo-300 shrink-0"
        viewBox="0 0 24 24"
      >
        <path
          class="text-indigo-200 fill-current"
          d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
        ></path>
        <path
          class="text-indigo-400 fill-current"
          d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
        ></path>
      </svg>
      <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">Sign Up</h2>
      <p class="mt-2 text-sm text-center text-gray-600">
        Already have an account?
        {{ ' ' }}
        <a
          href="/signin"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        > Sign In </a>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        <form v-on:submit.prevent
          class="space-y-6"
        >
          <div>
            <label
              for="firstname"
              class="block text-sm font-medium text-gray-700"
            > First name </label>
            <div class="mt-1">
              <input
                id="firstname"
                name="firstname"
                v-model="signupForm.firstname"
                type="text"
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              for="middlename"
              class="block text-sm font-medium text-gray-700"
            > Middle name </label>
            <div class="mt-1">
              <input
                id="middlename"
                name="middlename"
                v-model="signupForm.middlename"
                type="text"
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              for="lastname"
              class="block text-sm font-medium text-gray-700"
            > Last name </label>
            <div class="mt-1">
              <input
                id="lastname"
                name="lastname"
                v-model="signupForm.lastname"
                type="text"
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700"
            > Email address </label>
            <div class="mt-1">
              <input
                id="email"
                name="email"
                v-model="signupForm.email"
                type="email"
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            > Password </label>
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                v-model="signupForm.password"
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <div
                class="mt-1 text-red-600"
                v-for="error of v$.password.$errors"
                :key="error.$uid"
              >
                <div class="text-xs text-red-600">{{ error.$message }}</div>
              </div>
            </div>
          </div>

          <div>
            <label
              for="gender"
              class="block text-sm font-medium text-gray-700"
            > Gender </label>
            <div class="mt-1">
              <select 
                id="gender" 
                name="gender" 
                v-model="signupForm.gender_id"
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="">Select Gender</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
          </div>

          <div>
            <app-button
              @click="signup"
              :processing="loading"
              class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >Sign Up</app-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { required, email, helpers, minLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

import { useSignup } from "../../stores/signup";

import AuthService from "../../service/authentication.service";

const signupForm = ref({
  firstname: '',
  middlename: '',
  lastname: '',
  email: '',
  gender_id: null,
  password: '',
})

const loading = ref(false);

// const passwordStrength = helpers.regex(/^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{6,}$/);

const rules = computed(() => {
  return {
    firstname: { required }, 
    middlename: { required }, 
    lastname: { required }, 
    email: { required, email },
    gender_id: { required },
    password: {
      required: helpers.withMessage("Enter password", required),
      minLength: helpers.withMessage("Password lenght must be at least 8 characters long", minLength(8)),
      // alphaNum: helpers.withMessage('Password must have at least one Uppercase, number and a special character', passwordStrength)
    },
  };
});

const toast = useToast();
const router = useRouter();
const v$ = useVuelidate(rules, signupForm)

const { setSignupUser } = useSignup();

async function signup() {

  const valid = await v$.value.$validate();
  console.log(signupForm.value);
  if (valid) {
    loading.value = true;
    signupForm.value.password_confirmation = signupForm.value.password;
    AuthService.signUp(signupForm.value).then(result => {
        const { data } = result.data;
        setSignupUser(data);
        toast.success('Registration successful');
        router.push('/signup-successful');
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