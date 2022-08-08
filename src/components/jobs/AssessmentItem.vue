<template>
  <div class="px-5 py-4 border rounded-lg shadow-lg" :class="'bg-white border-slate-200'">
      <div class="items-center justify-between space-x-2 space-y-4 md:flex md:space-y-0">
          <!-- Left side -->
          <div class="flex items-start space-x-3 md:space-x-4">
            <div class="mt-1 w-9 h-9 shrink-0">
                <img class="rounded-full w-9 h-9" src="../../assets/images/rainoil-icon.png" width="36" height="36" :alt="'Rainoil ' + item.assesment.job.title" />
            </div>
            <div>
                <h3 class="inline-flex mb-2 text-lg font-semibold text-slate-800">
                  {{ item.assesment.job.title }}
                </h3>
                <div v-html="item.assesment.job.description" class="text-sm"></div>
                <div class="mt-4 text-sm">
                  <span class="font-bold"><i class="mr-2 fa-solid fa-briefcase"></i>{{item.assesment.job.employment_type.name}}</span>
                  <span class="px-2 font-bold">/</span>
                  <span class="font-bold"><i class="mr-2 fa-solid fa-street-view"></i>{{item.assesment.job.is_remote == true ? "Remote Job" : "On Site" }}</span>
                  <span class="px-2 font-bold">/</span>
                  <span class="font-bold"><i class="mr-2 fa-solid fa-location-dot"></i>{{item.assesment.job.city.name }} {{item.assesment.job.city.region.name }} {{item.assesment.job.city.region.country.name }}</span>
                </div>
            </div>
          </div>
          <!-- Right side -->
          <div class="flex items-center pl-10 space-x-4 md:pl-0">
              <router-link class="inline-flex px-6 py-1 mx-3 mb-2 text-sm font-semibold border-2 shadow-lg text-slate-800 border-slate-800" :to="`applicant/assessments/${item.id}`">Start</router-link>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'AssessmentItem',
  props: ['item'],
}
</script>