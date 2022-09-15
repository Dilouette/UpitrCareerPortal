<template>
  <main class="flex-1 pb-8">

    <div
      v-if="loading"
      class="space-y-4"
    >
      <detail-skeleton
        class="px-5 py-4 border rounded-lg shadow-lg"
        :class="'bg-white border-slate-200'"
        v-for="n in 10"
        :key="n"
      ></detail-skeleton>
    </div>

    <div
      v-if="!loading"
      class="px-2 py-8 mx-auto max-w-7xl"
    >
      <div class="max-w-3xl px-4 mx-auto mt-12 mb-8 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl">
        <div class="flex items-center space-x-5">
          <div class="flex-shrink-0">
            <div class="relative">
              <img
                class="w-16 h-16 rounded-full"
                src="../../assets/images/icon.png"
                alt=""
              />
              <span
                class="absolute inset-0 rounded-full shadow-inner"
                aria-hidden="true"
              />
            </div>
          </div>
          <div>
            <h1 class="mt-2 text-2xl font-bold leading-7 text-gray-900 title-case sm:text-3xl sm:truncate">
              {{ job.title }}
              <small class="px-4 py-1 ml-5 text-sm bg-indigo-200 rounded-full">
                <i class="mr-1 fa-solid fa-calendar-xmark"></i>
                Closing
                <timeago
                  class="ml-2"
                  v-if="job.deadline"
                  :datetime="job.deadline"
                />
              </small>
            </h1>

            <div class="flex flex-col mt-1 sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-8">
              <div class="flex items-center mt-2 text-sm text-gray-500">
                <BriefcaseIcon
                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                {{ job.employment_type != null ? job.employment_type.name : 'NA' }}
              </div>
              <div class="flex items-center mt-2 text-sm text-gray-500">
                <LocationMarkerIcon
                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                {{ job.is_remote == true ? 'Remote' : 'Onsite' }}
              </div>
              <div
                v-if="job.city && job.city.region && job.city.region.country"
                class="flex items-center mt-2 text-sm text-gray-500"
              >
                <LocationMarkerIcon
                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                {{ city.name }} {{ city.region.name }} {{ city.country.name }}
              </div>
              <template v-if="job.currency">
                <div class="flex items-center mt-2 text-sm text-gray-500">
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
        <div class="flex flex-col-reverse mt-6 space-y-4 space-y-reverse justify-stretch sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
          <router-link
            to="/account/jobs"
            class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          ><i class="mr-2 fa-solid fa-chevron-left"></i>Back</router-link>
          <button
            type="button"
            @click="initApply"
            class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          >Apply Now<i class="ml-2 fa-solid fa-paper-plane"></i></button>
        </div>
      </div>
      <div class="w-full px-8 pt-8 pb-12 bg-white border rounded-lg shadow-lg">
        <div class="mt-12">
          <h2 class="mb-2 text-2xl font-bold leading-snug text-slate-800">Description</h2>
          <div
            v-html="job.description"
            class="mb-6 space-y-6"
          >
          </div>
        </div>

        <hr class="my-6 border-t border-slate-200" />

        <div class="mt-12">
          <h2 class="mb-2 text-2xl font-bold leading-snug text-slate-800">Requirements</h2>
          <div
            v-html="job.requirements"
            class="mb-6 space-y-6"
          >
          </div>
        </div>

        <hr class="my-6 border-t border-slate-200" />

        <div class="mt-12">
          <h2 class="mb-2 text-2xl font-bold leading-snug text-slate-800">Benefit</h2>
          <div
            v-html="job.benefit"
            class="mb-6 space-y-6"
          >
          </div>
        </div>

        <hr class="my-6 border-t border-slate-200" />

        <div class="mt-12">
          <h2 class="mb-2 text-2xl font-bold leading-snug text-slate-800">Responsibility</h2>
          <div
            v-html="job.responsibilities"
            class="mb-6 space-y-6"
          >
          </div>
        </div>

        <hr class="my-6 border-t border-slate-200" />

        <div class="mt-16 text-right">
          <a
            @click="initApply"
            class="inline-flex items-center px-4 py-2 text-white bg-blue-600 rounded-md cursor-pointer border-slate-200 hover:bg-blue-700"
          >
            <span>Apply Now<i class="ml-2 fa-solid fa-paper-plane"></i></span>
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
        <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel class="relative px-4 pt-5 pb-6 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-3xl sm:w-full sm:p-6">
              <div class="w-100">
                <div class="mt-3 text-center sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    class="px-6 text-lg font-medium leading-6 text-gray-900"
                  > Apply For {{ job.title }} </DialogTitle>
                  <div class="mt-2">
                    <div class="py-5 space-y-6 bg-white sm:p-6">
                      <div>
                        <div class="grid grid-cols-6 gap-6">
                          <div
                            v-for="question in questions"
                            :key="question.id"
                            class="col-span-6 sm:col-span-6"
                          >
                            <label
                              for="postal-code"
                              class="block mb-2 text-sm font-medium text-gray-700"
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
                                    class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                  />
                                  <label
                                    :for="question.id"
                                    class="block ml-3 text-sm font-medium text-gray-700"
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
                                    class="relative inline-flex items-center h-6 transition-colors rounded-full w-11 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  >
                                    <span
                                      :class='question.response ? "translate-x-6" : "translate-x-1"'
                                      class="inline-block w-4 h-4 transition-transform transform bg-white rounded-full"
                                    />
                                  </Switch>
                                  <SwitchLabel class="ml-4">{{ question.response ? 'True' : 'False' }}</SwitchLabel>
                                </div>
                              </SwitchGroup>
                            </template>
                            <template v-else-if="question.job_question_type.name == 'Dropdown'">
                              <select
                                v-model="question.response"
                                class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                                class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                            </template>
                            <template v-else-if="question.job_question_type.name == 'Long Text'">
                              <textarea
                                v-model="question.response"
                                rows="5"
                                class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              ></textarea>
                            </template>
                            <template v-else-if="question.job_question_type.name == 'Date Time'">
                              <input
                                type="date"
                                v-model="question.response"
                                class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                            </template>
                            <template v-else-if="question.job_question_type.name == 'Number'">
                              <input
                                type="number"
                                @keypress="numbersOnly"
                                v-model="question.response"
                                class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-6 mt-3 mb-3 sm:mt-4 sm:flex sm:flex-row-reverse">
                <app-button
                  @click="apply"
                  :processing="processing"
                  class="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >Apply
                </app-button>
                <button
                  type="button"
                  class="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:w-auto sm:text-sm"
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
import { reactive, computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  CurrencyDollarIcon,
  LocationMarkerIcon,
  BriefcaseIcon,
} from "@heroicons/vue/solid";
import JobsService from "../../service/jobs.service";
import { storeToRefs } from "pinia";
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
import { useProfile } from "../../stores/profile";
import { useAuthentication } from "../../stores/authentication";
import { JobSettings } from "../../util/Constants";
import { CapitalizeFirstLetter } from "../../util/Formatter";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const toast = useToast();
const router = useRouter();

