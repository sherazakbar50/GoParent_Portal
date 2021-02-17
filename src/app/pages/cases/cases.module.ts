import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CasesRoutingModule } from './cases-routing.module';
import { ViewCasesComponent } from './view-cases/view-cases.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NoteTabComponent } from './note-tab/note-tab.component';
import { TimeTabComponent } from './time-tab/time-tab.component';
import { CasesTabComponent } from './cases-tab/cases-tab.component';
import { SharedModule } from 'src/app/shared.module';
import { AddNoteComponent } from './add-note/add-note.component';
import { AddTimeComponent } from './add-time/add-time.component'
@NgModule({
  declarations: [ViewCasesComponent, NoteTabComponent, TimeTabComponent, CasesTabComponent, AddNoteComponent, AddTimeComponent],
  imports: [
    CommonModule,
    CasesRoutingModule,
    NzDropDownModule,
    SharedModule
  ]
})
export class CasesModule { }
