import { createApp } from 'vue'
import './style.css'


import App from './App.vue'
import database from './database/database'
import router from './router/router'
import { createPinia } from 'pinia'


const app = createApp(App)
const pinia = createPinia()

app.use(database)
app.use(router)
app.use(pinia)

app.mount('#app')
