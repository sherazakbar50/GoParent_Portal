import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ChatMessageDto } from 'src/app/models/ChatDto'
import { UserSessionModel } from 'src/app/models/UserSessionModel'
import { ChatService } from 'src/app/services/chat-services/ChatService'
import { JournalService } from 'src/app/services/journal/journal.service'
import { jwtAuthService } from 'src/app/services/jwt'

@Component({
  selector: 'app-family-chat',
  templateUrl: './family-chat.component.html',
  styleUrls: ['./family-chat.component.scss'],
})
export class FamilyChatComponent implements OnInit {
  constructor(
    private _JournalService: JournalService,
    private authService: jwtAuthService,
    private _ChatService: ChatService,
    private _router: Router,
  ) {}
  activeChatGroupId: number = 0
  activeChatGroupName: string = ''
  ChatRooms: []
  ChatMessages: ChatMessageDto[] = []
  sessionUserData: UserSessionModel
  messageText: string = ''
  addGroupModelVisible: boolean = false
  ngOnInit() {
    this._ChatService.messagesObserver$.subscribe(_messageRecieved => {
      this.ChatMessages.push(_messageRecieved)
    })
    this.authService.getUserModel().then(x => {
      this.sessionUserData = x
    })
    this.getRoomsList()
  }

  getRoomsList() {
    this._JournalService.GetChatGroups().then(_rooms => {
      this.ChatRooms = _rooms
    })
  }
  LeaveIfAnyActiveRoom() {
    if (this.activeChatGroupId > 0) {
      // if previously joins the room then leave
      this._ChatService.LeaveChatRoom(this.activeChatGroupId)
    }
  }
  changeChatGroup(_group) {
    this.LeaveIfAnyActiveRoom()
    this._ChatService.JoinChatRoom(_group.Id) // joins the new room
    this.activeChatGroupId = _group.Id
    this.activeChatGroupName = _group.Name
    this._JournalService.GetGroupChat(_group.Id).then(_messages => {
      this.ChatMessages = _messages
    })
  }
  SendMessage() {
    if (this.messageText && this.messageText.length && this.activeChatGroupId > 0) {
      let _message = new ChatMessageDto()
      _message.Message = this.messageText
      _message.Date = new Date()
      _message.Id = '1'
      _message.FromId = this.sessionUserData.FamilyMemberId
      _message.From = this.sessionUserData.FirstName + ' ' + this.sessionUserData.LastName
      _message.FromAvatar = this.sessionUserData.ProfilePicUrl
      this._ChatService.SendMessage(_message, this.activeChatGroupId)
      this.messageText = ''
    }
  }

  AddChatGroup() {
    this.addGroupModelVisible = true
  }

  addGrouChatModelCloseEvent() {
    this.addGroupModelVisible = false
  }

  GroupCreatedCallback() {
    this.addGroupModelVisible = false
    this.getRoomsList()
  }

  GoToJournal() {
    this.LeaveIfAnyActiveRoom()
    this._router.navigate(['journal'])
  }
}
