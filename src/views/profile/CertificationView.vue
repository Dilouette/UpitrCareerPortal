<template>
  <div v-if="!fetching && userCertifications.length != 0">
    <div class="flex justify-end mb-6">
      <span
        @click="initAdd"
        class="inline-flex justify-center text-sm font-bold text-indigo-600 cursor-pointer"
      > + Add Certification
      </span>
    </div>
    <ul
      role="list"
      class="md:grid md:gap-6 md:grid-cols-3"
    >
      <li
        v-for="certification in userCertifications"
        :key="certification.id"
        class="col-span-1 bg-white divide-y divide-gray-200 rounded-lg shadow-lg"
      >
        <div class="flex items-center justify-between w-full p-6 space-x-6">
          <div class="flex-1 truncate">
            <h3 class="text-sm font-medium text-gray-900 truncate">{{ certification.name }}</h3>
            <p class="mt-1 text-sm text-gray-500 truncate">{{ certification.issuing_institution }}</p>
            <div class="flex items-center space-x-3">
              <span class="flex-shrink-0 inline-block px-4 py-1 text-xs font-medium text-indigo-800 bg-indigo-100 rounded-md">{{ certification.certification_no }}</span>
            </div>

            <p class="mt-1 text-sm text-gray-500 truncate"><i class="mr-1 fa-regular fa-calendar-check"></i>{{FormatMonthYear(certification.issued_date)}} - {{ certification.expires == true ? FormatMonthYear(certification.expiry_date): 'Never Expires'}}</p>
          </div>
          <img class="flex-shrink-0 w-12 h-12" src="../../assets/images/badge.png"/>
        </div>
        <div>
          <div class="flex -mt-px divide-x divide-gray-200">
            <div class="flex flex-1 w-0">
              <a
                @click="initEdit(certification)"
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
                @click="initDelete(certification.id)"
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
    v-if="!fetching && userCertifications.length == 0"
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
    <span class="block mt-2 text-sm font-medium text-gray-900"> Add Certification Details </span>
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
                  > Add New Certification Details </DialogTitle>
                  <div class="mt-2">
                    <div class="py-5 space-y-6 bg-white sm:p-6">
                      <div>
                        <div class="grid grid-cols-6 gap-6">
                          <div class="col-span-6 sm:col-span-6">
                            <label
                              for="postal-code"
                              class="block text-sm font-medium text-gray-700"
                            >Certification Name</label>
                            <input
                              type="text"
                              v-model="certification.name"
                              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <div
                              class="text-red-600"
                              v-for="error of v$.name.$errors"
                              :key="error.$uid"
                            >
                              <div class="text-xs font-bold text-red-600">{{ error.$message }}</div>
                            </div>
                          </div>
                          <div class="col-span-6 sm:col-span-6">
                            <label
                              for="postal-code"
                              class="block text-sm font-medium text-gray-700"
                            >Institution</label>
                            <input
                              type="text"
                              v-model="certification.issuing_institution"
                              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <div
                              class="text-red-600"
                              v-for="error of v$.issuing_institution.$errors"
                              :key="error.$uid"
                            >
                              <div class="text-xs font-bold text-red-600">{{ error.$message }}</div>
                            </div>
                          </div>

                          <div class="col-span-6 sm:col-span-6">
                            <label
                              for="postal-code"
                              class="block text-sm font-medium text-gray-700"
                            >Certification Number</label>
                            <input
                              type="text"
                              v-model="certification.certification_no"
                              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <div
                              class="text-red-600"
                              v-for="error of v$.certification_no.$errors"
                              :key="error.$uid"
                            >
                              <div class="text-xs font-bold text-red-600">{{ error.$message }}</div>
                            </div>
                          </div>

                          <div class="col-span-6 sm:col-span-6">
                            <div class="relative flex items-start">
                              <div class="flex h-5 items-center">
                                <input id="expires" v-model="certification.expires" aria-describedby="expires-description" name="expires" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                              </div>
                              <div class="ml-3 text-sm">
                                <label for="expires" class="font-medium text-gray-700">This certification expires?</label><br>
                                <small id="expires-description" class="text-gray-500">Please select expiry date if certification expires</small>
                              </div>
                            </div>
                          </div>

                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="dob"
                              class="block text-sm font-medium text-gray-700"
                            >Issued Date</label>
                            <Datepicker
                              autoApply
                              v-model="certification.issued_date"
                              :format="format"
                              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                            </Datepicker>
                            <div
                              class="text-red-600"
                              v-for="error of v$.issued_date.$errors"
                              :key="error.$uid"
                            >
                              <div class="text-xs font-bold text-red-600">{{ error.$message }}</div>
                            </div>
                          </div>
                          <div class="col-span-6 sm:col-span-3" v-if="certification.expires">
                            <label
                              for="dob"
                              class="block text-sm font-medium text-gray-700"
                            >Expiry Date</label>
                            <Datepicker
                              autoApply
                              v-model="certification.expiry_date"
                              :format="format"
                              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                            </Datepicker>
                            <div
                              class="text-red-600"
                              v-for="error of v$.expiry_date.$errors"
                              :key="error.$uid"
                            >
                              <div class="text-xs font-bold text-red-600">
                                {{ error.$message }}
                              </div>
                            </div>
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
                  @click="addCertification"
                  :processing="processing"
                  class="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >Add Certification
                </app-button>
                <app-button
                  v-if="isEdit"
                  @click="updateCertification"
                  :processing="processing"
                  class="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >Update Certification
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
import { useToast } from "vue-toastification";
import useVuelidate from "@vuelidate/core";
import { required, requiredIf, helpers } from "@vuelidate/validators";
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
import CertificationService from "../../service/certification.service";
import { getErrorMessage } from "../../util/ServerUtil";
import { FormatMonthYear } from "../../sourcery/formatters";

