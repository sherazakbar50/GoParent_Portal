import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectionRoutingModule } from './connection-routing.module';
import { ConnectionComponent } from './connection.component';
import {ReactiveFormsModule,FormsModule} from '@angular/forms'
import { SharedModule } from 'src/app/shared.module';
 


@NgModule({
  declarations: [ConnectionComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ConnectionRoutingModule
  ], exports: [ ]
})
export class ConnectionModule { }
