import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiHandler } from '../ApiHandler';
import { BehaviorSubject } from 'rxjs';
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global';
import { map, tap } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({ providedIn: 'root' })
export class UsersService extends ApiHandler {
    userSubject: BehaviorSubject<any> = new BehaviorSubject(undefined)



    constructor(private httpClient: HttpClient, private notification: NzNotificationService,) {
        super(httpClient)
    }

    userObservable() {
        return this.userSubject.asObservable()
    }

    GetUsers() {
        this.GetAll(API_URL + API_ENDPOINTS.GetOtherUsers).pipe(map(x => x.ResponseData)).subscribe(r => {
            if (r) {
                this.userSubject.next(r)
            }
        })
    }

    addUser(data) {
        return this.Post(0, API_URL + API_ENDPOINTS.AddOtherUser, data)
            .pipe(
                map(x => x.ResponseData)).toPromise<boolean>();
    }

    updateUser(data) {
        return this.Post(data.Id, API_URL + API_ENDPOINTS.UpdateOtherUser, data)
            .pipe(
                map(x => x.ResponseData)).toPromise<boolean>();
    }

    deleteUser(id) {
        return this.Delete(API_URL + API_ENDPOINTS.DeleteOtherUser, id)
            .pipe(
                map(x => x.ResponseData)).toPromise<boolean>();
    }

    createPortalAccess(data) {
        return this.Post(data.Id, API_URL + API_ENDPOINTS.CreateOtherUserPortalAccess, data)
            .pipe(
                map(x => x.ResponseData)).toPromise<boolean>();
    }
}