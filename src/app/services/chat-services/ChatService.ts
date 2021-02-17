import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ChatMessageDto } from 'src/app/models/ChatDto'
import { WebsocketService } from './WebsocketService'

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  messagesObserver$ = new Observable<ChatMessageDto>()
  userConnectedObserver$ = new Observable<boolean>()
  constructor(private _WebsocketService: WebsocketService) {
    this.messagesObserver$ = this._WebsocketService.messagesSubject.asObservable()
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
}
