import Vue from "vue";
import VueRouter from "vue-router";
import About from "../views/About.vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

const routes = [
  {
    path: "/",
    name: "About",
    component: About
  },
  {
    path: "/quiz",
    name: "Quiz",
    component: () => import("../views/Quiz.vue")
  },
  {
    path: "/study",
    name: "Study",
    component: () => import("../views/Study.vue")
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
