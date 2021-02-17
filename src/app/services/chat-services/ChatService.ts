import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ChatMessageDto } from 'src/app/models/ChatDto'
import { JournalService } from '../journal/journal.service'

import { WebsocketService } from './WebsocketService'

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  messagesObserver$ = new Observable<ChatMessageDto>()
  userConnectedObserver$ = new Observable<boolean>()
  constructor(
    private _WebsocketService: WebsocketService,
    private _JournalService: JournalService,
  ) {
    this.messagesObserver$ = this._WebsocketService.messagesSubject.asObservable()
    this.userConnectedObserver$ = this._WebsocketService.userConnectedSubject.asObservable()
  }

  SendMessage(data: ChatMessageDto, groupId) {
    this._WebsocketService.SendMessage(data, groupId)
  }

  JoinChatRoom(groupId) {
    this._WebsocketService.JoinGroup(groupId)
  }

  LeaveChatRoom(groupId) {
    this._WebsocketService.LeaveGroup(groupId)
  }

  AddUserToHisAllRooms() {
    this._JournalService.GetUserRoomIds().then(roomIds => {
      if (roomIds && roomIds.length) {
        ;(roomIds as any[]).forEach(roomId => {
          this.JoinChatRoom(roomId)
        })
      }
    })
  }
}
