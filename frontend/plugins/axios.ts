import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const baseUrl = runtimeConfig.public.apiBase

  const client = axios.create({
    baseURL: baseUrl,
    timeout: 10000, // 10s
  })

  client.interceptors.request.use((config) => {
    const { token } = useAuth()
    if (token.value) {
      // @ts-ignore
      config.headers.Authorization = token.value
    }
    return config
  })

  client.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      const { signOut } = useAuth()

      const code = error.response?.status
      if (code === 401) {
        navigateTo('/login')
      }

      if (code === 403) {
        navigateTo('/invalid-page')
      }

      throw error
    },
  )

  nuxtApp.provide('axios', client)
})
