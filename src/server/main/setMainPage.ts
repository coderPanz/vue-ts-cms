/*
 * @Author: qs
 * @Date: 2025-05-08 19:44:14
 * @LastEditTime: 2025-05-08 20:34:43
 * @LastEditors: qs
 * @Description:
 * @FilePath: /vue-ts-cms/src/server/main/setMainPage.ts
 *
 */
import type { ILogin } from '@/types/index'
import { pzrequest } from '../requestPackage'

export async function setMainPage(mainPageName: string, mainPageUrl: string) {
  return pzrequest.post({
    url: `/setMainPage`,
    data: {
      mainPageName,
      mainPageUrl
    }
  })
}


export async function getMainPage() {
  return pzrequest.get({
    url: `/getMainPage`,
  })
}


