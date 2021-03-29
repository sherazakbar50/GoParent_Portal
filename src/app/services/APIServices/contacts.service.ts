import { Injectable } from '@angular/core'
import { ApiHandler } from '../ApiHandler'
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global'
import { ContactDTO } from 'src/app/models/ContactsDTO'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { BaseResponse } from 'src/app/models/IApiResponse'
import { HttpClient } from '@angular/common/http'
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification'
import { tap, catchError, map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root',
})
export class ContactsService extends ApiHandler {
  contactObserver$: Observable<ContactDTO[]>
  private contactSubject$: BehaviorSubject<ContactDTO[]> = new BehaviorSubject<ContactDTO[]>(
    undefined,
  )

  recentcontactObserver$: Observable<ContactDTO[]>
  private recentcontactSubject$: BehaviorSubject<ContactDTO[]> = new BehaviorSubject<ContactDTO[]>(
    undefined,
  )

  public get contacts() {
    return this.contactSubject$.value
  }
  public get recentcontacts() {
    return this.recentcontactSubject$.value
  }

  constructor(private httpClient: HttpClient, private notifier: NzNotificationService) {
    super(httpClient)
    this.contactObserver$ = this.contactSubject$.asObservable()
    this.recentcontactObserver$ = this.recentcontactSubject$.asObservable()
  }

  async getContacts() {
    let response = await this.GetAll(API_URL + API_ENDPOINTS.GetAllContacts)
      .pipe(map(x => x.ResponseData))
      .toPromise()
    if (response) {
      this.contactSubject$.next(response)
    }
  }
  saveContacts(data: ContactDTO) {
    return this.Post(0, API_URL + API_ENDPOINTS.addUpdateContact, data)
      .pipe(map(x => x.ResponseData))
      .toPromise()
  }
  deleteContact(id: number) {
    return this.Delete(API_URL + API_ENDPOINTS.DeleteContact, id)
      .pipe(map(x => x.ResponseData))
      .toPromise()
  }
}
