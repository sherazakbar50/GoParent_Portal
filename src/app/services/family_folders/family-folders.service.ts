import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { FolderElementdto } from 'src/app/models/folder-elementdto';
import { v4 } from 'uuid';
import { ApiHandler } from '../ApiHandler';
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FamilyFoldersService extends ApiHandler {
  folderObserver$: Observable<FolderElementdto[]>;
  private folderSubject$: BehaviorSubject<FolderElementdto[]> = new BehaviorSubject<FolderElementdto[]>(undefined);

  constructor(private _HttpClient: HttpClient) {
    super(_HttpClient);
    this.folderObserver$ = this.folderSubject$.asObservable();
  }


  add(fileElement: FolderElementdto) {

    return this.Post(undefined, API_URL + API_ENDPOINTS.AddUpdateFolder, fileElement).pipe(map(x => x.ResponseData))
      .toPromise<boolean>();
  }
  async getFolders() {
    let response = await this.GetAll(API_URL + API_ENDPOINTS.getAllFolders).pipe(map(x => x.ResponseData)).toPromise();
    if (response) {
      this.folderSubject$.next(response);
    }
  }

  update(fileElement: FolderElementdto) {
    return this.Post(fileElement.FolderId, API_URL + API_ENDPOINTS.AddUpdateFolder, fileElement).pipe(map(x => x.ResponseData))
      .toPromise<boolean>();
  }


  DeleteFolder(id) {
    return this.Post(id, API_URL + API_ENDPOINTS.deleteFolder, undefined)
      .pipe(map(x => x.ResponseData))
      .toPromise()
  }



}