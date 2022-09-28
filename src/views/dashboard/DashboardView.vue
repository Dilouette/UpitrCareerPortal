<template>
  <main class="py-10">
      <!-- Page header -->
      <div class="px-4 mx-auto sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-9xl lg:px-8">
        <div class="flex items-center space-x-5">
          <div class="flex-shrink-0">
            <div class="relative">
              <UserCircleIcon class="w-16 h-16 text-indigo-500 rounded-full"></UserCircleIcon>
              <span class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
            </div>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{{ userInfo.firstname }} {{ userInfo.middlename }} {{ userInfo.lastname }}</h1>
            <p class="text-sm font-medium text-gray-500">Created <timeago class="ml-1" :datetime="userInfo.created_at"/></p>
          </div>
        </div>
        <div class="flex flex-col-reverse mt-6 space-y-4 space-y-reverse justify-stretch sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
          <a href="/account/jobs" class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">View Jobs</a>
          <a href="/account/profile" class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">Update Profile</a>
        </div>
      </div>

      <div v-if="requiredFields.length > 0" class="px-4 mx-auto mt-4 sm:px-6 lg:max-w-9xl lg:px-8">
        <div class="p-4 border-2 border-red-800 border-dashed rounded-md bg-red-50">
          <div class="flex">
            <div class="flex-shrink-0">
              <InformationCircleIcon class="w-5 h-5 text-red-800" aria-hidden="true" />
            </div>
            <div class="ml-3">
              <h3 class="font-medium text-red-800 text-md">Profile Information Not Completed</h3>
              <div class="mt-3 text-sm text-red-700">
                <p>You may not be able to apply to any jobs beacuse you are yet to fill some vital profile information we require. Please see the list of pending information you are required to complete.<br> Kindly click on the <b>Complete Profile</b> button to complete your profile information</p>
                <p class="mt-4">
                  <span class="px-3 py-1 mr-3 bg-red-100 rounded-full" v-for="x in requiredFields" :key="x">{{ x }}</span>
                </p>
              </div>
              <div class="mb-2 mt-7">
                <div class="-my-1.5 flex">
                  <a href="/account/profile" class="rounded-full bg-red-800 px-4 py-1.5 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50">Complete Profile</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      

      <div class="grid grid-cols-1 gap-6 mx-auto mt-8 sm:px-6 lg:max-w-9xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div class="space-y-6 lg:col-start-1 lg:col-span-2">
          <!-- Description list-->
          <section aria-labelledby="applicant-information-title">
            <div class="bg-white shadow sm:rounded-lg">
              <div class="px-4 py-5 sm:px-6">
                <h2 id="applicant-information-title" class="text-lg font-medium leading-6 text-gray-900">Basic Information</h2>
                <p class="max-w-2xl mt-1 text-sm text-gray-500">Personal details and application.</p>
              </div>
              <div class="px-4 py-5 border-t border-gray-200 sm:px-6">
                <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Current role</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ userInfo.job_function !== null ? userInfo.job_function.name : "" }}</dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Email address</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ userInfo.email }}</dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Years of experience</dt>
                    <dd class="mt-1 text-sm" :class="userInfo.years_of_experience==null?'text-red-500':'text-gray-900'">
                      <span v-if="userInfo.years_of_experience==null" class="px-2 text-red-500 bg-red-100 rounded-full">Unavailable</span>   
                      <p v-if="userInfo.years_of_experience!=null">{{ userInfo.years_of_experience }}</p>  
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Phone</dt>
                    <dd class="mt-1 text-sm" :class="userInfo.phone==null?'text-red-500':'text-gray-900'">
                      <span v-if="userInfo.phone==null" class="px-2 text-red-500 bg-red-100 rounded-full">Unavailable</span>   
                      <p v-if="userInfo.phone!=null">{{ userInfo.phone }}</p>  
                    </dd>
                  </div>
                  <div class="sm:col-span-2">
                    <dt class="text-sm font-medium text-gray-500">Summary</dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      <span v-if="userInfo.summary==null" class="px-2 text-red-500 bg-red-100 rounded-full">Unavailable</span>   
                      <p v-if="userInfo.summary!=null">{{ userInfo.summary }}</p>                  
                    </dd>
                  </div>
                </dl>
              </div>
              <div>
                <a href="account/profile" class="block px-4 py-4 text-sm font-medium text-center text-gray-500 bg-gray-50 hover:text-gray-700 sm:rounded-b-lg">View full profile</a>
              </div>
            </div>
          </section>
        </div>

        <section aria-labelledby="timeline-title" class="lg:col-start-3 lg:col-span-1">
          <div class="px-4 py-5 bg-white shadow sm:rounded-lg sm:px-6">
            <h2 id="timeline-title" class="text-lg font-medium text-gray-900">Timeline</h2>
            <div class="relative block w-full p-12 mt-6 text-center border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-12 h-12 mx-auto text-gray-400 bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
              <span class="block mt-2 text-sm font-medium text-gray-900"> No activity here </span>
            </div>
          </div>
        </section>
      </div>
    </main>
</template>
<script setup>
  import { onMounted, ref } from "vue";
//import Swal from "sweetalert2";
//import { useRouter } from "vue-router";
import {
  UserCircleIcon, InformationCircleIcon
} from "@heroicons/vue/solid";
import { storeToRefs } from "pinia";
import { useProfile } from "../../stores/profile";
import { useAuthentication } from "@/stores/authentication";

const { userInfo } = useAuthentication();
const { education, experiences } = storeToRefs(useProfile());

//const router = useRouter();
const requiredFields = ref([]);

onMounted(() => {  
  const {industry, job_function, dob, city, phone, skills, years_of_experience, headline} = userInfo;

  if (dob === null || dob === "") requiredFields.value.push('Date of Birth');
  if (city === null) requiredFields.value.push('Full Address');
  if (phone === null || phone === "") requiredFields.value.push('Phone Number');
  if (skills === null || skills === "") requiredFields.value.push('Skills');
  if (years_of_experience === null || years_of_experience === "") requiredFields.value.push('Years of experience');
  if (education.value.length === 0) requiredFields.value.push('Education History');
  if (experiences.value.length === 0) requiredFields.value.push('Work Experience');
  if (industry === null)  requiredFields.value.push('Current Industry');
  if (job_function === null) requiredFields.value.push('Current Job Function');
  if (headline === null) requiredFields.value.push('Current Job Headline');
})

</script>