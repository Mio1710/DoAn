import { BaseApi } from '~/api/base'
export class ReportReportTopicAPI extends BaseApi {
  getReportTopics(params) {
    return this.get('/report-topic', { params })
  }

  getReportTopic(id) {
    return this.get(`/report-topic/${id}`)
  }

  createReportTopic(data) {
    return this.post('/report-topic', data)
  }

  updateReportTopic(id, data) {
    return this.put(`/report-topic/${id}`, data)
  }

  deleteReportTopic(id) {
    return this.delete(`/report-topic/${id}`)
  }

  downloadReportTopic(key) {
    return this.get('/report-topic/file', { params: { key }, responseType: 'blob' })
  }
}
