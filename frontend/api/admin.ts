import { BaseApi } from '@/api/base'
import type { APIParams } from '~/types/ResponseTypes'
export class AdminApi extends BaseApi {
  getTeachers(params: APIParams) {
    return this.get('/public/teachers', { params })
  }
  getTeacherss(params: APIParams) {
    return this.get('/admin/teachers', { params })
  }


  getTeacher(id: number) {
    return this.get(`/admin/teachers/${id}`)
  }

  createTeacher(data: any) {
    return this.post('/admin/teachers', data)
  }

  updateTeacher(id: number, data: any) {
    return this.put(`/admin/teachers/${id}`, data)
  }

  deleteTeacher(id: number) {
    return this.delete(`/admin/teachers/${id}`)
  }

  activeTeacher(id: number, data: any) {
    return this.post(`/admin/teachers/${id}/update-role`, { data })
  }

  importUser(data: any) {
    return this.post('/admin/teachers/import', data, {
      responseType: 'blob',
    })
  }

  createSuperTeacher(data: any) {
    return this.post('/super-admin/super-teacher', data)
  }

  getStudentTopics(params: APIParams) {
    return this.get('/admin/teachers/student-topic', { params })
  }

  resetPassword(id: number) {
    return this.put(`/admin/teachers/${id}/reset-password`)
  }

  createStudentTopic(data: any) {
    return this.post('/admin/student-topic', data)
  }

  updateStudentTopic(id: number, data: any) {
    return this.put(`/admin/student-topic/${id}/info`, data)
  }

  deleteStudentTopic(id: number) {
    return this.delete(`/admin/student-topic/${id}`)
  }

  getStudentInterns(params: APIParams) {

    return this.get('/admin/teachers/student-intern', { params })
  }

  createStudentIntern(data: any) {
    return this.post('/admin/student-intern', data)
  }

  updateStudentIntern(id: number, data: any) {
    return this.put(`/admin/student-intern/${id}/info`, data)
  }
  deleteStudentIntern(id: number) {
    return this.delete(`/admin/student-intern/${id}`)
}
}