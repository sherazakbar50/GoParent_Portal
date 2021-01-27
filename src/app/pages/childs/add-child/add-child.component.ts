import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { FamilyMemberService } from 'src/app/services/family_member/familymember.service'

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.scss'],
})
export class AddChildComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _FamilyMemberService: FamilyMemberService,
    private notification: NzNotificationService,
  ) {}
  addChildForm: FormGroup
  IsSubmitted: boolean = false
  @Output() childCreated: EventEmitter<boolean> = new EventEmitter<boolean>()
  ngOnInit(): void {
    this.addChildForm = this.fb.group({
      ChildFirstName: ['', Validators.required],
      ChildLastName: ['', Validators.required],
    })
  }
  get FirstNameControl() {
    return this.addChildForm.controls.ChildFirstName
  }
  get LastNameControl() {
    return this.addChildForm.controls.ChildLastName
  }

  async handleSubmit() {
    this.IsSubmitted = true
    if (this.addChildForm.valid) {
      let response = await this._FamilyMemberService.AddChild(this.addChildForm.value)
      if (response) {
        this.notification.success('', 'Child has been created successfully!')
        this.childCreated.emit(true)
      } else {
        this.notification.error('', 'There is some error please try again later!')
      }
    }
  }
}
