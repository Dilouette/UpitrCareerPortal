<template>

  <!-- Tabs -->
  <div>
    <div class="sm:hidden">
      <label
        for="tabs"
        class="sr-only"
      >Select a tab</label>
      <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <select
        id="tabs"
        name="tabs"
        class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
      >
        <option
          v-for="tab in tabs"
          :key="tab.name"
          :selected="tab.current"
        >{{ tab.name }}</option>
      </select>
    </div>
    <div class="hidden sm:block">
      <nav
        class="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
        aria-label="Tabs"
      >
        <a
          v-for="(tab, tabIdx) in tabs"
          @click="changeTab(tabIdx)"
          :key="tab.name"
          :href="tab.href"
          :class="[tabIdx == tabIndex ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700', tabIdx === 0 ? 'rounded-l-lg' : '', tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '', 'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10']"
          :aria-current="tab.current ? 'page' : undefined"
        >
          <span>{{ tab.name }}</span>
          <span
            aria-hidden="true"
            :class="[tabIdx == tabIndex ? 'bg-indigo-500' : 'bg-transparent', 'absolute inset-x-0 bottom-0 h-0.5']"
          ></span>
        </a>
      </nav>
    </div>
  </div>

  <div v-if="tabIndex == 0">

  </div>

  <div v-if="tabIndex == 1">

  </div>

</template>

<script setup>
import { ref } from "vue";
var tabIndex = ref(0);
const tabs = [
  { name: "Job Details", href: "#", current: true },
  { name: "Apply For Job", href: "#", current: false },
];
function changeTab(tabIdx) {
  tabIndex.value = tabIdx;
}
</script>