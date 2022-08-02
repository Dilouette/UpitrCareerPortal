<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-md">
    <h3
        v-if="items.length === 0"
        class="p-8 text-center text-md"
    >No assessment(s) history found</h3>
    <ul v-if="items.length > 0" role="list" class="divide-y divide-gray-200">
      <li v-for="item in items" :key="item.id">
        <a href="#" class="block hover:bg-gray-50">
          <div class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-indigo-600 truncate">
                {{ item.field }}
              </p>
            </div>
            <div class="mt-2 sm:flex sm:justify-between">
              <div class="flex-col sm:flex">
                <p class="flex items-center text-sm text-gray-500">
                  <AcademicCapIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  {{ item.degree }}
                </p>
                <p class="flex items-center mt-2 text-sm text-gray-500 sm:mt-0">
                  <LibraryIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  {{ item.institution }}
                </p>
              </div>
              <div class="flex items-center mt-2 text-sm text-gray-500 sm:mt-0">
                <CalendarIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                <p>
                  From {{FormatMonthYear(item.start_date)}} to {{FormatMonthYear(item.end_date)}}
                </p>
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { AcademicCapIcon, LibraryIcon, CalendarIcon } from '@heroicons/vue/solid';
import { FormatMonthYear } from "../../util/Formatter";
defineProps({
    items: Array
})
</script>