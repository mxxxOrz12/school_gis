import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import baiduMap from 'vue3-baidu-map-gl'


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(baiduMap, {
    ak: 'AdULSMyfEC8Pph0F80zIPH9H4jP1uUtk',
    plugins: ['TrackAnimation']
})


app.use(createPinia())
app.use(router)

app.use(ElementPlus)

app.mount('#app')
