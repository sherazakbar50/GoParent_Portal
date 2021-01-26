import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { FamilyMemberDto } from 'src/app/models/Family/FamilyMemberDto'
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global'
import { ApiHandler } from '../ApiHandler'

@Injectable({
  providedIn: 'root',
})
export class FamilyMemberService extends ApiHandler {
  constructor(private _HttpClient: HttpClient) {
    super(_HttpClient)
  }

  GetFamilyChildsList(familyId) {
    return this.GetAll(API_URL + API_ENDPOINTS.GetFamilyChildsList + '?familyId=' + familyId)
      .pipe(map(x => x.ResponseData))
      .toPromise<FamilyMemberDto[]>()
  }
  DeleteFamilyMember(id: number) {
    debugger
    return this.Post(id, API_URL + API_ENDPOINTS.DeleteFamilyMember, undefined)
      .pipe(map(x => x.ResponseData))
      .toPromise<boolean>()
  }
  SaveBasicInfo(data: any) {
    return this.Post(undefined, API_URL + API_ENDPOINTS.SaveBasicInfo, data)
      .pipe(map(x => x.ResponseData))
      .toPromise<boolean>()
  }
  SaveMedicalInfo(data: any) {
    return this.Post(undefined, API_URL + API_ENDPOINTS.SaveMedicalInfo, data)
      .pipe(map(x => x.ResponseData))
      .toPromise<boolean>()
  }
  SaveBankForm(data: any) {
    return this.Post(undefined, API_URL + API_ENDPOINTS.SaveBankInfo, data)
      .pipe(map(x => x.ResponseData))
      .toPromise<boolean>()
  }
  GetChildProfileData(id) {
    return this.Get(id, API_URL + API_ENDPOINTS.GetChildProfile)
      .pipe(map(x => x.ResponseData))
      .toPromise()
  }
}
