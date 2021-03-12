import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { NzCalendarComponent, NzCalendarMode } from 'ng-zorro-antd/calendar'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { BehaviorSubject, Subject } from 'rxjs'
import { EventsDTO } from 'src/app/models/eventsDTO'
import { EventsService } from 'src/app/services/APIServices/events.service'
import { AppDateFormatPipe } from 'src/app/pipes/date-format.pipe'
import { CalendarService } from 'src/app/services/calendar-services/calendar-service'
import { CustodyDto } from 'src/app/models/CustodyDto'
import { AlertService } from 'src/app/services/alert-service/alert-service'
import { CustodyService } from 'src/app/services/APIServices/custody.service'
import { jwtAuthService } from 'src/app/services/jwt'
import { ChangeRequestService } from 'src/app/services/calendar-services/change-request.service'
import { CustodyRequestStatusEnum, RequestDTO } from 'src/app/models/RequestDTO'
@Component({
  selector: 'app-view-calendar',
  templateUrl: './view-calendar.component.html',
  styleUrls: ['./view-calendar.component.scss'],
  providers: [AppDateFormatPipe],
})
export class ViewCalendarComponent implements OnInit {
  selectedDate = new Date()
  selectedMode = 'month'
  mode: NzCalendarMode = 'month'
  modalTitle: string = 'New Event'
  isVisible: boolean = false
  viewEvent: boolean = false
  userRole: string = ''
  @Input() caseId: number = 0
  @ViewChild('calendar') cal: NzCalendarComponent
  todayDate = new Date()
  events: EventsDTO[] = []
  dateList: any = []
  selectedEvent: any
  editEventObserverSubject: BehaviorSubject<any> = new BehaviorSubject(null)
  editCustodyObserverSubject: BehaviorSubject<any> = new BehaviorSubject(null)
  viewEventObserverSubject: Subject<EventsDTO> = new Subject()
  closeModalObserverSubject: Subject<boolean> = new Subject()
  viewCustodyObserverSubject: Subject<CustodyDto> = new Subject()
  dateWiseEvents: Date[] = []
  dateWiseCustodies: any[] = []
  custodyModalTitle = 'Schedule Custody'
  custodyModalIsVisible = false
  calendarFormattedData: any[] = []
  viewCustody: boolean
  selectedCustody: any
  loadedDateFor: Date = new Date()
  requestVisible: boolean
  requestList: any
  dateWiseRequests: any[] = []
  dateWiseCheckIns: any[] = []
  requestData: any
  checkVisible: boolean
  checkData: any

  constructor(
    private _alert: AlertService,
    private _custody: CustodyService,
    private _calendarService: CalendarService,
    private _eventsService: EventsService,
    private notifier: NzNotificationService,
    private appDateFormatPipe: AppDateFormatPipe,
    private _auth: jwtAuthService,
    private _request: ChangeRequestService,
  ) {
    this._auth.getUserModel().then(r => {
      this.userRole = r?.UserRole
    })
  }

  ngOnInit(): void {
    // this._request.getRequests()
    // this._request.requestObs$().subscribe(r => {
    //   // console.log('r:', r)
    //   if (r) {
    //     this.requestList = r
    //     this.calendarFormattedData = this.calendarFormattedData.filter(x => x.IsRequest != true)
    //     this.requestList.forEach((e: RequestDTO) => {

    //       if (e.Status !== CustodyRequestStatusEnum.Rejected) {
    //         e.DateFrom = this.appDateFormatPipe.ToLocalDateTime(e.DateFrom)
    //         e.DateTo = this.appDateFormatPipe.ToLocalDateTime(e.DateTo)
    //         this.populateRequestLists(e.DateFrom, e.DateTo)
    //         this.calendarFormattedData.push({
    //           Id: e.Id,
    //           UserId: e.UserId,
    //           StartDate: this.appDateFormatPipe.ToLocalDateTime(e.DateFrom),
    //           EndDate: this.appDateFormatPipe.ToLocalDateTime(e.DateTo),
    //           Color: e.Status === CustodyRequestStatusEnum.Pending ? '#ffbb33' : '#00C851',
    //           IsRequest: true,
    //           Note: e.Notes,
    //           ParentId: e.ParentId,
    //           ChildId: e.ChildId,
    //           FamilyId: e.FamilyId,
    //           Status: e.Status,
    //           FamilyName: e.FamilyName,
    //           ParentName: e.ParentName,
    //           ChildName: e.ChildName,
    //         })
    //         this.updateSmartCalendar()
    //       }
    //     })
    //   }
    // })
    this.todayDate.setHours(0, 0, 0, 0)
    this.subscribeToCalendarObserver()
    this._calendarService.LoadCalendarDataByMode(this.selectedDate, this.selectedMode, this.caseId)
  }

