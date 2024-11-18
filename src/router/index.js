import HomeView from "@/views/HomeView.vue";
import JobAddView from "@/views/JobAddView.vue";
import JobEditView from "@/views/JobEditView.vue";
import JobsView from "@/views/JobsView.vue";
import JobView from "@/views/JobView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/jobs",
      name: "jobs",
      component: JobsView,
    },
    {
      path: "/jobs/:id",
      name: "job",
      component: JobView,
    },
    {
      path: "/job/add",
      name: "job-add",
      component: () => JobAddView,
    },
    {
      path: "/job/edit/:id",
      name: "job-edit",
      component: () => JobEditView,
    },
    {
      path: "/:catchAll(.*)*",
      name: "NotFound",
      component: () => NotFoundView,
    },
  ],
});

export default router;
