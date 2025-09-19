import { BaseApi } from './base'
export class SuperAdminApi extends BaseApi {
  getFacultyWithAdmin() {
    return this.get('/super-admin/faculty')
  }

  deleteSuperTeacher(id) {
    return this.delete(`/super-admin/super-teacher/${id}`)
  }
}
