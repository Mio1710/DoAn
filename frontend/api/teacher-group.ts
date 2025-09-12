import { BaseApi } from '~/api/base'
export class TeacherGroupAPI extends BaseApi {
  getTeacherGroups(params) {
    return this.get('/teacher-groups', { params })
  }

  getTeacherGroup(id) {
    return this.get(`/teacher-groups/${id}`)
  }

  createTeacherGroup(data) {
    return this.post('/teacher-groups', data)
  }

  updateTeacherGroup(id, data) {
    console.log('darta', data)
    return this.put(`/teacher-groups/${id}`, data)
  }

  deleteTeacherGroup(id) {
    return this.delete(`/teacher-groups/${id}`)
  }
}
