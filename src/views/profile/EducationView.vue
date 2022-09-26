<template>
  <div v-if="!fetching && userEducation.length != 0">
    <div class="flex justify-end mb-6">
      <span
        @click="initAdd"
        class="inline-flex justify-center text-sm font-bold text-indigo-600 cursor-pointer"
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
        class="col-span-1 bg-white divide-y divide-gray-200 rounded-lg shadow-lg"
      >
        <div class="flex items-center justify-between w-full p-6 space-x-6">
          <div class="flex-1 truncate">
            <h3 class="text-sm font-medium text-gray-900 truncate">{{ education.institution }}</h3>
            <p class="mt-1 text-sm text-gray-500 truncate">{{ education.education_level.name }}</p>
            <div class="flex items-center space-x-3">
              <p class="mt-1 text-sm text-gray-500 truncate">{{ education.field }}</p>
              <span class="flex-shrink-0 inline-block px-4 py-1 text-xs font-medium text-indigo-800 bg-indigo-100 rounded-full">{{ education.degree_classification }}</span>
            </div>

            <p class="mt-1 text-sm text-gray-500 truncate"><i class="mr-1 fa-regular fa-calendar-check"></i>{{FormatMonthYear(education.start_date)}} - {{FormatMonthYear(education.end_date)}}</p>
          </div>
          <img class="flex-shrink-0 w-12 h-12" src="../../assets/images/education.png"/>
        </div>
        <div>
          <div class="flex -mt-px divide-x divide-gray-200">
            <div class="flex flex-1 w-0">
              <a
                @click="initEdit(education)"
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
                @click="initDelete(education.id)"
                class="relative inline-flex items-center justify-center flex-1 w-0 py-4 text-sm font-medium text-gray-700 border border-transparent rounded-br-lg cursor-pointer hover:text-gray-500"
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
    class="relative block w-full p-12 text-center border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-12 h-12 mx-auto text-gray-400 bi bi-mortarboard"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5ZM8 8.46 1.758 5.965 8 3.052l6.242 2.913L8 8.46Z" />
      <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46l-3.892-1.556Z" />
    </svg>
    <span class="block mt-2 text-sm font-medium text-gray-900"> Add Education Details </span>
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
                  > Add New Education Details </DialogTitle>
                  <div class="mt-2">
                    <div class="py-5 space-y-6 bg-white sm:p-6">
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
                              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <div
                              class="text-red-600"
                              v-for="error of v$.institution.$errors"
                              :key="error.$uid"
                            >
                              <div class="text-xs font-bold text-red-600">{{ error.$message }}</div>
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
                              <div class="text-xs font-bold text-red-600">{{ error.$message }}</div>
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
                              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                          <div
                            class="text-red-600"
                            v-for="error of v$.field.$errors"
                            :key="error.$uid"
                          >
                            <div class="text-xs font-bold text-red-600">{{ error.$message }}</div>
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
                              <div class="text-xs font-bold text-red-600">{{ error.$message }}</div>
                            </div>
                          </div>
                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="dob"
                              class="block text-sm font-medium text-gray-700"
                            >Start Date</label>
                            <Datepicker
                              autoApply
                              v-model="education.start_date"
                              :format="format"
                              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                            </Datepicker>
                            <div
                              class="text-red-600"
                              v-for="error of v$.start_date.$errors"
                              :key="error.$uid"
                            >
                              <div class="text-xs font-bold text-red-600">{{ error.$message }}</div>
                            </div>
                          </div>
                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="dob"
                              class="block text-sm font-medium text-gray-700"
                            >End Date</label>
                            <Datepicker
                              autoApply
                              v-model="education.end_date"
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
                  @click="addEducation"
                  :processing="processing"
                  class="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >Add Education
                </app-button>
                <app-button
                  v-if="isEdit"
                  @click="updateEducation"
                  :processing="processing"
                  class="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >Update Education
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
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import Swal from "sweetalert2";
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
import { useProfile } from "../../stores/profile";
import { useMiscellaneous } from "../../stores/miscellaneous";
import EducationService from "../../service/education.service";
import { getErrorMessage } from "../../util/ServerUtil";
import { FormatMonthYear } from "../../sourcery/formatters";

const profileStore = useProfile();
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

async function getUserEducation() {
  fetching.value = true;
  EducationService.all()
    .then((res) => {
      const { data } = res.data.data;
      userEducation.value = data;
      profileStore.updateEducation(data);
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
  getUserEducation();
});
</script>