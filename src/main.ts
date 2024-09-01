import { createApp } from 'vue'
import './style.css'

// ui
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";

// store
import { createPinia } from 'pinia'


// router
// import { router } from './router'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(createVuestic())
app.mount('#app')
