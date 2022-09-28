<template>
  <main class="flex-1 pb-8">
    <div class="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div v-if="loading" class="space-y-4">
        <list-skeleton
          class="px-5 py-4 border rounded-lg shadow-lg"
          :class="'bg-white border-slate-200'"
          v-for="n in 10"
          :key="n"
        ></list-skeleton>
      </div>

      <div v-if="!loading" class="space-y-4">
        <AppliedListItem
          v-for="application in serverResponse.data"
          :key="application.id"
          :item="application"
        />

        <div
          v-if="serverResponse.data.length > 0"
          class="pt-0 pb-12 mx-auto"
        >
          <div class="w-full">
            <div
              class="flex items-center justify-between px-4 py-4 bg-white border border-gray-200 rounded-lg shadow-lg sm:px-6"
            >
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
              <div
                class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
              >
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
                    class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <a
                      @click="navigateTo(serverResponse.prev_page_url)"
                      class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-pointer rounded-l-md hover:bg-gray-50"
                    >
                      <span class="sr-only">Previous</span>
                      <ChevronLeftIcon class="w-5 h-5" aria-hidden="true" />
                    </a>
                    <template
                      :key="index"
                      v-for="(link, index) in serverResponse.links"
                    >
                      <a
                        v-if="
                          !link.label.includes('Prev') &&
                          !link.label.includes('Next')
                        "
                        @click="navigateTo(link.url)"
                        aria-current="page"
                        :class="
                          link.active
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-600'
                            : ' bg-indigo-50 border-indigo-500 text-indigo-600'
                        "
                        class="relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium border cursor-pointer"
                      >
                        {{ link.label }}
                      </a>
                    </template>
                    <a
                      @click="navigateTo(applications.next_page_url)"
                      class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-pointer rounded-r-md hover:bg-gray-50"
                    >
                      <span class="sr-only">Next</span>
                      <ChevronRightIcon class="w-5 h-5" aria-hidden="true" />
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="serverResponse.data.length == 0">
          <button
            type="button"
            class="relative block w-full p-12 text-center border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-12 h-12 mx-auto text-gray-400"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"
              />
              <path
                d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"
              />
            </svg>
            <span class="block mt-2 text-sm font-medium text-gray-900">
              You have not applied for any job</span
            >
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid";
import AppliedListItem from "../../components/jobs/AppliedListItem.vue";
import JobsService from "../../service/jobs.service";
import { getErrorMessage } from "../../util/ServerUtil";

const loading = ref(false);
const toast = useToast();

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

function navigateTo(link) {
  loading.value = true;
  // const loader = $loading.show();
  var url = `${link}&page_size=20&`;
  // Object.keys(searchForm.value).forEach((key) => {
  //   if (searchForm.value[key] !== "") {
  //     url += `${key}=${searchForm.value[key]}&`;
  //   }
  // });

  JobsService.getJobs(url)
    .then((res) => {
      serverResponse.value = res.data.data;
    })
    .catch((error) => {
      const { data } = error;
      toast.error(getErrorMessage(data));
    })
    .finally(() => {
      // loader.hide();
      loading.value = false;
    });
}

onMounted(() => {
  loading.value = true;
  JobsService.getAppliedJobs()
    .then((res) => {
      serverResponse.value = res.data.data;
    })
    .catch((error) => {
      const { data } = error;
      toast.error(getErrorMessage(data));
    })
    .finally(() => {
      loading.value = false;
    });
});
</script>