  subscribeToCalendarObserver() {
    this._calendarService.calendarObserver$.subscribe(res => {
      if (res) {
        // this.calendarFormattedData = this.calendarFormattedData.filter(x => x.IsRequest == true)
        // console.log('this.calendarFormattedData:', this.calendarFormattedData)
        this.dateList = []
        this.dateWiseEvents = []
        this.dateWiseCustodies = []
        this.isVisible = false
        this.custodyModalIsVisible = false
        this.editEventObserverSubject.next(null)
        this.editCustodyObserverSubject.next(null)
        this.calendarFormattedData = res.FormattedData;
        this.calendarFormattedData.forEach(element => {
          element.StartDate = this.appDateFormatPipe.ToLocalDateTime(element.StartDate)
          element.EndDate = this.appDateFormatPipe.ToLocalDateTime(element.EndDate)
          this.populateDataLists(
            element.StartDate,
            element.EndDate,
            element.DataType,
            element.Color,
          )
          element.type = 'warning'
        })
        this.updateSmartCalendar()
      }
    })
  }

  updateSmartCalendar() {
    let allTds = document.getElementById('smart-calendar').querySelectorAll('td')
    if (allTds) {
      allTds.forEach((elm, i) => {
        let tdTtitle = new Date(elm.getAttribute('title'))
        tdTtitle.setHours(0, 0, 0, 0)
        let _request = this.dateWiseRequests.find(item => this.IsExists(item, tdTtitle))
        if (_request) elm.classList.add('request-dot')
        else elm.classList.remove('request-dot')

        let _event = this.dateWiseEvents.find(item => this.IsExists(item, tdTtitle))
        if (_event) elm.classList.add('event-dot')
        else elm.classList.remove('event-dot')


        let _custody = this.dateWiseCustodies.find(item => this.IsExists(item.date, tdTtitle))
        if (_custody) {
          //1 This will color the cell
          //elm.firstElementChild.firstElementChild.setAttribute('style',`color:${_custody.color};`);

          //2 This will set the background color
          elm.firstElementChild.firstElementChild.setAttribute(
            'style',
            `background:${_custody.color};color:#fff;border-radius:2px`,
          )
        } else {
          elm.firstElementChild.firstElementChild.setAttribute('style', `background:none;color:''`)
        }
      })
    }
  }

  IsExists(item: any, value: any): boolean {
    return (
      item.getDate() == value.getDate() &&
      item.getMonth() == value.getMonth() &&
      item.getFullYear() == value.getFullYear()
    )
  }

  populateDataLists(startDate, stopDate, type, color) {
    let currentDate = new Date(JSON.parse(JSON.stringify(startDate)))
    while (currentDate <= stopDate) {
      let date = new Date(currentDate)
      date.setHours(0, 0, 0, 0)

      if (!this.dateList.includes(date.getTime())) {
        this.dateList.push(date.getTime())
      }

      let storeDate = new Date(currentDate)
      storeDate.setHours(0, 0, 0, 0)

      // Event
      if (type == 0) {
        if (!this.dateWiseEvents.some(x => x.getDate() == storeDate.getDate()))
          this.dateWiseEvents.push(storeDate)
      } else 
      // Custody
      if (type == 1) {
        if (!this.dateWiseCustodies.some(x => x.date.getDate() == storeDate.getDate()))
          this.dateWiseCustodies.push({ date: storeDate, color: color })
      } else 
      // Change Request
      if (type == 3) {
        if (!this.dateWiseRequests.some(x => x.getDate() == storeDate.getDate()))
        this.dateWiseRequests.push(storeDate)
      } else {
        // Check In/Check Out
        if (!this.dateWiseCheckIns.some(x => x.getDate() == storeDate.getDate()))
        this.dateWiseCheckIns.push(storeDate)
      }

      currentDate.setDate(currentDate.getDate() + 1)
    }
  }

  populateRequestLists(startDate, stopDate) {
    let currentDate = new Date(JSON.parse(JSON.stringify(startDate)))
    while (currentDate <= stopDate) {
      let storeDate = new Date(currentDate)
      storeDate.setHours(0, 0, 0, 0)
      if (!this.dateWiseRequests.some(x => x.getDate() == storeDate.getDate()))
        this.dateWiseRequests.push(storeDate)
      currentDate.setDate(currentDate.getDate() + 1)
    }
  }


  trackByCalendarItemId(index, item) {
    return item.Id
  }

  filterCalendarDataMonthWise(month: Date) {
    return this.calendarFormattedData.filter(value => {
      return (
        value.StartDate.getMonth() <= month.getMonth() &&
        value.EndDate.getMonth() >= month.getMonth()
      )
    })
  }

