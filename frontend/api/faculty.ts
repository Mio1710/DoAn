import { BaseApi } from '~/api/base'
export class FacultyAPI extends BaseApi {
  getFaculties(params) {
    return this.get('/faculties', { params })
  }

  getFaculty(id) {
    return this.get(`/faculties/${id}`)
  }

  createFaculty(data) {
    return this.post('/faculties', data)
  }

  updateFaculty(id, data) {
    return this.put(`/faculties/${id}`, data)
  }

  deleteFaculty(id) {
    return this.delete(`/faculties/${id}`)
  }

  checkFaculty(id, status) {
    return this.post(`/faculties/${id}/${status}`)
  }
}
