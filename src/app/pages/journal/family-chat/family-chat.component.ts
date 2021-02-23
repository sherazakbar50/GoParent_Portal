import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { ChatMessageDto, ChatUserDto } from 'src/app/models/ChatDto'
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
  @ViewChild('inputMsg') input: ElementRef
  attachmentType: string = ''
  attachmentName: string = ''
  attachmentUrl: string = ''
  isEmojiPickerVisible = false
  IsAddAttachmentModalVisible: boolean = false
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
    if (
      ((this.messageText && this.messageText.length) ||
        (this.attachmentUrl && this.attachmentUrl.length)) &&
      this.activeChatGroupId > 0
    ) {
      let _message = new ChatMessageDto()
      _message.text = this.messageText
      _message.createdAt = new Date()
      _message.send = true
      _message.attachmentType = this.attachmentType
      _message.attachmentUrl = this.attachmentUrl
      _message.attachmentName = this.attachmentName
      let chatUser = new ChatUserDto()
      chatUser._id = this.sessionUserData.FamilyMemberId
      chatUser.name = this.sessionUserData.FirstName + ' ' + this.sessionUserData.LastName
      chatUser.avatar = this.sessionUserData.ProfilePicUrl
      _message.user = chatUser
      this._ChatService.SendMessage(_message, this.activeChatGroupId)
      this.messageText = ''
      this.attachmentType = ''
      this.attachmentName = ''
      this.attachmentUrl = ''
    }
  }
  handleAddAttachmentModalCancel() {
    this.IsAddAttachmentModalVisible = false
  }
  AddAttachment() {
    this.IsAddAttachmentModalVisible = true
  }
  ChatAttachmentAddedCallback($event) {
    this.IsAddAttachmentModalVisible = false
    this.attachmentName = $event.attachmentName
    this.attachmentType = $event.attachmentType
    this.attachmentUrl = $event.attachmentUrl
    // this.messageText=`<a href='${$event.FileUrl}' download><img  alt='${$event.FileName}' width='200' height='200' src='${$event.FileUrl}' /></a> `;
    this.messageText = ''
    this.SendMessage()
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
