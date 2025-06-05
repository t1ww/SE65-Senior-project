import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import About from "@/pages/About.vue";
import Login from "@/pages/Login.vue";
import Logout from "@/pages/Logout.vue";
import Register from "@/pages/Register.vue";
import CreateQuestion from "@/pages/CreateQuestion.vue";
import ViewQuestion from "@/pages/ViewQuestion.vue";

import ViewQuestionsList from "./pages/ViewQuestionsList.vue";
import Lecture from "./pages/Lecture.vue";
import TestCase from "./pages/TestCase.vue";
import Answer from "./pages/Answer.vue";
import Review from "./pages/Review.vue";
import { logout } from "./utils";

const routes = [
  { name: "Home", path: "/", component: Home },
  { name: "About", path: "/about", component: About },
  { name: "Login", path: "/login", component: Login, meta: { hideAuth: true } },
  { name: "Logout", path: "/logout", component: Logout, meta: { requiresAuth: true }},
  {
    name: "Register",
    path: "/register",
    component: Register,
    meta: { hidden: true },
  },
  {
    name: "CreateQuestion",
    path: "/create-question",
    component: CreateQuestion,
  },
  {
    name: "ViewQuestion",
    path: "/view-question/:id",
    component: ViewQuestion,
    meta: { hidden: true },
  },
  {
    name: "ViewQuestionList",
    path: "/view-question-list",
    component: ViewQuestionsList,
  },
  {
    name: "Lecture",
    path: "/lecture",
    component: Lecture,
    meta: { requiresAuth: true, allowedRoles: ["professor"] },
  },
  {
    name: "TestCase",
    path: "/test-case",
    component: TestCase,
    meta: { hidden: true },
  },
  { name: "Answer", path: "/answer", component: Answer },
  { name: "Review", path: "/review", component: Review },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, _from, next) => {
  if (to.path === '/logout') {
    logout()
    return
  }
  next()
})

export default router;
