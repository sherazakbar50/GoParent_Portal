import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LawyersComponent } from './lawyers/lawyers.component'

const routes: Routes = [{ path: '', component: LawyersComponent, data: { title: 'Lawyers' } }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LawyersRoutingModule {}
