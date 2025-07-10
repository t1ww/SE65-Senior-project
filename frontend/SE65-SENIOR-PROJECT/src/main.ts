import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// Auth
import { isAuthenticated, getUserData } from '@/stores/auth'

// Set Axios base URL
axios.defaults.baseURL = import.meta.env.VITE_API_BASE

const app = createApp(App)

// Provide functions
app.provide('isAuthenticated', isAuthenticated)
app.provide('getUserData', getUserData)

app.use(createPinia())
    .use(router)
    .provide('axios', axios)
    .provide('coderunnerBase', import.meta.env.VITE_CODERUNNER_BASE)
    .mount('#app')
