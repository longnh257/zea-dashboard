import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useMainStore } from '@/stores/main.js'

import './css/main.css'
import axios from 'axios'



//axios header
axios.defaults.baseURL = import.meta.env.VITE_APP_API_DEV
axios.defaults.headers.common['Authorization'] = "Bearer: " + localStorage.getItem("access_token")
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true'

// Init Pinia
const pinia = createPinia()

// Create Vue app
createApp(App).use(router).use(pinia).mount('#app')

// Init main store
const mainStore = useMainStore(pinia)

// Fetch sample data
mainStore.fetchSampleClients()
mainStore.fetchSampleHistory()

// Dark mode
// Uncomment, if you'd like to restore persisted darkMode setting, or use `prefers-color-scheme: dark`. Make sure to uncomment localStorage block in src/stores/darkMode.js
// import { useDarkModeStore } from './stores/darkMode'

// const darkModeStore = useDarkModeStore(pinia)

// if (
//   (!localStorage['darkMode'] && window.matchMedia('(prefers-color-scheme: dark)').matches) ||
//   localStorage['darkMode'] === '1'
// ) {
//   darkModeStore.set(true)
// }

// Default title tag
const defaultDocumentTitle = 'Admin One Vue 3 Tailwind'

// Set document title from route meta
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle
})
