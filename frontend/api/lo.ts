import { BaseApi } from '~/api/base'
export class LOAPI extends BaseApi {
  getLOs(params) {
    return this.get('/los', { params })
  }

  getLO(id) {
    return this.get(`/los/${id}`)
  }

  createLO(data) {
    return this.post('/los', data)
  }

  updateLO(id, data) {
    return this.put(`/los/${id}`, data)
  }

  deleteLO(id) {
    return this.delete(`/los/${id}`)
  }
}
