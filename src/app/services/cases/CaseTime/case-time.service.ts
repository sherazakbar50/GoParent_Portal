import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CaseTimeDto } from 'src/app/models/CaseTime/case-time-dto';
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global';
import { ApiHandler } from '../../ApiHandler';

@Injectable({
  providedIn: 'root'
})
export class CaseTimeService extends ApiHandler {

  caseTimeObserver$: Observable<CaseTimeDto[]>;
  private caseTimeSubject$: BehaviorSubject<CaseTimeDto[]> = new BehaviorSubject<CaseTimeDto[]>(undefined);

  constructor(private _HttpClient: HttpClient) {
    super(_HttpClient);
    this.caseTimeObserver$ = this.caseTimeSubject$.asObservable();
  }

  async getCasesTime(Id: number) {
    let response = await this.Get(Id,API_URL + API_ENDPOINTS.GetCaseTimeByCase).pipe(map(x => x.ResponseData)).toPromise();
    if (response) {
      this.caseTimeSubject$.next(response);
    }
  }
  addUpdate(caseNote: CaseTimeDto) {
    return this.Post(undefined, API_URL + API_ENDPOINTS.AddUpdateCaseTime, caseNote).pipe(map(x => x.ResponseData))
      .toPromise<boolean>();
  } 
}
