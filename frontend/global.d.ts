import { toast } from 'vue3-toastify'
import type { Api } from '~/api'

declare module '#app' {
  interface NuxtApp {
    $api: Api
    $toast: toast
    $fetchClient: Fetch
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $api: Api
    $toast: toast
    $fetchClient: Fetch
  }
}

declare module 'nuxt/app' {
  interface NuxtApp {
    $api: Api
    $toast: toast
    $fetchClient: Fetch
  }
}

export {}
