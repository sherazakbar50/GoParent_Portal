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
  memberId: number

  ngOnInit(): void {
    this.informationForm = this.fb.group({
      DOB: [''],
      IDNumber: [''],
      SocialSecurity: [''],
      Weight: ['', Validators.min(1)],
      Height: ['', Validators.min(1)],
    })

    this.activatedRouter.queryParams.subscribe(params => {
      this.memberId = Number(params['id'])
      if (this.memberId > 0) {
        this._FamilyMemberService.GetChildProfileData(this.memberId).then(childData => {
          debugger
          if (childData && childData.BasicInfo) {
            childData.BasicInfo.DOB =
              childData.BasicInfo.DOB && childData.BasicInfo.DOB.split('T')[0]
            this.informationForm.patchValue(childData.BasicInfo)
          }
        })
      }
    })
  }

  async SaveChildInformation() {
    debugger
    if (this.informationForm.valid && this.memberId > 0) {
      let data = this.informationForm.value
      let result = await this._FamilyMemberService.SaveBasicInfo({ ...data, Id: this.memberId })
      if (result) {
        this.notification.success('', 'Basic information has been saved successfully!')
      }
    }
  }
}