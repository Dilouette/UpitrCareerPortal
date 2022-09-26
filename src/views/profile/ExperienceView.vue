<template>
  <div v-if="!fetching && userExperience.length != 0">
    <div class="flex justify-end mb-6">
      <span
        @click="initAdd"
        class="inline-flex justify-center text-sm font-bold text-indigo-600 cursor-pointer"
      >
        + Add Work Experience
      </span>
    </div>
    <ul role="list" class="md:grid md:gap-6 md:grid-cols-3">
      <li
        v-for="experience in userExperience"
        :key="experience.id"
        class="col-span-1 bg-white divide-y divide-gray-200 rounded-lg shadow"
      >
        <div class="flex items-center justify-between w-full p-6 space-x-6">
          <div class="flex-1 truncate">
            <h3 class="font-medium text-gray-900 truncate text-md">
              {{ experience.company }}
            </h3>
            <p class="mt-1 text-sm text-gray-500 truncate">
              {{ experience.industry.name }}
            </p>
            <p class="mt-1 text-xs font-bold text-gray-500 truncate">
              {{ experience.title }}
            </p>
            <p class="mt-1 text-xs text-gray-500 truncate">
              {{ experience.summary }}
            </p>
            <p class="mt-1 text-xs text-gray-500 truncate">
              <i class="mr-1 fa-regular fa-calendar-check"></i
              >{{ FormatMonthYear(experience.start_date) }} -
              {{ FormatMonthYear(experience.end_date) }}
            </p>
          </div>
          <img
            class="flex-shrink-0 w-12 h-12"
            src="../../assets/images/office.png"
          />
        </div>
        <div>
          <div class="flex -mt-px divide-x divide-gray-200">
            <div class="flex flex-1 w-0">
              <a
                @click="initEdit(experience)"
                class="relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium text-gray-700 border border-transparent rounded-bl-lg cursor-pointer hover:text-gray-500"
              >
                <PencilAltIcon
                  class="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
                <span class="ml-3">Edit</span>
              </a>
            </div>
            <div class="flex flex-1 w-0 -ml-px">
              <a
                @click="initDelete(experience.id)"
                class="relative inline-flex items-center justify-center flex-1 w-0 py-4 text-sm font-medium text-gray-700 border border-transparent rounded-br-lg cursor-pointer hover:text-gray-500"
              >
                <TrashIcon class="w-5 h-5 text-red-400" aria-hidden="true" />
                <span class="ml-3 text-red-400">Delete</span>
              </a>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>

  <button
    v-if="!fetching && userExperience.length == 0"
    @click="initAdd"
    type="button"
    class="relative block w-full p-12 text-center border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      class="w-12 h-12 mx-auto text-gray-400 bi bi-building"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"
      />
      <path
        d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"
      />
    </svg>
    <span class="block mt-2 text-sm font-medium text-gray-900">
      Add Work Experience
    </span>
  </button>

  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative px-4 pt-5 pb-6 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-3xl sm:w-full sm:p-6"
            >
              <div class="w-100">
                <div class="mt-3 text-center sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    class="px-6 text-lg font-medium leading-6 text-gray-900"
                  >
                    Add New Work Experience
                  </DialogTitle>
                  <div class="mt-2">
                    <div class="py-5 space-y-6 bg-white sm:p-6">
                      <div>
                        <div class="grid grid-cols-6 gap-6">
                          <div class="col-span-6 sm:col-span-6">
                            <label
                              for="postal-code"
                              class="block text-sm font-medium text-gray-700"
                              >Company</label
                            >
                            <input
                              type="text"
                              v-model="experience.company"
                              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <div
                              class="text-red-600"
                              v-for="error of v$.company.$errors"
                              :key="error.$uid"
                            >
                              <div class="text-xs font-bold text-red-600">
                                {{ error.$message }}
                              </div>
                            </div>
                          </div>
                          <div class="col-span-6 sm:col-span-6">
                            <label
                              for="postal-code"
                              class="block text-sm font-medium text-gray-700"
                              >Job Role</label
                            >
                            <input
                              type="text"
                              v-model="experience.title"
                              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <div
                              class="text-red-600"
                              v-for="error of v$.title.$errors"
                              :key="error.$uid"
                            >
                              <div class="text-xs font-bold text-red-600">
                                {{ error.$message }}
                              </div>
                            </div>
                          </div>
                          <div class="col-span-6 sm:col-span-6">
                            <label
                              for="postal-code"
                              class="block text-sm font-medium text-gray-700"
                              >Industry</label
                            >
                            <MultiSelect
                              class="mt-1"
                              searchable
                              id="industry"
                              value="id"
                              label="name"
                              valueProp="id"
                              v-model="experience.industry_id"
                              :options="industries"
                              placeholder="Select industry"
                            >
                            </MultiSelect>
                            <div
                              class="text-red-600"
                              v-for="error of v$.industry_id.$errors"
                              :key="error.$uid"
                            >
                              <div class="text-xs font-bold text-red-600">
                                {{ error.$message }}
                              </div>
                            </div>
                          </div>
                          <div class="col-span-6 sm:col-span-6">
                            <label
                              for="postal-code"
                              class="block text-sm font-medium text-gray-700"
                              >Job Summary</label
                            >
                            <textarea
                              v-model="experience.summary"
                              rows="5"
                              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            ></textarea>
                            <div
                              class="text-red-600"
                              v-for="error of v$.summary.$errors"
                              :key="error.$uid"
                            >
                              <div class="text-xs font-bold text-red-600">
                                {{ error.$message }}
                              </div>
                            </div>
                          </div>
                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="dob"
                              class="block text-sm font-medium text-gray-700"
                              >Start Date</label
                            >
                            <Datepicker
                              autoApply
                              v-model="experience.start_date"
                              :format="format"
                              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                            </Datepicker>
                            <div
                              class="text-red-600"
                              v-for="error of v$.start_date.$errors"
                              :key="error.$uid"
                            >
                              <div class="text-xs font-bold text-red-600">
                                {{ error.$message }}
                              </div>
                            </div>
                          </div>
                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="dob"
                              class="block text-sm font-medium text-gray-700"
                              >End Date</label
                            >
                            <Datepicker
                              autoApply
                              v-model="experience.end_date"
                              :format="format"
                              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                            </Datepicker>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-6 mt-3 mb-3 sm:mt-4 sm:flex sm:flex-row-reverse">
                <app-button
                  v-if="!isEdit"
                  @click="addExperience"
                  :processing="processing"
                  class="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >Add experience
                </app-button>
                <app-button
                  v-if="isEdit"
                  @click="updateExperience"
                  :processing="processing"
                  class="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >Update experience
                </app-button>
                <button
                  type="button"
                  class="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:w-auto sm:text-sm"
                  @click="open = false"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import useVuelidate from "@vuelidate/core";
