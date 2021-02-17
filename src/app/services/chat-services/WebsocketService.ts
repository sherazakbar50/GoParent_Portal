import { Injectable } from '@angular/core'
import { io } from 'socket.io-client'
import { environment } from 'src/environments/environment'
import { Subject, Observable } from 'rxjs'
import { ChatMessageDto } from 'src/app/models/ChatDto'

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket

  constructor() {
    this.connect()
  }
  messagesSubject = new Subject<ChatMessageDto>()

  connect() {
    this.socket = io(environment.ws_url)

    this.socket.on('message', data => {
      debugger
      this.messagesSubject.next(data)
    })
  }
  SendMessage(data, groupId) {
    this.socket.emit('message', groupId, data)
  }

  JoinGroup(groupId) {
    this.socket.emit('joingroup', groupId.toString())
  }

  LeaveGroup(groupId) {
    this.socket.emit('leavegroup', groupId.toString())
  }
}
