import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { AddContactsComponent } from './add-contacts/add-contacts.component';
import { ViewContactsComponent } from './view-contacts/view-contacts.component';
import {ReactiveFormsModule,FormsModule} from '@angular/forms'
import { SharedModule } from 'src/app/shared.module';
 


@NgModule({
  declarations: [ViewContactsComponent,AddContactsComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ContactsRoutingModule
  ], exports: [ ]
})
export class ContactsModule { }
