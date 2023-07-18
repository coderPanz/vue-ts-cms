import pagePopUp from '@/components/page-pop-up/page-pop-up.vue'
import { ref } from 'vue'

export function pagePopUpHooks() {
  const pagePopUpRef = ref<InstanceType<typeof pagePopUp>>()
  // 3. 点击新建用户按钮弹出新建用户弹窗
  function createBtnClick(isShow: boolean, bool: boolean) {
    pagePopUpRef.value?.isShowExpose(isShow, bool)
  }

  // 4. 点击编辑用户按钮弹出编辑用户弹窗
  function updateBtnClick(isShow: boolean, bool: boolean, id: string) {
    pagePopUpRef.value?.isShowExpose(isShow, bool, id)
  }

  return {
    pagePopUpRef,
    createBtnClick,
    updateBtnClick
  }
}