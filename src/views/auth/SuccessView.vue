
<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <svg
        class="mx-auto shrink-0 h-16 w-16 text-indigo-300"
        viewBox="0 0 24 24"
      >
        <path
          class="fill-current text-indigo-200"
          d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
        ></path>
        <path
          class="fill-current text-indigo-400"
          d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
        ></path>
      </svg>

    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Check your email</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          We have sent an email to {{ candidate.email }} to confirm the validity of the email address. Please follow the instruction in the email to complete your registration.
        </p>
        <p class="mt-12 text-center text-xs text-gray-600">
          Didn't receive a verification link?
          {{ ' ' }}
          <a class="cursor-pointer text-xs text-indigo-400 font-bold" :disabled="loading ? 'disabled' : ''" @click="resendConfirmationMail">
            <span v-if="!loading">Resend</span>
            <span v-if="loading">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from "pinia";
import { useSignup } from "../../stores/signup";
import { useToast } from "vue-toastification";
import AuthService from "../../service/authentication.service";

const toast = useToast();

const { candidate } = storeToRefs(useSignup());
const loading = ref(false);

console.log(candidate.value);

async function resendConfirmationMail() {
  loading.value = true;

  const payload = {
    email: candidate.value.email,
  };

  AuthService.resendConfirmation(payload)
    .then((result) => {
      console.log(result);
      toast.success("Verification email has been sent");
    })
    .catch((error) => {
      console.log(error);
      toast.error("An error occured");
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>