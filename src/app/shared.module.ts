import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

// basic acl
import { ACLComponent } from 'src/app/components/cleanui/system/ACL/acl.component'

// antd components module
import { AntdModule } from 'src/app/antd.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

const MODULES = [
  CommonModule,
  RouterModule,
  AntdModule,
  TranslateModule,
  FormsModule,
  ReactiveFormsModule,
]

@NgModule({
  imports: [...MODULES],
  declarations: [ACLComponent],
  exports: [...MODULES],
})
export class SharedModule {}
