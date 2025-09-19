import { useNuxtApp } from 'nuxt/app'
import type { APIParams, BaseResponse, ErrorResponse } from '~/types/ResponseTypes'
import type { FetchError, Fetch, FetchOptions } from 'ofetch'

export class BaseApi {
  public async get(endpoint: string, config?: FetchOptions): Promise<unknown> {
    const { $fetchClient } = useNuxtApp()
    return await $fetchClient(endpoint).catch((error: FetchError) => {
      this.toastError(error)
    })
  }

  public async post(endpoint: string, data?: any, config?: APIParams): Promise<BaseResponse | unknown> {
    try {
      const { $fetchClient } = useNuxtApp()
      return await $fetchClient(endpoint, { method: 'POST', body: data, ...config })
    } catch (error) {
      await this.toastError(error)
    }
  }

  public async postDownload(endpoint: string, data?: any, config?: APIParams): Promise<unknown> {
    try {
      const { $fetchClient } = useNuxtApp()
      return await $fetchClient(endpoint, { method: 'POST', body: data, ...config })
    } catch (error) {
      await this.toastError(error)
    }
  }

  public async put(endpoint: string, data?: any): Promise<unknown> {
    try {
      const { $fetchClient } = useNuxtApp()
      return await $fetchClient(endpoint, { method: 'PUT', body: data })
    } catch (error) {
      await this.toastError(error)
    }
  }

  public async delete(endpoint: string, data?: any): Promise<unknown> {
    try {
      const { $fetchClient } = useNuxtApp()
      return await $fetchClient(endpoint, { method: 'DELETE', body: data })
    } catch (error) {
      await this.toastError(error)
    }
  }

  private async toastError(error: unknown) {
    const { $toast } = useNuxtApp()
    const err = error as ErrorResponse
    if (err?.message) {
      $toast.error(err.message, { timeout: 5000 })
    } else {
      $toast.error('An error occurred, please try again later', { timeout: 5000 })
    }
    return Promise.reject(error)
  }
}
