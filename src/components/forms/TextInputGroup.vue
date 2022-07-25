<template>
  <div class="relative flex w-full border-0 p-0 flex-wrap items-stretch mb-3">
    <span
      v-if="leadingIcon"
      class="z-10 h-full leading-snug font-normal absolute text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
    >
      <i :class="leadingIcon"></i>
    </span>
    <input
      v-bind="$attrs"
      class="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border border-slate-300 shadow outline-none focus:outline-none focus:ring w-full"
      :class="leadingIcon != null ? 'pl-10' : '' + ' ' + trailingIcon != null ? 'pr-10' : ''"
    />
    <span
      v-if="trailingIcon"
      class="z-10 h-full leading-snug font-normal absolute text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3"
    >
      <i :class="trailingIcon"></i>
    </span>
  </div>
</template>
<script setup>
defineProps({
  leadingIcon: String,
  trailingIcon: String,
  value: {
    type: String,
    default: "",
  },
});
</script>