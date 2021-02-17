import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CasesTabComponent } from './cases-tab/cases-tab.component';
import { ViewCasesComponent } from './view-cases/view-cases.component';

const routes: Routes = [
  {
    path: '',
    component: ViewCasesComponent,
  },

  {path: 'cases-tab' , component: CasesTabComponent}
  
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasesRoutingModule { }
