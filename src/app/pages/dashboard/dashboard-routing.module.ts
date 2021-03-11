import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LayoutsModule } from 'src/app/layouts/layouts.module'

// dashboard
import { DashboardAlphaComponent } from 'src/app/pages/dashboard/alpha/alpha.component'
// import { DashboardBetaComponent } from 'src/app/pages/dashboard/beta/beta.component'
// import { DashboardCryptoComponent } from 'src/app/pages/dashboard/crypto/crypto.component'
// import { DashboardGammaComponent } from 'src/app/pages/dashboard/gamma/gamma.component'

const routes: Routes = [
  {
    path: '',
    component: DashboardAlphaComponent,
    data: { title: 'Dashboard' },
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class DashboardRouterModule {}
