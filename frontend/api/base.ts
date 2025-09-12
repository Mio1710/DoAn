import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig} from 'axios'
import type { BaseResponse, ErrorResponse } from '~/types/ResponseTypes'

export class BaseApi {
  public readonly axios: AxiosInstance

  constructor(axios: AxiosInstance) {
    this.axios = axios
  }

  public async get(endpoint: string, config?: AxiosRequestConfig): Promise<any> {
    try {
      return (await this.axios.get(endpoint, config)).data
    } catch (error) {
      await this.toastError(error)
    }
  }

  public async post(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    try {
      return (await this.axios.post(endpoint, data, config)).data
    } catch (error) {
      console.log('error checkkkk', error)
      await this.toastError(error)
    }
  }

  public async postDownload(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    try {
      return await this.axios.post(endpoint, data, config)
    } catch (error) {
      await this.toastError(error)
    }
  }

  public async put(endpoint: string, data?: any): Promise<any> {
    try {
      return (await this.axios.put(endpoint, data)).data
    } catch (error) {
      await this.toastError(error)
    }
  }

  public async delete(endpoint: string, data?: any): Promise<any> {
    try {
      return (await this.axios.delete(endpoint, data)).data
    } catch (error) {
      await this.toastError(error)
    }
  }

  private toastError(error: any) {
    return new Promise((resolve, reject) => {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<BaseResponse<ErrorResponse>>

        const { $toast } = useNuxtApp()
        if (axiosError.response?.data.error) {
          $toast.error(axiosError.response.data.error.message ?? axiosError.response.data.error)

          if (axiosError.response.data.error.fields) {
            throw axiosError.response.data.error.fields
          }
        }

        if (axiosError.response?.status === 403) {
          // go back
        }
      }

      reject(error)
    })
  }
}
