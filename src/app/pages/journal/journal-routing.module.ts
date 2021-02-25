import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FamilyChatComponent } from './family-chat/family-chat.component'
import { FamilyJournalChatComponent } from './family-journal-chat/family-journal-chat.component'
const routes: Routes = [
  { path: '', component: FamilyJournalChatComponent, data: { title: 'Journal' } },
  { path: 'groupchat', component: FamilyChatComponent, data: { title: 'Group Chat' } },
  { path: '**', redirectTo: '', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JournalRoutingModule { }
