import type { RouteRecordRaw } from 'vue-router'

export let firstMenu: any = null
export default function increaseRoute(menuTree: any) {
  // 1. 定义一个路由数组存放所有路由对象
  const Routes: RouteRecordRaw[] = []

  // 2. 获取main文件夹下的子文件夹中所有.ts文件也就是存放路由的文件(vite提供的方法)
  // 2.1 添加参数eager: true, 表示立即读取文件, 否则就是懒加载
  const files: Record<string, any> = import.meta.glob('../../router/main/**/*.ts', { eager: true })

  // 3. 保存到Routes中
  for (const key in files) {
    const routeModel = files[key]
    Routes.push(routeModel.default)
  }

  // 4. 根据服务器响应的菜单列表来动态添加路由
  for (const menuData of menuTree) {
    for (const subMenu of menuData.children) {
      // 如果返回的结果中的children中的url === Routes中的path则返回这个路由对象
      const route = Routes.find((item) => item.path === subMenu.url)
      // 类型缩小, 并把匹配到的路由添加到Routes中
      if (route) Routes.push(route)
      // 面包屑需求: 遍历所有菜单为其设置重定向: 当点击第一个面包屑导航的时候(也就是进入到某一个主菜单时), 我们重定向到该主菜单的第一个子菜单, 所以我们只保存一个重定向到Routes中, 一旦if语句中检测到item.path === menuData.url的时候就是遍历到第二个子菜单了就不要取了, 因为重定向若取多个的话会选择最后一个进行重定

      if(!Routes.find(item => item.path === menuData.url)) {
        Routes.push({ path: menuData.url, redirect: subMenu.url ?? '' })
      }
      // 遍历路由菜单找到第一个路由并记录以便登录成功后显示第一个菜单页面
      if (!firstMenu && route) firstMenu = route
    }
  }
  return Routes
}
