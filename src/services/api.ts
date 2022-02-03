import axios, { AxiosRequestConfig } from 'axios'

const config: AxiosRequestConfig = {
  baseURL: process.env.VUE_APP_API_URL
}

export const api = axios.create(config)

const authInterceptor = (
  request: AxiosRequestConfig
): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
  const token = localStorage.getItem('openfinance-token')
  if (token && request.headers) {
    request.headers['Authorization'] = `Bearer ${token}`
  }
  return request
}

api.interceptors.request.use(authInterceptor)
