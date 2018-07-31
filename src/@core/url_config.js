import axios from 'axios'
import store from '../vuex/store'
import * as types from '../vuex/types'
import router from '../router/index'

axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://localhost:8000/'
axios.interceptors.request.use(
  config => {
    config.headers.contentType = 'application/json'
    if (store.state.token) {
      config.headers.Authorization = `Bearer ${store.state.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.commit(types.LOGOUT)
          router.currentRoute.path !== 'login' &&
          router.replace({
            path: 'login',
            query: { redirect: router.currentRoute.path }
          })
      }
    }
    console.log(JSON.stringify(error))
    return Promise.reject(error.response.data)
  }
)
export default axios
