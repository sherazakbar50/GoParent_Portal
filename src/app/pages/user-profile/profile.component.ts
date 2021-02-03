import { Component, OnInit } from '@angular/core'
import {Form, FormGroup,FormBuilder,Validators} from '@angular/forms'
import { jwtAuthService } from 'src/app/services/jwt'
import { UserSessionModel } from 'src/app/models/UserSessionModel';
import { FamilyMemberService } from 'src/app/services/family_member/familymember.service'
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'user-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  activeKey = 0
  personalInfoForm : FormGroup
  personalInfoSubmissionHolder = false;
  loading = false;
  userData:UserSessionModel;

  constructor(private fb:FormBuilder,private authService: jwtAuthService,private familyMemberService : FamilyMemberService,private notify:NzNotificationService) {
  }
  async ngOnInit() {
    debugger
     this.userData = await this.authService.getUserModel();
     this.personalInfoForm  = this.fb.group({
      firstName:[this.userData.FirstName,[Validators.required]],
      lastName:[this.userData.LastName,[Validators.required]],
      email: [this.userData.Email],
      relationship:[this.userData.Relationship],
     },{updateOn:"submit"});    
     this.email.disable();
    }

  changeKey(key) {
    this.activeKey = key
  }

  get firstName() { return this.personalInfoForm.controls.firstName };
  get lastName() { return this.personalInfoForm.controls.lastName };
  get email() { return this.personalInfoForm.controls.email };
  get relationship() { return this.personalInfoForm.controls.relationship };

  async personalInfoFormSubmission(){
    debugger
    this.personalInfoSubmissionHolder = true;
    this.firstName.markAsDirty()
    this.firstName.updateValueAndValidity()
    this.lastName.markAsDirty()
    this.lastName.updateValueAndValidity()
    if (this.personalInfoForm.invalid)
      return;

   this.loading = true;
   let updateInfo = await this.familyMemberService.UpdateUserInfo(this.firstName.value, this.lastName.value,this.relationship.value);
   if(updateInfo){
         this.notify.success('','Information updated successfully');
         this.authService.logoutUnAuthorizedUser();
   }
   else{
    this.notify.error('','Something went wrong');
   }
   this.loading = false;
   this.personalInfoSubmissionHolder = false;
}

}
