<template>
  <main class="flex-1 pb-8">
    <div class="px-4 py-12 mx-auto max-w-9xl sm:px-6 lg:px-6">
      <div class="w-full">
        <div class="mb-12 lg:border-t lg:border-b lg:border-gray-200">
          <nav class="mx-auto" aria-label="Progress">
            <ol
              role="list"
              class="overflow-hidden rounded-md lg:flex lg:border-l lg:border-r lg:border-gray-200 lg:rounded-none"
            >
              <li
                v-for="(tab, tabIdx) in tabs"
                :key="tab.id"
                @click="changeTab(tabIdx)"
                class="relative overflow-hidden lg:flex-1"
              >
                <div
                  :class="[
                    tabIdx === 0 ? 'border-b-0 rounded-t-md' : '',
                    tabIdx === tabs.length - 1 ? 'border-t-0 rounded-b-md' : '',
                    'border border-gray-200 overflow-hidden lg:border-0',
                  ]"
                >
                  <a
                    v-if="tabIdx == tabIndex"
                    :href="tab.href"
                    aria-current="tab"
                  >
                    <span
                      class="absolute top-0 left-0 w-1 h-full bg-indigo-600 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto"
                      aria-hidden="true"
                    />
                    <span
                      :class="[
                        tabIdx !== 0 ? 'lg:pl-9' : '',
                        'px-6 py-5 flex items-start text-sm font-medium',
                      ]"
                    >
                      <span class="flex-shrink-0">
                        <span
                          class="flex items-center justify-center w-10 h-10 border-2 border-indigo-600 rounded-full"
                        >
                          <span class="text-indigo-600">{{ tab.id }}</span>
                        </span>
                      </span>
                      <span class="mt-0.5 ml-4 min-w-0 flex flex-col">
                        <span
                          class="text-xs font-semibold tracking-wide text-indigo-600 uppercase"
                          >{{ tab.name }}</span
                        >
                        <span class="text-sm font-medium text-gray-500">{{
                          tab.description
                        }}</span>
                      </span>
                    </span>
                  </a>
                  <a v-else :href="tab.href" class="group">
                    <span
                      class="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-gray-200 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto"
                      aria-hidden="true"
                    />
                    <span
                      :class="[
                        tabIdx !== 0 ? 'lg:pl-9' : '',
                        'px-6 py-5 flex items-start text-sm font-medium',
                      ]"
                    >
                      <span class="flex-shrink-0">
                        <span
                          class="flex items-center justify-center w-10 h-10 border-2 border-gray-300 rounded-full"
                        >
                          <span class="text-gray-500">{{ tab.id }}</span>
                        </span>
                      </span>
                      <span class="mt-0.5 ml-4 min-w-0 flex flex-col">
                        <span
                          class="text-xs font-semibold tracking-wide text-gray-500 uppercase"
                          >{{ tab.name }}</span
                        >
                        <span class="text-sm font-medium text-gray-500">{{
                          tab.description
                        }}</span>
                      </span>
                    </span>
                  </a>
                  <template v-if="tabIdx !== 0">
                    <!-- Separator -->
                    <div
                      class="absolute inset-0 top-0 left-0 hidden w-3 lg:block"
                      aria-hidden="true"
                    >
                      <svg
                        class="w-full h-full text-gray-300"
                        viewBox="0 0 12 82"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0.5 0V31L10.5 41L0.5 51V82"
                          stroke="currentcolor"
                          vector-effect="non-scaling-stroke"
                        />
                      </svg>
                    </div>
                  </template>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div v-if="tabIndex == 0">
          <div>
            <div class="md:grid md:grid-cols-3 md:gap-6">
              <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    Personal Information
                  </h3>
                  <p class="mt-1 text-sm text-gray-600">
                    Please use accurate information.
                  </p>
                </div>
              </div>
              <div class="mt-5 md:mt-0 md:col-span-2">
                <div>
                  <div class="shadow sm:rounded-md sm:overflow-hidden">
                    <div class="space-y-6 bg-white px-10 py-10">
                      <div>
                        <label class="block text-sm font-medium text-gray-700">
                          Photo
                        </label>
                        <div class="flex items-center mt-1">
                          <span
                            class="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full"
                          >
                            <svg
                              class="w-full h-full text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                              />
                            </svg>
                          </span>
                          <button
                            type="button"
                            class="px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Change
                          </button>
                        </div>
                      </div>

                      <div>
                        <div class="grid grid-cols-6 gap-6">
                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="first-name"
                              class="block text-sm font-medium text-gray-700"
                              >First name</label
                            >
                            <input
                              type="text"
                              v-model="candidate.firstname"
                              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <div
                              class="text-red-600"
                              v-for="error of v$.firstname.$errors"
                              :key="error.$uid"
                            >
                              <div class="text-xs text-red-600">
                                {{ error.$message }}
                              </div>
                            </div>
                          </div>

                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="last-name"
                              class="block text-sm font-medium text-gray-700"
                              >Middle name</label
                            >
                            <input
                              type="text"
                              v-model="candidate.middlename"
                              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <div
                              class="text-red-600"
                              v-for="error of v$.middlename.$errors"
                              :key="error.$uid"
                            >
                              <div class="text-xs text-red-600">
                                {{ error.$message }}
                              </div>
                            </div>
                          </div>

                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="last-name"
                              class="block text-sm font-medium text-gray-700"
                              >Last name</label
                            >
                            <input
                              type="text"
                              v-model="candidate.lastname"
                              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <div
                              class="text-red-600"
                              v-for="error of v$.lastname.$errors"
                              :key="error.$uid"
                            >
                              <div class="text-xs text-red-600">
                                {{ error.$message }}
                              </div>
                            </div>
                          </div>

                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="dob"
                              class="block text-sm font-medium text-gray-700"
                              >Date of birth</label
                            >
                            <Datepicker
                              v-model="candidate.dob"
                              :format="format"
                              autoApply
                              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                            </Datepicker>
                            <div
                              class="text-red-600"
                              v-for="error of v$.dob.$errors"
                              :key="error.$uid"
                            >
                              <div class="text-xs text-red-600">
                                {{ error.$message }}
                              </div>
                            </div>
                          </div>

                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="email-address"
                              class="block text-sm font-medium text-gray-700"
                              >Gender</label
                            >
                            <MultiSelect
                              class="mt-1 border border-gray-300 rounded-md"
                              searchable
                              id="gender"
                              value="id"
                              label="name"
                              valueProp="id"
                              v-model="candidate.gender_id"
                              :options="genders"
                              placeholder="Select gender"
                            >
                            </MultiSelect>
                            <div
                              class="text-red-600"
                              v-for="error of v$.gender_id.$errors"
                              :key="error.$uid"
                            >
                              <div class="text-xs text-red-600">
                                {{ error.$message }}
                              </div>
                            </div>
                          </div>

                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="last-name"
                              class="block text-sm font-medium text-gray-700"
                              >Phone no</label
                            >
                            <input
                              type="text"
                              v-model="candidate.phone"
                              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <div
                              class="text-red-600"
                              v-for="error of v$.phone.$errors"
                              :key="error.$uid"
                            >
                              <div class="text-xs text-red-600">
                                {{ error.$message }}
                              </div>
                            </div>
                          </div>

                          <div class="col-span-6">
                            <div class="flex justify-between">
                              <label
                                for="summary"
                                class="block text-sm font-medium text-gray-700"
                                >Summary</label
                              >
                              <span class="text-sm text-gray-500" id="summary"
                                >{{ summaryCount }}/{{
                                  summaryMax
                                }}</span
                              >
                            </div>
                            <textarea
                              id="summary"
                              name="summary"
                              v-model="candidate.summary"
                              rows="5"
                              :class="
                                summaryCount > summaryMax
                                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                  : ''
                              "
                              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="hidden sm:block" aria-hidden="true">
            <div class="py-5">
              <div class="border-t border-gray-200"></div>
            </div>
          </div>

          <div>
            <div class="md:grid md:grid-cols-3 md:gap-6">
              <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    Location Information
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    Please enter your current address details accurately
                  </p>
                </div>
              </div>
              <div class="mt-5 md:mt-0 md:col-span-2">
                <div>
                  <div class="shadow sm:rounded-md sm:overflow-hidden">
                    <div class="space-y-6 bg-white px-10 py-10">
                      <div>
                        <div class="grid grid-cols-6 gap-6">
                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="country"
                              class="block text-sm font-medium text-gray-700"
                              >Country</label
                            >
                            <MultiSelect
                              class="mt-1"
                              searchable
                              id="country"
                              value="id"
                              label="name"
                              valueProp="id"
                              v-model="candidate.country_id"
                              :options="countries"
                              placeholder="Select country"
                            >
                            </MultiSelect>
                          </div>

                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="region"
                              class="block text-sm font-medium text-gray-700"
                              >State</label
                            >
                            <MultiSelect
                              class="mt-1"
                              searchable
                              id="region"
                              value="id"
                              label="name"
                              valueProp="id"
                              v-model="candidate.region_id"
                              :options="regions"
                              :loading="fetchingRegions"
                              placeholder="Select state"
                            >
                            </MultiSelect>
                          </div>

                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="city"
                              class="block text-sm font-medium text-gray-700"
                              >City</label
                            >
                            <MultiSelect
                              class="mt-1"
                              searchable
                              id="city"
                              value="id"
                              label="name"
                              valueProp="id"
                              v-model="candidate.city_id"
                              :options="cities"
                              :loading="fetchingCities"
                              placeholder="Select city"
                            >
                            </MultiSelect>
                          </div>

                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="postal-code"
                              class="block text-sm font-medium text-gray-700"
                              >Postal code</label
                            >
                            <input
                              type="text"
                              v-model="candidate.zip_code"
                              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>

                          <div class="col-span-6">
                            <label
                              for="street-address"
                              class="block text-sm font-medium text-gray-700"
                              >Street address</label
                            >
                            <textarea
                              rows="5"
                              v-model="candidate.address"
                              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="hidden sm:block" aria-hidden="true">
            <div class="py-5">
              <div class="border-t border-gray-200"></div>
            </div>
          </div>

          <div>
            <div class="md:grid md:grid-cols-3 md:gap-6">
              <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    Current Job Information
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    Please enter your current job information accurately.
                  </p>
                </div>
              </div>
              <div class="mt-5 md:mt-0 md:col-span-2">
                <div>
                  <div class="shadow sm:rounded-md sm:overflow-hidden">
                    <div class="space-y-6 bg-white px-10 py-10">
                      <div>
                        <div class="grid grid-cols-6 gap-6">
                          <div class="col-span-6 sm:col-span-6">
                            <label
                              for="headline"
                              class="block text-sm font-medium text-gray-700"
                              >Headline <small> Type in a skill and hit enter. To enter multiple skills</small></label
                            >
                            <input
                              type="text"
                              v-model="candidate.headline"
                              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                          <div class="col-span-6 sm:col-span-6">
                            <label
                              for="country"
                              class="block text-sm font-medium text-gray-700"
                              >Skills</label
                            >
                            <MultiSelect
                              searchable
                              mode="tags"
                              v-model="skills"
                              placeholder="add a skill"
                              label="name"
                              :options="skills"
                              :create-option="true"
                            ></MultiSelect>
                          </div>

                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="industries"
                              class="block text-sm font-medium text-gray-700"
                              >Current Industry</label
                            >
                            <MultiSelect
                              class="mt-1"
                              searchable
                              id="industries"
                              value="id"
                              label="name"
                              valueProp="id"
                              v-model="candidate.industry_id"
                              :options="industries"
                              placeholder="Select current industry"
                            >
                            </MultiSelect>
                          </div>

                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="job_functions"
                              class="block text-sm font-medium text-gray-700"
                              >Current Job Function</label
                            >
                            <MultiSelect
                              class="mt-1"
                              searchable
                              id="job_functions"
                              value="id"
                              label="name"
                              valueProp="id"
                              v-model="candidate.job_function_id"
                              :options="jobFunctions"
                              placeholder="Select current job function"
                            >
                            </MultiSelect>
                          </div>

                          <div class="col-span-6 sm:col-span-3">
                            <label
                              for="postal-code"
                              class="block text-sm font-medium text-gray-700"
                              >Years Of Experience</label
                            >
                            <input
                              type="number"
                              name="years_of_experience"
                              id="years_of_experience"
                              v-model="candidate.years_of_experience"
                              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end mt-6">
            <app-button
              @click="updateProfile"
              :processing="processing"
              class="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Profile
            </app-button>
          </div>
        </div>

        <div v-if="tabIndex == 1">
          <education-view></education-view>
        </div>

        <div v-if="tabIndex == 2">
          <experience-view></experience-view>
        </div>
      </div>
    </div>
  </main>
  <div class="py-8 mx-auto max-w-7xl"></div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { useMiscellaneous } from "../../stores/miscellaneous";
