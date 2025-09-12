import { BaseApi } from '~/api/base'

export class StudentTeacherApi extends BaseApi {
  getTeachers(params) {
    return this.get('/student-teachers', { params })
  }

  getTeacher(id) {
    return this.get(`/student-teachers/${id}`)
  }

  createTeacher(data) {
    return this.post('/student-teachers', data)
  }

  updateTeacher(id, data) {
    return this.put(`/student-teachers/${id}`, data)
  }

  deleteTeacher(id) {
    return this.delete(`/student-teachers/${id}`)
  }
}

//   activeTeacher(id, data) {
//     return this.post(`/student-teachers/${id}/update-role`, { data })
//   }
// }

//   importUser(data) {
//     return this.post('/admin/teachers/import', data)
//   }

//   createSuperTeacher(data) {
//     return this.post('/super-admin/super-teacher', data)
//   }

//   getStudentTopics(params) {
//     return this.get('/admin/teachers/student-topic', { params })
//   }

//   resetPassword(id) {
//     return this.put(`/admin/teachers/${id}/reset-password`)
//   }
// }
