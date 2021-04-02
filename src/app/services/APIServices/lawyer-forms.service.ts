import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiHandler } from '../ApiHandler';
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LawyerFormService extends ApiHandler {

    formSubject: BehaviorSubject<any> = new BehaviorSubject(undefined)

    constructor(private httpClient: HttpClient) {
        super(httpClient);
    }

    formObservable() {
        return this.formSubject.asObservable()
    }

    getForms() {
        this.GetAll(API_URL + API_ENDPOINTS.GetAllForms).pipe(map(x => x.ResponseData)).subscribe(res => {
            if (res) {
                this.formSubject.next(res);
            }
        })
    }

    addUpdateForm(data) {
        return this.Post(data.Id, API_URL + API_ENDPOINTS.AddUpdateForm, data).pipe(map(x => x.ResponseData)).toPromise<boolean>()
    }

    deleteForm(id) {
        return this.Delete(API_URL + API_ENDPOINTS.DeleteForm, id).pipe(map(x => x.ResponseData)).toPromise<boolean>()
    }

    shareForm(data) {
        return this.Post(data.Id, API_URL + API_ENDPOINTS.ShareForms, data).pipe(map(x => x.ResponseData)).toPromise<boolean>()
    }

}