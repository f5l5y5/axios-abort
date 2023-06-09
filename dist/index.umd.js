!(function (e, n) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = n())
    : 'function' == typeof define && define.amd
    ? define(n)
    : ((e = 'undefined' != typeof globalThis ? globalThis : e || self).abort = n())
})(this, function () {
  'use strict'
  return new (class {
    pendingMap
    constructor() {
      this.pendingMap = new Map()
    }
    _add(e) {
      const n = new AbortController(),
        t = []
      return this.pendingMap.has(e) ? this.pendingMap.get(e)?.push(n) : (t.push(n), this.pendingMap.set(e, t)), n.signal
    }
    judge(e) {
      const { url: n, method: t } = e,
        i = `${n}-${t}`
      e.signal = this._add(i)
      const s = this.pendingMap.get(i)
      Array.isArray(s) && s.length > 1 && s?.shift()?.abort()
    }
    remove(e) {
      const { url: n, method: t } = e.config
      this.pendingMap.delete(`${n}-${t}`)
    }
    removeAll() {
      this.pendingMap.forEach((e) => {
        e.shift()?.abort()
      }),
        this.pendingMap.clear()
    }
  })()
})
