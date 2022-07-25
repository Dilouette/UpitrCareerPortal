<template>
 <main class="flex-1 pb-8">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="w-full">
      <div class="mb-5">
        <form class="relative">
          <label
            for="job-search"
            class="sr-only"
          >Search</label>
          <input
            id="job-search"
            class="form-input w-full pl-9 rounded border border-gray-400 shadow-md focus:border-slate-300"
            type="search"
            placeholder="Search job title or keyword…"
          />
          <button
            class="absolute inset-0 right-auto group"
            type="submit"
            aria-label="Search"
          >
            <svg
              class="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
              <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
            </svg>
          </button>
        </form>
      </div>

      <div v-if="loading" class="space-y-4">
        <list-skeleton  class="shadow-lg rounded-lg border px-5 py-4" :class="'bg-white border-slate-200'" v-for="n in 10" :key="n"></list-skeleton>
      </div>

      <div v-if="!loading" class="space-y-4">
        <JobListItem 
          v-for="job in jobs"
          :key="job.id"
          :item="job"
        />
      </div>

    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-12">
    <div class="w-full">
      <div class="bg-white px-4 py-4 flex items-center shadow-lg rounded-lg justify-between border border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <a
            href="#"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          > Previous </a>
          <a
            href="#"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          > Next </a>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing
              {{ ' ' }}
              <span class="font-medium">{{ jobs.from }}</span>
              {{ ' ' }}
              to
              {{ ' ' }}
              <span class="font-medium">{{ jobs.to}}</span>
              {{ ' ' }}
              of
              {{ ' ' }}
              <span class="font-medium">{{ jobs.total }}</span>
              {{ ' ' }}
              results
            </p>
          </div>
          <div>
            <nav
              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <a
                href="#"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span class="sr-only">Previous</span>
                <ChevronLeftIcon
                  class="h-5 w-5"
                  aria-hidden="true"
                />
              </a>
              <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
              <a
                href="#"
                aria-current="page"
                class="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              > 1 </a>
              <a
                href="#"
                class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              > 2 </a>
              <a
                href="#"
                class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
              > 3 </a>
              <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"> ... </span>
              <a
                href="#"
                class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
              > 8 </a>
              <a
                href="#"
                class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              > 9 </a>
              <a
                href="#"
                class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              > 10 </a>
              <a
                href="#"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span class="sr-only">Next</span>
                <ChevronRightIcon
                  class="h-5 w-5"
                  aria-hidden="true"
                />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>

 </main>  
</template>
<script setup>
import JobListItem from "../../components/jobs/JobListItem.vue";
import JobsService from "../../service/jobs.service";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid";
import { onMounted , ref } from "vue";

const jobs = ref([]);
const loading = ref(false);

onMounted(() => {
  loading.value = true;
  JobsService.getJobs().then((res) => {
    jobs.value = res.data.data;
    loading.value = false;
  });
});

</script>