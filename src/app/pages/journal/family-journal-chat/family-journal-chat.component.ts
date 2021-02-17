import { Component, OnInit } from '@angular/core'
import { ChatMessageDto } from 'src/app/models/ChatDto'
import { UserSessionModel } from 'src/app/models/UserSessionModel'
import { ChatService } from 'src/app/services/chat-services/ChatService'
import { JournalService } from 'src/app/services/journal/journal.service'
import { jwtAuthService } from 'src/app/services/jwt'

@Component({
  selector: 'app-family-journal-chat',
  templateUrl: './family-journal-chat.component.html',
  styleUrls: ['./family-journal-chat.component.scss'],
})
export class FamilyJournalChatComponent implements OnInit {
  constructor(
    private _JournalService: JournalService,
    private authService: jwtAuthService,
    private _ChatService: ChatService,
  ) {}

  activeChatGroupId: number = 0
  activeChatGroupName: string = ''
  ChatMessages: ChatMessageDto[] = []
  sessionUserData: UserSessionModel
  messageText: string = ''

  ngOnInit() {
    this._ChatService.messagesObserver$.subscribe(_messageRecieved => {
      this.ChatMessages.push(_messageRecieved)
    })
    this.authService.getUserModel().then(x => {
      this.sessionUserData = x
    })
    this._JournalService.GetJournalGroupId().then(_groupId => {
      this.activeChatGroupId = _groupId

      this._ChatService.JoinChatRoom(_groupId) // joins the new room
      this._JournalService.GetGroupChat(_groupId).then(_messages => {
        this.ChatMessages = _messages
      })
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
}
