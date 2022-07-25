<template>
  <!-- <input
    v-bind="$attrs"
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
  /> -->
  <div class="mt-1 relative rounded-md shadow-sm">
    <input
      v-bind="$attrs"
      type="text"
      :class="[!error ? 'text-input' : 'text-input-error']"
      aria-invalid="true"
      aria-describedby="error"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div
      v-if="error"
      class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
    >
      <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
    </div>
  </div>
</template>

<script setup>
import { ExclamationCircleIcon } from '@heroicons/vue/solid';

defineProps({
  modelValue: [String, Number],
  error: Boolean,
});

</script>

<style></style>
