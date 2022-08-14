import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import 'material-icons/iconfont/material-icons.css'
import '/@/assets/styles/all.scss'

const app = createApp(App)
app.use(router).mount('#app')
