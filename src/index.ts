class PendStack {
	private pendingMap: Map<string, AbortController[]> | Map<any, any>
	constructor() {
		this.pendingMap = new Map()
	}

	public add({ url, method }: TKey): AbortSignal {
		const key = `${url}-${method}`
		const controller = new AbortController()
		const controllerList: AbortController[] = []
		if (this.pendingMap.has(key)) {
			this.pendingMap.get(key).push(controller)
		} else {
			controllerList.push(controller)
			this.pendingMap.set(key, controllerList)
		}
		return controller.signal
	}

	public judge({ url, method }: TKey) {
		const key = `${url}-${method}`
		const controllerList = this.pendingMap.get(key)
		if (controllerList.length > 1) {
			controllerList[0].abort()
			controllerList.shift()
		}
	}

	public remove({ url, method }: TKey) {
		this.pendingMap.delete(`${url}-${method}`)
	}
}

export default new PendStack()
