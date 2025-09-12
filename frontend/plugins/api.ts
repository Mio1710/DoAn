import { Api } from '~/api'

export default defineNuxtPlugin(({ provide }) => {
  const { $axios } = useNuxtApp()
  provide('api', new Api($axios))
})