const toast = useToast();

const processing = ref(false);
const fetching = ref(false);

const open = ref(false);
const isEdit = ref(false);

const userCertifications = ref([]);

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

const certification = ref({
  id: null,
  name: "",
  issuing_institution: "",
  expires: false,
  certification_no: "",
  certification_link: "",
  issued_date: null,
  expiry_date: null,
});

const rules = {
  name: {
    required: helpers.withMessage("Certification name is required", required),
  },
  issuing_institution: {
    required: helpers.withMessage("Issuing institution is required", required),
  },
  certification_no: {
    required: helpers.withMessage("Certification number is required", required),
  },
  issued_date: {
    required: helpers.withMessage("Issued date is required", required),
  },
  expiry_date: {
    required: helpers.withMessage("Expiry date is required if certification expires", requiredIf(()=> { return certification.value.expires==true })),
  },
};

const v$ = useVuelidate(rules, certification);

async function addCertification() {
  const valid = await v$.value.$validate();
  if (!valid) {
    toast.error(
      "Some required fields are missing. Please enter all required fields"
    );
    return;
  }
  if (valid) {
    processing.value = true;
    certification.value.expires == false ?? certification.value.expiry_date == null;
    CertificationService.create(certification.value)
      .then(() => {
        toast.success("Certification successfully added");
        getUserCertification();
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

async function updateCertification() {
  const valid = await v$.value.$validate();
  if (!valid) {
    toast.error(
      "Some required fields are missing. Please enter all required fields"
    );
    return;
  }
  if (valid) {
    processing.value = true;
    certification.value.expires == false ?? certification.value.expiry_date == null;
    CertificationService.update(certification.value, certification.value.id)
      .then(() => {
        toast.success("Certification successfully updated");
        getUserCertification();
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
  certification.value.name = "";
  certification.value.issuing_institution = "";
  certification.value.certification_no = "";
  certification.value.expires = false;
  certification.value.issued_date = null;
  certification.value.expiry_date = null;

  open.value = true;
  isEdit.value = false;
}

function initEdit(data) {
  certification.value.id = data.id;
  certification.value.name = data.name;
  certification.value.issuing_institution = data.issuing_institution;
  certification.value.certification_no = data.certification_no;
  certification.value.expires = data.expires;
  certification.value.issued_date = data.issued_date;
  certification.value.expiry_date = data.expiry_date;

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
      CertificationService.delete(id)
        .then(() => {
          getUserCertification();
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

async function getUserCertification() {
  fetching.value = true;
  CertificationService.all()
    .then((res) => {
      const { data } = res.data.data;
      userCertifications.value = data;
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
  getUserCertification();
});
</script>