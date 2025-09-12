import { BaseApi } from '~/api/base'
export class StudentInternAPI extends BaseApi {
  getStudentInterns(params) {
    return this.get('/student-intern', { params })
  }

  getStudentIntern(id) {
    return this.get(`/student-intern/${id}`)
  }

  createStudentIntern(data) {
    return this.post('/student-intern', data)
  }

  updateStudentIntern(id, data) {
    return this.put(`/student-intern/${id}`, data)
  }

  deleteStudentIntern(id) {
    return this.delete(`/student-intern/${id}`)
  }

  registerIntern(intern_id) {
    return this.post('/student-intern/register', { intern_id })
  }

  importStudentIntern(data) {
    return this.post('/student-intern/import', data, {
      responseType: 'blob',
    })
  }

  updateIntern(data) {
    return this.post('/student-intern/intern', data)
  }
}
