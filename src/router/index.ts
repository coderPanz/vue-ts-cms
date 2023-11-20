import { localIns } from '@/utils/cache/cache'
import { createRouter, createWebHashHistory } from 'vue-router'
import { firstMenu } from '@/utils/Dynamic-Route/Dynamic-Route'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue'),
      children: []
    },
    // 404路由
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/404/not-found.vue')
    }
  ]
})

// 路由守卫
router.beforeEach((to) => {
  const token = localIns.getCache('token')
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
  if(to.path === '/main/system' && token) {
    return '/main'
  }
  // 登陆成功后默认进入到第一个菜单显示第一个页面
  if (to.path === '/main' && token) {
    return firstMenu.path
  }
})
export default router
