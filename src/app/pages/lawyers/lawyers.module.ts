import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LawyersRoutingModule } from './lawyers-routing.module'
import { LawyersComponent } from './lawyers/lawyers.component'
import { SharedModule } from 'src/app/shared.module'

@NgModule({
  declarations: [LawyersComponent],
  imports: [CommonModule, LawyersRoutingModule, SharedModule],
})
export class LawyersModule {}