import { useAuthentication } from "@/stores/authentication.js";
import MiscService from "../../service/miscellaneous.service";
import AccountService from "../../service/account.service";
import EducationView from "./EducationView.vue";
import ExperienceView from "./ExperienceView.vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { FormatDate } from "../../util/Formatter";
import { getErrorMessage } from "../../util/ServerUtil";

const toast = useToast();

const tabs = [
  {
    id: "01",
    name: "General Information",
    description: "Personal, location, work info",
    href: "#",
    status: "current",
  },
  {
    id: "02",
    name: "Education",
    description: "Education history",
    href: "#",
    status: "upcoming",
  },
  {
    id: "03",
    name: "Experiences",
    description: "Work experience",
    href: "#",
    status: "upcoming",
  },
];

const { countries, industries, jobFunctions } = storeToRefs(useMiscellaneous());

const summaryMax = 512;
const tabIndex = ref(0);
const summaryCount = ref(0);
const skills = ref([]);
const cities = ref([]);
const regions = ref([]);
const processing = ref(false);
const fetchingRegions = ref(false);
const fetchingCities = ref(false);

const genders = ref([
  { id: 1, name: "Male" },
  { id: 0, name: "Female" },
]);

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

const candidate = ref({
  firstname: "",
  middlename: "",
  lastname: "",
  dob: "",
  gender_id: "",
  phone: "",
  headline: "",
  country_id: "",
  region_id: "",
  city_id: "",
  zip_code: "",
  address: "",
  summary: "",
  skills: [],
  industry_id: "",
  job_function_id: "",
  years_of_experience: "",
});

