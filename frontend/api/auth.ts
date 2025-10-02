import { BaseApi } from '@/api/base'
export class AuthApi extends BaseApi {
  changePassword(data: any) {
    return this.put('/auth/change-password', data)
  }

  updateProfile(data: any) {
    return this.put('/auth/profile', data)
  }

  getProfile() {
    return this.get('/auth/profile')
  }
}
