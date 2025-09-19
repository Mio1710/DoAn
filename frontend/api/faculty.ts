import { BaseApi } from '@/api/base'
import type { APIParams } from '~/types/ResponseTypes'

export class FacultyAPI extends BaseApi {
  getFaculties(params: APIParams) {
    return this.get('/faculties', { params })
  }

  getFaculty(id: number) {
    return this.get(`/faculties/${id}`)
  }

  createFaculty(data: any) {
    return this.post('/faculties', data)
  }

  updateFaculty(id: number, data: any) {
    return this.put(`/faculties/${id}`, data)
  }

  deleteFaculty(id: number) {
    return this.delete(`/faculties/${id}`)
  }

  checkFaculty(id: number, status: string) {
    return this.post(`/faculties/${id}/${status}`)
  }
}
