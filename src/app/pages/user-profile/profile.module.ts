import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {ReactiveFormsModule,FormsModule} from '@angular/forms'
import { SharedModule } from 'src/app/shared.module';
 


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileRoutingModule
  ], exports: [ ]
})
export class ProfileModule { }
