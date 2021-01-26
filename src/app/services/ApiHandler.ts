import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { BaseResponse } from '../models/IApiResponse'

export interface IApiBaseActions {
  Get(id: any, url: string)
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
  GetAll(url: string) {
    return this.myHttpClient.get<BaseResponse>(url).pipe(tap(x => this.HandleResponse(x)))
  }

  HandleResponse(response) {
    if (response.Status === 500) {
      alert('There is an error while getting the data. please try again later')
      console.log(response)
    }
  }

  Post(id: any, url: string, data: any) {
    if (id != undefined) {
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
