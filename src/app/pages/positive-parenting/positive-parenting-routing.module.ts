import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PositiveParentingComponent } from './positive-parenting/positive-parenting.component'
const routes: Routes = [
  { path: '', component: PositiveParentingComponent, data: { title: 'Positive Parenting' } },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PositiveParentingRoutingModule {}
