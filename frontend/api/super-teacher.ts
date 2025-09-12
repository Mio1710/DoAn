import { BaseApi } from '~/api/base'

export class SuperTeacherAPI extends BaseApi {
  getAllStudentTopics() {
    return this.get('/super-teacher/student-topic')
  }

  getAllStudentGroups(params) {
    return this.get('/super-teacher/student-groups', { params })
  }

  lockStudentGroup() {
    return this.put('/super-teacher/student-group/lock')
  }

  updateStudentGroupTeacher(data) {
    return this.put('/super-teacher/teacher-group/student', data)
  }

  createTopic(data) {
    return this.post('/super-teacher/topic', data)
  }
}
