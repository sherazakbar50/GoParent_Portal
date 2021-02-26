import { Component, Input, OnInit } from '@angular/core'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { BehaviorSubject } from 'rxjs'
import { CaseNoteDto } from 'src/app/models/CaseNote/case-note-dto'
import { AlertService } from 'src/app/services/alert-service/alert-service'
import { CaseNoteService } from 'src/app/services/cases/caseNote/case-note.service'
declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-note-tab',
  templateUrl: './note-tab.component.html',
  styleUrls: ['./note-tab.component.scss'],
})
export class NoteTabComponent implements OnInit {
  isVisible: boolean = false
  CaseNotemodalTitle: string = 'Add case note'
  CaseId: number
  case = new CaseNoteDto()
  listData: CaseNoteDto[] = []
  @Input() caseId: number
  caseNoteObserverSubject: BehaviorSubject<CaseNoteDto> = new BehaviorSubject(null)
  constructor(
    private caseNoteService: CaseNoteService,
    private notification: NzNotificationService,
    private _alert: AlertService,
  ) {}

  ngOnInit(): void {
    this.loadCaseNotes()
  }

  async loadCaseNotes() {
    this.caseNoteService.caseNoteObserver$.subscribe(res => {
      if (res) {
        this.listData = res
      }
    })
    await this.caseNoteService.getCasesNote(this.caseId)
  }

  AddNote() {
    this.isVisible = true
    this.caseNoteObserverSubject.next(null)
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
    this.CaseNotemodalTitle = 'Edit case note'
    this.isVisible = true
    this.caseNoteObserverSubject.next(data)
  }

  async DeleteNote(id: any) {
    this._alert.Delete('Are you sure you want to delete the Note?', async result => {
      if (result && result.isConfirmed) {
        let response = await this.caseNoteService.DeleteCaseNote(id)
        if (response) {
          this.notification.success('', 'Case note has been deleted successfully!')
          await this.loadCaseNotes()
        } else {
          this.notification.error('', 'There is some error please try again later!')
        }
      }
    })
  }
}
