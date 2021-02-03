import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'
import * as UserActions from 'src/app/store/user/actions'
import * as SettingsActions from 'src/app/store/settings/actions'
import * as UserDTO from 'src/app/models/UserDTO'
import { jwtAuthService } from 'src/app/services/jwt'
import { Regex } from 'src/Regex/Regex'
import { ActivatedRoute, Route, Router } from '@angular/router'
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'cui-system-register',
  templateUrl: './register.component.html',
  styleUrls: ['../style.component.scss'],
})
export class RegisterComponent {
 
  registrationStepsEnums = {
    Parent:1,
    CoParentChildren:2
  }

  form: FormGroup
  loading: boolean = false
  parentSubmission: boolean = false
  CoParentChildSubmission = false
  current = 0;
  currentRegStep = this.registrationStepsEnums.Parent;

  constructor(private fb: FormBuilder, private store: Store<any>,private authService:jwtAuthService,private router: Router,private notification: NzNotificationService) {
    this.form = fb.group({
      
      //Parent
      email: [, [Validators.required,Validators.pattern(Regex.Email),Validators.maxLength(255)]],
      password: [, [Validators.required,Validators.minLength(4)]],
      firstName: [, [Validators.required]],
      lastName:[, [Validators.required]],

      //Co Parent
      coParentEmail:['',[Validators.pattern(Regex.Email),Validators.maxLength(255)]],
      
      //Children
      childsArray: fb.array([this.createChildsFormGroup()]),

    }, {updateOn: 'submit'})

    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.loading = state.loading
    })
  }

 
  

  backToPreviousStep(): void {
    this.current -= 1;
    this.RegistrationSteps();
  }

  moveToNextStep(): void {
    this.current += 1;
    this.RegistrationSteps();
  }

  RegistrationSteps(): void {
    switch (this.current) {
      case 0: {
        this.currentRegStep = this.registrationStepsEnums.Parent;
        break;
      }
      case 1: {
        this.currentRegStep = this.registrationStepsEnums.CoParentChildren;
        break;
      }
      default: {
        this.currentRegStep = this.registrationStepsEnums.Parent;
      }
    }
  }

  //Parent Fields
  get email() {
    return this.form.controls.email
  }
  get password() {
    return this.form.controls.password
  }
  get firstName() {
    return this.form.controls.firstName
  }
  get lastName() {
    return this.form.controls.lastName
  }


  //Co Parent Fields
  get coParentEmail() {
    return this.form.controls.coParentEmail
  }

  //Child Fields
  public get childs() { return this.form.get('childsArray') as FormArray }
  get childFirstName() { return this.form.controls.childFirstName }
  get childLastName() { return this.form.controls.childLastName }

  parentForm(): void {
    this.parentSubmission = true;
    this.email.markAsDirty()
    this.email.updateValueAndValidity()
    this.password.markAsDirty()
    this.password.updateValueAndValidity()
    this.firstName.markAsDirty()
    this.firstName.updateValueAndValidity()
    this.lastName.markAsDirty()
    this.lastName.updateValueAndValidity()

    if (this.email.invalid || this.password.invalid || this.firstName.invalid || this.lastName.invalid) {
      return;
    }
    this.moveToNextStep();
    
    
    
    //this.store.dispatch(new UserActions.Register(payload,this.authService))
  }

  async CoParentChildForm(){
    this.CoParentChildSubmission = true;
    this.coParentEmail.markAsDirty()
    this.coParentEmail.updateValueAndValidity()

    if (this.coParentEmail.invalid) return;

    const payload = {
      email: this.email.value,
      password: this.password.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      coParentEmail:this.coParentEmail.value,
      childs:this.childs.value
    };
    
    this.loading = true;
    let response = await this.authService.register(this.createRegistrationDataPayload());
    if(response){
      this.notification.success(
        '',
        'Your account has been created successfully.'
      );
      this.router.navigate(["auth/login"]);
      this.CoParentChildSubmission = false
      this.parentSubmission = false
      this.loading = false;
    }
    else{
      this.loading = false; 
    }
  }

  createRegistrationDataPayload():UserDTO.UserDTO {
    const payload = {
      email: this.email.value,
      password: this.password.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      coParentEmail:this.coParentEmail.value,
      childs:this.childs.value
    };
    return payload;
  }

  addChild() {
    this.childs.push(this.createChildsFormGroup())
  }
 
  createChildsFormGroup(): FormGroup {
    return this.fb.group({
      childFirstName: [''],
      childLastName: [''],
    })

  }

  removeChildFormGroup(index: number) {
    this.childs.removeAt(index);
  }

  getChildFormGroup(fg: FormGroup) {
    return fg.controls
  }
}
