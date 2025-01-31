<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, useRouter, useRoute } from "vue-router";
import BackButton from "@/components/BackButton.vue";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();
const router = useRouter();
const route = useRoute();
const id = route.params.id;
const job = ref({});
const isLoading = ref(false);

const deleteJob = async (id) => {
  const confirm = window.confirm(
    "Are you sure you want to delete this job? This action cannot be undone."
  );

  if (confirm) {
    try {
      await axios.delete(`/api/jobs/${id}`);
      toast.success("Job deleted successfully!");
      router.push("/jobs");
    } catch (error) {
      toast.error("Failed to delete job. Please try again.");
      console.error(error);
    }
  }
};
onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await axios.get(`/api/jobs/${id}`);
    job.value = response.data;
    isLoading.value = false;
  } catch (error) {
    console.error(error);
    isLoading.value = false;
  }
});
</script>

<template>
  <BackButton />
  <section class="bg-green-50">
    <div class="container m-auto py-10 px-6">
      <div
        v-if="isLoading"
        class="flex justify-center items-center text-xl font-bold"
      >
        Loading...
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div
            class="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
          >
            <div class="text-gray-500 mb-4">{{ job?.type }}</div>
            <h1 class="text-3xl font-bold mb-4">{{ job?.title }}</h1>
            <div
              class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
            >
              <i class="pi pi-map-marker text-lg text-orange-700 mr-2"></i>
              <p class="text-orange-700">{{ job?.location }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">
              Job Description
            </h3>

            <p class="mb-4">
              {{ job?.description }}
            </p>

            <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

            <p class="mb-4">{{ job?.salary }} / Year</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Company Info -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Company Info</h3>

            <h2 class="text-2xl">{{ job?.company?.name }}</h2>

            <p class="my-2">
              {{ job?.company?.description }}
            </p>

            <hr class="my-4" />

            <h3 class="text-xl">Contact Email:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ job?.company?.contactEmail }}
            </p>

            <h3 class="text-xl">Contact Phone:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ job?.company?.contactPhone }}
            </p>
          </div>

          <!-- Manage -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Job</h3>
            <RouterLink
              :to="'/job/edit/' + job?.id"
              class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >Edit Job</RouterLink
            >
            <button
              @click="deleteJob(job?.id)"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >
              Delete Job
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>
