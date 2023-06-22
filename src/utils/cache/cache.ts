class cacheOperate {
  storage: Storage

  constructor(type: Storage) {
    this.storage = type === localStorage ? localStorage : sessionStorage
  }
  setCache(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value))
  }
  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value !== null && value !== undefined) {
      return JSON.parse(value)
    }
  }

  removeCache(key: string) {
    this.storage.removeItem(key)
  }
  clearCache() {
    this.storage.clear()
  }
}

const localIns = new cacheOperate(localStorage)
const sessionIns = new cacheOperate(sessionStorage)

export { localIns, sessionIns }
