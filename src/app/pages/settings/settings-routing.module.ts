import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ConnectionComponent } from './connection/connection.component'

const routes: Routes = [{ path: 'connection', component: ConnectionComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
