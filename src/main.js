import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useMainStore } from '@/stores/main.js'
import './css/main.css'
import axios from 'axios'

// Init Pinia
const pinia = createPinia()


//axios header
axios.defaults.baseURL = import.meta.env.VITE_APP_API_DEV
axios.defaults.headers.common['Authorization'] = "Bearer: " + localStorage.getItem("access_token")
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true'


axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response.status === 401) {
      localStorage.removeItem("access_token");
      router.push({ name: 'login', query: { err: 1 } })
  }
  return Promise.reject(error);
});

// Create Vue app
createApp(App).use(router).use(pinia).mount('#app')

// Init main store
const mainStore = useMainStore(pinia)

// Fetch sample data
mainStore.fetchSampleClients()
mainStore.fetchSampleHistory()


// Default title tag
const defaultDocumentTitle = 'ZEA'

// Set document title from route meta
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle
})
