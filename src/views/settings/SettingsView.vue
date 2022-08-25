<template>
  <main class="flex-1">
    <div class="px-4 mx-auto mt-6 bg-white max-w-7xl sm:px-6 lg:px-6">
      <div class="pt-10 pb-16">
        <div class="px-4 sm:px-6 md:px-0">
          <div class="py-6">            
            <div
                class="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8"
              >
                <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                  <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
                    <form class="space-y-6">
                      <div>
                        <label
                          for="oldPassword"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Old Password
                        </label>
                        <div class="mt-1">
                          <PasswordInput
                            id="oldPassword"
                            name="oldPassword"
                            v-model="formData.current_password"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          for="newPassword"
                          class="block text-sm font-medium text-gray-700"
                        >
                          New Password
                        </label>
                        <div class="mt-1">
                          <PasswordInput
                            id="newPassword"
                            name="newPassword"
                            v-tooltip="'Required 8 minimum characters, numbers and special character'"
                            v-model="formData.password"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          for="confirmPassword"
                          class="block text-sm font-medium text-gray-700"
                        >
                          Confirm New Password
                        </label>
                        <div class="mt-1">
                          <PasswordInput
                            id="confirmPassword"
                            name="confirmPassword"
                            v-tooltip="'Required 8 minimum characters, numbers and special character'"
                            v-model="formData.password_confirmation"
                          />
                        </div>
                      </div>

                      <div>
                        <AppButton
                          type="button"
                          :processing="processing"
                          @click="changePassword"
                          :disabled="v$.$invalid"
                          class="justify-center w-full"
                        >
                          Change Password
                        </AppButton>
                      </div>
                    </form>

                    <div class="mt-6">
                      <div class="relative">
                        <div class="absolute inset-0 flex items-center">
                          <div class="w-full border-t border-gray-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
// import { storeToRefs } from "pinia";
import useVuelidate from "@vuelidate/core";
import { required, helpers, alphaNum, minLength } from "@vuelidate/validators";
// import { useAuthentication } from "../../stores/authentication";
import AccountService from "../../service/account.service";

const toast = useToast();
// const { userInfo } = storeToRefs(useAuthentication());

const processing = ref(false);
const formData = ref({
  password: '',
  password_confirmation: '',
  current_password: '',
});

const rules = {
  password: { minLength: minLength(8), required: helpers.withMessage("New password required", required, alphaNum) },
  current_password: { required: helpers.withMessage("Old password required", required) },
  password_confirmation: { minLength: minLength(8), required: helpers.withMessage("Confirm password required", required, alphaNum) },
}

const v$ = useVuelidate(rules, formData);

function showErrorMessage(errorMessage) {
  toast.error(errorMessage);
}

function showErrorMessages(errors) {
  var errorMessage = "";
  Object.keys(errors).forEach((key) => {
    errorMessage += `${errors[key][0]}\n`;
  });

  toast.error(errorMessage);
}
// const automaticTimezoneEnabled = ref(true);
// const autoUpdateApplicantDataEnabled = ref(false);

function changePassword() {
  processing.value = true;
  AccountService.changePassword(formData.value).then(() => {
    toast.success("Password successfully changed");
  }).catch((error) => {
    const { data } = error;
    if (data.code === "062") {
      showErrorMessages(data.data);
    } else {
      showErrorMessage(data.message);
    }
  }).finally(() => {
    processing.value = false;
  })
}
</script>

<style></style>
