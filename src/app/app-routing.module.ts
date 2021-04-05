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
import { PermissionGuard } from './components/cleanui/system/Guard/permission.guard'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
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
        canActivate: [AuthGuard, PermissionGuard],
        loadChildren: () =>
          import('src/app/pages/contacts/contacts.module').then(x => x.ContactsModule),
      },
      {
        path: 'childs',
        canActivate: [AuthGuard, PermissionGuard],
        loadChildren: () => import('src/app/pages/childs/childs.module').then(x => x.ChildsModule),
      },
      {
        path: 'expenses',
        canActivate: [AuthGuard, PermissionGuard],
        loadChildren: () =>
          import('src/app/pages/family-expenses/family-expenses.module').then(
            x => x.FamilyExpensesModule,
          ),
      },
      {
        path: 'expense-type',
        canActivate: [AuthGuard, PermissionGuard],
        loadChildren: () =>
          import('src/app/pages/expense-type/expense-type.module').then(x => x.ExpenseTypeModule),
      },
      {
        path: 'profile',
        canActivate: [AuthGuard, PermissionGuard],
        loadChildren: () =>
          import('src/app/pages/user-profile/profile.module').then(x => x.ProfileModule),
      },
      {
        path: 'connection',
        canActivate: [AuthGuard, PermissionGuard],
        loadChildren: () =>
          import('src/app/pages/connection/connection.module').then(x => x.ConnectionModule),
      },
      {
        path: 'lawyers',
        canActivate: [AuthGuard, PermissionGuard],
        loadChildren: () =>
          import('src/app/pages/lawyers/lawyers.module').then(x => x.LawyersModule),
      },
      {
        path: 'calendar',
        canActivate: [AuthGuard, PermissionGuard],
        loadChildren: () =>
          import('src/app/pages/calendar/calendar.module').then(x => x.CalendarModule),
      },
      {
        path: 'documents',
        canActivate: [AuthGuard, PermissionGuard],
        loadChildren: () =>
          import('src/app/pages/documents/documents.module').then(x => x.DocumentsModule),
      },
      {
        path: 'cases',
        canActivate: [AuthGuard, PermissionGuard],
        loadChildren: () => import('src/app/pages/cases/cases.module').then(x => x.CasesModule),
      },
      {
        path: 'journal',
        canActivate: [AuthGuard, PermissionGuard],
        loadChildren: () =>
          import('src/app/pages/journal/journal.module').then(x => x.JournalModule),
      },
      {
        path: 'custody-template',
        canActivate: [AuthGuard, PermissionGuard],
        loadChildren: () =>
          import('src/app/pages/custody-templates/custody-templates.module').then(
            x => x.CustodyTemplatesModule,
          ),
      },
      {
        path: 'positive-parenting',
        canActivate: [AuthGuard, PermissionGuard],
        loadChildren: () =>
          import('src/app/pages/positive-parenting/positive-parenting.module').then(
            x => x.PositiveParentingModule,
          ),
      },
      {
        path: 'agreement',
        canActivate: [AuthGuard, PermissionGuard],
        loadChildren: () =>
          import('src/app/pages/agreement/agreement.module').then(x => x.AgreementModule),
      },
      {
        path: 'lawyer-documents',
        canActivate: [AuthGuard, PermissionGuard],
        loadChildren: () =>
          import('src/app/pages/lawyer-documents/lawyer-documents.module').then(x => x.LawyerDocumentsModule),
      },
      {
        path: 'forms',
        canActivate: [AuthGuard, PermissionGuard],
        loadChildren: () =>
          import('src/app/pages/forms/forms.module').then(x => x.FormsModule),
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
