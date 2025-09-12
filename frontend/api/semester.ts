import { BaseApi } from '~/api/base'
export class SemesterAPI extends BaseApi {
  getSemesters(params) {
    return this.get('/semesters', { params })
  }

  getSemester(id) {
    return this.get(`/semesters/${id}`)
  }

  createSemester(data) {
    return this.post('/semesters', data)
  }

  updateSemester(id, data) {
    return this.put(`/semesters/${id}`, data)
  }

  deleteSemester(id) {
    return this.delete(`/semesters/${id}`)
  }

  activeSemester(id) {
    return this.post(`/semesters/active/${id}`)
  }

  getActiveSemester() {
    return this.get('/semesters/active')
  }
}
