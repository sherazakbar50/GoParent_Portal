import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiHandler } from '../ApiHandler';
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { CheckInOutDTO } from 'src/app/models/CheckInOutDTO';

@Injectable({ providedIn: 'root' })
export class CheckInOutService extends ApiHandler {

    checkListSubscription$: BehaviorSubject<CheckInOutDTO> = new BehaviorSubject<CheckInOutDTO>(undefined);

    constructor(private httpClient: HttpClient) {
        super(httpClient)
    }

    getCheckListObserver$() {
        return this.checkListSubscription$.asObservable()
    }

    getList() {
        return this.GetAll(API_URL + API_ENDPOINTS.GetCheckList).pipe(map(x => x.ResponseData)).subscribe(r => {
            this.checkListSubscription$.next(r)
        })
    }

    addUpdate(data: CheckInOutDTO) {
        return this.Post(data.Id, API_URL + API_ENDPOINTS.AddUpdateCheck, data).pipe(map(x => x.ResponseData)).toPromise<boolean>()
    }
}