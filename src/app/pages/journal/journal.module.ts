import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PickerModule } from '@ctrl/ngx-emoji-mart'
import { JournalRoutingModule } from './journal-routing.module'
import { FamilyChatComponent } from './family-chat/family-chat.component'
import { SharedModule } from '../../shared.module'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { AddChatGroupComponent } from './add-chat-group/add-chat-group.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FamilyJournalChatComponent } from './family-journal-chat/family-journal-chat.component'
import { ChatAttachmentComponent } from './chat-attachment/chat-attachment.component'
@NgModule({
  declarations: [
    FamilyChatComponent,
    AddChatGroupComponent,
    FamilyJournalChatComponent,
    ChatAttachmentComponent,
  ],
  imports: [
    CommonModule,
    JournalRoutingModule,
    SharedModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    PickerModule,
  ],

  exports: [FamilyChatComponent, FamilyJournalChatComponent],
})
export class JournalModule {}
