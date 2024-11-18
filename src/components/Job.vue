<script setup>
import { defineProps, computed, ref } from "vue";
import { RouterLink } from "vue-router";
const props = defineProps({
  job: {
    type: Object,
  },
});

const showFullDescription = ref(false);

const toggleDescription = () => {
  showFullDescription.value = !showFullDescription.value;
};

const truncatedDescription = computed(() => {
  if (showFullDescription.value) {
    return props.job.description;
  } else {
    return props.job.description.slice(0, 90) + "...";
  }
});
</script>

<template>
  <div class="bg-white rounded-xl shadow-md relative">
    <div class="p-4">
      <div class="mb-6">
        <div class="text-gray-600 my-2">{{ props.job.type }}</div>
        <h3 class="text-xl font-bold">{{ props.job.title }}</h3>
      </div>

      <div class="mb-5">
        <div>{{ truncatedDescription }}</div>
        <button
          class="text-green-500 hover:text-green-600"
          @click="toggleDescription"
        >
          {{ showFullDescription ? "Read Less" : "Read More" }}
        </button>
      </div>

      <h3 class="text-green-500 mb-2">{{ props.job.salary }} / Year</h3>

      <div class="border border-gray-100 mb-5"></div>

      <div class="flex flex-col lg:flex-row justify-between mb-4">
        <div class="text-orange-700 mb-3">
          <i class="pi pi-map-marker text-orange-700"></i>
          {{ props.job.location }}
        </div>
        <RouterLink
          :to="'/jobs/' + props.job.id"
          class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
          Read More
        </RouterLink>
      </div>
    </div>
  </div>
</template>
