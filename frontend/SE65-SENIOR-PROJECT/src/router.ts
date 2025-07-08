import { createRouter, createWebHistory } from "vue-router";

// Importing all page components
import Home from "@/pages/Home.vue";
import About from "@/pages/About.vue";
import Login from "@/pages/auth/Login.vue";
import Logout from "@/pages/auth/Logout.vue";
import UploadStudent from "@/pages/lecture/UploadStudent.vue";
import CreateQuestion from "@/pages/lecture/create_question/CreateQuestion.vue";
import ViewQuestion from "@/pages/questions/ViewQuestion.vue";

import ViewQuestionsList from "@/pages/questions/ViewQuestionsList.vue";
import Lecture from "@/pages/Lecture.vue";
import TestCase from "@/pages/lecture/create_question/TestCase.vue";
import Review from "@/pages/lecture/Review.vue";
import ViewTest from "@/pages/ViewTest.vue";
import EditQuestion from "@/pages/lecture/EditQuestion.vue";
import EditTestCase from "@/pages/lecture/EditTestCase.vue";
import ViewStudentsList from "./pages/lecture/ViewStudentsList.vue";

/**
 * Meta Field Usage:
 *
 * - hidden:         Exclude the route from the navigation bar completely.
 * - hideAuth:       Hide route from navbar if user is already authenticated (e.g., login page).
 * - requiresAuth:   Route is only accessible when the user is logged in.
 * - allowedRoles:   Restrict access to users with specific roles (e.g., professors only).
 */
const routes = [
  // Root / home
  { name: "Home", path: "/", component: Home, meta: { hidden: true } },
  
  // Credit
  { name: "About", path: "/about", component: About, meta: { hidden: true } },
  
  // Auth
  { name: "Login", path: "/login", component: Login, meta: { hideAuth: true } },
  { name: "Logout", path: "/logout", component: Logout, meta: { requiresAuth: true } },
  {
    name: "UploadStudent",
    path: "/upload-student",
    component: UploadStudent,
    meta: { hidden: true },
  },
  {
    name: "ViewStudents",
    path: "/view-students",
    component: ViewStudentsList,
    meta: { hidden: true },
  },

  // Lecturer's navigation page
  {
    name: "Lecture",
    path: "/lecture",
    component: Lecture,
    meta: { requiresAuth: true, allowedRoles: ["professor"] },
  },
  
  // Create questions
  {
    name: "CreateQuestion",
    path: "/create-question",
    component: CreateQuestion,
  },
  {
    name: "TestCase",
    path: "/test-case",
    component: TestCase,
    meta: { hidden: true },
  },

  // View questions and submission
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

  // Review and edit questions
  { name: "Review", path: "/review", component: Review, meta: { hidden: true } },
  { name: "ViewTest", path: "/view-test", component: ViewTest, meta: { hidden: true } },
  { name: "EditQuestion", path: "/edit-question", component: EditQuestion, meta: { hidden: true } },
  { name: "EditTestCase", path: "/edit-test-case", component: EditTestCase, meta: { hidden: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
