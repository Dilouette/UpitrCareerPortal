<template>
  <div class="min-h-full">
    <TransitionRoot
      as="template"
      :show="sidebarOpen"
    >
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

        <div class="fixed inset-0 flex z-40">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XIcon
                      class="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex-shrink-0 flex items-center px-4">
                <img
                  class="h-8 w-auto"
                  src="../../assets/images/logo.svg"
                  alt="Upitr logo"
                />
              </div>
              <nav
                class="mt-5 flex-shrink-0 h-full divide-y divide-indigo-800 overflow-y-auto"
                aria-label="Sidebar"
              >
                <div class="px-2 space-y-1">
                  <router-link
                    v-for="item in navigation"
                    :key="item.name"
                    :to="item.href"
                    :class="[item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:text-white hover:bg-indigo-600', 'group flex items-center px-2 py-2 text-base font-medium rounded-md']"
                    :aria-current="item.current ? 'page' : undefined"
                  >
                    <component
                      :is="item.icon"
                      class="mr-4 flex-shrink-0 h-6 w-6 text-indigo-200"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </router-link>
                </div>
              </nav>
            </DialogPanel>
          </TransitionChild>
          <div
            class="flex-shrink-0 w-14"
            aria-hidden="true"
          >
            <!-- Dummy element to force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-indigo-700">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex-1 flex-col flex-grow pt-3 pb-4 overflow-y-auto">
        <div class="flex flex-1 items-center flex-shrink-0 px-4 mb-12">
          <svg
            class="shrink-0 h-8 w-8 text-indigo-300"
            viewBox="0 0 24 24"
          >
            <path
              class="fill-current text-indigo-200"
              d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
            ></path>
            <path
              class="fill-current text-indigo-400"
              d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
            ></path>
          </svg>
          <h2 class="text-white text-3xl font-medium ml-2">recruit<span class="text-indigo-200 font-medium text-3xl">r</span></h2>
        </div>
        <nav
          class="mt-5 flex-1 flex flex-col divide-y divide-indigo-800 overflow-y-auto"
          aria-label="Sidebar"
        >
          <div class="px-2 space-y-1">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              :class="[appStore.pageName == item.tag ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:text-white hover:bg-indigo-600', 'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md']"
              :aria-current="item.current ? 'page' : undefined"
            >
              <component
                :is="item.icon"
                class="mr-4 flex-shrink-0 h-6 w-6 text-indigo-200"
                aria-hidden="true"
              />
              {{ item.name }}
            </router-link>
          </div>
        </nav>
      </div>

      <div class="flex-shrink-0 flex border-t border-indigo-800 p-4">
        <a
          href="#"
          class="flex-shrink-0 w-full group block"
        >
          <div class="flex items-center">
            <div>
              <UserCircleIcon class="w-12 h-12 rounded-full text-white"></UserCircleIcon>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-white group-hover:text-gray-300">{{ userInfo.firstname }} {{ userInfo.lastname }}</p>
              <p class="text-xs font-medium text-white group-hover:text-gray-300">View profile</p>
            </div>
          </div>
        </a>
      </div>
    </div>

    <div class="lg:pl-64 flex flex-col flex-1">
      <div class="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
        <button
          type="button"
          class="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <MenuAlt1Icon
            class="h-6 w-6"
            aria-hidden="true"
          />
        </button>
        <!-- Search bar -->
        <div class="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
          <div class="flex-1 flex items-center">
            <h1 class="
                      text-2xl
                      font-bold
                      leading-7
                      text-gray-900
                      sm:leading-9 sm:truncate
                    ">
              {{appStore.pageTitle}}
            </h1>
          </div>
          <div class="ml-4 flex items-center md:ml-6">
            <button
              type="button"
              class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon
                class="h-6 w-6"
                aria-hidden="true"
              />
            </button>

            <!-- Profile dropdown -->
            <Menu
              as="div"
              class="ml-3 relative"
            >
              <div>
                <MenuButton class="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                  <UserCircleIcon class="w-10 h-10 rounded-full text-indigo-500"></UserCircleIcon>
                  <span class="hidden ml-3 text-gray-700 text-sm font-medium lg:block">{{ userInfo.firstname }} {{ userInfo.lastname }}</span>
                  <ChevronDownIcon
                    class="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                    aria-hidden="true"
                  />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem v-slot="{ active }">
                  <a
                    href="/account/profile"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                  >Profile</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                  <router-link
                    to="#"
                    @click="signUserOut"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
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
    icon: HomeIcon 
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
    icon: QuestionMarkCircleIcon 
  },
];

const appStore = useAppStore();
const { userInfo } = storeToRefs(useAuthentication());

const { signOut } = useAuthentication();

const sidebarOpen = ref(false);

function signUserOut(){
  signOut();
  router.push("/signin");
}


</script>