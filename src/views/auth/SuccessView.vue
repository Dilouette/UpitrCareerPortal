<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img src="../../assets/images/logo.png" class="w-3/6 mx-auto" />
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Check your email
        </h2>
        <div class="px-4 mt-4 mx-auto sm:px-6 lg:max-w-9xl lg:px-8">
          <div class="rounded-md bg-red-50 p-4 border-2 border-red-800 border-dashed">
            <div class="flex">
              <div class="flex-shrink-0">
                <InformationCircleIcon class="h-5 w-5 text-red-800" aria-hidden="true" />
              </div>
              <div class="ml-3">
                <h3 class="text-md font-medium text-red-800">Important Notice!</h3>
                <div class="mt-3 text-sm text-red-700">
                  <p>Due to unexpected issues with our email delivery service you might not recieve a confirmation email. Please ignore the confirmation message and click on the button below to continue without confirmation for now</p>
                </div>
                <div class="mt-7 mb-2">
                  <div class="-my-1.5 flex">
                    <a href="/signin" class="rounded-full bg-red-800 px-4 py-1.5 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50">Login Without Confirmation</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="mt-2 text-center text-sm text-gray-600">
          We have sent an email to {{ candidate.email }} to confirm the validity
          of the email address. Please follow the instruction in the email to
          complete your registration.
        </p>
        <p class="mt-12 text-center text-xs text-gray-600">
          Didn't receive a verification link?
          {{ " " }}
          <a
            class="cursor-pointer text-xs text-indigo-400 font-bold"
            :disabled="loading ? 'disabled' : ''"
            @click="resendConfirmationMail"
          >
            <span v-if="!loading">Resend</span>
            <span v-if="loading">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSignup } from "../../stores/signup";
import { useToast } from "vue-toastification";
import { getErrorMessage } from "../../util/ServerUtil";
import AuthService from "../../service/authentication.service";

const toast = useToast();
const { candidate } = storeToRefs(useSignup());
const loading = ref(false);

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
      const { data } = error;
      toast.error(getErrorMessage(data));
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>
