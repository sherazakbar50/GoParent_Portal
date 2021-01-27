import { Injectable } from '@angular/core';
import { ApiHandler } from '../ApiHandler';
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global';
import { ContactDTO } from 'src/app/models/contactsDTO';
import { BehaviorSubject, Observable,throwError } from 'rxjs';
import { BaseResponse } from 'src/app/models/IApiResponse';
import { HttpClient } from '@angular/common/http';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';
@Injectable({
  providedIn: 'root'
})

export class ContactsService extends ApiHandler {

  contactObserver$: Observable<ContactDTO[]>;
  private contactSubject$: BehaviorSubject<ContactDTO[]> = new BehaviorSubject<ContactDTO[]>(undefined);

  recentcontactObserver$: Observable<ContactDTO[]>;
  private recentcontactSubject$: BehaviorSubject<ContactDTO[]> = new BehaviorSubject<ContactDTO[]>(undefined);

  public get contacts() { return this.contactSubject$.value; }
  public get recentcontacts() { return this.recentcontactSubject$.value; }


  constructor(private httpClient: HttpClient,private notify:NzNotificationService) {
    super(httpClient);
    this.contactObserver$ = this.contactSubject$.asObservable();
    this.recentcontactObserver$ = this.recentcontactSubject$.asObservable();
  }

  getContacts() {
    this.GetAll(API_URL + API_ENDPOINTS.GetAllContacts).subscribe(res => {
      this.contactSubject$.next(res.ResponseData);
    },
    error =>{
      debugger
     this.notify.error('','Something went wrong while getting contacts data')
    }
    );
  }
  saveContacts(data: ContactDTO): Observable<BaseResponse> {
    return this.Post(0,API_URL + API_ENDPOINTS.addUpdateContact, data);
  }
    deleteContact(id: number): Observable<BaseResponse> {
    return this.Delete(API_URL + API_ENDPOINTS.DeleteContact,id);
  }
}  