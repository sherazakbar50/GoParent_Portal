import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ChildsListComponent } from './childs-list/childs-list.component'
import { ChildProfileComponent } from './child-profile/child-profile.component'

const routes: Routes = [
  { path: 'list', component: ChildsListComponent, data: { title: 'Children' } },
  { path: 'childprofile', component: ChildProfileComponent, data: { title: 'Children' } },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildsRoutingModule { }
