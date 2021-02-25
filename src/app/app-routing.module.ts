import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from 'src/app/shared.module'
import { LayoutsModule } from 'src/app/layouts/layouts.module'
import { AppPreloader } from 'src/app/app-routing-loader'
import { AuthGuard } from 'src/app/components/cleanui/system/Guard/auth.guard'

// layouts & notfound
import { LayoutAuthComponent } from 'src/app/layouts/Auth/auth.component'
import { LayoutMainComponent } from 'src/app/layouts/Main/main.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/index',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutMainComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('src/app/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'contacts',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('src/app/pages/contacts/contacts.module').then(x => x.ContactsModule),
      },
      {
        path: 'childs',
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/childs/childs.module').then(x => x.ChildsModule),
      },
      {
        path: 'expenses',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('src/app/pages/family-expenses/family-expenses.module').then(
            x => x.FamilyExpensesModule,
          ),
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('src/app/pages/user-profile/profile.module').then(x => x.ProfileModule),
      },
      {
        path: 'connection',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('src/app/pages/connection/connection.module').then(x => x.ConnectionModule),
      },
      {
        path: 'lawyers',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('src/app/pages/lawyers/lawyers.module').then(x => x.LawyersModule),
      },
      {
        path: 'calendar',
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/calendar/calendar.module').then(x => x.CalendarModule)
      },
      {
        path: 'Profile',
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/user-profile/profile.module').then(x => x.ProfileModule)
      },
      {
        path: 'documents',
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/documents/documents.module').then(x => x.DocumentsModule)
      },
      {
        path: 'cases',
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/cases/cases.module').then(x => x.CasesModule)
      },
      {
        path: 'journal',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('src/app/pages/journal/journal.module').then(x => x.JournalModule),
      },
      {
        path: 'custody-template',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('src/app/pages/custody-templates/custody-templates.module').then(x => x.CustodyTemplatesModule),
      },
    ],
  },
  {
    path: 'auth',
    component: LayoutAuthComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/auth/auth.module').then(m => m.AuthModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/auth/404',
  },
]

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: AppPreloader,
      relativeLinkResolution: 'legacy',
    }),
    LayoutsModule,
  ],
  providers: [AppPreloader],
  exports: [RouterModule],
})
export class AppRoutingModule { }
