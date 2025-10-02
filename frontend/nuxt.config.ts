// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: false,
  // devServer: {
  //   host: '0.0.0.0',
  //   port: 4000,
  // },

  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBase: process.env.BASE_API_URL,
      baseUrl: process.env.BASE_URL,
    },
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@sidebase/nuxt-auth',
    '@vee-validate/nuxt',
  ],

  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
  },

  css: ['~/assets/css/main.css'],

  build: {
    transpile: ['vuetify'],
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    plugins: [tailwindcss()],
  },

  auth: {
    isEnabled: true,
    globalAppMiddleware: true,
    disableServerSideAuth: false,
    baseURL: process.env.BASE_API_URL,
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: 'auth/login', method: 'post' },
        signOut: { path: 'auth/logout', method: 'post' },
        getSession: { path: 'auth/profile', method: 'get' },
      },
      token: {
        signInResponseTokenPointer: '/access_token',
        // type: 'Bearer',
        // cookieName: 'auth.token',
        // headerName: 'Authorization',
        maxAgeInSeconds: 18000,
      },
      pages: {
        login: '/login',
      },
    },
  },

  compatibilityDate: '2024-11-11',
})
