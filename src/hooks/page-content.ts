import pageContent from '@/components/page-content/page-content.vue'
import { ref } from 'vue'

export function pageContentHooks() {
  // 一 page-content组件的操作
  // 1. 重置 --- 获取content组件实例调用相关方法, 重置user列表
  const pageContentRef = ref<InstanceType<typeof pageContent>>()
  function resetDataList() {
    pageContentRef.value?.getPageList()
  }
  // 2. 查询 ---- 从子组件中获取查询条件并调用请求函数查询数据
  function queryDataList(formData: any) {
    pageContentRef.value?.getPageList(formData)
  }
  // 3. 若新建用户成功则重新获取用户列表
  function reGetDataList() {
    pageContentRef.value?.getPageList()
  }

  return {
    pageContentRef,
    resetDataList,
    queryDataList,
    reGetDataList
  }
}