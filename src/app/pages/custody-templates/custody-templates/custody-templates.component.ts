import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import parseISO from 'date-fns/fp/parseISO';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AlertService } from 'src/app/services/alert-service/alert-service';
import { CustodyService } from 'src/app/services/APIServices/custody.service';
import { FormsService } from 'src/app/services/shared/forms.service';


@Component({
  selector: 'app-custody-templates',
  templateUrl: './custody-templates.component.html',
  styleUrls: ['./custody-templates.component.scss']
})
export class CustodyTemplatesComponent implements OnInit {

  isVisible = false
  form: FormGroup
  _start: boolean = false
  startDate: any = null
  endDate: any = null
  isLoading: boolean = false
  list: any[] = []

  constructor(
    private _notification: NzNotificationService,
    private _custody: CustodyService,
    private _forms: FormsService,
    private _toaster: NzMessageService,
    private _alert: AlertService,
  ) { }

  ngOnInit(): void {
    // Create Form group
    this.generateForm()

    // Get Custody List
    this._custody.getCustodyTemplatesList();
    this._custody.custodyTemplatesObservable$.subscribe(r => {
      this.list = r
    })

    // Start End Date Change Listener
    this.f.StartEndDate.valueChanges.subscribe(v => {
      if (v && v.length > 0) {
        this.startDate = v[0]
        this.endDate = v[1]

        // Add row if there is no row available
        if (this.fa && this.fa.length == 0)
          this.fa.push(this.createCustodySequencesControls())
      }
    })
  }



  generateForm() {
    this.form = new FormGroup({
      Id: new FormControl(0),
      Title: new FormControl('', [Validators.required]),
      StartEndDate: new FormControl(null, [Validators.required]),
      CustodyPlanTemplateSequences: new FormArray([]),
    })
  }

  get f() { return this.form.controls }
  get fa() { return this.form.controls['CustodyPlanTemplateSequences'] as FormArray }

  createCustodySequencesControls(val?): FormGroup {
    return new FormGroup({
      DateRange: new FormControl(val ? val.DateRange : null),
      ParentType: new FormControl(val ? val.ParentType : null)
    })
  }

  showModal(data?: any) {
    this.isVisible = true
    if (data) {
      data.StartEndDate = [data.StartDate, data.EndDate];
      this.fa.clear();
      if (data.CustodyPlanTemplateSequences && data.CustodyPlanTemplateSequences.length > 0) {
        data.CustodyPlanTemplateSequences.forEach(x => {
          this.fa.push(this.createCustodySequencesControls(x))
        })
      }
      this.form.patchValue(data);
    } else {
      this.form.reset();
      this.startDate = null
      this.endDate = null
      this.fa.clear()
    }
  }

  handleCancel() {
    this.isVisible = false
    this.form.reset();
    this.startDate = null
    this.endDate = null
    this.fa.clear()
  }

  disabledDate = (current: Date): boolean => {
    let custodySeqElm = this.getCustodySeqArrayElmFromLast(2) || this.getCustodySeqArrayElmFromLast(1);
    let startDate = typeof this.startDate == 'object' ? this.startDate : parseISO(this.startDate)
    let endDate = typeof this.endDate == 'object' ? this.endDate : parseISO(this.endDate)
    let aboveRowEndDate = null
    if (custodySeqElm && custodySeqElm.value.DateRange) {
      aboveRowEndDate = typeof custodySeqElm.value.DateRange[1] == 'object' ? custodySeqElm.value.DateRange[1] : parseISO(custodySeqElm?.value?.DateRange[1])
    }
    return differenceInCalendarDays(current, startDate) < 0
      || (aboveRowEndDate && differenceInCalendarDays(current, aboveRowEndDate) <= 0)
      || differenceInCalendarDays(current, endDate) > 0
  }

  getCustodySeqArrayElmFromLast(last: number = 1) {
    let lastElm = this.fa.controls[this.fa.controls.length - last];
    return lastElm;
  }


  addSequenceRow(e?: MouseEvent) {
    if (e) e.preventDefault();

    let lastElm = this.getCustodySeqArrayElmFromLast();
    if (lastElm && (!lastElm.value.DateRange || lastElm.value.ParentType < 0)) {
      this._toaster.warning('Please completely fill the above custody plan information first')
      return;
    }

    if (lastElm && lastElm.value.DateRange[1] > this.endDate) {
      this._toaster.warning('Dates must be in between Date Range')
      return;
    }

    document.querySelectorAll(".custody-sequence-div").forEach(x => x.classList.add('readonly'));
    this.fa.push(this.createCustodySequencesControls());
  }

  removeRow(i) {
    this.fa.removeAt(i)
    let dom = document.querySelectorAll(".custody-sequence-div")
    dom.forEach((x, index) => {
      if (index == dom.length - 2)
        x.classList.remove('readonly')
    })
  }

  async handleSubmit() {
    this.isLoading = true
    this._forms.markAllFieldsAsDirty(this.form);
    if (this.form.invalid) {
      return;
    }
    let data = this.form.value;
    let newData = {
      Id: data.Id ? data.Id : 0,
      Title: data.Title,
      StartDate: this.startDate,
      EndDate: this.endDate,
      CustodyPlanTemplateSequences: data.CustodyPlanTemplateSequences
    }
    let res = await this._custody.saveCustodyTemplate(newData)
    this.isLoading = false
    this._custody.getCustodyTemplatesList();
    if (res) {
      this._notification.success('', 'Custody Plan Template Added Successfully')
      this.isVisible = false
      this.form.reset()
      this.startDate = null
      this.endDate = null
      this.fa.clear()
    } else {
      this._notification.error('', 'Something went wrong')
    }
  }

  async handleDelete(id: number) {
    this._alert.Delete('Are you sure you want to delete the Plan?', async result => {
      if (result && result.isConfirmed) {
        let res = await this._custody.deleteCustodyTemplate(id)
        this._custody.getCustodyTemplatesList();
        if (res) {
          this._notification.success('', 'Custody Plan Template Deleted Successfully')
        } else {
          this._notification.error('', 'Something went wrong')
        }
      }
    })
  }
}


