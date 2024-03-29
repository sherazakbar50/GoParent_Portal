import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CalendarRoutingModule } from './calendar-routing.module'
import { ViewCalendarComponent } from './view-calendar/view-calendar.component'
import { AddEventComponent } from './add-event/add-event.component'
import { SharedModule } from 'src/app/shared.module'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { ViewEventComponent } from './view-event/view-event.component'
import { ColorPickerComponent } from 'src/app/pages/color-picker/color-picker.component'
import { DatePipe } from '@angular/common'
import { ScheduleCustodyComponent } from './schedule-custody/schedule-custody.component'
import { ViewCustodyComponent } from './view-custody/view-custody.component'
import { WidgetsComponentsModule } from 'src/app/components/kit/widgets/widgets-components.module'
import { ChangeRequestComponent } from './change-request/change-request.component'
import { CheckInOutComponent } from './check-in-out/check-in-out.component'
import { ViewChangeRequestComponent } from './view-change-request/view-change-request.component'
import { ViewCheckInOutComponent } from './view-check-in-out/view-check-in-out.component'

@NgModule({
  declarations: [
    ViewCalendarComponent,
    AddEventComponent,
    ViewEventComponent,
    ColorPickerComponent,
    ScheduleCustodyComponent,
    ViewCustodyComponent,
    ChangeRequestComponent,
    CheckInOutComponent,
    ViewChangeRequestComponent,
    ViewCheckInOutComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CalendarRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    WidgetsComponentsModule,
  ],
  exports: [AddEventComponent, ViewCalendarComponent, ChangeRequestComponent],
  providers: [DatePipe],
})
export class CalendarModule {}
