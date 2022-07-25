<template>
  <div class="shadow-lg rounded-lg border px-5 py-4" :class="'bg-white border-slate-200'">
      <div class="md:flex justify-between items-center space-y-4 md:space-y-0 space-x-2">
          <!-- Left side -->
          <div class="flex items-start space-x-3 md:space-x-4">
              <div class="w-9 h-9 shrink-0 mt-1">
                  <img class="w-9 h-9 rounded-full" src="../../assets/images/rainoil-icon.png" width="36" height="36" :alt="'Rainoil ' + item.title" />
              </div>
              <div>
                  <h3 class="inline-flex text-lg font-semibold text-slate-800 mb-2">{{ item.title }}</h3>
                  <div class="text-sm text-slate-500 font-semibold italic whitespace-nowrap mb-2"><i class="fa-solid fa-calendar-day mr-1"></i> Deadline <timeago :datetime="item.deadline"/></div>
                  <div v-html="item.description" class="text-sm"></div>
                  <div class="text-sm mt-4">
                    <span class="font-bold"><i class="fa-solid fa-briefcase mr-2"></i>{{item.employment_type.name}}</span>
                    <span class="font-bold px-2">/</span>
                    <span class="font-bold"><i class="fa-solid fa-street-view mr-2"></i>{{item.is_remote == true ? "Remote Job" : "On Site" }}</span>
                    <span class="font-bold px-2">/</span>
                    <span class="font-bold"><i class="fa-solid fa-location-dot mr-2"></i>{{item.city.name }} {{item.city.region.name }} {{item.city.region.country.name }}</span>
                  </div>
              </div>
          </div>
          <!-- Right side -->
          <div class="flex items-center space-x-4 pl-10 md:pl-0">
              <router-link class="inline-flex text-sm font-semibold mx-3 px-6 py-1 text-slate-800 mb-2 shadow-lg border-2 border-slate-800" :to="`/account/jobs/detail/${item.id}`">Apply</router-link>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'JobListItem',
  props: ['item'],
}
</script>