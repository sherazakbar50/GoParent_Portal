import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global'
import { ApplicationRolesEnum } from 'src/app/models/UserSessionModel'
import { ApiHandler } from '../ApiHandler'

@Injectable({
  providedIn: 'root',
})
export class ConnectionService extends ApiHandler {
  constructor(private _HttpClient: HttpClient) {
    super(_HttpClient)
  }

  IsOtherCoparentExists() {
    return this.Get(0, API_URL + API_ENDPOINTS.IsOtherCoparentExists)
      .pipe(map(x => x.ResponseData))
      .toPromise<boolean>()
  }
  CreatePortalAccess(
    email: string,
    FamilyMemberId: number = 0,
    PortalAccessFor: ApplicationRolesEnum = ApplicationRolesEnum.Parent,
  ) {
    return this.Post(0, API_URL + API_ENDPOINTS.CreatePortalAccess, {
      Email: email,
      FamilyMemberId: FamilyMemberId,
      PortalAccessFor: PortalAccessFor,
    })
      .pipe(map(x => x.ResponseData))
      .toPromise<boolean>()
  }
  GetOtherCoParentIfExits() {
    return this.Get(0, API_URL + API_ENDPOINTS.GetOtherCoParentIfExits)
      .pipe(map(x => x.ResponseData))
      .toPromise<boolean>()
  }
}
