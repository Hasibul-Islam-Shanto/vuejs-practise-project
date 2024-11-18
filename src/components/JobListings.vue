<script setup>
import Job from "./Job.vue";
import { ref, defineProps, onMounted } from "vue";
import { RouterLink } from "vue-router";
import axios from "axios";

const jobs = ref([]);
const isLoading = ref(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await axios.get("/api/jobs");
    jobs.value = response.data;
    isLoading.value = false;
  } catch (error) {
    console.error(error);
    isLoading.value = false;
  }
});

defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <section class="bg-blue-50 px-10 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Browse Jobs
      </h2>
    </div>
    <div
      v-if="isLoading"
      class="w-full flex justify-center items-center text-2xl"
    >
      <span>Loading...</span>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Job v-for="job in jobs.slice(0, limit)" :key="job.id" :job="job" />
    </div>
  </section>
  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
      to="/jobs"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >View All Jobs</RouterLink
    >
  </section>
</template>
