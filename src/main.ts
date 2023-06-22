import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.less'
import router from './router'
import store from './store'
// 针对ElMessage和ElLoading样式的引入
import 'element-plus/theme-chalk/el-message.css'
import registerIcons from './global/register-icons'

// 先动态添加路由(先挂载pinia)后再把vue-router进行挂载到应用上面(后挂载router)
createApp(App).use(store).use(router).use(registerIcons).mount('#app')
