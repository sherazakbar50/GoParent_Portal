import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsRoutingModule } from './documents-routing.module';
import { ViewDocumentsComponent } from './view-documents/view-documents.component';
import { AddFolderComponent } from './add-folder/add-folder.component';
import { ViewFolderComponent } from './view-folder/view-folder.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  declarations: [ViewDocumentsComponent, AddFolderComponent, ViewFolderComponent, AddDocumentComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    SharedModule,
  ]
})
export class DocumentsModule { }
