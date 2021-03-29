import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AgreementsComponent } from './agreements/agreements.component'

const routes: Routes = [{ path: '', component: AgreementsComponent, data: { title: 'Agreement' } }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgreementRoutingModule {}
