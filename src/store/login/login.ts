import { defineStore } from 'pinia'
import { postLoginRequest, menuTreeReq } from '@/server/index'
import type { ILogin } from '@/types/index'
import { localIns } from '@/utils/cache/cache'
import router from '@/router'
import increaseRoute from '@/utils/Dynamic-Route/Dynamic-Route'

// 指定state中的数据类型
interface IState {
  token: String
  localMenuTree: any
}

const useLoginStore = defineStore('login', {
  state: (): IState => ({
    token: '',
    localMenuTree: null // 不要一开始初始化一个空数组, 否则会变为二维数组
  }),
  actions: {
    async fetchgetBackInfos(account: ILogin) {
      try {
        const res = await postLoginRequest(account)
        // 封装工具进行本地缓存
        localIns.setCache('token', res.data.token)
        this.token = res.data.token
        // 1. 获取角色id
        const role_id = res.data.id
        // 2. 通过角色id获取菜单树
        const menuTreeData = await menuTreeReq(role_id)
        localIns.setCache('localMenuTree', menuTreeData.data.data)
        this.localMenuTree = menuTreeData.data.data

        // 登录成功后显示main页面前动态添加路由
        increaseRoute(menuTreeData.data.data)
        // // 4. 跳转页面
        router.push('/main')
      } catch (error) {
        console.error()
      }
    },
    refreshLoadRoute() {
      const token = localIns.getCache('token')
      const localMenuTree = localIns.getCache('localMenuTree')
      if (token && localMenuTree) {
        this.token = token
        this.localMenuTree = localMenuTree

        // 在登录后刷新页面时再次动态添加路由
        const Routes = increaseRoute(localMenuTree)
        Routes.forEach(item => {
          router.addRoute('main', item)
        })
      }
    }
  }
})

export default useLoginStore
