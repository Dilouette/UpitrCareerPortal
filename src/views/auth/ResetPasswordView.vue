<template>
  <div class="flex flex-col justify-center min-h-full py-16 sm:px-6 lg:px-8">
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
      <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">
        Reset Password
      </h2>
      <p class="mt-2 text-sm text-center text-gray-600">
        Or
        {{ " " }}
        <a
          href="/signin"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Sign In
        </a>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" v-on:submit.prevent>
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
              >Sign In</app-button
            >
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

const formData = ref({
  email: "",
  token: "",
  password: {
    newPassword: "",
    confirmPassword: "",
  },
  // password_confirmation: "",
});

const loading = ref(false);

const rules = computed(() => {
  return {
    email: { required, email },
    token: { required },
    password: {
      newPassword: {
        required: helpers.withMessage("Enter new password", required),
        minLength: minLength(8),
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
