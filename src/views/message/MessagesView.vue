<template>
  <main class="flex-1 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="loading" class="space-y-4 w-full">
        <list-skeleton
          class="px-5 py-4 border rounded-lg shadow-lg"
          :class="'bg-white border-slate-200'"
          v-for="n in 10"
          :key="n"
        ></list-skeleton>
      </div>
      <template v-if="!loading">
        <div v-if="serverMessages.data.length === 0" class="w-full">
          <div class="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="mx-auto h-12 w-12 text-gray-400 bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            <span class="mt-2 block text-sm font-medium text-gray-900"> There's nothing here </span>
          </div>
        </div>
        <div v-if="serverMessages.data.length > 0" class="space-y-4">
          <MessageItem
            v-for="message in serverMessages.data"
            :key="message.id"
            :item="message"
          />
        </div>
      </template>
    </div>

    <div class="px-4 pt-0 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="w-full">
        <div
          class="flex items-center justify-between px-4 py-4 bg-white border border-gray-200 rounded-lg shadow-lg sm:px-6"
        >
          <div class="flex justify-between flex-1 sm:hidden">
            <a
              href="#"
              class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              href="#"
              class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Next
            </a>
          </div>
          <div
            class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
          >
            <div>
              <p class="text-sm text-gray-700">
                Showing
                {{ " " }}
                <span class="font-medium">{{ serverMessages.from }}</span>
                {{ " " }}
                to
                {{ " " }}
                <span class="font-medium">{{ serverMessages.to }}</span>
                {{ " " }}
                of
                {{ " " }}
                <span class="font-medium">{{ serverMessages.total }}</span>
                {{ " " }}
                results
              </p>
            </div>
            <div>
              <nav
                :key="link"
                aria-label="Pagination"
                v-for="link in serverMessages.links"
                class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
              >
                <a
                  @click="navigateTo(link.url)"
                  :disabled="link.url === null || loading"
                  :class="
                    link.active
                      ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  "
                  class="cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  {{ formatLabel(link.label) }}
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useMessage } from "../../stores/message";
import MessageItem from "../../components/messages/MessageItem.vue";

const messageStore = useMessage();
const { messages, loading } = storeToRefs(useMessage());

const serverMessages = ref({
  to: 0,
  from: 0,
  total: 0,
  data: [],
  links: [],
  per_page: 0,
  last_page: 0,
  current_page: 0,
  prev_page_url: null,
  next_page_url: null,
  last_page_url: null,
  first_page_url: null,
});

function formatLabel(label) {
  if (label.includes("Prev")) {
    return `<< Previous`;
  }

  if (label.includes("Next")) {
    return "Next >>";
  }

  return label;
}

function navigateTo(link) {
  messageStore.fetchMessagesByUrl(link);
}

watch(() => messages.value, (newValue) => {
  serverMessages.value = newValue
});

onMounted(() => {
  serverMessages.value = messages.value;
})
</script>