import { BaseApi } from './base'
import type { APIParams } from '~/types/ResponseTypes'
export class TeacherApi extends BaseApi {
  getStudentTopics(params: APIParams) {
    return this.get('/admin/teachers/student-topic', { params })
  }

  getStudentInterns(params: APIParams) {
    return this.get('/admin/teachers/student-intern', { params })
  }

  getStudentResultLOs(params: APIParams) {
    return this.get('/teachers/student-results-lo', { params })
  }

  updateStudentResultLOs(data: any) {
    return this.put('/teachers/student-results-lo', data)
  }

  changePassword(data: any) {
    return this.put('/teachers/change-password', data)
  }

  getStudentReportTopics(params: APIParams) {
    console.log('params in getStudentReportTopics', params)
    return this.get('/teachers/student-topic/report', { params })
  }

  getStudentReportInterns(params: APIParams) {
    return this.get('/teachers/student-intern/report', { params })
  }

  commentStudentReportTopic(id: string, data: any) {
    return this.put(`/teachers/student-topic/report/${id}/comment`, data)

  }

  commentStudentReportIntern(id: string, data: any) {
    return this.put(`/teachers/student-intern/report/${id}/comment`, data)

  }

  getStudentRecommendTopic() {
    return this.get('/teachers/student-topic/recommend-topics')
  }

  updateRecommendTopic(id: string, data: any) {
    return this.put(`/teachers/student-topic/recommend-topics/${id}`, data)
  }
}
