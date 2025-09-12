import { BaseApi } from '~/api/base'
export class InternAPI extends BaseApi {
  getInterns(params) {
    return this.get('/interns', { params })
  }

  getIntern(id) {
    return this.get(`/interns/${id}`)
  }

  createIntern(data) {
    return this.post('/interns', data)
  }

  updateIntern(id, data) {
    return this.put(`/interns/${id}`, data)
  }

  deleteIntern(id) {
    return this.delete(`/interns/${id}`)
  }

  checkIntern(id, status) {
    return this.post(`/interns/${id}/${status}`)
  }
}