  SaveEventModal(): void {
    this.isVisible = true
    this.modalTitle = 'New Event'
    this.editEventObserverSubject.next({ isAdd: true, selectedMode: this.selectedMode })
  }

  ScheduleCustodyModal(): void {
    this.custodyModalIsVisible = true
    this.editCustodyObserverSubject.next({ isAdd: true, selectedMode: this.selectedMode })
  }

  handleCancel(): void {
    this.isVisible = false
    this.editEventObserverSubject.next(null)
    this.closeModalObserverSubject.next(true)
  }

  handleCustodyFormCancel() {
    this.custodyModalIsVisible = false
    this.editCustodyObserverSubject.next(null)
    this.closeModalObserverSubject.next(true)
  }

  showEventDetails(data: any, selectedDate): void {
    data.selectedDate = selectedDate
    data.ChildrenNames = data.Children.map(x => x.ChildFirstName + ' ' + x.ChildLastName).toString()
    this.viewEvent = true
    this.viewEventObserverSubject.next(data)
    this.selectedEvent = data
  }

  showCustodyDetails(selectedItem, selectedDate): void {
    selectedItem.selectedDate = selectedDate
    this.viewCustody = true
    selectedItem.ChildrenNames = selectedItem.ParentObject.ChildrenInfo.map(
      x => x.ChildFirstName + ' ' + x.ChildLastName,
    ).toString()
    this.viewCustodyObserverSubject.next(selectedItem)
    this.selectedCustody = selectedItem
  }

  editEvent() {
    this.modalTitle = 'Update Event'
    this.viewEvent = false
    this.isVisible = true
    this.selectedEvent.selectedMode = this.selectedMode
    this.editEventObserverSubject.next(this.selectedEvent)
  }

  deleteEvent() {
    this._alert.Delete('Are you sure you want to delete the event?', async result => {
      if (result && result.isConfirmed) {
        let res = await this._eventsService.deleteEvent(this.selectedEvent.EventId)

        if (res) {
          this.viewEvent = false
          this._calendarService.LoadCalendarDataByMode(
            this.selectedDate,
            this.selectedMode,
            this.caseId,
          )
          this.notifier.success('', 'Event deleted successfully')
        }
      }
    })
  }

  editCustody() {
    this.modalTitle = 'Update Custody'
    this.viewCustody = false
    this.custodyModalIsVisible = true
    this.selectedCustody.ParentObject.selectedMode = this.selectedMode
    this.editCustodyObserverSubject.next(this.selectedCustody.ParentObject)
  }

  deleteCustody() {
    this._alert.Delete(
      'Are you sure you want to delete the custody?',
      async result => {
        if (result && result.isConfirmed) {
          let res = await this._custody.deleteCustody(this.selectedCustody.ParentObject.Id)
          if (res) {
            this.viewCustody = false
            this._calendarService.LoadCalendarDataByMode(
              this.selectedDate,
              this.selectedMode,
              this.caseId,
            )
            this.notifier.success('', 'Custody deleted successfully')
          }
        }
      },
      'This will delete the whole custody!',
    )
  }

  closeViewEventModal(): void {
    this.viewEvent = false
  }

  closeViewCustodyModal(): void {
    this.viewCustody = false
  }

  changeDate(date: any) {
    this.selectedDate = date
    if (!this.IsAlreadyloadedData(date)) {
      this.loadedDateFor = date
      this._calendarService.LoadCalendarDataByMode(
        this.selectedDate,
        this.selectedMode,
        this.caseId,
      )
    }
  }

  IsAlreadyloadedData(date: Date) {
    return (
      date.getMonth() == this.loadedDateFor.getMonth() &&
      date.getFullYear() == this.loadedDateFor.getFullYear()
    )
  }

  LoadDataOnPanelChange(change: { date: Date; mode: string }) {
    if (change) {
      this.selectedMode = change.mode
      this._calendarService.LoadCalendarDataByMode(change.date, this.selectedMode, this.caseId)
    }
  }
  IsRenderDataOnCell(actualDate: Date, StartDate: Date, EndDate: Date): boolean {
    actualDate.setHours(0, 0, 0, 0)
    StartDate.setHours(0, 0, 0, 0)
    EndDate.setHours(0, 0, 0, 0)
    return actualDate >= StartDate && actualDate <= EndDate
  }


  closeRequestView() {
    this.requestVisible = false
    this.requestData = null

  }
  viewChangeRequest(data) {
    this.requestVisible = true
    this.requestData = data
  }

  closeCheckView() {
    this.checkVisible = false
    this.checkData = null

  }

  viewCheckInOut(data) {
    this.checkVisible = true
    this.checkData = data
  }
}
