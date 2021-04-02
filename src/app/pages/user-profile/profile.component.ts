import { Component, OnInit } from '@angular/core'
import { Form, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { jwtAuthService } from 'src/app/services/jwt'
import { UserSessionModel } from 'src/app/models/UserSessionModel';
import { FamilyMemberService } from 'src/app/services/family_member/familymember.service'
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MustMatch } from 'src/app/directives/password-match';
import { FormsService } from 'src/app/services/shared/forms.service';

@Component({
  selector: 'user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  activeKey = 0
  personalInfoForm: FormGroup
  personalInfoSubmissionHolder = false;
  loading = false;
  userData: UserSessionModel;
  ProfilePicUrl: any;
  ProfilePictureFile: File;
  ProfilePictureUploader = false;
  isDeleteProfilePic = false;


  changePasswordForm: FormGroup

  constructor(
    private msg: NzMessageService,
    private fb: FormBuilder,
    private authService: jwtAuthService,
    private familyMemberService: FamilyMemberService,
    private notify: NzNotificationService,
    private formService: FormsService,
  ) {
    this.changePasswordForm = fb.group({
      OldPassword: new FormControl(null, [Validators.required]),
      NewPassword: new FormControl(null, [Validators.required]),
      ConfirmPassword: new FormControl(null, [Validators.required]),
    }, {
      validators: MustMatch('NewPassword', "ConfirmPassword"),
    })
  }

  get pf() { return this.changePasswordForm.controls }


  RemoveProfilePicture() {
    this.ProfilePicUrl = null;
    this.ProfilePictureFile = null;
    this.isDeleteProfilePic = true;
  }
  // Image
  beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isJpgOrPng) {
      this.msg.error('Only PNG,JPEG and JPG image formats are allowed!');
      return false;
    }
    const isLt5M = file.size! / 1024 / 1024 < 5;
    if (!isLt5M) {
      this.msg.error('Image must smaller than 5MB!');
      return false;
    }

    if (isJpgOrPng && isLt5M) {
      this.ProfilePictureUploader = true;
      this.ProfilePictureFile = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.ProfilePicUrl = reader.result;
        this.ProfilePictureUploader = false;
      };

    }
    return false;
  };

  async ngOnInit() {
    this.userData = await this.authService.getUserModel();
    if (this.userData.ProfilePicUrl)
      this.ProfilePicUrl = this.userData.ProfilePicUrl;

    this.personalInfoForm = this.fb.group({
      firstName: [this.userData.FirstName, [Validators.required]],
      lastName: [this.userData.LastName, [Validators.required]],
      email: [this.userData.Email],
      relationship: [this.userData.Relationship],
    }, { updateOn: "change" });
    this.email.disable();
  }

  changeKey(key) {
    this.activeKey = key
  }

  get firstName() { return this.personalInfoForm.controls.firstName };
  get lastName() { return this.personalInfoForm.controls.lastName };
  get email() { return this.personalInfoForm.controls.email };
  get relationship() { return this.personalInfoForm.controls.relationship };


  async personalInfoFormSubmission() {
    this.personalInfoSubmissionHolder = true;
    this.firstName.markAsDirty()
    this.firstName.updateValueAndValidity()
    this.lastName.markAsDirty()
    this.lastName.updateValueAndValidity()
    if (this.personalInfoForm.invalid)
      return;

    this.loading = true;
    let updateInfo = await this.familyMemberService.UpdateUserInfo(this.firstName.value, this.lastName.value, this.relationship.value, this.ProfilePictureFile, this.isDeleteProfilePic);
    if (updateInfo) {
      this.notify.success('', 'Information updated successfully');
      this.authService.logoutUnAuthorizedUser();
    }
    this.loading = false;
    this.personalInfoSubmissionHolder = false;
  }


  async submitChangePassword() {
    this.formService.markAllFieldsAsDirty(this.changePasswordForm)
    if (this.changePasswordForm.invalid) return
    let rs = await this.authService.changePassword(this.changePasswordForm.value)
    if (rs) {
      this.notify.success('', 'Password Changed successfully!');
      this.changePasswordForm.reset()
    }
  }
}
