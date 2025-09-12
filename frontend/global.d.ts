import { Api } from '@/api'

declare module '#app/nuxt' {
  interface NuxtApp {
    $api: Api<any>
  }
}
export {}
