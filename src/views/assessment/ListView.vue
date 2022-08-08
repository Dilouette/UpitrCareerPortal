<template>
  <main class="flex-1 pb-8">
    <div class="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="w-full">
        <div class="mb-5">
          <form class="relative">
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
          </form>
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
          <AssessmentItem
            v-for="assessment in assessments.data"
            :key="assessment.id"
            :item="assessment"
          />
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref, onMounted } from "vue";
import AssessmentService from "../../service/assessment.service";
import AssessmentItem from "../../components/jobs/AssessmentItem.vue";

const loading = ref(false);
const assessments = ref([]);

onMounted(() => {
  loading.value = true;
  AssessmentService.get()
    .then((response) => {
      console.clear();
      console.log(response);
      assessments.value = response.data;
      console.log(assessments.value.data[0]);
    })
    .catch(() => {})
    .finally(() => {
      loading.value = false;
    });
});
</script>
