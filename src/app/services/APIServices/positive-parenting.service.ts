import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ApiHandler } from '../ApiHandler'
import { BehaviorSubject } from 'rxjs'
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global'
import { map } from 'rxjs/operators'
import { NzNotificationService } from 'ng-zorro-antd/notification'

@Injectable({ providedIn: 'root' })
export class PositiveParentingService extends ApiHandler {
  listSubject: BehaviorSubject<any> = new BehaviorSubject(undefined)

  constructor(private httpClient: HttpClient, private notify: NzNotificationService) {
    super(httpClient)
  }

  listObserver() {
    return this.listSubject.asObservable()
  }

  getList() {
    this.GetAll(API_URL + API_ENDPOINTS.GetPositiveParentingList)
      .pipe(map(x => x.ResponseData))
      .subscribe(r => {
        this.listSubject.next(r)
      })
  }

  addUpdate(data: any) {
    return this.Post(data.Id, API_URL + API_ENDPOINTS.AddUpdatePositiveParentingPost, data)
      .pipe(map(x => x.ResponseData))
      .toPromise<boolean>()
  }

  deletePost(id: number) {
    return this.Delete(API_URL + API_ENDPOINTS.DeletePositiveParenting, id)
      .pipe(map(r => r.ResponseData))
      .toPromise<boolean>()
  }
}
