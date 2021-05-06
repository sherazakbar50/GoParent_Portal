import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { NzNotificationService } from 'ng-zorro-antd/notification'
import { FamilyMemberDto, VaccineDto } from 'src/app/models/Family/FamilyMemberDto'
import { FamilyMemberService } from 'src/app/services/family_member/familymember.service'

@Component({
  selector: 'app-add-child-vaccine',
  templateUrl: './add-child-vaccine.component.html',
  styleUrls: ['./add-child-vaccine.component.scss'],
})
export class AddChildVaccineComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _FamilyMemberService: FamilyMemberService,
    private notification: NzNotificationService,
  ) { }
  @Input() familyMemberId: number
  @Input() VaccineId: number
  vaccineForm: FormGroup
  IsSubmitted: boolean = false
  @Output() vaccineCreated: EventEmitter<boolean> = new EventEmitter<boolean>()
  ngOnInit(): void {
    this.vaccineForm = this.fb.group({
      Name: ['', Validators.required],
      Date: ['', Validators.required],
      Notes: [''],
    })
    if (this.VaccineId > 0) {
      this._FamilyMemberService.GetVaccine(this.VaccineId).then(vaccineData => {
        if (vaccineData) {
          vaccineData.Date = vaccineData.Date && (vaccineData.Date as any).split('T')[0]
          this.vaccineForm.patchValue(vaccineData)
        }
      })
    }
  }
  get VaccineName() {
    return this.vaccineForm.controls.Name
  }
  get VaccineDate() {
    return this.vaccineForm.controls.Date
  }

  async submitHandler() {
    this.IsSubmitted = true
    if (this.vaccineForm.valid) {
      let data = this.vaccineForm.value
      let result = await this._FamilyMemberService.AddUpdateVaccine({
        ...data,
        FamilyMemberId: this.familyMemberId,
        Id: this.VaccineId,
      })
      if (result) {
        this.notification.success(
          '',
          `Vaccine has been ${this.VaccineId > 0 ? 'updated' : 'created'} successfully!`,
        )
        this.vaccineCreated.emit(true)
      } else {
        this.notification.error('', 'There is some error please try again later!')
      }
    }
  }
}
