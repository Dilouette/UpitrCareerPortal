<template>
  <div v-if="!fetching && userEducation.length != 0">
    <div class="flex justify-end mb-6">
      <span
        @click="initAdd"
        class="inline-flex cursor-pointer justify-center text-sm font-bold text-indigo-600"
      > + Add Education
      </span>
    </div>
    <ul
      role="list"
      class="md:grid md:gap-6 md:grid-cols-3"
    >
      <li
        v-for="education in userEducation"
        :key="education.id"
        class="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
      >
        <div class="w-full flex items-center justify-between p-6 space-x-6">
          <div class="flex-1 truncate">
            <h3 class="text-gray-900 text-sm font-medium truncate">{{ education.institution }}</h3>
            <p class="mt-1 text-gray-500 text-sm truncate">{{ education.education_level.name }}</p>
            <div class="flex items-center space-x-3">
              <p class="mt-1 text-gray-500 text-sm truncate">{{ education.field }}</p>
              <span class="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">{{ education.degree_classification }}</span>
            </div>

            <p class="mt-1 text-gray-500 text-sm truncate"><i class="fa-regular fa-calendar-check mr-1"></i>{{FormatMonthYear(education.start_date)}} - {{FormatMonthYear(education.end_date)}}</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-10 h-10 rounded-full flex-shrink-0 bi bi-mortarboard"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5ZM8 8.46 1.758 5.965 8 3.052l6.242 2.913L8 8.46Z" />
            <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46l-3.892-1.556Z" />
          </svg>
        </div>
        <div>
          <div class="-mt-px flex divide-x divide-gray-200">
            <div class="w-0 flex-1 flex">
              <a
                @click="initEdit(education)"
                class="cursor-pointer relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
              >
                <PencilAltIcon
                  class="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
                <span class="ml-3">Edit</span>
              </a>
            </div>
            <div class="-ml-px w-0 flex-1 flex">
              <a
                @click="initDelete(education.id)"
                class="cursor-pointer relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
              >
                <TrashIcon
                  class="w-5 h-5 text-red-400"
                  aria-hidden="true"
                />
                <span class="ml-3 text-red-400">Delete</span>
              </a>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>

  <button
    v-if="!fetching && userEducation.length == 0"
    @click="initAdd"
    type="button"
    class="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="mx-auto h-12 w-12 text-gray-400 bi bi-mortarboard"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5ZM8 8.46 1.758 5.965 8 3.052l6.242 2.913L8 8.46Z" />
      <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46l-3.892-1.556Z" />
    </svg>
    <span class="mt-2 block text-sm font-medium text-gray-900"> Add Education Details </span>
  </button>

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
                  > Add New Education Details </DialogTitle>
                  <div class="mt-2">
                    <div class="py-5 bg-white space-y-6 sm:p-6">
                      <div>
                        <div class="grid grid-cols-6 gap-6">
                          <div class="col-span-6 sm:col-span-6">
                            <label
                              for="postal-code"
                              class="block text-sm font-medium text-gray-700"
                            >Institution</label>
                            <input
                              type="text"
                              v-model="education.institution"
                              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                            <div
                              class="text-red-600"
                              v-for="error of v$.institution.$errors"
                              :key="error.$uid"
                            >
                              <div class="text-red-600 text-xs font-bold">{{ error.$message }}</div>
                            </div>
                          </div>
                          <div class="col-span-6 sm:col-span-6">
                            <label
                              for="postal-code"
                              class="block text-sm font-medium text-gray-700"
                            >Degree Type</label>
                            <MultiSelect
                              class="mt-1"
                              searchable
                              id="degreeClass"
                              value="id"
                              label="name"
                              valueProp="id"
                              v-model="education.education_level_id"
                              :options="educationLevels"
                              placeholder="Select degree class"
                            >
                            </MultiSelect>
                            <div
                              class="text-red-600"
                              v-for="error of v$.education_level_id.$errors"
                              :key="error.$uid"
                            >
                              <div class="text-red-600 text-xs font-bold">{{ error.$message }}</div>
                            </div>
                          </div>
                          <div class="col-span-6 sm:col-span-6">
                            <label
                              for="postal-code"
                              class="block text-sm font-medium text-gray-700"
                            >Field Of Study</label>
                            <input
                              type="text"
                              v-model="education.field"
                              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          <div
                            class="text-red-600"
                            v-for="error of v$.field.$errors"
                            :key="error.$uid"
                          >
                            <div class="text-red-600 text-xs font-bold">{{ error.$message }}</div>
                          </div>
                          <div class="col-span-6 sm:col-span-6">
                            <label
                              for="degreeClass"
                              class="block text-sm font-medium text-gray-700"
                            >Degree Grade</label>
                            <MultiSelect
                              class="mt-1"
                              searchable
                              id="degreeClass"
                              v-model="education.degree_classification_id"
                              value="value"
                              label="name"
                              valueProp="value"
                              :options="degreeClassifications"
                              placeholder="Select degree class"
                            >
                            </MultiSelect>
                            <div
                              class="text-red-600"
                              v-for="error of v$.degree_classification_id.$errors"
                              :key="error.$uid"
                            >
                              <div class="text-red-600 text-xs font-bold">{{ error.$message }}</div>
                            </div>
                          </div>
                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="dob"
                              class="block text-sm font-medium text-gray-700"
                            >Start Date</label>
                            <Datepicker
                              v-model="education.start_date"
                              :format="format"
                              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            >
                            </Datepicker>
                            <div
                              class="text-red-600"
                              v-for="error of v$.start_date.$errors"
                              :key="error.$uid"
                            >
                              <div class="text-red-600 text-xs font-bold">{{ error.$message }}</div>
                            </div>
                          </div>
                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="dob"
                              class="block text-sm font-medium text-gray-700"
                            >End Date</label>
                            <Datepicker
                              v-model="education.end_date"
                              :format="format"
                              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            >
                            </Datepicker>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-3 mb-3 px-6 sm:mt-4 sm:flex sm:flex-row-reverse">
                <app-button
                  v-if="!isEdit"
                  @click="addEducation"
                  :processing="processing"
                  class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >Add Education
                </app-button>
                <app-button
                  v-if="isEdit"
                  @click="updateEducation"
                  :processing="processing"
                  class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >Update Education
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
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import Swal from "sweetalert2";
import { useMiscellaneous } from "../../stores/miscellaneous";
import EducationService from "../../service/education.service";
import { FormatMonthYear } from "../../sourcery/formatters";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

