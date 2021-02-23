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

  constructor() {}
  messagesSubject = new Subject<ChatMessageDto>()
  userConnectedSubject = new Subject<boolean>()
  connect() {
    this.socket = io(environment.ws_url)

    this.socket.on('message', data => {
      this.messagesSubject.next(data)
    })
    this.socket.on('connect', () => {
      this.userConnectedSubject.next(true)
      console.log('User connected')
    })
    this.socket.on('reconnect', () => {
      console.log('User reconnected')
    })
    this.socket.on('disconnect', () => {
      console.log('User disconnected')
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

  SubscribeUserToGroups(familyMemberId, familyId, isParent) {
    this.socket.emit('subscibeusergroups', {
      FamilyMemberId: familyMemberId,
      Familyid: familyId,
      IsParent: isParent,
    })
  }
}
