var n = new (class {
  pendingMap
  constructor() {
    this.pendingMap = new Map()
  }
  _add(n) {
    const e = new AbortController(),
      t = []
    return this.pendingMap.has(n) ? this.pendingMap.get(n)?.push(e) : (t.push(e), this.pendingMap.set(n, t)), e.signal
  }
  judge(n) {
    const { url: e, method: t } = n,
      s = `${e}-${t}`
    n.signal = this._add(s)
    const a = this.pendingMap.get(s)
    Array.isArray(a) && a.length > 1 && a?.shift()?.abort()
  }
  remove(n) {
    const { url: e, method: t } = n.config
    this.pendingMap.delete(`${e}-${t}`)
  }
  removeAll() {
    this.pendingMap.forEach((n) => {
      n.shift()?.abort()
    }),
      this.pendingMap.clear()
  }
})()
export { n as default }
