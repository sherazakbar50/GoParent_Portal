import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import store from 'store'
import { UserDTO } from 'src/app/models/UserDTO'
import { BaseResponse } from 'src/app/models/IApiResponse'
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global'
import { map, tap } from 'rxjs/operators'
import { ApiHandler } from '../ApiHandler'
import { UserSessionModel } from 'src/app/models/UserSessionModel'
import { Router } from '@angular/router'

@Injectable()
export class jwtAuthService extends ApiHandler {

  homePathSub$: BehaviorSubject<string> = new BehaviorSubject<string>('dashboard')

  constructor(http: HttpClient, private router: Router) {
    super(http)
  }

  get homePath() {
    return this.homePathSub$.value
  }

  setHomePath(path: string) {
    this.homePathSub$.next(path)
  }

  login(email: string, password: string) {
    return this.Post(0, API_URL + API_ENDPOINTS.GetToken, { Email: email, Password: password }).pipe(map(x => x.ResponseData)).toPromise();
  }

  register(userObj: UserDTO) {
    return this.Post(0, API_URL + API_ENDPOINTS.UserRegistration, userObj).pipe(map(x => x.ResponseData)).toPromise();
  }

  forgotPassword(email: string) {
    return this.Post(0, API_URL + API_ENDPOINTS.ForgotPassword, { Email: email }).pipe(map(x => x.ResponseData)).toPromise();
  }

  resetPassword(token: string, email: string, passwrod: string) {
    return this.Post(0, API_URL + API_ENDPOINTS.ResetPassword, { Email: email, Token: token, Password: passwrod }).pipe(map(x => x.ResponseData)).toPromise();
  }

  changePassword(data) {
    return this.Post(0, API_URL + API_ENDPOINTS.ChangePassword, data).pipe(map(x => x.ResponseData)).toPromise();
  }
  logoutUnAuthorizedUser() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    this.router.navigate(['auth', 'login'])
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
