import { Component, OnInit, ViewChild } from '@angular/core';
import { NzCalendarComponent, NzCalendarMode } from 'ng-zorro-antd/calendar';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Subject } from 'rxjs';
import { EventsDTO } from 'src/app/models/eventsDTO';
import { EventsService } from 'src/app/services/APIServices/events.service';
import { AppDateFormatPipe } from 'src/app/pipes/date-format.pipe';
import { DatePipe } from '@angular/common';
declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-view-calendar',
  templateUrl: './view-calendar.component.html',
  styleUrls: ['./view-calendar.component.scss'],
  providers: [AppDateFormatPipe]
})
export class ViewCalendarComponent implements OnInit {

  selectedDate = new Date();
  mode: NzCalendarMode = 'month';
  modalTitle: string = "New Event";
  isVisible: boolean = false;
  viewEvent: boolean = false;
  @ViewChild('calendar') cal: NzCalendarComponent;
  current = new Date();
  events: EventsDTO[] = [];
  dateList: any = [];
  selectedEvent: any;
  editEventObserverSubject: BehaviorSubject<EventsDTO> = new BehaviorSubject(null);  
  viewEventObserverSubject: Subject<EventsDTO> = new Subject();
  closeModalObserverSubject: Subject<boolean> = new Subject();
  dateWiseEvents:Date[]=[]
  custodyModalTitle = "Schedule Custody"
  custodyModalIsVisible = false

  constructor(private _eventsService: EventsService,private notifier:NzNotificationService,private appDateFormatPipe:AppDateFormatPipe,private datePipe: DatePipe) { }

  ngOnInit(): void {
    
    this.current.setHours(0, 0, 0, 0);
    this._eventsService.eventObserver$.subscribe(res => {
      if (res) {
        this.dateList = [];
        this.isVisible = false;
        this.editEventObserverSubject.next(null);
        this.events = res;
        this.events.forEach(element => {
          element.EventStartDate = this.appDateFormatPipe.ToLocalDateTime(element.EventStartDate)
          
          if(element.EventEndDate)
              element.EventEndDate = this.appDateFormatPipe.ToLocalDateTime(element.EventEndDate)
          else
              element.EventEndDate =  element.EventStartDate;

          this.populateDataLists(element.EventStartDate, element.EventEndDate)
          element.type = 'warning'
        });
      }

      //update side smart calendar
     this.updateSmartCalendar()
    });

     
    this._eventsService.getMonthWiseEvent(this.selectedDate);
  }


  updateSmartCalendar(){
      let allTds = document.getElementById('smart-calendar').querySelectorAll("td");
      if(allTds){
        allTds.forEach((elm,i)=>{
           let tdTtitle = new Date(elm.getAttribute('title'))
           tdTtitle.setHours(0,0,0,0);

           if(this.HasEventOnDate(this.dateWiseEvents,tdTtitle)){
               elm.classList.add("calendar-dot");
           }
           else{
            elm.classList.remove("calendar-dot");
           }
        });
      }
  }

  HasEventOnDate(array, value) {
    return !!array.find(item => {return item.getDate() == value.getDate() && item.getMonth() == value.getMonth() && item.getYear() == value.getYear()});
  }
  populateDataLists(startDate, stopDate) {
    var currentDate = new Date(JSON.parse(JSON.stringify(startDate)));
    while (currentDate <= stopDate) {
      var date = new Date(currentDate)
      date.setHours(0, 0, 0, 0);
      if (!this.dateList.includes(date.getTime())) {
        this.dateList.push(date.getTime());
      }
      let storeDate = new Date(currentDate);
      storeDate.setHours(0,0,0,0);
      if(!this.dateWiseEvents.some(x=>x.getDate() == storeDate.getDate()))
         this.dateWiseEvents.push(storeDate);
      
         currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  getEvents(index, event) {
    return event;
  }

  getMonthEvents(month: Date) {
    return this.events.filter(value => {
      return (value.EventStartDate.getMonth() <= month.getMonth()) && (value.EventEndDate.getMonth() >= month.getMonth());
    });
  }

  SaveEventModal(): void {
    this.isVisible = true;
    this.modalTitle = "New Event";
    this.editEventObserverSubject.next(null);
  }

  ScheduleCustodyModal(): void {
    this.custodyModalIsVisible = true;
    //this.editEventObserverSubject.next(null);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.editEventObserverSubject.next(null);
    this.closeModalObserverSubject.next(true);
  }

  handleCustodyFormCancel(){
    this.custodyModalIsVisible = false;
  }

  
  showEventDetails(data: any, selectedDate): void {
    data.selectedDate = selectedDate;
    data.ChildrenNames = data.Children.map(x=>x.ChildFirstName + " " + x.ChildLastName).toString();
    this.viewEvent = true;
    this.viewEventObserverSubject.next(data);
    this.selectedEvent = data;
  }

  editEvent() {
    this.modalTitle = "Update Event";
    this.viewEvent = false
    this.isVisible = true;
    this.editEventObserverSubject.next(this.selectedEvent);
  }

  deleteEvent() {
    Swal.fire({
      title: 'Are you sure you want to delete the event?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      }).then(async result => {
      if (result && result.isConfirmed) {
        let res = await this._eventsService.deleteEvent(this.selectedEvent.EventId);
        if(res){
          this.viewEvent = false;
          this._eventsService.getMonthWiseEvent(this.selectedDate);
          this.notifier.success('','Event deleted successfully')
        }
       }
    })
  }

  closeViewEvent(): void {
    this.viewEvent = false;
  }
 
  changeDate(date: any) {
    this.selectedDate = date;
    this._eventsService.getMonthWiseEvent(this.selectedDate);
  }

  LoadDataOnChange(change: { date: Date; mode: string }){
     //update side smart calendar
     this.updateSmartCalendar()
  }
  
  IsRenderEventsOnCell(actualDate:Date,StartDate:Date,EndDate:Date):boolean{
    actualDate.setHours(0,0,0,0);
    StartDate.setHours(0,0,0,0);
    EndDate.setHours(0,0,0,0);
    return actualDate >= StartDate && actualDate <= EndDate;
  }
}
