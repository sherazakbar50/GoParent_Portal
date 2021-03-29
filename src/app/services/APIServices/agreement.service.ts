import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ApiHandler } from '../ApiHandler'
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global'
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { url } from 'inspector'

@Injectable({ providedIn: 'root' })
export class AgreementService extends ApiHandler {
  agreementListSub: BehaviorSubject<any> = new BehaviorSubject(undefined)

  constructor(private httpClient: HttpClient) {
    super(httpClient)
  }

  agreementListObservable() {
    return this.agreementListSub.asObservable()
  }

  addUpdate(data): Promise<boolean> {
    return this.Post(data.Id, API_URL + API_ENDPOINTS.AddUpdateAgreement, data)
      .pipe(map(x => x.ResponseData))
      .toPromise<boolean>()
  }

  getAgreementList(caseId) {
    this.Get(caseId, API_URL + API_ENDPOINTS.GetAgreementList)
      .pipe(map(x => x.ResponseData))
      .subscribe(r => {
        if (r) {
          this.agreementListSub.next(r)
        }
      })
  }

  addFeedback(id, feedback): Promise<boolean> {
    return this.Feedback(API_URL + API_ENDPOINTS.AgreementFeedback, id, feedback)
      .pipe(map(x => x.ResponseData))
      .toPromise<boolean>()
  }

  delete(id: number): Promise<boolean> {
    return this.Delete(API_URL + API_ENDPOINTS.DeleteAgreement, id)
      .pipe(map(x => x.ResponseData))
      .toPromise<boolean>()
  }
}
