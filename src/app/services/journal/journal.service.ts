import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global'
import { ApiHandler } from '../ApiHandler'

@Injectable({
  providedIn: 'root',
})
export class JournalService extends ApiHandler {
  constructor(private _httpClient: HttpClient) {
    super(_httpClient)
  }

  GetChatGroups(id: number) {
    return this.Get(id, API_URL + API_ENDPOINTS.ChatGoupsList)
      .pipe(map(x => x.ResponseData))
      .toPromise()
  }
  AddUpdateChatGroup(roomId: number, RoomName: string, memberIds: any[]) {
    return this.Post(undefined, API_URL + API_ENDPOINTS.AddUpdateChatGroup, {
      RoomId: roomId,
      RoomName: RoomName,
      MemberIds: memberIds,
    })
      .pipe(map(x => x.ResponseData))
      .toPromise<boolean>()
  }

  GetGroupChat(groupId) {
    return this.GetAll(API_URL + API_ENDPOINTS.GetGroupChat + '?Id=' + groupId)
      .pipe(map(x => x.ResponseData))
      .toPromise()
  }
  GetUserRoomIds() {
    return this.GetAll(API_URL + API_ENDPOINTS.UserAllRoomIds)
      .pipe(map(x => x.ResponseData))
      .toPromise()
  }
  GetJournalGroupId(id: number) {
    return this.Get(id, API_URL + API_ENDPOINTS.JournalGroupId)
      .pipe(map(x => x.ResponseData))
      .toPromise()
  }
}
