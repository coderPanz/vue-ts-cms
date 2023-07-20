/**
 *
 * @param menuTree 菜单树
 * @returns 返回按钮权限的数组
 */
export default function mapMenuForPermission(menuTree: any[]) {
  // 使用递归导出用户按钮权限
  let btnPermissionList: string[] = []
  function recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      if(item.type === 3) {
        btnPermissionList.push(item.permission)
      } else {
        recurseGetPermission(item.children ?? []) // 防止后端没有设置item.children时为空的情况
      }
    }
  }
  recurseGetPermission(menuTree)
  return btnPermissionList
}