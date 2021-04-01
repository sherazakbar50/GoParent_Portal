import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LawyerDocumentsComponent } from './lawyer-documents/lawyer-documents.component';

const routes: Routes = [
  { path: '', component:  LawyerDocumentsComponent, data: { title: "Lawyers' Documents"}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LawyerDocumentsRoutingModule { }
