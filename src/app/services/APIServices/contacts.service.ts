import { Injectable } from '@angular/core';
import { ApiHandler } from '../ApiHandler';
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global';
import { ContactDTO } from 'src/app/models/contactsDTO';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseResponse } from 'src/app/models/IApiResponse';
import { HttpClient } from '@angular/common/http';

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


  constructor(private httpClient: HttpClient) {
    super(httpClient);
    this.contactObserver$ = this.contactSubject$.asObservable();
    this.recentcontactObserver$ = this.recentcontactSubject$.asObservable();
  }

  getContacts() {
    this.GetAll(API_URL + API_ENDPOINTS.Contacts + "/list").subscribe(res => {
      this.contactSubject$.next(res.ResponseData);
    });
  }
  saveContacts(file: any, data: ContactDTO): Observable<BaseResponse> {
    const formData = new FormData();
    formData.append('Name', data.fullName);
    formData.append('Email', data.email);
    formData.append('PhoneNo', data.phoneNo);
    formData.append('FamilyId', data.familyId.toString());
    return this.Post(0,API_URL + API_ENDPOINTS.Contacts,formData);
  }

//   editContact(file: any, data: ContactDTO): Observable<BaseResponse> {
//     const formData = new FormData();
//     formData.append('File', file);
//     formData.append('FirstName', data.firstName);
//     formData.append('LastName', data.lastName);
//     formData.append('Name', data.name);
//     formData.append('Email', data.email);
//     formData.append('CompanyName', data.companyName);
//     formData.append('Notes', data.notes);
//     formData.append('ContactTypeId', data.contactTypeId.toString());
//     formData.append('CityId', data.cityId.toString());
//     formData.append('StateId', data.stateId.toString());
//     formData.append('CountryId', data.countryId.toString());
//     formData.append('LanguageId', data.languageId.toString());
//     formData.append('ImageName', data.imageName);
//     return this.Update(data.id, formData, API_URL + API_ENDPOINTS.Contacts);
//   }
//   deleteContact(data: ContactDTO): Observable<BaseResponse> {
//     return this.Delete(data.id, API_URL + API_ENDPOINTS.Contacts);
//   }

//   isContactExist(email): Observable<BaseResponse> {
//     return this.Get(email, API_URL + API_ENDPOINTS.Contacts + '/IsContactExist');
//     //return this.IsContactExist(API_URL + API_ENDPOINTS.Contacts+"/IsContactExist/");
//   }

//   createAccount(data: ContactDTO) {
//     return this.Post(data, API_URL + API_ENDPOINTS.Users + "/CreateClientAccount");
//   }

}  