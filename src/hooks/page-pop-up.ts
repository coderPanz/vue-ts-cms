import pagePopUp from '@/components/page-pop-up/page-pop-up.vue'
import { ref } from 'vue'

type backFnType = (data: any) => void
type clearBackShow = () => void

export function pagePopUpHooks(backPermission?: backFnType, clearBackShow?: clearBackShow) {
  const pagePopUpRef = ref<InstanceType<typeof pagePopUp>>()
  // 3. 点击新建用户按钮弹出新建用户弹窗(清空回显)
  function createBtnClick(isShow: boolean, isJudge: boolean, backData: any) {
    pagePopUpRef.value?.isShowExpose(isShow, isJudge)
    if(clearBackShow) clearBackShow()
  }

  // 4. 点击编辑用户按钮弹出编辑用户弹窗(回显操作)
  function updateBtnClick(isShow: boolean, isJudge: boolean, backData: any) {
    pagePopUpRef.value?.isShowExpose(isShow, isJudge, backData)
    if(backPermission) backPermission(backData)
  }

  return {
    pagePopUpRef,
    createBtnClick,
    updateBtnClick
  }
}