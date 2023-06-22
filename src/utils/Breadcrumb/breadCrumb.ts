// 用于获取当前父菜单和子菜单所有路由以便进行面包屑的展示
interface Iroutes {
  name: String
  path: String
}
export default function breadCrumb (routeActivePath: string, menuTree: any) {
  // 1. 创建一个数组保存面包屑的路由数组
  const routes: Iroutes[] = []
  for (const menuData of menuTree) {
    for (const subMenuData of menuData.children) {
      if (routeActivePath === subMenuData.url) {
        // 如果活跃的路由=遍历的菜单树的子路由就分别push父菜单和子菜单路由到routes中
        routes.push({ name: menuData.name, path: menuData.url })
        routes.push({ name: subMenuData.name, path: subMenuData.url })
      }
    }
  }
  return routes
}