import { TrashIcon, PencilAltIcon } from "@heroicons/vue/solid";

import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const { educationLevels, degreeClassifications } = storeToRefs(
  useMiscellaneous()
);

const toast = useToast();

const processing = ref(false);
const fetching = ref(false);

const open = ref(false);
const isEdit = ref(false);

const userEducation = ref([]);

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

const education = ref({
  id: null,
  institution: "",
  field: "",
  degree: "",
  education_level_id: "",
  degree_classification_id: "",
  start_date: "",
  end_date: "",
});

const rules = {
  institution: {
    required: helpers.withMessage("Institution is required", required),
  },
  field: {
    required: helpers.withMessage("Field of study is required", required),
  },
  education_level_id: {
    required: helpers.withMessage("Degree obtained is required", required),
  },
  degree_classification_id: {
    required: helpers.withMessage("Degree grade is required", required),
  },
  start_date: {
    required: helpers.withMessage("Start date is required", required),
  },
};

const v$ = useVuelidate(rules, education);

async function addEducation() {
  const valid = await v$.value.$validate();
  if (!valid) {
    toast.error(
      "Some required fields are missing. Please enter all required fields"
    );
    return;
  }
  if (valid) {
    processing.value = true;
    let selectedLevel = educationLevels.value.find(
      (level) => level.id === education.value.education_level_id
    );
    education.value.degree = selectedLevel.name;

    EducationService.create(education.value)
      .then(() => {
        toast.success("Education successfully added");
        getUserEducation();
        open.value = false;
      })
      .catch((err) => {
        console.log(err);
        toast.error("An unexpected exception occured");
      })
      .finally(() => {
        processing.value = false;
      });
  }
}

async function updateEducation() {
  const valid = await v$.value.$validate();
  if (!valid) {
    toast.error(
      "Some required fields are missing. Please enter all required fields"
    );
    return;
  }
  if (valid) {
    processing.value = true;
    let selectedLevel = educationLevels.value.find(
      (level) => level.id === education.value.education_level_id
    );
    education.value.degree = selectedLevel.name;

    EducationService.update(education.value, education.value.id)
      .then(() => {
        toast.success("Education successfully updated");
        getUserEducation();
        open.value = false;
      })
      .catch((err) => {
        console.log(err);
        toast.error("An unexpected exception occured");
      })
      .finally(() => {
        processing.value = false;
      });
  }
}

function initAdd() {
  open.value = true;
  education.value.institution = "";
  education.value.field = "";
  education.value.degree = "";
  education.value.degree_classification_id = "";
  education.value.start_date = "";
  education.value.end_date = "";

  open.value = true;
  isEdit.value = false;
}

function initEdit(data) {
  education.value.id = data.id;
  education.value.institution = data.institution;
  education.value.field = data.field;
  education.value.education_level_id = data.education_level.id;
  education.value.degree_classification_id = data.degree_classification_id;
  education.value.start_date = data.start_date;
  education.value.end_date = data.end_date;

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
      EducationService.delete(id)
        .then(() => {
          getUserEducation();
          toast.success(
            "Education successfully deleted"
          );
        })
        .catch((err) => {
          console.log(err);
          toast.error(
            "Could not fetch your education details at the moment please referesh page"
          );
        })
        .finally(() => {
          fetching.value = false;
        });
    }
  });
}

async function getUserEducation() {
  fetching.value = true;
  EducationService.all()
    .then((res) => {
      const { data } = res.data.data;
      userEducation.value = data;
    })
    .catch((err) => {
      console.log(err);
      toast.error(
        "Could not fetch your education details at the moment please referesh page"
      );
    })
    .finally(() => {
      fetching.value = false;
    });
}

onMounted(() => {
  getUserEducation();
});
</script>