import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { EventsDTO } from 'src/app/models/eventsDTO'
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global'
import { BaseResponse } from 'src/app/models/IApiResponse'
import { ApiHandler } from '../ApiHandler'
import { tap, catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class EventsService extends ApiHandler {
  eventObserver$: Observable<EventsDTO[]>
  private eventSubject$: BehaviorSubject<EventsDTO[]> = new BehaviorSubject<EventsDTO[]>(undefined)
  constructor(private httpClient: HttpClient) {
    super(httpClient)
    this.eventObserver$ = this.eventSubject$.asObservable()
  }

  saveEvent(data: any) {
    return this.Post(0, API_URL + API_ENDPOINTS.SaveFamilyEvent, data)
      .pipe(map(x => x.ResponseData))
      .toPromise()
  }

  getEvents(date: Date, hello: number) {
    this.GetAll(API_URL + API_ENDPOINTS.GetAllFamilyEvents).subscribe(res => {
      if (res.IsSuccessful) this.eventSubject$.next(res.ResponseData)
    })
  }
  getMonthWiseEvent(date: Date, caseId?: number) {
    this.GetEvent(
      caseId,
      API_URL + API_ENDPOINTS.GetMonthWiseFamilyEvents,
      `date=${date.toUTCString()}`,
    ).subscribe(res => {
      if (res.IsSuccessful) this.eventSubject$.next(res.ResponseData)
    })
  }

  deleteEvent(eventId: number) {
    return this.Delete(API_URL + API_ENDPOINTS.DeleteEvent, eventId)
      .pipe(map(x => x.ResponseData))
      .toPromise()
  }
}
