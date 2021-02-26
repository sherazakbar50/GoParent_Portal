import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { tap, catchError } from 'rxjs/operators'
import { BaseResponse } from '../models/IApiResponse'
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification'
import { AppInjector } from './app-injector'

export interface IApiBaseActions {
  Get(id: any, url: string)
  GetEvent(id: any, url: string, content?: any)
  GetAll(url: string): Observable<BaseResponse>
  Post(id: any, url: string, data: any): Observable<BaseResponse>
  Delete(url: string, id: any): Observable<BaseResponse>
  Put(id: any, url: string, data: any)
}

@Injectable()
export class ApiHandler implements IApiBaseActions {
  constructor(private myHttpClient: HttpClient) {}

  Get(id: any, url: string) {
    url = `${url}?id=${id}`
    return this.myHttpClient.get<BaseResponse>(url).pipe(tap(x => this.HandleResponse(x)))
  }

  GetEvent(id: any, url: string, content?: any) {
    url = `${url}?id=${id}&${content}`
    return this.myHttpClient.get<BaseResponse>(url).pipe(tap(x => this.HandleResponse(x)))
  }

  GetAll(url: string, content?: any) {
    if (content) url = `${url}?${content}`
    return this.myHttpClient.get<BaseResponse>(url).pipe(tap(x => this.HandleResponse(x)))
  }

  HandleResponse(response) {
    let notifier: NzNotificationService = AppInjector.get(NzNotificationService)
    if (!response) notifier.error('', 'Something went wrong. Please try again later')

    if (!response.IsSuccessful || response.Status === 500 || response.Status === 400)
      notifier.error('', response.Error || 'Something went wrong. Please try again later')
  }

  Post(id: any, url: string, data: any) {
    if (id) {
      url = `${url}?id=${id}`
    }
    return this.myHttpClient.post<BaseResponse>(url, data).pipe(tap(x => this.HandleResponse(x)))
  }

  Delete(url: string, id: any) {
    url = `${url}?id=${id}`
    return this.myHttpClient.delete<BaseResponse>(url).pipe(tap(x => this.HandleResponse(x)))
  }
  Put(id: any, data: any) {
    throw new Error('Method not implemented.')
  }

  Update(id: any, data: any, url: string = '') {
    url = `${url}?id=${id}`
    return this.myHttpClient.put<BaseResponse>(url, data).pipe(tap(x => this.HandleResponse(x)))
  }
}
