import axios from '../base/customAxios'
import { decode } from 'jsonwebtoken'
import { SocialTypes } from '../../modules/authentication/models/socialTypesEnum'
import { UserSession } from '../base/models/userSession'
import { LoginRequest } from './request/login.request'
import { SocialLoginRequest } from './request/socialLogin.request'
import { LoginResponse } from './response/login.response'
import { SocialLoginResponse } from './response/socialLogin.response'
import { UserModel } from '../user/model/user.model'
import { ProfileModel } from '../profile/model/profile.model'
class AuthenticationService {
  async login({ username, password }: LoginRequest): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>('/auth/login', {
      username,
      password
    })

    return response.data
  }

  async registerSocialLogin({ type, code }: SocialLoginRequest): Promise<SocialLoginResponse> {
    const response = await axios.post<SocialLoginResponse>('/auth/socialLogin', {
      code,
      type
    })

    return response.data
  }

  socialLogin(type: SocialTypes): string {
    switch (type) {
      case SocialTypes.github:
        const redirect_uri = 'http://localhost:3000/social'
        const client_id = '9a87f626c95daef7fa18'
        const scope = 'user'
        return `https://github.com/login/oauth/authorize?redirect_uri=${redirect_uri}&client_id=${client_id}&scope=${scope}&state=${type}`
      case SocialTypes.facebook:
      case SocialTypes.google:
      default:
        return ''
    }
  }

  saveSession(token: string, user: UserModel): UserSession {
    const session = this.decodeToken(token)
    if (user.profile) {
      const profile = user.profile as ProfileModel
      session.profile = profile
    }
    localStorage.setItem(`fishing-manager-user`, JSON.stringify(session))
    return session
  }

  removeSession() {
    localStorage.removeItem(`fishing-manager-user`)
  }

  getSession(): UserSession | undefined {
    const sessionString = localStorage.getItem(`fishing-manager-user`)
    if (!sessionString) {
      return undefined
    }

    return JSON.parse(sessionString) as UserSession
  }

  decodeToken(token: string): UserSession {
    const decoded = decode(token) as { [key: string]: any }
    const expiration = decoded['exp']
    const expirationDate = new Date(expiration * 1000)
    return {
      id: decoded['id'],
      name: decoded['name'],
      expiration: expirationDate,
      expired: expirationDate < new Date(),
      accessToken: token,
      profile: undefined
    }
  }
}

export default new AuthenticationService()


