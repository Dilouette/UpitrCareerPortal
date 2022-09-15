<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        src="../../assets/images/logo.png"
        class="w-3/6 mx-auto"
      >
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Email Confirmation</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Please wait while we confirm your email address. You will be redirected to the login page once your email address is confirmed.
        </p>
        <p v-if="loading" class="mt-12 text-center text-xs text-gray-600">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useSignup } from "../../stores/signup";
import { useToast } from "vue-toastification";
import { getErrorMessage } from "../../util/ServerUtil";
import AuthService from "../../service/authentication.service";

const toast = useToast();
const route = useRoute();
const router = useRouter();

// eslint-disable-next-line no-unused-vars
const { candidate } = storeToRefs(useSignup());
const loading = ref(false);

async function emailConfirmation() {
  loading.value = true;

  const payload = {
    email: route.query.email,
    token: route.query.token
  };

  AuthService.confirmation(payload)
    .then(() => {      
      toast.success("Your email has been confirmed successfully! Please login to continue.");
      router.push("/signin");
    })
    .catch((error) => {
      const { data } = error;
      toast.error(getErrorMessage(data));
    })
    .finally(() => {
      loading.value = false;
    });
}

onMounted(() => {
  emailConfirmation();
});
</script>