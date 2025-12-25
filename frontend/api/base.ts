import { useNuxtApp } from 'nuxt/app'
import type { Fetch } from 'ofetch'
import type { APIParams, BaseResponse, ErrorResponse } from '~/types/ResponseTypes'

export class BaseApi {
  public readonly fetch: Fetch
  constructor(fetch: Fetch) {
    this.fetch = fetch
  }

  public async get<T>(endpoint: string): Promise<BaseResponse<T> | any> {
    try {
      return await this.fetch(endpoint, { method: 'GET' })
    } catch (error) {
      await this.toastError(error)
    }
  }

  public async post<T>(endpoint: string, data?: any, config?: APIParams): Promise<BaseResponse<T> | unknown> {
    try {
      return await this.fetch(endpoint, { method: 'POST', body: data, ...config })
    } catch (error) {
      await this.toastError(error)
    }
  }

  public async postDownload(endpoint: string, data?: any, config?: APIParams): Promise<unknown> {
    try {
      return await this.fetch(endpoint, { method: 'POST', body: data, ...config })
    } catch (error) {
      await this.toastError(error)
    }
  }

  public async put(endpoint: string, data?: any): Promise<unknown> {
    try {
      return await this.fetch(endpoint, { method: 'PUT', body: data })
    } catch (error) {
      await this.toastError(error)
    }
  }

  public async delete(endpoint: string, data?: any): Promise<unknown> {
    try {
      return await this.fetch(endpoint, { method: 'DELETE', body: data })
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
