import { defineStore } from 'pinia'
import { postLoginRequest, menuTreeReq } from '@/server/index'
import type { ILogin } from '@/types/index'
import { localIns } from '@/utils/cache/cache'
import router from '@/router'
import increaseRoute from '@/utils/Dynamic-Route/Dynamic-Route'
import mapMenuForPermission from '@/utils/mapMenuForPermission/mapMenuForPermission'

// 指定state中的数据类型
interface IState {
  token: String
  localMenuTree: any
  localPermissionList: string[]
}

const useLoginStore = defineStore('login', {
  state: (): IState => ({
    token: '',
    localMenuTree: null, // 不要一开始初始化一个空数组, 否则会变为二维数组
    localPermissionList: []
  }),
  actions: {
    async fetchgetBackInfos(account: ILogin) {
      try {
        const res = await postLoginRequest(account)
        if (res.data.token) {
          // 封装工具进行本地缓存
          localIns.setCache('token', res.data.token)
          this.token = res.data.token
          // 1. 获取角色id
          const roleId = res.data.id
          localIns.setCache('roleId', roleId) // 在admin的store中会用到, 先缓存起来
          console.log(roleId)
          // 2. 通过角色id获取菜单树
          const menuTreeData = await menuTreeReq(roleId)
          localIns.setCache('localMenuTree', menuTreeData.data.data)
          this.localMenuTree = menuTreeData.data.data

          // 3. 获取用户按钮权限并缓存
          const userBtnPermissionList = mapMenuForPermission(this.localMenuTree)
          this.localPermissionList = userBtnPermissionList
          console.log(userBtnPermissionList)

          // 4. 登录成功后显示main页面前动态添加路由
          increaseRoute(menuTreeData.data.data)

          // 5. 跳转页面
          router.push('/main')

          return res
        } else {
          // 返回res信息作登录失败提示
          return res
        }
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
        Routes.forEach((item) => {
          router.addRoute('main', item)
        })

         // 登录成功后刷新时缓存用户按钮权限
         const userBtnPermissionList = mapMenuForPermission(this.localMenuTree)
         this.localPermissionList = userBtnPermissionList
      } else {
        return
      }
    }
  }
})

export default useLoginStore
