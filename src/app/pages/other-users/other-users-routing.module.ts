import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtherUsersComponent } from './other-users/other-users.component';

const routes: Routes = [
  { path: '', component: OtherUsersComponent, data: { title: 'Users' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherUsersRoutingModule { }
