import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherUsersRoutingModule } from './other-users-routing.module';
import { OtherUsersComponent } from './other-users/other-users.component';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  declarations: [OtherUsersComponent],
  imports: [
    CommonModule,
    SharedModule,
    OtherUsersRoutingModule
  ]
})
export class OtherUsersModule { }
