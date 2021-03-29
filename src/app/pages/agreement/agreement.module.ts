import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AgreementRoutingModule } from './agreement-routing.module'
import { AgreementsComponent } from './agreements/agreements.component'
import { SharedModule } from 'src/app/shared.module'

@NgModule({
  declarations: [AgreementsComponent],
  imports: [CommonModule, SharedModule, AgreementRoutingModule],
})
export class AgreementModule {}
