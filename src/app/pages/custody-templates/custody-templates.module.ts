import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustodyTemplatesRoutingModule } from './custody-templates-routing.module';
import { CustodyTemplatesComponent } from './custody-templates/custody-templates.component';
import { SharedModule } from 'src/app/shared.module';
import { WidgetsComponentsModule } from 'src/app/components/kit/widgets/widgets-components.module';


@NgModule({
  declarations: [CustodyTemplatesComponent],
  imports: [
    CommonModule,
    SharedModule,
    WidgetsComponentsModule,
    CustodyTemplatesRoutingModule
  ]
})
export class CustodyTemplatesModule { }
