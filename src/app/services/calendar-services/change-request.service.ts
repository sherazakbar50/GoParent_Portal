import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global'
import { RequestDTO } from 'src/app/models/RequestDTO'
import { ApiHandler } from '../ApiHandler'

@Injectable({ providedIn: 'root' })
export class ChangeRequestService extends ApiHandler {
  requestsSub$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined)

  constructor(private http: HttpClient) {
    super(http)
  }

  requestObs$() {
    return this.requestsSub$.asObservable()
  }

  addUpdate(data: RequestDTO) {
    return this.Post(data.Id, API_URL + API_ENDPOINTS.AddUpdateChangeRequest, data)
      .pipe(map(x => x.ResponseData))
      .toPromise()
  }

  getRequests(caseId: number = 0) {
    this.Get(caseId, API_URL + API_ENDPOINTS.GetRequestsList)
      .pipe(map(x => x.ResponseData))
      .subscribe(r => {
        this.requestsSub$.next(r)
      })
  }

  updateStatus(data: RequestDTO) {
    return this.Post(data.Id, API_URL + API_ENDPOINTS.UpdateStatusOfRequest, data)
      .pipe(map(x => x.ResponseData))
      .toPromise()
  }
}
