import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// Auth
import { isAuthenticated, getUserData } from '@/store/auth'

// Set Axios base URL
axios.defaults.baseURL = 'http://localhost:5000'

const app = createApp(App)

// Provide functions
app.provide('isAuthenticated', isAuthenticated)
app.provide('getUserData', getUserData)

app.use(createPinia())
    .use(router)
    .provide('axios', axios)
    .mount('#app')
