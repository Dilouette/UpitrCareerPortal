<template>
  <div class="shadow-lg rounded-lg border px-5 py-4" :class="'bg-white border-slate-200'">
      <div class="md:flex justify-between items-center space-y-4 md:space-y-0 space-x-2">
          <!-- Left side -->
          <div class="flex items-start space-x-3 md:space-x-4">
              <div>
                  <h3 class="inline-flex text-lg font-semibold text-slate-800 mb-2">{{ item.subject }}</h3>
                  <div class="text-sm text-slate-500 font-semibold italic whitespace-nowrap mb-2"><i class="fa-solid fa-calendar-day mr-1"></i> Date: {{FormatLongDate(item.created_at)}} </div>
              </div>
          </div>
          <!-- Right side -->
          <div class="flex items-center space-x-4 pl-10 md:pl-0">
              <button @click="toggleShow" class="inline-flex text-sm font-semibold mx-3 px-6 py-1 text-slate-800 mb-2 shadow-lg border-2 border-slate-800">View</button>
          </div>
      </div>
  </div>
  <TransitionRoot
    as="template"
    :show="open"
  >
    <Dialog
      as="div"
      class="relative z-10"
      @close="toggleShow"
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
                  > {{ item.subject }} </DialogTitle>
                  <div class="mt-2">
                    <div class="py-2 space-y-2 bg-white sm:px-6">
                      <div>
                        {{ item.body }}
                      </div>
                    </div>
                  </div>
                  <div class="mt-1">
                    <div class="py-2 bg-white sm:px-6">
                      <div class="text-sm text-slate-500 font-semibold italic whitespace-nowrap"><i class="fa-solid fa-calendar-day mr-1"></i> Date: {{FormatLongDate(item.created_at)}} </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-6 mt-3 mb-3 sm:mt-4 sm:flex sm:flex-row-reverse">
                <!-- <app-button
                  @click="apply"
                  :processing="processing"
                  class="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >Apply
                </app-button> -->
                <button
                  type="button"
                  class="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:w-auto sm:text-sm"
                  @click="toggleShow"
                >Ok</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from "vue";
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
import { FormatLongDate } from "../../util/Formatter";

defineProps({
  item: Object
})

const open = ref(false);

function toggleShow() {
  open.value = !open.value
}
</script>