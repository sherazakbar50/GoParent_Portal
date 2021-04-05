import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from 'src/app/components/cleanui/system/Guard/permission.guard';
import { CasesTabComponent } from './cases-tab/cases-tab.component';
import { ViewCasesComponent } from './view-cases/view-cases.component';

const routes: Routes = [
  {
    // canActivate: [PermissionGuard],
    path: '',
    component: ViewCasesComponent,
    data: { title: 'Cases' }
  },
  {
    path: 'cases-tab',
    component: CasesTabComponent,
    data: { title: 'Cases' }
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasesRoutingModule { }
