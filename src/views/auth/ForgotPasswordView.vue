<template>
  <div class="flex flex-col justify-center min-h-full py-16 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        src="../../assets/images/rainoil-careers-logo.png"
        class="w-3/6 mx-auto"
      >
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        <form
          class="space-y-6"
          v-on:submit.prevent
        >
          <h2 class="mb-6 text-3xl font-extrabold text-center text-gray-900">
            Forgot Password
          </h2>
          <div class="rounded-md bg-blue-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <InformationCircleIcon
                  class="h-5 w-5 text-blue-400"
                  aria-hidden="true"
                />
              </div>
              <div class="ml-3 flex-1 md:flex md:justify-between">
                <p class="text-xs text-blue-700">It's okay we all forget our passwords every now and then. Enter your registered email address and we will send you a password reset link</p>                
              </div>
            </div>
          </div>
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                v-model="formData.email"
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <app-button
              @click="onSubmit"
              :processing="loading"
              :disabled="v$.$invalid"
              class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >Send Me A Password Reset Link</app-button>
            <p class="mt-6 text-xs text-center text-gray-600">
              Take me back to
              {{ ' ' }}
              <a
                href="/signin"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              > Sign In </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { required, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

import AuthService from "../../service/authentication.service";

const formData = ref({
  email: "",
});

const loading = ref(false);

const rules = {
  email: { required, email },
};

const toast = useToast();
const router = useRouter();
const v$ = useVuelidate(rules, formData);

async function onSubmit() {
  const valid = await v$.value.$validate();

  if (valid) {
    loading.value = true;
    AuthService.forgotPassword(formData.value)
      .then(() => {
        toast.success("Password reset successfully sent");
        router.push("/signin");
      })
      .catch((error) => {
        if (error.status === 404) {
          toast.error("Email does not exist");
          return;
        }
        toast.error("Something went wrong, please try again later");
      })
      .finally(() => {
        loading.value = false;
      });
  }

  if (!valid) {
    toast.error("All fields are required. Please enter missing fields");
  }
}
</script>
