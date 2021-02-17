import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { ViewCalendarComponent } from './view-calendar/view-calendar.component';
import { AddEventComponent } from './add-event/add-event.component';
import { SharedModule } from 'src/app/shared.module';
import {ReactiveFormsModule,FormsModule} from '@angular/forms'
import { ViewEventComponent } from './view-event/view-event.component';
import { ColorPickerComponent } from 'src/app/pages/color-picker/color-picker.component';
import { DatePipe } from '@angular/common';
import { ScheduleCustodyComponent } from './schedule-custody/schedule-custody.component';

@NgModule({
  declarations: [ViewCalendarComponent,AddEventComponent,ViewEventComponent,ColorPickerComponent,ScheduleCustodyComponent],
  imports: [
    CommonModule,
    SharedModule,
    CalendarRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AddEventComponent
  ],
  providers:[DatePipe]
})
export class CalendarModule { }
