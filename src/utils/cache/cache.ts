/*
 * @Author: qs
 * @Date: 2024-11-22 16:27:18
 * @LastEditTime: 2025-01-01 22:35:51
 * @LastEditors: qs
 * @Description:
 * @FilePath: /vue-ts-cms/src/utils/cache/cache.ts
 *
 */
class cacheOperate {
  storage: Storage

  constructor(type: Storage) {
    this.storage = type === localStorage ? localStorage : sessionStorage
  }
  setCache(key: string, value: any) {
    try {
      this.storage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('设置缓存失败:', error)
    }
  }
  getCache(key: string) {
    try {
      const value = this.storage.getItem(key)
      if (value !== null && value !== undefined) {
        return JSON.parse(value)
      } else {
        return console.log('token为空, 请登录!')
      }
    } catch (error) {
      console.error('获取缓存失败:', error)
    }
  }

  removeCache(key: string) {
    try {
      this.storage.removeItem(key)
    } catch (error) {
      console.error('移除缓存失败:', error)
    }
  }
  clearCache() {
    try {
      this.storage.clear()
    } catch (error) {
      console.error('清除缓存失败:', error)
    }
  }
}

const localIns = new cacheOperate(localStorage)
const sessionIns = new cacheOperate(sessionStorage)

export { localIns, sessionIns }
