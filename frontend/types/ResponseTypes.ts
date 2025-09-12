export interface ApiPaginate {
  current_page: number
  first_item: number
  last_item: number
  last_page: number
  pages: Array<number>
  per_page: number
  total: number
}

type BaseResponse<T = any> = {
  status: number
  success: boolean
  data?: T
  error?: T
  paginate?: ApiPaginate
}

type ErrorResponse = {
  code: string
  message: string
  fields: Record<string, any>
}

export type { BaseResponse, ErrorResponse }