import { TrashIcon, PencilAltIcon } from "@heroicons/vue/solid";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import { required, helpers } from "@vuelidate/validators";
import { useProfile } from "../../stores/profile";
import { useMiscellaneous } from "../../stores/miscellaneous";
import ExperienceService from "../../service/experience.service";
import { FormatMonthYear } from "../../sourcery/formatters";
import { getErrorMessage } from "../../util/ServerUtil";

const profileStore = useProfile();
const { industries } = storeToRefs(useMiscellaneous());

const toast = useToast();

const processing = ref(false);
const fetching = ref(false);

const open = ref(false);
const isEdit = ref(false);

const userExperience = ref([]);

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

const experience = ref({
  id: null,
  company: "",
  title: "",
  summary: "",
  industry_id: null,
  start_date: "",
  end_date: "",
});

const rules = {
  company: {
    required: helpers.withMessage("Company is required", required),
  },
  title: {
    required: helpers.withMessage("Job role is required", required),
  },
  summary: {
    required: helpers.withMessage("Job summary is required", required),
  },
  industry_id: {
    required: helpers.withMessage("Job industry is required", required),
  },
  start_date: {
    required: helpers.withMessage("Start date is required", required),
  },
};

const v$ = useVuelidate(rules, experience);

async function addExperience() {
  const valid = await v$.value.$validate();
  if (!valid) {
    toast.error(
      "Some required fields are missing. Please enter all required fields"
    );
    return;
  }
  if (valid) {
    processing.value = true;
    ExperienceService.create(experience.value)
      .then(() => {
        toast.success(" Work experience successfully added");
        getUserExperience();
        open.value = false;
        v$.value.$reset();
      })
      .catch((error) => {
        const { data } = error;
        toast.error(getErrorMessage(data));
      })
      .finally(() => {
        processing.value = false;
      });
  }
}

async function updateExperience() {
  const valid = await v$.value.$validate();
  if (!valid) {
    toast.error(
      "Some required fields are missing. Please enter all required fields"
    );
    return;
  }
  if (valid) {
    ExperienceService.update(experience.value, experience.value.id)
      .then(() => {
        toast.success("experience successfully updated");
        getUserExperience();
        open.value = false;
      })
      .catch((error) => {
        const { data } = error;
        toast.error(getErrorMessage(data));
      })
      .finally(() => {
        processing.value = false;
      });
  }
}

function initAdd() {
  open.value = true;
  experience.value.company = "";
  experience.value.title = "";
  experience.value.industry_id = "";
  experience.value.summary = "";
  experience.value.start_date = "";
  experience.value.end_date = "";

  open.value = true;
  isEdit.value = false;
}

function initEdit(data) {
  experience.value.id = data.id;
  experience.value.company = data.company;
  experience.value.title = data.title;
  experience.value.industry_id = data.industry.id;
  experience.value.summary = data.summary;
  experience.value.start_date = data.start_date;
  experience.value.end_date = data.end_date;

  open.value = true;
  isEdit.value = true;
}

function initDelete(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      ExperienceService.delete(id)
        .then(() => {
          getUserExperience();
          toast.success("Work experience successfully deleted");
        })
        .catch((error) => {
          const { data } = error;
          toast.error(getErrorMessage(data));
        })
        .finally(() => {
          fetching.value = false;
        });
    }
  });
}

async function getUserExperience() {
  fetching.value = true;
  ExperienceService.all()
    .then((res) => {
      const { data } = res.data.data;
      userExperience.value = data;
      profileStore.updateExperience(data);
    })
    .catch((error) => {
      const { data } = error;
      toast.error(getErrorMessage(data));
    })
    .finally(() => {
      fetching.value = false;
    });
}

onMounted(() => {
  getUserExperience();
});
</script>
