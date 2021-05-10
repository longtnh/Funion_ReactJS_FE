import axios from 'axios'

const TIME_OUT = 7000

const axiosReqConfig = config => {
  const key = localStorage.getItem('token')
  config.timeout = TIME_OUT
  config.headers = {
    Authorization: `Bearer ${key}`,
    'Access-Control-Allow-Origin': '*',
  }
  return config
}
const errorHandler = error => Promise.reject(error)

export const authT5 = axios.create({
  baseURL: process.env.IDENTITY_ENDPOINT,
  timeout: TIME_OUT,
})

export const idenT5 = axios.create({
  baseURL: process.env.IDENTITY_ENDPOINT,
})

export const axiosT5 = axios.create({
  baseURL: process.env.API_ENDPOINT,
})

idenT5.interceptors.request.use(axiosReqConfig, errorHandler)
axiosT5.interceptors.request.use(axiosReqConfig, errorHandler)
