import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CaseDto } from 'src/app/models/Cases/case-dto';
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global';
import { ApiHandler } from '../ApiHandler';

@Injectable({
  providedIn: 'root'
})
export class CasesService extends ApiHandler {

  caseObserver$: Observable<CaseDto[]>;
  private caseSubject$: BehaviorSubject<CaseDto[]> = new BehaviorSubject<CaseDto[]>(undefined);

  constructor(private _HttpClient: HttpClient) {
    super(_HttpClient);
    this.caseObserver$ = this.caseSubject$.asObservable();
  }

  async getCases() {
    let response = await this.GetAll(API_URL + API_ENDPOINTS.GetCasesByLawyer).pipe(map(x => x.ResponseData)).toPromise();
    if (response) {
      this.caseSubject$.next(response);
    }
  }

  getAllCases() {
    this.GetAll(API_URL + API_ENDPOINTS.GetAllCases).pipe(map(x => x.ResponseData)).subscribe(res => {
      if (res) {
        this.caseSubject$.next(res)
      }
    })
  }
}
