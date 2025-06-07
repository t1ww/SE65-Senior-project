import { createRouter, createWebHistory } from "vue-router";

// Importing all page components
import Home from "@/pages/Home.vue";
import About from "@/pages/About.vue";
import Login from "@/pages/Login.vue";
import Logout from "@/pages/Logout.vue";
import Register from "@/pages/Register.vue";
import CreateQuestion from "@/pages/CreateQuestion.vue";
import ViewQuestion from "@/pages/ViewQuestion.vue";

import ViewQuestionsList from "@/pages/ViewQuestionsList.vue";
import Lecture from "@/pages/Lecture.vue";
import TestCase from "@/pages/TestCase.vue";
import Review from "@/pages/Review.vue";
import ViewTest from "@/pages/ViewTest.vue";
import EditQuestion from "@/pages/EditQuestion.vue";
import EditTestCase from "@/pages/EditTestCase.vue";

/**
 * Meta Field Usage:
 *
 * - hidden:         Exclude the route from the navigation bar completely.
 * - hideAuth:       Hide route from navbar if user is already authenticated (e.g., login page).
 * - requiresAuth:   Route is only accessible when the user is logged in.
 * - allowedRoles:   Restrict access to users with specific roles (e.g., professors only).
 */
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
  { name: "Review", path: "/review", component: Review },
  { name: "ViewTest", path: "/view-test", component: ViewTest },
  { name: "EditQuestion", path: "/edit-question", component: EditQuestion },
  { name: "EditTestCase", path: "/edit-test-case", component: EditTestCase },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
