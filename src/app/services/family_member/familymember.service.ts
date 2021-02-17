import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { NzUploadFile } from 'ng-zorro-antd/upload'
import { map } from 'rxjs/operators'
import { FamilyMemberDto, VaccineDto } from 'src/app/models/Family/FamilyMemberDto'
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
  AddChild(model: any) {
    return this.Post(undefined, API_URL + API_ENDPOINTS.CreateFamilyChild, model)
      .pipe(map(x => x.ResponseData))
      .toPromise()
  }

  GetMemberVaccines(familyMemberId: number) {
    return this.GetAll(
      `${API_URL + API_ENDPOINTS.GetMemberVaccines}?familyMemberId=${familyMemberId}`,
    )
      .pipe(map(x => x.ResponseData))
      .toPromise<VaccineDto[]>()
  }
  GetVaccine(id: number) {
    return this.Get(id, `${API_URL + API_ENDPOINTS.GetMemberVaccine}`)
      .pipe(map(x => x.ResponseData))
      .toPromise<VaccineDto>()
  }
  AddUpdateVaccine(model: any) {
    return this.Post(undefined, API_URL + API_ENDPOINTS.AddUpdateVaccine, model)
      .pipe(map(x => x.ResponseData))
      .toPromise<boolean>()
  }
  DeleteVaccine(id: number) {
    return this.Post(id, API_URL + API_ENDPOINTS.DeleteVaccine, undefined)
      .pipe(map(x => x.ResponseData))
      .toPromise<boolean>()
  }

  UpdateUserInfo(
    firstName: string,
    lastName: string,
    relationship: string,
    profilePicture: any,
    isDeleteProfilePic: any,
  ) {
    const formData = new FormData()
    formData.append('ProfilePicture', profilePicture)
    formData.append('FirstName', firstName)
    formData.append('LastName', lastName)
    formData.append('Relationship', relationship)
    formData.append('IsDeleteProfilePic', isDeleteProfilePic)

    return this.Post(0, API_URL + API_ENDPOINTS.UpdateUserInfo, formData)
      .pipe(map(x => x.ResponseData))
      .toPromise()
  }

  GetAllFamilyMembers() {
    return this.GetAll(API_URL + API_ENDPOINTS.AllFamilyMembers)
      .pipe(map(x => x.ResponseData))
      .toPromise()
  }
}
