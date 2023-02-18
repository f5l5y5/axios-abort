import abort from '../index'

test('axios-abort', () => {
  const keyObj = { url: '/api/getList', method: 'get' }
  const key = '/api/getList-get'
  abort.add(keyObj)
  abort.add(keyObj)
  abort.judge(keyObj)
  expect(abort.pendingMap.get(key)?.length).toBe(1)
})
