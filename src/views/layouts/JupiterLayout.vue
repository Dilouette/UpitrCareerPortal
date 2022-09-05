<template>
  <div class="min-h-full">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="relative z-40 lg:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-indigo-700"
            >
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute top-0 right-0 pt-2 -mr-12">
                  <button
                    type="button"
                    class="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XIcon class="w-6 h-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex items-center flex-shrink-0 px-4">
                <img
                  class="w-auto h-8"
                  src="../../assets/images/logo.png"
                  alt="Rainoil logo"
                />
              </div>
              <nav
                class="flex-shrink-0 h-full mt-5 overflow-y-auto divide-y divide-indigo-800"
                aria-label="Sidebar"
              >
                <div class="px-2 space-y-1">
                  <router-link
                    v-for="item in navigation"
                    :key="item.name"
                    :to="item.href"
                    :class="[
                      item.current
                        ? 'bg-indigo-800 text-white'
                        : 'text-indigo-100 hover:text-white hover:bg-indigo-600',
                      'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                    ]"
                    :aria-current="item.current ? 'page' : undefined"
                  >
                    <component
                      :is="item.icon"
                      class="flex-shrink-0 w-6 h-6 mr-4 text-indigo-200"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </router-link>
                </div>
              </nav>
            </DialogPanel>
          </TransitionChild>
          <div class="flex-shrink-0 w-14" aria-hidden="true">
            <!-- Dummy element to force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div
      class="hidden bg-indigo-700 lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0"
    >
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex-col flex-1 flex-grow pt-3 pb-4 overflow-y-auto">
        <div class="flex items-center flex-1 flex-shrink-0 px-4 mb-12">
          <img
            class="mx-auto w-100"
            src="../../assets/images/light-logo.png"
            alt="Rainoil logo"
          />
        </div>
        <nav
          class="flex flex-col flex-1 mt-5 overflow-y-auto divide-y divide-indigo-800"
          aria-label="Sidebar"
        >
          <div class="px-2 space-y-1">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              :class="[
                appStore.pageName == item.tag
                  ? 'bg-indigo-800 text-white'
                  : 'text-indigo-100 hover:text-white hover:bg-indigo-600',
                'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md',
              ]"
              :aria-current="item.current ? 'page' : undefined"
            >
              <component
                :is="item.icon"
                class="flex-shrink-0 w-6 h-6 mr-4 text-indigo-200"
                aria-hidden="true"
              />
              {{ item.name }}
            </router-link>
          </div>
        </nav>
      </div>

      <div class="flex flex-shrink-0 p-4 border-t border-indigo-800">
        <a href="#" class="flex-shrink-0 block w-full group">
          <div class="flex items-center">
            <div>
              <UserCircleIcon
                class="w-12 h-12 text-white rounded-full"
              ></UserCircleIcon>
            </div>
            <div class="ml-3">
              <p
                class="text-sm font-medium text-white group-hover:text-gray-300"
              >
                {{ userInfo.firstname }} {{ userInfo.lastname }}
              </p>
              <a
                href="/account/profile"
                class="text-xs font-medium text-white group-hover:text-gray-300"
                >View profile</a
              >
            </div>
          </div>
        </a>
      </div>
    </div>

    <div class="flex flex-col flex-1 lg:pl-64">
      <div
        class="relative z-10 flex flex-shrink-0 h-16 bg-white border-b border-gray-200 lg:border-none"
      >
        <button
          type="button"
          class="px-4 text-gray-400 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <MenuAlt1Icon class="w-6 h-6" aria-hidden="true" />
        </button>
        <!-- Search bar -->
        <div
          class="flex justify-between flex-1 px-4 sm:px-6 lg:max-w-9xl lg:mx-auto lg:px-8"
        >
          <div class="flex items-center flex-1">
            <h1
              class="text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate"
            >
              {{ appStore.pageTitle }}
            </h1>
          </div>
          <div class="flex items-center ml-4 md:ml-6">
            <button
              type="button"
              class="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="w-6 h-6" aria-hidden="true" />
            </button>

            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton
                  class="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50"
                >
                  <UserCircleIcon
                    class="w-10 h-10 text-indigo-500 rounded-full"
                  ></UserCircleIcon>
                  <span
                    class="hidden ml-3 text-sm font-medium text-gray-700 lg:block"
                    >{{ userInfo.firstname }} {{ userInfo.lastname }}</span
                  >
                  <ChevronDownIcon
                    class="flex-shrink-0 hidden w-5 h-5 ml-1 text-gray-400 lg:block"
                    aria-hidden="true"
                  />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem v-slot="{ active }">
                    <a
                      href="/account/settings"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      >Settings</a
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      href="/account/profile"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      >Profile</a
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <router-link
                      to="#"
                      @click="signUserOut"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                    >
                      Sign Out
                    </router-link>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/stores/app.js";
import { useAuthentication } from "@/stores/authentication.js";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  BellIcon,
  HomeIcon,
  MenuAlt1Icon,
  QuestionMarkCircleIcon,
  BriefcaseIcon,
  XIcon,
  ChatIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
} from "@heroicons/vue/outline";

const router = useRouter();

const navigation = [
  {
    name: "Home",
    tag: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Profile",
    tag: "Profile",
    href: "/account/profile",
    icon: UserCircleIcon,
  },
  {
    name: "Jobs",
    tag: "Jobs",
    href: "/account/jobs",
    icon: BriefcaseIcon,
  },
  {
    name: "Applied",
    tag: "Applied",
    href: "/account/jobs/applied",
    icon: PaperAirplaneIcon,
  },
  {
    name: "Messages",
    tag: "Messages",
    href: "/account/messages",
    icon: ChatIcon,
  },
  {
    name: "Assessments",
    tag: "Assessments",
    href: "/account/assessments",
    icon: QuestionMarkCircleIcon,
  },
];

const appStore = useAppStore();
const { userInfo } = storeToRefs(useAuthentication());

const { signOut } = useAuthentication();

const sidebarOpen = ref(false);

function signUserOut() {
  signOut();
  router.push("/signin");
}
</script>
