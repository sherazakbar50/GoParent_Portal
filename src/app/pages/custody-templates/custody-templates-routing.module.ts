import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustodyTemplatesComponent } from './custody-templates/custody-templates.component';

const routes: Routes = [
  { path: '', component: CustodyTemplatesComponent, data: {title: 'Custody Template'} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustodyTemplatesRoutingModule { }
