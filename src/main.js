import { createApp } from 'vue';
import { createPinia, storeToRefs } from 'pinia';
import { vue3Debounce } from 'vue-debounce';
import VueCountdown from '@chenfengyuan/vue-countdown';
import Toast from 'vue-toastification';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import SideBar from './components/layout/SideBar.vue';
import TextArea from './components/forms/TextArea.vue';
import FormInput from './components/forms/FormInput.vue';
import TextInputGroup from './components/forms/TextInputGroup.vue';
import PasswordInput from './components/forms/PasswordInput.vue';
import TagInput from "./components/forms/TagInput.vue";
import AppButton from './components/forms/AppButton.vue';
import IconButton from './components/forms/IconButton.vue';
import AutoComplete from './components/forms/AutoComplete.vue';
import SelectInput from './components/forms/SelectInput.vue';
import CancelButton from './components/forms/CancelButton.vue';
import AppModal from './components/commons/modal/AppModal.vue';
import CoreService from  './service/core.service';

import { VTooltip, Tooltip } from 'floating-vue';
import 'floating-vue/dist/style.css';

import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import Multiselect from '@vueform/multiselect';
import "@vueform/multiselect/themes/default.css";

import Datepicker from '@vuepic/vue-datepicker';

import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import DetailSkeleton from './components/loaders/DetailSkeleton.vue';
import ListSkeleton from './components/loaders/ListSkeleton.vue';

import timeago from 'vue-timeago3'
import { useAppStore } from './stores/app';
import { useAuthentication } from "./stores/authentication";
import "vue-toastification/dist/index.css";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const swalOptions = {
    confirmButtonColor: '#1D4ED8',
  };

import App from './App.vue';
import router from './router';

CoreService.init();

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(VueSweetalert2, swalOptions);
app.use(VueLoading, {
    color: 'blue'
});


const options = {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true
};
app.use(Toast, options);

const timeagoOptions = {
    converterOptions: {
        includeSeconds: false,
    }
  }  
app.use(timeago, timeagoOptions);

app.component('SideBar', SideBar);
app.component('TextArea', TextArea);
app.component('FormInput', FormInput);
app.component('AppButton', AppButton);
app.component('IconButton', IconButton);
app.component('SelectInput', SelectInput);
app.component('AutoComplete', AutoComplete);
app.component('CancelButton', CancelButton);
app.component('PasswordInput', PasswordInput);
app.component('TextInputGroup', TextInputGroup);
app.component('DatePicker', Datepicker);
app.component("TagInput", TagInput);
app.component('QuillEditor', QuillEditor);
app.component('MultiSelect', Multiselect);
app.component('AppModal', AppModal);
app.component('VTooltip', Tooltip);
app.component(VueCountdown.name, VueCountdown);

app.component('DetailSkeleton', DetailSkeleton);
app.component('ListSkeleton', ListSkeleton);

app.directive('debounce', vue3Debounce({ lock: true}));
app.directive('tooltip', VTooltip);
const appStore = useAppStore();
const { isAuthenticated } = storeToRefs(useAuthentication());

router.beforeEach((to, from, next) =>
{
    if (to.meta?.pageTitle) {
        document.title = to.meta?.pageTitle;
        appStore.setPageTitle(to.meta?.pageTitle);
    }
    appStore.setPageName(to.name);
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated.value) {
        next({ name: "Signin" });
    } else {
        next();
    }  
})

app.mount('#app');
