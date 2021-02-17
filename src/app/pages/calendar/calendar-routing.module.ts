import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEventComponent } from './add-event/add-event.component';
import { ScheduleCustodyComponent } from './schedule-custody/schedule-custody.component';
import { ViewCalendarComponent } from './view-calendar/view-calendar.component';


const routes: Routes = [
  { path: '', component: ViewCalendarComponent,data:{title:"Calendar"} },
  { path: 'add', component: AddEventComponent },
  { path: 'schedule-custody', component: ScheduleCustodyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
