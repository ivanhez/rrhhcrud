import axios from 'axios'

const api = axios.create({
  baseURL: 'http://35.175.218.191:4000/api'
})

export default api
