# axios-abort

## Installation

### Using npm:

```js
 npm install @sunrisecn/axios-abort --save
	yarn add @sunrisecn/axios-abort
```

### Usage:

```js
import axios from 'axios'
import abort from 'axios-abort'

const _axios = axios.create(config)

_axios.interceptors.request.use(
	config => {
		pend.judge({ url: config.url, method: config.method })
		return config
	},
	error => Promise.reject(error)
)

// Add a response interceptor
_axios.interceptors.response.use(
	response => {
		pend.remove({ url: response.config.url, method: response.config.method })
		return response
	},
	error => Promise.reject(error)
)

class Request {
	async get(url, params, config) {
		const res = await _axios
			.get(url, {
				...config,
				params,
				signal: pend.add({ url, method: 'get' })
			})
			.catch(err => Promise.reject(err))
		return res?.data
	}

	async post(url, data, config) {
		const res = await _axios
			.post(url, data, {
				...config,
				signal: pend.add({ url, method: 'post' })
			})
			.catch(err => Promise.reject(err))
		return res?.data
	}
}

export const request = new Request()
```
