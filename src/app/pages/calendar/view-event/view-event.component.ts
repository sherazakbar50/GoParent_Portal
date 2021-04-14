import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Subject } from 'rxjs'
import { EventsDTO } from 'src/app/models/eventsDTO'
import { DATA_FORMATS } from 'src/app/models/Global'
import { jwtAuthService } from 'src/app/services/jwt'

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss'],
})
export class ViewEventComponent implements OnInit {
  @Input() eventSub: EventsDTO
  event: any = new EventsDTO()
  userRole: string = ''
  userId: string = ''
  @Output() edit = new EventEmitter<boolean>()
  @Output() delete = new EventEmitter<boolean>()
  startDateFormat: string
  endDateFormat: string
  constructor(private _auth: jwtAuthService) {
    this._auth.getUserModel().then(r => {
      this.userRole = r?.UserRole
      this.userId = r?.UserId
    })
  }

  ngOnInit(): void {
    // this.eventSub.subscribe(res => {
    if (this.eventSub) {
      this.event = this.eventSub
      this.startDateFormat =
        (new Date(this.event.EventStartDate).getHours() ||
          new Date(this.event.EventStartDate).getMinutes() ||
          new Date(this.event.EventStartDate).getSeconds()) &&
          !this.event.IsAllDay
          ? DATA_FORMATS.DATETIME
          : DATA_FORMATS.Date
      this.endDateFormat =
        (new Date(this.event.EventEndDate).getHours() ||
          new Date(this.event.EventEndDate).getMinutes() ||
          new Date(this.event.EventEndDate).getSeconds()) &&
          !this.event.IsAllDay
          ? DATA_FORMATS.DATETIME
          : DATA_FORMATS.Date
    }
    // })
  }

  editEvent() {
    this.edit.next(true)
  }

  deleteEvent() {
    this.delete.next(true)
  }
}
