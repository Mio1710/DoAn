import { BaseApi } from '~/api/base'
export class AdminApi extends BaseApi {
  getTeachers(params) {
    return this.get('/public/teachers', { params })
  }

  getTeacherss(params) {
    return this.get('/admin/teachers', { params })
  }


  getTeacher(id) {
    return this.get(`/admin/teachers/${id}`)
  }

  createTeacher(data) {
    return this.post('/admin/teachers', data)
  }

  updateTeacher(id, data) {
    return this.put(`/admin/teachers/${id}`, data)
  }

  deleteTeacher(id) {
    return this.delete(`/admin/teachers/${id}`)
  }

  activeTeacher(id, data) {
    return this.post(`/admin/teachers/${id}/update-role`, { data })
  }

  importUser(data) {
    return this.post('/admin/teachers/import', data, {
      responseType: 'blob',
    })
  }

  createSuperTeacher(data) {
    return this.post('/super-admin/super-teacher', data)
  }

  getStudentTopics(params) {
    return this.get('/admin/teachers/student-topic', { params })
  }

  resetPassword(id) {
    return this.put(`/admin/teachers/${id}/reset-password`)
  }

  createStudentTopic(data) {
    return this.post('/admin/student-topic', data)
  }

  updateStudentTopic(id, data) {
    return this.put(`/admin/student-topic/${id}/info`, data)
  }

  deleteStudentTopic(id) {
    return this.delete(`/admin/student-topic/${id}`)
  }

  getStudentInterns(params) {

    return this.get('/admin/teachers/student-intern', { params })
  }

  createStudentIntern(data) {
    return this.post('/admin/student-intern', data)
  }

  updateStudentIntern(id, data) {
    return this.put(`/admin/student-intern/${id}/info`, data)
  }
  deleteStudentIntern(id) {
    return this.delete(`/admin/student-intern/${id}`)
}
}