import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  MinLengthValidator,
  Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { BehaviorSubject } from 'rxjs'
import { CaseTimeDto } from 'src/app/models/CaseTime/case-time-dto'
import { CaseTimeService } from 'src/app/services/cases/CaseTime/case-time.service'
import { SharedService } from 'src/app/services/shared.service'
import { FormsService } from 'src/app/services/shared/forms.service'

@Component({
  selector: 'app-add-time',
  templateUrl: './add-time.component.html',
  styleUrls: ['./add-time.component.scss'],
})
export class AddTimeComponent implements OnInit {
  form: FormGroup
  IsSubmitted = false
  Id = 0

  @Input() CaseId: number
  @Output() caseTimeCreated: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Input() caseTimeDataSub?: BehaviorSubject<CaseTimeDto>
  constructor(
    private fb: FormBuilder,
    private _sharedService: SharedService,
    public caseTimeService: CaseTimeService,
    private notification: NzNotificationService,
    private router: Router,
    private _forms: FormsService,
  ) {
    this.form = fb.group(
      {
        Hours: [
          ,
          { validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.max(23)] },
        ],
        Minutes: [
          ,
          { validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.max(59)] },
        ],
        Task: [null, { validators: [Validators.required] }],
        Description: [null, { validators: [Validators.required] }],
      },
      { updateOn: 'change' },
    )
  }

  ngOnInit(): void {
    if (this.caseTimeDataSub) {
      this.caseTimeDataSub.subscribe(res => {
        if (res) {
          this.Id = res.Id
          this.form.patchValue(res)
        } else {
          this.form.reset()
        }
      })
    }
  }

  get Hours() {
    return this.form.controls.Hours
  }

  get Minutes() {
    return this.form.controls.Minutes
  }

  get Task() {
    return this.form.controls.Task
  }
  get Description() {
    return this.form.controls.Description
  }
  get f() {
    return this.form.controls
  }
  async handleSubmit() {
    this._forms.markAllFieldsAsDirty(this.form)
    this.IsSubmitted = true
    if (this.form.invalid) return
    let data = this.form.value as CaseTimeDto
    data.LawyerAssociationId = this.CaseId
    data.Id = this.Id
    let response = await this.caseTimeService.addUpdate(data)
    if (response) {
      if (data.Id == 0) {
        this.notification.success('', 'Case time has been created successfully!')
      } else {
        this.notification.success('', 'Case time has been updated successfully!')
      }
    }

    await this.caseTimeService.getCasesTime(this.CaseId)
    this.caseTimeCreated.emit(true)
  }
}
