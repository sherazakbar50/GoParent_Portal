import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { QuillModule } from 'ngx-quill'
import { SharedModule } from 'src/app/shared.module'
import { PositiveParentingRoutingModule } from './positive-parenting-routing.module'
import { PositiveParentingComponent } from './positive-parenting/positive-parenting.component'

@NgModule({
  declarations: [PositiveParentingComponent],
  imports: [CommonModule, SharedModule, QuillModule, PositiveParentingRoutingModule],
})
export class PositiveParentingModule {}
