import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import store from 'store'
import { UserDTO } from 'src/app/models/UserDTO'
import { BaseResponse } from 'src/app/models/IApiResponse'
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global'
import { map, tap } from 'rxjs/operators'
import { ApiHandler } from '../ApiHandler'
import { UserSessionModel } from 'src/app/models/UserSessionModel'

@Injectable()
export class jwtAuthService extends ApiHandler {
  constructor(http: HttpClient) {
    super(http)
  }

  async login(email: string, password: string) {
    let res = await this.Post(0, API_URL + API_ENDPOINTS.GetToken, {
      Email: email,
      Password: password,
    })
      .pipe(map(x => x.ResponseData))
      .toPromise()
    if (res && res.AccessToken) {
      localStorage.setItem('accessToken', res.AccessToken)
      localStorage.setItem('refreshToken', res.RefreshToken)
      return true
    } else {
      return false
    }
  }

  register(userObj: UserDTO): Observable<any> {
    return this.Post(0, API_URL + API_ENDPOINTS.UserRegistration, userObj)
  }

  logoutUnAuthorizedUser() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }
  public getAccessToken(): string {
    return localStorage.getItem('accessToken')
  }
  public isAuthenticated(): boolean {
    let accessToken = this.getAccessToken()
    return accessToken && accessToken.length > 0
  }
  public async getUserModel() {
    let token = this.getAccessToken()
    if (this.isAuthenticated()) {
      return JSON.parse(atob(token.split('.')[1])) as UserSessionModel
    }
    return new UserSessionModel()
  }
}
