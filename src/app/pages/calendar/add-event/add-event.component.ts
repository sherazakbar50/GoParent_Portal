import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms'
import { BehaviorSubject, Subject } from 'rxjs'
import { EventsDTO } from 'src/app/models/eventsDTO'
import { EventsService } from 'src/app/services/APIServices/events.service'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { FamilyService } from 'src/app/services/APIServices/family.service'
import { CalendarService } from 'src/app/services/calendar-services/calendar-service'

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {
  backgroundColor: string
  form: FormGroup
  @Input() caseId: number = 0
  @Input() eventSub: BehaviorSubject<any>
  @Input() modalCloseSub: Subject<boolean>
  IsSubmitted = false
  FamilyChilds: []
  eventId: number
  selectedMode: string

  constructor(
    private _calendarService: CalendarService,
    private fb: FormBuilder,
    private _eventsService: EventsService,
    private notifier: NzNotificationService,
    private familyService: FamilyService,
  ) {
    this.backgroundColor = '#8E0622'
  }

  get fc() {
    return this.form.controls
  }

  async ngOnInit() {
    this.FamilyChilds = await this.familyService.GetFamilyChilds()
    this.BuildForm()
    this.SubcribeEventEditObserver()
    this.SubcribeToCloseModalObserver()
  }

  BuildForm() {
    this.form = this.fb.group(
      {
        EventSubject: ['', Validators.required],
        EventNotes: [],
        EventPlace: [],
        EventChilds: [],
        IsPrivate: [],
        IsAllDay: [false],
        EventDateRange: [, Validators.required],
      },
      { updateOn: 'change' },
    )
  }

  SubcribeEventEditObserver() {
    if (this.eventSub) {
      this.eventSub.subscribe(res => {
        if (res) {
          this.selectedMode = res.selectedMode

          if (res.isAdd) {
            this.form.reset()
          } else {
            this.eventId = res.EventId
            this.backgroundColor = res.EventBgColor
            res.EventDateRange = [res.EventStartDate, res.EventEndDate]
            this.form.patchValue(res)
          }
        } else {
          this.form.reset()
        }
      })
    }
  }

  SubcribeToCloseModalObserver() {
    if (this.modalCloseSub) {
      this.modalCloseSub.subscribe(res => {
        if (res) {
          this.form.reset()
        }
      })
    }
  }
  async SaveEvent() {
    this.IsSubmitted = true
    this.fc.EventSubject.markAsDirty()
    this.fc.EventSubject.updateValueAndValidity()
    this.fc.EventDateRange.markAsDirty()
    this.fc.EventDateRange.updateValueAndValidity()

    if (this.form.invalid) return

    var eventObj = this.form.value as EventsDTO
    eventObj.EventBgColor = this.backgroundColor
    eventObj.IsPrivate = eventObj.IsPrivate || false
    eventObj.IsAllDay = eventObj.IsAllDay || false
    eventObj.EventStartDate = this.fc.EventDateRange.value[0]
    eventObj.EventEndDate = this.fc.EventDateRange.value[1]
    eventObj.EventId = this.eventId

    // if(!this.isAllDay) {
    //   eventObj.EventStartDate = new Date(eventObj.EventStartDate.toDateString() + " " + eventObj.EventStartTime.toTimeString());
    //   if(eventObj.EventEndDate && eventObj.EventEndTime)
    //       eventObj.EventEndDate = new Date(eventObj.EventEndDate.toDateString() + " " + eventObj.EventEndTime.toTimeString());
    // }

    let res = await this._eventsService.saveEvent(eventObj)

    if (res) {
      this._calendarService.LoadCalendarDataByMode(
        new Date(eventObj.EventStartDate),
        this.selectedMode,
        0,
      )
      this.notifier.success('', 'Event saved successfully')
    }

    this.IsSubmitted = false
  }

  setColor(color: string) {
    this.backgroundColor = color
  }
}
