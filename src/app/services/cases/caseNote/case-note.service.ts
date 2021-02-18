import { HttpClient } from '@angular/common/http';
import { Identifiers } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CaseNoteDto } from 'src/app/models/CaseNote/case-note-dto';
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global';
import { ApiHandler } from '../../ApiHandler';

@Injectable({
  providedIn: 'root'
})
export class CaseNoteService extends ApiHandler {

  caseNoteObserver$: Observable<CaseNoteDto[]>;
  private caseNoteSubject$: BehaviorSubject<CaseNoteDto[]> = new BehaviorSubject<CaseNoteDto[]>(undefined);

  constructor(private _HttpClient: HttpClient) {
    super(_HttpClient);
    this.caseNoteObserver$ = this.caseNoteSubject$.asObservable();
  }

  async getCasesNote(Id: number) {
    let response = await this.Get(Id,API_URL + API_ENDPOINTS.GetCaseNoteByCase).pipe(map(x => x.ResponseData)).toPromise();
    if (response) {
      this.caseNoteSubject$.next(response);
    }
  }


  addUpdate(caseNote: CaseNoteDto) {
    return this.Post(undefined, API_URL + API_ENDPOINTS.AddUpdateCaseNote, caseNote).pipe(map(x => x.ResponseData))
      .toPromise<boolean>();
  }
}
