<template>
  <main class="py-10">
    <div class="max-w-3xl mx-auto mt-8 sm:px-6 lg:max-w-7xl">
      <div class="space-y-6">
        <!-- Description list-->
        <section aria-labelledby="applicant-information-title">
          <div class="bg-white shadow sm:rounded-lg">
            <div v-if="assessment !== null" class="px-4 py-5 sm:px-6 grid grid-cols-6">
              <span class="col-start-1 col-span-4">
                <span class="font-bold pr-3">{{questionCount}} of {{assessmentInfo.total}}</span> {{assessment.question.question}}</span>
              <div class="col-end-7 col-span-2 text-right">
                <vue-countdown  @end="onTimerEnd" :time="assessmentInfo.duration * 60 *1000" v-slot="{ hours, minutes, seconds }">
                  Time Remaining: {{hours}}:{{minutes}}:{{seconds}}
                </vue-countdown>
              </div>
            </div>
            <div v-if="assessment !== null" class="px-4 py-5 border-t border-gray-200 sm:px-6">
              <fieldset class="mt-4">
                <div class="space-y-4">
                  <div
                    :key="option.id"
                    class="flex items-center"
                    v-for="option in assessment.question.assesment_question_options"
                  >
                    <input
                      type="radio"
                      :id="option.id"
                      :name="assessment.question.id"
                      :checked="option.answer"
                      v-bind:value="option.answer"
                      @change="optionChange(assessment.question, option)"
                      class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <label
                      :for="option.id"
                      class="block ml-3 text-sm font-medium text-gray-700"
                    >
                      {{ option.value }}
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
            <template v-if="loading">
              <list-skeleton
                class="px-5 py-4 border rounded-lg shadow-lg"
                :class="'bg-white border-slate-200'"
                v-for="n in 3"
                :key="n"
              ></list-skeleton>
            </template>
            <div >
              <button
                :disabled="selectedOption === null || submitting"
                @click="nextQuestion"
                :class="submitting || selectedOption === null ? 'cursor-not-allowed' : 'cursor-pointer'"
                class="w-full block px-4 py-4 text-sm font-medium text-center text-gray-500 bg-gray-50 hover:text-gray-700 sm:rounded-b-lg"
              >Next</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import AssessmentService from "../../service/assessment.service";
import { useAssessment } from "../../stores/assessment";

// const props = defineProps({
//   id: String,
// });

const { assessmentInfo } = storeToRefs(useAssessment());

const assessment = ref(null);
const questionCount = ref(0);
const selectedOption = ref(null);
const loading = ref(false);
const submitting = ref(false);

function optionChange(id, item) {
//  console.log(id, item);
 selectedOption.value = item;
}

function onTimerEnd() {
  // alert('Assessment End');
}

function nextQuestion() {
  if (selectedOption.value === null) {
    return;
  }

  submitting.value = true;

  const payload = {
    applicant_assesment_id: assessmentInfo.value.id,
    assesment_question_id: selectedOption.value.assesment_question_id,
    assesment_question_option_id: selectedOption.value.id
  }

  AssessmentService.submit(payload).then(response => {
    const { data } = response.data;
    assessment.value = data;
    questionCount.value = questionCount.value + 1;
  }).catch(() => {})
  .finally(() => {
    submitting.value = false;
  })
}

onMounted(() => {
  loading.value = true;
  AssessmentService.start(Number(assessmentInfo.value.id)).then((response) => {
    const { data } = response.data;
    assessment.value = data;
    questionCount.value = questionCount.value + 1;
  }).catch(() => {})
  .finally(() => {
    loading.value = false;
  })
});
</script>
