import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios'

class PendStack {
  public pendingMap: Map<string, AbortController[]>
  constructor() {
    this.pendingMap = new Map()
  }

  _add(key: string): AbortSignal {
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

  public judge(config: InternalAxiosRequestConfig) {
    const { url, method } = config
    const key = `${url}-${method}`
    // create AbortController
    config.signal = this._add(key)
    const controllerList = this.pendingMap.get(key)
    if (Array.isArray(controllerList) && controllerList.length > 1) {
      controllerList?.shift()?.abort()
    }
  }

  public remove(response: AxiosResponse) {
    const { url, method } = response.config
    this.pendingMap.delete(`${url}-${method}`)
  }

  public removeAll() {
    this.pendingMap.forEach((controllerList) => {
      controllerList.shift()?.abort()
    })
    this.pendingMap.clear()
  }
}

export default new PendStack()
