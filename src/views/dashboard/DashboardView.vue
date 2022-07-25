<template>
  <main class="py-10">
      <!-- Page header -->
      <div class="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
        <div class="flex items-center space-x-5">
          <div class="flex-shrink-0">
            <div class="relative">
              <UserCircleIcon class="w-16 h-16 rounded-full text-indigo-500"></UserCircleIcon>
              <span class="absolute inset-0 shadow-inner rounded-full" aria-hidden="true" />
            </div>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{{ userInfo.firstname }} {{ userInfo.middlename }} {{ userInfo.lastname }}</h1>
            <p class="text-sm font-medium text-gray-500">Created <timeago class="ml-1" :datetime="userInfo.created_at"/></p>
          </div>
        </div>
        <div class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
          <button type="button" class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">View Jobs</button>
          <button type="button" class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">Update Profile</button>
        </div>
      </div>

      <div class="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div class="space-y-6 lg:col-start-1 lg:col-span-2">
          <!-- Description list-->
          <section aria-labelledby="applicant-information-title">
            <div class="bg-white shadow sm:rounded-lg">
              <div class="px-4 py-5 sm:px-6">
                <h2 id="applicant-information-title" class="text-lg leading-6 font-medium text-gray-900">Basic Information</h2>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
              </div>
              <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Current role</dt>
                    <dd class="mt-1 text-sm text-gray-900">Backend Developer</dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Email address</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ userInfo.email }}</dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Years of experience</dt>
                    <dd class="mt-1 text-sm" :class="userInfo.years_of_experience==null?'text-red-500':'text-gray-900'">{{ userInfo.years_of_experience ?? "Unavailable" }}</dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Phone</dt>
                    <dd class="mt-1 text-sm" :class="userInfo.phone==null?'text-red-500':'text-gray-900'">{{ userInfo.phone ?? "Unavailable" }}</dd>
                  </div>
                  <div class="sm:col-span-2">
                    <dt class="text-sm font-medium text-gray-500">Summary</dt>
                    <dd class="mt-1 text-sm" :class="userInfo.summary==null?'text-red-500':'text-gray-900'">{{ userInfo.summary ?? "Unavailable" }}</dd>
                  </div>
                </dl>
              </div>
              <div>
                <a href="#" class="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg">View full profile</a>
              </div>
            </div>
          </section>
        </div>

        <section aria-labelledby="timeline-title" class="lg:col-start-3 lg:col-span-1">
          <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
            <h2 id="timeline-title" class="text-lg font-medium text-gray-900">Timeline</h2>
            <div class="mt-6 relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="mx-auto h-12 w-12 text-gray-400 bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
              <span class="mt-2 block text-sm font-medium text-gray-900"> No activity here </span>
            </div>
          </div>
        </section>
      </div>
    </main>
</template>
<script setup>
//import { ref } from "vue";
import {
  UserCircleIcon,
} from "@heroicons/vue/solid";
import { useAuthentication } from "@/stores/authentication.js";

const { userInfo } = useAuthentication();

</script>