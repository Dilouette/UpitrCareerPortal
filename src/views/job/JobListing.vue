<template>
 <main class="flex-1 pb-8">
<div class="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div class="w-full">
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

      <div v-if="loading" class="space-y-4">
        <list-skeleton  class="px-5 py-4 border rounded-lg shadow-lg" :class="'bg-white border-slate-200'" v-for="n in 10" :key="n"></list-skeleton>
      </div>

      <div v-if="!loading" class="space-y-4">
        <JobListItem 
          v-for="job in serverResponse.data"
          :key="job.id"
          :item="job"
        />
      </div>

    </div>
  </div>

  <div class="px-4 pt-0 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div class="w-full">
      <div class="flex items-center justify-between px-4 py-4 bg-white border border-gray-200 rounded-lg shadow-lg sm:px-6">
        <div class="flex justify-between flex-1 sm:hidden">
          <a
            href="#"
            class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          > Previous </a>
          <a
            href="#"
            class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          > Next </a>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing
              {{ ' ' }}
              <span class="font-medium">{{ serverResponse.from }}</span>
              {{ ' ' }}
              to
              {{ ' ' }}
              <span class="font-medium">{{ serverResponse.to}}</span>
              {{ ' ' }}
              of
              {{ ' ' }}
              <span class="font-medium">{{ serverResponse.total }}</span>
              {{ ' ' }}
              results
            </p>
          </div>
          <div>
            <nav 
              :key="link"
              aria-label="Pagination"
              v-for="link in serverResponse.links" 
              class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
            >
              <a
                @click="navigateTo(link.url)"
                  :disabled="link.url === null || loading"
                  :class="
                    link.active
                      ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  "
                  class="relative inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {{ formatLabel(link.label) }}
              </a>
                <!-- <AppButton
                  @click="navigateTo(link.url)"
                  :disabled="link.url === null || loading"
                  :class="
                    link.active
                      ? 'bg-indigo-700 text-white hover:bg-gray-50 hover:text-gray-700'
                      : 'text-gray-700 bg-white'
                  "
                  class="relative inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  {{ formatLabel(link.label) }}
                </AppButton> -->
              </nav>	
          </div>
        </div>
      </div>
    </div>
  </div>

 </main>  
</template>
<script setup>
import { onMounted , ref, } from "vue";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid";
import JobsService from "../../service/jobs.service";
import JobListItem from "../../components/jobs/JobListItem.vue";

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

function formatLabel(label) {
  if (label.includes("Prev")) {
    return `<< Previous`;
  }

  if (label.includes("Next")) {
    return "Next >>";
  }

  return label;
}

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
  var url = `${link}&page_size=20&`;
  Object.keys(searchForm.value).forEach((key) => {
    if (searchForm.value[key] !== "") {
      url += `${key}=${searchForm.value[key]}&`;
    }
  });

  JobsService.getJobs(url).then((res) => {
    serverResponse.value = res.data.data;
    jobs.value = res.data.data;
  }).catch(() => {})
  .finally(() => {
    // loader.hide();
    loading.value = false;
  });
}

onMounted(() => {
  loading.value = true;
  JobsService.getJobs().then((res) => {
    serverResponse.value = res.data.data;
    jobs.value = res.data.data;
  }).catch(() => {})
  .finally(() => {
    loading.value = false;
  });
});

</script>