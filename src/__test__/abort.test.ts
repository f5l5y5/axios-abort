import abort from '../index'

test('test abort', () => {
  const keyObj = { url: '/api/getList', method: 'get' }
  const key = '/api/getList-get'
  abort.add(keyObj)
  abort.add(keyObj)
  abort.judge(keyObj)
  expect(abort.pendingMap.get(key)?.length).toBe(1)
})

test('test removeAll', () => {
  const keyObj = { url: '/api/getList', method: 'get' }
  const keyObj1 = { url: '/api/postList', method: 'post' }
  abort.add(keyObj)
  abort.add(keyObj1)
  abort.removeAll()
  expect(abort.pendingMap.size).toBe(0)
})
