import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  EventEmitter,
} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { NzModalService } from 'ng-zorro-antd/modal'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { FamilyMemberDto } from 'src/app/models/Family/FamilyMemberDto'
import { SelectItem } from 'src/app/models/Global'
import { CustodyRequestStatusEnum, RequestDTO } from 'src/app/models/RequestDTO'
import { ChangeRequestService } from 'src/app/services/calendar-services/change-request.service'
import { ConnectionService } from 'src/app/services/connection/connection.service'
import { FamilyMemberService } from 'src/app/services/family_member/familymember.service'
import { jwtAuthService } from 'src/app/services/jwt'
import { FormsService } from 'src/app/services/shared/forms.service'

@Component({
  selector: 'app-change-request',
  templateUrl: './change-request.component.html',
  styleUrls: ['./change-request.component.scss'],
})
export class ChangeRequestComponent implements OnInit, OnChanges {
  @Input() Data: any
  @Output() close = new EventEmitter<boolean>()
  isViewMode = false
  isSameUser = true
  statusEnum = CustodyRequestStatusEnum
  form: FormGroup
  parentList: FamilyMemberDto[]
  childList: FamilyMemberDto[]
  currentUserId: string
  currentUserData: any
  dataList: RequestDTO[] = []

  constructor(
    private _forms: FormsService,
    private _notification: NzNotificationService,
    private _request: ChangeRequestService,
    private _auth: jwtAuthService,
    private _familyMember: FamilyMemberService,
  ) {
    _auth.getUserModel().then(r => {
      this.currentUserData = r
      this.currentUserId = r.UserId
    })
    this.form = new FormGroup({
      Id: new FormControl(0),
      ParentId: new FormControl(null, [Validators.required]),
      ChildId: new FormControl(null, [Validators.required]),
      DateFrom: new FormControl(null, [Validators.required]),
      DateTo: new FormControl(null, [Validators.required]),
      Notes: new FormControl(null),
    })
  }

  ngOnChanges(change: SimpleChanges) {
    if (this.Data) {
      this.form.patchValue({
        Id: this.Data.Id,
        ParentId: this.Data.ParentId,
        ChildId: this.Data.ChildId,
        DateFrom: this.Data.StartDate,
        DateTo: this.Data.EndDate,
        Notes: this.Data.Note,
      })
      this.isViewMode = false
    } else {
      this.isViewMode = true
    }
  }

  async ngOnInit() {
    this._request.getRequests()
    this._request.requestObs$().subscribe(r => {
      if (r) {
        this.dataList = r
      }
    })

    this.parentList = await this._familyMember.GetCoParentsInfo()

    if (this.currentUserData)
      this.childList = await this._familyMember.GetFamilyChildsList(this.currentUserData.FamilyId)
  }

  async submitForm() {
    this._forms.markAllFieldsAsDirty(this.form)
    if (this.form.invalid) return
    let data = this.form.value as RequestDTO
    if (!data.Id) {
      data.Id = 0
    }
    let r = await this._request.addUpdate(data)
    if (r) {
      this._notification.success('', 'Change Request submitted successfully!')
      // this.close.emit(true);
      this.isViewMode = false
      this.form.reset()
      this._request.getRequests()
    }
  }

  editChangeRequest(data: RequestDTO) {
    this.isViewMode = false
    this.Data = data
    this.form.patchValue({
      Id: this.Data.Id,
      ParentId: this.Data.ParentId,
      ChildId: this.Data.ChildId,
      DateFrom: this.Data.DateFrom,
      DateTo: this.Data.DateTo,
      Notes: this.Data.Notes,
    })
    if (data.UserId !== this.currentUserId) {
      this._forms.disableControls(this.form)
    } else {
      this._forms.enableControls(this.form)
      this._forms.markAllFieldsAsDirty(this.form)
    }
  }

  async updateStatus(status: number) {
    let _data = {
      Id: this.Data.Id,
      ParentId: this.Data.ParentId,
      ChildId: this.Data.ChildId,
      DateFrom: this.Data.StartDate,
      DateTo: this.Data.EndDate,
      Notes: this.Data.Note,
      Status: status,
    } as RequestDTO

    let res = await this._request.updateStatus(_data)
    if (res) {
      this._notification.success('', `You have ${this.statusEnum[status]} the request!`)
      // this.close.emit(true);
      this.isViewMode = true
      this._request.getRequests()
    }
  }

  async delete(id: number) {}
}
