import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EventsDTO } from 'src/app/models/eventsDTO';
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global';
import { BaseResponse } from 'src/app/models/IApiResponse';
import { ApiHandler } from '../ApiHandler';
import { tap,catchError,map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class CustodyService extends ApiHandler {

    eventObserver$: Observable<EventsDTO[]>;
    private eventSubject$: BehaviorSubject<EventsDTO[]> = new BehaviorSubject<EventsDTO[]>(undefined);
    constructor(private httpClient: HttpClient) {
    super(httpClient);
    this.eventObserver$ = this.eventSubject$.asObservable();
    }
    
    saveCustody(data: any) {
        return this.Post(0, API_URL + API_ENDPOINTS.SaveCustody,data).pipe(map(x=>x.ResponseData)).toPromise();
    }
}  