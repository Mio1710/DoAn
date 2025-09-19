export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const baseUrl = runtimeConfig.public.apiBase
  const client = $fetch.create({
    baseURL: baseUrl,

    onRequest({ options }) {
      const { token } = useAuth()
      if (token.value) {
        options.headers.set('Authorization', token.value)
      }
    },
    onResponse({ response, options }) {
      return response._data
    },

    onResponseError({ request, response, options, error }) {
      const code = response.status
      if (code === 401) {
        navigateTo('/login')
      }

      if (code === 403) {
        navigateTo('/invalid-page')
      }

      throw error
    },
  })
  nuxtApp.provide('fetchClient', client)
})
