import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject } from 'rxjs';
import { CaseTimeDto } from 'src/app/models/CaseTime/case-time-dto';
import { CaseTimeService } from 'src/app/services/cases/CaseTime/case-time.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-time',
  templateUrl: './add-time.component.html',
  styleUrls: ['./add-time.component.scss']
})
export class AddTimeComponent implements OnInit {
  form: FormGroup
  IsSubmitted = false;
  Id = 0;
  @Input() CaseId: number;
  @Output() caseTimeCreated: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Input() caseNoteDataSub?: BehaviorSubject<CaseTimeDto>;
  constructor(private fb: FormBuilder,
    private _sharedService: SharedService,
    public caseTimeService: CaseTimeService,
    private notification: NzNotificationService,
    private router: Router) {
    this.form = fb.group({
      Hourse: [0, Validators.required],
      Minutes: [0, Validators.required],
      Task: [null, Validators.required],
      Description: [null, Validators.required],
    })
  }

  ngOnInit(): void {
  }

  get Hourse() {
    return this.form.controls.Hourse
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
  get f() { return this.form.controls }

  async handleSubmit(formDirective: FormGroupDirective) {
    this.IsSubmitted = true
    if (this.form.invalid)
      return;
    let data = this.form.value as CaseTimeDto;
    data.LawyerAssociationId = this.CaseId
    data.Id = this.Id;
    let response = await this.caseTimeService.addUpdate(data);
    if (response) {
      if (data.Id == 0) {
        this.notification.success('', 'CaseTime has been created successfully!')

      } else {
        this.notification.success('', 'CaseTime has been updated successfully!')
      }
    }


    await this.caseTimeService.getCasesTime(this.CaseId);
    this.caseTimeCreated.emit(true)
  }

}
