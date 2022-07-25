<template>
  <textarea
    v-bind="$attr"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
  ></textarea>
</template>

<script setup>
defineProps({
  modelValue: String
})

</script>

<style></style>
