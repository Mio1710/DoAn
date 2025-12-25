import type { Semester } from '~/types/semester'
import { BaseApi } from './base'
export class SemesterAPI extends BaseApi {
  async getSemesters(): Promise<Semester[]> {
    return await this.get<Semester[]>('/semesters')
  }

  getSemester(id: number) {
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
