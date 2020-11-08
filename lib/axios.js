import { default as _axios } from 'axios'

const config = {
  timeout: 60000
}

const axios = _axios.create(config)

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (err) {
    if (err.response && err.response.status === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default axios
