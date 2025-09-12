import { BaseApi } from '~/api/base'
export class ReportReportInternAPI extends BaseApi {
  getReportInterns(params) {
    return this.get('/report-intern', { params })
  }

  getReportIntern(id) {
    return this.get(`/report-intern/${id}`)
  }

  createReportIntern(data) {
    return this.post('/report-intern', data)
  }

  updateReportIntern(id, data) {
    return this.put(`/report-intern/${id}`, data)
  }

  deleteReportIntern(id) {
    return this.delete(`/report-intern/${id}`)
  }

  downloadReportIntern(key) {
    console.log('key', key)
    return this.get('/report-intern/file', { params: { key }, responseType: 'blob' })
  }
}
