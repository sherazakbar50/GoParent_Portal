import {Component, Input, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,FormArray } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { EventsDTO } from 'src/app/models/eventsDTO';
import { EventsService } from 'src/app/services/APIServices/events.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FamilyService } from 'src/app/services/APIServices/family.service';
import { FamilyMemberDto } from 'src/app/models/Family/FamilyMemberDto';
import { FamilyMemberService } from 'src/app/services/family_member/familymember.service';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustodyService } from 'src/app/services/APIServices/custody.service';

@Component({
  selector: 'app-schedule-custody',
  templateUrl: './schedule-custody.component.html',
  styleUrls:['./schedule-custody.component.scss']
})


export class ScheduleCustodyComponent implements OnInit {

  firstCoParentColor = "#8E0622";
  secondCoParentColor = "#3E6158";
  form: FormGroup
  @Input() eventSub: BehaviorSubject<EventsDTO>;
  @Input() modalCloseSub: Subject<boolean>;
  IsSubmitted = false;
  FamilyChilds:[]
  eventId:number;
  CoParentsInfo:FamilyMemberDto[];

  constructor(private fb: FormBuilder,
    private notifier:NzNotificationService,
    private familyService:FamilyService,
    private familyMemberService:FamilyMemberService,
    private toaster:NzMessageService,
    private custody:CustodyService) {
        
  }

  get fc() { return this.form.controls }  
  get custodySequencesElmArray() { return this.form.get('custodySequences') as FormArray } 
  get custodyStartDate() { return this.form.controls.StartDate } 
  get custodyEndDate() { return this.form.controls.EndDate }  

  async ngOnInit() {
    this.FamilyChilds = await this.familyService.GetFamilyChilds();
    this.CoParentsInfo = await this.familyMemberService.GetCoParentsInfo();

    this.form = this.fb.group({
      Title: ['', Validators.required],
      StartDate:['', { updateOn: 'change', validators:[Validators.required] }],
      EndDate:[,{ updateOn: 'change', validators:[Validators.required] }],
      Children:[,Validators.required],
      Notes:[],
      custodySequences:this.fb.array([this.createCustodySequencesElm()])
  }, { updateOn: 'submit' });

  
    // if (this.eventSub) {
    //   this.eventSub.subscribe(res => {
    //     if (res) {
    //       this.eventId = res.EventId;
    //      // this.backgroundColor = res.EventBgColor;
    //       res.EventDateRange = [res.EventStartDate,res.EventEndDate]
    //       this.form.patchValue(res);
    //     }
    //     else {
    //       this.form.reset();
    //     }
    //   });
    // }

    //On modal closing - reset the form
    if (this.modalCloseSub) {
      this.modalCloseSub.subscribe(res => {
        debugger
        if (res) this.form.reset();
      })
    }

  }

  async SaveCustody() {
    this.IsSubmitted = true;

    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }

    if(this.form.invalid) return;

    let custodyData = this.form.value;
    custodyData.FirstParentCustodyColor = this.firstCoParentColor;
    custodyData.SecondParentCustodyColor = this.secondCoParentColor;
    //let res = await this.custody.saveCustody(custodyData);
    // if(res){
    //   this._eventsService.getMonthWiseEvent(new Date());
    //    this.notifier.success('','Event saved successfully');
    // }

    this.IsSubmitted = false;
  }

  

  setColor(coParentFor,color: string) {

    if(coParentFor == 1)
        this.firstCoParentColor = color;
    else
        this.secondCoParentColor = color;
  }

  addCustodyRow(e?: MouseEvent){
    if (e) e.preventDefault();
    
    let lastElm = this.getCustodySeqArrayElmFromLast();
    if(lastElm && (!lastElm.value.dateRange || !lastElm.value.custodyBy))
    {
      this.toaster.warning('Please completely fill the above custody plan information first')
      return;
    }
    
    document.querySelectorAll(".custody-sequence-div").forEach(x=>x.classList.add('readonly'));
    this.custodySequencesElmArray.push(this.createCustodySequencesElm());
  }

  removeCustodySequenceElm(elmIndex) {
    
    let allSequences = document.querySelectorAll(".custody-sequence-div");
    let lastSeq = allSequences[allSequences.length - 2];
    if(lastSeq){
      lastSeq.classList.remove('readonly')
    } 

    this.custodySequencesElmArray.removeAt(elmIndex);
  }

  
  getCustodySeqArrayElmFromLast(last:number = 1){
    let lastElm = this.custodySequencesElmArray.controls[this.custodySequencesElmArray.controls.length - last];
    return lastElm;
  }

  createCustodySequencesElm() : FormGroup{
    return this.fb.group({
       dateRange:[''],
       custodyBy:['']      
    },{updateOn:"change"});
 }

 disabledDate = (current: Date): boolean => {
   let custodySeqElm = this.getCustodySeqArrayElmFromLast(2) || this.getCustodySeqArrayElmFromLast(1);
   return differenceInCalendarDays(current, this.custodyStartDate.value) < 0 
          || (custodySeqElm && custodySeqElm.value.dateRange && differenceInCalendarDays(current, custodySeqElm.value.dateRange[1]) <= 0)
          || differenceInCalendarDays(current, this.custodyEndDate.value) > 0;
};

OnCustodyDateChange(currentDate : Date){
let hasAnyCustodyPlanSetup = this.custodySequencesElmArray.value.some(x=>x.dateRange!=="" && x.custodyBy!=="");
if(hasAnyCustodyPlanSetup){
      this.custodySequencesElmArray.clear();
      this.addCustodyRow();
}
}

}
