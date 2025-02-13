import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// Set Axios base URL
axios.defaults.baseURL = 'http://localhost:5000'

createApp(App)
  .use(createPinia())
  .use(router)
  .provide('axios', axios)
  .mount('#app')
