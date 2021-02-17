import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { ReactiveFormsModule } from '@angular/forms';

// basic acl
import { ACLComponent } from 'src/app/components/cleanui/system/ACL/acl.component'
import { FormsModule } from '@angular/forms';

// antd components module
import { AntdModule } from 'src/app/antd.module'
import { FamilyFoldersService } from './services/family_folders/family-folders.service';

const MODULES = [CommonModule, RouterModule, AntdModule,
   TranslateModule , FormsModule   , ReactiveFormsModule ]

@NgModule({
  imports: [...MODULES],
  declarations: [ACLComponent],
  exports: [...MODULES],
  providers: [
    FamilyFoldersService
    ]
})

export class SharedModule {}
