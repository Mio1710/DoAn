import { BaseApi } from '~/api/base'
export class TeacherInternAPI extends BaseApi {

    getTeacherInterns(params) {
        return this.get('/teacher-interns', { params })
    }

    getTeacherIntern(id) {
        return this.get(`/teacher-interns/${id}`)
    }

    createTeacherIntern(data) {
        return this.post('/teacher-interns', data)
    }

    updateTeacherIntern(id, data) {
        return this.put(`/teacher-interns/${id}`, data)
    }

    deleteTeacherIntern(id) {
        return this.delete(`/teacher-interns/${id}`)
    }

    checkTeacherIntern(id, status) {
        return this.post(`/teacher-interns/${id}/${status}`)
    }
}