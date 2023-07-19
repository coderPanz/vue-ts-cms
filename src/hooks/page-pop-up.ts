import pagePopUp from '@/components/page-pop-up/page-pop-up.vue'
import { ref } from 'vue'

type backFnType = (data: any) => void

export function pagePopUpHooks(backPermission?: backFnType) {
  const pagePopUpRef = ref<InstanceType<typeof pagePopUp>>()
  // 3. 点击新建用户按钮弹出新建用户弹窗
  function createBtnClick(isShow: boolean, isJudge: boolean) {
    pagePopUpRef.value?.isShowExpose(isShow, isJudge)
  }

  // 4. 点击编辑用户按钮弹出编辑用户弹窗(回显操作)
  function updateBtnClick(isShow: boolean, isJudge: boolean, backData: any) {
    if(backPermission) backPermission(backData)
    pagePopUpRef.value?.isShowExpose(isShow, isJudge, backData)
  }

  return {
    pagePopUpRef,
    createBtnClick,
    updateBtnClick
  }
}