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

export class FamilyService extends ApiHandler {

    constructor(private httpClient: HttpClient) {
    super(httpClient);
    }
    
    GetFamilyChilds(){
        return this.GetAll(API_URL + API_ENDPOINTS.GetFamilyChilds).pipe(map(x=>x.ResponseData)).toPromise();
    }

}  