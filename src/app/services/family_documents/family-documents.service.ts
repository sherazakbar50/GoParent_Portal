import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { FamilyDocumentsDto } from 'src/app/models/document-dto'
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global'
import { ApiHandler } from '../ApiHandler'
@Injectable({
  providedIn: 'root',
})
export class FamilyDocumentsService extends ApiHandler {
  documentsObserver$: Observable<FamilyDocumentsDto[]>
  private documentsSubject$: BehaviorSubject<FamilyDocumentsDto[]> = new BehaviorSubject<
    FamilyDocumentsDto[]
  >(undefined)
  constructor(private _HttpClient: HttpClient) {
    super(_HttpClient)
    this.documentsObserver$ = this.documentsSubject$.asObservable()
  }

  add(documentElement: FormData) {
    return this.Post(undefined, API_URL + API_ENDPOINTS.AddUpdateDocument, documentElement)
      .pipe(map(x => x.ResponseData))
      .toPromise()
  }
  addChatAttachment(documentElement: FormData) {
    return this.Post(undefined, API_URL + API_ENDPOINTS.AddChatAttachment, documentElement)
      .pipe(map(x => x.ResponseData))
      .toPromise()
  }

  async getFamilyDocuments(folderId?: number) {
    let response = await this.Get(folderId, API_URL + API_ENDPOINTS.getFolderDocuments)
      .pipe(map(x => x.ResponseData))
      .toPromise()
    if (response) {
      this.documentsSubject$.next(response)
    }
  }

  DeleteDocument(id) {
    return this.Post(id, API_URL + API_ENDPOINTS.deleteDocument, undefined)
      .pipe(map(x => x.ResponseData))
      .toPromise()
  }

  DownloadDocument(id): Observable<any> {
    return this.Post(id, API_URL + API_ENDPOINTS.downloadDocument, undefined)
  }

  getSharedWithFamily(caseId: number) {
    return this.Get(caseId, API_URL + API_ENDPOINTS.getFamilyDocuments).pipe(map(x => x.ResponseData)).toPromise();
  }
}
