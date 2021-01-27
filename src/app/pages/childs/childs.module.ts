import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ChildsRoutingModule } from './childs-routing.module'
import { ChildsListComponent } from './childs-list/childs-list.component'
import { SharedModule } from 'src/app/shared.module'
import { ChildProfileComponent } from './child-profile/child-profile.component'
import { AddChildComponent } from './add-child/add-child.component'
import { ChildVaccinesComponent } from './child-vaccines/child-vaccines.component'
import { AddChildVaccineComponent } from './add-child-vaccine/add-child-vaccine.component'

@NgModule({
  declarations: [
    ChildsListComponent,
    ChildProfileComponent,
    AddChildComponent,
    ChildVaccinesComponent,
    AddChildVaccineComponent,
  ],
  imports: [CommonModule, SharedModule, ChildsRoutingModule, FormsModule, ReactiveFormsModule],
})
export class ChildsModule {}
