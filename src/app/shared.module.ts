import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
// antd components module
import { AntdModule } from 'src/app/antd.module'
// basic acl
import { ACLComponent } from 'src/app/components/cleanui/system/ACL/acl.component'
import { FamilyFoldersService } from './services/family_folders/family-folders.service'

import { MomentModule } from 'ngx-moment'

const MODULES = [
  CommonModule,
  RouterModule,
  AntdModule,
  TranslateModule,
  FormsModule,
  ReactiveFormsModule,
  MomentModule,
]

@NgModule({
  imports: [...MODULES],
  declarations: [ACLComponent],
  exports: [...MODULES],
  providers: [FamilyFoldersService],
})
export class SharedModule { }
