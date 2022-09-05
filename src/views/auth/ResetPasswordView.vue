<template>
  <div class="flex flex-col justify-center min-h-full py-16 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        src="../../assets/images/logo.png"
        class="w-3/6 mx-auto"
      >
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" v-on:submit.prevent>
          <h2 class="mb-6 text-3xl font-extrabold text-center text-gray-900">
            Reset Password
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
                <p class="text-xs text-blue-700">Enter your new password, hit the <b>Reset Password</b> button and you are all set to login with your new password</p>                
              </div>
            </div>
          </div>
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                v-model="formData.password.newPassword"
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <div
                class="mt-1 text-red-600"
                v-for="error of v$.password.newPassword.$errors"
                :key="error.$uid"
              >
                <div class="text-xs text-red-600">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div class="mt-1">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                v-model="formData.password.confirmPassword"
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <div
                class="mt-1 text-red-600"
                v-for="error of v$.password.confirmPassword.$errors"
                :key="error.$uid"
              >
                <div class="text-xs text-red-600">{{ error.$message }}</div>
              </div>
            </div>
          </div>

          <div>
            <app-button
              @click="signin"
              :processing="loading"
              class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >Reset Password</app-button
            >
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
import { ref, inject, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import {
  sameAs,
  email,
  helpers,
  required,
  minLength,
} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

import AuthService from "../../service/authentication.service";

const swal = inject("$swal");

const props = defineProps({
  query: {
    email: String,
    token: String,
  },
});

const loading = ref(false);

const formData = ref({
  email: "",
  token: "",
  password: {
    newPassword: "",
    confirmPassword: "",
  },
});

const passwordStrength = helpers.regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);

const rules = computed(() => {
  return {
    email: { required, email },
    token: { required },
    password: {
      newPassword: {
        required: helpers.withMessage("Enter new password", required),
        minLength: minLength(8),
        strength: helpers.withMessage("New Password must contain at least an Uppercase, a number and a special character", passwordStrength)
      },
      confirmPassword: {
        required: helpers.withMessage("Enter confirm password", required),
        sameAs: helpers.withMessage(
          "Password and confirm password must be equal",
          sameAs(formData.value.password.newPassword)
        ),
      },
    },
  };
});

const toast = useToast();
const router = useRouter();
const v$ = useVuelidate(rules, formData);

function showErrorMessages(errors) {
  var errorMessage = "";
  Object.keys(errors).forEach((key) => {
    errorMessage += `${errors[key][0]}\n`;
  });

  swal({
    title: "Invalid Data",
    text: errorMessage,
    icon: "error",
  });
}

async function signin() {
  const valid = await v$.value.$validate();
  if (valid) {
    loading.value = true;

    const payload = {
      token: formData.value.token,
      email: formData.value.email,
      password: formData.value.password.newPassword,
      password_confirmation: formData.value.password.confirmPassword
    };

    AuthService.resetPassword(payload)
      .then(() => {
        toast.success("Password successfully reset");
        router.push("/signin");
      })
      .catch((error) => {
        const { data } = error;
        if (data.code === "40000") {
          toast.error("Invalid password reset token");
          return;
        }

        if (data.code === "062") {
          showErrorMessages(data.data);
          return;
        }
        toast.error("Something went wrong, try again later");
      })
      .finally(() => {
        loading.value = false;
      });
  }

  if (!valid) {
    toast.error("All fields are required. Please enter missing fields");
  }
}

onMounted(() => {
  if (props.query.email === undefined || props.query.token === undefined) {
    v$.value.$invalid = true;
    toast.warning("Password reset link invalid");

    return;
  }
  formData.value.email = props.query.email;
  formData.value.token = props.query.token;
});
</script>
