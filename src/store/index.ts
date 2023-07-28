import { createPinia } from 'pinia'
import useLoginStore from '@/store/login/login'
import type { App } from 'vue'
const pinia = createPinia()

function registerRoute(app: App) {
  app.use(pinia)
  const loginStore = useLoginStore()
  loginStore.refreshLoadRoute()
}


export default registerRoute
