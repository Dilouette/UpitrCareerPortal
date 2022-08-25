<template>
    <div class="relative flex w-full flex-wrap items-stretch mb-3">
        <span class="z-10 h-full leading-snug font-normal absolute text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
            <i class="fas fa-lock"></i>
        </span>
        <input v-bind="attrs" :type="visible == true ? 'text' : 'password'" :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg-white shadow rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full px-10"/>
        <span @click="toggle()" class="z-10 h-full cursor-pointer leading-snug font-normal absolute text-center text-slate-500 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
            <i :class="visible == true ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
        </span>    
    </div>
</template>
<script setup>
import { useAttrs, ref } from "vue";

const attrs = useAttrs();
defineProps({
    modelValue: [String, Number],
    error: {
        type: Boolean,
        required: false,
        default: false
    },
})

var visible = ref(false);

function toggle() {
    visible.value = !visible.value;
}
</script>