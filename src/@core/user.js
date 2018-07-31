import axios from './url_config'
export const login = (username, password) => {
  return axios.post('/api/auth/signin', {
    'username': username,
    'password': password
  })
}
