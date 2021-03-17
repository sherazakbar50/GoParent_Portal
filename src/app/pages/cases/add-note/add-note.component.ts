import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { BehaviorSubject } from 'rxjs'
import { CaseNoteDto } from 'src/app/models/CaseNote/case-note-dto'
import { CaseNoteService } from 'src/app/services/cases/caseNote/case-note.service'
import { SharedService } from 'src/app/services/shared.service'
import { FormsService } from 'src/app/services/shared/forms.service'

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent implements OnInit {
  form: FormGroup
  IsSubmitted = false
  Id = 0
  @Input() CaseId: number
  @Output() caseNoteCreated: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Input() caseNoteDataSub?: BehaviorSubject<CaseNoteDto>

  constructor(
    private fb: FormBuilder,
    private _sharedService: SharedService,
    public caseNoteService: CaseNoteService,
    private notification: NzNotificationService,
    private _forms: FormsService,
    private router: Router,
  ) {
    this.form = fb.group(
      {
        Note: new FormControl('', [Validators.required]),
      },
      { updateOn: 'change' },
    )
  }
  get Note() {
    return this.form.controls.Note
  }
  get f() {
    return this.form.controls
  }

  ngOnInit(): void {
    if (this.caseNoteDataSub) {
      this.caseNoteDataSub.subscribe(res => {
        if (res) {
          this.Id = res.Id
          this.form.patchValue(res)
        } else {
          this.form.reset()
        }
      })
    }
  }

  async handleSubmit() {
    this._forms.markAllFieldsAsDirty(this.form)
    this.IsSubmitted = true
    if (this.form.invalid) return
    let data = this.form.value as CaseNoteDto
    data.LawyerAssociationId = this.CaseId
    data.Id = this.Id
    let response = await this.caseNoteService.addUpdate(data)
    if (response) {
      if (data.Id == 0) {
        this.notification.success('', 'Case note has been created successfully!')
      } else {
        this.notification.success('', 'Case note has been updated successfully!')
      }
    }

    await this.caseNoteService.getCasesNote(this.CaseId)
    this.caseNoteCreated.emit(true)
  }
}
