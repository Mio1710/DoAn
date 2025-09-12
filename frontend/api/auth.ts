import { BaseApi } from '~/api/base'
export class AuthApi extends BaseApi {
  changePassword(data) {
    return this.put('/auth/change-password', data)
  }

  updateProfile(data) {
    return this.put('/auth/profile', data)
  }
}
