import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ChildsListComponent } from './childs-list/childs-list.component'
import { ChildProfileComponent } from './child-profile/child-profile.component'

const routes: Routes = [
  { path: 'list', component: ChildsListComponent },
  { path: 'childprofile', component: ChildProfileComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildsRoutingModule {}
