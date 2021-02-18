import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CaseNoteDto } from 'src/app/models/CaseNote/case-note-dto';
import { CaseNoteService } from 'src/app/services/cases/caseNote/case-note.service';

@Component({
  selector: 'app-note-tab',
  templateUrl: './note-tab.component.html',
  styleUrls: ['./note-tab.component.scss']
})
export class NoteTabComponent implements OnInit {
  isVisible: boolean = false;
  CaseNotemodalTitle: string = 'Add case note';
  CaseId: number;
  case = new CaseNoteDto;
  listData: CaseNoteDto[] = [];
  @Input() caseId: number;
  caseNoteObserverSubject: BehaviorSubject<CaseNoteDto> = new BehaviorSubject(null);
  constructor(private caseNoteService: CaseNoteService) { }

  ngOnInit(): void {
    this.loadCaseNotes()
  }

  async loadCaseNotes() {
    this.caseNoteService.caseNoteObserver$.subscribe(res => {
      if (res) {
        this.listData = res;
      }
    });
    await this.caseNoteService.getCasesNote(this.caseId)
  }

  AddNote() {
    this.isVisible = true
    this.caseNoteObserverSubject.next(null);
  }

  SavedCallBack() {
    this.isVisible = false
  }

  ModalCancel() {
    this.isVisible = false
  }
  async AddNoteSuccess($event) {
    this.isVisible = false
  }



  EditCaseNote(data: CaseNoteDto) {
    this.CaseNotemodalTitle = "Edit case note";
    this.isVisible = true;
    this.caseNoteObserverSubject.next(data);
  }


}
