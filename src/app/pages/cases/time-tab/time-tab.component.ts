import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-tab',
  templateUrl: './time-tab.component.html',
  styleUrls: ['./time-tab.component.scss']
})
export class TimeTabComponent implements OnInit {
  isVisible:boolean = false;
  TimemodalTitle: string = 'Add time';
  constructor() { }

  ngOnInit(): void {
  }

  AddTime() {
    this.isVisible = true
  }

  SavedCallBack() {
    this.isVisible = false
  }

  ModalCancel() {
    this.isVisible = false
  }
  async AddTimeSuccess($event) {
    this.isVisible = false
  }

}
