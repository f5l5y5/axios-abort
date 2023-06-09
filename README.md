# axios-abort

The axios-abort library is for axios cancel request.

##  Installation:

### Using npm/yarn/pnpm:

```js
npm install @sunrisecn/axios-abort --save

yarn/pnpm add @sunrisecn/axios-abort
```

### Usage:

Starting from v0.22.0 Axios supports AbortController to cancel requests.

```js
import axios from 'axios'
import abort from 'axios-abort'

const axios = axios.create(config)

axios.interceptors.request.use(
	config => {
		abort.judge(config)
		return config
	},
	error => Promise.reject(error)
)

axios.interceptors.response.use(
	response => {
		abort.remove(config)
		return response
	},
	error => Promise.reject(error)
)

```

### API

```js
- judge
	- judge whether the cancellation conditions are met
- remove
	- remove url after success or failure
- removeAll
	- removeAll url 
```