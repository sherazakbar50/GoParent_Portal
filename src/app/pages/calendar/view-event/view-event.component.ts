import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { EventsDTO } from 'src/app/models/eventsDTO';
import { DATA_FORMATS } from 'src/app/models/Global';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {
  
  @Input() eventSub: Subject<EventsDTO>;
  event: any = new EventsDTO;
  @Output() edit = new EventEmitter<boolean>();
  @Output() delete = new EventEmitter<boolean>();
  startDateFormat:string;
  endDateFormat:string;
  constructor() { }

  ngOnInit(): void {
    
    this.eventSub.subscribe(res => {
      if (res)
      {
        this.event = res;
        this.startDateFormat = (this.event.EventStartDate.getHours() || this.event.EventStartDate.getMinutes() || this.event.EventStartDate.getSeconds()) && !this.event.IsAllDay ? DATA_FORMATS.DATETIME : DATA_FORMATS.Date;
        this.endDateFormat = (this.event.EventEndDate.getHours() || this.event.EventEndDate.getMinutes() || this.event.EventEndDate.getSeconds()) && !this.event.IsAllDay ? DATA_FORMATS.DATETIME : DATA_FORMATS.Date;
      }
    });
  }

  editEvent(){
    this.edit.next(true);
  }

  deleteEvent(){
    this.delete.next(true);
  }
}
