import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { documentToShareDTO } from 'src/app/models/document-dto';
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global';
import { ApiHandler } from '../ApiHandler';

@Injectable({ providedIn: 'root' })
export class LawyerDocumentService extends ApiHandler {
    documentsSubject: BehaviorSubject<any> = new BehaviorSubject<any>(undefined)

    constructor(private httpClient: HttpClient) {
        super(httpClient);
    }

    getDocListObservable() {
        return this.documentsSubject.asObservable();
    }

    getDocs() {
        this.GetAll(API_URL + API_ENDPOINTS.GetLawyerDocuments).pipe(map(x => x.ResponseData)).subscribe(res => {
            if (res) {
                this.documentsSubject.next(res)
            }
        })
    }

    addDocs(data: FormData) {
        return this.Post(undefined, API_URL + API_ENDPOINTS.AddLawyerDocument, data).pipe(map(x => x.ResponseData)).toPromise();
    }

    shareDoc(data: documentToShareDTO) {
        return this.Post(undefined, API_URL + API_ENDPOINTS.ShareDocument, data).pipe(map(x => x.ResponseData)).toPromise();
    }
}