const { education, experiences } = storeToRefs(useProfile());
const { userInfo } = storeToRefs(useAuthentication());

const job = ref({});
const open = ref(false);
const loading = ref(false);
const processing = ref(false);

const questions = ref([]);

const city = reactive({
  name: computed(() => job.value.city?.name ?? ""),
  region: computed(() => job.value.city?.region ?? {}),
  country: computed(() => job.value.city?.region?.country ?? {}),
});

function initApply() {
  const settings = job.value.job_settings;
  const requiredFields = [];
  
  if (education.value.length === 0) requiredFields.push('Education');
  if (experiences.value.length === 0) requiredFields.push('Experiences');
  if (userInfo.value.industry === null)  requiredFields.push('Industry');
  if (userInfo.value.job_function === null) requiredFields.push('Job Function');

  Object.keys(settings).forEach((field) => {
    if (settings[field] === JobSettings.Mandatory && field in userInfo.value) {
      if (userInfo.value[field] === null || userInfo.value[field] === '') {
        requiredFields.push(field === 'dob' ? "Date of Birth" : CapitalizeFirstLetter(field));
      }
    }
  })

  if (job.value.job_questions.length > 0) {
    questions.value = job.value.job_questions.map((question) => {
      question.response =
        question.job_question_type.name == "True Or False" ? false : null;
      return question;
    });
  }

  if (requiredFields.length > 0) {
    let errorMessage = `Kindly update your ${requiredFields.join(', ')}, before applying for this job`;
    Swal.fire({
      title: "Profile Update",
      text: errorMessage,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: 'Go to Profile'
    }).then((result) => {
      if (result.isConfirmed) {
        router.push({ name: "Profile" });
      }
    });

    return;
  }

  open.value = true;
}

function apply() {
  let isInvalid = questions.value.some((question) => {
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
      processing.value = false;
      open.value = false;
      toast.success('Application sent successfully. You will hear back from our team soon.');
    }).catch((err) => {
      processing.value = false;   
      if (err.status >= 400 && err.status < 500) {
        toast.error(err.data.message);
      }else{
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
    // console.log(error);
  } finally {
    loading.value = false;
  }
});
</script>