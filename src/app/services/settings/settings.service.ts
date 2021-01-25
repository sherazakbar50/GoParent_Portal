import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global'
import { ApiHandler } from '../ApiHandler'

@Injectable({
  providedIn: 'root',
})
export class SettingsService extends ApiHandler {
  constructor(private _HttpClient: HttpClient) {
    super(_HttpClient)
  }

  IsOtherCoparentExists() {
    return this.Get(0, API_URL + API_ENDPOINTS.IsOtherCoparentExists)
      .pipe(map(x => x.ResponseData))
      .toPromise<boolean>()
  }
}
