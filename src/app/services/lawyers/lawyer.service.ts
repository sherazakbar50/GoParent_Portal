import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { CaseFamily } from 'src/app/models/Cases/case-dto'
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global'
import { ApiHandler } from '../ApiHandler'

@Injectable({
  providedIn: 'root',
})
export class LawyerService extends ApiHandler {
  private laywersList$: BehaviorSubject<any[]> = new BehaviorSubject(null)
  private caseList$: BehaviorSubject<CaseFamily[]> = new BehaviorSubject(null)

  constructor(private _HttpClient: HttpClient) {
    super(_HttpClient)
  }

  laywersListObservable$() {
    return this.laywersList$.asObservable()
  }

  caseListObservable$(): Observable<CaseFamily[]> {
    return this.caseList$.asObservable()
  }

  createAccount(email: string) {
    return this.Post(0, API_URL + API_ENDPOINTS.CreateLawyerAccount, { email: email })
      .pipe(map(x => x.ResponseData))
      .toPromise<boolean>()
  }

  getLawyersList() {
    this.Get(0, API_URL + API_ENDPOINTS.LawyersList)
      .pipe(map(x => x.ResponseData))
      .subscribe(res => {
        this.laywersList$.next(res)
      })
  }

  getCasesFamilies(lawyerId) {
    this.Get(lawyerId, API_URL + API_ENDPOINTS.GetFamilies)
      .pipe(map(x => x.ResponseData))
      .subscribe(res => {
        this.caseList$.next(res)
      })
  }

  GetFamiliesAssigned(lawyerId) {
    this.Get(lawyerId, API_URL + API_ENDPOINTS.GetFamiliesAssigned)
      .pipe(map(x => x.ResponseData))
      .subscribe(res => {
        this.caseList$.next(res)
      })
  }

  assignCase(data: any) {
    return this.Post(0, API_URL + API_ENDPOINTS.AssignCaseToLawyer, data)
      .pipe(map(x => x.ResponseData))
      .toPromise<boolean>()
  }

}
