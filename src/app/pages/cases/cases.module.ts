import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CasesRoutingModule } from './cases-routing.module'
import { ViewCasesComponent } from './view-cases/view-cases.component'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NoteTabComponent } from './note-tab/note-tab.component'
import { TimeTabComponent } from './time-tab/time-tab.component'
import { CasesTabComponent } from './cases-tab/cases-tab.component'
import { SharedModule } from 'src/app/shared.module'
import { AddNoteComponent } from './add-note/add-note.component'
import { AddTimeComponent } from './add-time/add-time.component'
import { DocumentsModule } from '../documents/documents.module'
import { ViewFolderComponent } from '../documents/view-folder/view-folder.component'
import { ViewDocumentsComponent } from '../documents/view-documents/view-documents.component'
import { JournalModule } from '../journal/journal.module'
import { CalendarModule } from '../calendar/calendar.module'
import { FamilyExpensesModule } from '../family-expenses/family-expenses.module'
import { AgreementModule } from '../agreement/agreement.module'

@NgModule({
  declarations: [
    ViewCasesComponent,
    NoteTabComponent,
    TimeTabComponent,
    CasesTabComponent,
    AddNoteComponent,
    AddTimeComponent,
  ],
  imports: [
    CommonModule,
    CasesRoutingModule,
    NzDropDownModule,
    SharedModule,
    DocumentsModule,
    JournalModule,
    CalendarModule,
    FamilyExpensesModule,
    AgreementModule,
  ],
})
export class CasesModule { }
