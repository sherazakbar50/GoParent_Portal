import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import store from 'store'
import {UserDTO} from 'src/app/models/UserDTO'
import { BaseResponse } from 'src/app/models/IApiResponse'
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global'
import { map,tap } from 'rxjs/operators'

@Injectable()
export class jwtAuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post('/api/auth/login', { email, password })
  }

  register(userObj: UserDTO):  Observable<any> {
   return this.http.post<BaseResponse>(`${API_URL}${API_ENDPOINTS.UserRegistration}`, userObj)
  }

  HandleResponse(response: BaseResponse) {
    debugger
    if (response.Status === 500) {
        alert('There is an error while getting the data. please try again later');
        console.log(response);
    }
}

  currentAccount(): Observable<any> {
    const accessToken = store.get('accessToken')
    const params = accessToken
      ? {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            AccessToken: accessToken,
          },
        }
      : {}

    return this.http.get('/api/auth/account', params)
  }

  logout(): Observable<any> {
    return this.http.get('/api/auth/logout')
  }
}
