import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import dotenv from "dotenv";

// Auth
import { isAuthenticated, getUserData } from '@/store/auth'

// Set Axios base URL
dotenv.config({ path: '.env.dev' });
const BACKEND_PORT = process.env.BACKEND_PORT;

axios.defaults.baseURL = `http://localhost:${BACKEND_PORT}`

const app = createApp(App)

// Provide functions
app.provide('isAuthenticated', isAuthenticated)
app.provide('getUserData', getUserData)

app.use(createPinia())
    .use(router)
    .provide('axios', axios)
    .mount('#app')
