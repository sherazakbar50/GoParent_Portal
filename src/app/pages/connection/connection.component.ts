import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import {ConnectionService} from 'src/app/services/connection/connection.service'
import { Regex } from 'src/Regex/Regex';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {
   
   form:FormGroup;
   OtherCoParentInfo:any;
   isSubmitted = false;

   constructor(private connService:ConnectionService,private fb:FormBuilder,private notifier:NzNotificationService) {
    this.form = this.fb.group({
      otherCoParentEmail:['',[Validators.required,Validators.maxLength(255),Validators.pattern(Regex.Email)]]
    },{updateOn:"change"});
   }
   
  public get otherCoParentEmail() { return this.form.controls.otherCoParentEmail};

  async ngOnInit() {
    this.OtherCoParentInfo = await this.connService.GetOtherCoParentIfExits();
  }

 async CreatePortalAccess(){
     this.isSubmitted = true;
     this.otherCoParentEmail.markAsDirty();
     this.otherCoParentEmail.updateValueAndValidity();

     if(this.form.invalid)
         return;

    let res = await this.connService.CreatePortalAccess(this.otherCoParentEmail.value);
    if(res){
        this.notifier.success('','Portal Access invitation has been sent successfully');
        this.OtherCoParentInfo = res;
    }

    this.isSubmitted = false;
  }
}
