import abort from '../index'
import { InternalAxiosRequestConfig } from 'axios'

test('test abort', () => {
  const keyObj = { url: '/api/getList', method: 'get' }
  const key = '/api/getList-get'
  abort.judge(keyObj as InternalAxiosRequestConfig)
  abort.judge(keyObj as InternalAxiosRequestConfig)
  expect(abort.pendingMap.get(key)?.length).toBe(1)
})

test('test removeAll', () => {
  const key = '/api/getList-get'
  const key1 = '/api/getList-post'
  abort._add(key)
  abort._add(key1)
  abort.removeAll()
  expect(abort.pendingMap.size).toBe(0)
})