const rules = {
  firstname: {
    required: helpers.withMessage("First name is required", required),
  },
  middlename: {
    required: helpers.withMessage("Middle name is required", required),
  },
  lastname: {
    required: helpers.withMessage("Last name is required", required),
  },
  dob: { required: helpers.withMessage("Date of birth is required", required) },
  gender_id: { required: helpers.withMessage("Gender is required", required) },
  phone: {
    required: helpers.withMessage("Phone number is required", required),
  },
};

const { userInfo } = storeToRefs(useAuthentication());

const v$ = useVuelidate(rules, candidate);

const { fetchUserProfile } = useAuthentication();

async function updateProfile() {
  const valid = await v$.value.$validate();
  if (!valid) {
    toast.error("All fields are required. Please enter missing fields");
    return;
  }

  if (candidate.value.summary.length > summaryMax) {
    toast.error("Summary must not be greater than 512 characters");
    return;
  }

  if (valid) {
    candidate.value.dob = FormatDate(candidate.value.dob, "YYYY-MM-DD");
    if (skills.value.length > 0) {
      candidate.value.skills = skills.value.join();
    } else {
      toast.error("Provide at least one skill");
      return;
    }

    processing.value = true;

    AccountService.updateProfile(candidate.value)
      .then(() => {
        // const { data } = res.data;
        // setUserInfo(candidate.value);
        fetchUserProfile();
        toast.success("Profile successfully updated");
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

function changeTab(index) {
  tabIndex.value = index;
}

function setProfileDetails() {
  try {
    candidate.value.firstname = userInfo.value.firstname;
    candidate.value.middlename = userInfo.value.middlename;
    candidate.value.lastname = userInfo.value.lastname;
    candidate.value.dob = userInfo.value.dob;
    candidate.value.phone = userInfo.value.phone;
    candidate.value.headline = userInfo.value.headline || "";
    candidate.value.gender_id = userInfo.value.gender_id;
    candidate.value.country_id =
      userInfo.value.city != null
        ? userInfo.value.city.region.country.id
        : null;
    candidate.value.region_id =
      userInfo.value.city != null ? userInfo.value.city.region.id : null;
    candidate.value.city_id =
      userInfo.value.city != null ? userInfo.value.city.id : null;
    candidate.value.zip_code = userInfo.value.zip_code;
    candidate.value.address = userInfo.value.address;
    candidate.value.summary = userInfo.value.summary;
    candidate.value.skills =
      userInfo.value.skills !== null ? userInfo.value.skills.split(",") : [];
    candidate.value.industry_id =
      userInfo.value.industry != null ? userInfo.value.industry.id : null;
    candidate.value.job_function_id =
      userInfo.value.job_function != null
        ? userInfo.value.job_function.id
        : null;
    candidate.value.years_of_experience = userInfo.value.years_of_experience;
    skills.value = candidate.value.skills;
  } catch (error) {
    console.log(
      "🚀 ~ file: ProfileView.vue ~ line 765 ~ setProfileDetails ~ error",
      error
    );
  }
}

onMounted(() => {
  setProfileDetails();
});

watch(
  () => candidate.value.country_id,
  (newValue) => {
    if (newValue === null) return;
    regions.value = [];
    const id = Number(newValue);
    fetchingRegions.value = true;
    MiscService.getRegions(id)
      .then((result) => {
        regions.value = result.data.data;
      })
      .finally(() => {
        fetchingRegions.value = false;
      });
  }
);

watch(
  () => candidate.value.region_id,
  (newValue) => {
    if (newValue === null) return;
    cities.value = [];
    const id = Number(newValue);
    fetchingCities.value = true;
    MiscService.getCities(id)
      .then((result) => {
        cities.value = result.data.data;
      })
      .finally(() => {
        fetchingCities.value = false;
      });
  }
);

watch(
  () => candidate.value.summary,
  (newValue) => {
    if (newValue === null) return;
    summaryCount.value = newValue.length;
  }
);
</script>
