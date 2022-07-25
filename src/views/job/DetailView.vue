<template>
  <main class="flex-1 pb-8">

    <div
      v-if="loading"
      class="space-y-4"
    >
      <detail-skeleton
        class="shadow-lg rounded-lg border px-5 py-4"
        :class="'bg-white border-slate-200'"
        v-for="n in 10"
        :key="n"
      ></detail-skeleton>
    </div>

    <div
      v-if="!loading"
      class="max-w-7xl mx-auto px-2 py-8"
    >
      <div class="max-w-3xl mt-12 mb-8 mx-auto px-4 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl">
        <div class="flex items-center space-x-5">
          <div class="flex-shrink-0">
            <div class="relative">
              <img
                class="h-16 w-16 rounded-full"
                src="../../assets/images/rainoil-icon.png"
                alt=""
              />
              <span
                class="absolute inset-0 shadow-inner rounded-full"
                aria-hidden="true"
              />
            </div>
          </div>
          <div>
            <h1 class="mt-2 text-2xl font-bold leading-7 title-case text-gray-900 sm:text-3xl sm:truncate">
              {{ job.title }}
              <small class="text-sm bg-indigo-200 px-4 py-1 rounded-full ml-5">
                <i class="fa-solid fa-calendar-xmark mr-1"></i>
                Closing
                <timeago
                  class="ml-2"
                  v-if="job.deadline"
                  :datetime="job.deadline"
                />
              </small>
            </h1>

            <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-8">
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <BriefcaseIcon
                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                {{ job.employment_type != null ? job.employment_type.name : 'NA' }}
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <LocationMarkerIcon
                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                {{ job.is_remote == true ? 'Remote' : 'Onsite' }}
              </div>
              <div
                v-if="job.city && job.city.region && job.city.region.country"
                class="mt-2 flex items-center text-sm text-gray-500"
              >
                <LocationMarkerIcon
                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                {{ city.name }} {{ city.region.name }} {{ city.country.name }}
              </div>
              <template v-if="job.currency">
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <CurrencyDollarIcon
                    class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  {{ Number(job.salary_min).toLocaleString() }} &ndash; {{ Number(job.salary_max).toLocaleString() }} {{ job.currency.code }}
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
          <router-link
            to="/account/jobs"
            class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          ><i class="fa-solid fa-chevron-left mr-2"></i>Back</router-link>
          <button
            type="button"
            @click="initApply"
            class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          >Apply Now<i class="fa-solid fa-paper-plane ml-2"></i></button>
        </div>
      </div>
      <div class="w-full shadow-lg rounded-lg border px-8 pt-8 pb-12 bg-white">
        <div class="mt-12">
          <h2 class="text-2xl leading-snug text-slate-800 font-bold mb-2">Description</h2>
          <div
            v-html="job.description"
            class="space-y-6 mb-6"
          >
          </div>
        </div>

        <hr class="my-6 border-t border-slate-200" />

        <div class="mt-12">
          <h2 class="text-2xl leading-snug text-slate-800 font-bold mb-2">Requirements</h2>
          <div
            v-html="job.requirements"
            class="space-y-6 mb-6"
          >
          </div>
        </div>

        <hr class="my-6 border-t border-slate-200" />

        <div class="mt-12">
          <h2 class="text-2xl leading-snug text-slate-800 font-bold mb-2">Benefit</h2>
          <div
            v-html="job.benefit"
            class="space-y-6 mb-6"
          >
          </div>
        </div>

        <hr class="my-6 border-t border-slate-200" />

        <div class="mt-12">
          <h2 class="text-2xl leading-snug text-slate-800 font-bold mb-2">Responsibility</h2>
          <div
            v-html="job.responsibilities"
            class="space-y-6 mb-6"
          >
          </div>
        </div>

        <hr class="my-6 border-t border-slate-200" />

        <div class="mt-16 text-right">
          <a
            @click="initApply"
            class="inline-flex cursor-pointer items-center py-2 px-4 bg-blue-600 rounded-md border-slate-200 hover:bg-blue-700 text-white"
          >
            <span>Apply Now<i class="fa-solid fa-paper-plane ml-2"></i></span>
          </a>
        </div>
      </div>
    </div>

  </main>
  <TransitionRoot
    as="template"
    :show="open"
  >
    <Dialog
      as="div"
      class="relative z-10"
      @close="open = false"
    >
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel class="relative bg-white rounded-lg px-4 pt-5 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-3xl sm:w-full sm:p-6">
              <div class="w-100">
                <div class="mt-3 text-center sm:mt-0  sm:text-left">
                  <DialogTitle
                    as="h3"
                    class="text-lg px-6 leading-6 font-medium text-gray-900"
                  > Apply For {{ job.title }} </DialogTitle>
                  <div class="mt-2">
                    <div class="py-5 bg-white space-y-6 sm:p-6">
                      <div>
                        <div class="grid grid-cols-6 gap-6">
                          <div
                            v-for="question in questions"
                            :key="question.id"
                            class="col-span-6 sm:col-span-6"
                          >
                            <label
                              for="postal-code"
                              class="block text-sm font-medium text-gray-700 mb-2"
                            >{{ question.question }}</label>
                            <template v-if="question.job_question_type.name == 'Multiple Choice'">
                              <div class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                                <div
                                  v-for="option in question.job_question_options"
                                  :key="option.id"
                                  class="flex items-center"
                                >
                                  <input
                                    v-model="question.response"
                                    :value="option.id"
                                    type="radio"
                                    class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                  />
                                  <label
                                    :for="question.id"
                                    class="ml-3 block text-sm font-medium text-gray-700"
                                  >
                                    {{ option.option }}
                                  </label>
                                </div>
                              </div>
                            </template>
                            <template v-else-if="question.job_question_type.name == 'True Or False'">
                              <SwitchGroup>
                                <div class="flex items-center">
                                  <Switch
                                    v-model="question.response"
                                    :class='question.response ? "bg-blue-600" : "bg-gray-200"'
                                    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  >
                                    <span
                                      :class='question.response ? "translate-x-6" : "translate-x-1"'
                                      class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                                    />
                                  </Switch>
                                  <SwitchLabel class="ml-4">{{ question.response ? 'True' : 'False' }}</SwitchLabel>
                                </div>
                              </SwitchGroup>
                            </template>
                            <template v-else-if="question.job_question_type.name == 'Dropdown'">
                              <select
                                v-model="question.response"
                                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              >
                                <option
                                  disabled
                                  value=""
                                >Please select</option>
                                <template
                                  v-for="option in question.job_question_options"
                                  :key="option.id"
                                >
                                  <option :value="option.id">{{ option.option }}</option>
                                </template>
                              </select>
                            </template>
                            <template v-else-if="question.job_question_type.name == 'Short Text'">
                              <input
                                type="text"
                                v-model="question.response"
                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </template>
                            <template v-else-if="question.job_question_type.name == 'Long Text'">
                              <textarea
                                v-model="question.response"
                                rows="5"
                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              ></textarea>
                            </template>
                            <template v-else-if="question.job_question_type.name == 'Date Time'">
                              <input
                                type="date"
                                v-model="question.response"
                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </template>
                            <template v-else-if="question.job_question_type.name == 'Number'">
                              <input
                                type="number"
                                @keypress="numbersOnly"
                                v-model="question.response"
                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-3 mb-3 px-6 sm:mt-4 sm:flex sm:flex-row-reverse">
                <app-button
                  @click="apply"
                  :processing="processing"
                  class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >Apply
                </app-button>
                <button
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:w-auto sm:text-sm"
                  @click="open = false"
                >Cancel</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  CurrencyDollarIcon,
  LocationMarkerIcon,
  BriefcaseIcon,
} from "@heroicons/vue/solid";

