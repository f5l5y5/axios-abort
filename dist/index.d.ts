import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
declare class PendStack {
  pendingMap: Map<string, AbortController[]>
  constructor()
  _add(key: string): AbortSignal
  judge(config: InternalAxiosRequestConfig): void
  remove(response: AxiosResponse): void
  removeAll(): void
}
declare const _default: PendStack
export default _default
