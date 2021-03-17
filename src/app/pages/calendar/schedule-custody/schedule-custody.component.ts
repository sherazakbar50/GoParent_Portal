import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { EventsDTO } from 'src/app/models/eventsDTO';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FamilyService } from 'src/app/services/APIServices/family.service';
import { FamilyMemberDto } from 'src/app/models/Family/FamilyMemberDto';
import { FamilyMemberService } from 'src/app/services/family_member/familymember.service';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustodyService } from 'src/app/services/APIServices/custody.service';
import { CalendarService } from 'src/app/services/calendar-services/calendar-service';
import { CustodyDto } from 'src/app/models/CustodyDto';

@Component({
  selector: 'app-schedule-custody',
  templateUrl: './schedule-custody.component.html',
  styleUrls: ['./schedule-custody.component.scss']
})


export class ScheduleCustodyComponent implements OnInit {

  firstCoParentColor = "#8E0622";
  secondCoParentColor = "#3E6158";
  form: FormGroup
  @Input() custodySub: BehaviorSubject<any>;
  @Input() modalCloseSub: Subject<boolean>;
  IsSubmitted = false;
  FamilyChilds: []
  custodyId: number;
  CoParentsInfo: FamilyMemberDto[];
  selectedMode: string;

  list: any[]
  templateChosenOrCustom: boolean = false

  constructor(private fb: FormBuilder,
    private notifier: NzNotificationService,
    private familyService: FamilyService,
    private familyMemberService: FamilyMemberService,
    private toaster: NzMessageService,
    private custody: CustodyService,
    private _calendarService: CalendarService) {

  }
  //GET - ACCESSOR
  get fc() { return this.form.controls }
  get custodySequencesElmArray() { return this.form.get('CustodySequences') as FormArray }
  get custodyStartDate() { return this.form.controls.StartDate }
  get custodyEndDate() { return this.form.controls.EndDate }


  async ngOnInit() {

    // Get Custody List
    this.custody.getCustodyTemplatesList();
    this.custody.custodyTemplatesObservable$.subscribe(r => {
      this.list = r
    })
    this.FamilyChilds = await this.familyService.GetFamilyChilds();
    this.CoParentsInfo = await this.familyMemberService.GetCoParentsInfo();
    this.buildForm();
    this.subscribeToEditCustody();
    this.subscribeModalCloseEvent();
  }

  buildForm() {
    this.form = this.fb.group({
      Title: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: [, Validators.required],
      Children: ['', { updateOn: 'change', validators: [Validators.required] }],
      Notes: [],
      CustodySequences: this.fb.array([this.createCustodySequencesElm()])
    }, { updateOn: 'change' });
  }

  subscribeModalCloseEvent() {
    if (this.modalCloseSub) {
      this.modalCloseSub.subscribe(res => {
        if (res)
          this.form.reset();
      })
    }
  }

  subscribeToEditCustody() {
    if (this.custodySub) {
      this.custodySub.subscribe((res) => {
        if (res) {
          this.selectedMode = res.selectedMode;

          if (res.isAdd) {
            this.form.reset();
          }
          else {
            this.custodyId = res.Id;
            this.firstCoParentColor = res.FirstParentCustodyColor;
            this.secondCoParentColor = res.SecondParentCustodyColor;
            res.CustodySequences.forEach((x, i) => {
              if (i > 0)
                this.addCustodyRow(null, false)
            })
            this.form.patchValue(res);
            this.templateChosenOrCustom = true
          }
        }
        else {
          this.form.reset();
        }
      })
    }
  }

  async SaveCustody() {
    this.IsSubmitted = true;

    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }

    if (this.form.invalid)
      return;

    let custodyData = this.form.value;
    if (!custodyData.CustodySequences.every(x => x.DateRange != "" && x.CustodyBy != "")) {
      this.toaster.warning('Please define at least one complete custody plan')
      return;
    }

