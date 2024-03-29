import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { EventsDTO } from 'src/app/models/eventsDTO'
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global'
import { BaseResponse } from 'src/app/models/IApiResponse'
import { ApiHandler } from '../ApiHandler'
import { tap, catchError, map } from 'rxjs/operators'
import { ChangeRequestService } from './change-request.service'

@Injectable({
  providedIn: 'root',
})
export class CalendarService extends ApiHandler {
  calendarObserver$: Observable<any>
  private calendarSubject$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined)
  constructor(private httpClient: HttpClient, private _request: ChangeRequestService) {
    super(httpClient)
    this.calendarObserver$ = this.calendarSubject$.asObservable()
  }

  GetMonthlyCalendarData(date: Date, caseId?: number) {
    this.GetAll(
      // API_URL + API_ENDPOINTS.GetMonthlyCalendarData,
      API_URL + API_ENDPOINTS.GetCalendarbyMonth,
      `date=${date.toUTCString()}&Id=${caseId}`,
    ).subscribe(res => {
      if (res.IsSuccessful) this.calendarSubject$.next(res.ResponseData)
    })
  }

  GetYearlyCalendarData(date: Date, caseId?: number) {
    this.GetAll(
      // API_URL + API_ENDPOINTS.GetYearlyCalendarData,
      API_URL + API_ENDPOINTS.GetCalendarbyYear,
      `date=${date.toUTCString()} &Id=${caseId}`,
    ).subscribe(res => {
      if (res.IsSuccessful) this.calendarSubject$.next(res.ResponseData)
    })
  }

  LoadCalendarDataByMode(date: Date, mode: string, caseId: number = 0) {
    if (mode === 'year') this.GetYearlyCalendarData(date, caseId)
    else this.GetMonthlyCalendarData(date, caseId)
    this._request.getRequests()
  }
}
