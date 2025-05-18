/*
 * @Author: qs
 * @Date: 2024-11-22 16:27:18
 * @LastEditTime: 2025-05-12 23:01:44
 * @LastEditors: qs
 * @Description:
 * @FilePath: /vue-ts-cms/src/hooks/page-pop-up.ts
 *
 */
import pagePopUp from '@/components/page-pop-up/page-pop-up.vue'
import { ref } from 'vue'
import { menuTreeReq } from '@/server/index'
type backFnType = (data: any) => void
type clearBackShow = () => void

export function pagePopUpHooks(backPermission?: backFnType, clearBackShow?: clearBackShow) {
  const pagePopUpRef = ref<InstanceType<typeof pagePopUp>>()
  // 3. 点击新建用户按钮弹出新建用户弹窗(清空回显)
  function createBtnClick(isShow: boolean, isJudge: boolean, backData: any) {
    pagePopUpRef.value?.isShowExpose(isShow, isJudge)
    if (clearBackShow) clearBackShow()
  }

  // 4. 点击编辑用户按钮弹出编辑用户弹窗(回显操作)
  async function updateBtnClick(isShow: boolean, isJudge: boolean, backData: any, role_id: string) {
    pagePopUpRef.value?.isShowExpose(isShow, isJudge, backData)
    if (backPermission) {
      const res = await menuTreeReq(role_id)
      console.log('res', res.data.data)
      console.log('backData', backData)
      backPermission(backData)
    }
  }

  return {
    pagePopUpRef,
    createBtnClick,
    updateBtnClick
  }
}
