<template>
  <main class="flex-1 pb-8">
    <div class="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="w-full">
        <div class="mx-auto md:flex md:items-center md:justify-between lg:max-w-9xl ">
          <div class="flex items-center space-x-5">

          </div>
          <div class="flex flex-col-reverse mt-6 mb-6 space-y-4 space-y-reverse justify-stretch sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 md:mt-0 md:flex-row">
            <router-link
              class="inline-flex items-center justify-center py-2 px-6 rounded-full text-sm font-medium text-white bg-indigo-600 border border-transparent shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
              :to="`/dashboard`"
            >My Account</router-link>
          </div>
        </div>

        <div class="mb-5">
          <form class="relative">
            <label
              for="job-search"
              class="sr-only"
            >Search</label>
            <input
              v-debounce:500ms="onSearchChange"
              id="job-search"
              class="w-full border border-gray-400 rounded shadow-md form-input pl-9 focus:border-slate-300"
              type="search"
              placeholder="Search job title or keyword…"
              v-model="searchForm.keyword"
            />
            <button
              class="absolute inset-0 right-auto group"
              type="submit"
              aria-label="Search"
            >
              <svg
                class="w-4 h-4 ml-3 mr-2 fill-current shrink-0 text-slate-400 group-hover:text-slate-500"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
              </svg>
            </button>
          </form>
        </div>

        <div
          v-if="loading"
          class="space-y-4"
        >
          <list-skeleton
            class="px-5 py-4 border rounded-lg shadow-lg"
            :class="'bg-white border-slate-200'"
            v-for="n in 10"
            :key="n"
          ></list-skeleton>
        </div>

        <div
          v-if="!loading"
          class="space-y-4"
        >
          <JobListItem
            v-for="job in serverResponse.data"
            :key="job.id"
            :item="job"
          />

          <div v-if="serverResponse.data.length == 0">
            <button
              type="button"
              class="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mx-auto h-12 w-12 text-gray-400"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
              </svg>
              <span class="mt-2 block text-sm font-medium text-gray-900"> There are no job vacancies at the moment.</span>
            </button>
          </div>

          <div
            v-if="serverResponse.data.length > 0"
            class="pt-0 pb-12 mx-auto max-w-7xl"
          >
            <div class="w-full">
              <div class="flex items-center justify-between px-4 py-4 bg-white border border-gray-200 rounded-lg shadow-lg sm:px-6">
                <div class="flex justify-between flex-1 sm:hidden">
                  <a
                    href="#"
                    class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Previous
                  </a>
                  <a
                    href="#"
                    class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Next
                  </a>
                </div>
                <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p class="text-sm text-gray-700">
                      Showing
                      {{ " " }}
                      <span class="font-medium">{{ serverResponse.from }}</span>
                      {{ " " }}
                      to
                      {{ " " }}
                      <span class="font-medium">{{ serverResponse.to }}</span>
                      {{ " " }}
                      of
                      {{ " " }}
                      <span class="font-medium">{{ serverResponse.total }}</span>
                      {{ " " }}
                      results
                    </p>
                  </div>
                  <div>
                    <nav
                      class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                      aria-label="Pagination"
                    >
                      <a
                        @click="navigateTo(serverResponse.prev_page_url)"
                        class="relative cursor-pointer inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <span class="sr-only">Previous</span>
                        <ChevronLeftIcon
                          class="h-5 w-5"
                          aria-hidden="true"
                        />
                      </a>
                      <template
                        :key="index"
                        v-for="(link, index) in serverResponse.links"
                      >
                        <a
                          v-if="!link.label.includes('Prev') && !link.label.includes('Next')"
                          @click="navigateTo(link.url)"
                          aria-current="page"
                          :class="link.active?'bg-indigo-50 border-indigo-500 text-indigo-600':' bg-indigo-50 border-indigo-500 text-indigo-600'"
                          class="z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer"
                        > {{ link.label }} </a>
                      </template>
                      <a
                        @click="navigateTo(serverResponse.next_page_url)"
                        class="relative cursor-pointer inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
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
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid";
import JobsService from "../service/jobs.service";
import JobListItem from "../components/jobs/HomeJobListItem.vue";

// const $loading = inject("$loading");

const jobs = ref([]);
const loading = ref(false);
const serverResponse = ref({
  to: 0,
  from: 0,
  total: 0,
  data: [],
  links: [],
  per_page: 0,
  last_page: 0,
  current_page: 0,
  prev_page_url: null,
  next_page_url: null,
  last_page_url: null,
  first_page_url: null,
});

const searchForm = ref({
  keyword: "",
});

function onSearchChange(value) {
  if (value.length > 3) {
    searchForm.value.keyword = value;
    JobsService.all(`keyword=${value}`)
      .then((response) => {
        serverResponse.value = response.data.data;
      })
      .catch(() => {})
      .finally(() => {
        // processing.value = false;
      });
  }

  if (value.length <= 3) {
    // processing.value = true;
    JobsService.all()
      .then((response) => {
        serverResponse.value = response.data.data;
      })
      .catch(() => {})
      .finally(() => {
        // processing.value = false;
      });
  }
}

function navigateTo(link) {
  loading.value = true;
  // const loader = $loading.show();
  // var url = `${link}&page_size=20&`;
  var url = `${link}`;
  Object.keys(searchForm.value).forEach((key) => {
    if (searchForm.value[key] !== "") {
      url += `${key}=${searchForm.value[key]}&`;
    }
  });

  JobsService.getJobs(url)
    .then((res) => {
      serverResponse.value = res.data.data;
      jobs.value = res.data.data;
    })
    .catch(() => {})
    .finally(() => {
      // loader.hide();
      loading.value = false;
    });
}

onMounted(() => {
  loading.value = true;
  JobsService.getJobs()
    .then((res) => {
      serverResponse.value = res.data.data;
      jobs.value = res.data.data;
    })
    .catch(() => {})
    .finally(() => {
      loading.value = false;
    });
});
</script>
