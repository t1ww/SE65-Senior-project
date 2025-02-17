import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// utils
import { isLoggedIn, getUserData } from './utils'

// Set Axios base URL
axios.defaults.baseURL = 'http://localhost:5000'

const app = createApp(App)
// GET userData
app.config.globalProperties.$isLoggedIn = isLoggedIn
app.config.globalProperties.$getUserData = getUserData

app.use(createPinia())
.use(router)
.provide('axios', axios)
.mount('#app')