    custodyData.Id = this.custodyId;
    custodyData.FirstParentCustodyColor = this.firstCoParentColor;
    custodyData.SecondParentCustodyColor = this.secondCoParentColor;
    let res = await this.custody.saveCustody(custodyData);
    if (res) {
      let dateToRender = custodyData.CustodySequences[0]?.DateRange[0] || new Date();
      this._calendarService.LoadCalendarDataByMode(new Date(dateToRender), this.selectedMode,0);
      this.notifier.success('', this.custodyId > 0 ? 'Custody updated successfully' : 'Custody scheduled successfully');
    }
    this.IsSubmitted = false;
  }

  setParentCustodyColor(coParentFor, color) {
    if (coParentFor == 1)
      this.firstCoParentColor = color;
    else
      this.secondCoParentColor = color;
  }

  addCustodyRow(e?: MouseEvent, validate = true) {

    if (e) e.preventDefault();

    if (validate) {
      let lastElm = this.getCustodySeqArrayElmFromLast();
      if (lastElm && (!lastElm.value.DateRange || !lastElm.value.CustodyBy)) {
        this.toaster.warning('Please completely fill the above custody plan information first')
        return;
      }
    }
    //document.querySelectorAll(".custody-sequence-div").forEach(x=>x.classList.add('readonly'));
    this.custodySequencesElmArray.push(this.createCustodySequencesElm());
  }

  disableAllSequencesExceptLast() {
    let totalSeq = document.querySelectorAll(".custody-sequence-div").length - 1;
    document.querySelectorAll(".custody-sequence-div").forEach((x, i) => {
      if (i !== totalSeq)
        x.classList.add('readonly')
      else
        x.classList.remove('readonly')
    });
  }

  removeCustodySequenceElm(elmIndex) {
    // let allSequences = document.querySelectorAll(".custody-sequence-div");
    // let lastSeq = allSequences[allSequences.length - 2];
    // if(lastSeq){
    //   lastSeq.classList.remove('readonly')
    // } 

    this.custodySequencesElmArray.removeAt(elmIndex);
  }


  getCustodySeqArrayElmFromLast(last: number = 1) {
    let lastElm = this.custodySequencesElmArray.controls[this.custodySequencesElmArray.controls.length - last];
    return lastElm;
  }

  createCustodySequencesElm(val?): FormGroup {
    return this.fb.group({
      DateRange: [val ? val.DateRange : ''],
      CustodyBy: [val ? this.getCustodyBy(val.ParentType) : '']
    }, { updateOn: "change" });
  }

  getCustodyBy(val): any {
    if (val == 0)
      return this.CoParentsInfo[0].Id
    else
      return this.CoParentsInfo[1].Id
  }
  disabledDate = (current: Date): boolean => {
    let custodySeqElm = this.getCustodySeqArrayElmFromLast(2) || this.getCustodySeqArrayElmFromLast(1);
    return differenceInCalendarDays(current, new Date(this.custodyStartDate.value)) < 0
      || (custodySeqElm && custodySeqElm.value.DateRange && differenceInCalendarDays(current, new Date (custodySeqElm.value.DateRange[1])) <= 0)
      || differenceInCalendarDays(current, new Date(this.custodyEndDate.value)) > 0;
  };

  OnCustodyDateChange(currentDate: Date) {
    let hasAnyCustodyPlanSetup = this.custodySequencesElmArray.value.some(x => x.DateRange !== "" && x.CustodyBy !== "");
    if (hasAnyCustodyPlanSetup) {
      this.custodySequencesElmArray.clear();
      this.addCustodyRow();
    }
  }

  rowsRendered() {
    this.disableAllSequencesExceptLast();
  }


  // Start Templates
  onTemplateSelect(item) {
    if (item) {
      this.custodySequencesElmArray.clear()
      this.form.patchValue({
        Title: item.Title,
        StartDate: new Date(item.StartDate),
        EndDate: new Date(item.EndDate),
      })
      item.CustodyPlanTemplateSequences.forEach(e => {
        this.custodySequencesElmArray.push(this.createCustodySequencesElm(e))
      })
      this.firstCoParentColor = "#28B4CC"
      this.secondCoParentColor = "#FF1881"
      this.templateChosenOrCustom = true
      document.querySelectorAll(".custody-sequence-div").forEach(x => x.classList.add('readonly'));
    }
  }

}
