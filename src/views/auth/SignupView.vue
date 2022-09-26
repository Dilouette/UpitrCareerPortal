<template>
  <div class="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img src="../../assets/images/logo.png" class="w-3/6 mx-auto" />
      <!-- <svg class="w-16 h-16 mx-auto text-indigo-300 shrink-0" viewBox="0 0 24 24"><path class="text-indigo-200 fill-current" d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"></path><path class="text-indigo-400 fill-current" d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"></path></svg> -->
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full md:w-2/5">
      <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        <form v-on:submit.prevent class="space-y-6">
          <h2 class="text-3xl font-extrabold text-center text-gray-900 mb-8">
            Sign Up
          </h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label
                for="firstname"
                class="block text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <div class="mt-1">
                <input
                  id="firstname"
                  name="firstname"
                  v-model="signupForm.firstname"
                  autocomplete="off"
                  type="text"
                  placeholder="Your first name"
                  class="py-3 px-3 placeholder-slate-300 text-slate-600 relative bg-white shadow rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
                />
                <div
                  class="mt-1 text-red-600"
                  v-for="error of v$.firstname.$errors"
                  :key="error.$uid"
                >
                  <div class="text-xs text-red-600">{{ error.$message }}</div>
                </div>
              </div>
            </div>

            <div>
              <label
                for="middlename"
                class="block text-sm font-medium text-gray-700"
              >
                Middle name
              </label>
              <div class="mt-1">
                <input
                  id="middlename"
                  name="middlename"
                  v-model="signupForm.middlename"
                  autocomplete="off"
                  type="text"                  
                  placeholder="Your middle name"
                  class="py-3 px-3 placeholder-slate-300 text-slate-600 relative bg-white shadow rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
                />
                <div
                  class="mt-1 text-red-600"
                  v-for="error of v$.middlename.$errors"
                  :key="error.$uid"
                >
                  <div class="text-xs text-red-600">{{ error.$message }}</div>
                </div>
              </div>
            </div>

            <div>
              <label
                for="lastname"
                class="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <div class="mt-1">
                <input
                  id="lastname"
                  name="lastname"
                  v-model="signupForm.lastname"
                  autocomplete="off"
                  type="text"                  
                  placeholder="Your last name"
                  class="py-3 px-3 placeholder-slate-300 text-slate-600 relative bg-white shadow rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
                />
                <div
                  class="mt-1 text-red-600"
                  v-for="error of v$.lastname.$errors"
                  :key="error.$uid"
                >
                  <div class="text-xs text-red-600">{{ error.$message }}</div>
                </div>
              </div>
            </div>            

            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">
                Phone No
              </label>
              <div class="mt-1">
                <input
                  id="phone"
                  name="phone"
                  v-model="signupForm.phone"
                  type="text"
                  autocomplete="off"
                  placeholder="Your phone number"
                  class="py-3 px-3 placeholder-slate-300 text-slate-600 relative bg-white shadow rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
                />
                <div
                  class="mt-1 text-red-600"
                  v-for="error of v$.phone.$errors"
                  :key="error.$uid"
                >
                  <div class="text-xs text-red-600">{{ error.$message }}</div>
                </div>
              </div>
            </div>

            <div>
              <label for="gender" class="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <div class="mt-1">
                <MultiSelect
                  searchable
                  id="gender"
                  value="id"
                  label="name"
                  valueProp="id"
                  v-model="signupForm.gender_id"
                  :options="genders"
                  placeholder="Select your gender"
                  class="py-3.5 px-3 placeholder-slate-300 text-slate-600 relative bg-white shadow rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
                >
                </MultiSelect>
                <div
                  class="mt-1 text-red-600"
                  v-for="error of v$.gender_id.$errors"
                  :key="error.$uid"
                >
                  <div class="text-xs text-red-600">{{ error.$message }}</div>
                </div>
              </div>
            </div>

            <div>
              <label for="gender" class="block text-sm font-medium text-gray-700">
                Date of birth
              </label>
              <div class="mt-1">
                <datepicker
                  placeholder="Select your date of birth"
                  @selected="selectDate"
                  :wrapper-class="'w-full'"
                  class="placeholder-slate-300 text-slate-600 relative bg-white shadow rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
                >
                </datepicker>

                <div
                  class="mt-1 text-red-600"
                  v-for="error of v$.dob.$errors"
                  :key="error.$uid"
                >
                  <div class="text-xs text-red-600">{{ error.$message }}</div>
                </div>
              </div>
            </div>

            <div class="col-span-2">
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  name="email"
                  v-model="signupForm.email"
                  type="email"
                  autocomplete="off"
                  placeholder="Your email address"
                  class="py-3 px-3 placeholder-slate-300 text-slate-600 relative bg-white shadow rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
                />
                <div
                  class="mt-1 text-red-600"
                  v-for="error of v$.email.$errors"
                  :key="error.$uid"
                >
                  <div class="text-xs text-red-600">{{ error.$message }}</div>
                </div>
              </div>
            </div>

            <div class="col-span-2">
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div class="mt-1">
                <password-input
                    v-model="signupForm.password"
                    id="password"
                    name="password"
                    autocomplete="off"
                    placeholder="Password requires an uppercase, lowercase, number, and special character"
                  >
                </password-input>                
                <div
                  class="mt-1 text-red-600"
                  v-for="error of v$.password.$errors"
                  :key="error.$uid"
                >
                  <div class="text-xs text-red-600">{{ error.$message }}</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <app-button
              @click="signup"
              :processing="loading"
              class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >Sign Up</app-button
            >
            <p class="mt-6 text-xs text-center text-gray-600">
              Already have an account?
              {{ " " }}
              <a
                href="/signin"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign In
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers, minLength } from "@vuelidate/validators";
import { getErrorMessage } from "../../util/ServerUtil";
import { useSignup } from "../../stores/signup";
import Datepicker from 'vuejs3-datepicker';
import AuthService from "../../service/authentication.service";

