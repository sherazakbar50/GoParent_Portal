import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewDocumentsComponent } from './view-documents/view-documents.component';
import { ViewFolderComponent } from './view-folder/view-folder.component';

const routes: Routes = [
  {
    path: '',
    component: ViewFolderComponent,
  },
  { path: 'view-documents', component: ViewDocumentsComponent  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
