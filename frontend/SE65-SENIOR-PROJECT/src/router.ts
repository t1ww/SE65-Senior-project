import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import About from '@/pages/About.vue';
import Login from '@/pages/Login.vue';
import Register from '@/pages/Register.vue';
import CreateQuestion from '@/pages/CreateQuestion.vue';
import ViewQuestion from '@/pages/ViewQuestion.vue';

import ViewQuestionsList from './pages/ViewQuestionsList.vue';
import Lecture from './pages/Lecture.vue'
import TestCase from './pages/TestCase.vue'


const routes = [
  { name: 'Home', path: '/', component: Home },
  { name: 'About', path: '/about', component: About },
  { name: 'Login', path: '/login', component: Login, meta: { hideAuth: true } },
  { name: 'Register', path: '/register', component: Register, meta: { hidden: true } },
  { name: 'CreateQuestion', path: '/create-question', component: CreateQuestion },
  { name: 'ViewQuestion', path: '/view-question/:id', component: ViewQuestion, meta: { hidden: true } },
  { name: 'ViewQuestionList', path: '/view-question-list', component: ViewQuestionsList },
  { name: 'Lecture', path: '/lecture', component: Lecture, meta: { requiresAuth: true, allowedRoles: ['professor'] } },
  { name: 'TestCase', path: '/test-case', component: TestCase, meta: { hidden: true } },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