const toast = useToast();
const router = useRouter();

const { setSignupUser } = useSignup();

const loading = ref(false);

const genders = ref([
  { id: 1, name: "Male" },
  { id: 0, name: "Female" },
]);

const signupForm = ref({
  firstname: "",
  middlename: "",
  lastname: "",
  email: "",
  phone: "",
  dob: "",
  gender_id: null,
  password: "",
});

const passwordStrength = helpers.regex(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
);

const rules = computed(() => {
  return {
    firstname: { required: helpers.withMessage("Please enter your first name", required) },
    middlename: { required: helpers.withMessage("Please enter your middle name", required) },
    lastname: { required: helpers.withMessage("Please enter your last name", required) },
    email: { 
      required , email
    },
    phone: { required: helpers.withMessage("Please enter your phone number", required) },
    dob: { required: helpers.withMessage("Please select your date of birth", required) },
    gender_id: { required: helpers.withMessage("Please select your gender", required) },
    password: {
      required: helpers.withMessage("A valid password is required, please enter a password", required),
      minLength: helpers.withMessage(
        "Password length must be at least 8 characters long",
        minLength(8)
      ),
      strength: helpers.withMessage(
        "Password must contain at least an uppercase, a lowercase, a number and a special character",
        passwordStrength
      ),
    },
  };
});


function selectDate(date) {
  console.log(date);
  signupForm.value.dob = date;
}

const v$ = useVuelidate(rules, signupForm);

async function signup() {
  console.log(signupForm);
  const valid = await v$.value.$validate();
  if (valid) {
    loading.value = true;
    signupForm.value.password_confirmation = signupForm.value.password;
    AuthService.signUp(signupForm.value)
      .then((result) => {
        const { data } = result.data;
        setSignupUser(data);
        toast.success("Registration successful");
        router.push("/signup-successful");
      })
      .catch((error) => {
        if(error != undefined && error.data != undefined){
          if ("email" in error.data.data) {
          toast.error("An account with this email already exist");
          } else {
            const { data } = error;
            toast.error(getErrorMessage(data));
          }
        }
        else{
          toast.error("An unexpected error has occured please try again");
        }      
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

<style>
  .vuejs3-datepicker__value {
      min-width: 100% !important;
      border: none;
  }
  
  .vuejs3-datepicker__calendar-topbar {
      background-color: #4338CA !important;
      padding: 20px !important;
  }
  
  .vuejs3-datepicker__calendar-topbar-year {
      font-size: 18px !important;
  }
  
  .vuejs3-datepicker__calendar-topbar-day {
      font-size: 14px !important;
  }
  
  .vuejs3-datepicker__calendar .cell.selected {
      background: #4338CA !important;
  }
  
  .vuejs3-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover, .vuejs3-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover, .vuejs3-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {
      border: 1px solid #4338CA !important;
  }
</style>
