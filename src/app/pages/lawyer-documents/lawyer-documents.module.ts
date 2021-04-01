import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LawyerDocumentsRoutingModule } from './lawyer-documents-routing.module';
import { LawyerDocumentsComponent } from './lawyer-documents/lawyer-documents.component';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  declarations: [LawyerDocumentsComponent],
  imports: [
    CommonModule,
    SharedModule,
    LawyerDocumentsRoutingModule
  ]
})
export class LawyerDocumentsModule { }
