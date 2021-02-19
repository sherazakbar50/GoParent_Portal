import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
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
  @ViewChild('inputMsg') input: ElementRef
  activeChatGroupId: number = 0
  activeChatGroupName: string = ''
  ChatMessages: ChatMessageDto[] = []
  sessionUserData: UserSessionModel
  messageText: string = ''
  isEmojiPickerVisible = false
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
  OpenEmojiPicker() {
    this.isEmojiPickerVisible = !this.isEmojiPickerVisible
  }
  addEmoji(event) {
    const emoji: string = event.emoji.native
    const input = this.input.nativeElement
    input.focus()
    if (document.execCommand) {
      document.execCommand('insertText', false, emoji)
      return
    }
    // insert emoji on carrot position
    const [start, end] = [input.selectionStart, input.selectionEnd]
    input.setRangeText(emoji, start, end, 'end')
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
