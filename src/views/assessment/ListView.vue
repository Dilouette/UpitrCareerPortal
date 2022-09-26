<template>
  <main class="flex-1 pb-8">
    <div class="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="w-full">
        <div class="mb-5">
          <!-- <form class="relative">
            <label for="job-search" class="sr-only">Search</label>
            <input
              id="job-search"
              class="w-full border border-gray-400 rounded shadow-md form-input pl-9 focus:border-slate-300"
              type="search"
              placeholder="Search job title or keyword…"
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
                <path
                  d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
                />
                <path
                  d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"
                />
              </svg>
            </button>
          </form> -->
        </div>

        <div v-if="loading" class="space-y-4">
          <list-skeleton
            class="px-5 py-4 border rounded-lg shadow-lg"
            :class="'bg-white border-slate-200'"
            v-for="n in 10"
            :key="n"
          ></list-skeleton>
        </div>

        <div v-if="!loading" class="space-y-4">
          <template v-if="assessments.length > 0">
            <AssessmentItem
              v-for="assessment in assessments"
              :key="assessment.id"
              :item="assessment"
            />
          </template>
          <template v-if="assessments.length === 0">
            <div class="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="mx-auto h-12 w-12 text-gray-400 bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
              <span class="mt-2 block text-sm font-medium text-gray-900"> You haven't done any assessment </span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import AssessmentService from "../../service/assessment.service";
import AssessmentItem from "../../components/jobs/AssessmentItem.vue";

const toast = useToast();

const loading = ref(false);
const assessments = ref([]);

onMounted(() => {
  loading.value = true;
  AssessmentService.get()
    .then((response) => {
      const { data } = response.data;
      assessments.value = data.data;
    })
    .catch((error) => {
      const { data } = error;
      toast.error(data.message);
    })
    .finally(() => {
      loading.value = false;
    });
});
</script>
