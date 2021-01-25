import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SettingsRoutingModule } from './settings-routing.module'
import { ConnectionComponent } from './connection/connection.component'

@NgModule({
  declarations: [ConnectionComponent],
  imports: [CommonModule, SettingsRoutingModule],
})
export class SettingsModule {}
