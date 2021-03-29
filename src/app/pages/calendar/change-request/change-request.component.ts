import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { map } from 'rxjs/operators'
import { FamilyMemberDto } from 'src/app/models/Family/FamilyMemberDto'
import { API_ENDPOINTS, API_URL } from 'src/app/models/Global'
import { CustodyRequestStatusEnum, RequestDTO } from 'src/app/models/RequestDTO'
import { AlertService } from 'src/app/services/alert-service/alert-service'
import { CalendarService } from 'src/app/services/calendar-services/calendar-service'
import { ChangeRequestService } from 'src/app/services/calendar-services/change-request.service'
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
  @Input() caseId?: number
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
    private _calendarService: CalendarService,
    private _alert: AlertService,
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
    this.isViewMode = true
  }

  async ngOnInit() {
    if (this.caseId && this.caseId > 0) {
      this._request.getRequests(this.caseId)
    } else {
      this._request.getRequests()
      this.parentList = await this._familyMember.GetCoParentsInfo()

      if (this.currentUserData)
        this.childList = await this._familyMember.GetFamilyChildsList(this.currentUserData.FamilyId)
    }

    this._request.requestObs$().subscribe(r => {
      if (r) {
        this.dataList = r
      }
    })
  }

  async submitForm() {
    this._forms.markAllFieldsAsDirty(this.form)
    if (this.form.invalid) return
    let data = this.form.value as RequestDTO
    if (this.checkDates(data.DateFrom, data.DateTo)) {
      this._notification.warning('Wrong Dates', 'Date To must be greater than Date From')
      return
    }
    if (!data.Id) {
      data.Id = 0
    }
    let r = await this._request.addUpdate(data)
    if (r) {
      this._notification.success('', 'Change Request submitted successfully!')
      // this.close.emit(true);
      this.isViewMode = true
      this.form.reset()
      this._request.getRequests()
      this._calendarService.LoadCalendarDataByMode(new Date(), 'month', 0)
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

  async updateStatus(status: number, data: RequestDTO) {
    this._alert.Delete(`Are you sure you want it to be ${this.statusEnum[status]}!`, async cb => {
      if (cb.isConfirmed) {
        data.Status = status
        let res = await this._request.updateStatus(data)
        if (res) {
          this._notification.success('', `You have ${this.statusEnum[status]} the request!`)
          // this.close.emit(true);
          this.isViewMode = true
          this._request.getRequests()
          this._calendarService.LoadCalendarDataByMode(new Date(), 'month', 0)
        }
      }
    })
  }

  async delete(id: number) {
    this._alert.Delete('Are you sure you want to Delete this!', async cb => {
      if (cb.isConfirmed) {
        let r = await this._request
          .Delete(API_URL + API_ENDPOINTS.DeleteRequest, id)
          .pipe(map(x => x.ResponseData))
          .toPromise<boolean>()
        if (r) {
          this._notification.success('', `Request deleted successfully!`)
          this.isViewMode = true
          this._request.getRequests()
          this._calendarService.LoadCalendarDataByMode(new Date(), 'month', 0)
        }
      }
    })
  }

  checkDates(DateFrom: any, DateTo: any): boolean {
    let df = new Date(DateFrom)
    let dt = new Date(DateTo)
    if (df.getDate() == dt.getDate()) return false
    else if (df.getDate() > dt.getDate()) return true
    else return false
  }
}
