import { Api } from '~/api'

export default defineNuxtPlugin(({ provide }) => {
  const { $fetchClient } = useNuxtApp()
  provide('api', new Api())
})
