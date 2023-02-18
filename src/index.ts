type TKey = {
  url: string
  method: string
}
class PendStack {
  public pendingMap: Map<string, AbortController[]>
  constructor() {
    this.pendingMap = new Map()
  }

  public add({ url, method }: TKey): AbortSignal {
    const key = `${url}-${method}`
    const controller = new AbortController()
    const controllerList: AbortController[] = []
    if (this.pendingMap.has(key)) {
      this.pendingMap.get(key)?.push(controller)
    } else {
      controllerList.push(controller)
      this.pendingMap.set(key, controllerList)
    }
    return controller.signal
  }

  public judge({ url, method }: TKey) {
    const key = `${url}-${method}`
    const controllerList = this.pendingMap.get(key)
    if (Array.isArray(controllerList) && controllerList.length > 1) {
      controllerList?.shift()?.abort()
    }
  }

  public remove({ url, method }: TKey) {
    this.pendingMap.delete(`${url}-${method}`)
  }
}

export default new PendStack()
