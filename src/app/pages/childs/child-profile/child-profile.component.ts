import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { FamilyMemberService } from 'src/app/services/family_member/familymember.service'

@Component({
  selector: 'app-child-profile',
  templateUrl: './child-profile.component.html',
  styleUrls: ['./child-profile.component.scss'],
})
export class ChildProfileComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _FamilyMemberService: FamilyMemberService,
    private notification: NzNotificationService,
    private activatedRouter: ActivatedRoute,
  ) {}
  informationForm: FormGroup
  MedicalForm: FormGroup
  BankForm: FormGroup
  memberId: number

  ngOnInit(): void {
    // Information form
    this.informationForm = this.fb.group({
      DOB: [''],
      IDNumber: [''],
      SocialSecurity: [''],
      Weight: ['', Validators.min(1)],
      Height: ['', Validators.min(1)],
      TShirt: ['', Validators.min(1)],
      Dress: ['', Validators.min(1)],
      Trousers: ['', Validators.min(1)],
      ShoeSize: ['', Validators.min(1)],
    })

    // Medical Form
    this.MedicalForm = this.fb.group({
      BloodType: [''],
      Allergies: [''],
      Diseases: [''],
      ChronicProblems: [''],
    })
    // Bank Form
    this.BankForm = this.fb.group({
      AccountName: [''],
      AccountNumber: [''],
      Bank: [''],
      BankNotes: [''],
    })

    this.activatedRouter.queryParams.subscribe(params => {
      this.memberId = Number(params['id'])
      if (this.memberId > 0) {
        this._FamilyMemberService.GetChildProfileData(this.memberId).then(childData => {
          this.SetProfileData(childData)
        })
      }
    })
  }
  SetProfileData(childData) {
    // set basic info form data
    if (childData && childData.BasicInfo) {
      childData.BasicInfo.DOB = childData.BasicInfo.DOB && childData.BasicInfo.DOB.split('T')[0]
      this.informationForm.patchValue(childData.BasicInfo)
    }
    // set medical form data
    if (childData && childData.MedicalInfo) {
      this.MedicalForm.patchValue(childData.MedicalInfo)
    }
    // set bank form data
    if (childData && childData.BankInfo) {
      this.BankForm.patchValue(childData.BankInfo)
    }
  }
  async SaveChildInformation() {
    if (this.informationForm.valid && this.memberId > 0) {
      let data = this.informationForm.value
      let result = await this._FamilyMemberService.SaveBasicInfo({ ...data, Id: this.memberId })
      if (result) {
        this.notification.success('', 'Basic information has been saved successfully!')
      }
    }
  }
  async SaveMedicalInfo() {
    if (this.MedicalForm.valid && this.memberId > 0) {
      let data = this.MedicalForm.value
      let result = await this._FamilyMemberService.SaveMedicalInfo({ ...data, Id: this.memberId })
      if (result) {
        this.notification.success('', 'Medical information has been saved successfully!')
      }
    }
  }

  async SaveBankInfo() {
    if (this.BankForm.valid && this.memberId > 0) {
      let data = this.BankForm.value
      let result = await this._FamilyMemberService.SaveBankForm({ ...data, Id: this.memberId })
      if (result) {
        this.notification.success('', 'Bank information has been saved successfully!')
      }
    }
  }
}
