import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { Subscription } from 'rxjs'
import { CheckInOutDTO } from 'src/app/models/CheckInOutDTO'
import { FamilyMemberDto } from 'src/app/models/Family/FamilyMemberDto'
import { UserSessionModel } from 'src/app/models/UserSessionModel'
import { CheckInOutService } from 'src/app/services/calendar-services/check-in-out.service'
import { FamilyMemberService } from 'src/app/services/family_member/familymember.service'
import { jwtAuthService } from 'src/app/services/jwt'
import { FormsService } from 'src/app/services/shared/forms.service'

@Component({
  selector: 'app-check-in-out',
  templateUrl: './check-in-out.component.html',
  styleUrls: ['./check-in-out.component.scss'],
})
export class CheckInOutComponent implements OnInit {
  form: FormGroup
  @Input() data
  @Output() close = new EventEmitter<boolean>()
  dataList: CheckInOutDTO[] = []
  isAddUpdate: boolean = false
  subscription: Subscription
  childList: FamilyMemberDto[] = []
  currentUserData: UserSessionModel
  currentUserId: string

  constructor(
    private _checkInOut: CheckInOutService,
    private _forms: FormsService,
    private _notify: NzNotificationService,
    private _auth: jwtAuthService,
    private _familyMember: FamilyMemberService,
  ) {
    _auth.getUserModel().then(r => {
      this.currentUserData = r
      this.currentUserId = r.UserId
      this._familyMember.GetFamilyChildsList(this.currentUserData.FamilyId).then(s => {
        this.childList = s
      })
    })
  }

  ngOnChanges(change: SimpleChanges) {
    this.isAddUpdate = false
    if (this.data) {
    } else {
      // this.form.reset()
    }
  }

  async ngOnInit() {
    this._checkInOut.getList()
    this.subscription = this._checkInOut.getCheckListObserver$().subscribe((r: any) => {
      // console.log('r:', r)
      if (r) this.dataList = r
    })

    if (this.currentUserData) {
    }

    this.form = new FormGroup({
      Id: new FormControl(0),
      IsCheckIn: new FormControl(true),
      ChildId: new FormControl(null, [Validators.required]),
      DateTime: new FormControl(null, [Validators.required]),
      Location: new FormControl(null),
      Notes: new FormControl(null),
    })
  }

  async submitForm() {
    this._forms.markAllFieldsAsDirty(this.form)
    if (this.form.invalid) return

    let data = this.form.value as CheckInOutDTO
    if (!data.Id) {
      data.Id = 0
    }
    let res = await this._checkInOut.addUpdate(data)
    if (res) {
      this._checkInOut.getList()
      this.isAddUpdate = false
      this._notify.success('', 'Record submitted successfully!')
      this.form.reset({ IsCheckIn: true })
    }
  }

  edit(data: CheckInOutDTO) {
    if (data) {
      this.isAddUpdate = true
      this.form.patchValue(data)
    }
  }

  delete(id: number) {
    if (id) {
      this.isAddUpdate = true
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