import JobsService from "../../service/jobs.service";
import { reactive, computed, onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
  Switch,
  SwitchGroup,
  SwitchLabel,
} from "@headlessui/vue";

const toast = useToast();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const job = ref({});
const loading = ref(false);
const processing = ref(false);
const open = ref(false);

const questions = ref([]);

const city = reactive({
  name: computed(() => job.value.city?.name ?? ""),
  region: computed(() => job.value.city?.region ?? {}),
  country: computed(() => job.value.city?.region?.country ?? {}),
});

function initApply() {
  if (job.value.job_questions.length > 0) {
    questions.value = job.value.job_questions.map((question) => {
      question.response =
        question.job_question_type.name == "True Or False" ? false : null;
      return question;
    });
    open.value = true;
  }
}

function apply() {
  let isInvalid = questions.value.some((question) => {
    console.log(question.response);
    question.response === null ||
      question.response === "" ||
      question.response === undefined;
  });

  if (!isInvalid) {
    let payloadQuestions = questions.value.map((question) => {
      return {
        job_question_id: question.id,
        job_question_option_id: question.job_question_type.has_options == true ? question.response : null,
        response: question.job_question_type.has_options == true ? null : question.response,
      };
    });

    processing.value = true;
    let payload = {
      job_id: job.value.id,
      questions: payloadQuestions
    };

    JobsService.apply(payload).then((res) => {
      console.log(res.data.data)
      processing.value = false;
      open.value = false;
      toast.success('Application sent successfully. You will hear back from our team soon.');
    }).catch((err) => {
      processing.value = false;   
      if (err.status >= 400 && err.status < 500) {
        toast.error(err.data.message);
      }else{
        console.log(err)
        toast.error('An error occured while trying to applying for this job');
      }
      
    });

  } else {
    Swal.fire({
      title: "Validation Error",
      text: "You must fill in all required fields",
      icon: "error",
    });
  }
}

function numbersOnly(e) {
  let keyCode = e.keyCode ? e.keyCode : e.which;
  if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
    e.preventDefault();
  }
}

onMounted(() => {
  try {
    if (props.id !== undefined) {
      loading.value = true;
      JobsService.getJobDetails(props.id).then((res) => {
        job.value = res.data.data;
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});
</script>